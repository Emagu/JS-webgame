<?php
    include("../../connect/function.php");//引入連線函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    $Master = $data_res["Master"];
    $ActorID = $data_res["ActorID"];
    $RoomID = $data_res["RoomID"];
    if(quitRoom($connect,$ActorID)){
        if($Master=="true"){
            $data = getRoomData($connect,$RoomID);
            echo count($data); 
            if(count($data)==0) {
                if(!delRoom($connect,$RoomID)){
                    echo "error#2";
                }
            }else{
                $newRoomMaster = $data[0]['ActorID'];
                $sql = "UPDATE `room_list` SET `RoomMaster` = '$newRoomMaster' WHERE NO = '$RoomID';";
                if(!mysqli_query($connect,$sql)){
                    echo "error#3";
                }
            }
        }
        mysqli_close($connect);
    }else{
        echo "error#1";
        mysqli_close($connect);
    }
?>