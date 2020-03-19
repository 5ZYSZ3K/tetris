<?php
	session_start();
	if (isset($_POST['nick'])){
		$ok = true;
		$nick = $_POST['nick'];
		$email = $_POST['email'];
		$pass = $_POST['pass'];
		$pass2 = $_POST['pass2'];
		$key = "6LfQu6EUAAAAAAcQUVec6EfV1cgOwVXnbl2bBXgS";
		require_once "connect.php";
		if(!(strlen($nick) <= 20 && strlen($nick) >= 3) || !ctype_alnum($nick)){
			$ok = false;
			if (!(strlen($nick) <= 20 && strlen($nick) >= 3)){
				if (!ctype_alnum($nick)){
					$_SESSION['errn'] = "<font color='red'>Nick musi mieć od 3 do 20 znaków<br>Nick może zawierać wyłącznie znaki alfanumeryczne</font><br><br>";
				} else {
					$_SESSION['errn'] = "<font color='red'>Nick musi mieć od 3 do 20 znaków</font><br><br>";
				}
			}
			else{
				$_SESSION['errn'] = "<font color='red'>Nick może wyłącznie zawierać znaki alfanumeryczne</font><br><br>";
			}
		}
		$clemail = filter_var($email, FILTER_SANITIZE_EMAIL);
		if (!(filter_var($clemail, FILTER_VALIDATE_EMAIL)) || ($clemail != $email)){
			$ok = false;
			$_SESSION['erre'] = "<font color='red'>Niepoprawny adres e-mail</font><br><br>";
		}
		if(!(strlen($pass)>=8 && strlen($pass)<=20)){
			$ok = false;
			$_SESSION['errp'] = "<font color='red'>Hasło musi mieć od 8 do 20 znaków</font><br><br>";
		}
		if($pass != $pass2){
			$ok = false;
			$_SESSION['errp2'] = "<font color='red'>Hasła nie są identyczne</font><br><br>";
		}
		$hashpass = password_hash($pass, PASSWORD_DEFAULT);
		if (!isset($_POST['c1'])){
			$ok = false;
			$_SESSION['errc'] = "<br><font color='red'>Regulamin musi być zaakceptowany</font>";
		}
		$ck = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$key.'&response='.$_POST['g-recaptcha-response']);
		$cc = json_decode($ck);
		
		if (!($cc->success)){
			$ok = false;
			$_SESSION['errca'] = "<font color='red'>Wypełnij CAPTCHA</font><br><br>";
		}
		mysqli_report(MYSQLI_REPORT_STRICT);
		try{
			$polaczenie = new mysqli($host, $db_user, $db_password, $db_name);
			if ($polaczenie->connect_errno!=0){
				throw new Exception(mysqli_connect_errno());
			} else {
				$result = $polaczenie->query("SELECT scoreid FROM scores WHERE email='$email'");
				if (!$result) throw new Exception($polaczenie->error);
				if($result->num_rows > 0){
					$ok = false;
					$_SESSION['errm'] = "<font color='red'>Już istnieje konto z takim e-mailem</font><br><br>";
				}
				$result = $polaczenie->query("SELECT scoreid FROM scores WHERE nick='$nick'");
				if (!$result) throw new Exception($polaczenie->error);
				if($result->num_rows > 0){
					$ok = false;
					$_SESSION['errn'] = "<font color='red'>Nick zarezerwowany</font><br><br>";
				}
				if($ok){
					if ($polaczenie->query("INSERT INTO scores VALUES(NULL, '$nick', '$email', '$hashpass', 0)")){
						$_SESSION['okreg'] = true;
						header('Location: welcome.php');
					} else {
						throw new Exception($polaczenie->error);
					}
				}
				$polaczenie->close();
			}
		} catch(Exception $er){
			echo '<font color="red">Błąd serwera. Naprawię jak mi się zachce</font>'.$er;
		}
	}
?>

<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>TETRIS - register</title>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	<link rel="stylesheet" type="text/css" href="stylei.css" />
</head>

<body>
	<div id="container">
		<div id="frm">
			<form method="post">
				Nick: <br><input type="text" class="txt" name="nick" /> <br>
				<?php
					if (isset($_SESSION['errn'])){
						echo $_SESSION['errn'];
						unset($_SESSION['errn']);
					}
				?>
				E-mail: <br><input type="text" class="txt" name="email" /> <br>
				<?php
					if (isset($_SESSION['erre'])){
						echo $_SESSION['erre'];
						unset($_SESSION['erre']);
					}
					if (isset($_SESSION['errm'])){
						echo $_SESSION['errm'];
						unset($_SESSION['errm']);
					}
				?>
				Hasło: <br><input type="password" class="txt" name="pass" /> <br>
				<?php
					if (isset($_SESSION['errp'])){
						echo $_SESSION['errp'];
						unset($_SESSION['errp']);
					}
				?>
				Powtórz hasło: <br><input type="password" class="txt" name="pass2" /> <br><br>
				<?php
					if (isset($_SESSION['errp2'])){
						echo $_SESSION['errp2'];
						unset($_SESSION['errp2']);
					}
				?>
				<input type="checkbox" id="c1" name="c1" /> 
				<label for="c1" name="chbox"></label>
				Akceputję <span id="reg" onclick="slide()">regulamin</span>
				<?php
					if (isset($_SESSION['errc'])){
						echo $_SESSION['errc'];
						unset($_SESSION['errc']);
					}
				?>
				<br><br>
				<div class="g-recaptcha" data-sitekey="6LfQu6EUAAAAADYceT4tcCV6tj4Y2BqeO4iH6tIi"></div><br>
				<?php
					if (isset($_SESSION['errca'])){
						echo $_SESSION['errca'];
						unset($_SESSION['errca']);
					}
				?>
				<input type="submit" id="sd" value="Zarejestruj się" />
			</form>
		</div>
	</div>
	<script>
		var a;
		function rest(){
			document.getElementById("container").setAttribute("onclick", "del()");
		}
		function del(){
			document.getElementById("sl").remove();
			document.getElementById("container").style.opacity = 1;
			document.getElementById("container").removeAttribute("onclick");
		}
		function slide(){
			a = document.createElement("DIV");
			a.style.backgroundColor = "#071727";
			a.setAttribute("id", "sl");
			a.style.width = "400px";
			a.style.height = "600px";
			a.style.zIndex = "1";
			a.style.marginLeft = "auto";
			a.style.marginRight = "auto";
			a.style.marginTop = "auto";
			a.style.marginBottom = "auto";
			a.style.position = "relative";
			a.style.bottom = "850px";
			a.style.textAlign = "center";
			a.style.verticalAlign = "center";
			a.style.fontSize = "22px";
			a.innerHTML = "<br>1. Nie używaj swojego maila, bez sensu<br><br> 2. Nie używaj swojego hasła, bez sensu, a ponadto nie jestem przekonany do tych funkcji hashujących<br><br> 3. Powiadamiaj mnie o bugach (paw.por@wp.pl)<br> <br> 4. Nie oszukuj frajerze <br><br>5. Regulamin może być rozszerzany, jeśli ktoś ma pomysł";
			document.body.appendChild(a);
			document.body.style.height = "900px";
			setTimeout("rest()", 1);
			document.getElementById("container").style.opacity = 0.3;
		}
	</script>
</body>
</html>