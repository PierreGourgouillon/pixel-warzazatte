/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray-p': '#808080',
        'red-p': '#ea3323',
        'orange-p': '#f2a93b',
        'yellow-p': '#ffff54',
        'lime-p': '#75fb4c',
        'green-p': '#377e22',
        'teal-p': '#377e7f',
        'cyan-p': '#75fbfd',
        'blue-p': '#0000f5',
        'indigo-p': '#44087d',
        'violet-p': '#e087e8',
        'purple-p': '#75147c',
        'fuchsia-p': '#ea33f7',
        'pink-p': '#f5c2cb',
        "black-p": "#000000",
      },
    },
  },
  plugins: [],
}

