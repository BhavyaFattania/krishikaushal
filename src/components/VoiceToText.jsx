import React, { useState, useEffect } from 'react';
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
  const [buttonText, setButtonText] = useState('Start Listening');

  useEffect(() => {
    console.log('Transcript Updated:', transcript);
    console.log('Error:', error);

    if (error) {
      setErrorMessage('Error occurred: ' + error.message);
    } else {
      setErrorMessage('');
    }
  }, [transcript, error]);

  useEffect(() => {
    if (!listening && transcript) {
      console.log('Final Transcript:', transcript);
      onTranscript(transcript);

      setButtonText('Okay');
      setTimeout(() => setButtonText('Start Listening'), 3000);
      resetTranscript(); // Clear transcript for next session
    }
  }, [listening, transcript, onTranscript, resetTranscript]);

  console.log('Browser Supports Speech Recognition:', browserSupportsSpeechRecognition);
  console.log('Is Listening:', listening);

  if (!browserSupportsSpeechRecognition) {
    console.log('Browser does not support speech recognition');
    return <p>Browser does not support speech recognition.</p>;
  }

  const handleStartListening = () => {
    console.log('Starting Listening...');
    SpeechRecognition.startListening({ continuous: false });
    setButtonText('Listening...');
  };

  return (
    <div className="my-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-xl font-semibold mb-2">AI Based Voice Search</h3>
      <div className="flex items-center">
        <button
          className="flex items-center p-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
          onClick={handleStartListening}
          disabled={listening}
        >
          <FaMicrophone className="mr-2" /> {buttonText}
        </button>
      </div>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default VoiceToText;
