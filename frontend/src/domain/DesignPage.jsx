import React, { useState } from 'react';
import DesignForm from '../components/DesignForm';
import AdsDisplay from '../components/AdsDisplay';
import { Toaster } from 'react-hot-toast';
import { notify } from '../utils/toast';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { Container } from '../components/ui/Container';
import { createCampaign } from '../services/campaignService';

export default function DesignPage() {
  const [brandFile, setBrandFile] = useState(null);
  const [region, setRegion] = useState([]);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resolution, setResolution] = useState({ width: 1024, height: 720 });

  const handleFileChange = async (file) => {
    try {
      setBrandFile(file);
      notify.success('File uploaded successfully');
    } catch (err) {
      notify.error('Error uploading file');
      console.error('Error handling file:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const loadingToast = notify.loading('Creating your campaign magic...');

    try {
      const generatedAds = await createCampaign({
        brandFile,
        region,
        resolution,
      });

      setAds(generatedAds);
      notify.dismiss(loadingToast);
      notify.success('Your campaign is ready! 🎉');
    } catch (err) {
      notify.dismiss(loadingToast);
      notify.error(err.response?.data?.message || 'Error generating campaign');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      {...fadeIn}
      className="min-h-screen" style={{
        background: 'linear-gradient(to bottom right, #4361ee, #fefae0, #822faf)',
      }}
    >
      <Container>
        <div className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12 mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your Campaign
            </h1>
            <p className="text-lg text-300 max-w-2xl mx-auto">
              Transform your brand into stunning ad campaigns with our AI-powered design studio
            </p>
          </motion.div>

          <div className={`flex flex-col lg:flex-row ${ads?.image_urls?.length > 0 ? 'lg:space-x-8' : ''}`}>
            <div className={`${ads?.image_urls?.length > 0 ? 'lg:w-1/2' : 'w-full'} mb-8 lg:mb-0`}>
              <DesignForm
                region={region}
                resolution={resolution}
                setResolution={setResolution}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                setRegion={setRegion}
                isLoading={isLoading}
              />
            </div>

            {ads?.image_urls && <AdsDisplay ads={ads} />}
          </div>
        </div>
      </Container>
      
      <Toaster position="top-right" />
      {isLoading && <LoadingOverlay />}
    </motion.div>
  );
}