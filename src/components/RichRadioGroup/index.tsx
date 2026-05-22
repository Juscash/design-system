import React from "react";
import { Radio } from "../Radio";
import { designSystemColors, spacing } from "../../theme";
import type { RichRadioGroupProps } from "../../types/components/Radio";

const LABEL_FONT_SIZE = 13;
const SECONDARY_FONT_SIZE = 10;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 0,
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: spacing[3],
  padding: `${spacing[1]}px 0`,
};

const labelStyle: React.CSSProperties = {
  fontSize: `${LABEL_FONT_SIZE}px`,
  fontWeight: "normal",
  color: designSystemColors.neutral[800],
  lineHeight: 1.2,
  flex: 1,
};

const secondaryTextStyle: React.CSSProperties = {
  fontSize: `${SECONDARY_FONT_SIZE}px`,
  fontWeight: "normal",
  color: designSystemColors.neutral[500],
  lineHeight: 1.2,
  flex: 1,
};

/**
 * Grupo de radios "rich" controlado, com `label` e `secondaryText` por opção.
 * Diferente do `RichRadio` individual, expõe o array `options` para listas.
 */
export function RichRadioGroup({
  options,
  value,
  onChange,
  disabled = false,
  error = false,
  className,
}: RichRadioGroupProps): React.ReactElement {
  return (
    <div className={className} style={containerStyle}>
      {options.map((option) => (
        <div key={option.value} style={itemStyle}>
          <Radio
            checked={value === option.value}
            disabled={disabled || option.disabled}
            error={error}
            onChange={() => onChange?.(option.value)}
          />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={labelStyle}>{option.label}</span>
            {option.secondaryText && <span style={secondaryTextStyle}>{option.secondaryText}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

RichRadioGroup.displayName = "RichRadioGroup";

export type { RichRadioGroupProps, RichRadioOption } from "../../types/components/Radio";
