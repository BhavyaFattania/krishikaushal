import React, { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';
import VoiceToText from '../components/VoiceToText';
import HandleVoiceSearch from '../hooks/handleVoiceSearch';

const FarmerGuide = () => {
  const [transcript, setTranscript] = useState('');
  const [matchingFAQs, setMatchingFAQs] = useState([]);

  const handleTranscript = (text) => {
    setTranscript(text);
    findMatchingFAQs(text);
  };

  const faqData = {
    'Crop Management': [
      { question: 'How can I improve soil health?', answer: 'Implement practices like crop rotation, cover cropping, and organic matter addition. Consider soil testing to identify nutrient deficiencies.' },
      { question: 'How do I manage pests and diseases effectively?', answer: 'Integrated Pest Management (IPM) is key. This involves a combination of cultural, biological, and chemical control methods.' },
      { question: 'What is the best time to plant my crops?', answer: 'Consider local climate, soil conditions, and crop-specific requirements. Use agricultural calendars as a guide.' },
      { question: 'How can I increase crop yield?', answer: 'Improve soil fertility, use high-quality seeds, optimize planting density, and employ proper irrigation and weed control.' }
    ],
    'Financial Management': [
      { question: 'How can I reduce production costs?', answer: 'Explore cost-effective inputs, improve efficiency, and adopt labor-saving technologies.' },
      { question: 'What are the best crop insurance options?', answer: 'Research different insurance plans based on your crop type, region, and risk tolerance.' },
      { question: 'How can I access agricultural loans?', answer: 'Explore government schemes, cooperative banks, and commercial banks. Prepare a detailed business plan.' }
    ],
    'Market and Policy': [
      { question: 'How can I find profitable markets for my produce?', answer: 'Explore direct-to-consumer channels, farmer\'s markets, and cooperatives. Build relationships with buyers.' },
      { question: 'What government schemes are available for farmers?', answer: 'Research and understand government programs like subsidies, crop insurance, and credit facilities.' },
      { question: 'How can I cope with fluctuating prices?', answer: 'Diversify crops, consider forward contracts, and explore price risk management tools.' }
    ],
    'Technology and Innovation': [
      { question: 'How can I use technology to improve farming?', answer: 'Explore options like precision agriculture, farm management software, and weather apps.' },
      { question: 'What are the benefits of organic farming?', answer: 'Understand the principles of organic farming, including soil health, biodiversity, and animal welfare.' },
      { question: 'How can I adopt sustainable farming practices?', answer: 'Focus on water conservation, reducing chemical inputs, and protecting the environment.' }
    ],
    'Other Common Concerns': [
      { question: 'How can I manage water scarcity?', answer: 'Implement water-saving techniques like drip irrigation, rainwater harvesting, and efficient water management.' },
      { question: 'How can I improve livestock health?', answer: 'Provide proper nutrition, vaccination, and hygiene. Consult with a veterinarian.' },
      { question: 'What are the challenges of climate change for farmers?', answer: 'Understand the impacts of climate change on your region and adopt climate-resilient practices.' }
    ]
  };

  const findMatchingFAQs = (text) => {
    if (!text) return;

    const matches = [];

    Object.entries(faqData).forEach(([sectionTitle, faqs]) => {
      faqs.forEach(({ question, answer }) => {
        if (question.toLowerCase().includes(text.toLowerCase())) {
          matches.push({ sectionTitle, question, answer });
        }
      });
    });

    setMatchingFAQs(matches);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Farmer's Guide: Frequently Asked Questions</h2>
      <VoiceToText onTranscript={handleTranscript} />
      <HandleVoiceSearch transcript={transcript} />
      
      {transcript && (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Transcribed Text</h3>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {matchingFAQs.length > 0 && (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Matching FAQs</h3>
          {matchingFAQs.map((item, index) => (
            <FAQ key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      )}

      {Object.entries(faqData).map(([sectionTitle, faqs]) => (
        <div key={sectionTitle} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{sectionTitle}</h3>
          {faqs.map((item, index) => (
            <FAQ key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default FarmerGuide;
