import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Group } from "./Group";
import { Button } from "../Button";
import { MeetingCamera } from "../../icons/MeetingCamera";
import { Microphone } from "../../icons/Microphone";
import { Chat } from "../../icons/Chat";

/**
 * The Group component is a flexible layout primitive that provides a consistent way to arrange child elements.
 * It's built on CSS Flexbox and exposes common layout properties through a simple prop API.
 */
const meta = {
  title: "Components/Group",
  component: Group,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile layout component that handles flexbox layouts with design system integration. Use Group for arranging elements in rows or columns with consistent spacing and alignment. Includes predefined variants like Stack, Frame, and Container.",
      },
      subtitle: "Flexible layout primitive for arranging child elements",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      description:
        "The HTML element or React component to render. Allows semantic markup while maintaining layout functionality.",
      control: "text",
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "div" },
      },
    },
    alignItems: {
      description:
        "Aligns children along the cross axis. Controls vertical alignment in row layouts, horizontal in column layouts.",
      control: "select",
      options: ["center", "flex-start", "flex-end", "stretch", "baseline"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    alignSelf: {
      description:
        "Overrides alignItems for this specific element when used as a flex child.",
      control: "select",
      options: [
        "auto",
        "center",
        "flex-start",
        "flex-end",
        "stretch",
        "baseline",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    justifyContent: {
      description:
        "Distributes children along the main axis. Controls horizontal alignment in row layouts, vertical in column layouts.",
      control: "select",
      options: [
        "center",
        "flex-start",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    justifySelf: {
      description:
        "Overrides justifyContent for this specific element when used as a flex child.",
      control: "select",
      options: ["auto", "center", "flex-start", "flex-end", "stretch"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    flexDirection: {
      description:
        "Sets the direction of the flex container. Use 'row' for horizontal layouts, 'column' for vertical.",
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    gap: {
      description:
        "Spacing between children in design system units. Each unit typically represents 4px or 8px depending on your scale.",
      control: { type: "number", min: 0, max: 24, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    padding: {
      description:
        "Inner spacing on all sides in design system units. Overridden by paddingInline or paddingBlock if specified.",
      control: { type: "number", min: 0, max: 24, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    paddingInline: {
      description:
        "Horizontal padding (left and right) in design system units. Takes precedence over padding prop.",
      control: { type: "number", min: 0, max: 24, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    paddingBlock: {
      description:
        "Vertical padding (top and bottom) in design system units. Takes precedence over padding prop.",
      control: { type: "number", min: 0, max: 24, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    position: {
      description:
        "CSS position property. Use for absolute/fixed positioning or sticky headers.",
      control: "select",
      options: ["static", "relative", "absolute", "fixed", "sticky"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    top: {
      description:
        "Top offset when position is set. Accepts CSS values (e.g., '10px', '1rem', '50%').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    bottom: {
      description:
        "Bottom offset when position is set. Accepts CSS values (e.g., '10px', '1rem', '50%').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    left: {
      description:
        "Left offset when position is set. Accepts CSS values (e.g., '10px', '1rem', '50%').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    right: {
      description:
        "Right offset when position is set. Accepts CSS values (e.g., '10px', '1rem', '50%').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    backgroundColor: {
      description:
        "Background color variant. Maps to design system color tokens.",
      control: "select",
      options: ["primary", "critical", "neutral", "white", "black"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    backgroundImage: {
      description:
        "CSS background-image value. Use for gradients or image URLs.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    backgroundSize: {
      description:
        "CSS background-size value (e.g., 'cover', 'contain', '100% 100%').",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    backgroundPosition: {
      description:
        "CSS background-position value (e.g., 'center', 'top left', '50% 50%').",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    border: {
      description:
        "CSS border shorthand (e.g., '1px solid #ccc', '2px dashed red').",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    borderRadius: {
      description:
        "Corner radius. Accepts CSS values (e.g., '4px', '0.5rem', '50%').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    boxShadow: {
      description:
        "CSS box-shadow value for elevation effects (e.g., '0 2px 4px rgba(0,0,0,0.1)').",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    width: {
      description:
        "Element width. Accepts CSS values (e.g., '100px', '50%', '100vw').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    height: {
      description:
        "Element height. Accepts CSS values (e.g., '100px', '50%', '100vh').",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      description: "Additional CSS classes for custom styling.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      description: "Child elements to render inside the Group.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} satisfies Meta<typeof Group>;

export default meta;

/**
 * The default Group story demonstrates basic usage with interactive buttons.
 * This shows how Group naturally arranges children in a row with default spacing.
 */
export const Default = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  return (
    <Group>
      <Button
        icon={<MeetingCamera />}
        active={cameraActive}
        onClick={() => setCameraActive(!cameraActive)}
      />
      <Button
        icon={<Microphone />}
        active={micActive}
        onClick={() => setMicActive(!micActive)}
      />
      <Button
        icon={<Chat />}
        active={chatActive}
        onClick={() => setChatActive(!chatActive)}
      />
    </Group>
  );
};
