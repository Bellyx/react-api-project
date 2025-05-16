<?php
// เปิด CORS
header("Access-Control-Allow-Origin: *"); // ใน production เปลี่ยนเป็น domain จริง
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// สำหรับ preflight request (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "comanysite");
$conn->set_charset("utf8");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit();
}

// รับข้อมูล JSON จาก body
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าข้อมูลครบไหม
$required = ['Phone', 'Email', 'Address'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => "กรุณากรอกข้อมูล: $field"]);
        exit();
    }
}

// เตรียม SQL insert
$stmt = $conn->prepare("
    INSERT INTO contactpage 
    (Phone, Email, Address, MapEmbedUrl, FacebookUrl, InstagramUrl, TwitterUrl, LinkedinUrl, LastUpdated) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
");

// ผูกตัวแปร
$stmt->bind_param(
    "ssssssss",
    $data['Phone'],
    $data['Email'],
    $data['Address'],
    $data['MapEmbedUrl'],
    $data['FacebookUrl'],
    $data['InstagramUrl'],
    $data['TwitterUrl'],
    $data['LinkedinUrl']
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'บันทึกข้อมูลเรียบร้อย']);
} else {
    echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาดในการบันทึก']);
}

$stmt->close();
$conn->close();
?>
