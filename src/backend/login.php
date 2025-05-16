<?php
// ตั้งค่า CORS เพื่อให้แอปที่รันในเครื่องเดียวกันสามารถเข้าถึง API ได้
header("Access-Control-Allow-Origin: *");  // หรือใส่ 'http://localhost:3000' แทน '*' เพื่อจำกัดการเข้าถึงจากโดเมนที่ระบุ
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// สำหรับรองรับ OPTIONS request (สำหรับ CORS preflight requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// เชื่อมต่อกับฐานข้อมูล MySQL
$host = "localhost";
$username = "root";
$password = "";
$dbname = "comanysite";  // ตั้งชื่อฐานข้อมูลให้ตรงกับฐานข้อมูลที่คุณใช้งาน

// สร้างการเชื่อมต่อกับฐานข้อมูล
$conn = new mysqli($host, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูลจาก POST ที่ส่งมาจาก Client
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าได้รับข้อมูลหรือไม่
if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'ไม่ได้รับข้อมูลจาก Client']);
    exit();
}

// ตรวจสอบว่าได้ส่ง username และ password มาหรือไม่
if (!isset($data['user']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ครบถ้วน']);
    exit();
}

$user = $data['user'];
$password = $data['password'];

// ใช้ Prepared Statements เพื่อป้องกัน SQL Injection
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $user, $password);
$stmt->execute();
$result = $stmt->get_result();

// ตรวจสอบผลลัพธ์การค้นหาผู้ใช้
if ($result->num_rows > 0) {
    // หากพบผู้ใช้ในฐานข้อมูล
    echo json_encode(['success' => true, 'message' => 'ล็อกอินสำเร็จ']);
} else {
    // หากไม่พบผู้ใช้ในฐานข้อมูล
    echo json_encode(['success' => false, 'message' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
}

// ปิดการเชื่อมต่อฐานข้อมูล
$stmt->close();
$conn->close();
?>
