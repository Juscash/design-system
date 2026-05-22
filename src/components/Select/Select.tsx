import React, { useState } from "react";
import { Select as AntdSelect, ConfigProvider, Input as AntdInput } from "antd";
import { Checkbox } from "../Checkbox";
import type { SelectProps as AntdSelectProps } from "antd";
import type { ComponentToken } from "antd/es/select/style/token";
import { designSystemColors, radius, spacing } from "../../theme";
import { AliasToken } from "antd/es/theme/interface";
import { ChevronsUpDown, Search, Check } from "lucide-react";
import type { DefaultOptionType } from "antd/es/select";

type SelectSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdSelectProps as K extends "size" ? never : K]: AntdSelectProps[K];
};

export type SelectProps = CleanAntdProps & {
  dsSize?: SelectSize;
  size?: AntdSelectProps["size"];
};

function mapToDsSize(size?: AntdSelectProps["size"]): SelectSize {
  if (size === "small") return "xs";
  if (size === "middle") return "m";
  if (size === "large") return "l";
  return "m";
}

function getSizeTokens(dsSize?: SelectSize): {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
  menuItemHeight: number;
} {
  // Figma: option items são sempre 32px em todos os tamanhos
  const menuItemHeight = 32;

  if (dsSize === "xs") {
    return {
      componentToken: {},
      globalToken: {
        colorText: designSystemColors.neutral[800],
        borderRadius: radius.xl,
        controlHeight: 24,
        fontSize: 13,
      },
      height: 24,
      menuItemHeight,
    };
  }

  const baseControlHeight =
    dsSize === "s" ? 32
    : dsSize === "m" ? 36
    : 40;

  return {
    componentToken: {},
    globalToken: {
      borderRadius: radius.xl,
      controlHeight: baseControlHeight,
      colorError: designSystemColors.feedback.red[500],
      fontSize: 13,
    },
    height: baseControlHeight,
    menuItemHeight,
  };
}

const baseTokens: Partial<ComponentToken> = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeOutlineColor: designSystemColors.neutral[300],

  optionFontSize: 13,
};

export function Select(props: SelectProps): React.ReactElement {
  const {
    dsSize: dsSizeProp,
    size,
    style,
    className,
    suffixIcon,
    showSearch,
    maxTagCount = "responsive",
    value,
    status,
    defaultValue,
    ...rest
  } = props;

  const [searchValue, setSearchValue] = useState("");
  const [currentValue, setCurrentValue] = useState<SelectProps["value"] | undefined>(value ?? defaultValue);
  // dsSize tem prioridade absoluta; size é apenas fallback para compatibilidade com AntD
  const resolvedSize: SelectSize = dsSizeProp ?? (size ? mapToDsSize(size) : "m");
  const sizeTokens = getSizeTokens(resolvedSize);

  const isMultiple = rest.mode === "multiple" || rest.mode === "tags";

  const isOptionSelected = (optionValue: string | number | undefined) => {
    if (currentValue === undefined || currentValue === null) return false;

    if (Array.isArray(currentValue)) {
      return currentValue.some((v) => {
        const val = typeof v === "object" && v !== null ? (v as { value: unknown }).value : v;
        return val === optionValue;
      });
    }
    const singleVal =
      typeof currentValue === "object" && currentValue !== null ? (currentValue as { value: unknown }).value : currentValue;
    return singleVal === optionValue;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            ...baseTokens,
            ...sizeTokens.componentToken,
            multipleItemBorderColor: "#D4D4D4",
            optionHeight: sizeTokens.menuItemHeight,
            optionPadding: "4px 8px",
            colorText: "rgba(38, 38, 38, 1)",
            colorBgElevated: "rgba(250, 250, 250, 1)",
            optionSelectedFontWeight: 400,
            optionSelectedBg: designSystemColors.neutral[200],
            multipleItemBg: "rgba(255, 255, 255, 0.01)",
            borderRadiusSM: 8,
            colorErrorOutline: "rgba(210, 25, 11, 0.4)",
            activeOutlineColor: designSystemColors.neutral[300],
          },
        },
        token: {
          ...sizeTokens.globalToken,
          colorBorder: designSystemColors.neutral[300],
          colorError: designSystemColors.feedback.red[500],
          colorErrorOutline: "rgba(210, 25, 11, 0.4)",
          controlOutlineWidth: 3,
          controlOutline: designSystemColors.neutral[300],
          colorTextDisabled: designSystemColors.neutral[400],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorTextPlaceholder: designSystemColors.neutral[500],
          // Figma: background neutral[50] e texto neutral[800]
          colorBgContainer: designSystemColors.neutral[50],
          colorText: designSystemColors.neutral[800],
          borderRadiusLG: 8,
        },
      }}
    >
      <AntdSelect
        {...rest}
        status={status}
        maxTagCount={maxTagCount}
        className={[`ds-select`, `ds-select-${resolvedSize}`, className].filter(Boolean).join(" ")}
        defaultValue={defaultValue}
        suffixIcon={suffixIcon ?? <ChevronsUpDown size={16} color={designSystemColors.neutral[800]} />}
        menuItemSelectedIcon={isMultiple ? null : <Check size={16} color={designSystemColors.neutral[800]} />}
        showSearch={false}
        searchValue={searchValue}
        styles={{
          prefix: {
            marginRight: spacing[2],
            color: designSystemColors.neutral[800],
            display: "flex",
            alignItems: "center",
          },
          suffix: {
            color: designSystemColors.neutral[800],
            display: "flex",
            alignItems: "center",
          },
        }}
        style={{
          ["--select-multi-item-border-color" as any]: "#D4D4D4",
          ["--ds-select-height" as any]: `${sizeTokens.height}px`,
          transition: "all 0.2s ease",
          ...style,
        }}
        onChange={(val: SelectProps["value"], opt: DefaultOptionType | DefaultOptionType[] | undefined) => {
          setCurrentValue(val);
          rest.onChange?.(val, opt);
        }}
        optionRender={(option: DefaultOptionType) => {
          const isSelected = isOptionSelected(option.value as string | number | undefined);

          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isMultiple && <Checkbox checked={isSelected} style={{ pointerEvents: "none" }} />}
              <span style={{ flex: 1 }}>{option.label}</span>
            </div>
          );
        }}
        popupRender={(menu: React.ReactNode) => (
          <>
            {showSearch && (
              <div className="ds-select-search-container">
                <AntdInput
                  className="ds-select-search-input"
                  placeholder="Procurar"
                  prefix={<Search size={15} color={designSystemColors.neutral[500]} />}
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setSearchValue(value);
                  }}
                  variant="borderless"
                  style={{
                    fontSize: "13px",
                    color: designSystemColors.neutral[800],
                    padding: 0,
                    gap: 8,
                  }}
                />
              </div>
            )}
            <div className="ds-select-popup-menu">{menu}</div>
          </>
        )}
      />
    </ConfigProvider>
  );
}
