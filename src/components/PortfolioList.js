import React, { useEffect, useState } from 'react';

const PortfolioList = () => {
  const [portfolioItems, setPortfolioItems] = useState([]); // สำหรับเก็บข้อมูลจาก API
  const [loading, setLoading] = useState(true); // ตัวแปรสำหรับเช็คว่า API ยังโหลดข้อมูลหรือไม่

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูลจาก server
    fetch('http://localhost/portfolio/api/data.php')
      .then((response) => response.json()) // แปลงข้อมูลเป็น JSON
      .then((data) => {
        setPortfolioItems(data.data); // เก็บข้อมูลที่ได้รับจาก API
        setLoading(false); // เปลี่ยนสถานะ loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // ถ้าเกิดข้อผิดพลาด ก็หยุดการโหลด
      });
  }, []); // empty dependency array หมายความว่า useEffect จะทำงานแค่ครั้งแรก

  if (loading) {
    return <div>Loading...</div>; // จะแสดงข้อความ Loading ถ้ายังโหลดข้อมูลไม่เสร็จ
  }

  return (
    <div>
      <h2>Portfolio Items</h2>
      {portfolioItems.length === 0 ? (
        <p>No portfolio items found.</p> // ถ้าไม่มีข้อมูลแสดงข้อความนี้
      ) : (
        <ul>
          {portfolioItems.map((item) => (
            <li key={item.PageKey}>
              <h3>{item.Title}</h3>
              <p>{item.ContentText}</p>
              <img src={item.ImagePath} alt={item.Title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioList;
