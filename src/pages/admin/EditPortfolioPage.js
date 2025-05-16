import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // ใช้ navigate แทน history
import '../../assets/css/admin/EditPortfolioPage.css';
import Sidebar from '../../components/Sidebar';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'; // ไอคอนสำหรับแก้ไข ลบ และ ดู

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/portfolio/api/data.php');
      const data = await response.json();
      setPortfolioItems(data.data || []);
    } catch (error) {
      setError('ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  // เรียกฟังก์ชัน fetchData ตอนเริ่มต้น
  useEffect(() => {
    fetchData();
  }, []);

  // ฟังก์ชันสำหรับการแสดง/ซ่อน Modal
  const handleShowModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({});
      setIsEditing(false);
    }
    setShowModal(true);
  };

  // ฟังก์ชันเพิ่ม/แก้ไขข้อมูล
   const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('Title', currentItem.Title);
        formData.append('Email', currentItem.Email);
        formData.append('ContentText', currentItem.ContentText);

        if (currentItem.images) {
            for (let i = 0; i < currentItem.images.length; i++) {
            formData.append('images[]', currentItem.images[i]);
            }
        }

        try {
            // const response = await fetch('http://localhost/portfolio/api/uploadPortfolio.php', {
            // method: 'POST',
            // body: formData,
            // });

            const response = await fetch('http://localhost/portfolio/api/uploadPortfolio.php', {
                method: 'POST',
                body: formData,
                });

                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
            const result = await response.json();
            if (result.status === 'success') {
            fetchData();
            setShowModal(false);
            setCurrentItem({});
            } else {
            setError(result.message || 'ไม่สามารถบันทึกข้อมูลได้');
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาดระหว่างส่งข้อมูล');
        } finally {
            setLoading(false);
        }
    };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = async (id) => {
    const isConfirm = window.confirm('คุณแน่ใจที่จะลบข้อมูลนี้?');
    if (isConfirm) {
      try {
        const response = await fetch('http://localhost/portfolio/api/deletePortfolio.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ PageKey: id }),
        });
        const result = await response.json();
        if (result.status === 'success') {
          fetchData();
        } else {
          setError('ไม่สามารถลบข้อมูลได้');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการลบข้อมูล');
      }
    }
  };

  // ฟังก์ชันดูข้อมูล
//   const handleView = (item) => {
//     // สามารถแสดงข้อมูลใน Modal หรือเปิดหน้าต่างใหม่ได้
//     alert(`Viewing ${item.Title}`);
//     navigate(`/portfolio/view/${item.PageKey}`); // เปิดหน้า view ของรายการนี้
//   };

    // เปิดปิด การแสดงหน้าเว็บไซต์
    const toggleStatus = async (pageKey, currentStatus) => {
    const newStatus = currentStatus === '1' ? '0' : '1';
    try {
        const response = await fetch('http://localhost/portfolio/api/toggleStatus.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PageKey: pageKey, IsActive: newStatus }),
        });

        const result = await response.json();
        if (result.status === 'success') {
        fetchData(); // รีเฟรชข้อมูลใหม่
        } else {
        alert('เปลี่ยนสถานะไม่สำเร็จ');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาด');
    }
    };

  return (
    <div className="portfolio-container">
      <Sidebar />
      <h1>รายการผลงาน</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ตารางแสดงข้อมูล */}
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
                <th>#</th>
              <th>PageKey</th>
              <th>Email</th>
              <th>Content</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolioItems.map((item, index) => (
              <tr key={item.PageKey}>
                <td>{index + 1}</td>
                <td>{item.Title}</td>
                <td>{item.Email}</td>
                <td>{item.ContentText}</td>
                
                <td><img src={item.ImagePath} alt={item.Title} width="100" /></td>
                <td>
                  <Button variant="warning" size="sm" className="m-1" onClick={() => handleShowModal(item)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="danger" size="sm" className="m-1" onClick={() => handleDelete(item.PageKey)}>
                    <FaTrash /> Delete
                  </Button>
                  {/* <Button variant="info" size="sm" className="m-1" onClick={() => handleView(item)}>
                    <FaEye /> View
                  </Button> */}
                <Button
                    variant={item.IsActive === '1' ? 'success' : 'secondary'}
                    size="sm"
                    className={`m-1 toggle-status-btn ${item.IsActive === '1' ? 'active' : 'inactive'}`}
                    onClick={() => toggleStatus(item.PageKey, item.IsActive)}
                    >
                    {item.IsActive === '1' ? (
                        <>
                        <FaEyeSlash className="icon me-1" /> ปิดโพสต์
                        </>
                    ) : (
                        <>
                        <FaEye className="icon me-1" /> เปิดโพสต์
                        </>
                    )}
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ปุ่มเพิ่ม */}
      <Button variant="primary" onClick={() => handleShowModal()}>
        เพิ่มผลงาน
      </Button>

      {/* Modal สำหรับเพิ่ม/แก้ไขข้อมูล */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="Title"
                value={currentItem.Title || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, Title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="Email"
                value={currentItem.Email || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, Email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContentText">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content text"
                name="ContentText"
                value={currentItem.ContentText || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, ContentText: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImagePath">
              <Form.Label>อัปโหลดรูปภาพ</Form.Label>
              <Form.Control
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => setCurrentItem({ ...currentItem, images: e.target.files })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
