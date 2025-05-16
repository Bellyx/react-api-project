import React from 'react';
import '../assets/css/AboutSection.css';

const AboutSection = ({ aboutData }) => {
  if (!aboutData) return <div className="about-section">กำลังโหลดข้อมูลเกี่ยวกับเรา...</div>;

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="about-title">เกี่ยวกับเรา</h2>
        <h3 className="about-company">{aboutData.Name_Company}</h3>
        <p className="about-description">{aboutData.Detail_Company}</p>
      </div>
    </section>
  );
};

export default AboutSection;
