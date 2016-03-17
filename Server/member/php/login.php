<?php
	//連接資料庫
	$database_name = "member";
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql($database_name);
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	
	include("config.php");//引入設定檔
	include("function.php");//引入函數庫
	$id = $_GET['name'];
	$pw = $_GET['pw'];
	$password_md5 = md5($pw); //密碼加密
	/*
		error #1 帳號未輸入
		error #2 密碼未輸入
		error #3 查無使用者
		error #4 密碼錯誤
	*/
	if($id==""){
		echo 'error#1';
	}elseif($pw==""){
		echo 'error#2';
	}else{
		$error = login($connect,$id,$pw,$password_md5);//使用登入函數
		if($error[0] == "1"){
			echo 'error#1';
		}elseif($error[0] == "2"){
			echo 'error#4';
		}elseif($error[0] == "0"){
			echo "Success#1";
		}
	}
?>