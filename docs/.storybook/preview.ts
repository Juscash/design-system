import type { Preview } from "@storybook/react-vite";
import "../../packages/design-system/src/theme/global.css";

const preview: Preview = {
  parameters: {
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
      viewports: {
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
  },
  globalTypes: {
    locale: {
      description: "Internationalization locale",
      defaultValue: "pt-BR",
      toolbar: {
        icon: "globe",
        items: [
          { value: "pt-BR", right: "🇧🇷", title: "Português" },
          { value: "en", right: "🇺🇸", title: "English" },
        ],
      },
    },
  },
};

export default preview;
