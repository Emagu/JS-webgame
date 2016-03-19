<?php
	include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
	mysqli_query($connect,"SET CHARACTER SET UTF8");
	include("function.php");//引入函數庫
//抓取資料
	$name = $_GET['name'];
	$id = $_GET['id'];
	/*
		error #1	未收到使用者編號
		error #2	未輸入角色名稱
		error #3	角色名稱長度不符
		error #4	角色名稱已存在
		error #5	SQL登入失敗
		error #6	SQL更新失敗
	*/
	if($id==""){
		echo 'error#1';
	}elseif($name==""){
		echo 'error#2';
	}elseif(!checkActorNameConfig($name)){
		echo 'error#3';
	}else{
		if(getActor($connect,$name)=="error#4"){
			if(newActor($connect,$id,$name)){
				$data = getActor($connect,$name);
				if(updateUser($connect,$data)){
					echo json_encode($data);
				}else{
					echo 'error#6';
				}
			}else{
				echo 'error#5';
			}
		}else{
			echo 'error#4';
		}
	}
?>