<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	include("./function.php");//引入函數庫
//抓取資料
	$data = [];
	$sql = "SELECT * FROM room_list";
	$res = mysqli_query($connect,$sql);
	while($row = mysqli_fetch_assoc($res)){
	    $roomID = $row['NO'];
	    $sql = "SELECT * FROM `room_actor_list` WHERE `roomID` = '$roomID';";
	    $resq = mysqli_query($connect,$sql);
	    $actorNum = 0;
	    while($rw = mysqli_fetch_assoc($resq)){
    		$time = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
    		$actorID = $rw["actorID"];
    		if((strtotime($time) - strtotime($rw['lasttime']))>2){
    			if($row['RoomMaster']==$actorID) quitRoom($connect,$actorID,"true",$roomID);
    			else quitRoom($connect,$actorID,"false",$roomID);
    		}else{
    			$actorNum++;
    		}
    	}
    	if($actorNum==0) {
            if(!delRoom($connect,$roomID))	echo "error#2";
        }
	    $RoomData = array(
	            "RoomID" => $roomID,
	            "RoomName" => $row['Name'],
	            "Map" => $row['Map'],
	            "ActorNum" => $actorNum
	        );
	   array_push($data,$RoomData);
	}
	usleep(500000);
	echo json_encode($data);
?>