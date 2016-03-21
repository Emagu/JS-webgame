<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	include("function.php");//引入函數庫
//抓取資料
	$id = $_GET['id'];
	/*
		error #1	未收到使用者編號
		error #2	角色不存在
	*/
	if($id==""){
		echo 'error#1';
	}else{
		$data = getActorByID($connect,$id);
		if($data=="error#4"){
			echo 'error#2';
		}else{
			echo json_encode($data);
		}
	}
?>