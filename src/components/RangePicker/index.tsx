import React from "react";
import { DatePicker as AntdDatePicker, ConfigProvider } from "antd";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { datePickerLocale, datePickerTheme } from "../DatePicker";
import { designSystemColors, radius } from "../../theme";
import type { RangePickerProps } from "../../types/components/DatePicker";

const ICON_SIZE = 16;
const NAV_BUTTON_SIZE = 32;

const { RangePicker: AntdRangePicker } = AntdDatePicker;

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
 * RangePicker do design system. Reusa `datePickerTheme` e o CSS module do
 * `DatePicker` via classe `ds-datepicker`.
 */
export const RangePicker: React.FC<RangePickerProps> = ({
  allowClear = false,
  placeholder = ["Data inicial", "Data final"],
  format = "DD/MM/YYYY",
  inputReadOnly = true,
  className,
  ...rest
}) => {
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
        prefix={<Calendar size={ICON_SIZE} color={designSystemColors.neutral[500]} style={{ marginRight: 4 }} />}
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
        separator={<span style={{ color: designSystemColors.neutral[500], fontSize: 13 }}>-</span>}
      />
    </ConfigProvider>
  );
};

RangePicker.displayName = "RangePicker";

export type { RangePickerProps } from "../../types/components/DatePicker";
