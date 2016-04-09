<?php
	include("../../connect/function.php");//引入函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
//抓取資料
	$roomID = $_GET['roomID'];
	$actorID = $_GET['actorID'];
	if(update($connect,$actorID)){
		$data = getRoomData($connect,$roomID);
		mysqli_close($connect);
		usleep(500000);
		echo json_encode($data);
	}else{
		mysqli_close($connect);
		echo "error";
	}
?>