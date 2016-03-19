<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	include("function.php");//引入函數庫
	$name = $_GET['name'];
	if(checkActorNameConfig($name)){
		echo getActor($connect,$name);
	}else{
		echo 'error#1';	
	} 
	mysqli_close($connect);
?>