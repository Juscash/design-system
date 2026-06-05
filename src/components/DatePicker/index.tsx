import React from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { DatePicker as AntdDatePicker, ConfigProvider } from "antd";
import {
  BASE_CLASS,
  POPUP_CLASS,
  buildCellRender,
  buildDatePickerTheme,
  datePickerLocale,
  getInputHeight,
  getPrefixIcon,
  resolveCalendarHeader,
  withTooltip,
} from "./shared";
import { CalendarHeader } from "./parts/CalendarHeader";
import type { DatePickerProps } from "../../types/components/DatePicker";
import "./index.module.css";

/** Seletor de qualquer dropdown de Select aberto (mês/ano do header, no `body`). */
const OPEN_SELECT_DROPDOWN = ".ant-select-dropdown:not(.ant-select-dropdown-hidden)";

/**
 * Trata a abertura/fechamento do calendário. Ignora o fechamento enquanto um
 * dropdown de select estiver visível (o usuário está escolhendo mês/ano no
 * header, cujo dropdown é renderizado no `body`): assim a escolha não fecha o
 * calendário. Nos demais casos, aplica a visibilidade normalmente.
 */
function resolveOpenChange(nextOpen: boolean, setOpen: (open: boolean) => void): void {
  if (!nextOpen && document.querySelector(OPEN_SELECT_DROPDOWN)) return;
  setOpen(nextOpen);
}

/**
 * DatePicker do design system. Embrulha o `DatePicker` do Antd com a
 * identidade visual JusCash. O input é editável (digitação com parsing do
 * `format`), o popup reusa a superfície do `MenuCombobox` e o header do
 * calendário é editável: mês/ano viram selects `[Mês ⇅] [Ano ⇅]` entre as setas
 * `‹ ›` (Figma `4066:4959`), controlando a navegação via `pickerValue`.
 *
 * Props proprietárias: `size` (xs/s/m/l, default `m`), `tooltip` (Tooltip do
 * DS no hover do input), `dateTooltip` (Tooltip por dia) e `showToday` (botão
 * "Hoje").
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  size = "m",
  allowClear = false,
  placeholder = "__/__/____",
  format = "DD/MM/YYYY",
  inputReadOnly = false,
  showToday = false,
  picker = "date",
  headerVariant = "year-and-month",
  value,
  defaultValue,
  onChange,
  tooltip,
  dateTooltip,
  className,
  style,
  ...rest
}) => {
  const [viewDate, setViewDate] = React.useState<Dayjs>(() => (value ?? defaultValue ?? dayjs()) as Dayjs);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (value) setViewDate(value as Dayjs);
  }, [value]);

  const header = resolveCalendarHeader(picker, headerVariant);
  const rootClassName = [BASE_CLASS, className].filter(Boolean).join(" ");
  const popupRoot = [POPUP_CLASS, `${POPUP_CLASS}--custom`, showToday && `${POPUP_CLASS}--today`]
    .filter(Boolean)
    .join(" ");

  const pickerElement = (
    <AntdDatePicker
      {...rest}
      picker={picker}
      open={open}
      onOpenChange={(nextOpen: boolean) => resolveOpenChange(nextOpen, setOpen)}
      value={value}
      defaultValue={defaultValue}
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
      pickerValue={viewDate}
      onPickerValueChange={(next: Dayjs) => setViewDate(next)}
      onChange={(next, formatted) => {
        if (next) setViewDate(next as Dayjs);
        onChange?.(next, formatted);
      }}
      panelRender={(panelNode) => (
        <>
          <CalendarHeader
            value={viewDate}
            onChange={setViewDate}
            stepUnit={header.stepUnit}
            monthField={header.monthField}
            yearField={header.yearField}
          />
          {panelNode}
        </>
      )}
      suffixIcon={null}
      prefix={getPrefixIcon()}
    />
  );

  return <ConfigProvider theme={buildDatePickerTheme(size)}>{withTooltip(pickerElement, tooltip)}</ConfigProvider>;
};

DatePicker.displayName = "DatePicker";

export type { DatePickerProps, DatePickerSize } from "../../types/components/DatePicker";
