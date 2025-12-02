# Icon Component Refactoring Plan

## Executive Summary

This plan outlines the refactoring of the icon system to introduce a centralized `Icon` component that provides consistent control over size and color properties. The current implementation has individual icon components with inconsistent prop handling, particularly around color management (using `currentColor` vs hardcoded colors).

**Target Interface:**

```tsx
<Icon svg={SvgIcon} color="red" size={24} />
```

## Current State Analysis

### Existing Architecture

- **Location:** `/packages/design-system/src/icons/`
- **Pattern:** Individual React components per icon
- **Props:** Each icon accepts `size` and `className`
- **Styling:** Icons use `stroke="currentColor"` to inherit text color
- **Special Cases:**
  - Animated icons (`MicrophoneAnimated`, `MeetingCameraAnimated`) use Framer Motion
  - Some icons have hardcoded colors (e.g., red strikethrough in `MicrophoneAnimated`)
- **Exports:** Barrel export via `index.ts`

### Current Icon Inventory

1. `Chat.tsx` - Standard SVG component
2. `Dots.tsx` - Standard SVG component
3. `Layout.tsx` - Standard SVG component
4. `MeetingCamera.tsx` - Standard SVG component
5. `MeetingCameraAnimated.tsx` - Animated with Framer Motion
6. `MeetingCameraOff.tsx` - Standard SVG component
7. `Microphone.tsx` - Standard SVG component
8. `MicrophoneAnimated.tsx` - Animated with Framer Motion, hardcoded red color
9. `MicrophoneOff.tsx` - Standard SVG component
10. `PhoneOff.tsx` - Standard SVG component
11. `Report.tsx` - Standard SVG component
12. `Settings.tsx` - Standard SVG component

### Current Usage Patterns

**Primary consumer:** `/apps/web/app/page.tsx`

- Direct component imports: `Chat`, `PhoneOff`, `Dots`, `MeetingCameraAnimated`, `MicrophoneAnimated`
- Mixed import pattern: `Settings` imported with `.tsx` extension
- Icons rendered directly as JSX: `<Chat />`, `<MicrophoneAnimated isOff={!isMicOn} />`

## Technical Challenges

### 1. **SVG Data Extraction**

- Need to separate SVG path data from React wrapper
- Preserve viewBox, path data, and other SVG attributes
- Handle multiple paths per icon

### 2. **Animation Compatibility**

- Animated icons use Framer Motion's `motion.path` components
- Need to maintain animation capabilities in new architecture
- Conditional rendering based on state (e.g., `isOff` prop)

### 3. **Color Management**

- Current: `stroke="currentColor"` inherits from parent text color
- Target: Explicit color prop with fallback to `currentColor`
- Challenge: Hardcoded colors in animations (red strikethrough)

### 4. **Type Safety**

- Need TypeScript definitions for SVG data structure
- Discriminated unions for standard vs animated icons
- Proper typing for color values (CSS color strings)

### 5. **Backward Compatibility**

- Minimize breaking changes during migration
- Support gradual adoption across codebase
- Maintain existing API during transition period

## Proposed Architecture

### Option A: SVG Data Objects (Recommended)

**Structure:**

```tsx
// Icon data format
export const ChatSvg = {
  viewBox: "0 0 24 24",
  paths: [
    { d: "M23.25 13.5A5.249...", stroke: "currentColor" },
    { d: "m6.75 12.75 -3 3v...", stroke: "currentColor" },
  ],
  defaultSize: 24,
  type: "standard" as const,
};

// Icon component
interface IconProps {
  svg: IconData;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({
  svg,
  size,
  color = "currentColor",
  className,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svg.viewBox}
      height={size ?? svg.defaultSize}
      width={size ?? svg.defaultSize}
      className={className}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      {svg.paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          stroke={path.stroke === "currentColor" ? color : path.stroke}
        />
      ))}
    </svg>
  );
};
```

**Pros:**

- Clean separation of data and presentation
- Easy to add new icons
- Type-safe with TypeScript
- Supports color overrides
- Tree-shakeable

**Cons:**

- Requires refactoring all existing icons
- Animation support needs special handling
- Breaking change for consumers

### Option B: Hybrid Approach (Backward Compatible)

**Structure:**

