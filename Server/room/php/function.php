<?php 
    function addRoom($connect,$roomID,$id){
        $datetime = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
        $sql="select * from `room_actor_list` where `roomID` = '$roomID';";
        $res=mysqli_query($connect,$sql);
        $pos = 0;
        while($row = mysqli_fetch_assoc($res)){
            if($row["position"]==$pos) $pos += 1;
        }
		$sql="INSERT INTO room_actor_list (roomID, actorID, lasttime, position) VALUES ('$roomID', '$id', '$datetime', '$pos');";
		if(mysqli_query($connect,$sql)){
            return $pos;
        }else{
            return -1;
        }
    }
    function quitRoom($connect,$id,$Master,$RoomID){
		$sql="DELETE FROM room_actor_list WHERE actorID = '$id';";
		if(mysqli_query($connect,$sql)){
            if($Master=="true"){
                $data = getRoomData($connect,$RoomID);
                if(count($data)==0) {
                    if(!delRoom($connect,$RoomID)){
                        return false;
                    }
                }else{
                    $newRoomMaster = $data[0]['ActorID'];
                    $sql = "UPDATE `room_list` SET `RoomMaster` = '$newRoomMaster' WHERE NO = '$RoomID';";
                    if(!mysqli_query($connect,$sql)){
                        return false;
                    }
                }
            }
            return true;
        }else{
            return false;
        }
    }
    function delRoom($connect,$id){
		$sql="DELETE FROM room_list WHERE NO = '$id';";
		if(mysqli_query($connect,$sql)){
            return $sql;
        }else{
            return false;
        }
    }
    function getRoomData($connect,$roomID){
        $data = [];
    	$sql = "SELECT * FROM room_list where NO = '$roomID'";
    	$res = mysqli_query($connect,$sql);
    	$roomData = mysqli_fetch_assoc($res);
    	$roomID = $roomData['NO'];
    	$MasterID = $roomData['RoomMaster'];
    	$sql = "SELECT * FROM `room_actor_list` WHERE `roomID` = '$roomID';";
    	$resq = mysqli_query($connect,$sql);
    	while($row = mysqli_fetch_assoc($resq)){
    		$actorID = $row["actorID"];
    		$sql = "SELECT * FROM `actor_list` WHERE `NO` = '$actorID';";
    		$result = mysqli_query($connect,$sql);
    		$actorData = mysqli_fetch_assoc($result);
    		if($actorID==$roomData["RoomMaster"]){
    			$ActorOut = array(
    		           "ActorName" => $actorData["actorName"],
    		           "ActorID" => $actorData["NO"],
    		           "Level" => $actorData["LV"],
    		           "State" => $row["state"],
    		           "Position" => $row["position"],
    		           "Master" => "true"
    		       );
    		}else{
    		    $ActorOut = array(
    		           "ActorName" => $actorData["actorName"],
    		           "ActorID" => $actorData["NO"],
    		           "Level" => $actorData["LV"],
    		           "State" => $row["state"],
    		           "Position" => $row["position"],
    		           "Master" => "false"
    		       );
    		}
    		array_push($data,$ActorOut);
    	}
    	return array("RoomStatus" => $roomData['status'], "PlayerData" => $data);
    }
    
?>