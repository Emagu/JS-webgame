<?php
function checkActorNameConfig($ActorName){//確認角色名稱格式
	include("config.php");//引入設定檔
	$ActorNameLength = strlen($ActorName);
	if(($ActorNameLength>$name_length_max) or ($ActorNameLength < $name_length_min)){
		return 'error#3';
	}else{
		return "Success";
	}
}
function getActor($connect,$ActorName){//取得腳色資訊&確認角色是否存在
	$sql = "SELECT * FROM actor_list where actorName = '$ActorName'";
	$res = mysqli_query($connect,$sql);
	$row = mysqli_fetch_assoc($res);
	if($row){
		return json_encode($row);
	}else{
		return "error#4";
	}
}
//註冊函數
function newActor($connect,$userID,$actorName){
	$sql="INSERT INTO actor_list (userID, actorName, LV) VALUES ('$userID', '$actorName', '0');";
	if(mysqli_query($connect,$sql)){
		return "Success";
	}else{
		return "Error";
	}
}
?>