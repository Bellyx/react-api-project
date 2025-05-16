<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$username = "root";
$password = "";
$dbname = "comanysite"; // ชื่อฐานข้อมูลที่ใช้

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode([
        'status' => 'error',
        'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
        'error' => $conn->connect_error
    ]);
    exit();
}

// รับข้อมูลจาก frontend
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['PageKey']) && isset($data['Title']) && isset($data['Email']) &&
    isset($data['ContentText']) && isset($data['ImagePath'])
) {
    // เตรียมคำสั่ง SQL
    $pageKey = $data['PageKey'];
    $title = $data['Title'];
    $email = $data['Email'];
    $contentText = $data['ContentText'];
    $imagePath = $data['ImagePath'];

    $sql = "UPDATE PortfolioItem SET 
            Title = ?, Email = ?, ContentText = ?, ImagePath = ? 
            WHERE PageKey = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssss', $title, $email, $contentText, $imagePath, $pageKey);

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'ข้อมูลได้รับการอัปเดตสำเร็จ'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'ไม่สามารถอัปเดตข้อมูลได้'
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'ข้อมูลไม่ครบถ้วน'
    ]);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>
