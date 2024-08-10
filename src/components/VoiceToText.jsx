import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';

const VoiceToText = ({ onTranscript }) => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
    error,
  } = useSpeechRecognition();

  const [errorMessage, setErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Tap to Start');

  useEffect(() => {
    if (error) {
      setErrorMessage('Error occurred: ' + error.message);
    } else {
      setErrorMessage('');
    }
  }, [error]);

  useEffect(() => {
    if (!listening && transcript) {
      onTranscript(transcript);
      setButtonText('Okay!');
      setTimeout(() => setButtonText('Tap to Start'), 3000);
      resetTranscript(); // Clear transcript for the next session
    }
  }, [listening, transcript, onTranscript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: false });
    setButtonText('Listening...');
  };

  return (
    <div className="my-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-xl font-semibold mb-2">AI-Based Voice Search</h3>
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={listening ? { scale: [1, 1.2, 1], transition: { duration: 1, repeat: Infinity } } : { scale: 1 }}
          className={`flex items-center p-2 border rounded-lg text-white focus:outline-none transition-all duration-300 ease-in-out ${
            listening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={handleStartListening}
          disabled={listening}
        >
          <FaMicrophone className="mr-2" /> {buttonText}
        </motion.button>
      </div>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default VoiceToText;
