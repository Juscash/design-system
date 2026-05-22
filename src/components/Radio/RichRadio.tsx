import React from "react";
import { Radio, type RadioProps } from "./Radio";

export type RichRadioProps = RadioProps & {
  label: string;
  secondaryText?: string;
};

export function RichRadio({ label, secondaryText, checked, onChange, ...props }: RichRadioProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  const handleChange: RadioProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  return (
    <div
      className={`rich-radio-wrapper ${isChecked ? "rich-radio-checked" : ""}`}
      onClick={(e) => {
        // Previne duplo toggle se clicar no radio
        if ((e.target as HTMLElement).closest(".ant-radio-wrapper")) {
          return;
        }
        const radio = e.currentTarget.querySelector<HTMLInputElement>('input[type="radio"]');
        radio?.click();
      }}
    >
      <Radio {...props} checked={checked} onChange={handleChange} />
      <div className="rich-radio-content">
        <div className="rich-radio-label">{label}</div>
        {secondaryText && <div className="rich-radio-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}
