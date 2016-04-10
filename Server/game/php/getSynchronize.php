<?php
    include("../../connect/function.php");//引入函數庫
    include("./function.php");//引入函數庫
	$connect = ConnectSql();
	$data = $_GET['data'];
	$data_res = json_decode($data,true);
	if(update($connect,$data_res['ActorID'])){
	    echo json_encode(getActor($connect,$data_res['RoomID'])) ;
	    mysqli_close($connect);
	}
?>