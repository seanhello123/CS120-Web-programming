<?php
// Get the value of the "n" query string parameter
$n = isset($_GET['n']) ? intval($_GET['n']) : 1;

// Generate the times table
for ($i = 1; $i <= 12; $i++) {
    $result = $i * $n;
    echo "{$i} x {$n} = {$result}<br>";
}
?>
