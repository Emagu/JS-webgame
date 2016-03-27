<?php
	include("../../connect/function.php");//引入函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
//抓取資料
	$roomID = $_GET['roomID'];
	$data = getRoomData($connect,$roomID);
	mysqli_close($connect);
	sleep(1);
	echo json_encode($data);
?>