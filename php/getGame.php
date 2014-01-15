<?php

/**
*
* Devuelve un objeto JSON con toda la información necesaria para jugar
* @author Roberto García
*
*/

header('Content-Type: text/html; charset=UTF-8');

class game {
    public $problema;   
    public $sintomas;
    public $causas;
    public $pruebas;
    public $tratamientos;
    public $personal;
    public $actions;
}

$mysql_hostname = "localhost";
$mysql_user = "lampp";
$mysql_password = "root10";
$mysql_database = "etrauma";

    $con = mysqli_connect($mysql_hostname,$mysql_user,$mysql_password,$mysql_database) or die("Connection error: " . mysqli_error($con));
    mysql_query("SET NAMES 'utf8'");
    $id = $_POST['id'];
$id='4857';
$game= new game();
$game->problema=getProblema($con, $id);
$game->sintomas = array();
$game->sintomas = getSintomas($con, $id);
$game->causas = array();
$game->causas = getCausas($con, $id);
$game->pruebas = array();
$game->pruebas = getPruebas($con, $id);
$game->tratamientos = array();
$game->tratamientos = getTratamientos($con, $id);
$game->personal = array();
$game->personal = getPersonal($con, $id);
$game->actions = array();
$game->actions = getActions($con, $id);

echo json_encode($game);

function getProblema($con, $id){
    $query="SELECT problemaTraumatologic.nom,problemaTraumatologicUsuari.descripcio  
    FROM problemaTraumatologic, problemaTraumatologicUsuari
    WHERE
	problemaTraumatologic.id = problemaTraumatologicUsuari.id and
	problemaTraumatologic.id = ?;";
        
if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($nombre, $descripcion);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            $stmt->fetch();
            $result->nombre=utf8_encode($nombre);
            $result->descripcion=utf8_encode($descripcion);
            return $result;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

    
function getSintomas($con, $id){    
    $query="SELECT simptoma.nom
    FROM problemaTraumatologic, simptomaPossible, simptoma
    WHERE
        problemaTraumatologic.id = simptomaPossible.idProblemaTraumatologic and
        simptomaPossible.idSimptoma = simptoma.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                $row[$i] = ucfirst(utf8_encode($result));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

function getCausas($con, $id){    
    $query="SELECT causa.nom
    FROM problemaTraumatologic, causaPossible, causa
    WHERE 
        problemaTraumatologic.id = causaPossible.idProblemaTraumatologic and
        causaPossible.idcausa = causa.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                $row[$i] = ucfirst(utf8_encode($result));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

function getPruebas($con, $id){    
    $query="SELECT provaClinica.nom
    FROM problemaTraumatologic, provaClinicaPossible, provaClinica
    WHERE 
        problemaTraumatologic.id = provaClinicaPossible.idProblemaTraumatologic and
        provaClinicaPossible.idProvaClinica = provaClinica.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                $row[$i] = ucfirst(utf8_encode($result));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

function getTratamientos($con, $id){    
    $query="SELECT tractament.nom, tractamentPossible.condicionsAplicacio, tractamentUsuari.descripcio
    FROM problemaTraumatologic, tractamentPossible, tractament , tractamentUsuari
    WHERE 
	problemaTraumatologic.id = tractamentPossible.idProblemaTraumatologic and
	tractamentPossible.idtractament = tractament.id and
	tractamentPossible.idtractament = tractamentUsuari.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($nombre, $aplicacion, $descripcion);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                $row[$i]->nombre = ucfirst(utf8_encode($nombre));
                $row[$i]->aplicacion = ucfirst(utf8_encode($aplicacion));
                $row[$i]->descripcion = ucfirst(utf8_encode($descripcion));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

function getPersonal($con, $id){    
    $query="SELECT rolusertype.nom
    FROM problemaTraumatologic, tractamentPossible, implementacioPossible, personalNecessari, rolusertype
    WHERE 
	problemaTraumatologic.id = tractamentPossible.idProblemaTraumatologic and
	tractamentPossible.idTractament = implementacioPossible.idTractament and
	tractamentPossible.condicionsAplicacio = 'surgeon'  and
	implementacioPossible.idImplementacio = personalNecessari.idImplementacio and
	personalNecessari.idroluser = rolusertype.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($personal);
        $stmt->store_result();
        
        if($stmt->num_rows > 0){
            $row = array();
            $i=0;
            while($stmt->fetch()){
                $row[$i]= ucfirst(utf8_encode($personal));
                $i++;
            }
            return $row;
        }
        $stmt->free_result();
        $stmt->close();
        return false;
    }
}

function getActions($con, $id){    
    $query="SELECT 
	accionUsuari.orden,
        rolusertype.nom,
        accionNom,
        receptorNom,
	material,
        etapa.nom
		
FROM 
	problemaTraumatologic, 
	tractamentPossible, 
	tractament, 
	implementacioPossible, 
	implementacio,
	rolusertype,
	etapaIntraop,
	etapa,
	accionUsuari,
	accion,
	receptor
WHERE 
	problemaTraumatologic.id = tractamentPossible.idProblemaTraumatologic and
	tractamentPossible.idtractament = tractament.id and
	tractamentPossible.idTractament = implementacioPossible.idTractament and
	tractamentPossible.condicionsAplicacio = 'surgeon' and
	implementacioPossible.idImplementacio = implementacio.id  and
	implementacioPossible.idImplementacio = etapaIntraop.idImplementacio and
	etapaIntraop.idEtapa = etapa.id and
	etapa.id = accionUsuari.idEtapa and
	accionUsuari.usuario = rolusertype.id and
	accionUsuari.receptor = receptor.id and
	accionUsuari.idAccion = accion.id and
	problemaTraumatologic.id=?
        order by orden;";

    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($orden,$actor,$action, $receptor, $material, $etapa);
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