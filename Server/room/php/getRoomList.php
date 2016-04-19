<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
//抓取資料
	$data = [];
	$sql = "SELECT * FROM room_list";
	$res = mysqli_query($connect,$sql);
	while($row = mysqli_fetch_assoc($res)){
	    $roomID = $row['NO'];
	    $sql = "SELECT * FROM `room_actor_list` WHERE `roomID` = '$roomID';";
	    $resq = mysqli_query($connect,$sql);
	    $actorNum = mysqli_num_rows($resq);
	    $RoomData = array(
	            "RoomID" => $roomID,
	            "RoomName" => $row['Name'],
	            "Map" => $row['Map'],
	            "ActorNum" => $actorNum
	        );
		if($row['status'] == 0) array_push($data,$RoomData);
	}
	usleep(500000);
	echo json_encode($data);
?>