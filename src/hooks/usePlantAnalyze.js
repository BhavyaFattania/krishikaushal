import { useState } from 'react';
import axios from 'axios';

export const usePlantAnalyze = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select an image file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setResponseData(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/analyzeImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log the raw response
      console.log('Raw API Response:', res.data);

      const rawText = res.data.text;
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);

      if (jsonMatch) {
        const jsonString = jsonMatch[1];
        const parsedData = JSON.parse(jsonString);
        setResponseData(parsedData);
      } else {
        setError('Could not parse the JSON response.');
      }
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
  };
};
