<?php
    include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
    $roomID = $_GET['roomID'];
    $sql = "SELECT * FROM room_list where NO = '$roomID'";
    $res = mysqli_query($connect,$sql);
    if($res != null){
        $roomData = mysqli_fetch_assoc($res);
        $Map = "../../game/maps/Map".$roomData['Map'].".txt";
        $MapData = json_decode(file_get_contents($Map),true);
        $Player = $MapData['Player'];
        $Item = $MapData['House'];
        $sql = "select `actorID`,`position` From `room_actor_list` where `roomID` = '$roomID';";
        $res = mysqli_query($connect,$sql);
        while($actor = mysqli_fetch_assoc($res)){            
            $actorID = $actor['actorID'];
            $actorPos = $Player[$actor['position']];
            $XPos = $actorPos["X"];
            $YPos = $actorPos["Y"];
            $sql = "insert into `game_player_table` ( ActorID ,HP, AP, command) values ( '$actorID', 100, 100, '');";
            if(mysqli_query($connect,$sql)){
                $itemID = mysqli_insert_id($connect);
                $sql = "insert into `game_table` ( RoomID, ItemID, X, Y, type) VALUES ( '$roomID', '$itemID', '$XPos', '$YPos', 'player')";
                if(mysqli_query($connect,$sql)){
                    $sql = "update `room_list` set `status` = 1 where NO = '$roomID'";
                    if(mysqli_query($connect,$sql)){
                		echo "scess";
                    }else{
                		echo "error#3";
                    }
                }else{
		            echo "error#2";
                }
            }else{
		        echo "error#1";
            }
        }
    }
    mysqli_close($connect);
    
?>