<?php session_start(); ?>
<meta content="text/html; charset=UTF8" http-equiv="content-type">
<?php
	//連接資料庫
	//只要此頁面上有用到連接MySQL就要include它
	
	include("function.php");//引入函數庫
	$id = $_POST['id'];
	$pw = $_POST['pw'];
	$password_md5 = md5($pw); //密碼加密
	/*
		error #1 帳號未輸入
		error #2 密碼未輸入
		error #3 查無使用者
		error #4 密碼錯誤
	*/
	if($id==""){
		echo'<meta http-equiv="refresh" content="0.2; url=login.php?error=1">';
	}elseif($pw==""){
		echo'<meta http-equiv="refresh" content="0.2; url=login.php?error=2">';
	}else{
		$error = login($id,$pw,$password_md5);//使用登入函數
		if($error[0] == "1"){
			echo'<meta http-equiv="refresh" content="0.2; url=login.php?error=3">';
		}elseif($error[0] == "2"){
			echo'<meta http-equiv="refresh" content="0.2; url=login.php?error=4">';
		}elseif($error[0] == "0"){
			echo "登入成功";
			$_SESSION['userID']=$error[1];
			$_SESSION['username']=$id;
			$_SESSION['level']=$error[2];
			echo'<meta http-equiv="refresh" content="2; url=../index.php">';
		}
	}
?>