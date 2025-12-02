"use client";

import classNames from "classnames";
import styles from "./Icon.module.css";

export interface IconProps {
  color?: "primary" | "critical" | "neutral" | "white" | "black";
  size?: number;
  svg?: React.ReactElement<SVGElement>;
  className?: string;
}

export const Icon = ({ color, size, svg, className }: IconProps) => {
  return (
    <div
      className={classNames(styles.root, className)}
      aria-hidden="true"
      style={
        {
          "--_is": size,
          "--_ic": color ? `var(--dxy-color-${color})` : undefined,
        } as React.CSSProperties
      }
    >
      {svg}
    </div>
  );
};
