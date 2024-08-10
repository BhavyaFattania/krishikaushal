import React from 'react';
import { FaMapSigns, FaSun, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SectionTitle = ({ children }) => (
  <motion.h2
    className="text-center text-4xl sm:text-5xl font-bold mb-4 text-green-100"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, type: 'spring', stiffness: 50 }}
    whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(34,139,34, 0.8)" }}
  >
    {children}
  </motion.h2>
);

const Card = ({ to, icon: Icon, title, description }) => (
  <Link to={to}>
    <motion.div
      className="max-w-sm bg-white shadow-md rounded-lg p-6 border-2 border-green-600 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl mb-4 text-green-600">
        <Icon />
      </div>
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  </Link>
);

const Home = () => {
  return (
    <div className='flex flex-col gap-6 p-4'>
      <div className="flex flex-col justify-center mx-auto mt-10">
        <SectionTitle>Beej se Fasal tak</SectionTitle>
        <p className='text-center max-w-4xl mx-auto text-green-200'>
          Krishi Kaushal aims to bridge the gap between traditional farming practices and modern technology by providing farmers with essential knowledge, predictive tools, and disease management solutions to optimize crop yield and ensure sustainable farming practices.
        </p>
      </div>
      <div className="text-2xl font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 m-6">
        <Card
          to="/FarmerGuide"
          icon={FaMapSigns}
          title="Farmer Guide"
          description="Get expert advice on various farming practices and techniques."
        />
        <Card
          to="/PlantPlanner"
          icon={FaSun} // Replaced with a known icon
          title="Plant Planner"
          description="Plan your crops effectively based on weather conditions and soil type."
        />
        <Card
          to="/PlantAnalyze"
          icon={FaSeedling} // Replaced with a known icon
          title="Plant Protector"
          description="Identify and treat plant diseases to maximize your yield."
        />
      </div>
    </div>
  );
};

export default Home;
