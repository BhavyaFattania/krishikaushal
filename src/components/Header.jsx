import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <>
      <header className="bg-background border-b border-red-600 rounded-full px-4 py-4 md:px-6 flex items-center justify-between">
        <Link to="/">
          <div className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent  animate-gradient-animate'>
            <span className="text-xl sm:text-2xl font-bold">Krishi Kaushal</span>
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row items-center gap-4">
        </div>

      </header>
    </>
  );
};

export default Header;
