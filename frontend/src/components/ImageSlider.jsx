import React, { useState, useEffect } from 'react';

export default function ImageSlider({ images, currentIndex, onClose, onRight, onWrong }) {
  const [index, setIndex] = useState(currentIndex);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
        <button 
          className="absolute left-4 text-white text-4xl font-bold z-10 hover:text-gray-300"
          onClick={prevImage}
        >
          &lt;
        </button>
        <img 
          src={images[index]} 
          alt={`Full size ad ${index + 1}`}
          className="max-h-full max-w-full object-contain"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        />
        <button 
          className="absolute right-4 text-white text-4xl font-bold z-10 hover:text-gray-300"
          onClick={nextImage}
        >
          &gt;
        </button>
        <button 
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        {showOptions && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={onRight}
            >
              Right
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onWrong}
            >
              Wrong
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

