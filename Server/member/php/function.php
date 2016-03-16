<?php
/*
	會員系統
	
	錯誤訊息
	error#0 沒有問題
	error#1 查無使用者
	error#2 密碼錯誤
	error#3 已有使用者
	error#4	註冊失敗
*/
//登入函數
function login($username,$password,$password_md5){
	$error[] = null;
	include("../connect/function.php");
	$connect = ConnectSql("member");
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	$sql = "SELECT * FROM member_table where username = '$username'";
	$result = mysqli_query($connect,$sql);
	$row = mysqli_fetch_row($result);
	if($username!=$row[1]){
		$error[0] = "1";
		return $error;
	}elseif($password_md5!=$row[3])	{
		$error[0] = "2";
		return $error;
	}else{
		$error[0] = "0";
		$error[1] = $row[0];
		$error[2] = $row[4];
		return $error;
	}
}
//註冊函數
function reg($username,$email,$password_md5){
	include("../connect/function.php");
	$connect = ConnectSql("member");
	$error = "0";
	$sql = "SELECT * FROM member_list where username = '$username'";
	$result = mysql_query($sql);
	$row = mysql_fetch_row($result);
	if($username==$row[1]){
		$error = "3";
		return $error;
	}
	$sql="INSERT INTO member_table (username, email, password) VALUES ('$username', '$email', '$password_md5');";
	if(mysql_query($sql)){
		return $error;
	}else{
		$error = "4";
		return $error;
	}
}
//登出函數
function logout()
{
	unset($_SESSION['username']);
	unset($_SESSION['userID']);
	unset($_SESSION['level']);
	unset($_SESSION['del_name']);
	echo "登出中...";
	echo '<meta http-equiv=REFRESH CONTENT=1;url=../index.php>';
}
?>