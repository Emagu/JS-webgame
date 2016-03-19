<?php
function checkActorNameConfig($ActorName){//確認角色名稱格式
	include("config.php");//引入設定檔
	$ActorNameLength = strlen($ActorName);
	if(($ActorNameLength>$name_length_max) or ($ActorNameLength < $name_length_min)){
		return false;
	}else{
		return true;
	}
}
function getActor($connect,$ActorName){//取得腳色資訊&確認角色是否存在
	$sql = "SELECT * FROM actor_list where actorName = '$ActorName'";
	$res = mysqli_query($connect,$sql);
	$row = mysqli_fetch_assoc($res);
	if($row){
		return $row;
	}else{
		return "error#4";
	}
}

function newActor($connect,$userID,$actorName){//註冊函數
	$sql="INSERT INTO actor_list (userID, actorName, LV) VALUES ('$userID', '$actorName', '0');";
	if(mysqli_query($connect,$sql)){
		return true;
	}else{
		return false;
	}
}
function updateUser($connect,$data){
	$actorID = $data["NO"];
	$userID = $data["userID"];
	$query="UPDATE `member_list` SET ActorID = '$actorID' WHERE `NO` = '$userID';";
	if(mysqli_query($connect, $query)){
		mysqli_close($connect);
		return true;
	}else{
		mysqli_close($connect);
		return false;
	}
}

?>