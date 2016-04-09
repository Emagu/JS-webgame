<?php
    include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    $ActorID = $data_res["ActorID"];
    $RoomID = $data_res["RoomID"];
    $newPos = $data_res["Type"];
    $sql = "update `room_actor_list` set `Type` = '$newPos' where `roomID` = '$RoomID' and `actorID` = '$ActorID';";
    if(mysqli_query($connect,$sql)) echo "secess";
    else echo "fail";
    
?>