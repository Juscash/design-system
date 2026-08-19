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
import {
  HeaderSelectGuardProvider,
  useHeaderSelectGuardState,
} from "./parts/HeaderSelect/context";
import type { DatePickerProps } from "../../types/components/DatePicker";
import "./index.module.css";

/**
 * Trata a abertura/fechamento do calendário. Ignora o fechamento enquanto o
 * dropdown de mês/ano do PRÓPRIO header estiver visível (o usuário está
 * escolhendo mês/ano, cujo dropdown é renderizado no `body`): assim a escolha
 * não fecha o calendário. Um Select qualquer da página aberto não afeta essa
 * checagem — sem o escopo por classe, um Select externo (ex.: outro campo do
 * formulário) travava o fechamento do calendário indevidamente. O fechamento é
 * adiado um tick para o blur do input (ao clicar no header) não fechar o
 * calendário antes do dropdown montar.
 */
function resolveOpenChange(
  nextOpen: boolean,
  setOpen: (open: boolean) => void,
  shouldKeepCalendarOpen: () => boolean,
): void {
  if (nextOpen) {
    setOpen(true);
    return;
  }

  queueMicrotask(() => {
    if (shouldKeepCalendarOpen()) return;
    setOpen(false);
  });
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
  const headerSelectGuard = useHeaderSelectGuardState();
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
      onOpenChange={(nextOpen: boolean) =>
        resolveOpenChange(nextOpen, setOpen, headerSelectGuard.shouldKeepCalendarOpen)
      }
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

  return (
    <ConfigProvider theme={buildDatePickerTheme(size)}>
      <HeaderSelectGuardProvider value={headerSelectGuard.value}>
        {withTooltip(pickerElement, tooltip)}
      </HeaderSelectGuardProvider>
    </ConfigProvider>
  );
};

DatePicker.displayName = "DatePicker";

export type { DatePickerProps, DatePickerSize } from "../../types/components/DatePicker";