```tsx
// Keep existing components but add data exports
export const ChatSvg = { /* data */ };
export const Chat = ({ size = 24, className }: ChatProps) => {
  return <Icon svg={ChatSvg} size={size} className={className} />;
};

// New usage
<Icon svg={ChatSvg} color="red" size={24} />

// Legacy usage (still works)
<Chat size={24} />
```

**Pros:**

- Backward compatible
- Gradual migration path
- Supports both patterns

**Cons:**

- Maintains duplicate code temporarily
- Larger bundle size during transition
- More complex maintenance

### Option C: Render Props Pattern

**Structure:**

```tsx
export const Icon = ({
  svg: SvgComponent,
  size,
  color,
  ...props
}: IconProps) => {
  return (
    <div style={{ color }}>
      <SvgComponent size={size} {...props} />
    </div>
  );
};
```

**Pros:**

- Minimal refactoring
- Keeps existing components

**Cons:**

- Extra DOM wrapper
- Color control via CSS inheritance only
- Doesn't meet the stated interface requirement

## Recommended Implementation Plan

### Phase 1: Foundation (Week 1)

**Goal:** Create new Icon infrastructure without breaking existing code

#### 1.1 Create Type Definitions

```typescript
// packages/design-system/src/icons/types.ts
export interface IconPath {
  d: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
}

export interface StandardIconData {
  type: "standard";
  viewBox: string;
  paths: IconPath[];
  defaultSize: number;
  title?: string;
}

export interface AnimatedIconData {
  type: "animated";
  viewBox: string;
  component: React.ComponentType<AnimatedIconProps>;
  defaultSize: number;
}

export type IconData = StandardIconData | AnimatedIconData;

export interface IconProps {
  svg: IconData;
  size?: number;
  color?: string;
  className?: string;
}

export interface AnimatedIconProps extends Omit<IconProps, "svg"> {
  isOff?: boolean;
}
```

#### 1.2 Create Base Icon Component

```typescript
// packages/design-system/src/components/Icon/Icon.tsx
import { StandardIconData, AnimatedIconData, IconProps } from "../../icons/types";

export const Icon = ({ svg, size, color = "currentColor", className }: IconProps) => {
  if (svg.type === "animated") {
    const AnimatedComponent = svg.component;
    return <AnimatedComponent size={size} className={className} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svg.viewBox}
      height={size ?? svg.defaultSize}
      width={size ?? svg.defaultSize}
      className={className}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      {svg.title && <title>{svg.title}</title>}
      {svg.paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          stroke={path.stroke === "currentColor" ? color : (path.stroke || color)}
          fill={path.fill || "none"}
          strokeWidth={path.strokeWidth}
        />
      ))}
    </svg>
  );
};
```

#### 1.3 Add to Package Exports

```json
// packages/design-system/package.json
{
  "exports": {
    "./icon": "./src/components/Icon/Icon.tsx"
    // ... existing exports
  }
}
```

### Phase 2: Icon Data Migration (Week 1-2)

**Goal:** Convert existing icons to data format while maintaining backward compatibility

#### 2.1 Create Migration Script

```javascript
// scripts/migrate-icons.js
// Automated script to extract SVG data from existing components
// Generates new .data.ts files alongside existing components
```

#### 2.2 Migrate Standard Icons (Priority Order)

1. **Simple icons first:** `Chat`, `Dots`, `Report`, `PhoneOff`
2. **Complex icons:** `Settings`, `Layout`, `MeetingCamera`, `MeetingCameraOff`, `Microphone`, `MicrophoneOff`

**Example Migration:**

```typescript
// packages/design-system/src/icons/Chat.data.ts
import { StandardIconData } from "./types";

export const ChatSvg: StandardIconData = {
  type: "standard",
  viewBox: "0 0 24 24",
  defaultSize: 24,
  title: "Chat",
  paths: [
    {
      d: "M23.25 13.5A5.249 5.249 0 0 0 18 8.25h-3a5.25 5.25 0 0 0 0 10.5h0.75l4.5 4.5v-5.024a5.237 5.237 0 0 0 3 -4.726Z",
      stroke: "currentColor"
    },
    {
      d: "m6.75 12.75 -3 3v-5.024A5.239 5.239 0 0 1 6 0.75h3a5.252 5.252 0 0 1 5.033 3.75",
      stroke: "currentColor"
    }
  ]
};

// Keep existing component for backward compatibility
export const Chat = ({ size = 24, className }: ChatProps) => {
  return <Icon svg={ChatSvg} size={size} className={className} />;
};
```

