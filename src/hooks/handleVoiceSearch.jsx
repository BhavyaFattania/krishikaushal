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
      const URL = process.env.REACT_APP_VOICE_SEARCH;
      console.log("env: " + URL);
      const response = await axios.post(URL, { query: transcript });
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
      {loading &&
        <div className="flex flex-col items-start justify-start gap-4 my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Generating...</h3>
          <div className="h-2 w-full bg-gradient-to-r from-green-500 via-green-300 to-green-700 mx-auto rounded-full animate-gradient-animate z-50"></div>
          <div className="h-2 w-1/2 text-left bg-gradient-to-r from-green-500 via-green-300 to-green-700 mx-auto rounded-full animate-gradient-animate z-50"></div>
        </div>
      }
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
