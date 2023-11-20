import React, { useState } from 'react';

interface ColorButtonProps {
    currentColor: string;
    iconColor: string;
    togglePalette: () => void;
  }
  

function ColorButton({ currentColor, iconColor }: ColorButtonProps) {
    let [isPaletteOpen, setIsPaletteOpen] = useState(false);

    let handleTogglePalette = () => {
        console.log("toggle palette")
        setIsPaletteOpen(!isPaletteOpen);
      };

  return (
    <div onClick={handleTogglePalette} className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex items-center justify-center hover:bg-indigo-500 border border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 bg-${currentColor}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mx-auto my-auto ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </div>
  );
}

export default ColorButton;
