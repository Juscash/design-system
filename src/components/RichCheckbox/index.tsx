import React from "react";
import { Checkbox } from "../Checkbox";
import type { CheckboxProps } from "../../types/components/Checkbox";
import type { RichCheckboxProps } from "../../types/components/Checkbox";
import "./index.module.css";

/**
 * Versão rica do checkbox: agrupa o componente base com um wrapper visual que
 * mostra `label` e `secondaryText` ao lado, com hover/checked aplicados ao
 * container inteiro. As classes `.rich-checkbox-*` são definidas em
 * `global.css`.
 */
export function RichCheckbox({
  label,
  secondaryText,
  checked,
  onChange,
  ...props
}: RichCheckboxProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange: CheckboxProps["onChange"] = (event) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  const handleWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    // Evita duplo toggle quando o clique é diretamente no checkbox interno.
    if ((event.target as HTMLElement).closest(".ant-checkbox-wrapper")) {
      return;
    }
    const inputEl = event.currentTarget.querySelector<HTMLInputElement>('input[type="checkbox"]');
    inputEl?.click();
  };

  return (
    <div
      className={`rich-checkbox-wrapper ${isChecked ? "rich-checkbox-checked" : ""}`}
      onClick={handleWrapperClick}
    >
      <Checkbox {...props} checked={checked} onChange={handleChange} />
      <div className="rich-checkbox-content">
        <div className="rich-checkbox-label">{label}</div>
        {secondaryText && <div className="rich-checkbox-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}

RichCheckbox.displayName = "RichCheckbox";

export type { RichCheckboxProps } from "../../types/components/Checkbox";
