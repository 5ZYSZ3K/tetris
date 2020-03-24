<?php
	session_start();
	$score = $_POST['score'];
	$nick = $_SESSION['user'];
	$id = $_SESSION['id'];
	if ($_SESSION['score'] < $score){
		$_SESSION['score'] = $score;
		require_once "connect.php";
		mysqli_report(MYSQLI_REPORT_STRICT); 
		try{
			$polaczenie = new mysqli($host, $db_user, $db_password, $db_name);
			if ($polaczenie->connect_errno!=0){
				throw new Exception(mysqli_connect_errno());
			} else {
				$sql = "UPDATE scores SET score = ".$score." WHERE scoreid=".$id;
				$result = $polaczenie->query($sql);
				if (!$result){
					throw new Exception($polaczenie->error);
				}
				$polaczenie->close();
			}
			header("Location: gra.php");
		} catch(Exception $er){
			$_SESSION['be'] = $er;
			header("Location: gra.php");
		}
	} else {
		header("Location: gra.php");
	}
?>