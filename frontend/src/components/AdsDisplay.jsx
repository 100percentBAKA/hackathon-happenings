import React,{useState} from 'react'
import ImageSlider from './ImageSlider'; // You'll need to create this component


export default function AdsDisplay({ads}) {
    const [sliderOpen, setSliderOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const openSlider = (index) => {
      setCurrentImageIndex(index);
      setSliderOpen(true);
    };
  return (
        <>
            
            {ads.image_urls.length > 0 && (
            <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Ads</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ads.image_urls.map((image, index) => (
                    <div 
                    key={index} 
                    className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    onClick={() => openSlider(index)}
                    >
                    <img 
                        src={image} 
                        alt={`Generated ad ${index + 1}`} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-semibold">
                            Ad {index + 1}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}

      {sliderOpen && (
        <ImageSlider 
          images={ads.image_urls}
          currentIndex={currentImageIndex}
          onClose={() => setSliderOpen(false)}
          onRight={() => {/* Handle right choice */}}
          onWrong={() => {/* Handle wrong choice */}}
        />
      )}
        </>
    )
}
