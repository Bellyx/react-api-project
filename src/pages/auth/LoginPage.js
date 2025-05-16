import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/admin/Login_style.css';  // ตำแหน่งของไฟล์ CSS


const LoginPage = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ากรอกครบหรือยัง
    if (!user || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost/portfolio/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, password: password }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        // เก็บสถานะ login
        localStorage.setItem('isLoggedIn', 'true');

        // ไปที่หน้าหลังบ้าน
        navigate('/admin/Dashboard');
      } else {
        setErrorMessage(data.message);
      }

    } catch (error) {
      setLoading(false);
      setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      console.error("Error:", error);
    }
    
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={user}
            onChange={(e) => setUser (e.target.value)}
            required
            placeholder="กรุณากรอกชื่อผู้ใช้"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="กรุณากรอกรหัสผ่าน"
          />
        </div>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
  
        <button type="submit" disabled={loading}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  
    <footer className="footer">
      <p>ติดต่อเรา: contact@yourcompany.com</p>
      <p>โทร: 123-456-7890</p>
    </footer>
  </div>
  );
};

export default LoginPage;