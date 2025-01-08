<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
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

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

$eventId = isset($_GET['eventId']) ? intval($_GET['eventId']) : 0;
$guestMobile = isset($_GET['guestMobile']) ? $_GET['guestMobile'] : '';

if ($eventId > 0 && $guestMobile) {
    $stmt = $conn->prepare("SELECT COUNT(*) FROM rsvps WHERE event_id = ? AND guest_mobile = ?");
    $stmt->bind_param("is", $eventId, $guestMobile);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    echo json_encode(['exists' => $count > 0]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}

$conn->close();

