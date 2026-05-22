import type { CheckboxProps } from "../Checkbox";

export type RichCheckboxProps = CheckboxProps & {
  label: string;
  secondaryText?: string;
};
