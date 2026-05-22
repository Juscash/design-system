import React from "react";
import { Switch } from "../Switch";
import type { SwitchProps } from "../../types/components/Switch";
import type { RichSwitchProps } from "../../types/components/RichSwitch";
import "./index.module.css";

/**
 * Versão rica do switch: agrupa o componente base com um wrapper visual com
 * `label` + `secondaryText` ao lado, com hover/checked aplicados ao container
 * inteiro.
 */
export function RichSwitch({
  label,
  secondaryText,
  checked,
  onChange,
  ...props
}: RichSwitchProps): React.ReactElement {
  const [isChecked, setIsChecked] = React.useState(checked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange: SwitchProps["onChange"] = (nextChecked, event) => {
    setIsChecked(nextChecked);
    onChange?.(nextChecked, event);
  };

  const handleWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    // Evita duplo toggle quando o clique é diretamente no switch interno.
    if ((event.target as HTMLElement).closest(".ant-switch")) {
      return;
    }
    const switchEl = event.currentTarget.querySelector<HTMLButtonElement>(".ant-switch");
    switchEl?.click();
  };

  return (
    <div
      className={`rich-switch-wrapper ${isChecked ? "rich-switch-checked" : ""}`}
      onClick={handleWrapperClick}
    >
      <Switch {...props} checked={checked} onChange={handleChange} />
      <div className="rich-switch-content">
        <div className="rich-switch-label">{label}</div>
        {secondaryText && <div className="rich-switch-secondary">{secondaryText}</div>}
      </div>
    </div>
  );
}

RichSwitch.displayName = "RichSwitch";

export type { RichSwitchProps } from "../../types/components/RichSwitch";
