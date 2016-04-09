<?php
    include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
    $roomID = $_GET['roomID'];
    $sql = "SELECT * FROM room_list where NO = '$roomID'";
    $res = mysqli_query($connect,$sql);
    if($res != null){
        $roomData = mysqli_fetch_assoc($res);
        $Map = "../maps/Map".$roomData['Map'].".txt";
        $MapData = json_decode(file_get_contents($Map),true);
        $sql = "select * From `room_actor_list` where `roomID` = '$roomID';";
        $res = mysqli_query($connect,$sql);
        sleep(5);
        echo json_encode(array("Map" => $MapData["Map"]));
        
    }
    
    
?>