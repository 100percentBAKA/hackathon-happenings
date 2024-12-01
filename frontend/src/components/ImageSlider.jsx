import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageSlider({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') prevImage();
      else if (event.key === 'ArrowRight') nextImage();
      else if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="relative max-w-7xl w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.img
            key={index}
            src={images[index]}
            alt={`Full size ad ${index + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.button
            className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>

          <motion.button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-6 h-6" />
          </motion.button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {index + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}