import React, { useState } from 'react'
import GradientBox from './GradientBox';

const GradientGenerator = () => {
    // State to hold the array of gradients
    const [gradients, setGradients] = useState(generateRandomGradients());
  
    // Function to generate 9 random gradients
    function generateRandomGradients() {
      const randomGradients = [];
      for (let i = 0; i < 16; i++) {
        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();
        const gradient = `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`;
        randomGradients.push(gradient);
      }
      return randomGradients;
    }
  
    // Function to generate a random color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    // Function to handle the "Regenerate" button click
    function handleRegenerate() {
      const newGradients = generateRandomGradients();
      setGradients(newGradients);
    }
  
    return (
        <div className='flex flex-col justify-center md:mx-20 mx-2'>
        <div className="grid-container grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-8 lg:mx-20 mt-10">
          {gradients.map((gradient, index) => (
            <GradientBox key={index} gradient={gradient} />
          ))}
        </div>
        <div className='flex justify-center mt-5 sticky bottom-0'>
        <button className='navbar-glass bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600 hover:bg-gradient-to-t hover:from-rose-700 hover:to-pink-600 text-white px-10 py-4 rounded-lg font-bold m-2 w-full md:w-auto drop-shadow-lg' onClick={handleRegenerate}>Regenerate</button>
        </div>
      </div>
    );
  };


export default GradientGenerator