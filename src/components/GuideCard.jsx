import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideCard = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border-2 border-green-600  rounded-lg shadow-md bg-green-50">
      <h2 className="text-xl font-bold mb-4 text-green-800">{t('guide_title')}</h2>
      <ul className="list-disc list-inside text-justify">
        <li className="mb-2">
          <strong>{t('step1_title')}:</strong> {t('step1_text')}
        </li>
        <li className="mb-2">
          <strong>{t('step2_title')}:</strong> {t('step2_text')}
        </li>
        <li className="mb-2">
          <strong>{t('step3_title')}:</strong> {t('step3_text')}
        </li>
        <li className="mb-2">
          <strong>{t('step4_title')}:</strong> {t('step4_text')}
        </li>
      </ul>
    </div>
  );
};

export default GuideCard;
