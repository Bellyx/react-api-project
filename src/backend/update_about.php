<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// รับข้อมูลจาก request
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบข้อมูลที่ได้รับจาก client
if (!$data || !isset($data['PageKey']) || !isset($data['Name_Company']) || !isset($data['Detail_Company'])) {
    echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ครบถ้วน']);
    exit();
}

// เชื่อมต่อกับฐานข้อมูล
$servername = "localhost"; // เปลี่ยนเป็นเซิร์ฟเวอร์ของคุณ
$username = "root"; // ชื่อผู้ใช้งานฐานข้อมูล
$password = ""; // รหัสผ่านฐานข้อมูล
$dbname = "comanysite"; // ชื่อฐานข้อมูล

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'การเชื่อมต่อฐานข้อมูลล้มเหลว: ' . $conn->connect_error]));
}

// รับค่าจาก request
$pageKey = $data['PageKey'];
$nameCompany = $data['Name_Company'];
$detailCompany = $data['Detail_Company'];

// สร้างคำสั่ง SQL สำหรับอัปเดตข้อมูล
$sql = "UPDATE Aboutpage SET Name_Company = ?, Detail_Company = ? WHERE Pagekey = ?";

// เตรียม statement
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'คำสั่ง SQL ผิดพลาด']);
    exit();
}

// ผูกค่ากับ statement
$stmt->bind_param("sss", $nameCompany, $detailCompany, $pageKey);

// ประมวลผลคำสั่ง SQL
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'อัปเดตข้อมูลเรียบร้อยแล้ว']);
} else {
    echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล']);
}

// ปิดการเชื่อมต่อฐานข้อมูล
$stmt->close();
$conn->close();
?>
