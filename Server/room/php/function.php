<?php 
    function addRoom($connect,$roomID,$id){
        $datetime = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
		$sql="INSERT INTO room_actor_list (roomID, actorID, lasttime) VALUES ('$roomID', '$id', '$datetime');";
		if(mysqli_query($connect,$sql)){
            return true;
        }else{
            return false;
        }
    }
?>