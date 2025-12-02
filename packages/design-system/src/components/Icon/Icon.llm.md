# Icon Component - LLM Context

## Overview

The `Icon` component is a wrapper for SVG icons that provides consistent styling, sizing, and theming across the design system. It uses CSS custom properties for dynamic styling and integrates with the design system's color and spacing tokens.

## Component Location

- **Component**: `/packages/design-system/src/components/Icon/Icon.tsx`
- **Types**: `/packages/design-system/src/components/Icon/Icon.types.ts`
- **Styles**: `/packages/design-system/src/components/Icon/Icon.module.css`
- **Stories**: `/packages/design-system/src/components/Icon/Icon.stories.tsx`

## Basic Usage

```tsx
import { Icon } from "@doxy/design-system";
import { ChatIcon } from "@doxy/design-system/icons";

// Simple usage
<Icon svg={ChatIcon} />

// With color and size
<Icon svg={ChatIcon} color="primary" size={8} />

// With custom className
<Icon svg={ChatIcon} className="my-custom-class" />
```

## Props

### `svg` (React.ReactElement<SVGElement>)

- **Required**: No
- **Description**: The SVG element to render as the icon
- **Usage**: Import icon components from `@doxy/design-system/icons`
- **Example**: `svg={ChatIcon}`

### `color` (string)

- **Required**: No
- **Default**: Inherits current text color
- **Options**: `"primary"` | `"critical"` | `"neutral"` | `"white"` | `"black"`
- **Description**: Color variant that maps to design system tokens
- **Tokens**: Maps to `--dxy-color-{color}` CSS variables
- **Example**: `color="primary"`

### `size` (number)

- **Required**: No
- **Default**: 6 (spacing units)
- **Description**: Size in spacing units (multiplied by `--dxy-unit-base`)
- **Common values**: 4 (small), 6 (default), 8 (medium), 10 (large), 12 (extra large)
- **Example**: `size={8}`

### `className` (string)

- **Required**: No
- **Description**: Additional CSS classes for custom styling
- **Example**: `className="my-icon-wrapper"`

## Available Icons

The design system includes the following pre-built icons (located in `/packages/design-system/src/icons/`):

- `ChatIcon` - Chat/messaging
- `DotsIcon` - More options/menu
- `LayoutIcon` - Layout/grid
- `MeetingCameraIcon` - Video camera on
- `MeetingCameraOffIcon` - Video camera off
- `MicrophoneIcon` - Microphone on
- `MicrophoneOffIcon` - Microphone off/muted
- `PhoneOffIcon` - End call/hang up
- `ReportIcon` - Report/flag
- `SettingsIcon` - Settings/configuration

## Implementation Details

### How It Works

1. **Wrapper Container**: Creates a `div` with `display: inline-flex` for proper alignment
2. **CSS Custom Properties**: Uses `--_is` for size and `--_ic` for color
3. **Default Size**: 6 spacing units (calculated as `6 * var(--dxy-unit-base)`)
4. **Color Inheritance**: If no color prop is provided, inherits `currentColor` from parent
5. **SVG Rendering**: Directly renders the SVG element passed via the `svg` prop

### CSS Variables

```css
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--_is, 6) * var(--dxy-unit-base));
  height: calc(var(--_is, 6) * var(--dxy-unit-base));
  color: var(--_ic);
}
```

- `--_is`: Icon size (defaults to 6)
- `--_ic`: Icon color (maps to design system color token)
- `--dxy-unit-base`: Base spacing unit from design system
- `--dxy-color-{variant}`: Color tokens from design system

## Creating New Icons

Icons are exported as React elements (not components). Follow this pattern:

```tsx
export const MyNewIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
  >
    <title>My Icon</title>
    <path d="..." />
  </svg>
);
```

**Key requirements:**

- Use `stroke="currentColor"` to enable color theming
- Include a `<title>` for accessibility
- Use consistent `strokeWidth={1.5}` for visual consistency
- Export as a constant, not a function component
- Place in `/packages/design-system/src/icons/`

## Common Patterns

### Icon with Text

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <Icon svg={ChatIcon} size={6} color="primary" />
  <span>Messages</span>
</div>
```

### Icon Button

```tsx
<button>
  <Icon svg={SettingsIcon} size={6} color="neutral" />
</button>
```

### Conditional Icon Color

```tsx
<Icon svg={MicrophoneIcon} color={isMuted ? "critical" : "primary"} />
```

### Responsive Sizing

```tsx
<Icon svg={ChatIcon} size={isMobile ? 4 : 6} />
```

## Design System Integration

- **Spacing**: Uses `--dxy-unit-base` for consistent sizing
- **Colors**: Maps to `--dxy-color-*` tokens for theming
- **Accessibility**: SVG icons include `<title>` elements
- **Performance**: Icons are static React elements, not components

## Important Notes for LLMs

1. **Icon Format**: Icons are exported as JSX elements, NOT function components
2. **Import Path**: Import icons from the icons directory, not from the Icon component
3. **Color Prop**: Only use the predefined color variants; custom colors require className
4. **Size Units**: Size is in spacing units, not pixels (multiplied by base unit)
5. **Client Component**: The Icon component uses `"use client"` directive for Next.js
6. **SVG Props**: Icons use `stroke="currentColor"` to inherit color from the Icon wrapper

## Troubleshooting

**Icon not showing color:**

- Ensure the icon SVG uses `stroke="currentColor"` or `fill="currentColor"`
- Check that the color prop matches one of the valid variants

**Icon size not working:**

- Verify `--dxy-unit-base` is defined in your CSS
- Size is in spacing units, not pixels

**Icon not rendering:**

- Ensure you're passing the icon element itself, not the icon name as a string
- Import the icon from the correct path
