/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ground (backgrounds)
        'ground': '#FAFAF9',
        'ground-warm': '#F5F5F4',
        'ground-cool': '#E7E5E4',

        // Text
        'text-primary': '#1C1917',
        'text-secondary': '#57534E',
        'text-muted': '#A8A29E',

        // Trail colors
        'trail-green': '#059669',
        'trail-green-light': '#D1FAE5',
        'trail-amber': '#D97706',
        'trail-amber-light': '#FEF3C7',
        'trail-stone': '#78716C',
        'trail-stone-light': '#E7E5E4',

        // Elevation (difficulty)
        'elevation-easy': '#059669',
        'elevation-medium': '#D97706',
        'elevation-hard': '#DC2626',

        // Semantic aliases for backward compatibility
        'surface': '#FAFAF9',
        'on-surface': '#1C1917',
        'primary': '#059669',
        'secondary': '#D97706',
        'error': '#DC2626',
      },
      fontFamily: {
        'display': ['"DM Serif Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        // Legacy aliases
        'headline-xl': ['"DM Serif Display"', 'Georgia', 'serif'],
        'headline-lg': ['"DM Serif Display"', 'Georgia', 'serif'],
        'headline-md': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'body-base': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'body-sm': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'code-block': ['"JetBrains Mono"', 'monospace'],
        'label-caps': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-lg': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-md': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0px', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0px', fontWeight: '400' }],
        'code-block': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0px', fontWeight: '400' }],
        'label-caps': ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        'gutter': '24px',
        'unit': '4px',
        'section-gap': '80px',
      },
      maxWidth: {
        'container': '1100px',
        'prose': '65ch',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
