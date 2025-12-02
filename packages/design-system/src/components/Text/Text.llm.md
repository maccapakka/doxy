# Text Component - LLM Context

## Overview

The `Text` component is a flexible typography primitive that provides consistent text styling across the design system. It exposes typography properties through a simple prop API and integrates with the design system's font size, line height, font weight, and color tokens. The component uses CSS custom properties for dynamic styling and supports polymorphic rendering via the `as` prop.

## Component Location

- **Component**: `/packages/design-system/src/components/Text/Text.tsx`
- **Styles**: `/packages/design-system/src/components/Text/Text.module.css`
- **Stories**: `/packages/design-system/src/components/Text/Text.stories.tsx` (if exists)

## Basic Usage

```tsx
import { Text } from "@doxy/design-system";

// Simple usage with default span
<Text>Hello World</Text>

// With variant
<Text variant="title-1">Page Title</Text>

// With color
<Text variant="body-1" color="primary">Primary text</Text>

// As a different element
<Text as="h1" variant="title-1">Semantic heading</Text>

// Combining props
<Text as="p" variant="body-2" color="neutral">
  This is a paragraph with body-2 styling and neutral color.
</Text>
```

## Props

### `as` (ElementType)

- **Required**: No
- **Default**: `"span"`
- **Description**: The HTML element or React component to render
- **Usage**: Allows semantic markup while maintaining typography styling
- **Common values**: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"`, `"p"`, `"span"`, `"label"`, `"div"`
- **Example**: `as="h1"`

### `variant` (TextVariant)

- **Required**: No
- **Description**: Typography variant that controls font size, line height, and font weight
- **Options**:
  - **Titles**: `"title-1"` | `"title-2"` | `"title-3"` | `"title-4"` | `"title-5"` | `"title-6"`
  - **Featured**: `"featured-1"` | `"featured-2"` | `"featured-3"`
  - **Body**: `"body-1"` | `"body-2"` | `"body-3"`
  - **Caption**: `"caption-1"` | `"caption-2"`
- **Tokens**: Maps to design system tokens:
  - `--dxy-font-size-{variant}`
  - `--dxy-line-height-{variant}`
  - `--dxy-font-weight-{variant}`
- **Example**: `variant="body-1"`

### `color` (string)

- **Required**: No
- **Default**: Inherits current text color
- **Options**: `"primary"` | `"critical"` | `"neutral"` | `"white"` | `"black"`
- **Description**: Color variant that maps to design system tokens
- **Tokens**: Maps to `--dxy-color-{color}` CSS variables
- **Example**: `color="primary"`

### `children` (ReactNode)

- **Required**: No
- **Description**: Text content or child elements to render
- **Example**: `children="Hello World"`

### `[key: string]` (any)

- **Description**: All other props are spread onto the rendered element
- **Usage**: Allows passing HTML attributes like `onClick`, `className`, `data-*`, `aria-*`, etc.
- **Example**: `className="my-custom-class"`, `onClick={() => {}}`

## Typography Variants

### Title Variants

Used for headings and prominent text. Typically paired with semantic heading elements (`h1`-`h6`).

- **`title-1`**: Largest heading, typically for page titles
- **`title-2`**: Second-level heading
- **`title-3`**: Third-level heading
- **`title-4`**: Fourth-level heading
- **`title-5`**: Fifth-level heading
- **`title-6`**: Smallest heading

```tsx
<Text as="h1" variant="title-1">Main Page Title</Text>
<Text as="h2" variant="title-2">Section Heading</Text>
<Text as="h3" variant="title-3">Subsection Heading</Text>
```

### Featured Variants

Used for emphasized or featured text that needs to stand out but isn't a heading.

- **`featured-1`**: Largest featured text
- **`featured-2`**: Medium featured text
- **`featured-3`**: Smaller featured text

```tsx
<Text variant="featured-1">Special Announcement</Text>
<Text variant="featured-2">Highlighted Information</Text>
```

### Body Variants

Used for main content and paragraph text.

- **`body-1`**: Largest body text
- **`body-2`**: Standard body text
- **`body-3`**: Smaller body text

```tsx
<Text as="p" variant="body-1">
  This is a paragraph with larger body text.
</Text>
<Text as="p" variant="body-2">
  This is standard paragraph text.
</Text>
```

### Caption Variants

Used for supplementary information, labels, and small text.

- **`caption-1`**: Larger caption text
- **`caption-2`**: Smaller caption text

```tsx
<Text variant="caption-1">Image caption or metadata</Text>
<Text variant="caption-2">Fine print or timestamps</Text>
```

## Color Variants

### `primary`

- **Use case**: Main brand color, links, primary actions
- **Example**: Call-to-action text, important information

### `critical`

- **Use case**: Errors, warnings, destructive actions
- **Example**: Error messages, delete confirmations

### `neutral`

- **Use case**: Secondary or muted text
- **Example**: Descriptions, metadata, less important information

### `white`

- **Use case**: Text on dark backgrounds
- **Example**: Text overlays on images or dark sections

### `black`

- **Use case**: High contrast text
- **Example**: Default text color on light backgrounds

## Implementation Details

### How It Works

1. **Polymorphic Rendering**: Uses the `as` prop to determine which element to render (defaults to `span`)
2. **CSS Custom Properties**: All styling is applied via CSS variables with `--_` prefix
3. **Variant Mapping**: Each variant maps to three design tokens (font-size, line-height, font-weight)
4. **Color Mapping**: Color prop maps to design system color tokens
5. **Conditional Styles**: Only applies CSS variables when props are provided

### CSS Variables

```css
.root {
  font-size: var(--_fs);
  line-height: var(--_lh);
  font-weight: var(--_fw);
  color: var(--_fc);
}
```

