<?php

require_once('connection.php');
$name = $_GET['name'];
$question = $_GET['question'];
$answer = $_GET['answer'];
$sql = "SELECT * FROM `account` WHERE `name` LIKE '" . $name . "' AND `question` LIKE '"  . $question . "' AND `answer` LIKE '" . md5($answer) . "'";


try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute();
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}

$data = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode(array('status' => true, 'data' => $data));
