<?php
    include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    $Master = $data_res["Master"];
    $ActorID = $data_res["ActorID"];
    $RoomID = $data_res["RoomID"];
    if(quitRoom($connect,$ActorID,$Master,$RoomID)){
        mysqli_close($connect);
    }else{
        echo "error#1";
        mysqli_close($connect);
    }
?>