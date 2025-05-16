import axios from 'axios';

export const getContactConfig = async () => {
  const res = await axios.get('/api/contact-info');
  return res.data;
};

export const updateContactConfig = async (data) => {
  return await axios.put('/api/contact-info', data);
};