#### 2.3 Handle Animated Icons

```typescript
// packages/design-system/src/icons/MicrophoneAnimated.data.ts
import { AnimatedIconData } from "./types";
import { MicrophoneAnimated as MicrophoneAnimatedComponent } from "./MicrophoneAnimated";

export const MicrophoneAnimatedSvg: AnimatedIconData = {
  type: "animated",
  viewBox: "0 0 24 24",
  defaultSize: 24,
  component: MicrophoneAnimatedComponent,
};

// Refactor MicrophoneAnimated.tsx to accept color prop
export const MicrophoneAnimated = ({
  size = 24,
  className,
  isOff = false,
  color = "currentColor",
  strikeColor = "#ef4444", // Allow override of hardcoded red
}: MicrophoneAnimatedProps) => {
  // ... implementation with color support
};
```

### Phase 3: Update Exports (Week 2)

**Goal:** Provide both data and component exports

```typescript
// packages/design-system/src/icons/index.ts
// Data exports (for new Icon component)
export { ChatSvg } from "./Chat.data";
export { DotsSvg } from "./Dots.data";
export { LayoutSvg } from "./Layout.data";
export { MeetingCameraSvg } from "./MeetingCamera.data";
export { MeetingCameraAnimatedSvg } from "./MeetingCameraAnimated.data";
export { MeetingCameraOffSvg } from "./MeetingCameraOff.data";
export { MicrophoneSvg } from "./Microphone.data";
export { MicrophoneAnimatedSvg } from "./MicrophoneAnimated.data";
export { MicrophoneOffSvg } from "./MicrophoneOff.data";
export { PhoneOffSvg } from "./PhoneOff.data";
export { ReportSvg } from "./Report.data";
export { SettingsSvg } from "./Settings.data";

// Component exports (backward compatibility)
export { Chat } from "./Chat";
export { Dots } from "./Dots";
export { Layout } from "./Layout";
export { MeetingCamera } from "./MeetingCamera";
export { MeetingCameraAnimated } from "./MeetingCameraAnimated";
export { MeetingCameraOff } from "./MeetingCameraOff";
export { Microphone } from "./Microphone";
export { MicrophoneAnimated } from "./MicrophoneAnimated";
export { MicrophoneOff } from "./MicrophoneOff";
export { PhoneOff } from "./PhoneOff";
export { Report } from "./Report";
export { Settings } from "./Settings";

// Types
export type { IconData, IconProps, AnimatedIconProps } from "./types";
```

### Phase 4: Consumer Migration (Week 2-3)

**Goal:** Update consuming applications to use new Icon component

#### 4.1 Update Web App Imports

```typescript
// apps/web/app/page.tsx
// Before:
import {
  Chat,
  PhoneOff,
  Dots,
  MeetingCameraAnimated,
  MicrophoneAnimated,
} from "@doxy/design-system/icons";
import { Settings } from "@doxy/design-system/icons/Settings.tsx";

// After:
import { Icon } from "@doxy/design-system/icon";
import {
  ChatSvg,
  PhoneOffSvg,
  DotsSvg,
  MeetingCameraAnimatedSvg,
  MicrophoneAnimatedSvg,
  SettingsSvg,
} from "@doxy/design-system/icons";
```

#### 4.2 Update Component Usage

```typescript
// Before:
<Button icon={<Chat />} tooltip="Open Chat" />

// After:
<Button icon={<Icon svg={ChatSvg} color="currentColor" size={24} />} tooltip="Open Chat" />

// Or with custom color:
<Button icon={<Icon svg={ChatSvg} color="#3b82f6" size={24} />} tooltip="Open Chat" />
```

#### 4.3 Handle Animated Icons

