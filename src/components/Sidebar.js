import React from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FaRegListAlt, FaRegBookmark, FaRegUser, FaRegChartBar, FaImages, FaRegIdCard } from 'react-icons/fa';
import '../assets/css/Sidebar.css'; 

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return isActive ? 'active' : ''; // ใช้ active class ถ้า path ตรงกัน
  };

  const menuItems = [
    { to: "/admin/Dashboard", label: "หน้าแรก", icon: FaRegListAlt },
    { to: "/admin/EditLandingPage", label: "จัดการหน้าแรก", icon: FaRegBookmark },
    { to: "/admin/EditAboutPage", label: "เกี่ยวกับเรา", icon: FaRegBookmark },
    { to: "/admin/EditServicesPage", label: "บริการต่างๆ", icon: FaRegUser },
    { to: "/admin/section4", label: "ข่าวสาร/กิจกรรม", icon: FaImages },
    { to: "/admin/EditPortfolioPage", label: "ผลงาน", icon: FaRegChartBar },
    { to: "/admin/EditContactPage", label: "ติดต่อเรา", icon: FaRegIdCard },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar-navbar">
      <h4>ระบบจัดการหลังบ้าน</h4>
      <ul>
        {menuItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={getLinkStyle(item.to)} // เพิ่ม class active ถ้า path ตรงกัน
            >
              <item.icon style={{ marginRight: '15px', fontSize: '1.2rem' }} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="logout">
        <div className='User-Acc' > 
          <FaRegUser style={{ marginRight: '8px' }} /> Admin User
        </div>
        <button onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
