<?php
// เปิด CORS ให้สามารถเข้าถึง API จากโดเมนต่างๆ
header("Access-Control-Allow-Origin: http://localhost:3000");  // แทนที่ localhost:3000 ด้วยโดเมนของคุณถ้าต้องการอนุญาตโดเมนอื่น
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // เมธอดที่อนุญาต
header("Access-Control-Allow-Headers: Content-Type"); // กำหนด headers ที่อนุญาต

// สำหรับ CORS preflight request (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "comanysite");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit();
}
$conn->set_charset("utf8");

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit();
}

// รับข้อมูล JSON จาก request body
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าข้อมูลสำคัญครบหรือไม่
$required = ['Id', 'Phone', 'Email', 'Address'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => "กรุณากรอกข้อมูล: $field"]);
        exit();
    }
}

// เตรียมคำสั่ง SQL สำหรับการอัปเดตข้อมูล
$stmt = $conn->prepare("
    UPDATE ContactInfo 
    SET Phone = ?, Email = ?, Address = ?, MapEmbedUrl = ?, FacebookUrl = ?, 
        InstagramUrl = ?, TwitterUrl = ?, LinkedinUrl = ?, LastUpdated = NOW() 
    WHERE Id = ?
");

// ผูกค่าตัวแปรกับ SQL
$stmt->bind_param(
    "ssssssssi", // รูปแบบของค่าที่จะถูกผูก (string 8 ค่า, integer 1 ค่า)
    $data['Phone'],
    $data['Email'],
    $data['Address'],
    $data['MapEmbedUrl'],
    $data['FacebookUrl'],
    $data['InstagramUrl'],
    $data['TwitterUrl'],
    $data['LinkedinUrl'],
    $data['Id'] // เพิ่ม Id เพื่อระบุแถวที่ต้องการอัปเดต
);

// ตรวจสอบผลการ execute คำสั่ง SQL
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'ข้อมูลถูกอัปเดตเรียบร้อย']);
} else {
    echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล']);
}

// ปิดการเชื่อมต่อ
$stmt->close();
$conn->close();
?>