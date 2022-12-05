<?php
require_once('connection.php');

$id = $_POST['id'];

$sql = 'DELETE FROM account where id = ?';

echo "id: " . $id;

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Xóa account thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Mã account không hợp lệ')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
