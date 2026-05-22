import React from "react";
import { Radio } from "../Radio";
import type { RadioProps } from "../../types/components/Radio";
import type { RichRadioProps } from "../../types/components/RichRadio";
import "./index.module.css";

/**
 * Versão rica do radio: agrupa o componente base com um wrapper visual com
 * `label` + `secondaryText` ao lado.
 */
export function RichRadio({
  label,
  secondaryText,
  checked,
  onChange,
  ...props
}: RichRadioProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange: RadioProps["onChange"] = (event) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  const handleWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    // Evita duplo toggle quando o clique é diretamente no radio interno.
    if ((event.target as HTMLElement).closest(".ant-radio-wrapper")) {
      return;
    }
    const inputEl = event.currentTarget.querySelector<HTMLInputElement>('input[type="radio"]');
    inputEl?.click();
  };

  return (
    <div
      className={`rich-radio-wrapper ${isChecked ? "rich-radio-checked" : ""}`}
      onClick={handleWrapperClick}
    >
      <Radio {...props} checked={checked} onChange={handleChange} />
      <div className="rich-radio-content">
        <div className="rich-radio-label">{label}</div>
        {secondaryText && <div className="rich-radio-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}

RichRadio.displayName = "RichRadio";

export type { RichRadioProps } from "../../types/components/RichRadio";
