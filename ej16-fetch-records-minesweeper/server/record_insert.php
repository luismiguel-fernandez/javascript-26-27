<?php
if(isset($_POST['nick'])&&isset($_POST['level'])&&isset($_POST['duration'])) {
		$server = "mysql:dbname=records_minesweeper";
		$user = "root";
		$pass = "";
		$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));

		$consulta = "INSERT INTO game_times(nick,level,duration) VALUES(?,?,?)";
		$sen = $con->prepare($consulta);
        $sen->bindParam(1,$_POST['nick']);
        $sen->bindParam(2,$_POST['level']);
        $sen->bindParam(3,$_POST['duration']);
		$sen->execute();
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'nick', 'level' y 'duration'";
}
?>