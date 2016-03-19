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
function login($connect,$username,$password,$password_md5){
	$error[] = null;
	$sql = "SELECT * FROM member_list where username = '$username'";
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
function reg($connect,$username,$email,$password_md5){
	$error = "0";
	$sql = "SELECT * FROM member_list where username = '$username'";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
	$result = mysqli_query($connect,$sql);
	$row = mysqli_fetch_row($result);
	if($username==$row[1]){
		$error = "3";
		mysqli_close($connect);
		return $error;
	}
	$sql="INSERT INTO member_list (username, email, password, ActorID) VALUES ('$username', '$email', '$password_md5', '-1');";
	if(mysqli_query($connect,$sql)){
		mysqli_close($connect);
		return $error;
	}else{
		$error = "4";
		mysqli_close($connect);
		return $error;
	}
}
?>