import { create } from "storybook/theming";

export default create({
  base: "light",
  brandTitle: "Juscash Design System",
  brandUrl: "https://juscash.com.br",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#009C46",
  colorSecondary: "#009C46",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 4,

  // Text colors
  textColor: "#171717",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#737373",
  barSelectedColor: "#009C46",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#e5e5e5",
  inputTextColor: "#171717",
  inputBorderRadius: 4,
});
