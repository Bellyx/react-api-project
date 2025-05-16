import axios from 'axios';

const BASE_URL = 'http://localhost/portfolio/api/landing.php'; // เปลี่ยนเป็น URL ของ backend

export const getLandingData = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const updateLandingData = async (updatedData) => {
  // const res = await axios.put(BASE_URL, updatedData);
   const res = await axios.post(BASE_URL, updatedData); // ใช้ POST
  return res.data;
};
