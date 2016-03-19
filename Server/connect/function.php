<?php 
    $database_host = "127.0.0.1";
	$database_username = "emagu";
	$database_password = "";
	$database_port = "3306";
	$database_name = "webgame";
    function ConnectSql(){
        global $database_host, $database_username, $database_password, $database_port,$database_name;
	    $connect = mysqli_connect($database_host, $database_username, $database_password, $database_name, $database_port)or die(mysql_error());
	    mysqli_query($connect,"SET CHARACTER SET UTF8");
	    return $connect;
    }
?>