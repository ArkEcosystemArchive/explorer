/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.

*/

module.exports = {
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },

    backgroundColor: theme => theme('colors'),

    borderColor: theme => ({
      default: theme('colors.theme-border'),
      ...theme('colors'),
    }),

    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '.25rem',
      md: '.3125rem', // 5px
      lg: '.5rem', // 8px
      full: '9999px',
    },

    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '8': '8px',
    },

    boxShadow: {
      default: '0 1px 9px rgba(203,208,228,0.19)',
      md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      none: 'none',
      theme: 'var(--theme-shadow)',
      button: '0 5px 15px rgba(9, 100, 228, 0.34)',
    },

    colors: {
      // START CUSTOM ADDED
      transparent: 'transparent',
      'table-row': 'var(--color-theme-table-row)',
      'theme-page-background': 'var(--color-theme-page-background-primary)',
      'theme-content-background': 'var(--color-theme-content-background-primary)',
      'theme-feature-background': 'var(--color-theme-feature-background)',
      'theme-text-primary': 'var(--color-theme-text-primary)',
      'theme-text-secondary': 'var(--color-theme-text-secondary)',
      'theme-text-content': 'var(--color-theme-text-content)',
      'theme-border': 'var(--theme-border)',
      'theme-border-secondary': 'var(--theme-border-secondary)',
      'theme-nav-background': 'var(--nav-background)',
      'theme-nav-border': 'var(--nav-border)',
      'stat-background': 'var(--stat-background)',
      'theme-text-tertiary': 'var(--theme-text-tertiary)',
      'chart-active': 'var(--chart-active)',
      'chart-inactive': 'var(--chart-inactive)',
      'theme-button': 'var(--theme-button)',
      'theme-button-text': 'var(--theme-button-text)',
      'language-icon': 'var(--language-icon)',

      'theme-text-thead': 'var(--color-theme-text-thead)',
      // END CUSTOM ADDED

      black: '#172130',

      'grey-darkest': '#395174', // UPDATED
      'grey-darker': '#606f7b',
      'grey-dark': '#373b4a', // UPDATED
      grey: '#838A9B', // UPDATED
      'grey-light': '#f1f3fc', // UPDATED
      'grey-lighter': '#e3e6f2', // UPDATED
      'grey-lightest': '#fafbfe', // UPDATED
      white: '#ffffff',

      'red-darkest': '#3b0d0c',
      'red-darker': '#621b18',
      'red-dark': '#cc1f1a',
      red: '#EF192D', // UPDATED
      'red-light': '#ef5753',
      'red-lighter': '#f9acaa',
      'red-lightest': '#fcebea',

      'orange-darkest': '#462a16',
      'orange-darker': '#613b1f',
      'orange-dark': '#de751f',
      orange: '#f6993f',
      'orange-light': '#faad63',
      'orange-lighter': '#fcd9b6',
      'orange-lightest': '#fff5eb',

      'yellow-darkest': '#453411',
      'yellow-darker': '#684f1d',
      'yellow-dark': '#f2d024',
      yellow: '#ffed4a',
      'yellow-light': '#fff382',
      'yellow-lighter': '#fff9c2',
      'yellow-lightest': '#fcfbeb',

      'green-darkest': '#0f2f21',
      'green-darker': '#1a4731',
      'green-dark': '#1f9d55',
      green: '#46b02e', // UPDATED
      'green-light': '#51d88a',
      'green-lighter': '#a2f5bf',
      'green-lightest': '#e3fcec',

      'teal-darkest': '#0d3331',
      'teal-darker': '#20504f',
      'teal-dark': '#38a89d',
      teal: '#4dc0b5',
      'teal-light': '#64d5ca',
      'teal-lighter': '#a0f0ed',
      'teal-lightest': '#e8fffe',

      'blue-darkest': '#202126', // UPDATED
      'blue-darker': '#282a38', // UPDATED
      'blue-dark': '#2779bd',
      blue: '#037CFF', // UPDATED
      'blue-light': '#6f77a4', // UPDATED
      'blue-lighter': '#e8eeff', // UPDATED
      'blue-lightest': '#e0f0fd', // UPDATED

      'indigo-darkest': '#191e38',
      'indigo-darker': '#2f365f',
      'indigo-dark': '#5661b3',
      indigo: '#6574cd',
      'indigo-light': '#7886d7',
      'indigo-lighter': '#b2b7ff',
      'indigo-lightest': '#e6e8ff',

      'purple-darkest': '#21183c',
      'purple-darker': '#382b5f',
      'purple-dark': '#794acf',
      purple: '#9561e2',
      'purple-light': '#a779e9',
      'purple-lighter': '#d6bbfc',
      'purple-lightest': '#f3ebff',

      'pink-darkest': '#451225',
      'pink-darker': '#6f213f',
      'pink-dark': '#eb5286',
      pink: '#f66d9b',
      'pink-light': '#fa7ea8',
      'pink-lighter': '#ffbbca',
      'pink-lightest': '#ffebef',
    },

    fill: {
      current: 'currentColor',
    },

    fontFamily: {
      sans: [
        'Proxima Nova Regular',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: [
        'Constantia',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },

    fontSize: {
      '2xs': '.8125rem', // 13px
      xs: '.875rem', // 14px
      sm: '0.9375rem', // 15px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },

    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    height: {
      auto: 'auto',
      px: '1px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '48': '12rem',
      '64': '16rem',
      '50px': '50px',
      '80px': '80px',
      full: '100%',
      screen: '100vh',
    },

    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.05em',
    },

    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      loose: 2,
    },

    margin: {
      auto: 'auto',
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem', // 16px
      '5': '1.25rem', // 20px
      '6': '1.5625rem', // 25px
      '8': '1.875rem', // 30px
      '9': '2.5rem', // 40px
      '10': '3.125rem', // 50px
      '-px': '-1px',
      '-1': '-0.25rem',
      '-2': '-0.5rem',
      '-3': '-0.75rem',
      '-4': '-1rem', // 16px
      '-5': '-1.25rem', // 20px
      '-6': '-1.5625rem', // 25px
      '-8': '-1.875rem', // 30px
      '-9': '-2.5rem', // 40px
      '-10': '-3.125rem', // 50px
    },

    maxHeight: {
      full: '100%',
      screen: '100vh',
    },

    maxWidth: {
      xs: '20rem',
      sm: '30rem',
      md: '40rem',
      lg: '50rem',
      xl: '60rem',
      '2xl': '75rem', // UPDATED
      '3xl': '80rem',
      '4xl': '90rem',
      '5xl': '100rem',
      '25px': '25px',
      '38px': '38px',
      '480px': '480px',
      full: '100%',
    },

    minHeight: {
      '0': '0',
      '50px': '50px',
      '80px': '80px',
      full: '100%',
      screen: '100vh',
    },

    minWidth: {
      '0': '0',
      full: '100%',
    },

    padding: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem', // 12px
      '4': '1rem', // 16px
      '5': '1.25rem', // 20px
      '6': '1.5625rem', // 25px
      '8': '1.875rem', // 30px
      '9': '2.5rem', // 40px
      '10': '3.125rem', // 50px
    },

    stroke: {
      current: 'currentColor',
    },

    textColor: theme => theme('colors'),

    width: {
      auto: 'auto',
      px: '1px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '64': '16rem',
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '5/6': '83.33333%',
      '25px': '25px',
      '38px': '38px',
      '50px': '50px',
      '80px': '80px',
      full: '100%',
      screen: '100vw',
    },

    zIndex: {
      auto: 'auto',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
    },
  },

  variants: {
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderColor: ['responsive', 'hover'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxShadow: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    fill: [],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSmoothing: ['responsive', 'hover'],
    fontStyle: ['responsive', 'hover'],
    fontWeight: ['responsive', 'hover'],
    height: ['responsive'],
    inset: ['responsive'],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    stroke: [],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover'],
    textDecoration: ['responsive', 'hover'],
    textSize: ['responsive'],
    textTransform: ['responsive', 'hover'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive'],
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
}
