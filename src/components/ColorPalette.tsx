import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, onColorSelect }) => {
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color, height: "1rem"}}
          onClick={() => onColorSelect(color)}
        ></button>
      ))}
    </div>
  );
};

export default ColorPalette;
