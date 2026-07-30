import React, { useState } from "react";
import { Select as AntdSelect, ConfigProvider, Input as AntdInput } from "antd";
import type { AliasToken } from "antd/es/theme/interface";
import type { DefaultOptionType } from "antd/es/select";
import { Check, ChevronsUpDown, FolderOpen, Search } from "lucide-react";
import { Checkbox } from "../Checkbox";
import { EmptyState } from "../EmptyState";
import { designSystemColors, radius, spacing } from "../../theme";
import type { SelectProps, SelectSize } from "../../types/components/Select";
import "./index.module.css";

const WRAPPER_CLASS = "ds-select-wrapper";
const WRAPPER_ERROR_CLASS = "ds-select-wrapper--error";
const WRAPPER_DISABLED_CLASS = "ds-select-wrapper--disabled";
const LABEL_CLASS = "ds-select-label";
const HELPER_CLASS = "ds-select-helper";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const HEIGHT_L = 40;
const MENU_ITEM_HEIGHT = 32;
const OPTION_FONT_SIZE = 13;
const ICON_SIZE = 16;
const OUTLINE_WIDTH = 3;
const FONT_WEIGHT_REGULAR = 400;
// Anel de erro do Figma (`focus-error` = #D2190B66 = alpha 0.4). Escopado
// localmente no Select para não depender do token compartilhado.
const COLOR_ERROR_OUTLINE = "rgba(210, 25, 11, 0.4)";
const COLOR_TRANSPARENT_WHITE = "rgba(255, 255, 255, 0.01)";
const EMPTY_STATE_ICON_SIZE = 24;
const EMPTY_STATE_ICON_STROKE_WIDTH = 1.75;
const NOT_FOUND_TITLE = "Nenhum resultado encontrado.";

type SelectThemeConfig = NonNullable<React.ComponentProps<typeof ConfigProvider>["theme"]>;
type SelectValue = string | number | undefined;

interface SizeTokensResult {
  globalToken: Partial<AliasToken>;
  height: number;
  boxRadius: number;
  menuItemHeight: number;
}

/**
 * Mapeia o `size` (`xs|s|m|l`) para altura (24/32/36/40) e radius da caixa
 * (`md` no xs, `xl` nos demais). Fonte do value/option fixa em 13px (Figma).
 */
function getSizeTokens(size: SelectSize): SizeTokensResult {
  const heightBySize: Record<SelectSize, number> = { xs: HEIGHT_XS, s: HEIGHT_S, m: HEIGHT_M, l: HEIGHT_L };
  const height = heightBySize[size];
  const boxRadius = size === "xs" ? radius.md : radius.xl;
  return {
    globalToken: { borderRadius: boxRadius, controlHeight: height, fontSize: OPTION_FONT_SIZE },
    height,
    boxRadius,
    menuItemHeight: MENU_ITEM_HEIGHT,
  };
}

const baseTokens = {
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeOutlineColor: designSystemColors.neutral[300],
  optionFontSize: OPTION_FONT_SIZE,
};

interface OptionRenderArgs {
  isMultiple: boolean;
  isOptionSelected: (value: SelectValue) => boolean;
}

/**
 * Conteúdo de cada opção. No modo múltiplo, antepõe um Checkbox refletindo a
 * seleção (padrão do MultiSelect). No single, marca a opção selecionada com
 * um ícone de check à direita (o fundo cinza já vem do token
 * `optionSelectedBg`; o Antd não desenha ícone próprio porque
 * `menuItemSelectedIcon` é `null` para não duplicar no modo múltiplo).
 */
function renderOptionContent(option: DefaultOptionType, args: OptionRenderArgs): React.ReactNode {
  const isSelected = args.isOptionSelected(option.value as SelectValue);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing[2], width: "100%" }}>
      {args.isMultiple && <Checkbox checked={isSelected} style={{ pointerEvents: "none" }} />}
      <span style={{ flex: 1 }}>{option.label}</span>
      {!args.isMultiple && isSelected && <Check aria-hidden size={ICON_SIZE} />}
    </div>
  );
}

interface PopupRenderArgs {
  menu: React.ReactNode;
  showSearch: SelectProps["showSearch"];
  searchValue: string;
  setSearchValue: (value: string) => void;
}

