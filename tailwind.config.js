/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/views/**/*.vue',
    './public/index.html',
    './node_modules/@material-tailwind/vue/components/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/vue/theme/components/**/*.{vue,js,ts,jsx,tsx}'
  ],
  safelist: [
    // 동적 클래스
    'text-[#17A1FA]',
    'text-[#B3B3B3]',
    'bg-[#FF7F00]',
    'text-white',
    'invisible',

    // 정적 클래스
    'bg-[#FFF9F2]',
    'bg-[#FAE8DA]',
    'bg-[#FFD9BB]',
    'bg-[#FF7F00]',
    'bg-white',
    'text-gray-800',
    'text-gray-700',
    'text-gray-600',
    'text-gray-500',
    'text-black',
    'text-white',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'min-h-screen',
    'flex',
    'items-center',
    'justify-center',
    'relative',
    'absolute',
    'fixed',
    'rounded-lg',
    'rounded-t-3xl',
    'w-[395px]',
    'min-w-[340px]',
    'max-w-[290px]',
    'h-8',
    'grid',
    'grid-cols-7',
    'gap-4',
    'mb-1',
    'mb-2',
    'mb-4',
    'pb-4',
    'px-6',
    'pt-20',
    'pb-24',
    'p-4',
    'no-underline',
    'font-bold',
    'font-medium',
    'rounded',
    'transition-colors',
    'duration-300',
    'hover:bg-[#f1cdb1]',
    'inner-shadow'
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        uhbeesehyun: ['UhBeeSe_hyun', 'sans-serif'],
        nanum: ['NanumSquareRound', 'sans-serif']
      },
      colors: {
        customBg: '#FFF9F2'
      },
      fontSize: {
        xxs: '0.625rem'
      }
    }
  },
  plugins: []
}
