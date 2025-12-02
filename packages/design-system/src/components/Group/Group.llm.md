# Group Component - LLM Context

## Overview

The `Group` component is a flexible layout primitive built on CSS Flexbox that provides a consistent way to arrange child elements. It exposes common layout properties through a simple prop API and integrates with the design system's spacing and color tokens. The component uses CSS custom properties for dynamic styling and supports polymorphic rendering via the `as` prop.

## Component Location

- **Component**: `/packages/design-system/src/components/Group/Group.tsx`
- **Styles**: `/packages/design-system/src/components/Group/Group.module.css`
- **Stories**: `/packages/design-system/src/components/Group/Group.stories.tsx`

## Basic Usage

```tsx
import { Group, Stack, Frame, Container } from "@doxy/design-system";

// Simple horizontal layout (default)
<Group>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</Group>

// Vertical layout with gap
<Group flexDirection="column" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Group>

// Using Stack variant (column by default)
<Stack gap={2}>
  <Text>Line 1</Text>
  <Text>Line 2</Text>
</Stack>

// Centered content
<Group justifyContent="center" alignItems="center">
  <Icon svg={ChatIcon} />
</Group>
```

## Props

### Layout Props

#### `as` (ElementType)

- **Required**: No
- **Default**: `"div"`
- **Description**: The HTML element or React component to render
- **Usage**: Allows semantic markup while maintaining layout functionality
- **Example**: `as="section"`, `as="header"`, `as={CustomComponent}`

#### `flexDirection` ("row" | "row-reverse" | "column" | "column-reverse")

- **Required**: No
- **Default**: `"row"`
- **Description**: Sets the direction of the flex container
- **Usage**: Use `"row"` for horizontal layouts, `"column"` for vertical
- **Example**: `flexDirection="column"`

#### `gap` (number)

- **Required**: No
- **Default**: 4 (spacing units)
- **Description**: Spacing between children in design system units
- **Calculation**: `gap * var(--dxy-unit-base)`
- **Common values**: 0, 1, 2, 4, 6, 8, 12
- **Example**: `gap={2}`

### Alignment Props

#### `alignItems` ("center" | "flex-start" | "flex-end" | "stretch" | "baseline")

- **Required**: No
- **Default**: `"stretch"`
- **Description**: Aligns children along the cross axis
- **Usage**: Controls vertical alignment in row layouts, horizontal in column layouts
- **Example**: `alignItems="center"`

#### `alignSelf` ("auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline")

- **Required**: No
- **Description**: Overrides `alignItems` for this specific element when used as a flex child
- **Example**: `alignSelf="flex-end"`

#### `justifyContent` ("center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly")

- **Required**: No
- **Default**: `"flex-start"`
- **Description**: Distributes children along the main axis
- **Usage**: Controls horizontal alignment in row layouts, vertical in column layouts
- **Example**: `justifyContent="space-between"`

#### `justifySelf` ("auto" | "center" | "flex-start" | "flex-end" | "stretch")

- **Required**: No
- **Description**: Overrides `justifyContent` for this specific element when used as a flex child
- **Example**: `justifySelf="center"`

### Spacing Props

#### `padding` (number)

- **Required**: No
- **Default**: 0
- **Description**: Inner spacing on all sides in design system units
- **Calculation**: `padding * var(--dxy-unit-base)`
- **Note**: Overridden by `paddingInline` or `paddingBlock` if specified
- **Example**: `padding={4}`

#### `paddingInline` (number)

- **Required**: No
- **Description**: Horizontal padding (left and right) in design system units
- **Priority**: Takes precedence over `padding` prop
- **Example**: `paddingInline={6}`

#### `paddingBlock` (number)

- **Required**: No
- **Description**: Vertical padding (top and bottom) in design system units
- **Priority**: Takes precedence over `padding` prop
- **Example**: `paddingBlock={2}`

### Positioning Props

#### `position` ("static" | "relative" | "absolute" | "fixed" | "sticky")

- **Required**: No
- **Description**: CSS position property
- **Usage**: Use for absolute/fixed positioning or sticky headers
- **Example**: `position="sticky"`

#### `top` (string | number)

- **Required**: No
- **Description**: Top offset when position is set
- **Accepts**: CSS values (e.g., `"10px"`, `"1rem"`, `"50%"`)
- **Example**: `top="0"`

#### `bottom` (string | number)

- **Required**: No
- **Description**: Bottom offset when position is set
- **Example**: `bottom="20px"`

#### `left` (string | number)

