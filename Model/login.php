<?php
    
    require_once ('connection.php');
    $name = $_GET['name'];
    $password = $_GET['password'];
    $sql = "SELECT * FROM `account` WHERE `name` LIKE '" . $name. "' AND `password` LIKE '"  . md5($password) . "'";


    try{
        $stmt = $dbCon->prepare($sql);
        $stmt->execute();
    }
    catch(PDOException $ex){
        die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
    }

    $data = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC))

    {
        $data[] = $row;
    }

    echo json_encode(array('status' => true, 'data' => $data));


?>