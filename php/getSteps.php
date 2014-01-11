<?php

$mysql_hostname = "localhost";
$mysql_user = "lampp";
$mysql_password = "root10";
$mysql_database = "etrauma";

    $con = mysqli_connect($mysql_hostname,$mysql_user,$mysql_password,$mysql_database) or die("Connection error: " . mysqli_error($con));

    //$name = $_POST['name'];
    //$pwd = $_POST['pwd'];
    
    $id='4857';
    
    $query="SELECT simptoma.nom as sintoma
    FROM problemaTraumatologic, simptomaPossible, simptoma
    WHERE
        problemaTraumatologic.id = simptomaPossible.idProblemaTraumatologic and
        simptomaPossible.idSimptoma = simptoma.id and
        problemaTraumatologic.id=?;";
    
    if($stmt = $con->prepare($query)){
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($sintoma);
        $stmt->store_result();
        $contador= $stmt->num_rows;
        
        if($contador > 0){
            while ($stmt->fetch()) {
                printf("%s <br/>", ucfirst($sintoma));
            } 
        }
        else{
            echo ("naaaaa");
        }
        $stmt->free_result();
        $stmt->close();
    }

?>