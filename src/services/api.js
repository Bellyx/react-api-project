// src/services/api.js
import axios from 'axios';

// สร้างฟังก์ชันในการดึงข้อมูลจาก API
export const getData = async () => {
  try {
    const response = await axios.get('http://localhost/portfolio/api/data.php');
    return response.data;  // ส่งข้อมูลที่ได้จาก API
  } catch (error) {
    console.error('Error fetching data: ', error);
    return [];
  }
};



