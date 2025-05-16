import React, { useState, useEffect } from 'react';
import { updateContactConfig } from '../../services/contactService';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/admin/EditContact.css';

const EditContactPage = () => {
  const [config, setConfig] = useState({
    Id: '',
    Phone: '',
    Email: '',
    Address: '',
    MapEmbedUrl: '',
    FacebookUrl: '',
    InstagramUrl: '',
    TwitterUrl: '',
    LinkedinUrl: '',
    LastUpdated: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

          if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/login');
        return;
      }
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://localhost/portfolio/api/get_contact.php?id=${id}`);
        const data = await response.json();
        if (data.success) {
          setConfig(data.data);
        } else {
          setMessage(data.message || "ไม่พบข้อมูล");
        }
      } catch (error) {
        setMessage("ไม่สามารถดึงข้อมูลได้");
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateContactConfig(config);
      alert(result.message || "ข้อมูลถูกอัปเดตเรียบร้อยแล้ว");
      //navigate('/contact'); (เฉพาะให้เซฟแล้ว redirect ไปหน้า Contact)
    } catch (error) {
      setMessage(error.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };
  // services/contactService.js
    const updateContactConfig = async (config) => {
      const response = await fetch('http://localhost/portfolio/api/update_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'ไม่สามารถอัปเดตข้อมูลได้');
      }

      return result;
    };

  if (loading) return <p className="loading">กำลังโหลด...</p>;
  if (!config) return <p className="error">{message || "ไม่พบข้อมูล"}</p>;

return (
  
    <div className="edit-contact-page faded-in">
      <Sidebar />
      <div className="form-container">
        <header className="form-header">
          <h1>แก้ไขข้อมูลติดต่อ</h1>
          <p>อัปเดตรายละเอียดการติดต่อของคุณด้านล่าง</p>
        </header>
        <form onSubmit={handleSubmit} className="contact-form">
          {/* ตัวอย่างการจัดกลุ่ม Field */}
          <div className="form-section">
            <div className="form-group">
              {/* <FaPhone className="input-icon" /> */}
              <label htmlFor="Phone">เบอร์โทร</label>
              <input
                id="Phone"
                name="Phone"
                type="tel"
                value={config.Phone || ''}
                onChange={handleChange}
                placeholder="เช่น 08xxxxxxxx"
                required
              />
            </div>
            <div className="form-group">
              {/* <FaEnvelope className="input-icon" /> */}
              <label htmlFor="Email">อีเมล</label>
              <input
                id="Email"
                name="Email"
                type="email"
                value={config.Email || ''}
                onChange={handleChange}
                placeholder="เช่น contact@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            {/* <FaMapMarkerAlt className="input-icon" /> */}
            <label htmlFor="Address">ที่อยู่</label>
            <textarea
              id="Address"
              name="Address"
              value={config.Address || ''}
              onChange={handleChange}
              placeholder="รายละเอียดที่อยู่"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            {/* <FaGlobe className="input-icon" /> */}
            <label htmlFor="MapEmbedUrl">แผนที่ (Embed URL)</label>
            <input
              id="MapEmbedUrl"
              name="MapEmbedUrl"
              type="url"
              value={config.MapEmbedUrl || ''}
              onChange={handleChange}
              placeholder="URL สำหรับ embed แผนที่"
            />
          </div>

          <h2 className="social-header">โซเชียลมีเดีย</h2>
          <div className="form-section social-section">
            <div className="form-group">
              {/* <FaFacebook className="input-icon" /> */}
              <label htmlFor="FacebookUrl">Facebook URL</label>
              <input
                id="FacebookUrl"
                name="FacebookUrl"
                type="url"
                value={config.FacebookUrl || ''}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="form-group">
              {/* <FaInstagram className="input-icon" /> */}
              <label htmlFor="InstagramUrl">Instagram URL</label>
              <input
                id="InstagramUrl"
                name="InstagramUrl"
                type="url"
                value={config.InstagramUrl || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div className="form-group">
              {/* <FaTwitter className="input-icon" /> */}
              <label htmlFor="TwitterUrl">Twitter URL</label>
              <input
                id="TwitterUrl"
                name="TwitterUrl"
                type="url"
                value={config.TwitterUrl || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div className="form-group">
              {/* <FaLinkedin className="input-icon" /> */}
              <label htmlFor="LinkedinUrl">Linkedin URL</label>
              <input
                id="LinkedinUrl"
                name="LinkedinUrl"
                type="url"
                value={config.LinkedinUrl || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>
          <div className="form-group">
              {/* <FaCalendarAlt className="input-icon" /> */}
              <label htmlFor="LastUpdated">เวลาอัปเดตล่าสุด</label>
              <input
                id="LastUpdated"
                name="LastUpdated"
                type="text" // หรือ datetime-local ถ้าต้องการให้ user เลือก
                value={config.LastUpdated ? new Date(config.LastUpdated).toLocaleString('th-TH') : ''}
                onChange={handleChange}
                readOnly // โดยทั่วไปฟิลด์นี้ควรอัปเดตอัตโนมัติ ไม่ใช่ให้ user แก้
                placeholder="จะแสดงเมื่อมีการอัปเดต"
              />
            </div>

          <div className="form-actions">
            <button type="submit" className="button-primary" disabled={loading}>
              {loading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
            </button>
          </div>
        </form>
        {message && <p className={`message ${message.includes('สำเร็จ') ? 'message-success' : 'message-error'}`}>{message}</p>}
      </div>
    </div>
  );
};


export default EditContactPage;