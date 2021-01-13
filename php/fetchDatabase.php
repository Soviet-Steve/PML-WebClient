<?php
require_once 'fetchDatabase.php';
$hn = 'localhost';
$db = 'pml_tag';
$un = 'tag_user';
$pw = 'cowdatabasepassword';
$conn = new mysqli($hn, $un, $pw, $db);
if($conn->connect_error) die("Fatal error");

$info = "SELECT * FROM Info";
$info = $conn->query($info);

$comms = "SELECT * FROM Comms";
$comms = $conn->query($comms);



$info_output = array($info->fetch_array(MYSQLI_NUM));

for($i = 0; $i < $info->num_rows - 1; $i++){
    $temp = array($info->fetch_array(MYSQLI_NUM));
    $info_output = array_merge($info_output, $temp);
}

$comms_output = array($comms->fetch_array(MYSQLI_NUM));

for($i = 0; $i < $comms->num_rows - 1; $i++){
    $temp = array($comms->fetch_array(MYSQLI_NUM));
    $comms_output = array_merge($comms_output, $temp);
}

$output = array_merge($comms_output, $info_output);

echo json_encode($output);



mysqli_close($conn);
?>