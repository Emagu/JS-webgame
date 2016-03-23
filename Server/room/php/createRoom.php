<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
//抓取資料
	$data = $_GET['data'];
	$data_res = json_decode($data,true);
	$id = $data_res['ActorID'];
	$name = $data_res['RoomName'];
	$Map = $data_res['Map'];
	/*
		error #1	未輸入帳號
		error #2	未輸入房名
		error #3	房名重複
		error #4	建立失敗
		Success #1  註冊成功	*/
	if($id==""){
		echo 'error#1';
	}elseif($name==""){
		echo 'error#2';
	}else{
		$sql = "SELECT * FROM room_list where Name = '$name'";
	    $res = mysqli_query($connect,$sql);
	    $row = mysqli_fetch_assoc($res);
	    if($row){
    		echo "error#3";
    	}else{
    	    
		    $sql="INSERT INTO room_list (Name, Map, StartTime,RoomMaster) VALUES ('$name', '$Map', 'null','$id');";
	        if(mysqli_query($connect,$sql)){
	            $roomID = mysqli_insert_id($connect);
	            $datetime = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
		        $sql="INSERT INTO room_actor_list (roomID, actorID, lasttime) VALUES ('$roomID', '$id', '$datetime');";
		        if(mysqli_query($connect,$sql)){
		           mysqli_close($connect);
		           echo $roomID;
		        }else{
		           mysqli_close($connect);
    	           echo "error#4";
	            }
	        }else{
		        mysqli_close($connect);
		        echo "error#4";
	        }
	    }
	}
?>