```typescript
// Before:
<Button
  icon={<MicrophoneAnimated isOff={!isMicOn} />}
  active={isMicOn}
  onClick={() => setIsMicOn(!isMicOn)}
/>

// After (Option 1 - using Icon wrapper):
<Button
  icon={<Icon svg={MicrophoneAnimatedSvg} size={24} />}
  active={isMicOn}
  onClick={() => setIsMicOn(!isMicOn)}
/>

// After (Option 2 - direct component with color support):
<Button
  icon={<MicrophoneAnimated isOff={!isMicOn} color="currentColor" />}
  active={isMicOn}
  onClick={() => setIsMicOn(!isMicOn)}
/>
```

### Phase 5: Testing & Documentation (Week 3)

**Goal:** Ensure quality and provide migration guides

#### 5.1 Create Storybook Stories

```typescript
// packages/design-system/src/components/Icon/Icon.stories.tsx
import { Icon } from "./Icon";
import { ChatSvg, SettingsSvg, MicrophoneSvg } from "../../icons";

export default {
  title: "Components/Icon",
  component: Icon,
};

export const Default = () => <Icon svg={ChatSvg} />;
export const CustomSize = () => <Icon svg={ChatSvg} size={48} />;
export const CustomColor = () => <Icon svg={ChatSvg} color="#3b82f6" />;
export const AllIcons = () => (
  <div style={{ display: "flex", gap: "16px" }}>
    <Icon svg={ChatSvg} />
    <Icon svg={SettingsSvg} />
    <Icon svg={MicrophoneSvg} />
  </div>
);
```

#### 5.2 Write Unit Tests

```typescript
// packages/design-system/src/components/Icon/Icon.test.tsx
import { render } from "@testing-library/react";
import { Icon } from "./Icon";
import { ChatSvg } from "../../icons";

describe("Icon", () => {
  it("renders with default props", () => {
    const { container } = render(<Icon svg={ChatSvg} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("height", "24");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("applies custom size", () => {
    const { container } = render(<Icon svg={ChatSvg} size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("height", "48");
  });

  it("applies custom color", () => {
    const { container } = render(<Icon svg={ChatSvg} color="#ff0000" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke", "#ff0000");
  });
});
```

#### 5.3 Create Migration Guide

```markdown
// packages/design-system/ICON_MIGRATION.md

# Icon Component Migration Guide

## Overview

The icon system has been refactored to provide better control over size and color...

## Breaking Changes

- Icon components now export both data objects (e.g., `ChatSvg`) and components (e.g., `Chat`)
- New `Icon` component provides centralized rendering with color control

## Migration Steps

1. Import the `Icon` component...
2. Replace component imports with data imports...
3. Update JSX usage...

## Examples

[Before/After examples]
```

### Phase 6: Cleanup & Optimization (Week 4)

**Goal:** Remove deprecated code and optimize bundle size

#### 6.1 Deprecation Warnings

```typescript
// Add deprecation warnings to old components
/** @deprecated Use Icon component with ChatSvg data instead */
export const Chat = ({ size = 24, className }: ChatProps) => {
  if (process.env.NODE_ENV === "development") {
    console.warn("Chat component is deprecated. Use <Icon svg={ChatSvg} /> instead.");
  }
  return <Icon svg={ChatSvg} size={size} className={className} />;
};
```

#### 6.2 Bundle Analysis

- Measure bundle size before/after
- Ensure tree-shaking works correctly
- Verify no duplicate code in production builds

#### 6.3 Remove Deprecated Code (After 2-3 sprints)

- Remove old component exports
- Keep only data exports and Icon component
- Update package.json exports

## Risk Mitigation

### Technical Risks

1. **Animation Complexity**
   - Mitigation: Keep animated icons as special components, wrap in Icon when needed
   - Fallback: Maintain separate AnimatedIcon component

2. **Breaking Changes**
   - Mitigation: Maintain backward compatibility for 2-3 sprints
   - Fallback: Feature flag for gradual rollout

3. **Performance Regression**
   - Mitigation: Bundle size analysis, performance testing
   - Fallback: Lazy loading for icon data

### Process Risks

1. **Incomplete Migration**
   - Mitigation: Automated codemod scripts, comprehensive testing
   - Tracking: Migration dashboard showing completion percentage

2. **Developer Confusion**
   - Mitigation: Clear documentation, pair programming sessions
   - Support: Office hours for migration questions

## Success Metrics

### Quantitative

