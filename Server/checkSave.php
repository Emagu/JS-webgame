<?php session_start();
    if($_SESSION['password_md5']=="" or $_SESSION['user']==""){
        echo json_encode(array("status" => 'fail'));
    }else{
        $pw_md5 = $_SESSION['password_md5'];
        $user = $_SESSION['user'];
        $roomID = $_SESSION['RoomID'];
        include("./connect/function.php");//引入函數庫
	    $connect = ConnectSql();
	    $sql = "SELECT * FROM member_list where username = '$user' and password = '$pw_md5'";
	    $result = mysqli_query($connect,$sql);
	    $row = mysqli_fetch_row($result);
	    if($row == null){
    		echo json_encode(array("status" => 'fail1'));
    	}else{
    	    $sql = "SELECT `Name` FROM `Map`;";
    	    $result = mysqli_query($connect,$sql);
    	    $Map = [];
    	    while($temp = mysqli_fetch_row($result)){
    	        array_push($Map,$temp);
    	    }
    	    if($Map==null) echo json_encode(array("status" => 'fail2'));
    	    else{
    	        echo json_encode(array( "status" => "Success",
    		                            "data" => array("UserID" => $row[0],
                                                     "ActorID" => $row[4],
                                                    "RoomID" => $row[5]
                                                  ),
                                        "Map" => $Map
                                    )
                            );
    	    }
    	}
    }
    
?>