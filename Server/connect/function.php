<?php 
    function ConnectSql($database_name){
        include("config.php");
	    $connect = mysqli_connect($database_host, $database_username, $database_password, $database_name, $port)or die(mysql_error());
	    mysqli_query($connect,"SET CHARACTER SET UTF8");
	    return $connect;
    }
?>