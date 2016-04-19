<?php
    include("../connect/function.php");//引入函數庫
    include("../room/php/function.php");//引入函數庫
    include("../game/php/function.php");//引入函數庫
    $connect = ConnectSql();
    $time = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
    echo $time;
    //房間內玩家連線狀態確認
    $sql = "SELECT * FROM `room_actor_list`;";
    $res = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($res)){
        $roomID = $row['roomID'];
        $actorID = $row["actorID"];
        $outTime = (strtotime($time) - strtotime($row['lasttime']));
        $sql = "SELECT * FROM `room_list` WHERE `NO` = '$roomID';";
        $resq = mysqli_query($connect,$sql);
        $roomData = mysqli_fetch_assoc($resq);
        if($outTime>5){
            if($outTime>120 && $row['status']==1){
                if(!quitGame($connect,$actorID)) echo "error#1";
                if($roomData['RoomMaster']==$actorID) quitRoom($connect,$actorID,"true",$roomID);
        	    else quitRoom($connect,$actorID,"false",$roomID);
        	    echo 'Player NO.'.$actorID.' disconnect!<br/>';
            }else{
                if($roomData['RoomMaster']==$actorID) quitRoom($connect,$actorID,"true",$roomID);
                else quitRoom($connect,$actorID,"false",$roomID);
                echo 'Player NO.'.$actorID.' disconnect!<br/>';
            }
        }
    }
    
    //房間狀態確認
    $sql = "SELECT * FROM `room_list`";
    $res = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($res)){
        $roomID = $row['NO'];
        $sql = "SELECT * FROM `room_actor_list` WHERE `roomID` = '$roomID';";
        $resq = mysqli_query($connect,$sql);
        $actorNum = mysqli_num_rows($resq);
        if($actorNum==0) if(!delRoom($connect,$roomID))	echo "error#2";
    }
    
    //遊戲倒數
    if($row['status']!=0){
        $sql = "update `room_list` set reciprocal = reciprocal - 1 WHERE `NO` = '$roomID';";
        if(!mysqli_query($connect,$sql)){
            echo "error#3";
        }
    }
    mysqli_close($connect);
    sleep(1);
?>