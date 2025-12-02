import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text";
import styles from "./Text.module.css";

describe("Text", () => {
  describe("Rendering", () => {
    it("renders text content", () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders as span by default", () => {
      const { container } = render(<Text>Content</Text>);
      const element = container.querySelector("span");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Content");
    });

    it("renders without children", () => {
      const { container } = render(<Text />);
      const element = container.querySelector("span");
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
    });
  });

  describe("Custom element (as prop)", () => {
    it("renders as custom HTML element", () => {
      render(<Text as="h1">Heading</Text>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading");
    });

    it("renders as h2", () => {
      render(<Text as="h2">Subheading</Text>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it("renders as p", () => {
      const { container } = render(<Text as="p">Paragraph</Text>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent("Paragraph");
    });

    it("renders as div", () => {
      const { container } = render(<Text as="div">Division</Text>);
      const div = container.querySelector("div");
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent("Division");
    });

    it("renders as label", () => {
      const { container } = render(<Text as="label">Label</Text>);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Label");
    });
  });

  describe("Styling", () => {
    it("applies the root CSS class", () => {
      const { container } = render(<Text>Content</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveClass(styles.root!);
    });

    it("does not apply variant styles when variant is not provided", () => {
      const { container } = render(<Text>Content</Text>);
      const element = container.querySelector("span");
      const style = element?.getAttribute("style") || "";
      expect(style).not.toContain("--_fs");
      expect(style).not.toContain("--_lh");
      expect(style).not.toContain("--_fw");
    });

    it("does not apply color style when color is not provided", () => {
      const { container } = render(<Text>Content</Text>);
      const element = container.querySelector("span");
      const style = element?.getAttribute("style") || "";
      expect(style).not.toContain("--_fc");
    });
  });

  describe("Title variants", () => {
    it("applies title-1 variant styles", () => {
      const { container } = render(<Text variant="title-1">Title 1</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-1)",
        "--_lh": "var(--dxy-line-height-title-1)",
        "--_fw": "var(--dxy-font-weight-title-1)",
      });
    });

    it("applies title-2 variant styles", () => {
      const { container } = render(<Text variant="title-2">Title 2</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-2)",
        "--_lh": "var(--dxy-line-height-title-2)",
        "--_fw": "var(--dxy-font-weight-title-2)",
      });
    });

    it("applies title-3 variant styles", () => {
      const { container } = render(<Text variant="title-3">Title 3</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-3)",
        "--_lh": "var(--dxy-line-height-title-3)",
        "--_fw": "var(--dxy-font-weight-title-3)",
      });
    });

    it("applies title-4 variant styles", () => {
      const { container } = render(<Text variant="title-4">Title 4</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-4)",
        "--_lh": "var(--dxy-line-height-title-4)",
        "--_fw": "var(--dxy-font-weight-title-4)",
      });
    });

    it("applies title-5 variant styles", () => {
      const { container } = render(<Text variant="title-5">Title 5</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-5)",
        "--_lh": "var(--dxy-line-height-title-5)",
        "--_fw": "var(--dxy-font-weight-title-5)",
      });
    });

    it("applies title-6 variant styles", () => {
      const { container } = render(<Text variant="title-6">Title 6</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-6)",
        "--_lh": "var(--dxy-line-height-title-6)",
        "--_fw": "var(--dxy-font-weight-title-6)",
      });
    });
  });

  describe("Featured variants", () => {
    it("applies featured-1 variant styles", () => {
      const { container } = render(
        <Text variant="featured-1">Featured 1</Text>,
      );
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-featured-1)",
        "--_lh": "var(--dxy-line-height-featured-1)",
        "--_fw": "var(--dxy-font-weight-featured-1)",
      });
    });

    it("applies featured-2 variant styles", () => {
      const { container } = render(
        <Text variant="featured-2">Featured 2</Text>,
      );
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-featured-2)",
        "--_lh": "var(--dxy-line-height-featured-2)",
        "--_fw": "var(--dxy-font-weight-featured-2)",
      });
    });

    it("applies featured-3 variant styles", () => {
      const { container } = render(
        <Text variant="featured-3">Featured 3</Text>,
      );
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-featured-3)",
        "--_lh": "var(--dxy-line-height-featured-3)",
        "--_fw": "var(--dxy-font-weight-featured-3)",
      });
    });
  });

  describe("Body variants", () => {
    it("applies body-1 variant styles", () => {
      const { container } = render(<Text variant="body-1">Body 1</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-body-1)",
        "--_lh": "var(--dxy-line-height-body-1)",
        "--_fw": "var(--dxy-font-weight-body-1)",
      });
    });

    it("applies body-2 variant styles", () => {
      const { container } = render(<Text variant="body-2">Body 2</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-body-2)",
        "--_lh": "var(--dxy-line-height-body-2)",
        "--_fw": "var(--dxy-font-weight-body-2)",
      });
    });

    it("applies body-3 variant styles", () => {
      const { container } = render(<Text variant="body-3">Body 3</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-body-3)",
        "--_lh": "var(--dxy-line-height-body-3)",
        "--_fw": "var(--dxy-font-weight-body-3)",
      });
    });
  });

  describe("Caption variants", () => {
    it("applies caption-1 variant styles", () => {
      const { container } = render(<Text variant="caption-1">Caption 1</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-caption-1)",
        "--_lh": "var(--dxy-line-height-caption-1)",
        "--_fw": "var(--dxy-font-weight-caption-1)",
      });
    });

    it("applies caption-2 variant styles", () => {
      const { container } = render(<Text variant="caption-2">Caption 2</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-caption-2)",
        "--_lh": "var(--dxy-line-height-caption-2)",
        "--_fw": "var(--dxy-font-weight-caption-2)",
      });
    });
  });

  describe("Color variants", () => {
    it("applies primary color variant", () => {
      const { container } = render(<Text color="primary">Primary</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({ "--_fc": "var(--dxy-color-primary)" });
    });

    it("applies critical color variant", () => {
      const { container } = render(<Text color="critical">Critical</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({ "--_fc": "var(--dxy-color-critical)" });
    });

    it("applies neutral color variant", () => {
      const { container } = render(<Text color="neutral">Neutral</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({ "--_fc": "var(--dxy-color-neutral)" });
    });

    it("applies white color variant", () => {
      const { container } = render(<Text color="white">White</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({ "--_fc": "var(--dxy-color-white)" });
    });

    it("applies black color variant", () => {
      const { container } = render(<Text color="black">Black</Text>);
      const element = container.querySelector("span");
      expect(element).toHaveStyle({ "--_fc": "var(--dxy-color-black)" });
    });
  });

  describe("Combined props", () => {
    it("applies variant and color together", () => {
      const { container } = render(
        <Text variant="title-1" color="primary">
          Combined
        </Text>,
      );
      const element = container.querySelector("span");
      expect(element).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-1)",
        "--_lh": "var(--dxy-line-height-title-1)",
        "--_fw": "var(--dxy-font-weight-title-1)",
        "--_fc": "var(--dxy-color-primary)",
      });
    });

    it("applies custom element, variant, and color together", () => {
      render(
        <Text as="h1" variant="title-1" color="primary">
          Full Props
        </Text>,
      );
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveStyle({
        "--_fs": "var(--dxy-font-size-title-1)",
        "--_lh": "var(--dxy-line-height-title-1)",
        "--_fw": "var(--dxy-font-weight-title-1)",
        "--_fc": "var(--dxy-color-primary)",
      });
    });
  });

  describe("Additional props spreading", () => {
    it("spreads additional HTML attributes", () => {
      render(
        <Text data-testid="custom-text" id="text-id" className="custom-class">
          Content
        </Text>,
      );
      const element = screen.getByTestId("custom-text");
      expect(element).toHaveAttribute("id", "text-id");
      expect(element).toHaveClass("custom-class");
    });

    it("spreads aria attributes", () => {
      const { container } = render(
        <Text aria-label="Accessible text" role="status">
          Content
        </Text>,
      );
      const element = container.querySelector("span");
      expect(element).toHaveAttribute("aria-label", "Accessible text");
      expect(element).toHaveAttribute("role", "status");
    });

    it("spreads event handlers", () => {
      const handleClick = vi.fn();
      render(<Text onClick={handleClick}>Clickable</Text>);
      const element = screen.getByText("Clickable");
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge cases", () => {
    it("renders with complex children", () => {
      render(
        <Text>
          <strong>Bold</strong> and <em>italic</em> text
        </Text>,
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("renders with numeric children", () => {
      render(<Text>{42}</Text>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("renders with boolean children (renders nothing)", () => {
      const { container } = render(<Text>{true}</Text>);
      const element = container.querySelector("span");
      expect(element).toBeEmptyDOMElement();
    });

    it("renders with null children", () => {
      const { container } = render(<Text>{null}</Text>);
      const element = container.querySelector("span");
      expect(element).toBeEmptyDOMElement();
    });

    it("renders with undefined children", () => {
      const { container } = render(<Text>{undefined}</Text>);
      const element = container.querySelector("span");
      expect(element).toBeEmptyDOMElement();
    });
  });
});
