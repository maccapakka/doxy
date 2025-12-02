import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Icon } from "./Icon";
import styles from "./Icon.module.css";

// Mock SVG component for testing
const MockSvg = (
  <svg data-testid="mock-svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe("Icon", () => {
  describe("Rendering", () => {
    it("renders the icon with the provided SVG", () => {
      render(<Icon svg={MockSvg} />);
      expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
    });

    it("renders without an SVG element", () => {
      const { container } = render(<Icon />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toBeInTheDocument();
      expect(iconDiv?.children.length).toBe(0);
    });

    it("is hidden from screen readers by default", () => {
      const { container } = render(<Icon svg={MockSvg} />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Styling", () => {
    it("applies the root CSS class", () => {
      const { container } = render(<Icon svg={MockSvg} />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveClass(styles.root!);
    });

    it("applies custom className when provided", () => {
      const { container } = render(
        <Icon svg={MockSvg} className="custom-class" />,
      );
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveClass(styles.root!);
      expect(iconDiv).toHaveClass("custom-class");
    });

    it("filters out falsy className values", () => {
      const { container } = render(<Icon svg={MockSvg} className="" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv?.className).toBe(styles.root!);
    });

    it("applies size style when provided", () => {
      const { container } = render(<Icon svg={MockSvg} size={8} />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_is": "8" });
    });

    it("does not apply size style when not provided", () => {
      const { container } = render(<Icon svg={MockSvg} />);
      const iconDiv = container.querySelector("div");
      const style = iconDiv?.getAttribute("style") || "";
      expect(style).not.toContain("--_is");
    });
  });

  describe("Color variants", () => {
    it("applies primary color variant", () => {
      const { container } = render(<Icon svg={MockSvg} color="primary" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_ic": "var(--dxy-color-primary)" });
    });

    it("applies critical color variant", () => {
      const { container } = render(<Icon svg={MockSvg} color="critical" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_ic": "var(--dxy-color-critical)" });
    });

    it("applies neutral color variant", () => {
      const { container } = render(<Icon svg={MockSvg} color="neutral" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_ic": "var(--dxy-color-neutral)" });
    });

    it("applies white color variant", () => {
      const { container } = render(<Icon svg={MockSvg} color="white" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_ic": "var(--dxy-color-white)" });
    });

    it("applies black color variant", () => {
      const { container } = render(<Icon svg={MockSvg} color="black" />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_ic": "var(--dxy-color-black)" });
    });

    it("does not apply color style when color is not provided", () => {
      const { container } = render(<Icon svg={MockSvg} />);
      const iconDiv = container.querySelector("div");
      const style = iconDiv?.getAttribute("style") || "";
      expect(style).not.toContain("--_ic");
    });
  });

  describe("Combined props", () => {
    it("applies all props together correctly", () => {
      const { container } = render(
        <Icon
          svg={MockSvg}
          color="primary"
          size={12}
          className="custom-icon"
        />,
      );
      const iconDiv = container.querySelector("div");

      expect(iconDiv).toHaveClass(styles.root!);
      expect(iconDiv).toHaveClass("custom-icon");
      expect(iconDiv).toHaveStyle({
        "--_is": "12",
        "--_ic": "var(--dxy-color-primary)",
      });
      expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
    });

    it("renders with only size and className", () => {
      const { container } = render(
        <Icon svg={MockSvg} size={6} className="test-class" />,
      );
      const iconDiv = container.querySelector("div");

      expect(iconDiv).toHaveClass(styles.root!);
      expect(iconDiv).toHaveClass("test-class");
      expect(iconDiv).toHaveStyle({ "--_is": "6" });
      const style = iconDiv?.getAttribute("style") || "";
      expect(style).not.toContain("--_ic");
    });
  });

  describe("Edge cases", () => {
    it("handles size of 0", () => {
      const { container } = render(<Icon svg={MockSvg} size={0} />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_is": "0" });
    });

    it("handles large size values", () => {
      const { container } = render(<Icon svg={MockSvg} size={999} />);
      const iconDiv = container.querySelector("div");
      expect(iconDiv).toHaveStyle({ "--_is": "999" });
    });

    it("handles multiple className values", () => {
      const { container } = render(
        <Icon svg={MockSvg} className="class1 class2 class3" />,
      );
      const iconDiv = container.querySelector("div");
      expect(iconDiv?.className).toContain(styles.root!);
      expect(iconDiv?.className).toContain("class1 class2 class3");
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations - basic icon", async () => {
      const { container } = render(<Icon svg={MockSvg} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - icon with color", async () => {
      const { container } = render(<Icon svg={MockSvg} color="primary" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - icon with size", async () => {
      const { container } = render(<Icon svg={MockSvg} size={8} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - icon with all props", async () => {
      const { container } = render(
        <Icon svg={MockSvg} color="critical" size={12} className="custom" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - empty icon", async () => {
      const { container } = render(<Icon />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
