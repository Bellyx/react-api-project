import React, { useEffect, useState } from 'react';
import '../assets/css/Contact.css';
import {
  FaEnvelope, FaMapMarkerAlt, FaShareAlt,
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn,
  FaUser, FaTag, FaRegCommentDots, FaMapMarkedAlt,
  FaQuestionCircle, FaPaperPlane
} from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiPhoneCall } from 'react-icons/bi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
     name: '', email: '', subject: '', message: ''
    // Id:'', Phone:'', Email:'', Address:'', MapEmbedUrl:'', FacebookUrl:'', InstagramUrl:'', TwitterUrl:'', LinkedinUrl:'',LastUpdated:''
  });

  const [contactInfo, setContactInfo] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('http://localhost/portfolio/api/get_contact.php?id=1');
        const data = await res.json();
        if (data.success) {
          setContactInfo(data.data);
        } else {
          console.error('ไม่พบข้อมูล');
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล', err);
      }
    };
    fetchContact();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ข้อความของคุณถูกส่งเรียบร้อยแล้ว!');
    // console.log(formData);
  };

  if (!contactInfo) return <p>กำลังโหลดข้อมูล...</p>;
  //console.log(contactInfo);

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>ติดต่อเรา</h1>
        <p>เรายินดีรับฟังความคิดเห็นและตอบคำถามของคุณ</p>
      </header>

      <div className="contact-grid">
        <div className="card-contact">
          <div className="card-contact-header">
            <AiOutlineMail className="card-contact-icon" size={24} />
            <h2>ข้อมูลการติดต่อ</h2>
          </div>
          <ul className="contact-list">
            <li className="contact-item">
              <div className="contact-icon-wrapper">
                <BiPhoneCall className="contact-icon" size={20} />
              </div>
              <div className="contact-item-content">
                <p>เบอร์โทรศัพท์:</p>
                <span>{contactInfo.Phone}</span>
              </div>
            </li>
            <li className="contact-item">
              <div className="contact-icon-wrapper">
                <AiOutlineMail className="contact-icon" size={20} />
              </div>
              <div className="contact-item-content">
                <p>อีเมล:</p>
                <span>{contactInfo.Email}</span>
              </div>
            </li>
            <li className="contact-item">
              <div className="contact-icon-wrapper">
                <FaMapMarkerAlt className="contact-icon" size={20} />
              </div>
              <div className="contact-item-content">
                <p>ที่อยู่:</p>
                <span>{contactInfo.Address}</span>
              </div>
            </li>
            <li className="contact-item">
              <div className="contact-icon-wrapper">
                <FaShareAlt className="contact-icon" size={20} />
              </div>
              <div className="contact-item-content">
                <p>ช่องทางโซเชียลมีเดีย:</p>
                <div className="social-links">
                  <a href={contactInfo.FacebookUrl} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                  <a href={contactInfo.InstagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href={contactInfo.TwitterUrl} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  <a href={contactInfo.LinkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                </div>
              </div>
            </li>
          </ul>
        </div>

           {/* ฟอร์มติดต่อ */}
        <div className="card-contact">
          <div className="card-contact-header">
            <FaPaperPlane className="card-contact-icon" size={24} />
            <h2>ส่งข้อความถึงเรา</h2>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <FaUser size={18} />
                ชื่อ:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="กรอกชื่อของคุณ"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope size={18} />
                อีเมล:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="กรอกอีเมลของคุณ"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                <FaTag size={18} />
                หัวข้อ:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="หัวข้อที่ต้องการติดต่อ"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <FaRegCommentDots size={18} />
                ข้อความ:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                required
                className="form-textarea"
              />
            </div>

            <button type="submit" className="form-submit">
              <FaPaperPlane size={18} />
              ส่งข้อความ
            </button>
          </form>
        </div>
      </div>

      <div className="contact-grid">
        {/* แผนที่เหมือนเดิม */}
        <div className="card-contact">
          <div className="card-contact-header">
            <FaMapMarkedAlt className="card-contact-icon" size={24} />
            <h2>แผนที่ของเรา</h2>
          </div>
          <div className="map-container">
            <iframe
              src={contactInfo.MapEmbedUrl || 'https://www.google.com/maps'}
              allowFullScreen
              loading="lazy"
              title="แผนที่"
            ></iframe>
          </div>
        </div>

        {/* FAQ จาก contactInfo */}
        {/* <div className="card-contact">
          <div className="card-contact-header">
            <FaQuestionCircle className="card-contact-icon" size={24} />
            <h2>คำถามที่พบบ่อย (FAQ)</h2>
          </div>
          <ul className="faq-list">
            {contactInfo.faq?.map((item, index) => (
              <li key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {item.question}
                </button>
                <div className={`faq-answer ${openFaq === index ? '' : 'hidden'}`}>
                  {item.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>
        </div>
          );
};  */}
          <div className="card-contact">
            <div className="card-contact-header">
              <FaQuestionCircle className="card-contact-icon" size={24} />
              <h2>คำถามที่พบบ่อย (FAQ)</h2>
            </div>
            <ul className="faq-list">
              <li className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq('faq1')}>
                  เวลาเปิดทำการของคุณคืออะไร?
                </button>
                <div className={`faq-answer ${openFaq === 'faq1' ? '' : 'hidden'}`}>
                  เราทำการจันทร์ถึงศุกร์ เวลา 9:00 AM - 6:00 PM และวันเสาร์ 9:00 AM - 12:00 PM
                </div>
              </li>
              <li className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq('faq2')}>
                  จะติดต่อฝ่ายสนับสนุนได้อย่างไร?
                </button>
                <div className={`faq-answer ${openFaq === 'faq2' ? '' : 'hidden'}`}>
                  คุณสามารถติดต่อผ่านอีเมล contact@yourcompany.com, โทรศัพท์ 123-456-7890 หรือแชทสดบนเว็บไซต์ (ถ้ามี)
                </div>
              </li>
              <li className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq('faq3')}>
                  มีบริการอะไรบ้าง?
                </button>
                <div className={`faq-answer ${openFaq === 'faq3' ? '' : 'hidden'}`}>
                  เรามีบริการหลากหลาย สามารถดูรายละเอียดเพิ่มเติมได้ที่หน้าบริการของเรา
                </div>
              </li>
            </ul>
          </div>
          </div>
</div>
  );
};


export default ContactUs;
