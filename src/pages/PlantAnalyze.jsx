import React from 'react';
import { usePlantAnalyze } from '../hooks/usePlantAnalyze';
import { useTranslation } from 'react-i18next';
import { FiUpload } from 'react-icons/fi';
import GuideCard from '../components/GuideCard';

const PlantAnalyze = () => {
    const { t, i18n } = useTranslation();
    const {
        imagePreviewUrl,
        responseData,
        loading,
        error,
        handleFileChange,
        handleSubmit,
        setLanguage,
    } = usePlantAnalyze();

    const changeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        setLanguage(selectedLanguage); // Update language in hook
    };

    return (
        <>
            <div className='flex justify-between p-6'>
                <h1 className="text-2xl font-bold   mb-6 text-center text-gray-800">{t('title')}</h1>
                <p></p>
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
            <div className='flex justify-center m-2'>
                {error && <p className="text-red-500 mt-4 text-center">{t('error')}</p>}
                {loading && <p className="text-green-600 mt-4 text-center text-xl font-semibold ">{t('Analyzing Image...')}</p>
                }
                {responseData && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md shadow-inner text-start">
                        <h2 className="text-lg font-semibold mb-2 text-green-700">{t('result')}</h2>
                        <p><strong className="font-medium">{t('crop')}</strong> {responseData.crop}</p>
                        <p><strong className="font-medium">{t('disease')}</strong> {responseData.disease}</p>
                        <p><strong className="font-medium">{t('treatment')}</strong> {responseData.treatment}</p>
                    </div>
                )}
            </div>
            <div className='flex flex-col lg:flex-row m-4'>

                <div className="max-w-xl w-full mx-auto mt-10 p-6 border-2 border-green-600  rounded-lg shadow-md bg-white">

                    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
                        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer bg-gray-200 border border-gray-300 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300">
                            <FiUpload className="text-3xl text-gray-600 mb-2" />
                            <span className="text-gray-700">{t('upload_instruction')}</span>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        {imagePreviewUrl && (
                            <div className="mt-4 w-full h-64 bg-gray-200 rounded-md overflow-hidden">
                                <img
                                    src={imagePreviewUrl}
                                    alt="Selected"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} focus:outline-none`}
                            disabled={loading}
                        >
                            {loading ? t('analyzing') : t('submit_button')}
                        </button>
                    </form>
                </div>
                <GuideCard />

            </div>
        </>
    );
};

export default PlantAnalyze;
