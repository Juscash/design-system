import React from "react";
import { ConfigProvider, Select as AntdSelect } from "antd";
import { designSystemColors, radius } from "../../../../theme";

const BASE_CLASS = "ds-pagination-size-changer";
const SIZE_CHANGER_PREFIX = "Itens por página: ";
const DEFAULT_PAGE_SIZE_OPTIONS = ["5", "10", "25", "50", "100"];

export interface PaginationSizeChangerProps {
  /** Tamanho de página atual (valor selecionado). */
  pageSize: number;
  /** Opções do seletor. Default `['5','10','25','50','100']`. */
  pageSizeOptions?: Array<string | number>;
  /** Callback ao escolher um novo tamanho de página. */
  onChange: (size: number) => void;
  /** Classe extra aplicada ao Select (ex.: variante do footer do Table). */
  className?: string;
}

/**
 * Tokens do `Select` usados pelo size changer da paginação. Mantém o visual
 * do Figma `Data table > pagination > select 165x36`.
 */
function getSelectTokens() {
  return {
    activeBorderColor: designSystemColors.neutral[300],
    hoverBorderColor: designSystemColors.neutral[300],
    activeOutlineColor: designSystemColors.neutral[300],
    optionFontSize: 13,
    optionHeight: 28,
    optionPadding: "4px 8px",
    colorText: designSystemColors.neutral[800],
    colorBgElevated: designSystemColors.neutral[50],
    optionSelectedFontWeight: 400,
    optionSelectedBg: designSystemColors.neutral[200],
    borderRadiusSM: radius.xl,
  };
}

/**
 * Seletor de itens por página compartilhado entre o `Pagination` standalone
 * e o footer do `Table`. As opções do dropdown exibem apenas o número
 * (ex.: `15`, `25`); o prefixo "Itens por página: " aparece somente no
 * gatilho, via `labelRender` — conforme o Figma
 * `Data table > pagination > select 165x36`.
 */
export function PaginationSizeChanger(props: PaginationSizeChangerProps): React.ReactElement {
  const { pageSize, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS, onChange, className } = props;
  const rootClassName = [BASE_CLASS, className].filter(Boolean).join(" ");

  return (
    <ConfigProvider theme={{ components: { Select: getSelectTokens() } }}>
      <AntdSelect
        className={rootClassName}
        value={pageSize}
        labelRender={(item) => `${SIZE_CHANGER_PREFIX}${String(item.label ?? "")}`}
        onChange={(value) => onChange(Number(value))}
        options={pageSizeOptions.map((size) => ({
          value: Number(size),
          label: String(size),
        }))}
      />
    </ConfigProvider>
  );
}

PaginationSizeChanger.displayName = "Pagination.SizeChanger";