/**
 * Popup do dropdown. Quando `showSearch`, exibe a linha de busca do Figma
 * (ícone 16px + "Procurar", borda inferior) acima da lista de opções.
 */
function renderPopup({ menu, showSearch, searchValue, setSearchValue }: PopupRenderArgs): React.ReactElement {
  return (
    <>
      {showSearch && (
        <div className="ds-select-search-container">
          <AntdInput
            className="ds-select-search-input"
            placeholder="Procurar"
            prefix={<Search size={ICON_SIZE} color={designSystemColors.neutral[500]} />}
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            variant="borderless"
            style={{ fontSize: `${OPTION_FONT_SIZE}px`, color: designSystemColors.neutral[800], padding: 0, gap: spacing[2] }}
          />
        </div>
      )}
      <div className="ds-select-popup-menu">{menu}</div>
    </>
  );
}

/**
 * Estado vazio padrão do dropdown (sem opções/sem resultado de busca) — ícone
 * `folder-open` + título, conforme o Figma (`Menu/combobox`, `Property
 * 1=no results`). Substitui o "No Data" padrão do Antd.
 */
function DefaultSelectEmptyState(): React.ReactElement {
  return (
    <EmptyState
      icon={<FolderOpen size={EMPTY_STATE_ICON_SIZE} strokeWidth={EMPTY_STATE_ICON_STROKE_WIDTH} />}
      title={NOT_FOUND_TITLE}
      style={{ width: "100%", padding: spacing[4] }}
    />
  );
}

function isValueSelected(currentValue: SelectProps["value"], optionValue: SelectValue): boolean {
  if (currentValue === undefined || currentValue === null) return false;
  const unwrap = (entry: unknown): unknown =>
    typeof entry === "object" && entry !== null ? (entry as { value: unknown }).value : entry;
  if (Array.isArray(currentValue)) return currentValue.some((entry) => unwrap(entry) === optionValue);
  return unwrap(currentValue) === optionValue;
}

function optionMatches(option: DefaultOptionType, query: string): boolean {
  const label = typeof option.label === "string" ? option.label : "";
  return label.toLowerCase().includes(query);
}

/**
 * Filtra opções (planas ou agrupadas) pelo texto da busca, em client-side —
 * mantém a busca do dropdown funcional sem o input nativo do Antd.
 */
function filterOptions(options: DefaultOptionType[] | undefined, search: string): DefaultOptionType[] | undefined {
  if (!search) return options;
  const query = search.toLowerCase();
  const result: DefaultOptionType[] = [];
  for (const option of options ?? []) {
    const children = option.options as DefaultOptionType[] | undefined;
    if (children) {
      const matched = children.filter((child) => optionMatches(child, query));
      if (matched.length > 0) result.push({ ...option, options: matched });
    } else if (optionMatches(option, query)) {
      result.push(option);
    }
  }
  return result;
}

/**
 * Tema local do Select: tokens de opção (altura 32, padding 4/8, hover e
 * selected em `neutral.200`), cores de borda/erro/disabled e o anel de erro
 * `0.4` conforme o Figma.
 */
