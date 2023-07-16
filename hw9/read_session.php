<?php
// Include the utils.php file
include_once("utils.php");

// Start the session
session_start();

// Retrieve the hours data from the session variable
$hoursJson = $_SESSION['hours'];
// Convert the JSON string to an array
$hours = json_decode($hoursJson, true);

// Call the function to display the office hours
$hoursOutput = displayOfficeHours($hours);
?>

<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <?php
    echo $hoursOutput; 
    // remove all session variables
    session_unset();
    // destroy the session
    session_destroy();
    ?>
</body>
</html>
