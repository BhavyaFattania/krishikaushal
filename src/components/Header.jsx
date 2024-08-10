import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header className="bg-background border-b border-green-600 rounded-full px-4 py-4 md:px-6 flex items-center justify-between">
                <Link to={"/"}>
                    <div className='flex items-center justify-between sm:justify-normal gap-2 text-green-600'>
                        <img className='w-16 sm:w-24 ' src="/logo.png" alt="" />
                        <span className="text-xl sm:text-2xl font-bold">Krishi Kaushal</span>
                    </div>
                </Link>
            </header>
        </>
    );
};

export default Header;
