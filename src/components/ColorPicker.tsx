import { useEffect, useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

interface ColorPickerState {
  colors: string[];
  currentColor: string;
  iconColor: string;
  isOpen: boolean;
}

export function ColorPicker({ onColorChange }: ColorPickerProps) {
  const initialState: ColorPickerState = {
    colors: ['slate', 'gray', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
    currentColor: 'black',
    iconColor: '',
    isOpen: false,
  };

  const [state, setState] = useState<ColorPickerState>(initialState);

  const selectColor = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      currentColor: color,
      iconColor: 'text-black',
      isOpen: false
    }));
    onColorChange(color);
  };

  useEffect(() => {
    onColorChange(state.currentColor);
  }, [state.currentColor, onColorChange]);

  return (
    <div className="bg-white mx-auto my-auto p-6">
      <div>
        <div className="flex flex-row relative">
          <div
            onClick={() => setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))}
            className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${state.currentColor}-p`}
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
                <div className='invisible bg-pink-p bg-orange-p bg-blue-p bg-red-p bg-rose-p bg-purple-p bg-violet-p bg-yellow-p bg-teal-p bg-cyan-p bg-fuchsia-p bg-sky-p bg-amber-p bg-stone-p bg-slate-p bg-gray-p bg-yellow-p bg-lime-p bg-emerald-p bg-green-p bg-indigo-p'></div>
                <div className="grid grid-cols-5 gap-2">
                  {state.colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => selectColor(color)}
                      className={`cursor-pointer w-8 h-8 rounded-full mx-1 my-1 bg-${color}-p`}
                    ></div>
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
