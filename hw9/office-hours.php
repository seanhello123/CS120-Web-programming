<?php
// Define the office hours associative array
$officeHours = [
    'Monday'    => '9am - 4pm',
    'Tuesday'   => '9am - 4pm',
    'Wednesday' => '9am - 4pm',
    'Thursday'  => '9am - 4pm',
    'Friday'    => '9am - 4pm',
    'Saturday'  => 'Closed',
    'Sunday'    => 'Closed'
];

// Convert the array to a JSON string
$hoursJson = json_encode($officeHours);

// Start the session
session_start();

// Store the JSON string in a session variable
$_SESSION['hours'] = $hoursJson;

// Function to display the office hours
function displayOfficeHours($hours)
{
    $output = '';
    foreach ($hours as $day => $hour) {
        $output .= "<p>{$day}: {$hour}</p>";
    }
    return $output;
}

// Call the function to display the office hours
$hoursOutput = displayOfficeHours($officeHours);

// Display the output
echo $hoursOutput;
?>
