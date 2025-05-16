import '../assets/css/AboutPage.css';
import React, { useEffect, useState } from 'react';

const AboutPage = () => {
      const [content, setContent] = useState('');
      const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(true);
      const [pageKey, setPageKey] = useState('');
      const [nameCompany, setNameCompany] = useState('');
      const [detailCompany, setDetailCompany] = useState('');

  const [aboutData, setAboutData] = useState('');

  useEffect(() => {
    fetch('http://localhost/portfolio/api/get_about.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPageKey(data.PageKey);
          setNameCompany(data.Name_Company);
          setDetailCompany(data.Detail_Company);
          setContent(data.Detail_Company); // ตั้งค่าข้อมูลสำหรับ textarea

          setAboutData(data.content);
        } else {
          setAboutData("ไม่พบข้อมูลเกี่ยวกับเรา");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading about data", err);
        setAboutData("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        setLoading(false);
      });
  }, []);

  return (
    // <div className="container">
    //   <h1>เกี่ยวกับเรา</h1>
    //   {loading ? <p>กำลังโหลดข้อมูล...</p> : <p>{aboutData}</p>}
    // </div>
    <div classNameName="App">
         <nav>
        <div>
          <a href="mailto:karan.kumar@ecerasystem.com">
            <img src="https://cdn.iconscout.com/icon/free/png-64/email-letter-envelope-message-38065.png" alt="G-mail" />
            <span>karan.kumar@ecerasystem.com</span>
          </a>
          <a href="tel:+91 123456789">
            <img src="https://cdn.iconscout.com/icon/premium/png-64-thumb/telephone-41-117249.png" alt="Phone" />
            <span>+91 123456789</span>
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com">
            <img src="https://cdn.iconscout.com/icon/free/png-64/instagram-1868978-1583142.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com">
            <img src="https://cdn.iconscout.com/icon/free/png-64/facebook-logo-3771014-3147631.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com">
            <img src="https://cdn.iconscout.com/icon/free/png-64/linkedin-162-498418.png" alt="LinkedIn" />
          </a>
          <a href="https://web.telegram.org">
            <img src="https://cdn.iconscout.com/icon/free/png-64/telegram-2752057-2284874.png" alt="Telegram" />
          </a>
        </div>
      </nav>
    <main>
    <div id="front">
      <h1 style={{ textAlign: "center" }}>{nameCompany}</h1>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
        alt="font"
      />
      <p>{detailCompany}</p>
      {loading && <p>Loading...</p>}
     
    </div>

      <div id="first" className="reveal">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/growing-business-by-digital-marketing-4217800-3501667.png"
          alt=""
        />
        <div>
          <h1>We Offer Innovative Technology Solutions</h1>
          <p>
            EceraSystem is a full-service digital marketing agency with a long
            history of delivering great results for our clients. We take an
            individualized approach to every customer project. In some cases
            we may focus more on SEO, while in others we’ll dig more into PPC,
            social media or conversion optimization.
          </p>
          <h2>UI/UX Design (90%)</h2>
          <div className="comm">
            <div id="comm1"></div>
          </div>
          <h2>APP Developement (85%)</h2>
          <div className="comm">
            <div id="comm2"></div>
          </div>
          <h2>WEB Developement (70%)</h2>
          <div className="comm">
            <div id="comm3"></div>
          </div>
        </div>
      </div>

      <div id="fourth" className="reveal">
        <h2 style={{ color: "white" }}>บริการต่างๆ</h2>
        <h1 style={{ color: "white" , textAlign: "center" }}>
          การทำงานอย่างมีคุณภาพที่ดีที่สุด
        </h1>
        <div id="fourth_cards">
          <div>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/data-analysis-27-681042.png"
              alt=" "
            />
            <p>DATA ANALYTICS</p>
          </div>
          <div>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/ui-ux-designer-2755964-2289563.png"
              alt=" "
            />
            <p>UI/UX DESIGN</p>
          </div>
          <div>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/web-development-3-478143.png"
              alt=" "
            />
            <p>WEB DEVELOPEMENT</p>
          </div>
          <div>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/qa-testing-3919162-3246433.png"
              alt=" "
            />
            <p>Q&A TESTING</p>
          </div>
          <div>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/team-135-386667.png"
              alt=" "
            />
            <p>DEDICATED TEAM</p>
          </div>
        </div>
      </div>

      <div id="second" className="reveal">
        <div className="container">
          <div>
            <h1>WE PROVIDE</h1>
            <h2>Remote Employee</h2>
            <p>
              A huge pool of talent from every domain available for your
              office. Solve your freelancing problems by letting us help you
              find the most suitable employee or a whole team that won't let
              you down. Everything is managed by Indirect Employee staff!
            </p>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/men-and-woman-characters-work-together-on-project-presentation-2706075-2259871.png"
            alt=""
          />
        </div>
        <div className="container">
          <div>
            <h1>WE HAVE</h1>
            <h2>Global Partnership</h2>
            <p>
              Our Global parters are spread 12 countries and our client base
              is growing day by day . Many of my clients are repeat customers
              and several have come to us through high recommendation and
              referrals . Our client hail from different domains
            </p>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/business-partnership-2975816-2476892.png"
            style={{ marginTop: "50px" }}
            alt=""
          />
        </div>
        <div className="container">
          <div>
            <h1>OUR GOAL</h1>
            <h2>Same Quality at Low Cost</h2>
            <p>
              We have unique and revolutionary business principle, ‘Same
              quality but significantly lower cost’. we aims to fulfill the
              long-standing outsourcing vacuum felt by Small Medium
              Enterprises across the country who, till now, were dependent
              mostly on offshore freelancers.The hired professionals match
              their western counterparts in skills, qualifications and
              experience alongwith the added advantage of attractive low
              costs.
            </p>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/business-goal-4352585-3618767.png"
            style={{ marginTop: "80px" }}
            alt=""
          />
        </div>
        <div className="container">
          <div>
            <h1>OUR STRENGTHS</h1>
            <h2>Intelligent Use of Technology and Human Resource</h2>
            <p>
              We provide every client with a dedicated, full-time work from
              home from their comfortable place. To successfully achieve this
              objective, we relay on management, infrastructure, hardware and
              the latest technology to bridge physical distance and time zone
              differences.We provide experience of making employees to work
              from home for the company as real as they work in the company.
            </p>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/teamwork-3560853-2989144.png"
            alt=""
          />
        </div>
      </div>

      <div id="third" className="reveal">
        <h3 style={{ textAlign: "center" }}>OUR PROCESS</h3>
        <h1 style={{ textAlign: "center" }}>
          Driving Client Results Utilizing New Innovation Points of view
        </h1>
        <div id="third_cards">
          <div>
            <h2>End to End Solutions and Services Guaranteed</h2>
            <p>
              Fusce nec tellus sed augue semper porta. Mauris massa.
              Vestibulum lacinia arcu eget nulla. per inceptos himenaeos.
            </p>
          </div>
          <div>
            <h2>Ahead of The Curve We Future-proof Your IT</h2>
            <p>
              Fusce nec tellus sed augue semper porta. Mauris massa.
              Vestibulum lacinia arcu eget nulla. per inceptos himenaeos.
            </p>
          </div>
          <div>
            <h2>Experience Certainty Every Project Executed Successful</h2>
            <p>
              Fusce nec tellus sed augue semper porta. Mauris massa.
              Vestibulum lacinia arcu eget nulla. per inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>

      <div id="fifth" className="reveal">
        <h1>ECERA SYSTEM</h1>
        <div>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/address-blue-circle-location-map-marker-navigation-icon-45868.png"
              alt=" "
            />
            <span>
              <h3>Address</h3>
              <p>4813 Woodland Ave Royal Oak, Michigan - 48073, USA</p>
            </span>
          </a>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/phone-2666572-2212584.png"
              alt=" "
            />
            <span>
              <h3>Phone</h3>
              <p>+1 248 672 1972</p>
            </span>
          </a>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/gmail-2489176-2082900.png"
              alt=" "
            />
            <span>
              <h3>E-mail</h3>
              <p>Sales@Ecerasystem.com</p>
            </span>
          </a>
        </div>
      </div>
    </main>
  </div>
  );
};

export default AboutPage;
