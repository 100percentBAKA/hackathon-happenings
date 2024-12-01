import React from 'react';
import Select from 'react-select';
import { FileUpload } from './FileUpload';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Country, City } from 'country-state-city';
import countryList from 'react-select-country-list';
import { FaRuler, FaGlobe, FaFileUpload } from 'react-icons/fa';

export default function DesignForm({
  setRegion,
  region,
  handleFileChange,
  handleSubmit,
  resolution,
  setResolution,
  isLoading
}) {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const countries = React.useMemo(() => countryList().getData(), []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setRegion([]);
  };

  const handleCityChange = (selectedOptions) => {
    const selectedRegions = selectedOptions.map(
      option => `${option.name}, ${selectedCountry.label}`
    );
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
    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h2 className="text-2xl font-bold ">Design Your Campaign</h2>
          <p className="text-300">
            Upload your brand details and customize your campaign settings
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <FaFileUpload className="mr-2" />
              <label className="text-lg font-medium">Brand Document</label>
            </div>
            <FileUpload onFileChange={handleFileChange} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <FaGlobe className="mr-2" />
              <label className="text-lg font-medium">Target Locations</label>
            </div>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select a country..."
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  background: 'rgba(30, 41, 59, 0.95)',
                  backdropFilter: 'blur(8px)'
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                  color: 'gray'
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'gray'
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'rgba(0, 0, 0, 0.5)'
                })
              }}
            />

            <Select
              isMulti
              options={cityOptions}
              onChange={handleCityChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select cities..."
              isDisabled={!selectedCountry}
              value={cityOptions.filter(option => 
                region.includes(`${option.name}, ${selectedCountry?.label}`)
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  background: 'rgba(30, 41, 59, 0.95)',
                  backdropFilter: 'blur(8px)'
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                  color: 'white'
                }),
                multiValue: (base) => ({
                  ...base,
                  background: 'rgba(59, 130, 246, 0.3)'
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'white'
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: 'white',
                  ':hover': {
                    background: 'rgba(239, 68, 68, 0.5)',
                    color: 'white'
                  }
                })
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <FaRuler className="mr-2" />
              <label className="text-lg font-medium">Ad Resolution</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label>Width</label>
                  <span>{resolution.width}px</span>
                </div>
                <input
                  type="range"
                  name="width"
                  min="320"
                  max="3840"
                  step="16"
                  value={resolution.width}
                  onChange={handleResolutionChange}
                  className="w-full h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(59, 130, 246) ${(resolution.width - 320) / (3840 - 320) * 100}%, rgba(59, 130, 246, 0.3) ${(resolution.width - 320) / (3840 - 320) * 100}%)`
                  }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between ">
                  <label>Height</label>
                  <span>{resolution.height}px</span>
                </div>
                <input
                  type="range"
                  name="height"
                  min="240"
                  max="2160"
                  step="16"
                  value={resolution.height}
                  onChange={handleResolutionChange}
                  className="w-full h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(59, 130, 246) ${(resolution.height - 240) / (2160 - 240) * 100}%, rgba(59, 130, 246, 0.3) ${(resolution.height - 240) / (2160 - 240) * 100}%)`
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end" >
        <Button
          className="font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          type="submit"
          size="lg"
          disabled={isLoading}
          style={{
            background: 'linear-gradient(to bottom right, #4361ee, #fefae0, #822faf)',
            color:'black'
          }}
          onMouseOver={(e) => (e.target.style.background = 'linear-gradient(to bottom right, #3b55d3, #ebe8c7, #7427d4)')}
          onMouseOut={(e) => (e.target.style.background = 'linear-gradient(to bottom right, #4361ee, #fefae0, #822faf)')}
          >
            {isLoading ? 'Creating Campaign...' : 'Generate Campaign'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}