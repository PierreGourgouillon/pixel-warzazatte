import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  variants: number[];
  selectColor: (color: string, variant: number) => void;
  isOpen: boolean;
}

function ColorPalette({ colors, variants, selectColor, isOpen }: ColorPaletteProps) {
  return (
    <div className={`border ${isOpen ? '' : 'hidden'} border-gray-300 origin-top-right absolute right-0 top-full mt-2 rounded-md shadow-lg`}>
      <div className="rounded-md bg-white shadow-xs p-2">
        <div className="flex">
          {colors.map((color) => (
            <div key={color}>
              {variants.map((variant) => (
                <div
                  key={`${color}-${variant}`}
                  onClick={() => {
                    selectColor(color, variant);
                  }}
                  className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 bg-${color}-${variant}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPalette;

//https://tailwindcomponents.com/component/color-picker