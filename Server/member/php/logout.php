<?php session_start(); ?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>登出中...</title>
	</head>
	<body>
		<?if($_SESSION['username']==null){
			echo'<meta http-equiv="refresh" content="0.1; url=../index.php">';
		}else{?>
			<h1 style="text-align: center;">登出中...</h1>
				<div style="text-align: center;">
					<?
						include("function.php");
						logout();//使用登出函數
		}?>
				</div>
	</body>

</html>