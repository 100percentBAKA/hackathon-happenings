import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const extractBrandDetails = async (formData) => {
  const { data } = await api.post('/api/v1/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const generateAd = async (data) => {
  const response = await api.post('/api/v1/generate-ad', data);
  return response.data;
};