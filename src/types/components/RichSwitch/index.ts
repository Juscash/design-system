import type { SwitchProps } from "../Switch";

export type RichSwitchProps = SwitchProps & {
  label: string;
  secondaryText?: string;
};
