import React from "react";
import { Switch, type SwitchProps } from "./Switch";

export type RichSwitchProps = SwitchProps & {
  label: string;
  secondaryText?: string;
};

export function RichSwitch({ label, secondaryText, checked, onChange, ...props }: RichSwitchProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  const handleChange: SwitchProps["onChange"] = (checked, event) => {
    setIsChecked(checked);
    onChange?.(checked, event);
  };

  return (
    <div
      className={`rich-switch-wrapper ${isChecked ? "rich-switch-checked" : ""}`}
      onClick={(e) => {
        // Previne duplo toggle se clicar no switch
        if ((e.target as HTMLElement).closest(".ant-switch")) {
          return;
        }
        const switchEl = e.currentTarget.querySelector<HTMLButtonElement>(".ant-switch");
        switchEl?.click();
      }}
    >
      <Switch {...props} checked={checked} onChange={handleChange} />
      <div className="rich-switch-content">
        <div className="rich-switch-label">{label}</div>
        {secondaryText && <div className="rich-switch-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}
