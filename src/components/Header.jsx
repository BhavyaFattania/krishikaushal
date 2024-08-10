import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <>
      <header className="bg-background border-b border-green-600 rounded-full px-4 py-4 md:px-6 flex items-center justify-between">
          <div className='flex items-center gap-2 text-green-600'>
            <span className="text-xl sm:text-2xl font-bold">Krishi Kaushal</span>
          </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
        </div>

      </header>
    </>
  );
};

export default Header;
