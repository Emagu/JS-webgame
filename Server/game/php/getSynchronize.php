<?php
    include("../../connect/function.php");//引入函數庫
    include("./function.php");//引入函數庫
	$connect = ConnectSql();
	$data = $_GET['data'];
	$data_res = json_decode($data,true);
	sleep(1);
	if(update($connect,$data_res['ActorID'])){
	    echo json_encode($arrayName = array('Item' => getActor($connect,$data_res['RoomID']),
	    									'turn' => getTurn($connect,$data_res['RoomID']),
	    									'recount' => getRecount($connect,$data_res['RoomID'])
	    								)
	    							) ;
	    mysqli_close($connect);
	}else{
		mysqli_close($connect);
		echo "error";
	}
	
?>