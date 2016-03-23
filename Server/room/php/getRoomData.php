<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
//抓取資料
	$roomID = $_GET['roomID'];
	$sql = "SELECT * FROM room_list where NO = '$roomID'";
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
	   array_push($data,$RoomData);
	}
	echo json_encode($data);
?>