function buildSelectTheme(globalToken: Partial<AliasToken>, menuItemHeight: number): SelectThemeConfig {
  return {
    components: {
      Select: {
        ...baseTokens,
        optionHeight: menuItemHeight,
        optionPadding: "4px 8px",
        optionSelectedBg: designSystemColors.neutral[200],
        optionActiveBg: designSystemColors.neutral[200],
        optionSelectedFontWeight: FONT_WEIGHT_REGULAR,
        colorText: designSystemColors.neutral[800],
        colorBgElevated: designSystemColors.neutral[50],
        multipleItemBorderColor: designSystemColors.neutral[300],
        multipleItemBg: COLOR_TRANSPARENT_WHITE,
        borderRadiusSM: radius.xl,
        colorErrorOutline: COLOR_ERROR_OUTLINE,
      },
    },
    token: {
      ...globalToken,
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

type SelectStyle = React.CSSProperties & Record<`--${string}`, string>;

// Cor de prefix/suffix (ícones) é controlada via CSS (`currentColor`), para
// que o estado `disabled` consiga mutá-los conforme o Figma.
const selectPrefixSuffixStyles = {
  prefix: { marginRight: spacing[2], display: "flex", alignItems: "center" },
  suffix: { display: "flex", alignItems: "center" },
} as const;

/** Aplica altura e radius (por size) à caixa via CSS variables. */
function buildBoxStyle(height: number, boxRadius: number, style?: React.CSSProperties): SelectStyle {
  return { "--ds-select-height": `${height}px`, "--ds-select-radius": `${boxRadius}px`, ...style };
}

function buildWrapperClassName(isError: boolean, isDisabled: boolean): string {
  return [WRAPPER_CLASS, isError ? WRAPPER_ERROR_CLASS : "", isDisabled ? WRAPPER_DISABLED_CLASS : ""].filter(Boolean).join(" ");
}

function buildSelectClassName(size: SelectSize, className: string | undefined): string {
  return ["ds-select", `ds-select-${size}`, className].filter(Boolean).join(" ");
}

type SelectFieldProps = Omit<SelectProps, "label" | "helperText" | "id"> & {
  selectId: string;
  tokens: SizeTokensResult;
};

/**
 * Campo interno (Antd Select + estado de busca/valor). Separado do wrapper de
 * `label`/`helperText` para manter cada função dentro do limite de linhas.
 */
function SelectField(props: SelectFieldProps): React.ReactElement {
  const {
    selectId,
    tokens,
    size = "m",
    style,
    className,
    suffixIcon,
    showSearch,
    maxTagCount = "responsive",
    status,
    disabled,
    defaultValue,
    options,
    notFoundContent,
    ...rest
  } = props;

  const [searchValue, setSearchValue] = useState("");
  const [currentValue, setCurrentValue] = useState<SelectProps["value"]>(rest.value ?? defaultValue);
  const isMultiple = rest.mode === "multiple" || rest.mode === "tags";
  const effectiveValue = rest.value !== undefined ? rest.value : currentValue;
  const visibleOptions = showSearch ? filterOptions(options as DefaultOptionType[] | undefined, searchValue) : options;

  return (
    <AntdSelect
      {...rest}
      id={selectId}
      status={status}
      disabled={disabled}
      options={visibleOptions}
      notFoundContent={notFoundContent ?? <DefaultSelectEmptyState />}
      maxTagCount={maxTagCount}
      defaultValue={defaultValue}
      className={buildSelectClassName(size, className)}
      suffixIcon={suffixIcon ?? <ChevronsUpDown size={ICON_SIZE} />}
      menuItemSelectedIcon={null}
      showSearch={false}
      searchValue={searchValue}
      styles={selectPrefixSuffixStyles}
      style={buildBoxStyle(tokens.height, tokens.boxRadius, style)}
      onChange={(val, opt) => {
        setCurrentValue(val);
        rest.onChange?.(val, opt);
      }}
      optionRender={(option) => renderOptionContent(option, { isMultiple, isOptionSelected: (v) => isValueSelected(effectiveValue, v) })}
      popupRender={(menu) => renderPopup({ menu, showSearch, searchValue, setSearchValue })}
    />
  );
}

/**
 * Select do design system. Embrulha o Antd Select com os tokens do Figma e
 * compõe a pilha `label` (16px) → campo → `helperText` (13px), com gaps de
 * 8px. Suffix `ChevronsUpDown`, opções 13px e dropdown com busca opcional.
 */
export function Select(props: SelectProps): React.ReactElement {
  const { size = "m", status, disabled, label, helperText, id, ...rest } = props;
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const tokens = getSizeTokens(size);

  return (
    <ConfigProvider theme={buildSelectTheme(tokens.globalToken, tokens.menuItemHeight)}>
      <div className={buildWrapperClassName(status === "error", Boolean(disabled))}>
        {label !== undefined && label !== null ?
          <label className={LABEL_CLASS} htmlFor={selectId}>
            {label}
          </label>
        : null}
        <SelectField {...rest} size={size} status={status} disabled={disabled} selectId={selectId} tokens={tokens} />
        {helperText !== undefined && helperText !== null ?
          <span className={HELPER_CLASS}>{helperText}</span>
        : null}
      </div>
    </ConfigProvider>
  );
}

Select.displayName = "Select";

export type { SelectProps, SelectSize } from "../../types/components/Select";
