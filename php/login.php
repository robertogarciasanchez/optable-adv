<?php

$mysql_hostname = "localhost";
$mysql_user = "lampp";
$mysql_password = "root10";
$mysql_database = "etrauma";

if(isset($_POST['name'])){
    $con = mysqli_connect($mysql_hostname,$mysql_user,$mysql_password,$mysql_database) or die("Connection error: " . mysqli_error($con));

    $name = $_POST['name'];
    $pwd = $_POST['pwd'];
    
    $stmt = $con->prepare("SELECT username, password FROM users WHERE username = ? AND password = ? LIMIT 1");
    $stmt->bind_param('ss', $name, $pwd);
    $stmt->execute();
    $stmt->bind_result($name, $pwd);
    $stmt->store_result();
    if($stmt->num_rows == 1){
        echo true;
    }
    else{
        echo false;
    }
    $stmt->close();
}
return false;

?>