import React from "react";
import { DatePicker as AntdDatePicker, ConfigProvider } from "antd";
import {
  BASE_CLASS,
  POPUP_CLASS,
  SEPARATOR_CLASS,
  buildCellRender,
  buildDatePickerTheme,
  datePickerLocale,
  getInputHeight,
  getNavIcon,
  getPrefixIcon,
  withTooltip,
} from "../DatePicker/shared";
import type { RangePickerProps } from "../../types/components/RangePicker";
import "../DatePicker/index.module.css";

const { RangePicker: AntdRangePicker } = AntdDatePicker;

/**
 * RangePicker do design system. Reusa o tema, o locale e os estilos do
 * `DatePicker` (header editável e popup com a superfície do `MenuCombobox`). O
 * input é editável e exibe os dois campos separados por `-`.
 *
 * Props proprietárias: `size` (xs/s/m/l, default `m`), `tooltip` (Tooltip do
 * DS no hover), `dateTooltip` (Tooltip por dia) e `showToday` (botão "Hoje").
 */
export const RangePicker: React.FC<RangePickerProps> = ({
  size = "m",
  allowClear = false,
  placeholder = ["Data inicial", "Data final"],
  format = "DD/MM/YYYY",
  inputReadOnly = false,
  showToday = false,
  tooltip,
  dateTooltip,
  className,
  style,
  ...rest
}) => {
  const rootClassName = [BASE_CLASS, className].filter(Boolean).join(" ");
  const popupRoot = showToday ? `${POPUP_CLASS} ${POPUP_CLASS}--today` : POPUP_CLASS;
  const picker = (
    <AntdRangePicker
      {...rest}
      className={rootClassName}
      style={{ height: getInputHeight(size), ...style }}
      classNames={{ popup: { root: popupRoot } }}
      locale={datePickerLocale}
      allowClear={allowClear}
      placeholder={placeholder}
      format={format}
      inputReadOnly={inputReadOnly}
      showNow={showToday}
      cellRender={buildCellRender(dateTooltip)}
      suffixIcon={null}
      prefix={getPrefixIcon()}
      prevIcon={getNavIcon("prev")}
      nextIcon={getNavIcon("next")}
      superPrevIcon={getNavIcon("prev")}
      superNextIcon={getNavIcon("next")}
      separator={<span className={SEPARATOR_CLASS}>-</span>}
    />
  );

  return <ConfigProvider theme={buildDatePickerTheme(size)}>{withTooltip(picker, tooltip)}</ConfigProvider>;
};

RangePicker.displayName = "RangePicker";

export type { RangePickerProps } from "../../types/components/RangePicker";
