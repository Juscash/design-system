"use client";

import React, { useState } from "react";
import { Select as AntdSelect, ConfigProvider, Input as AntdInput } from "antd";
import { Checkbox } from "./Checkbox";
import type { SelectProps as AntdSelectProps } from "antd";
import type { ComponentToken } from "antd/es/select/style/token";
import { designSystemColors, radius } from "../theme";
import { AliasToken } from "antd/es/theme/interface";
import { ChevronsUpDown, Search, Check } from "lucide-react";
import type { DefaultOptionType } from "antd/es/select";

type SelectSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdSelectProps as K extends "size"
    ? never
    : K]: AntdSelectProps[K];
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
  const itemHeights: Record<SelectSize, number> = {
    xs: 24,
    s: 28,
    m: 32,
    l: 36,
  };

  const menuItemHeight = itemHeights[dsSize || "m"];

  if (dsSize === "xs") {
    return {
      componentToken: {},
      globalToken: {
        colorText: designSystemColors.neutral[800],
        borderRadius: radius.md,
        controlHeight: 24,
        fontSize: 13,
      },
      height: 24,
      menuItemHeight,
    };
  }

  const baseControlHeight = dsSize === "s" ? 32 : dsSize === "m" ? 36 : 40;

  return {
    componentToken: {},
    globalToken: {
      borderRadius: radius.xl,
      controlHeight: baseControlHeight,
      colorError: designSystemColors.feedback.red[500],
    },
    height: baseControlHeight,
    menuItemHeight,
  };
}

const baseTokens: Partial<ComponentToken> = {
  activeBorderColor: "transparent",
  hoverBorderColor: "transparent",
  activeOutlineColor: "transparent",

  optionFontSize: 13,
};

export function Select(props: SelectProps): React.ReactElement {
  const {
    dsSize = "m",
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
  const [currentValue, setCurrentValue] = useState<
    SelectProps["value"] | undefined
  >(value ?? defaultValue);
  const resolvedSize = size ? mapToDsSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const combinedClassName = `ds-input-outline ${className || ""}`.trim();

  const isMultiple = rest.mode === "multiple" || rest.mode === "tags";

  const isOptionSelected = (optionValue: string | number | undefined) => {
    if (currentValue === undefined || currentValue === null) return false;

    if (Array.isArray(currentValue)) {
      return currentValue.some((v) => {
        const val =
          typeof v === "object" && v !== null
            ? (v as { value: unknown }).value
            : v;
        return val === optionValue;
      });
    }
    const singleVal =
      typeof currentValue === "object" && currentValue !== null
        ? (currentValue as { value: unknown }).value
        : currentValue;
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

            multipleItemColor: "#262626",

            tagFontSize: 13,
            borderRadiusSM: 8,
          },
        },
        token: {
          ...sizeTokens.globalToken,
          colorBorder: "transparent",
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorTextPlaceholder: designSystemColors.neutral[500],
          borderRadiusLG: 8,
        },
      }}
    >
      <AntdSelect
        {...rest}
        status={status}
        maxTagCount={maxTagCount}
        className={combinedClassName}
        suffixIcon={suffixIcon ?? <ChevronsUpDown size={16} />}
        menuItemSelectedIcon={
          isMultiple ? null : (
            <Check size={16} color={designSystemColors.neutral[800]} />
          )
        }
        showSearch={false}
        searchValue={searchValue}
        style={{
          height: `${sizeTokens.height}px`,
          ["--select-multi-item-border-color" as any]: "#D4D4D4",
          transition: "all 0.2s ease",
          ...style,
        }}
        onChange={(
          val: SelectProps["value"],
          opt: DefaultOptionType | DefaultOptionType[]
        ) => {
          setCurrentValue(val);
          rest.onChange?.(val, opt);
        }}
        optionRender={(option: DefaultOptionType) => {
          const isSelected = isOptionSelected(
            option.value as string | number | undefined
          );

          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isMultiple && (
                <Checkbox
                  checked={isSelected}
                  style={{ pointerEvents: "none" }}
                />
              )}
              <span style={{ flex: 1 }}>{option.label}</span>
            </div>
          );
        }}
        dropdownRender={(menu: React.ReactNode) => (
          <>
            {showSearch && (
              <div
                style={{
                  padding: "4px 8px",
                  borderBottom: "1px solid #D4D4D4",
                  marginBottom: "0px",
                }}
              >
                <AntdInput
                  placeholder="Procurar"
                  prefix={
                    <Search size={15} color={designSystemColors.neutral[500]} />
                  }
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
                    gap: 4,
                  }}
                />
              </div>
            )}
            <div style={{ padding: "4px 0" }}>{menu}</div>
          </>
        )}
      />
    </ConfigProvider>
  );
}
