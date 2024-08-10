import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FAQ from '../components/FAQ';
import VoiceToText from '../components/VoiceToText';
import HandleVoiceSearch from '../hooks/handleVoiceSearch';

const FarmerGuide = () => {
  const { t, i18n } = useTranslation();
  const [transcript, setTranscript] = useState('');
  const [matchingFAQs, setMatchingFAQs] = useState([]);

  const handleTranscript = (text) => {
    setTranscript(text);
    findMatchingFAQs(text);
  };

  const faqData = {
    'Crop Management': [
      {
        question: t('faq_crop_management_question_1'),
        answer: t('faq_crop_management_answer_1')
      },
      {
        question: t('faq_crop_management_question_2'),
        answer: t('faq_crop_management_answer_2')
      },
      {
        question: t('faq_crop_management_question_3'),
        answer: t('faq_crop_management_answer_3')
      },
      {
        question: t('faq_crop_management_question_4'),
        answer: t('faq_crop_management_answer_4')
      }
    ],
    'Financial Management': [
      {
        question: t('faq_financial_management_question_1'),
        answer: t('faq_financial_management_answer_1')
      },
      {
        question: t('faq_financial_management_question_2'),
        answer: t('faq_financial_management_answer_2')
      },
      {
        question: t('faq_financial_management_question_3'),
        answer: t('faq_financial_management_answer_3')
      }
    ],
    'Market and Policy': [
      {
        question: t('faq_market_policy_question_1'),
        answer: t('faq_market_policy_answer_1')
      },
      {
        question: t('faq_market_policy_question_2'),
        answer: t('faq_market_policy_answer_2')
      },
      {
        question: t('faq_market_policy_question_3'),
        answer: t('faq_market_policy_answer_3')
      }
    ],
    'Technology and Innovation': [
      {
        question: t('faq_technology_innovation_question_1'),
        answer: t('faq_technology_innovation_answer_1')
      },
      {
        question: t('faq_technology_innovation_question_2'),
        answer: t('faq_technology_innovation_answer_2')
      },
      {
        question: t('faq_technology_innovation_question_3'),
        answer: t('faq_technology_innovation_answer_3')
      }
    ],
    'Other Common Concerns': [
      {
        question: t('faq_other_concerns_question_1'),
        answer: t('faq_other_concerns_answer_1')
      },
      {
        question: t('faq_other_concerns_question_2'),
        answer: t('faq_other_concerns_answer_2')
      },
      {
        question: t('faq_other_concerns_question_3'),
        answer: t('faq_other_concerns_answer_3')
      }
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

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Change language dynamically
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className='flex justify-between'>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('farmer_guide_title')}</h2>
        

        <div >
          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
        </div>
      </div>
      <p>{t('farmer_guide_desc')}</p>
      <VoiceToText onTranscript={handleTranscript} />
      <HandleVoiceSearch transcript={transcript} />

      {transcript && (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">{t('transcribed_text')}</h3>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {matchingFAQs.length > 0 && (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">{t('matching_faqs')}</h3>
          {matchingFAQs.map((item, index) => (
            <FAQ key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      )}

      {Object.entries(faqData).map(([sectionTitle, faqs]) => (
        <div key={sectionTitle} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t(sectionTitle)}</h3>
          {faqs.map((item, index) => (
            <FAQ key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default FarmerGuide;