- **Required**: No
- **Description**: Left offset when position is set
- **Example**: `left="0"`

#### `right` (string | number)

- **Required**: No
- **Description**: Right offset when position is set
- **Example**: `right="0"`

### Visual Props

#### `backgroundColor` ("primary" | "critical" | "neutral" | "white" | "black")

- **Required**: No
- **Description**: Background color variant that maps to design system tokens
- **Tokens**: Maps to `--dxy-color-{backgroundColor}` CSS variables
- **Example**: `backgroundColor="neutral"`

#### `backgroundImage` (string)

- **Required**: No
- **Description**: CSS background-image value
- **Usage**: Use for gradients or image URLs
- **Example**: `backgroundImage="linear-gradient(to right, #fff, #000)"`

#### `backgroundSize` (string)

- **Required**: No
- **Description**: CSS background-size value
- **Example**: `backgroundSize="cover"`

#### `backgroundPosition` (string)

- **Required**: No
- **Description**: CSS background-position value
- **Example**: `backgroundPosition="center"`

#### `border` (string)

- **Required**: No
- **Description**: CSS border shorthand
- **Example**: `border="1px solid #ccc"`

#### `borderRadius` (string | number)

- **Required**: No
- **Default**: `"8px"`
- **Description**: Corner radius
- **Example**: `borderRadius="4px"` or `borderRadius={0}`

#### `boxShadow` (string)

- **Required**: No
- **Description**: CSS box-shadow value for elevation effects
- **Example**: `boxShadow="0 2px 4px rgba(0,0,0,0.1)"`

### Sizing Props

#### `width` (string | number)

- **Required**: No
- **Description**: Element width
- **Accepts**: CSS values (e.g., `"100px"`, `"50%"`, `"100vw"`)
- **Example**: `width="100%"`

#### `height` (string | number)

- **Required**: No
- **Description**: Element height
- **Accepts**: CSS values (e.g., `"100px"`, `"50vh"`)
- **Example**: `height="200px"`

### Other Props

#### `className` (string)

- **Required**: No
- **Description**: Additional CSS classes for custom styling
- **Example**: `className="my-custom-group"`

#### `children` (ReactNode)

- **Required**: No
- **Description**: Child elements to render inside the Group
- **Example**: Any valid React children

#### `[key: string]` (any)

- **Description**: All other props are spread onto the rendered element
- **Usage**: Allows passing HTML attributes like `onClick`, `data-*`, `aria-*`, etc.

## Predefined Variants

### Stack

```tsx
export const Stack = (props: GroupProps) => (
  <Group flexDirection="column" {...props} />
);
```

- **Purpose**: Vertical layout helper
- **Default**: `flexDirection="column"`
- **Usage**: `<Stack gap={4}>...</Stack>`

### Frame

```tsx
export const Frame = Group;
```

- **Purpose**: Semantic alias for Group
- **Usage**: Use when the Group represents a frame or container

### Container

```tsx
export const Container = Group;
```

- **Purpose**: Semantic alias for Group
- **Usage**: Use when the Group represents a container

## Implementation Details

### How It Works

1. **Polymorphic Rendering**: Uses the `as` prop to determine which element to render (defaults to `div`)
2. **CSS Custom Properties**: All styling is applied via CSS variables with `--_` prefix
3. **Property Reset**: CSS module resets all custom properties to `initial` to prevent inheritance
4. **Spacing System**: All spacing values are multiplied by `--dxy-unit-base`
5. **Conditional Padding**: Smart padding logic handles `padding`, `paddingInline`, and `paddingBlock` precedence

### CSS Variables

```css
.root {
  display: flex;
  align-items: var(--_fai, stretch);
  align-self: var(--_fas);
  justify-content: var(--_fjc, flex-start);
  justify-self: var(--_fjs);
  flex-direction: var(--_fd, row);
  gap: calc(var(--dxy-unit-base) * var(--_fg, 4));
  padding: calc(var(--dxy-unit-base) * var(--_fp, 0));
  padding-inline: calc(var(--dxy-unit-base) * var(--_fpi, 0));
  padding-block: calc(var(--dxy-unit-base) * var(--_fpb, 0));
  /* ... additional properties */
}
```

**Variable mapping:**

