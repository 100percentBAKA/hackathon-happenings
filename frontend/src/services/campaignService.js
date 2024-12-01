import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const createCampaign = async ({ brandFile, region, resolution }) => {
  const formData = new FormData();
  formData.append('doc_detail', brandFile);
  formData.append('region', region.join('|'));

  const { data: extractedData } = await api.post('/api/v1/extract', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const { data: generatedAds } = await api.post('/api/v1/generate-ad', {
    ...extractedData,
    resolution,
  });

  return generatedAds;
};