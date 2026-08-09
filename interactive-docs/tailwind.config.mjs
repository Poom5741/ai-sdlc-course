/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dojo surface system
        'surface': '#131313',
        'surface-dim': '#131313',
        'surface-bright': '#3a3939',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c1c6d4',
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',

        // Dojo outline system
        'outline': '#8b919d',
        'outline-variant': '#414752',

        // Primary - Belt Blue
        'primary': '#a7c8ff',
        'on-primary': '#003060',
        'primary-container': '#1a6cc4',
        'on-primary-container': '#e8eeff',
        'inverse-primary': '#005eb2',
        'surface-tint': '#a7c8ff',

        // Secondary
        'secondary': '#a5c8ff',
        'on-secondary': '#00315e',
        'secondary-container': '#3792f7',
        'on-secondary-container': '#002a52',

        // Tertiary - Purple Belt
        'tertiary': '#d2bbff',
        'on-tertiary': '#3f008e',
        'tertiary-container': '#8141f3',
        'on-tertiary-container': '#f4eaff',

        // Error
        'error': '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',

        // Semantic aliases
        'wabi-ink': '#2C2C2C',
        'wabi-paper': '#F5F5F5',
        'wabi-accent': '#1a6cc4',
        'belt-blue': '#1a6cc4',
        'electric-blue': '#3792f7',
        'purple-belt': '#8141f3',
        'white-belt': '#e5e2e1',
        'tap-out-green': '#22c55e',
      },
      fontFamily: {
        'headline-xl': ['Space Grotesk'],
        'headline-lg': ['Space Grotesk'],
        'headline-lg-mobile': ['Space Grotesk'],
        'headline-md': ['Space Grotesk'],
        'body-base': ['Inter'],
        'body-sm': ['Inter'],
        'code-block': ['JetBrains Mono'],
        'label-caps': ['Space Grotesk'],
        'serif': ['Noto Serif JP', 'serif'],
      },
      fontSize: {
        'headline-xl': ['72px', { lineHeight: '72px', letterSpacing: '-2.5px', fontWeight: '900' }],
        'headline-lg': ['48px', { lineHeight: '52px', letterSpacing: '-1.5px', fontWeight: '900' }],
        'headline-lg-mobile': ['32px', { lineHeight: '36px', letterSpacing: '-1px', fontWeight: '900' }],
        'headline-md': ['24px', { lineHeight: '28px', letterSpacing: '-0.5px', fontWeight: '800' }],
        'body-base': ['15px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' }],
        'code-block': ['14px', { lineHeight: '22px', letterSpacing: '0px', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '1px', fontWeight: '700' }],
      },
      spacing: {
        'gutter': '24px',
        'unit': '4px',
        'section-gap': '80px',
      },
      maxWidth: {
        'container': '1100px',
      },
      borderRadius: {
        'DEFAULT': '0px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
