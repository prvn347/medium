/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
yello: "#ffc017",
beige: "#F5F5DC"
      },
      fontFamily :{ 
        glory: ["pop","sans-serif"], 
        merat:["medium","mono"]
       
      } 
    },
  },
  plugins: [],
}