import React, { useState } from "react";
import { Select as AntdSelect, ConfigProvider, Input as AntdInput } from "antd";
import type { SelectProps as AntdSelectProps } from "antd";
import type { ComponentToken } from "antd/es/select/style/token";
import type { AliasToken } from "antd/es/theme/interface";
import type { DefaultOptionType } from "antd/es/select";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Checkbox } from "../Checkbox";
import { designSystemColors, radius, spacing } from "../../theme";
import type { SelectProps, SelectSize } from "../../types/components/Select";
import "./index.module.css";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const HEIGHT_L = 40;
const MENU_ITEM_HEIGHT = 32;
const OPTION_FONT_SIZE = 13;
const SEARCH_ICON_SIZE = 15;
const SUFFIX_ICON_SIZE = 16;
const OUTLINE_WIDTH = 3;
const MULTI_ITEM_BORDER_COLOR = designSystemColors.neutral[300];
const COLOR_ERROR_OUTLINE = "rgba(210, 25, 11, 0.4)";
const COLOR_TRANSPARENT_WHITE = "rgba(255, 255, 255, 0.01)";

interface SizeTokensResult {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
  menuItemHeight: number;
}

function mapToDsSize(size?: AntdSelectProps["size"]): SelectSize {
  if (size === "small") return "xs";
  if (size === "middle") return "m";
  if (size === "large") return "l";
  return "m";
}

function getSizeTokens(dsSize?: SelectSize): SizeTokensResult {
  if (dsSize === "xs") {
    return {
      componentToken: {},
      globalToken: {
        colorText: designSystemColors.neutral[800],
        borderRadius: radius.xl,
        controlHeight: HEIGHT_XS,
        fontSize: OPTION_FONT_SIZE,
      },
      height: HEIGHT_XS,
      menuItemHeight: MENU_ITEM_HEIGHT,
    };
  }

  const heightBySize: Record<Exclude<SelectSize, "xs">, number> = {
    s: HEIGHT_S,
    m: HEIGHT_M,
    l: HEIGHT_L,
  };
  const baseControlHeight = heightBySize[dsSize ?? "m"];
  return {
    componentToken: {},
    globalToken: {
      borderRadius: radius.xl,
      controlHeight: baseControlHeight,
      colorError: designSystemColors.feedback.red[500],
      fontSize: OPTION_FONT_SIZE,
    },
    height: baseControlHeight,
    menuItemHeight: MENU_ITEM_HEIGHT,
  };
}

type SelectInteractionsToken = Partial<ComponentToken> & Record<string, unknown>;

const baseTokens: SelectInteractionsToken = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeOutlineColor: designSystemColors.neutral[300],
  optionFontSize: OPTION_FONT_SIZE,
};

interface OptionRenderArgs {
  isMultiple: boolean;
  isOptionSelected: (value: string | number | undefined) => boolean;
}

function renderOptionContent(option: DefaultOptionType, args: OptionRenderArgs): React.ReactNode {
  const isSelected = args.isOptionSelected(option.value as string | number | undefined);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
      {args.isMultiple && <Checkbox checked={isSelected} style={{ pointerEvents: "none" }} />}
      <span style={{ flex: 1 }}>{option.label}</span>
    </div>
  );
}

interface PopupRenderArgs {
  menu: React.ReactNode;
  showSearch: SelectProps["showSearch"];
  searchValue: string;
  setSearchValue: (value: string) => void;
}

function renderPopup({ menu, showSearch, searchValue, setSearchValue }: PopupRenderArgs): React.ReactElement {
  return (
    <>
      {showSearch && (
        <div className="ds-select-search-container">
          <AntdInput
            className="ds-select-search-input"
            placeholder="Procurar"
            prefix={<Search size={SEARCH_ICON_SIZE} color={designSystemColors.neutral[500]} />}
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            variant="borderless"
            style={{
              fontSize: `${OPTION_FONT_SIZE}px`,
              color: designSystemColors.neutral[800],
              padding: 0,
              gap: spacing[2],
            }}
          />
        </div>
      )}
      <div className="ds-select-popup-menu">{menu}</div>
    </>
  );
}

function isValueSelected(currentValue: SelectProps["value"], optionValue: string | number | undefined): boolean {
  if (currentValue === undefined || currentValue === null) return false;

  if (Array.isArray(currentValue)) {
    return currentValue.some((entry) => {
      const inner = typeof entry === "object" && entry !== null ? (entry as { value: unknown }).value : entry;
      return inner === optionValue;
    });
  }
  const singleVal =
    typeof currentValue === "object" && currentValue !== null
      ? (currentValue as { value: unknown }).value
      : currentValue;
  return singleVal === optionValue;
}

