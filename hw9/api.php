<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the request body data
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Check if the 'length' parameter exists
    if (isset($requestData['length'])) {
        // Get the length from the request data
        $length = intval($requestData['length']);

        // Generate the Fibonacci sequence
        $fibonacci = generateFibonacciSequence($length);

        // Create the response array
        $response = [
            'length' => $length,
            'sequence' => $fibonacci
        ];

        // Convert the response to JSON string
        $jsonResponse = json_encode($response);

        // Set the response headers
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        // Send the JSON response
        echo $jsonResponse;
    } else {
        // 'length' parameter is missing
        echo "Error: 'length' parameter is missing.";
    }
} else {
    // Invalid request method
    echo "Error: Invalid request method.";
}

/**
 * Generate a Fibonacci sequence of the specified length.
 *
 * @param int $length The length of the Fibonacci sequence
 * @return array The Fibonacci sequence
 */
function generateFibonacciSequence($length)
{
    $sequence = [0, 1];

    for ($i = 2; $i < $length; $i++) {
        $sequence[$i] = $sequence[$i - 1] + $sequence[$i - 2];
    }

    return $sequence;
}
?>
