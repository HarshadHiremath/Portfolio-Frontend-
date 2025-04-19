import React, { useState, useEffect } from 'react';
import profileImage from '../../assets/Animation.gif';
import './index.css';

const SplashScreen = ({ onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(false);
  
  const textLines = [
    'Harshad Hiremath',
    'Full Stack Developer',
    'Building Digital Experiences'
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setFade(true);
      
      setTimeout(() => {
        setCurrentTextIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= textLines.length) {
            clearInterval(textInterval);
            onComplete();
            return prev;
          }
          setFade(false);
          return nextIndex;
        });
      }, 100); // Fade out duration
    }, 1000); // Time each text is visible

    return () => clearInterval(textInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-8">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        
        <h1 className={`text-3xl font-medium text-white transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
          {textLines[currentTextIndex]}
        </h1>
        
        <div className="w-24 h-1 bg-blue-500 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default SplashScreen;