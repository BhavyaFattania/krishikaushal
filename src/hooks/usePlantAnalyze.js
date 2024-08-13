import { useState } from 'react';

export const usePlantAnalyze = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const URL = process.env.REACT_APP_ANALYZE_IMAGE;
      console.log("env: " + URL);
      const response = await fetch(URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Clean the response text
      const cleanResponseText = result.text
        .replace(/^```json\s*|\s*```$/g, '') // Remove backticks and json markers
        .trim();

      // Parse the cleaned response text
      const parsedResponse = JSON.parse(cleanResponseText);

      // Set the translated response data
      setResponseData({
        crop: parsedResponse.crop,
        disease: parsedResponse.disease,
        treatment: parsedResponse.treatment,
      });
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
