import React, { useState, useEffect } from 'react';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const HandleVoiceSearch = ({ transcript }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchVoiceQuery = async () => {
    if (!transcript) return;
  
    setLoading(true);
    console.log('Transmitting transcript:', transcript);
    try {
      const response = await axios.post('http://localhost:5000/api/voiceSearch', { query: transcript });
      console.log('API Response:', response.data);
  
      const { text } = response.data;

      // Clean and parse the JSON response
      const cleanResponseText = text
        .replace(/^```json\s*|\s*```$/g, '') // Remove backticks and json markers
        .trim();

      const parsedResponse = JSON.parse(cleanResponseText);

      setSearchResults(parsedResponse);
    } catch (error) {
      console.error('Error during voice search:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transcript) {
      searchVoiceQuery();
    }
  }, [transcript]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {searchResults && (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Search Results</h3>
          <p className="text-gray-700"><strong>Your Query:</strong> {searchResults.query}</p>
          <div className="mt-2">
            <h4 className="text-lg font-semibold">AI Response:</h4>
            <div className="text-gray-700 whitespace-pre-wrap">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{searchResults.response}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleVoiceSearch;
