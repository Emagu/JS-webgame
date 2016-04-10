<?php
    function update($connect,$actorID){
        $datetime = date ("Y-m-d H:i:s" , mktime(date('H')+8, date('i'), date('s'), date('m'), date('d'), date('Y')));
        $sql = "UPDATE `room_actor_list` SET `lasttime` = '$datetime' WHERE `actorID` = '$actorID';";
        if(mysqli_query($connect,$sql)) return true;
        else return false;
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
?>
