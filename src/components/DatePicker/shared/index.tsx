import React from "react";
import type { ThemeConfig } from "antd";
import type { Dayjs } from "dayjs";
import ptBRModule from "antd/locale/pt_BR";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip } from "../../Tooltip";
import { designSystemColors, radius, shadow } from "../../../theme";
import type {
  CalendarFieldMode,
  DatePickerHeaderVariant,
  DatePickerPanelMode,
  DatePickerSize,
} from "../../../types/components/DatePicker";

/** Classe raiz aplicada ao input do `DatePicker`/`RangePicker`. */
export const BASE_CLASS = "ds-datepicker";
/** Classe aplicada à raiz do popup (renderizado em portal). */
export const POPUP_CLASS = "ds-datepicker-popup";
/** Classe do wrapper dos botões de navegação (prev/next) do header. */
export const NAV_CLASS = "ds-datepicker-nav";
/** Classe do ícone de calendário usado como `prefix` do input. */
export const PREFIX_CLASS = "ds-datepicker-prefix";
/** Classe do separador (`-`) entre os campos do `RangePicker`. */
export const SEPARATOR_CLASS = "ds-datepicker-separator";

const ICON_SIZE = 16;
const CELL_SIZE = 32;
const INPUT_FONT_SIZE = 13;

/** Altura do input por tamanho, espelhando o `Input` do DS. */
const SIZE_HEIGHT: Record<DatePickerSize, number> = { xs: 24, s: 32, m: 36, l: 40 };

/** Altura (px) do input para um `size` — usada também no `style` inline. */
export function getInputHeight(size: DatePickerSize): number {
  return SIZE_HEIGHT[size];
}

/**
 * Monta o tema local do `DatePicker`/`RangePicker` para um `size`. Espelha o
 * padrão do `Input`: `controlHeight` e `borderRadius` variam por tamanho; os
 * demais tokens são fixos (cores, foco, célula) conforme o Figma `4066:8379`.
 */
export function buildDatePickerTheme(size: DatePickerSize): ThemeConfig {
  return {
    token: {
      colorPrimary: designSystemColors.brand.primary[600],
      colorText: designSystemColors.neutral[800],
      controlHeight: SIZE_HEIGHT[size],
      borderRadius: size === "xs" ? radius.md : radius.xl,
      fontSize: INPUT_FONT_SIZE,
      // Cor de erro (`status="error"`) — mesmo token do Input/Select, senão o
      // DatePicker cai no vermelho default do antd em vez do `feedback.red.500`.
      colorError: designSystemColors.feedback.red[500],
    },
    components: {
      DatePicker: {
        colorBgContainer: designSystemColors.neutral[50],
        colorBorder: designSystemColors.neutral[300],
        activeBorderColor: designSystemColors.neutral[300],
        hoverBorderColor: designSystemColors.neutral[300],
        activeShadow: shadow.focus,
        // Anel de foco em erro — mesmo token do Input (`shadow.focusError`).
        errorActiveShadow: shadow.focusError,
        colorTextPlaceholder: designSystemColors.neutral[500],
        colorIcon: designSystemColors.neutral[500],
        colorIconHover: designSystemColors.neutral[800],
        cellActiveWithRangeBg: designSystemColors.neutral[200],
        cellWidth: CELL_SIZE,
        cellHeight: CELL_SIZE,
      },
    },
  };
}

/**
 * Locale pt-BR do picker com `monthFormat` por extenso (`MMMM`), reaproveitando
 * o `timePickerLocale` do Antd quando disponível.
 */
/**
 * `antd/locale/pt_BR` é um módulo CJS exportado como `{ default: {...} }`; a
 * interop do `import default` nem sempre desembrulha isso (depende do
 * bundler/target), deixando `ptBR.DatePicker` undefined e o calendário caindo
 * no locale padrão em inglês. Resolve os dois formatos possíveis.
 */
const ptBR =
  (ptBRModule as unknown as { default?: typeof ptBRModule }).default ?? ptBRModule;

/** Iniciais dos dias da semana em pt-BR (domingo → sábado), como no Figma. */
const PT_BR_SHORT_WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;
/** Abreviações dos meses em pt-BR (janeiro → dezembro). */
const PT_BR_SHORT_MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
] as const;

