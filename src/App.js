import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import NewsPage from './pages/NewsPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import EditLandingPage from './pages/admin/EditLandingPage';
import EditAboutPage from './pages/admin/EditAboutPage';
import EditContactPage from './pages/admin/EditContactPage';
import ProtectedRoute from './routes/ProtectedRoute'; // เส้นทางที่ล็อกอินเท่านั้นถึงเข้าได้
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const App = () => {
  return (

    <Router>
      <MyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service/:serviceType" element={<ServicePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* หน้า Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* หน้า Dashboard (ล็อกอินก่อนถึงเข้าได้) */}
          <Route
            path="/admin/Dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/EditLandingPage"
            element={
              <ProtectedRoute>
              <EditLandingPage/> 
              </ProtectedRoute>
            }
          />
           <Route path="/admin/EditAboutPage"
            element={
              <ProtectedRoute>
              <EditAboutPage/> 
              </ProtectedRoute>
            }
          />
        
           <Route path="/admin/EditContactPage"
            element={
              <ProtectedRoute>
              <EditContactPage/> 
              </ProtectedRoute>
            }
          />
        </Routes>
          <Footer />
    </Router>
  );
};

export default App;
