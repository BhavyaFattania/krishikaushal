import React from 'react'
import { FaMapSigns } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { FaSunPlantWilt } from "react-icons/fa6";

import { Link } from 'react-router-dom'


const Home = () => {

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className="flex flex-col justify-center mx-auto mt-10 ">
                    <h2 className="text-center text-5xl font-bold mb-4 text-green-800">Beej se Fasal tak</h2>
                    <p className='text-center max-w-4xl'>Krishi Kaushal aims to bridge the gap between traditional farming practices and modern technology by providing farmers with essential knowledge, predictive tools, and disease management solutions to optimize crop yield and ensure sustainable farming practices.</p>
                </div>
                <div className="text-2xl font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 m-6">
                    <Link to={"/"}>
                        <div className="max-w-sm bg-white shadow-md rounded-lg p-6 border-2 border-green-600">
                            <FaMapSigns />
                            <p>Farmer Guide</p>
                        </div>
                    </Link>
                    <Link to={"/"}>
                        <div className="max-w-sm bg-white shadow-md rounded-lg p-6 border-2 border-green-600">
                            <FaSunPlantWilt />
                            <p>Plant Planner</p>
                        </div>
                    </Link>
                    <Link to={"/PlantAnalyze"}>
                        <div className="max-w-sm bg-white shadow-md rounded-lg p-6 border-2 border-green-600">
                            <MdSecurity />
                            <p>Plant Protector</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}


export default Home
