<?php
require_once('connection.php');

$name = $_POST['name'];
$password = $_POST['password'];
$question = $_POST['question'];
$answer = $_POST['answer'];
$date = $_POST['date'];
$role = $_POST['role'];

$sql = 'INSERT INTO account(name,password,question,answer,date,role) VALUES(?,?,?,?,?,?)';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, md5($password), $question, md5($answer), $date, $role));

    echo json_encode(array('status' => true, 'data' => 'Thêm user thành công'));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
