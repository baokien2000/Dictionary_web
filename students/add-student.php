<?php
    require_once ('connection.php');

    if (!isset($_POST['name']) || !isset($_POST['password']))) {
        die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
    }

    $name = $_POST['name'];
    $password = $_POST['password'];

    $sql = 'INSERT INTO student(name,password) VALUES(?,?,?)';

    try{
        $stmt = $dbCon->prepare($sql);
        $stmt->execute(array($name,$password));

        echo json_encode(array('status' => true, 'data' => 'Thêm sinh viên thành công'));
    }
    catch(PDOException $ex){
        die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
    }



?>