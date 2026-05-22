import React from "react";
import { DatePicker as AntdDatePicker, ConfigProvider, type TimeRangePickerProps } from "antd";
import type { DatePickerProps as AntdDatePickerProps } from "antd";
import ptBR from "antd/locale/pt_BR";
import type { ThemeConfig } from "antd";
import { ChevronRight, Calendar, ChevronLeft } from "lucide-react";
import { designSystemColors, radius, shadow } from "../../theme";

export type DatePickerProps = AntdDatePickerProps;
export type RangePickerProps = TimeRangePickerProps;

const { RangePicker: AntdRangePicker } = AntdDatePicker;

const datePickerTheme: ThemeConfig = {
  token: {
    colorPrimary: designSystemColors.brand.primary[600],
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    DatePicker: {
      colorTextPlaceholder: designSystemColors.neutral[500],
      colorIcon: designSystemColors.neutral[500],
      colorIconHover: designSystemColors.neutral[800],
      cellActiveWithRangeBg: designSystemColors.neutral[200],
      // Figma: células 32x32px
      cellWidth: 32,
      cellHeight: 32,
    },
  },
};

const datePickerLocale =
  ptBR.DatePicker ?
    {
      ...ptBR.DatePicker,
      lang: {
        ...ptBR.DatePicker.lang,
        monthFormat: "MMMM",
      },
      timePickerLocale: ptBR.DatePicker.timePickerLocale ?? ptBR.TimePicker ?? ({} as NonNullable<typeof ptBR.TimePicker>),
    }
  : undefined;

// CSS injetado uma vez globalmente para o popup (portal)
const DS_DATEPICKER_STYLE = `
  /* ── Popup: borda e sombra (Figma) ── */
  .ds-datepicker-popup .ant-picker-panel-container {
    border: 1px solid ${designSystemColors.neutral[300]} !important;
    box-shadow: ${shadow.m} !important;
    border-radius: ${radius.xl}px !important;
  }

  /* ── Células: 32x32px (Figma) ── */
  .ds-datepicker-popup .ant-picker-content th,
  .ds-datepicker-popup .ant-picker-content td.ant-picker-cell {
    width: 32px !important;
    height: 32px !important;
    padding: 0 !important;
  }
  .ds-datepicker-popup .ant-picker-cell-inner {
    min-width: 32px !important;
    height: 32px !important;
    line-height: 32px !important;
    font-size: 13px !important;
    font-weight: 400 !important;
    color: ${designSystemColors.neutral[800]} !important;
    border-radius: 5px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
  }

  /* ── Nomes dos dias da semana: 10px, neutral[500] (Figma) ── */
  .ds-datepicker-popup .ant-picker-content th {
    font-size: 10px !important;
    font-weight: 400 !important;
    color: ${designSystemColors.neutral[500]} !important;
    line-height: 32px !important;
  }

  /* ── Hoje: bold, sem borda verde (Figma: text bold) ── */
  .ds-datepicker-popup .ant-picker-cell-today .ant-picker-cell-inner::before {
    display: none !important;
  }
  .ds-datepicker-popup .ant-picker-cell-today:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end) .ant-picker-cell-inner {
    font-weight: 600 !important;
  }

  /* ── Header: justify-between (Figma: [<] [Mês Ano] [>]) ── */
  .ds-datepicker-popup .ant-picker-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  /* ── Header view: mês primeiro, centralizado (Figma: "Março 2026") ── */
  .ds-datepicker-popup .ant-picker-header-view {
    display: flex !important;
    gap: 4px !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .ds-datepicker-popup .ant-picker-year-btn {
    order: 2 !important;
  }
  .ds-datepicker-popup .ant-picker-month-btn {
    order: 1 !important;
  }
  .ds-datepicker-popup .ant-picker-header-view button {
    font-size: 13px !important;
    font-weight: 400 !important;
    color: ${designSystemColors.neutral[800]} !important;
    line-height: 1.2 !important;
  }

  /* ── Hover em dias: neutral[100] em vez de verde ── */
  .ds-datepicker-popup .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
    background: ${designSystemColors.neutral[100]} !important;
  }

  /* ── Range hover bar: neutral em vez de verde ── */
  .ds-datepicker-popup .ant-picker-cell-range-hover::before,
  .ds-datepicker-popup .ant-picker-cell-range-hover-start::before,
  .ds-datepicker-popup .ant-picker-cell-range-hover-end::before {
    background: ${designSystemColors.neutral[200]} !important;
  }

  /* ── Input base: 32px height, 8px radius, neutral[50] bg (Figma) ── */
  .ds-datepicker.ant-picker {
    height: 32px !important;
    min-height: 32px !important;
    border-radius: ${radius.xl}px !important;
    background: ${designSystemColors.neutral[50]} !important;
    border-color: ${designSystemColors.neutral[300]} !important;
    padding: 0 12px !important;
  }
  .ds-datepicker.ant-picker .ant-picker-input > input {
    font-family: "Inter", sans-serif !important;
    font-size: 13px !important;
    font-weight: 400 !important;
    color: ${designSystemColors.neutral[800]} !important;
    line-height: 1.2 !important;
  }
  .ds-datepicker.ant-picker .ant-picker-input > input::placeholder {
    color: ${designSystemColors.neutral[500]} !important;
  }

  /* ── Input hover: borda NÃO muda (Figma: stays neutral[300]) ── */
  .ds-datepicker.ant-picker:hover {
    border-color: ${designSystemColors.neutral[300]} !important;
  }

  /* ── Input focus: shadow ring neutral[300], borda NÃO muda (Figma) ── */
  .ds-datepicker.ant-picker-focused,
  .ds-datepicker.ant-picker:focus-within {
    border-color: ${designSystemColors.neutral[300]} !important;
    box-shadow: ${shadow.focus} !important;
  }

  /* ── Esconder link "Hoje" no footer (Figma: não existe) ── */
  .ds-datepicker-popup .ant-picker-today-btn {
    display: none !important;
  }

  /* ── Esconder active bar do RangePicker (Figma: não existe) ── */
  .ds-datepicker.ant-picker .ant-picker-active-bar {
    display: none !important;
  }

  /* ── Popup: gap 16px entre header e grid (Figma: gap var(--4, 16px)) ── */
  .ds-datepicker-popup .ant-picker-body {
    padding: 0 16px 16px !important;
  }
  .ds-datepicker-popup .ant-picker-header {
    padding: 16px 16px 0 !important;
    border-bottom: none !important;
  }

  /* ── Dias disabled (mês anterior/próximo): neutral[400] (Figma: #a3a3a3) ── */
  .ds-datepicker-popup .ant-picker-cell-disabled .ant-picker-cell-inner {
    color: ${designSystemColors.neutral[400]} !important;
    opacity: 1 !important;
  }
`;

