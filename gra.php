<?php

	session_start();
	
	if (!isset($_SESSION['zalogowany']))
	{
		header('Location: index.php');
		exit();
	}
	
?>
<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8"/>
	<title>TETRIS</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body onload="main()">
	<div id="container">
		<div id="container2">
			<div id="score">
				<div id="score1">SCORE</div>
				<div id="t">TIME</div>
				<div id="lvl">LVL</div>
				<div id="lines">LINES</div>
			</div>
			<div id="tet">
				<div id="obr">
					<img src="tetris.png" width="230" id="obr2" onclick="rand()"></img>
				</div>
				<div id="parent"></div>
			</div>
			<div id="psquares">
				<div id="squares1" class="squares"><span></span></div>
				<div id="squares2" class="squares"></div>
				<div id="squares3" class="squares"></div>
			</div>
			<div id="side">
				<?php
					echo "<p>Witaj ".$_SESSION['user'].'! <a href="logout.php"><input type="submit" id="sd" value="Wyloguj się!" /></a><br><input type="submit" id="se" onclick="slide1()" value="Najlepsze wyniki" /><input type="submit" onclick="slide()" id="sd" value="Sterowanie" />';
					if (isset($_SESSION['be'])){
						echo $_SESSION['be'];
					}
				?>
			</div>
		</div>
	</div>
		<div style="clear: both;"></div>
		<div id="scores">
		<?php
			require_once "connect.php";
			mysqli_report(MYSQLI_REPORT_STRICT);
			try{
				$polaczenie = new mysqli($host, $db_user, $db_password, $db_name);
				if ($polaczenie->connect_errno!=0){
					throw new Exception(mysqli_connect_errno());
				} else {
					$sql = "SELECT nick, score FROM scores ORDER BY score DESC LIMIT 20";
					$result = mysqli_query($polaczenie, $sql);
					if (!$result){
						throw new Exception($polaczenie->error);
					} else {
						$rows = mysqli_num_rows($result);
						if ($rows>=1) {
							$h = 234;
							echo<<<END
							<div class="cell"><font color="red">nick</font></div>
							<div class="cell"><font color="red">wynik</font></div><br>
END;
							for ($i = 1; $i <= $rows; $i++) {
							$row = mysqli_fetch_assoc($result);
							$nick = $row['nick'];
							$score = $row['score'];	
							echo<<<END
							<div class="cell">$nick</div>
							<div class="cell">$score</div><br>
END;
									
							}
						}
					}
					$polaczenie->close();
				}
			} catch(Exception $er){
				$_SESSION['berrr'] = $er;
			}
		?>
		</div>
	<script src="skrypciur.js"></script>
</body>
</html>