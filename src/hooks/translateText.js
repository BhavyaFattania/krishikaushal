import axios from 'axios';

// Function to translate text using Google Translate API
export const translateText = async (text, targetLanguage) => {
  const apiKey = 'AIzaSyDiFJU4WMM9Y4mfuV-cPU-jI3l-0CicHvs'; // Replace with your Google Translate API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
      format: 'text',
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation API error:', error);
    throw new Error('Error translating text');
  }
};
