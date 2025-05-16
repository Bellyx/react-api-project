import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import th from '../local/th.json';
import en from '../local/en.json';
import '../assets/css/Navbar.css';
import thFlag from '../assets/icon/th.png'
import enFlag from '../assets/icon/en.png'
// import sunIcon from '../assets/img/sun.png'
// import moonIcon from '../assets/img/moon.png'

const MyNavbar = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    '/admin/Dashboard',
    '/admin/EditAboutPage',
    '/admin/EditContactPage',
    '/admin/EditLandingPage'
  ];

  const [language, setLanguage] = useState('th');
  const [translations, setTranslations] = useState(th);

  useEffect(() => {
    if (language === 'en') {
      setTranslations(en);
    } else {
      setTranslations(th);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'th' ? 'en' : 'th'));
  };

  if (hideNavbarPaths.includes(location.pathname)) return null;

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-logo">
          {translations.navbar_company}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">{translations.navbar_home}</Nav.Link>
            <Nav.Link as={Link} to="/about">{translations.navbar_about}</Nav.Link>
            <NavDropdown title={translations.navbar_services} id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/service/web-development">{translations.navbar_webDev}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/service/app-development">{translations.navbar_appDev}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/service/seo">{translations.navbar_seo}</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/news">{translations.navbar_news}</Nav.Link>
            <Nav.Link as={Link} to="/portfolio">{translations.navbar_portfolio}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{translations.navbar_contact}</Nav.Link>

            <Nav.Link onClick={toggleLanguage} title="เปลี่ยนภาษา" className="icon-button">
               <img src={language === 'en' ? thFlag : enFlag} alt="toggle language" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
