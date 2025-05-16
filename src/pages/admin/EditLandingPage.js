import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate} from 'react-router-dom';
import { updateLandingData } from '../../services/landingApi';
import '../../assets/css/admin/UploadBanner.css';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa'; // นำเข้าไอคอน

const EditLandingPage = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
   const navigate = useNavigate();

  useEffect(() => {
          if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/login');
        return;
      }
    setIsLoading(true);
    fetch('http://localhost/portfolio/api/get_landing.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.banners) {
          const processedBanners = data.banners.map(banner => ({
            ...banner,
          }));
          setFormData(processedBanners);
          setError(null);
        } else {
          console.error('Missing banners data or request unsuccessful:', data.message || 'No message');
          setError(data.message || 'ไม่สามารถโหลดข้อมูล Banner ได้');
          setFormData([]);
        }
      })
      .catch(fetchError => {
        console.error('Fetch error:', fetchError);
        setError(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${fetchError.message}`);
        setFormData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const updatedBanners = [...formData];
    updatedBanners[index][field] = value;
    setFormData(updatedBanners);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedBanners = [...formData];
        updatedBanners[index].image = reader.result;
        updatedBanners[index].imageFile = file;
        setFormData(updatedBanners);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBanner = () => {
    setFormData([
      ...formData,
      {
        id: `new-${Date.now()}`,
        name: '',
        part_desc: '',
        image: null,
        isNew: true,
      },
    ]);
  };

  const removeBanner = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    if (!formData || formData.length === 0) {
      alert('ไม่มีข้อมูล Banner ให้บันทึก!');
      return;
    }

    try {
      await updateLandingData(formData);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
    } catch (apiError) {
      console.error('Error updating landing page:', apiError);
      alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${apiError.message || 'ไม่สามารถติดต่อเซิร์ฟเวอร์'}`);
    }
  };

  if (isLoading) return <div className="loading-state">Loading... กรุณารอสักครู่</div>;
  if (error) return <div className="error-state">เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div className="container-minimal">
      <Sidebar />
      <div className="main-content-minimal">
        <div className="header-actions">
          <h2>แก้ไขหน้า Landing Page</h2>
          <div>
            <button type="button" className="btn-minimal add-btn" onClick={addBanner}>
              <FaPlus   /> เพิ่ม Banner
            </button>
            <button type="button" className="btn-minimal save-btn" onClick={handleSubmit}>
              <FaSave /> บันทึก
            </button>
          </div>
        </div>
        <div className="banner-list">
          {formData.map((banner, index) => (
        <div key={banner.unique_frontend_id || banner.id || index} className="banner-item">
          <div className="banner-item-header">
            <h3>Banner #{index + 1} {banner.isNew && "(ใหม่)"}</h3>
            <button
              onClick={() => removeBanner(index)}
              className="btn-minimal remove-btn"
              aria-label={`ลบ Banner ${index + 1}`}
            >
              <FaTimes />
            </button>
          </div>

          {/* ... ส่วนของฟอร์ม input ต่างๆ ... */}

          <div className="form-group-minimal image-upload-minimal">
            <label htmlFor={`banner-image-upload-${index}`} className="upload-label-minimal">
              {banner.image ? 'เปลี่ยนรูป' : 'อัปโหลดรูป'}
            </label>
            <input
              id={`banner-image-upload-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              className="upload-input-minimal"
            />
            {banner.image && (
              <div className="image-preview-minimal">
                <img
                  src={banner.image}
                  alt={`Preview ${banner.name || index + 1}`}
                  className="preview-img-minimal"
                />
              </div>
            )}
          </div>

          {/* ปุ่มบันทึกสำหรับแต่ละ banner-item */}
     <button type="button" className="btn-minimal save-btn" onClick={handleSubmit}>
              <FaSave /> บันทึก
            </button>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default EditLandingPage;