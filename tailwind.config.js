/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 폰트 추가
        uhbeesehyun: ['UhBeeSe_hyun', 'sans-serif'] // UhBeeSe_hyun 폰트 추가
      },
      colors: {
        customBg: '#FFF9F2'
      }
    }
  },
  plugins: []
}
