<?php
    include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    $RoomID = $data_res["RoomID"];
    $ActorID = $data_res["ActorID"];
    $pos = addRoom($connect,$RoomID,$ActorID);
    if(!$pos){
        echo "error#1";
        mysqli_close($connect);
    }else{
        $data = array(
            "RoomID" => $RoomID,
            "Position" => $pos
        );
        echo json_encode($data);
        mysqli_close($connect);
    }
?>