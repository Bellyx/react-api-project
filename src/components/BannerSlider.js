// components/BannerSlider.js
import React from 'react';
import Slider from 'react-slick';
import "../assets/css/Banner.css";
import { CiMapPin } from "react-icons/ci";
const BannerSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (!images || images.length === 0) {
    return <div className="banner-slider-container">กำลังโหลดภาพแบนเนอร์...</div>;
  }

  return (
   <div className="banner-slider-container">
  <Slider {...settings} className="banner-slider">
    {images.map((banner, index) => (
      <div key={index} className="banner-slide">
        <div className="banner-image-container">
          <img 
            src={banner.image} 
            alt={`Banner ${index}`} 
            className="banner-image" 
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="banner-overlay" />
        </div>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default BannerSlider;