**Variable mapping:**

- `--_fs`: Font size (maps to `--dxy-font-size-{variant}`)
- `--_lh`: Line height (maps to `--dxy-line-height-{variant}`)
- `--_fw`: Font weight (maps to `--dxy-font-weight-{variant}`)
- `--_fc`: Font color (maps to `--dxy-color-{color}`)

### Style Application Logic

```tsx
style={{
  "--_fs": variant ? `var(--dxy-font-size-${variant})` : undefined,
  "--_lh": variant ? `var(--dxy-line-height-${variant})` : undefined,
  "--_fw": variant ? `var(--dxy-font-weight-${variant})` : undefined,
  "--_fc": color ? `var(--dxy-color-${color})` : undefined,
} as React.CSSProperties}
```

- CSS variables are only set when the corresponding prop is provided
- If no variant is provided, font properties inherit from parent
- If no color is provided, color inherits from parent

## Common Patterns

### Semantic Headings

```tsx
<Text as="h1" variant="title-1">Main Title</Text>
<Text as="h2" variant="title-2">Section Title</Text>
<Text as="h3" variant="title-3">Subsection Title</Text>
```

### Paragraph Text

```tsx
<Text as="p" variant="body-1">
  This is a paragraph with standard body text styling.
</Text>
```

### Colored Text

```tsx
<Text variant="body-2" color="primary">Primary colored text</Text>
<Text variant="body-2" color="critical">Error or warning text</Text>
<Text variant="caption-1" color="neutral">Muted secondary text</Text>
```

### Labels

```tsx
<Text as="label" variant="body-2" htmlFor="input-id">
  Form Label
</Text>
```

### Inline Text with Different Styles

```tsx
<Text as="p" variant="body-1">
  This is normal text with{" "}
  <Text as="span" color="primary">
    highlighted text
  </Text>{" "}
  in the middle.
</Text>
```

### Text with Custom Attributes

```tsx
<Text
  as="p"
  variant="body-2"
  className="custom-class"
  data-testid="description"
  aria-label="Description text"
>
  Content with custom attributes
</Text>
```

### Responsive Typography

```tsx
<Text variant={isMobile ? "body-2" : "body-1"}>
  Responsive text that changes size based on viewport
</Text>
```

### Text in Layouts

```tsx
<Stack gap={2}>
  <Text as="h2" variant="title-2">
    Card Title
  </Text>
  <Text as="p" variant="body-2" color="neutral">
    Card description text
  </Text>
</Stack>
```

## Design System Integration

- **Typography Scale**: Uses `--dxy-font-size-*`, `--dxy-line-height-*`, and `--dxy-font-weight-*` tokens
- **Colors**: Maps to `--dxy-color-*` tokens for theming
- **Semantic HTML**: Encourages proper semantic markup via the `as` prop
- **Flexibility**: Supports both design system variants and custom styling via className

## Important Notes for LLMs

1. **Default Element**: Defaults to `span`, not `p` or `div`
2. **Semantic Pairing**: Pair title variants with appropriate heading elements (e.g., `variant="title-1"` with `as="h1"`)
3. **Color Prop**: Only accepts predefined variants; use `className` for custom colors
4. **Variant Optional**: The `variant` prop is optional; text will inherit styles if not provided
5. **Polymorphic**: Can render as any HTML element or React component via `as` prop
6. **Spread Props**: All unrecognized props are spread onto the rendered element
7. **No Default Variant**: Unlike some components, Text has no default variant (inherits if not specified)
8. **CSS Variables**: Component uses internal CSS variables with `--_` prefix (not meant for external use)
9. **Typography Tokens**: Each variant maps to three separate design tokens (size, line-height, weight)
10. **Accessibility**: Use semantic HTML elements (`h1`-`h6`, `p`, `label`) for proper document structure

## Troubleshooting

**Text not showing expected size:**

- Ensure the variant prop matches one of the valid TextVariant options
- Verify corresponding `--dxy-font-size-{variant}` CSS variables are defined
- Check that the variant name is spelled correctly (e.g., `"body-1"` not `"body1"`)

**Color not applying:**

- Verify the color prop matches one of: `"primary"`, `"critical"`, `"neutral"`, `"white"`, `"black"`
- Ensure corresponding `--dxy-color-{color}` CSS variables are defined
- Check for conflicting CSS that might override the color

**Text inheriting unexpected styles:**

- If no variant is provided, text inherits font properties from parent
- If no color is provided, text inherits color from parent
- Use explicit variant and color props to override inheritance

**Semantic HTML not working:**

- Ensure the `as` prop receives a valid ElementType (string or component reference)
- Check that you're using semantic elements appropriately (e.g., `h1` for main title, `p` for paragraphs)

**Custom attributes not applying:**

- Verify the attribute name is valid for the rendered element type
- Remember that all extra props are spread, so standard HTML attributes should work
- Check for typos in attribute names (e.g., `className` not `class`)

## Variant Selection Guide

### When to use each variant:

**Titles (title-1 to title-6)**

- Use for headings and section titles
- Pair with semantic heading elements (`h1`-`h6`)
- Follow heading hierarchy (don't skip levels)

**Featured (featured-1 to featured-3)**

- Use for emphasized content that isn't a heading
- Examples: Hero text, callouts, statistics, quotes

**Body (body-1 to body-3)**

- Use for main content and paragraphs
- `body-1`: Larger, more readable for important content
- `body-2`: Standard paragraph text
- `body-3`: Compact text for dense layouts

**Caption (caption-1 to caption-2)**

- Use for supplementary information
- Examples: Image captions, timestamps, metadata, labels, fine print
