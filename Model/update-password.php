<?php
require_once('connection.php');

$id = $_POST['id'];
$password = $_POST['password'];


$sql = 'UPDATE account set password = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array(md5($password), $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật account thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có account nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
