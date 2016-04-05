<?php
    include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	$ActorID = $_GET['ActorID'];
	$Status = $_GET['Status'];
	$sql = "UPDATE `room_actor_list` SET `ready` = '$Status' WHERE `actorID` = '$ActorID';";
    if(mysqli_query($connect,$sql)){
        echo $sql;
        mysqli_close($connect);
    }else{
        echo "error";
        mysqli_close($connect);
    }
    
?>