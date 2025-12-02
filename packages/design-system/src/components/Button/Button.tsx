"use client";

import type { ElementType, ReactNode } from "react";
import { useId } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export interface ButtonProps {
  as?: ElementType;
  children?: ReactNode;
  active?: boolean;
  icon?: ReactNode;
  color?: "primary" | "secondary" | "critical";
  tooltip?: string;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Button = ({
  as,
  children,
  icon,
  active = false,
  color = "primary",
  tooltip,
  onClick,
  ...rest
}: ButtonProps) => {
  const Component = as || "button";
  const tooltipId = useId();

  const rootClassNames = classNames(
    styles.root,
    styles[color],
    active && styles.active,
    tooltip && styles.hasTooltip,
  );

  return (
    <Component
      className={rootClassNames}
      onClick={onClick}
      {...(tooltip && { "aria-describedby": tooltipId })}
      {...rest}
    >
      {icon}
      {children}
      {tooltip && (
        <span id={tooltipId} className={styles.tooltip} role="tooltip">
          {tooltip}
        </span>
      )}
    </Component>
  );
};
