<?php
header("Access-Control-Allow-Origin: http://localhost:3000");  // แทนที่ localhost:3000 ด้วยโดเมนของคุณถ้าต้องการอนุญาตโดเมนอื่น
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // เมธอดที่อนุญาต
header("Access-Control-Allow-Headers: Content-Type"); // กำหนด headers ที่อนุญาต
header('Content-Type: application/json');

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "your_database_name");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "เชื่อมต่อฐานข้อมูลไม่สำเร็จ"]);
    exit();
}

// รับข้อมูล JSON จาก React
$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "ข้อมูลที่ส่งมาไม่ถูกต้อง"]);
    exit();
}

$updated = 0;
$errors = [];

foreach ($data as $banner) {
    $id = $conn->real_escape_string($banner['id']);
    $name = $conn->real_escape_string($banner['name']);
    $desc = $conn->real_escape_string($banner['part_desc']);
    $image = $conn->real_escape_string($banner['image']); // base64 string

    $sql = "UPDATE banners 
            SET name = '$name', part_desc = '$desc', image = '$image'
            WHERE id = '$id'";

    if ($conn->query($sql)) {
        $updated++;
    } else {
        $errors[] = "Error updating ID $id: " . $conn->error;
    }
}

$conn->close();

echo json_encode([
    "success" => $updated > 0,
    "updated" => $updated,
    "errors" => $errors
]);
