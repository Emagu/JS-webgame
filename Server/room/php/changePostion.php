<?php
    include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    $ActorID = $data_res["ActorID"];
    $RoomID = $data_res["RoomID"];
    $newPos = $data_res["Postion"];
    $sql = "select * from `room_actor_list` where `roomID` = '$RoomID';";
    $res = mysqli_query($connect,$sql);
    $canMove = true;
    while($row = mysqli_fetch_assoc($res)){
        if($row["position"] == $newPos) $canMove = false;
    }
    if($canMove){
        $sql = "update `room_actor_list` set `position` = '$newPos' where `roomID` = '$RoomID' and `actorID` = '$ActorID';";
        if(mysqli_query($connect,$sql)) echo "secess";
        else echo "fail";
    }else echo "fail";
    
?>