import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <div
        className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-800 hover:text-green-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <FaChevronUp className="text-green-700" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </div>
      {isOpen && (
        <p className="mt-2 text-gray-600 transition-transform transform-gpu">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQ;
