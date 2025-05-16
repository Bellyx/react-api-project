import React, { useEffect, useState } from 'react';
import BannerSlider from '../components/BannerSlider';
import AboutSection from '../components/AboutSection';
// import ServicesSection from '../components/ServicesSection';
// import NewsSection from '../components/NewsSection';
// import PortfolioSection from '../components/PortfolioSection';
// import ContactSection from '../components/ContactSection';
import { getLandingData } from '../services/landingApi';

/// สำหรับ LandingPage
const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getLandingData().then(setData).catch(console.error);
  }, []);

  

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <BannerSlider images={data.banners} />
      {/* <AboutSection content={data.about} /> */}
      <AboutSection aboutData={data} />
      {/* <ServicesSection services={data.services} />
      <NewsSection news={data.news} />
      <PortfolioSection items={data.portfolio} />
      <ContactSection contact={data.contact} /> */}
    </>
  );
};

export default LandingPage;
