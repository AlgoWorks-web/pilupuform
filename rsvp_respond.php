<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection parameters
// $servername = "184.168.123.18:3306"; // Change as necessary
// $username = "root"; // Change as necessary
// $password = "epilupu@1987"; // Change as necessary
// $dbname = "epilupuTesting"; // Change as necessary

$servername = "localhost"; // Change as necessary
$username = "root"; // Change as necessary
$password = ""; // Change as necessary
$dbname = "pilupu"; // Change as necessary

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$rsvpStatus = isset($data['rsvpStatus']) ? $data['rsvpStatus'] : '';
$customerId = isset($data['customerId']) ? intval($data['customerId']) : 0;
$eventId = isset($data['eventId']) ? intval($data['eventId']) : 0;
$guestMobile = isset($data['guestMobile']) ? $data['guestMobile'] : '';

// Validate inputs
if ($rsvpStatus && $customerId > 0 && $eventId > 0 && $guestMobile) {
    // Check if RSVP already exists
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM rsvps WHERE event_id = ? AND guest_mobile = ?");
    $checkStmt->bind_param("is", $eventId, $guestMobile);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();
     
    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => 'RSVP is already submitted successfully.']);
    } else {
    // Prepare the SQL statement to insert RSVP
    $stmt = $conn->prepare("INSERT INTO rsvps (event_id, customer_id, guest_mobile, rsvp_status) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiss", $eventId, $customerId, $guestMobile, $rsvpStatus);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
}
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}

$conn->close();
