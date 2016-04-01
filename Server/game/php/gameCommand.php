<?php
    include("../../connect/function.php");//引入函數庫
	$connect = ConnectSql();
    $data = $_GET['data'];
    $data_res = json_decode($data,true);
    print_r($data_res);
?>