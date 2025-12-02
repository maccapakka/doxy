# Button Component

## Overview
A versatile button component with multiple variants, states, and full accessibility support. Built with CSS modules for scoped styling and designed for use across the Doxy application ecosystem.

## Props

### ButtonProps Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Button content (text, icons, or other elements) |
| `appName` | `string` | Yes | - | Application name used in default alert message |
| `className` | `string` | No | - | Additional CSS classes for custom styling |
| `variant` | `"primary" \| "secondary"` | No | `"primary"` | Visual style variant |
| `disabled` | `boolean` | No | `false` | Disables button interaction |
| `onClick` | `() => void` | No | - | Custom click handler (overrides default alert) |

## Usage Examples

### Basic Usage
```tsx
import { Button } from "@doxy/design-system/button";

function MyComponent() {
  return (
    <Button appName="web">
      Click Me
    </Button>
  );
}
```

### With Custom Click Handler
```tsx
import { Button } from "@doxy/design-system/button";

function MyComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Button appName="web" onClick={handleClick}>
      Custom Action
    </Button>
  );
}
```

### Secondary Variant
```tsx
import { Button } from "@doxy/design-system/button";

function MyComponent() {
  return (
    <Button appName="web" variant="secondary">
      Secondary Button
    </Button>
  );
}
```

### Disabled State
```tsx
import { Button } from "@doxy/design-system/button";

function MyComponent() {
  return (
    <Button appName="web" disabled>
      Disabled Button
    </Button>
  );
}
```

### With Custom Styling
```tsx
import { Button } from "@doxy/design-system/button";
import styles from "./MyComponent.module.css";

function MyComponent() {
  return (
    <Button appName="web" className={styles.customButton}>
      Custom Styled Button
    </Button>
  );
}
```

## Styling Customization

### CSS Custom Properties
The button component uses CSS custom properties that can be overridden:

```css
.button {
  --button-padding-x: 1rem;
  --button-padding-y: 0.5rem;
  --button-border-radius: 0.375rem;
  --button-font-size: 1rem;
  --button-font-weight: 500;
  --button-transition: all 0.2s ease-in-out;
}

.primary {
  --button-bg: #2563eb;
  --button-bg-hover: #1d4ed8;
  --button-bg-active: #1e40af;
  --button-color: #ffffff;
}

.secondary {
  --button-bg: #f3f4f6;
  --button-bg-hover: #e5e7eb;
  --button-bg-active: #d1d5db;
  --button-color: #1f2937;
  --button-border: #d1d5db;
}
```

### Overriding Styles
```css
/* In your component's CSS module */
.customButton {
  --button-padding-x: 2rem;
  --button-border-radius: 9999px; /* Pill shape */
}
```

## Accessibility Features

- **Semantic HTML**: Uses native `<button>` element
- **Keyboard Support**: Full keyboard navigation support
- **Focus Indicators**: Visible focus outline for keyboard users
- **Disabled State**: Properly disables interaction and updates cursor
- **Type Attribute**: Explicitly set to `"button"` to prevent form submission
- **ARIA Support**: Compatible with ARIA attributes via className

### Recommended ARIA Usage
```tsx
<Button 
  appName="web" 
  onClick={handleDelete}
  aria-label="Delete item"
>
  🗑️
</Button>
```

## Variants

### Primary (Default)
- Blue background (#2563eb)
- White text
- Use for primary actions

### Secondary
- Light gray background (#f3f4f6)
- Dark text (#1f2937)
- Border outline
- Use for secondary actions

## States

### Default
- Normal interactive state
- Hover effect on mouse over
- Active effect on click

### Disabled
- 50% opacity
- Not-allowed cursor
- No pointer events
- Cannot be clicked

### Loading (Future)
- CSS class available for loading spinner
- Not yet implemented in component logic

## Technical Details

- **Framework**: React 19.x
- **Next.js**: Marked with "use client" directive
- **Styling**: CSS Modules
- **TypeScript**: Full type safety with exported ButtonProps interface
- **Bundle Size**: Minimal (no external dependencies)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties required
- Flexbox layout required
