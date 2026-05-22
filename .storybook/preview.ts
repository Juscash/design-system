import type { Preview } from "@storybook/nextjs-vite";
import React, { useEffect } from "react";
import { JuscashProvider } from "@juscash/design-system";
import "@juscash/design-system/dist/index.css";

const AppRouterDecorator = ({ Story }: { Story: React.ComponentType }) => {
  useEffect(() => {
    document.documentElement.lang = "pt-BR";
    document.documentElement.style.setProperty("--font-inter", "Inter");
    document.documentElement.style.setProperty("--font-roboto", "Roboto");
    document.body.classList.add("sb-app-router");
    return () => {
      document.body.classList.remove("sb-app-router");
    };
  }, []);

  return React.createElement(
    "div",
    { className: "sb-app-router" },
    React.createElement(JuscashProvider, null, React.createElement(Story)),
  );
};

const preview: Preview = {
  decorators: [(Story) => React.createElement(AppRouterDecorator, { Story })],
  parameters: {
    docs: {
      codePanel: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        method: "alphabetical",
      },
    },

    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
