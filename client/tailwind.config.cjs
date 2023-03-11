/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Cabin:['Cabin' , 'sans-serif'],
      },
      screens:{
       mobile: '490px',
       mobile_skeleton:'550px',
      },
   
      backgroundImage:{
         gradinet:['linear-gradient(to right, #6a11cb 0%, #2575fc 100%)'],
         Support_texture: ['linear-gradient(41deg, rgba(103,79,176,1) 23%, rgba(67,203,228,1) 100%)']
      },
    },
  },
  plugins: [],
}