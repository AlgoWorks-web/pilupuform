<?php
// fetch_guests.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


// Database credentials
$servername = "localhost"; // Your database server
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "pilupu"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get parameters from the request
$eventId = $_GET['eventId'];
$customerId = $_GET['customerId'];
$guestMobile = $_GET['guestMobile'];

// Prepare the SQL query to fetch guests who submitted RSVPs
$sql = "
SELECT r.guest_mobile, 
       COALESCE(c.customer_guest_name, e.customer_guest_name) AS guest_name
FROM rsvps AS r
LEFT JOIN customer_colleagues_info AS c ON r.guest_mobile = c.customer_guest_mobile AND r.customer_id = c.customer_id
LEFT JOIN customer_extended_family_info AS e ON r.guest_mobile = e.customer_guest_mobile AND r.customer_id = e.customer_id
WHERE r.event_id = ? AND r.customer_id = ? AND r.guest_mobile = ?";

// Prepare and bind parameters to the SQL statement
$stmt = $conn->prepare($sql);
$stmt->bind_param('iis', $eventId, $customerId, $guestMobile);

// Execute the statement
$stmt->execute();
$result = $stmt->get_result();

// Initialize an array to hold the guest data
$guests = [];
while ($row = $result->fetch_assoc()) {
    $guests[] = $row; // Add each guest's data to the array
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the result as JSON
   echo json_encode(['success' => true, 'guests' => $guests]);
