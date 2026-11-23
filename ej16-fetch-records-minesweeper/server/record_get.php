<?php
if(isset($_GET['level'])) {

    class record {
        var $nick;
        var $duration;
    }
    function queryRecords($level,$conexion) {
        $consulta = "SELECT * FROM game_times WHERE level = ".$level ;
        $sen = $conexion->prepare($consulta);
        $sen->execute();
        $result = [];
        while($row = $sen->fetch(PDO::FETCH_NAMED)){
            $rec = new record();
            $rec->nick = $row['nick'];
            $rec->duration = $row['duration'];
            $result[] = $rec;
        }
        return $result;
    }

    $server = "mysql:dbname=records_minesweeper";
	$user = "root";
	$pw = "";
	$con = new PDO($server,$user,$pw,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));

   
    echo json_encode( queryRecords($_GET['level'],$con) );
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'level'";
}
?>