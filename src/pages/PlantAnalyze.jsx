import React from 'react';
import { usePlantAnalyze } from '../hooks/usePlantAnalyze';
import { FiUpload } from 'react-icons/fi'; // Importing an upload icon from react-icons

const PlantAnalyze = () => {
  const {
    imagePreviewUrl,
    responseData,
    loading,
    error,
    handleFileChange,
    handleSubmit,
  } = usePlantAnalyze();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Plant Disease Analysis</h1>
      
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      
      {responseData && (
        <div className="mt-8 bg-gray-100 p-4 rounded-md shadow-inner">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Analysis Result:</h2>
          <p><strong className="font-medium">Crop:</strong> {responseData.crop}</p>
          <p><strong className="font-medium">Disease:</strong> {responseData.disease}</p>
          <p><strong className="font-medium">Treatment:</strong> {responseData.treatment}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer bg-gray-200 border border-gray-300 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300">
          <FiUpload className="text-3xl text-gray-600 mb-2" />
          <span className="text-gray-700">Click or Drag to Upload Image</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {imagePreviewUrl && (
          <div className="mt-4 w-full h-64 bg-gray-200 rounded-md overflow-hidden">
            <img
              src={imagePreviewUrl}
              alt="Selected"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
        
        <button
          type="submit"
          className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} focus:outline-none`}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PlantAnalyze;
