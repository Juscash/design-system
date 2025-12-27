"use client";

import React, { useState } from "react";
import { Select as AntdSelect, ConfigProvider, Input as AntdInput } from "antd";
import type { SelectProps as AntdSelectProps } from "antd";
import type { ComponentToken } from "antd/es/select/style/token";
import { designSystemColors, radius } from "../theme";
import { AliasToken } from "antd/es/theme/interface";
import { ChevronsUpDown, Search } from "lucide-react";

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
    ...rest
  } = props;

  const [searchValue, setSearchValue] = useState("");

  const resolvedSize = size ? mapToDsSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const combinedClassName = `ds-input-outline ${className || ""}`.trim();

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            ...baseTokens,
            ...sizeTokens.componentToken,
            optionHeight: sizeTokens.menuItemHeight,
            optionPadding: "4px 8px",
            colorText: "rgba(38, 38, 38, 1)",
            colorBgElevated: "rgba(250, 250, 250, 1)",
            optionSelectedFontWeight: 400,
            optionSelectedBg: designSystemColors.neutral[200],
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
        className={combinedClassName}
        suffixIcon={suffixIcon ?? <ChevronsUpDown size={16} />}
        showSearch={false}
        searchValue={searchValue}
        style={{
          height: `${sizeTokens.height}px`,
          ...style,
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
