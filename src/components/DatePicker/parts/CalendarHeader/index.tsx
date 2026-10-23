import React from "react";
import type { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeaderSelect } from "../HeaderSelect";
import { PT_BR_SHORT_MONTHS } from "../../shared";
import type { CalendarFieldMode, CalendarHeaderProps, HeaderSelectOption } from "../../../../types/components/DatePicker";

const HEADER_CLASS = "ds-datepicker-header";
const FIELDS_CLASS = "ds-datepicker-header-fields";
const NAV_CLASS = "ds-datepicker-navbtn";
const TEXT_CLASS = "ds-datepicker-headertext";
const ICON_SIZE = 16;
/** Quantidade de anos antes/depois do ano corrente nas opções do select. */
const YEAR_SPAN = 60;

/**
 * As 12 opções de mês localizadas a partir da data de referência. `shortLabel`
 * ("Jan", "Fev"...) é o que aparece no gatilho fechado; o menu aberto sempre
 * mostra o nome por extenso ("Janeiro", "Fevereiro"...) via `label`.
 */
function getMonthOptions(reference: Dayjs): HeaderSelectOption[] {
  const options: HeaderSelectOption[] = [];
  for (let month = 0; month < 12; month++) {
    options.push({
      value: month,
      label: reference.month(month).format("MMMM"),
      shortLabel: PT_BR_SHORT_MONTHS[month],
    });
  }
  return options;
}

/** Opções de ano ao redor do ano de referência. */
function getYearOptions(reference: Dayjs): HeaderSelectOption[] {
  const options: HeaderSelectOption[] = [];
  const current = reference.year();
  for (let year = current - YEAR_SPAN; year <= current + YEAR_SPAN; year++) {
    options.push({ value: year, label: String(year) });
  }
  return options;
}

/** Campo de mês: `HeaderSelect` `[Mês ⇅]`, texto (não editável) ou ausente. */
function renderMonth(value: Dayjs, onChange: (date: Dayjs) => void, mode: CalendarFieldMode): React.ReactNode {
  if (mode === "none") return null;
  if (mode === "text") return <span className={TEXT_CLASS}>{value.format("MMMM")}</span>;
  return (
    <HeaderSelect
      ariaLabel="Mês"
      value={value.month()}
      options={getMonthOptions(value)}
      optionLabelProp="shortLabel"
      // O gatilho encolhe para caber só o `shortLabel` ("Set"); o menu precisa
      // do próprio espaço para o nome por extenso ("Setembro").
      popupMatchSelectWidth={false}
      onChange={(next) => onChange(value.month(next))}
    />
  );
}

/** Campo de ano: `HeaderSelect` `[Ano ⇅]` ou texto (não editável). */
function renderYear(value: Dayjs, onChange: (date: Dayjs) => void, mode: "select" | "text"): React.ReactNode {
  if (mode === "text") return <span className={TEXT_CLASS}>{value.year()}</span>;
  return (
    <HeaderSelect
      ariaLabel="Ano"
      value={value.year()}
      options={getYearOptions(value)}
      onChange={(next) => onChange(value.year(next))}
    />
  );
}

/**
 * Header editável do calendário (Figma `4066:4959`): mês/ano renderizados com o
 * `HeaderSelect` (`[valor ⇅]`, superfície do DS) ou como texto, entre as setas
 * `‹ ›`. A navegação controla o `pickerValue` do picker via `onChange`.
 */
export function CalendarHeader({ value, onChange, stepUnit, monthField, yearField }: CalendarHeaderProps): React.ReactElement {
  // Figma `editable?`: com algum select → setas SEM borda; só texto → COM borda.
  const editable = monthField === "select" || yearField === "select";
  const navClass = editable ? NAV_CLASS : `${NAV_CLASS} ${NAV_CLASS}--bordered`;
  return (
    <div className={HEADER_CLASS}>
      <button type="button" className={navClass} aria-label="Anterior" onClick={() => onChange(value.subtract(1, stepUnit))}>
        <ChevronLeft size={ICON_SIZE} />
      </button>
      <div className={FIELDS_CLASS}>
        {renderMonth(value, onChange, monthField)}
        {renderYear(value, onChange, yearField)}
      </div>
      <button type="button" className={navClass} aria-label="Próximo" onClick={() => onChange(value.add(1, stepUnit))}>
        <ChevronRight size={ICON_SIZE} />
      </button>
    </div>
  );
}

CalendarHeader.displayName = "CalendarHeader";
