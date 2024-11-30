import React,{useState} from 'react'
import { FaUpload, FaImage, FaFont } from 'react-icons/fa';
import axios from 'axios';

export default function DesignPage() {
    const [files, setFiles] = useState([null, null, null]);
    const [region, setRegion] = useState('');
    const [additionalImage, setAdditionalImage] = useState(null);
   

    const handleFileChange = async(index, event) => {
        try{
            const newFiles = [...files];
            newFiles[index] = event.target.files[0];
            setFiles(newFiles);
        }
        catch(err){
            console.error('Error converting file to base64:', error);
        }
    };
  
    const handleAdditionalImageChange = async(event) => {
      setAdditionalImage(event.target.files[0]);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      // Handle form submission here
      if([files.length == 3]){
        const data= await axios.post('https://e53f-103-191-91-22.ngrok-free.app/api/v1/extract',
            {
                brand_metadata:files[1],
                guidelines:files[0],
                campaign_details:files[2],
                region:region,
                design_plan: additionalImage,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

        );
        const response=await axios.post('https://e53f-103-191-91-22.ngrok-free.app/api/v1/generate-ad',
            data.data
        )
        console.log(response.data);
        }
    };
  
    return (
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Prompt</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {["Brand details", "Guidelines", "Campaign details"].map((value,index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUpload className="text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <label className="block text-lm font-medium text-gray-700">
                        {value}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e)}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                ))}
  
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaFont className="text-gray-400" />
                      </div>
                      <textarea
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        rows="3"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter additional context..."
                      />
                    </div>
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Designer Context 
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <FaImage className="text-blue-500" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <input
                          type="file"
                          onChange={handleAdditionalImageChange}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Design Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}
