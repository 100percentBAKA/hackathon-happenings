import React,{useState,useMemo} from 'react'
import { FaUpload, FaFont } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list'
import { Country, City } from 'country-state-city'

export default function DesignForm({setRegion,region,handleFileChange,handleSubmit,resolution,setResolution}) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const countries = useMemo(() => countryList().getData(), [])

    const handleCountryChange = (selectedOption) => {
      setSelectedCountry(selectedOption);
      setRegion([]); 
    };
  
    const handleCityChange = (selectedOptions) => {
      const selectedRegions = selectedOptions.map(option => `${option.name}, ${selectedCountry.label}`);
      setRegion(selectedRegions);
    };
    
    const handleResolutionChange = (e) => {
        const { name, value } = e.target;
        setResolution(prev => ({ ...prev, [name]: parseInt(value) }));
      };

    const cityOptions = selectedCountry 
      ? City.getCitiesOfCountry(selectedCountry.value).map(city => ({
          value: city.name,
          label: city.name,
          name: city.name
        }))
      : [];

  return (
    <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Prompt</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUpload className="text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <label className="block text-lm font-medium text-gray-700">
                        Brand and campaign details
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <Select
                        options={countries}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="mt-1"
                    />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Cities
                </label>
                    <Select
                        isMulti
                        name="cities"
                        options={cityOptions}
                        className="basic-multi-select mt-1"
                        classNamePrefix="select"
                        onChange={handleCityChange}
                        value={cityOptions.filter(option => region.includes(`${option.name}, ${selectedCountry?.label}`))}
                        placeholder="Select cities..."
                        isDisabled={!selectedCountry}
                    />
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Image Resolution
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Width: {resolution.width}px</label>
                <input
                  type="range"
                  name="width"
                  min="320"
                  max="3840"
                  value={resolution.width}
                  onChange={handleResolutionChange}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Height: {resolution.height}px</label>
                <input
                  type="range"
                  name="height"
                  min="240"
                  max="2160"
                  value={resolution.height}
                  onChange={handleResolutionChange}
                  className="w-full"
                />
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
  )
}
