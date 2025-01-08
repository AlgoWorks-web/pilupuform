<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection parameters
$servername = "localhost"; // Change as necessary
$username = "root"; // Change as necessary
$password = ""; // Change as necessary
$dbname = "pilupu"; // Change as necessary

// $servername = "184.168.123.18:3306"; // Change as necessary
// $username = "root"; // Change as necessary
// $password = "epilupu@1987"; // Change as necessary
// $dbname = "epilupuTesting"; // Change as necessary

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Get eventId from query string
$eventId = isset($_GET['eventId']) ? intval($_GET['eventId']) : 0;

if ($eventId > 0) {
    // Prepare the SQL statement to join the two tables
    $stmt = $conn->prepare("
        SELECT 
            ei.event_name, 
            ei.event_date, 
            ei.event_time, 
            ei.event_location, 
            ie.image_content, 
            ie.file_name 
        FROM 
            event_info ei 
        LEFT JOIN 
            image_entity ie ON ei.event_invitation_id = ie.id 
        WHERE 
            ei.event_id = ? AND ei.is_active = 1
    ");
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $eventDetails = $result->fetch_assoc();

        // Prepare the response data
        $response = [
            'event_name' => $eventDetails['event_name'],
            'event_date' => $eventDetails['event_date'],
            'event_time' => $eventDetails['event_time'],
            'event_location' => $eventDetails['event_location'],
            'image_content' => base64_encode($eventDetails['image_content']), // Encode image for JSON
            'file_name' => $eventDetails['file_name']
        ];

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'No event found']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid event ID']);
}

$conn->close();

