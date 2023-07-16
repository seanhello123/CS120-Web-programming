<?php
// Function to display the office hours
function displayOfficeHours($hours)
{
    $output = '';
    foreach ($hours as $day => $hour) {
        $output .= "<p>{$day}: {$hour}</p>";
    }
    return $output;
}
?>
