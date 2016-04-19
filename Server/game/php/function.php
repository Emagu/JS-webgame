<?php
    function getTurn($connect,$roomID){
        $sql = "select * from `room_list` where `NO` = '$roomID';";
        $res = mysqli_query($connect,$sql);
        $row = mysqli_fetch_assoc($res);
        if($row != null){
            return $row['turn'];
        }
    }
    function getRecount($connect,$roomID){
        $sql = "select * from `room_list` where `NO` = '$roomID';";
        $res = mysqli_query($connect,$sql);
        $row = mysqli_fetch_assoc($res);
        if($row != null){
            return $row['reciprocal'];
        }
    }
    function getActor($connect,$roomData){
        $sql = "select `ItemID`,`X`,`Y`,`type` from `game_table` where `RoomID` = '$roomData';";
        $res = mysqli_query($connect,$sql);
        $data = [];
        while($item = mysqli_fetch_assoc($res)){
            $itemID = $item['ItemID'];
            $itemType = $item['type'];
            if($itemType=='player'){
                $sql = "select `ActorID`,`HP`,`AP`,`command` from `game_player_table` where `NO` = '$itemID';";
                $res = mysqli_query($connect,$sql);
                $actor = mysqli_fetch_assoc($res);
                array_push($data, array('ItemID' => $itemID,
                                        'type' => 'player',
                                        'Postion' => array('X' => $item['X'], 'Y' => $item['Y']),
                                        'ActorData' => $actor
                                    )
                            );
            }else{
                array_push($data, array('ItemID' => $itemID,
                                        'type' => 'player',
                                        'Postion' => array('X' => $item['X'], 'Y' => $item['Y'])
                                    )
                            );
            }
        }
        return $data;
    }
    function quitGame($connect,$actorID){
        //找到userID
        $sql = "select `userID` from `actor_list` where `NO` = '$actorID';";
        $res = mysqli_query($connect,$sql);
        $data = mysqli_fetch_assoc($res);
        $userID = $data['userID'];
        //找到itemID
        $sql = "SELECT `NO` FROM `game_player_table` WHERE `ActorID` = '$actorID';";
        $res = mysqli_query($connect,$sql);
        $data = mysqli_fetch_assoc($res);
        $itemID = $data['NO'];
        //開始砍
        $sql="DELETE FROM `game_player_table` WHERE `ActorID` = '$actorID';";
        if(mysqli_query($connect,$sql)){
            $sql="DELETE FROM `game_table` WHERE `ItemID` = '$itemID';";
            if(mysqli_query($connect,$sql)){
                $sql = "update `member_list` set `RoomID` = '0' where `NO` = '$userID';";
                if(mysqli_query($connect,$sql)) return true;
                else return false;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
    }
?>
