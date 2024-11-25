/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/views/**/*.vue',
    './public/index.html', // HTML 파일
    './node_modules/@material-tailwind/vue/components/**/*.{vue,js,ts,jsx,tsx}', // Material Tailwind Vue용 경로
    './node_modules/@material-tailwind/vue/theme/components/**/*.{vue,js,ts,jsx,tsx}' // Material Tailwind Vue 테마 경로
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 폰트 추가
        uhbeesehyun: ['UhBeeSe_hyun', 'sans-serif'], // UhBeeSe_hyun 폰트 추가
        nanum: ['NanumSquareRound', 'sans-serif'] // 나눔스퀘어라운드 폰트 추가
      },
      colors: {
        customBg: '#FFF9F2'
      },
      fontSize: {
        xxs: '0.625rem' // 10px
      }
    }
  },
  plugins: []
}
