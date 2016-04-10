<?php
    include("../../connect/function.php");//引入函數庫
	include("./function.php");//引入函數庫
	$connect = ConnectSql();
    $roomID = $_GET['roomID'];
    $sql = "SELECT * FROM room_list where NO = '$roomID'";
    $res = mysqli_query($connect,$sql);
    if($res != null){
        $roomData = mysqli_fetch_assoc($res);
        $Map = "../maps/Map".$roomData['Map'].".txt";
        $MapData = json_decode(file_get_contents($Map),true);
        $ItemData = getActor($connect, $roomID);
        sleep(5);
        mysqli_close($connect);
        echo json_encode(array("Map" => $MapData["Map"], "Item" => $ItemData));
    }
    
    
?>