- ✅ 100% of icons converted to data format
- ✅ 100% of consumers migrated to new Icon component
- ✅ Bundle size reduction of 10-15% (due to better tree-shaking)
- ✅ Zero runtime errors in production
- ✅ Test coverage >90% for Icon component

### Qualitative

- ✅ Consistent color control across all icons
- ✅ Simplified icon addition process (just add data object)
- ✅ Improved developer experience with TypeScript autocomplete
- ✅ Better Storybook documentation

## Timeline Summary

| Phase               | Duration | Key Deliverables                   |
| ------------------- | -------- | ---------------------------------- |
| Phase 1: Foundation | Week 1   | Icon component, types, exports     |
| Phase 2: Migration  | Week 1-2 | All icons converted to data format |
| Phase 3: Exports    | Week 2   | Updated barrel exports             |
| Phase 4: Consumers  | Week 2-3 | Web app migrated                   |
| Phase 5: Testing    | Week 3   | Tests, stories, documentation      |
| Phase 6: Cleanup    | Week 4   | Deprecation, optimization          |

**Total Duration:** 4 weeks (1 sprint)

## Alternative Approaches Considered

### 1. Keep Current Architecture + Add Color Wrapper

**Rejected because:** Doesn't meet the stated interface requirement, adds extra DOM nodes

### 2. Use SVG Sprites

**Rejected because:** Loses React component benefits, harder to animate, accessibility concerns

### 3. Icon Font

**Rejected because:** Poor accessibility, limited styling control, flash of unstyled content

## Open Questions

1. **Should we support multiple color props for multi-color icons?**
   - Recommendation: Start with single color, add multi-color support if needed

2. **How to handle icon variants (filled, outlined, etc.)?**
   - Recommendation: Separate data objects (e.g., `ChatFilledSvg`, `ChatOutlinedSvg`)

3. **Should Icon component support children for custom SVG content?**
   - Recommendation: No, keep it focused on predefined icon data

4. **How to handle icon accessibility (aria-labels, roles)?**
   - Recommendation: Add optional `aria-label` and `role` props to Icon component

## Appendix

### A. File Structure (After Migration)

```
packages/design-system/src/
├── components/
│   ├── Icon/
│   │   ├── Icon.tsx
│   │   ├── Icon.stories.tsx
│   │   ├── Icon.test.tsx
│   │   └── Icon.module.css
│   └── index.ts
├── icons/
│   ├── types.ts
│   ├── Chat.data.ts
│   ├── Chat.tsx (deprecated, to be removed)
│   ├── Dots.data.ts
│   ├── Dots.tsx (deprecated)
│   ├── MicrophoneAnimated.data.ts
│   ├── MicrophoneAnimated.tsx (refactored with color support)
│   └── index.ts
└── tokens/
```

### B. Code Examples

#### Adding a New Icon

```typescript
// 1. Create data file
// packages/design-system/src/icons/NewIcon.data.ts
export const NewIconSvg: StandardIconData = {
  type: "standard",
  viewBox: "0 0 24 24",
  defaultSize: 24,
  title: "New Icon",
  paths: [
    { d: "M...", stroke: "currentColor" }
  ]
};

// 2. Export from index.ts
export { NewIconSvg } from "./NewIcon.data";

// 3. Use in application
import { Icon } from "@doxy/design-system/icon";
import { NewIconSvg } from "@doxy/design-system/icons";

<Icon svg={NewIconSvg} color="#3b82f6" size={24} />
```

#### Creating an Animated Icon

```typescript
// 1. Create animated component with color support
export const NewAnimatedIcon = ({
  size = 24,
  className,
  color = "currentColor",
  isActive = false
}: AnimatedIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      className={className}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <motion.path
        d="M..."
        animate={{ opacity: isActive ? 1 : 0 }}
      />
    </svg>
  );
};

// 2. Create data object
export const NewAnimatedIconSvg: AnimatedIconData = {
  type: "animated",
  viewBox: "0 0 24 24",
  defaultSize: 24,
  component: NewAnimatedIcon
};

// 3. Use directly (animations need component access)
<NewAnimatedIcon color="#3b82f6" isActive={true} />
```

---

**Document Version:** 1.0  
**Last Updated:** December 1, 2025  
**Author:** Principal Solutions Architect  
**Status:** Ready for Review
