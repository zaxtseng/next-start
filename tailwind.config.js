/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
	theme: {
		// 可以自定义字体
    fontFamily: {
      serif: 'DM Serif Display',
      body: 'Rubik',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
    },
		// 响应式布局
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1120px',
    },
    extend: {
			// 默认颜色
      colors: {
        page: '#FEF8F5',
        primary: '#402B2B',
        accent: {
          DEFAULT: '#EE4D47',
          hover: '#DA423D',
        },
        tint: '#FDEDE8',
        darkblue: '#0F264C',
      },
      dropShadow: {
        primary: '0 20px 40px rgba(238, 77, 71, 0.1)',
        secondary: '0px 30px 40px rgba(244, 125, 103, 0.2)',
        tertiary: '0 20px 40px rgba(32, 56, 100, 0.3);',
      },
			// 默认背景图
      backgroundImage: {
        hero: "url('/images/hero/scene.svg')",
        faq: "url('/images/faq/bg.svg')",
        footer: "url('/images/footer/bg.svg')",
      },
    },
  },
  plugins: [],
};
