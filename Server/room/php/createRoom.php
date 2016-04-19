<?php
	include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
//抓取資料
	$data = $_GET['data'];
	$data_res = json_decode($data,true);
	$id = $data_res['ActorID'];
	$name = $data_res['RoomName'];
	$Map = $data_res['Map'];
	$Mode = $data_res['Mode'];
	/*
		error #1	未輸入角色編號
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
		    $sql="INSERT INTO room_list (Name, Map, Mode, StartTime,RoomMaster) VALUES ('$name', '$Map', '$Mode','null','$id');";
	        if(mysqli_query($connect,$sql)){
	            $roomID = mysqli_insert_id($connect);
	            $pos = addRoom($connect,$roomID,$id);
	            if($pos== -1){
	            	mysqli_close($connect);
	            	echo "error#4";
	            }else{
	            	$data = array(
    		            "RoomID" => $roomID,
    		            "Position" => $pos
    		        );
	            	echo json_encode($data);
	            	mysqli_close($connect);
	            }
	        }else{
		        mysqli_close($connect);
		        echo "error#4";
	        }
	    }
	}
?>