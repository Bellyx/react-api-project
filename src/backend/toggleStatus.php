<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// รับข้อมูล JSON
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->PageKey) || !isset($data->IsActive)) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit;
}

$host = "localhost";
$username = "root";
$password = "";
$dbname = "comanysite";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => $conn->connect_error]);
    exit;
}

$stmt = $conn->prepare("UPDATE PortfolioItem SET IsActive = ? WHERE PageKey = ?");
$stmt->bind_param("is", $data->IsActive, $data->PageKey);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
