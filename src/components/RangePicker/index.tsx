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

const POPUP_OFFSET = 4;

/**
 * Mesma geometria dos placements nativos do rc-picker para `bottomLeft`/
 * `bottomRight`, mas com `overflow.adjustY: 0` — desliga o auto-flip vertical
 * do rc-trigger (que abriria o popup para cima quando falta espaço embaixo,
 * ex.: os 2 meses empilhados em viewport estreita). O popup sempre abre para
 * baixo; se vazar da viewport, a página rola até ele.
 */
const FIXED_BOTTOM_PLACEMENTS = {
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, POPUP_OFFSET],
    overflow: { adjustX: 1, adjustY: false, shiftY: false },
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, POPUP_OFFSET],
    overflow: { adjustX: 1, adjustY: false, shiftY: false },
  },
};

/**
 * RangePicker do design system. Reusa o tema, o locale e os estilos do
 * `DatePicker` (header editável e popup com a superfície do `MenuCombobox`). O
 * input é editável e exibe os dois campos separados por `-`.
 *
 * Props proprietárias: `size` (xs/s/m/l, default `m`), `tooltip` (Tooltip do
 * DS no hover), `dateTooltip` (Tooltip por dia) e `showToday` (botão "Hoje").
 *
 * `placement` tem default `"bottomLeft"` e `builtinPlacements` desliga o
 * auto-flip vertical (ver `FIXED_BOTTOM_PLACEMENTS`): o popup nunca abre
 * para cima sozinho, mesmo sem espaço embaixo — consumidor pode sobrescrever
 * ambas as props quando precisar do comportamento padrão do antd.
 */
export const RangePicker: React.FC<RangePickerProps> = ({
  size = "m",
  allowClear = false,
  placeholder = ["Data inicial", "Data final"],
  format = "DD/MM/YYYY",
  inputReadOnly = false,
  showToday = false,
  placement = "bottomLeft",
  builtinPlacements = FIXED_BOTTOM_PLACEMENTS,
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
      placement={placement}
      builtinPlacements={builtinPlacements}
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
