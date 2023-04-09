/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        whiteText: '#FAF7F5', //화이트 톤
        btnBlack: '#4A4950', //검은색 버튼
        btnGrey: '#807E89', //회색 버튼
        btnMint: '#A3DCCD', //민트색 버튼
        brown1: '#F4EEEA',
        brown2: '#EBDED3',
        brown3: '#E7D4C6',
        brown4: '#D2C5BE',
        brown5: '#C6B3AA',
        brown6: '#B79F93',
        lightgrey: '#D6D3CD',
        grey: '#626069',
        black: '#4A4950',

        primary: '#E7D4D6', //브라운
        secondary: '#A3DCCD', //민트
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        edu: ['GangwonEduAll'],
      },
      fontSize: {
        // headings
        h1: ['32px', { fontWeight: '900' }],
        h2: ['26px', { fontWeight: '900' }],
        h3: ['20px', { fontWeight: '900' }],
        h4: ['16px', { fontWeight: '900' }],
        h5: ['10px', { fontWeight: '900' }],
        // UI text
        main: ['16px', { fontWeight: '400' }],
        'main-bold': ['16px', { fontWeight: '500' }],
        sub: ['14px', { fontWeight: '400' }],
        'sub-bold': ['14px', { fontWeight: '500' }],
        tiny: ['12px', { fontWeight: '400' }],
        'tiny-bold': ['12px', { fontWeight: '500' }],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        0: '0px',
        1: '1px',
      },
    },
  },
  plugins: [],
};
