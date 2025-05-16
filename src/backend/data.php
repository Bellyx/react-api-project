<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "";
$dbname = "comanysite"; // ชื่อฐานข้อมูลที่ใช้

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode([   
        'error' => $conn->connect_error
    ]);
    exit();
}

// คำสั่ง SQL ที่จะใช้ดึงข้อมูล
$sql = "SELECT PageKey, Title, Email, ContentText, ImagePath FROM PortfolioItem";

// ทำการ query ข้อมูล
$result = $conn->query($sql);

// ตรวจสอบผลลัพธ์
if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode([
        'data' => $data
    ]);
} else {
    echo json_encode([
        'data' => []
    ]);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>