type SelectStyle = React.CSSProperties & Record<`--${string}`, string>;

interface SelectThemeArgs {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  menuItemHeight: number;
}

function buildSelectTheme(args: SelectThemeArgs): NonNullable<React.ComponentProps<typeof ConfigProvider>["theme"]> {
  return {
    components: {
      Select: {
        ...baseTokens,
        ...args.componentToken,
        multipleItemBorderColor: MULTI_ITEM_BORDER_COLOR,
        optionHeight: args.menuItemHeight,
        optionPadding: "4px 8px",
        colorText: designSystemColors.neutral[800],
        colorBgElevated: designSystemColors.neutral[50],
        optionSelectedFontWeight: 400,
        optionSelectedBg: designSystemColors.neutral[200],
        multipleItemBg: COLOR_TRANSPARENT_WHITE,
        borderRadiusSM: radius.xl,
        colorErrorOutline: COLOR_ERROR_OUTLINE,
        activeOutlineColor: designSystemColors.neutral[300],
      },
    },
    token: {
      ...args.globalToken,
      colorBorder: designSystemColors.neutral[300],
      colorError: designSystemColors.feedback.red[500],
      colorErrorOutline: COLOR_ERROR_OUTLINE,
      controlOutlineWidth: OUTLINE_WIDTH,
      controlOutline: designSystemColors.neutral[300],
      colorTextDisabled: designSystemColors.neutral[400],
      colorBgContainerDisabled: designSystemColors.neutral[50],
      colorTextPlaceholder: designSystemColors.neutral[500],
      colorBgContainer: designSystemColors.neutral[50],
      colorText: designSystemColors.neutral[800],
      borderRadiusLG: radius.xl,
    },
  };
}

const selectPrefixSuffixStyles = {
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
} as const;

function buildWrapperStyle(height: number, style?: React.CSSProperties): SelectStyle {
  return {
    "--select-multi-item-border-color": MULTI_ITEM_BORDER_COLOR,
    "--ds-select-height": `${height}px`,
    transition: "all 0.2s ease",
    ...style,
  };
}

function resolveDsSize(dsSizeProp: SelectSize | undefined, size: SelectProps["size"] | undefined): SelectSize {
  // `dsSize` tem prioridade absoluta; `size` é fallback de compatibilidade.
  if (dsSizeProp) return dsSizeProp;
  if (size) return mapToDsSize(size);
  return "m";
}

/**
 * Select do design system. Aceita `dsSize` (`xs|s|m|l`) e `size` para
 * compatibilidade com Antd; reescreve sufixo/checkmark com ícones do Lucide,
 * embute o input de busca quando `showSearch=true` e padroniza chips em
 * múltipla seleção via CSS module.
 */
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
  const resolvedSize = resolveDsSize(dsSizeProp, size);
  const sizeTokens = getSizeTokens(resolvedSize);
  const isMultiple = rest.mode === "multiple" || rest.mode === "tags";
  const isOptionSelected = (optionValue: string | number | undefined): boolean =>
    isValueSelected(currentValue, optionValue);

  return (
    <ConfigProvider theme={buildSelectTheme(sizeTokens)}>
      <AntdSelect
        {...rest}
        status={status}
        maxTagCount={maxTagCount}
        className={["ds-select", `ds-select-${resolvedSize}`, className].filter(Boolean).join(" ")}
        defaultValue={defaultValue}
        suffixIcon={suffixIcon ?? <ChevronsUpDown size={SUFFIX_ICON_SIZE} color={designSystemColors.neutral[800]} />}
        menuItemSelectedIcon={isMultiple ? null : <Check size={SUFFIX_ICON_SIZE} color={designSystemColors.neutral[800]} />}
        showSearch={false}
        searchValue={searchValue}
        styles={selectPrefixSuffixStyles}
        style={buildWrapperStyle(sizeTokens.height, style)}
        onChange={(val, opt) => {
          setCurrentValue(val);
          rest.onChange?.(val, opt);
        }}
        optionRender={(option) => renderOptionContent(option, { isMultiple, isOptionSelected })}
        popupRender={(menu) => renderPopup({ menu, showSearch, searchValue, setSearchValue })}
      />
    </ConfigProvider>
  );
}

Select.displayName = "Select";

export type { SelectProps, SelectSize } from "../../types/components/Select";
