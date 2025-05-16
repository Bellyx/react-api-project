<?php
// เปิด CORS ให้สามารถเข้าถึง API จากโดเมนต่างๆ
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// สำหรับ CORS preflight request
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

// รับค่า id จาก query string
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // คำสั่ง SQL เพื่อดึงข้อมูล
    $sql = "SELECT Id, Phone, Email, Address, MapEmbedUrl, FacebookUrl, InstagramUrl, TwitterUrl, LinkedinUrl ,LastUpdated
            FROM ContactInfo WHERE Id = 1 LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['success' => true, 'data' => $row]);
    } else {
        echo json_encode(['success' => false, 'message' => 'ไม่พบข้อมูล']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ไม่พบ id']);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>
