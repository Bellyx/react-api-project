<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "comanysite");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit();
}

// ดึงข้อมูลทั้งหมดจาก banners
$sql = "SELECT `id`, `name`, `part_desc`, `image_data` FROM `banners`";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imageBase64 = base64_encode($row['image_data']); // แปลง BLOB เป็น base64

        $data[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'part_desc' => $row['part_desc'],
            'image' => 'data:image/jpeg;base64,' . $imageBase64 // ปรับ image/jpeg ตามประเภทจริง
        ];
    }

    echo json_encode(['success' => true, 'banners' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'ไม่พบข้อมูล']);
}

$conn->close();
?>