export const datePickerLocale =
  ptBR.DatePicker ?
    {
      ...ptBR.DatePicker,
      // O rc-picker usa `locale.shortWeekDays || <fallback do dayjs>`. Fixar os
      // nomes aqui (literal sempre "truthy") garante pt-BR independentemente da
      // instância/locale do dayjs do consumidor — o calendário nunca sai em
      // inglês. `locale: "pt-br"` alinha o código de locale (Antd usa `"pt_BR"`,
      // dayjs registra `"pt-br"`); `monthFormat: "MMMM"` = mês por extenso.
      lang: {
        ...ptBR.DatePicker.lang,
        monthFormat: "MMMM",
        locale: "pt-br",
        shortWeekDays: [...PT_BR_SHORT_WEEKDAYS],
        shortMonths: [...PT_BR_SHORT_MONTHS],
      },
      timePickerLocale:
        ptBR.DatePicker.timePickerLocale ?? ptBR.TimePicker ?? ({} as NonNullable<typeof ptBR.TimePicker>),
    }
  : undefined;

/** Configuração resolvida do header do calendário. */
export interface ResolvedHeader {
  stepUnit: "month" | "year";
  monthField: CalendarFieldMode;
  yearField: "select" | "text";
}

/**
 * Resolve a configuração do header a partir do `picker` e do `headerVariant`
 * (Figma `4066:4959`). Em mês/ano o mês vem da grade (sem campo de mês) e só o
 * ano é editável; apenas o modo `date` honra o `headerVariant`.
 */
export function resolveCalendarHeader(picker: DatePickerPanelMode, variant: DatePickerHeaderVariant): ResolvedHeader {
  if (picker !== "date" && picker !== "week" && picker !== "quarter") {
    return { stepUnit: "year", monthField: "none", yearField: "select" };
  }
  if (variant === "static") return { stepUnit: "month", monthField: "text", yearField: "text" };
  if (variant === "only-month") return { stepUnit: "month", monthField: "select", yearField: "text" };
  if (variant === "only-year") return { stepUnit: "month", monthField: "text", yearField: "select" };
  return { stepUnit: "month", monthField: "select", yearField: "select" };
}

/** Info estrutural do `cellRender` do Antd usada aqui. */
type CellRenderInfo = { type: string; originNode: React.ReactElement };

/**
 * `cellRender` dos dias: (1) suprime o `title` nativo do antd colocando
 * `title=""` no nó interno — um `title` vazio no elemento sob o cursor anula o
 * `title` do `<td>` ancestral; (2) quando `dateTooltip` retorna conteúdo para a
 * data, envolve a célula no `Tooltip` do DS (ex.: "Dia de pagamento", "Data já
 * passou"). Modos mês/ano permanecem inalterados.
 */
export function buildCellRender(
  dateTooltip?: (date: Dayjs) => React.ReactNode,
): (current: Dayjs | number | string, info: CellRenderInfo) => React.ReactNode {
  return (current, info) => {
    if (info.type !== "date" || typeof current !== "object") return info.originNode;
    const node = React.cloneElement(info.originNode, { title: "" });
    const content = dateTooltip?.(current);
    if (content === undefined || content === null || content === false || content === "") {
      return node;
    }
    return <Tooltip title={content}>{node}</Tooltip>;
  };
}

/** Ícone de calendário (16px) usado como `prefix` do input. */
export function getPrefixIcon(): React.ReactElement {
  return <Calendar size={ICON_SIZE} className={PREFIX_CLASS} aria-hidden />;
}

/** Botão de navegação do header: chevron 16px dentro de uma caixa 32×32. */
export function getNavIcon(direction: "prev" | "next"): React.ReactElement {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <span className={NAV_CLASS}>
      <Icon size={ICON_SIZE} />
    </span>
  );
}

/**
 * Envolve o input no `Tooltip` do DS quando `tooltip` é informado (exibido no
 * hover). Sem `tooltip`, retorna o elemento original.
 */
export function withTooltip(picker: React.ReactElement, tooltip: React.ReactNode): React.ReactElement {
  if (tooltip === undefined || tooltip === null) return picker;
  return <Tooltip title={tooltip}>{picker}</Tooltip>;
}
