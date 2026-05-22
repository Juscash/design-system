import React from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";

export type RichCheckboxProps = CheckboxProps & {
  label: string;
  secondaryText?: string;
};

export function RichCheckbox({ label, secondaryText, checked, onChange, ...props }: RichCheckboxProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  const handleChange: CheckboxProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  return (
    <div
      className={`rich-checkbox-wrapper ${isChecked ? "rich-checkbox-checked" : ""}`}
      onClick={(e) => {
        // Previne duplo toggle se clicar no checkbox
        if ((e.target as HTMLElement).closest(".ant-checkbox-wrapper")) {
          return;
        }
        const checkbox = e.currentTarget.querySelector<HTMLInputElement>('input[type="checkbox"]');
        checkbox?.click();
      }}
    >
      <Checkbox {...props} checked={checked} onChange={handleChange} />
      <div className="rich-checkbox-content">
        <div className="rich-checkbox-label">{label}</div>
        {secondaryText && <div className="rich-checkbox-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}
