import type { Preview } from "@storybook/react";
import React from "react";
import styles from "../src/tokens/core.module.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={styles.root}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
