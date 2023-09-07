import React, { useState } from 'react'
import GradientBox from './GradientBox';
import { FiCopy, FiDownload, FiCheck } from 'react-icons/fi';

const GradientGenerator = () => {
    // State to hold the array of gradients
    const [gradients, setGradients] = useState(generateRandomGradients());
    const [copyClicked, setCopyClicked] = useState(false);
    const [downloadClicked, setDownloadClicked] = useState(false);

  
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

      // Function to copy CSS code to clipboard
  // function copyCssCode(gradient) {
  //   navigator.clipboard.writeText(gradient);
  //   alert('CSS code copied to clipboard: ' + gradient);
  // }

  function copyCssCode(gradient) {
    navigator.clipboard.writeText(gradient);
    setCopyClicked(true);
    setTimeout(() => {
      setCopyClicked(false);
    }, 3000);
  }

  // Function to download a PNG file with the gradient
  function downloadPng(gradientIndex) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; // Adjust the canvas dimensions as needed
    canvas.height = 675;


    const context = canvas.getContext('2d');
    const gradient = gradients[gradientIndex];

    // Extract color values from the gradient string using a regular expression
    const colorValues = gradient.match(/#[0-9A-Fa-f]{6}/g);

    if (colorValues && colorValues.length === 2) {
      // Create a gradient on the canvas
      const gradientFill = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientFill.addColorStop(0, colorValues[0]);
      gradientFill.addColorStop(1, colorValues[1]);

      context.fillStyle = gradientFill;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Convert the canvas to a data URL as a PNG image
      const pngDataUrl = canvas.toDataURL('image/png', 1.0);

      // Create a temporary <a> element for downloading
      const link = document.createElement('a');
      link.href = pngDataUrl;
      link.download = `gradient_${gradientIndex}.png`;
      link.click();
    } else {
      alert('Error: Unable to extract gradient colors.');
    }
    setDownloadClicked(true);
    setTimeout(() => {
    setDownloadClicked(false);
    }, 3000);
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
            <div key={index} className="relative">
            <GradientBox gradient={gradient} />
            <div className="absolute inset-0 bottom-2 flex items-end justify-end">
            <button
              className='bg-black bg-opacity-40 text-white p-2 rounded-xl font-bold mr-2 transition-all duration-300 ease-in'
              onClick={() => copyCssCode(gradient)}
            >
              {copyClicked ? <FiCheck /> : <FiCopy />}
            </button>
            <button
              className='bg-black bg-opacity-40 text-white p-2 rounded-xl font-bold mr-2 transition-all duration-300 ease-in'
              onClick={() => downloadPng(index)}
            >
              {downloadClicked ? <FiCheck /> : <FiDownload />}
            </button>
            </div>
          </div>
          ))}
        </div>
        <div className='flex justify-center mt-5 sticky bottom-0'>
        <button className='navbar-glass bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600 hover:bg-gradient-to-t hover:from-rose-700 hover:to-pink-600 text-white px-10 py-4 rounded-lg font-bold m-2 w-full md:w-auto drop-shadow-lg' onClick={handleRegenerate}>Regenerate</button>
        </div>
      </div>
    );
  };


export default GradientGenerator