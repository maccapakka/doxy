# Zoom-Style Call Controls — Tech Test

This repository contains a small monorepo built with **Turborepo** and **Next.js**, implementing a Zoom-style in-call control bar with motion, accessibility, and clean component-driven architecture. Although intentionally over-engineered for the scope of the task, the goal was to demonstrate experience in scalable frontend practices, monorepos, design systems, and motion.

The monorepo contains two projects:

- **packages/design-system** — a mocked design system containing simple tokens and basic UI primitives to support this tech test.
- **apps/webapp** — the actual Zoom-style control bar interface, including animated call controls (mute, camera, options menu).

## ▶️ Running the Repo

```bash
pnpm install # install dependencies
pnpm dev # start the webapp
pnpm storybook # start the storybook
```

## 🎯 Objective of the Tech Test

The brief was to create an in-call interface similar to Zoom and demonstrate:

- Toggleable **camera** and **microphone** controls.
- An **Options** button that reveals a context menu.
- A sense of **“wow factor”** through smooth motion and visual delight.
- **WCAG 2.2 AA** accessibility compliance.
- A maintainable, quality-focused frontend approach.

## 🏛 Monorepo Architecture

Although this project could have been built in a single app, Turborepo was chosen deliberately to demonstrate:

- Understanding of **monorepo structures**.
- Ability to split concerns into **reusable packages**.
- Familiarity with tooling and architecture used at scale.

## 🧩 Component-Driven Development

A key philosophy in this project is **component-driven development**:

> “If you build the component first, you avoid monolithic components full of business logic and keep development velocity high.”

State management stays intentionally light — simple `useState` is sufficient for control bar interactions.

## 🎨 Design System (Mocked)

The Design System includes lightweight tokens and primitives — enough for the purpose of the test, without pretending to be a full system:

- **Tokens:**  
  Colors, spacing, radii, typography, motion presets.
- **Components:**  
  Minimal primitives used by the control bar (buttons, wrappers, layout helpers, etc.).

A **Storybook** instance is included for browsing and testing the design system:

`pnpm storybook`

## 🧠 Why These Technical Choices?

### ❌ Not Using TailwindCSS

Although Tailwind allows for extremely fast prototyping (and would have made this tech test quicker), it does not scale well in large, quality codebases. I prefer:

- cleaner code readability,
- finer control over the UI,
- hiding implementation complexity from engineers less familiar with CSS frameworks.

Therefore this project uses **CSS Modules** instead.

---

### 🗂 Using Turborepo (Despite Overkill)

This demonstrates proficiency beyond motion:

- structuring scalable codebases,
- designing systems built for growth,
- aligning with modern monorepo-based organisations.

---

### 🎥 Motion with Framer Motion

Framer Motion was chosen for **speed** within the 4-hour timebox.

However, with more time, motion would be implemented in **pure CSS**, leveraging modern standards that now support:

- page transitions
- layout transitions
- enter/exit animations
- physics-based interactions

…with dramatically lower browser overhead.

---

### 🔧 Radix Primitives (Not ShadCN)

Radix was used sparingly to accelerate development. Radix is preferred over ShadCN because:

- ShadCN introduces unnecessary opinions.
- It mirrors Tailwind’s tendency toward verbosity.
- It is great for speed, but not for the long-term maintainability of quality frontends.

## ♿ Accessibility

Everything is implemented to **WCAG 2.2 AA** standards:

- focus states
- semantic labels
- keyboard navigation
- ARIA where appropriate

Automated **a11y tests** supplement the manual implementation.

## 🧪 Testing

The project includes:

- **Vitest** for unit testing
- **Accessibility tests** to ensure AA compliance

No heavier E2E frameworks were required for the scope of this test.
