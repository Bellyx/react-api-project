<?php
header("Access-Control-Allow-Origin: http://localhost:3000");  // แทนที่ localhost:3000 ด้วยโดเมนของคุณถ้าต้องการอนุญาตโดเมนอื่น
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // เมธอดที่อนุญาต
header("Access-Control-Allow-Headers: Content-Type"); // กำหนด headers ที่อนุญาต
header('Content-Type: application/json');

// ตรวจสอบค่า POST ที่จำเป็น
if (!isset($_POST['Title'], $_POST['Email'], $_POST['ContentText'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing fields']);
    exit;
}

// สร้างการเชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "comanysite");
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// รับค่าจากฟอร์ม
$title = $_POST['Title'];
$email = $_POST['Email'];
$content = $_POST['ContentText'];
$pageKey = uniqid('pf_');
$uploadDir = "../uploads/";
$imagePaths = [];

// ตรวจสอบว่ามีไฟล์รูปภาพถูกส่งมา
if (!empty($_FILES['images']['name'][0])) {
    foreach ($_FILES['images']['name'] as $index => $name) {
        $tmpName = $_FILES['images']['tmp_name'][$index];
        $error = $_FILES['images']['error'][$index];

        if ($error === UPLOAD_ERR_OK) {
            $newFileName = uniqid() . '_' . basename($name);
            $targetPath = $uploadDir . $newFileName;

            if (move_uploaded_file($tmpName, $targetPath)) {
                $imagePaths[] = 'uploads/' . $newFileName;
            }
        }
    }
}

// แปลง array เป็น string
$imagePathString = implode(',', $imagePaths);

// บันทึกลงฐานข้อมูล
$stmt = $conn->prepare("INSERT INTO PortfolioItem (PageKey, Title, Email, ContentText, ImagePath, IsActive) VALUES (?, ?, ?, ?, ?, 1)");
$stmt->bind_param("sssss", $pageKey, $title, $email, $content, $imagePathString);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'บันทึกข้อมูลเรียบร้อย']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Insert failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
