import React from "react";
import { DatePicker as AntdDatePicker, ConfigProvider, type TimeRangePickerProps } from "antd";
import type { DatePickerProps as AntdDatePickerProps } from "antd";
import ptBR from "antd/locale/pt_BR";
import type { ThemeConfig } from "antd";
import { ChevronRight, Calendar, ChevronLeft } from "lucide-react";
import { designSystemColors, radius } from "../../theme";

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
      cellActiveWithRangeBg: designSystemColors.neutral[200],
      colorIconHover: designSystemColors.neutral[700],
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

export const DatePicker: React.FC<DatePickerProps> = ({
  allowClear = false,
  placeholder = "__/__/____",
  format = "DD/MM/YYYY",
  inputReadOnly = true,
  ...rest
}) => {
  return (
    <ConfigProvider theme={datePickerTheme}>
      <AntdDatePicker
        {...rest}
        locale={datePickerLocale}
        allowClear={allowClear}
        placeholder={placeholder}
        format={format}
        inputReadOnly={inputReadOnly}
        suffixIcon={null}
        prefix={<Calendar size={16} color={designSystemColors.neutral[500]} style={{ marginRight: 8, marginLeft: 4 }} />}
        prevIcon={
          <div
            style={{
              borderRadius: radius.xl,
              border: `1px solid ${designSystemColors.neutral[300]}`,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft size={16} color={designSystemColors.neutral[500]} />
          </div>
        }
        nextIcon={
          <div
            style={{
              borderRadius: radius.xl,
              border: `1px solid ${designSystemColors.neutral[300]}`,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={16} color={designSystemColors.neutral[500]} />
          </div>
        }
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
  ...rest
}) => {
  return (
    <ConfigProvider theme={datePickerTheme}>
      <AntdRangePicker
        {...rest}
        className={`range-picker-compact ${rest.className || ""}`.trim()}
        allowClear={allowClear}
        locale={datePickerLocale}
        placeholder={placeholder}
        format={format}
        inputReadOnly={inputReadOnly}
        suffixIcon={null}
        prefix={<Calendar size={16} color={designSystemColors.neutral[500]} style={{ marginRight: 4 }} />}
        prevIcon={
          <div
            style={{
              borderRadius: radius.xl,
              border: `1px solid ${designSystemColors.neutral[300]}`,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft size={16} color={designSystemColors.neutral[500]} />
          </div>
        }
        nextIcon={
          <div
            style={{
              borderRadius: radius.xl,
              border: `1px solid ${designSystemColors.neutral[300]}`,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={16} color={designSystemColors.neutral[500]} />
          </div>
        }
        superNextIcon={null}
        superPrevIcon={null}
      />
    </ConfigProvider>
  );
};

RangePicker.displayName = "RangePicker";
