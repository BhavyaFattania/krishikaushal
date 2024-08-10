import { useState } from 'react';
import axios from 'axios';
import { translateText } from './translateText';

export const usePlantAnalyze = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // Default language

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagePreviewUrl) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError('');
    setResponseData(null);

    const formData = new FormData();
    formData.append('image', document.querySelector('input[type="file"]').files[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/analyzeImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Clean the response text
      const cleanResponseText = response.data.text
        .replace(/^```json\s*|\s*```$/g, '') // Remove backticks and json markers
        .trim();

      // Parse the cleaned response text
      const parsedResponse = JSON.parse(cleanResponseText);

      // Translate the response text
      const translatedResponse = await translateText(JSON.stringify(parsedResponse), language);
      const translatedParsedResponse = JSON.parse(translatedResponse);

      setResponseData(translatedParsedResponse);
    } catch (err) {
      setError('An error occurred while analyzing the image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    imagePreviewUrl,
    responseData,
    loading,
    error,
    handleFileChange,
    handleSubmit,
    setLanguage, // Expose the function to change language
  };
};
