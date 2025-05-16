<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// รับข้อมูล JSON
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบค่าที่จำเป็น
if (
    !isset($data['Title']) ||
    !isset($data['Email']) ||
    !isset($data['ContentText']) ||
    !isset($data['ImagePath'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "ข้อมูลไม่ครบถ้วน"
    ]);
    exit;
}

// เชื่อมต่อฐานข้อมูล
$host = "localhost";
$username = "root";
$password = "";
$dbname = "comanysite";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "เชื่อมต่อฐานข้อมูลไม่สำเร็จ: " . $conn->connect_error
    ]);
    exit;
}

// สร้าง PageKey (รหัสเฉพาะ)
$pageKey = uniqid('pf_');

// เตรียมคำสั่ง SQL
$stmt = $conn->prepare("INSERT INTO PortfolioItem (PageKey, Title, Email, ContentText, ImagePath, IsActive) VALUES (?, ?, ?, ?, ?, 1)");
$stmt->bind_param("sssss", $pageKey, $data['Title'], $data['Email'], $data['ContentText'], $data['ImagePath']);

// ประมวลผลคำสั่ง
if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "เพิ่มข้อมูลเรียบร้อยแล้ว"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาดในการเพิ่มข้อมูล: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
