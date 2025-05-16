<?php
// กำหนดให้ทุกโดเมนสามารถเข้าถึง API นี้ได้
header("Access-Control-Allow-Origin: *");  // หรือให้ระบุโดเมนที่อนุญาตเท่านั้น เช่น "http://localhost:3000"
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// เปิดการแสดงผลข้อผิดพลาด (เฉพาะตอนพัฒนา)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "comanysite");

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit();
}

// ดึงข้อมูลจากตาราง about
$sql = "SELECT Pagekey,Name_Company,Detail_Company FROM aboutpage LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['success' => true, 
                      'Pagekey' => $row['Pagekey'],
                      'Name_Company' => $row['Name_Company'],
                      'Detail_Company' => $row['Detail_Company']]);
} else {
    echo json_encode(['success' => false, 'message' => 'ไม่พบข้อมูล']);
}

$conn->close();
?>
