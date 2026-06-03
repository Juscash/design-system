import React from "react";
import { DatePicker as AntdDatePicker, ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import ptBR from "antd/locale/pt_BR";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { designSystemColors, radius } from "../../theme";
import type { DatePickerProps } from "../../types/components/DatePicker";
import "./index.module.css";

const CELL_SIZE = 32;
const ICON_SIZE = 16;
const NAV_BUTTON_SIZE = 32;

export const datePickerTheme: ThemeConfig = {
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
      cellWidth: CELL_SIZE,
      cellHeight: CELL_SIZE,
    },
  },
};

export const datePickerLocale =
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

const navButtonStyle: React.CSSProperties = {
  borderRadius: radius.xl,
  border: `1px solid ${designSystemColors.neutral[300]}`,
  width: NAV_BUTTON_SIZE,
  height: NAV_BUTTON_SIZE,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
};

/**
 * DatePicker do design system. Usa ícones do Lucide e desabilita o link
 * "Hoje" no popup (não previsto no Figma). Estilos próprios em
 * `index.module.css` — popup é alcançado via seletor global no portal.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  allowClear = false,
  placeholder = "__/__/____",
  format = "DD/MM/YYYY",
  inputReadOnly = true,
  className,
  ...rest
}) => {
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
        prefix={
          <Calendar size={ICON_SIZE} color={designSystemColors.neutral[500]} style={{ marginRight: 8, marginLeft: 4 }} />
        }
        prevIcon={
          <div style={navButtonStyle}>
            <ChevronLeft size={ICON_SIZE} color={designSystemColors.neutral[800]} />
          </div>
        }
        nextIcon={
          <div style={navButtonStyle}>
            <ChevronRight size={ICON_SIZE} color={designSystemColors.neutral[800]} />
          </div>
        }
        superNextIcon={null}
        superPrevIcon={null}
      />
    </ConfigProvider>
  );
};

DatePicker.displayName = "DatePicker";

export type { DatePickerProps } from "../../types/components/DatePicker";
