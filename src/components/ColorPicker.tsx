import React, { useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

interface ColorPickerState {
  colors: string[];
  variants: number[];
  currentColor: string;
  iconColor: string;
  isOpen: boolean;
}

export function ColorPicker({ onColorChange }: ColorPickerProps) {
  const initialState: ColorPickerState = {
    colors: ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'],
    variants: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    currentColor: '',
    iconColor: '',
    isOpen: false,
  };

  const [state, setState] = React.useState<ColorPickerState>(initialState);

  const initColor = () => {
    setState((prevState) => ({
      ...prevState,
      currentColor: 'red-800',
    }));
    setIconWhite();
    onColorChange('red-800'); // Appel de la fonction de rappel lors de l'initialisation
  };

  const setIconWhite = () => {
    setState((prevState) => ({
      ...prevState,
      iconColor: 'text-white',
    }));
  };

  const setIconBlack = () => {
    setState((prevState) => ({
      ...prevState,
      iconColor: 'text-black',
    }));
  };

  const selectColor = (color: string, variant: number) => {
    setState((prevState) => ({
      ...prevState,
      currentColor: `${color}-${variant}`,
      iconColor: variant < 500 ? 'text-black' : 'text-white',
    }));
    onColorChange(`${color}-${variant}`); // Appel de la fonction de rappel lors de la sélection de la couleur
  };

  React.useEffect(() => {
    // Appel de la fonction de rappel lors de chaque mise à jour de l'état
    onColorChange(state.currentColor);
  }, [state.currentColor, onColorChange]);
  return (
    <div className="bg-white mx-auto my-auto p-6">
      <div>
        <div className="flex flex-row relative">
          <input
            id="color-picker"
            className="border border-gray-400 p-2 rounded-lg"
            value={state.currentColor}
            onChange={(e) => setState((prevState) => ({ ...prevState, currentColor: e.target.value }))}
          />
          <div
            onClick={() => setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))}
            className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${state.currentColor}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 mx-auto my-auto ${state.iconColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          </div>
          {state.isOpen && (
            <div
              className="border border-gray-300 origin-top-right absolute right-0 top-full mt-2 rounded-md shadow-lg"
            >
              <div className="rounded-md bg-white shadow-xs p-2">
                <div className="flex">
                  {state.colors.map((color) => (
                    <div key={color}>
                      {state.variants.map((variant) => (
                        <div
                          key={`${color}-${variant}`}
                          onClick={() => selectColor(color, variant)}
                          className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 bg-${color}-${variant}`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
