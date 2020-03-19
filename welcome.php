<?php

	session_start();
	
	if (!(isset($_SESSION['okreg']))){
		header('Location: index.php');
		exit();
	} else {
		unset($_SESSION['okreg']);
	}

?>

<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>TETRIS - login</title>
	<link rel="stylesheet" type="text/css" href="stylei.css" />
</head>

<body>
	<div id="frm">
		Zarejestrowano pomyślnie
		<a href="index.php">
			<input type="button" id="sd" value="Zaloguj się"/>
		</a>
	</div>
</body>
</html>