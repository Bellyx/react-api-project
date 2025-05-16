// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DashboardPage = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // ลบข้อมูลการล็อกอิน
//     localStorage.removeItem('isLoggedIn');

//     // เปลี่ยนเส้นทางไปหน้า login
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h1>ยินดีต้อนรับสู่หน้า Dashboard</h1>
//       <p>คุณได้ล็อกอินเข้าสู่ระบบเรียบร้อยแล้ว!</p>
//       <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//     </div>
//   );
// };

// export default DashboardPage;

import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../assets/css/admin/dashboard.css'; // ถ้าคุณมี css แยก

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>เลือกรายการจากเมนูด้านซ้าย</p>
      </div>
    </div>
  );
};

export default DashboardPage;