<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	include("function.php");//引入函數庫
	$name = $_GET['name'];
	
	$sql = "SELECT * FROM room_list where Name = '$name'";
	$res = mysqli_query($connect,$sql);
	$row = mysqli_fetch_assoc($res);
	if($row){
		echo "Success";
	}else{
		echo "error";
	}
	mysqli_close($connect);
?>