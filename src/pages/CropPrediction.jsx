import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CropPrediction = () => {
    const { t, i18n } = useTranslation();
    
    // Initialize state with default values for testing
    const [soilType, setSoilType] = useState('Loamy');
    const [climate, setClimate] = useState('Temperate');
    const [previousYield, setPreviousYield] = useState('2.5');
    
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);

        const data = {
            soilType,
            climate,
            previousYield
        };

        try {
            const URL = 'http://host1.thunderdevelops.in:25570/api/predictCrop';
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setPrediction(result);
        } catch (err) {
            setError('An error occurred while predicting the crop.');
        } finally {
            setLoading(false);
        }
    };

    const changeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <>
            <div className='flex justify-between p-6'>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{t('crop_prediction_title')}</h1>
                <div className="mt-4 text-center">
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

            <div className='flex flex-col lg:flex-row m-4'>
                <div className="max-w-xl w-full mx-auto mt-10 p-6 border-2 border-green-600 rounded-lg shadow-md bg-white">
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    {prediction && (
                        <div className="mt-8 bg-gray-100 p-4 rounded-md shadow-inner text-start">
                            <h2 className="text-lg font-semibold mb-2 text-green-700">{t('prediction_result')}</h2>
                            <p><strong className="font-medium">{t('recommended_crops')}</strong> {prediction.crops.join(', ')}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
                        <label className="text-gray-700 mb-2">{t('soil_type')}</label>
                        <input
                            type="text"
                            value={soilType}
                            onChange={(e) => setSoilType(e.target.value)}
                            className="mb-4 p-2 border rounded-lg"
                            placeholder={t('enter_soil_type')}
                        />

                        <label className="text-gray-700 mb-2">{t('climate_conditions')}</label>
                        <input
                            type="text"
                            value={climate}
                            onChange={(e) => setClimate(e.target.value)}
                            className="mb-4 p-2 border rounded-lg"
                            placeholder={t('enter_climate_conditions')}
                        />

                        <label className="text-gray-700 mb-2">{t('previous_yield')}</label>
                        <input
                            type="number"
                            value={previousYield}
                            onChange={(e) => setPreviousYield(e.target.value)}
                            className="mb-4 p-2 border rounded-lg"
                            placeholder={t('enter_previous_yield')}
                        />

                        <button
                            type="submit"
                            className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} focus:outline-none`}
                            disabled={loading}
                        >
                            {loading ? t('predicting') : t('submit_button')}
                        </button>
                    </form>
                    
                </div>
            </div>
        </>
    );
};

export default CropPrediction;