function injectDatePickerStyle() {
  if (typeof document === "undefined") return;
  let style = document.getElementById("ds-datepicker-style") as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = "ds-datepicker-style";
    document.head.appendChild(style);
  }
  style.textContent = DS_DATEPICKER_STYLE;
}

const navButtonStyle = {
  borderRadius: radius.xl,
  border: `1px solid ${designSystemColors.neutral[300]}`,
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
} as const;

export const DatePicker: React.FC<DatePickerProps> = ({
  allowClear = false,
  placeholder = "__/__/____",
  format = "DD/MM/YYYY",
  inputReadOnly = true,
  className,
  ...rest
}) => {
  injectDatePickerStyle();
  return (
    <ConfigProvider theme={datePickerTheme}>
      <AntdDatePicker
        {...rest}
        className={`ds-datepicker ${className || ""}`.trim()}
        classNames={{ popup: { root: "ds-datepicker-popup" } }}
        locale={datePickerLocale}
        allowClear={allowClear}
        placeholder={placeholder}
        format={format}
        inputReadOnly={inputReadOnly}
        suffixIcon={null}
        prefix={<Calendar size={16} color={designSystemColors.neutral[500]} style={{ marginRight: 8, marginLeft: 4 }} />}
        prevIcon={<div style={navButtonStyle}><ChevronLeft size={16} color={designSystemColors.neutral[800]} /></div>}
        nextIcon={<div style={navButtonStyle}><ChevronRight size={16} color={designSystemColors.neutral[800]} /></div>}
        superNextIcon={null}
        superPrevIcon={null}
      />
    </ConfigProvider>
  );
};

DatePicker.displayName = "DatePicker";

export const RangePicker: React.FC<RangePickerProps> = ({
  allowClear = false,
  placeholder = ["Data inicial", "Data final"],
  format = "DD/MM/YYYY",
  inputReadOnly = true,
  className,
  ...rest
}) => {
  injectDatePickerStyle();
  return (
    <ConfigProvider theme={datePickerTheme}>
      <AntdRangePicker
        {...rest}
        className={`ds-datepicker ${className || ""}`.trim()}
        classNames={{ popup: { root: "ds-datepicker-popup" } }}
        locale={datePickerLocale}
        allowClear={allowClear}
        placeholder={placeholder}
        format={format}
        inputReadOnly={inputReadOnly}
        suffixIcon={null}
        prefix={<Calendar size={16} color={designSystemColors.neutral[500]} style={{ marginRight: 4 }} />}
        prevIcon={<div style={navButtonStyle}><ChevronLeft size={16} color={designSystemColors.neutral[800]} /></div>}
        nextIcon={<div style={navButtonStyle}><ChevronRight size={16} color={designSystemColors.neutral[800]} /></div>}
        superNextIcon={null}
        superPrevIcon={null}
        separator={<span style={{ color: designSystemColors.neutral[500], fontSize: 13 }}>-</span>}
      />
    </ConfigProvider>
  );
};

RangePicker.displayName = "RangePicker";
