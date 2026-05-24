import React from 'react';
import profileImg from "../assets/react.svg";

// Font Awesome components এবং icons ইমপোর্ট করুন
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Card = () => {
  return (
    <div className="container mx-auto max-w-sm bg-amber-200 shadow-2xl shadow-black rounded-2xl m-5 p-8 flex flex-col items-center">
      <h1 className="text-3xl text-red-700 font-bold mb-2">Card</h1>
      <p className="text-center font-bold text-2xl text-green-700 underline mb-6">Didar Hossain</p>
      
      <img 
        className="object-cover rounded-full border-4 border-white shadow-lg mb-6" 
        src={profileImg} 
        alt="Didar Hossain" 
        style={{ width: '120px', height: '120px' }} 
      />

      {/* Main Action Button with Icon */}
      <button className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300 mb-6 flex items-center justify-center gap-2">
        <FontAwesomeIcon icon={faUserPlus} /> Follow Me
      </button>

      {/* Social Media Icons Row */}
      <div className="flex space-x-6">
        <a href="#" className="text-blue-600 text-3xl hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className="text-blue-400 text-3xl hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="text-pink-600 text-3xl hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" className="text-blue-800 text-3xl hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
};

export default Card;