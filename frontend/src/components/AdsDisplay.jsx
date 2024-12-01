import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { Card, CardHeader, CardContent } from './ui/Card';

export default function AdsDisplay({ ads }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openSlider = (index) => {
    setCurrentImageIndex(index);
    setSliderOpen(true);
  };


  return (
    <>
      {ads.image_urls.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2"
        >
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Generated Ads</h2>
              <p className="text-sm text-gray-600">
                Click on any ad to view in full size or download it.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {ads.image_urls.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-lg shadow-lg"
                    >
                      <img
                        src={image}
                        alt={`Generated ad ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        loading="lazy"
                        onClick={() => openSlider(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {sliderOpen && (
        <ImageSlider
          images={ads.image_urls}
          currentIndex={currentImageIndex}
          onClose={() => setSliderOpen(false)}
        />
      )}
    </>
  );
}