- `--_fai`: alignItems (default: `stretch`)
- `--_fas`: alignSelf
- `--_fjc`: justifyContent (default: `flex-start`)
- `--_fjs`: justifySelf
- `--_fd`: flexDirection (default: `row`)
- `--_fg`: gap (default: `4`)
- `--_fp`: padding (default: `0`)
- `--_fpi`: paddingInline (default: `0`)
- `--_fpb`: paddingBlock (default: `0`)
- `--_pos`: position
- `--_top`: top
- `--_bottom`: bottom
- `--_left`: left
- `--_right`: right
- `--_bg`: backgroundColor (maps to color token)
- `--_bgi`: backgroundImage
- `--_bgs`: backgroundSize
- `--_bgp`: backgroundPosition
- `--_border`: border
- `--_br`: borderRadius (default: `8px`)
- `--_shadow`: boxShadow
- `--_w`: width
- `--_h`: height

### Padding Logic

```tsx
"--_fp": paddingInline === undefined && paddingBlock === undefined
  ? padding
  : undefined,
"--_fpi": paddingInline ?? padding,
"--_fpb": paddingBlock ?? padding,
```

- If both `paddingInline` and `paddingBlock` are undefined, use `padding` for all sides
- Otherwise, `paddingInline` and `paddingBlock` take precedence
- Fallback to `padding` if inline/block values are not provided

## Common Patterns

### Horizontal Button Group

```tsx
<Group gap={2} alignItems="center">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Group>
```

### Vertical Form Stack

```tsx
<Stack gap={4}>
  <Input label="Name" />
  <Input label="Email" />
  <Button>Submit</Button>
</Stack>
```

### Centered Card

```tsx
<Group justifyContent="center" alignItems="center" width="100%" height="100vh">
  <Card>Content</Card>
</Group>
```

### Sticky Header

```tsx
<Group
  as="header"
  position="sticky"
  top="0"
  backgroundColor="white"
  padding={4}
  boxShadow="0 2px 4px rgba(0,0,0,0.1)"
>
  <Logo />
  <Navigation />
</Group>
```

### Space Between Layout

```tsx
<Group justifyContent="space-between" alignItems="center" padding={4}>
  <h1>Title</h1>
  <Button>Action</Button>
</Group>
```

### Responsive Padding

```tsx
<Group paddingInline={isMobile ? 4 : 8} paddingBlock={2}>
  Content
</Group>
```

### Grid-like Layout with Gap

```tsx
<Stack gap={4}>
  <Group gap={4}>
    <Card>1</Card>
    <Card>2</Card>
  </Group>
  <Group gap={4}>
    <Card>3</Card>
    <Card>4</Card>
  </Group>
</Stack>
```

## Design System Integration

- **Spacing**: Uses `--dxy-unit-base` for consistent sizing (gap, padding)
- **Colors**: Maps to `--dxy-color-*` tokens for theming
- **Defaults**: Sensible defaults (gap: 4, borderRadius: 8px, alignItems: stretch)
- **Flexibility**: Supports both design system tokens and custom CSS values

## Important Notes for LLMs

1. **Spacing Units**: All numeric spacing values (gap, padding) are in design system units, NOT pixels
2. **Default Direction**: Default `flexDirection` is `"row"` (horizontal), not column
3. **Default Gap**: Default gap is 4 spacing units (not 0)
4. **Padding Precedence**: `paddingInline` and `paddingBlock` override `padding`
5. **Color Props**: `backgroundColor` only accepts predefined variants; use `className` for custom colors
6. **Polymorphic**: Can render as any HTML element or React component via `as` prop
7. **Spread Props**: All unrecognized props are spread onto the rendered element
8. **CSS Variables**: Component uses internal CSS variables with `--_` prefix (not meant for external use)
9. **Border Radius**: Has a default of `8px` (unlike most other props which default to undefined)
10. **Variants**: `Stack`, `Frame`, and `Container` are exported alongside `Group`

## Troubleshooting

**Gap not working:**

- Ensure `--dxy-unit-base` is defined in your CSS
- Gap is in spacing units, not pixels (e.g., `gap={4}` = `4 * var(--dxy-unit-base)`)

**Padding not applying correctly:**

- Check if `paddingInline` or `paddingBlock` are overriding `padding`
- Remember padding values are in spacing units

**Background color not showing:**

- Verify the color prop matches one of: `"primary"`, `"critical"`, `"neutral"`, `"white"`, `"black"`
- Ensure corresponding `--dxy-color-{variant}` CSS variables are defined

**Children not aligning as expected:**

- Check `flexDirection` (row vs column affects which axis alignItems/justifyContent control)
- Remember default `alignItems` is `stretch`, not `flex-start`

**Custom element not rendering:**

- Ensure the `as` prop receives a valid ElementType (string or component reference)
- Check that the custom component accepts and spreads props correctly
