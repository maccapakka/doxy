/**
 * Props for the Icon component.
 */
export interface IconProps {
  /**
   * The color variant of the icon.
   * Maps to design system color tokens for consistent theming.
   */
  color?: "primary" | "critical" | "neutral" | "white" | "black";

  /**
   * The size of the icon in spacing units.
   * Controls both width and height of the icon container.
   */
  size?: number;

  /**
   * The SVG element to render as the icon.
   * Should be a React component that renders an SVG element.
   */
  svg?: React.ReactElement<SVGElement>;

  /**
   * Additional CSS class names to apply to the icon container.
   * Useful for custom styling or layout adjustments.
   */
  className?: string;
}
