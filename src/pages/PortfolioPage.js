import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import PortfolioList from '../components/PortfolioList';
const PortfolioPage = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost/portfolio/api/data.php');
          const data = await response.json();
          console.log('Received data:', data);
  
          if (Array.isArray(data)) {
            setPortfolioItems(data);  // ตั้งค่า portfolioItems
          } else {
            console.error('ข้อมูลไม่ถูกต้อง');
          }
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>ผลงาน</h1>
        <p>ยินดีต้อนรับสู่เว็บไซต์ของเรา</p>
  
        {/* แสดงข้อมูล */}
        {portfolioItems.length === 0 ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : (
          portfolioItems.map((item, index) => (
            <div key={index}>
              <h2>{item.Title}</h2>
              <p>{item.ContentText}</p>
              <img src={item.ImagePath} alt={item.Title} />
              <p>ติดต่อ: {item.Email}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  

export default PortfolioPage;
