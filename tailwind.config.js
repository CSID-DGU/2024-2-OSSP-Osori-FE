/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 폰트 추가
      },
      colors: {
        customBg: '#FFF9F2',
      },
      // 사용자 정의 너비 추가
      width: {
        '30': '30rem', // w-30 클래스 정의
      },
    },
  },
  plugins: [],
}
