---
name: BlueBeltDojo
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c6d4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b919d'
  outline-variant: '#414752'
  surface-tint: '#a7c8ff'
  primary: '#a7c8ff'
  on-primary: '#003060'
  primary-container: '#1a6cc4'
  on-primary-container: '#e8eeff'
  inverse-primary: '#005eb2'
  secondary: '#a5c8ff'
  on-secondary: '#00315e'
  secondary-container: '#3792f7'
  on-secondary-container: '#002a52'
  tertiary: '#d2bbff'
  on-tertiary: '#3f008e'
  tertiary-container: '#8141f3'
  on-tertiary-container: '#f4eaff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3b'
  on-primary-fixed-variant: '#004788'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a5c8ff'
  on-secondary-fixed: '#001c3a'
  on-secondary-fixed-variant: '#004785'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: -2.5px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 52px
    letterSpacing: -1.5px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '900'
    lineHeight: 36px
    letterSpacing: -1px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.5px
  body-base:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 1px
spacing:
  unit: 4px
  container_max: 1100px
  gutter: 24px
  margin_mobile: 16px
  section_gap: 80px
---

## Brand & Style
The design system embodies the "Dark Dojo" aesthetic—a raw, high-intensity environment for mastering AI-assisted development. The personality is disciplined, underground, and focused, eschewing typical SaaS polish for a grit-driven, "mats-and-sweat" energy. 

The visual style is a hybrid of **Brutalism** and **Modern Dark Mode**, characterized by heavy borders, deep charcoal layers, and high-energy electric accents. It avoids soft gradients in favor of flat, high-contrast surfaces and tactile textures like noise and grain to mimic the feel of worn canvas and tatami mats. The interface should feel like a specialized tool used in a high-stakes training facility.

## Colors
The palette is dominated by deep, low-luminance neutrals to create an "after-hours" training atmosphere. 

- **Dojo Black (#0A0A0A)**: The base environment. 
- **Mat Charcoal (#111111)**: Used for elevated surfaces to distinguish interactive areas from the floor.
- **Canvas Dark (#1C1C1C)**: The structural skeleton, used for high-contrast borders and dividers.
- **Belt Blue & Electric Blue**: These are your primary functional colors. Belt Blue represents the brand and status, while Electric Blue is reserved for interactive states and primary calls to action.
- **Purple Belt**: Reserved exclusively for advanced curriculum or premium tier indicators.
- **White Belt**: Used for high-readiness typography and beginner-level content.
- **Tap Out Green**: Functional color for successful code execution or lesson completion.

Use a subtle noise overlay (3-5% opacity) across all backgrounds to break digital flatness.

## Typography
Typography is a critical expression of the dojo’s discipline. 

**Headlines** utilize **Space Grotesk** at its maximum weight (900). Tracking must be tight to create a "blocky," impactful visual presence. Use `headline-xl` sparingly for hero sections.

**Body copy** uses **Inter** for high legibility against dark backgrounds. The default text color is `text_secondary`, only switching to `text_primary` (White Belt) for emphasized points or active reading states.

**Technical content** and labels use **JetBrains Mono**. Code blocks should be styled with a `Belt Blue` (#1A6CC4) primary text color on a deeper #0A1628 background to ensure the "blue" brand identity persists even within the terminal.

## Layout & Spacing
The layout follows a strict **Single Column** model for focus, reflecting the linear progression of martial arts training. 

- **Max Width**: Content is capped at 1100px and centered.
- **Grid**: Use a 12-column layout locally within cards, but maintain the primary single-column flow for the page.
- **Rhythm**: Use a 4px base unit. Section spacing should be generous (80px+) to allow the "Dark Dojo" atmosphere to breathe.
- **Mobile**: Margins compress to 16px. Typography scales aggressively to ensure the "Heavy" aesthetic remains legible on small screens.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** rather than shadows. 

- **Level 0 (Floor)**: #0A0A0A.
- **Level 1 (Mats)**: #111111 surfaces with a 1px border of #1C1C1C.
- **Level 2 (Active/Floating)**: #1C1C1C surfaces.

Avoid standard drop shadows. Instead, use "Glows" for high-importance elements. A 10px-20px `Electric Blue` blur should be applied *behind* primary buttons or active belt icons to simulate an neon-underground energy. Use a faint tatami-style grid (1px lines at 5% opacity) on the Level 0 background to anchor the layout.

## Shapes
The shape language is **Sharp (0px)**. All containers, buttons, and input fields must have square corners. This reinforces the "raw" and "unrefined" gym aesthetic. Do not use border-radius for any UI component, including buttons or avatars.

## Components
- **Buttons**: Square corners, heavy padding (16px 32px). Primary buttons use `Electric Blue` backgrounds with black text. On hover, apply a 15px `Electric Blue` outer glow.
- **Cards**: Mat Charcoal (#111111) background with a 1px Canvas Dark (#1C1C1C) border. For cards describing "pain points" or "challenges," add a 4px solid red (#EF4444) left-border.
- **Input Fields**: Sharp corners, #0A0A0A background, 1px #1C1C1C border. On focus, the border changes to `Belt Blue`.
- **Chips/Badges**: Use `label-caps` typography. Badges should look like belt segments—small rectangular blocks of color (Blue, Purple, White) with high-contrast text.
- **Lists**: Use 1px #1C1C1C bottom borders for list items. Use the "Electric Blue" for bullet points or chevron indicators to maintain the high-contrast energy.
- **Progress Bars**: Simple, flat bars. Background is #1C1C1C, fill is `Electric Blue`. No rounded caps.