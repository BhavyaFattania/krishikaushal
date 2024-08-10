import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="border-t border-green-600 rounded-full px-4 py-4 md:px-6 mt-[7.8rem] flex items-center justify-center">
            <div className='flex justify-center items-center gap-2 text-green-50'>
            © 2024 <Link to={"/"}><span className="font-semi">Krishi Kaushal.</span> presenting to DA-IICT Hackout'24</Link>
            </div>
        </footer>
    )
}

export default Footer