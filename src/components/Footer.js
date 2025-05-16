import React  from 'react';
import {  useLocation } from 'react-router-dom';
import '../assets/css/Footer.css';
const Footer = () => {

  const location = useLocation();  // ใช้ useLocation เพื่อตรวจสอบ path ปัจจุบัน
  const hideFooterPaths = ['/admin/Dashboard', '/admin/EditAboutPage','/admin/EditContactPage']; // กำหนดเส้นทางที่ไม่ต้องการให้แสดง navbar
  if (hideFooterPaths.includes(location.pathname)) {
    return null;  // ถ้าหน้าปัจจุบันอยู่ในรายการที่ไม่ต้องการให้แสดง Navbar จะ return null (ไม่แสดง Navbar)
  }

 return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Training</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <div className="social-icons">
            <a href="#"><img src="https://cdn.iconscout.com/icon/free/png-64/instagram-188-498425.png" alt="Instagram" /></a>
            <a href="#"><img src="https://cdn.iconscout.com/icon/free/png-64/facebook-262-721949.png" alt="Facebook" /></a>
            <a href="#"><img src="https://cdn.iconscout.com/icon/free/png-64/linkedin-162-498418.png" alt="LinkedIn" /></a>
          </div>
          <a href="tel:123456789" className="footer-phone">
            +66 232345553
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} <b>ecerasystem</b>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
