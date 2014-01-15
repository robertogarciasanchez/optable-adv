<?php

/**
*
* Devuelve un objeto JSON con toda la información necesaria para jugar
* @author Roberto García
*
*/

header('Content-Type: text/html; charset=UTF-8');

$mysql_hostname = "localhost";
$mysql_user = "lampp";
$mysql_password = "root10";
$mysql_database = "etrauma";

    
$actions = array();
$actions = getActions($con, $id);

echo json_encode($actions);


function getActions($con, $id){    
    $query="SELECT usuario,idAccion, receptorAccion, orden, descripcion  FROM accionUsuari;";
    echo "hola";
    if($stmt = $con->prepare($query)){
        //$stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($actor,$action, $receptor, $material, $etapa);
        $stmt->store_result();
        
        if($stmt->num_rows > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                
                $row[$i]->actor= ucfirst(utf8_encode($actor));
                $row[$i]->action= ucfirst(utf8_encode($action));
                $row[$i]->receptor= ucfirst(utf8_encode($receptor));
                $row[$i]->material= ucfirst(utf8_encode($material));
                $row[$i]->etapa= ucfirst(utf8_encode($etapa));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

?>