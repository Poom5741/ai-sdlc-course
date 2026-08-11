---
name: AI SDLC Interactive Docs
description: A clear path through complex terrain — learning AI-assisted software development
colors:
  ground: "#FAFAF9"
  ground-warm: "#F5F5F4"
  ground-cool: "#E7E5E4"
  text-primary: "#1C1917"
  text-secondary: "#57534E"
  text-muted: "#A8A29E"
  trail-green: "#059669"
  trail-green-light: "#D1FAE5"
  trail-amber: "#D97706"
  trail-amber-light: "#FEF3C7"
  trail-stone: "#78716C"
  trail-stone-light: "#E7E5E4"
  elevation-easy: "#059669"
  elevation-medium: "#D97706"
  elevation-hard: "#DC2626"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0px"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
---

# Design System: AI SDLC Interactive Docs

## Overview

**Creative North Star: "The Trail Map"**

A clear path through complex terrain. The design system embodies the journey of learning — where every module is a waypoint, every quest is a step forward, and the full progression is visible at a glance. Like a well-drawn topographic map, the interface reveals difficulty through elevation, progress through green markers, and warnings through amber highlights. The ground is warm and inviting, the typography is confident but never loud, and the path always leads somewhere.

**Key Characteristics:**
- Warm, off-white ground that feels like paper — approachable and readable
- Forest green for progress and completion — the color of moving forward
- Amber for warnings and highlights — attention without alarm
- Clear typographic hierarchy with DM Serif Display for headings and DM Sans for body
- Generous whitespace that lets content breathe
- Waypoint cards that show status at a glance

## Colors

The palette is built around a warm, natural ground with functional trail colors that guide the learner's journey.

### Ground
- **Warm Paper** (#FAFAF9): The primary background — warm, inviting, paper-like
- **Warm Surface** (#F5F5F4): Elevated surfaces, cards, sidebars
- **Cool Surface** (#E7E5E4): Borders, dividers, subtle separators

### Text
- **Stone Dark** (#1C1917): Primary text — high contrast on warm ground
- **Stone Medium** (#57534E): Secondary text — descriptions, supporting content
- **Stone Light** (#A8A29E): Muted text — labels, timestamps, placeholders

### Trail Colors
- **Trail Green** (#059669): Progress, completion, primary actions — the color of moving forward
- **Trail Green Light** (#D1FAE5): Completed state backgrounds, success indicators
- **Trail Amber** (#D97706): Warnings, highlights, active/in-progress states
- **Trail Amber Light** (#FEF3C7): Warning backgrounds, attention indicators
- **Trail Stone** (#78716C): Neutral indicators, locked states, disabled elements
- **Trail Stone Light** (#E7E5E4): Borders, dividers, subtle backgrounds

### Elevation (Difficulty)
- **Easy** (#059669): Green — accessible, beginner-friendly
- **Medium** (#D97706): Amber — requires focus, intermediate
- **Hard** (#DC2626): Red — challenging, advanced

## Typography

**Display Font:** DM Serif Display (with Georgia fallback)
**Body Font:** DM Sans (with system-ui fallback)
**Mono Font:** JetBrains Mono

**Character:** The pairing is confident but approachable — DM Serif Display brings editorial weight to headings without feeling heavy, while DM Sans provides clean readability for body content. The typography feels like a well-organized field guide: authoritative but never intimidating.

### Hierarchy
- **Display** (400 weight, clamp(2rem, 5vw, 3.5rem), 1.1 line-height): Hero headlines, module titles — appears at the start of major sections
- **Headline** (400 weight, clamp(1.5rem, 3vw, 2rem), 1.2 line-height): Section headings — appears within content to organize topics
- **Title** (500 weight, 1.25rem, 1.3 line-height): Subsection headings — appears within sections for smaller groupings
- **Body** (400 weight, 1rem, 1.7 line-height): Primary content — comfortable reading at 65ch max width
- **Label** (500 weight, 0.75rem, 1 line-height, 0.05em tracking): Badges, status indicators, metadata

## Layout

The layout follows a single-column model with optional sidebar navigation. Content is centered with generous margins, and the sidebar provides wayfinding without competing with the content.

- **Max Width**: Content is capped at 1100px and centered
- **Sidebar**: 256px fixed width, warm surface background
- **Grid**: Not used for page layout — the single-column model supports focused reading
- **Rhythm**: 4px base unit, generous section spacing (80px+)
- **Mobile**: Sidebar collapses to overlay, margins compress to 16px, typography scales down

## Elevation & Depth

Depth is achieved through subtle shadows and border treatments, not heavy drop shadows. Surfaces feel layered but not floating.

- **Cards**: Subtle box-shadow (0 4px 12px rgba(0, 0, 0, 0.05)) on hover, 1px border at rest
- **Sidebar**: Flat surface with border-right separator
- **Elevated Elements**: Slight shadow increase on hover for interactive feedback

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)`): Cards, containers at rest
- **Hover** (`box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08)`): Interactive elements on hover
- **Active** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1)`): Primary actions, focused elements

## Shapes

The form language is soft but confident — rounded corners that feel approachable without being playful.

- **Buttons**: 8px radius (md) — soft enough to feel friendly, sharp enough to feel purposeful
- **Cards**: 12px radius (lg) — larger containers get slightly more rounding
- **Inputs**: 8px radius (md) — consistent with buttons
- **Badges**: 9999px radius (full) — pill shape for status indicators
- **Border Width**: 1px standard, 4px for status indicators on cards

## Components

### Waypoint Cards
- **Character**: Clean containers with left-border status indicators
- **Corner Style**: 12px radius
- **Background**: White (#FFFFFF)
- **Border**: 1px trail-stone-light, with 4px colored left border for status
- **Status Colors**: Green (completed), Amber (in-progress), Stone (locked)
- **Hover**: Subtle lift (translateY(-2px)) with increased shadow

### Navigation Links
- **Character**: Simple text links with hover states
- **Default**: Trail-stone text on transparent background
- **Hover**: Trail-stone background with trail-stone-light
- **Active**: Trail-green-light background with trail-green text

### Badges
- **Character**: Pill-shaped status indicators
- **Style**: Colored background with matching text, subtle border
- **Variants**: Success (green), Note (blue), Caution (amber), Danger (red)

### Code Blocks
- **Character**: Warm, readable code containers
- **Background**: Warm Surface (#F5F5F4)
- **Border**: 1px trail-stone-light
- **Text**: Stone Dark (#1C1917) for readability
- **Inline Code**: Trail-green text on warm surface

## Do's and Don'ts

### Do:
- **Do** use Trail Green for progress and completion — it's the color of moving forward
- **Do** use warm, paper-like backgrounds — they feel approachable and readable
- **Do** use generous whitespace — let content breathe and guide the eye
- **Do** use clear typographic hierarchy — Display for heroes, Body for content
- **Do** use left-border indicators on cards — they show status at a glance

### Don't:
- **Don't** use dark backgrounds — this is a warm, light design system
- **Don't** use gray text on colored backgrounds — use white or darker shades of the background color
- **Don't** use heavy drop shadows — depth comes from subtle elevation changes
- **Don't** use decorative gradients — the palette is functional, not decorative
- **Don't** use uppercase for body text — it reduces readability
