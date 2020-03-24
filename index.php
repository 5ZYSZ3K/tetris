<?php

	session_start();
	
	if ((isset($_SESSION['zalogowany'])) && ($_SESSION['zalogowany']==true))
	{
		header('Location: gra.php');
		exit();
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
		<form action="zaloguj.php" method="post">
			Login: <br /> <input type="text" class="txt" name="login" /> <br/>
			Hasło: <br /> <input type="password" class="txt" name="haslo" /> <br><br/>
			<input type="submit" id="sd" value="Zaloguj się" /> <br/><br><br>
		</form>
		Nie masz konta?
		<a href="register.php">
			<input type="button" id="sd" value="Zarejestruj się"/>
		</a>
	</div>
<?php
	if(isset($_SESSION['blad']))	echo $_SESSION['blad'];
?>
</body>
</html>