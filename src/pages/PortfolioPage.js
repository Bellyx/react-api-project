import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa'; // ไอคอน email
import '../assets/css/PortfolioPage.css'; // ไฟล์ CSS

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/portfolio/api/data.php');
        const json = await response.json();
        console.log('Received data:', json);

        if (json.status === 'success' && Array.isArray(json.data)) {
          setPortfolioItems(json.data);
        } else {
          console.error('โครงสร้างข้อมูลไม่ถูกต้อง', json);
          setError('ไม่สามารถโหลดข้อมูลได้');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อ API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">ผลงานของเรา</h1>
      <p className="portfolio-subtitle">รวมผลงานดี ๆ จากทีมงานของเรา</p>

      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : portfolioItems.length === 0 ? (
        <p>ไม่มีข้อมูลผลงาน</p>
      ) : (
      <Row xs={1} md={2} lg={3} className="g-4">
        {portfolioItems.map((item, index) => (
          <Col key={index}>
            <Card className="portfolio-card shadow-sm">
              {/* แสดงหลายรูปภาพ */}
              <div className="portfolio-multiple-images">
                {item.ImagePath &&
                  item.ImagePath.split(',').map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost/portfolio/api/${img}`}
                      alt={`${item.Title}-${i}`}
                      className="portfolio-image-thumbnail"
                    />
                  ))}
              </div>

              <Card.Body>
                <Card.Title>{item.Title}</Card.Title>
                <Card.Text>{item.ContentText}</Card.Text>
                {item.Email && (
                  <Card.Text className="portfolio-email">
                    <FaEnvelope className="icon" /> {item.Email}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      )}
    </div>
  );
};

export default PortfolioPage;
