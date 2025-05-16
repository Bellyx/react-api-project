import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';




const AboutPage = () => {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [pageKey, setPageKey] = useState('');
    const [nameCompany, setNameCompany] = useState('');
    const [detailCompany, setDetailCompany] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    // ตรวจสอบการเข้าสู่ระบบและดึงข้อมูลจาก API
    useEffect(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/login');
        return;
      }
  
      fetch('http://localhost/portfolio/api/get_about.php') // เปลี่ยน URL ตามที่ใช้
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPageKey(data.PageKey);
            setNameCompany(data.Name_Company);
            setDetailCompany(data.Detail_Company);
            setContent(data.Detail_Company); // ตั้งค่าข้อมูลสำหรับ textarea

       
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("โหลดข้อมูลไม่สำเร็จ", error);
          setMessage("เกิดข้อผิดพลาดในการโหลดข้อมูล");
          setLoading(false);
        });
    }, [navigate]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // ส่งข้อมูลที่แก้ไขกลับไปยัง API
      fetch('http://localhost/portfolio/api/update_about.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PageKey: pageKey,
          Name_Company: nameCompany,
          Detail_Company: detailCompany,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setMessage('บันทึกข้อมูลสำเร็จ');
          } else {
   
            setMessage('บันทึกข้อมูลไม่สำเร็จ');
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', error);
          setMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        });
    };
  
    if (loading) {
      return <p>กำลังโหลดข้อมูล...</p>;
    }
  
    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h2 className="mb-4">แก้ไขข้อมูลเกี่ยวกับเรา</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="pageKey" className="form-label">
                    PageKey
                  </label>
                  <textarea
                    id="pageKey"
                    value={pageKey}
                    onChange={(e) => setPageKey(e.target.value)}
                    rows={2}
                    className="form-control"
                  />
                </div>
    
                <div className="mb-3">
                  <label htmlFor="nameCompany" className="form-label">
                    ชื่อบริษัท
                  </label>
                  <textarea
                    id="nameCompany"
                    value={nameCompany}
                    onChange={(e) => setNameCompany(e.target.value)}
                    rows={2}
                    className="form-control"
                  />
                </div>
    
                <div className="mb-3">
                  <label htmlFor="detailCompany" className="form-label">
                    รายละเอียดบริษัท
                  </label>
                  <textarea
                    id="detailCompany"
                    value={detailCompany}
                    onChange={(e) => setDetailCompany(e.target.value)}
                    rows={6}
                    className="form-control"
                  />
                </div>
    
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </form>
    
              {message && (
                <div className="alert alert-info mt-3" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
  export default AboutPage;