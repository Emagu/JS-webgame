<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
//抓取資料
	$roomID = $_GET['roomID'];
	$data = [];
	$sql = "SELECT * FROM room_list where NO = '$roomID'";
	$res = mysqli_query($connect,$sql);
	$roomData = mysqli_fetch_assoc($res);
	$roomID = $roomData['NO'];
	$sql = "SELECT * FROM `room_actor_list` WHERE `roomID` = '$roomID';";
	$resq = mysqli_query($connect,$sql);
	while($row = mysqli_fetch_assoc($resq)){
		$time = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
		/*if((strtotime($time) - strtotime($row['lasttime']))>60){
			
		}else{*/
			$actorID = $row["actorID"];
			$sql = "SELECT * FROM `actor_list` WHERE `NO` = '$actorID';";
			$result = mysqli_query($connect,$sql);
			$actorData = mysqli_fetch_assoc($result);
			if($actorID==$roomData["RoomMaster"]){
				$ActorOut = array(
		            "ActorName" => $actorData["actorName"],
		            "Level" => $actorData["LV"],
		            "Ready" => $row["ready"],
		            "Master" => "true"
		        );
			}else{
				$ActorOut = array(
		            "ActorName" => $actorData["actorName"],
		            "Level" => $actorData["LV"],
		            "Ready" => $row["ready"],
		            "Master" => "false"
		        );
			}
		    array_push($data,$ActorOut);
		//}
	}
	echo json_encode($data);
?>