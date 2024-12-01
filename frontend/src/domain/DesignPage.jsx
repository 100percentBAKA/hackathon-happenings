import React,{useState} from 'react'
import axios from 'axios';
import DesignForm from '../components/DesignForm';
import AdsDisplay from '../components/AdsDisplay';

export default function DesignPage() {
    const [brandFile, setBrandFile] = useState([null, null, null]);
    const [region, setRegion] = useState([]);
    const [ads,setAds]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [resolution, setResolution] = useState({ width: 1024, height: 720 });

    const handleFileChange = async(event) => {
        try{
            setBrandFile(event.target.files[0]);
        }
        catch(err){
            console.error('Error converting file to base64:', error);
        }
    };

  
    const handleSubmit = async(event) => {
      event.preventDefault();
      setIsLoading(true);
      const allRegion=region.join('|');
      console.log(allRegion)
        const data= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/extract`,
            {
                doc_detail:brandFile,
                region:allRegion,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            
        );
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/generate-ad`,{
            ...data.data,
            resolution:resolution
            }
        ).then((response)=>{
            setAds(response.data);
            setIsLoading(false);
        })
        .catch((err)=>{
            console.error(err);
            setIsLoading(false);
        })
    };
  
    return (
        <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
  {isLoading && (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-600 bg-opacity-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  )}
    
  <div className={`flex flex-col lg:flex-row ${ads && ads.image_urls && ads.image_urls.length > 0 ? 'lg:space-x-8' : ''}`}>
    <div className={`${ads && ads.image_urls && ads.image_urls.length > 0 ? 'lg:w-1/2' : 'w-full'} mb-8 lg:mb-0 lg:pr-4`}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="px-4 py-5 sm:p-6 h-full">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <DesignForm region={region} resolution={resolution} setResolution={setResolution} handleFileChange={handleFileChange} handleSubmit={handleSubmit} setRegion={setRegion}/>
        </div>
      </div>
    </div>
    </div>

    {ads && ads.image_urls && 
        <AdsDisplay ads={ads}/>
    }

  </div>
</div>
    )
}
