<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	include("config.php");//引入設定檔
	include("function.php");//引入函數庫
//抓取資料
	$data = $_GET['data'];
	$data_res = json_decode($data,true);
	$id = $data_res['Name'];
	$email = $data_res['Mail'];
	$pw = $data_res['PW'];
	$pw2 = $data_res['PW2'];
	/*
		error #1	未輸入帳號
		error #2	未輸入密碼
		error #3	未輸入第二次密碼
		error #4	未輸入eMail
		error #5	輸入帳號長度不符
		error #6	輸入密碼長度不符
		error #7	輸入第二次密碼長度不符
		error #8	輸入信箱無效
		error #9	輸入密碼兩次不相同
		error #10	已有使用者
		error #11	註冊失敗
		Success #1  註冊成功	*/
	if($id==""){
		echo 'error#1';
	}elseif($pw==""){
		echo 'error#2';
	}elseif($pw2==""){
		echo 'error#3';
	}elseif($email==""){
		echo 'error#4';
	}else
	{
		$idLength = strlen($id);
		$pwLength = strlen($pw);
		$pw2Length = strlen($pw2);
		if(($idLength>$reg_username_length_max) or ($idLength < $reg_username_length_min)){
			echo 'error#5';
		}elseif(($pwLength>$reg_password_length_max) or ($pwLength < $reg_password_length_min)){
			echo 'error#6';
		}elseif(($pw2Length>$reg_password_length_max) or ($pw2Length < $reg_password_length_min)){
			echo 'error#7';
		}elseif(!preg_match('/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/',$email)){
			echo 'error#8';
		}elseif($pw!=$pw2){
			echo 'error#9';
		}else{
			$password_md5 = md5($pw); //密碼加密
			$error = reg($connect,$id,$email,$password_md5);//使用註冊函數
			switch($error){
				case "0":
					echo 'Success#1';
				break;
				case "3":
					echo 'error#10';
				break;
				case "4":
					echo 'error#11';
				break;
			}
		}		
	}
?>