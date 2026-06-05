import type { ReactNode } from "react";
import type { Dayjs } from "dayjs";
import type { DatePickerProps as AntdDatePickerProps } from "antd";

/** Tamanhos discretos do input, alinhados ao `Input` do DS. */
export type DatePickerSize = "xs" | "s" | "m" | "l";

/** Modo do picker repassado ao header customizado (igual ao `PickerMode` do antd). */
export type DatePickerPanelMode = "time" | "date" | "week" | "month" | "quarter" | "year" | "decade";

/**
 * Variação do header do calendário (Figma `.date picker / header` `4066:4959`):
 * `year-and-month` (mês e ano como selects · default), `only-month` (mês select
 * + ano texto), `only-year` (mês texto + ano select), `static` (mês e ano em
 * texto, não editável = "1 mês"). A variação "2 meses" é o `RangePicker`.
 */
export type DatePickerHeaderVariant = "year-and-month" | "only-month" | "only-year" | "static";

/** Modo de renderização de um campo (mês/ano) do header. */
export type CalendarFieldMode = "select" | "text" | "none";

/** Opção do select customizado do header. */
export interface HeaderSelectOption {
  value: number;
  label: string;
}

/**
 * Props do select customizado (interno) do header: gatilho `[valor ⇅]` +
 * menu na superfície do DS. Abre por clique (controlado) para evitar o conflito
 * de foco/`mousedown` do painel do DatePicker com o Select aninhado do antd.
 */
export interface HeaderSelectProps {
  /** Valor selecionado (índice do mês ou ano). */
  value: number;
  /** Opções do menu. */
  options: HeaderSelectOption[];
  /** Disparado ao escolher uma opção. */
  onChange: (value: number) => void;
  /** Rótulo acessível do gatilho/menu. */
  ariaLabel: string;
  /** Largura (px) do gatilho. */
  width: number;
}

/**
 * Props do header customizado (interno) do calendário — mês/ano como selects
 * `[valor ⇅]` ou texto, entre setas `‹ ›`. Figma `4066:4959`.
 */
export interface CalendarHeaderProps {
  /** Data de referência exibida (mês/ano correntes do painel). */
  value: Dayjs;
  /** Navega o painel para a nova data (controla `pickerValue`). */
  onChange: (date: Dayjs) => void;
  /** Unidade das setas `‹ ›`: `month` no modo dia, `year` em mês/ano. */
  stepUnit: "month" | "year";
  /** Como renderizar o campo de mês. */
  monthField: CalendarFieldMode;
  /** Como renderizar o campo de ano. */
  yearField: "select" | "text";
}

type CleanAntdProps = Omit<AntdDatePickerProps, "size">;

export type DatePickerProps = CleanAntdProps & {
  /**
   * Altura discreta do input (`xs` 24 · `s` 32 · `m` 36 · `l` 40). Default
   * `m`, igual ao `Input`. O `date picker input` do Figma (32px) é o `s`.
   */
  size?: DatePickerSize;
  /**
   * Conteúdo do `Tooltip` do DS exibido ao passar o mouse sobre o input.
   * Quando ausente, nenhum tooltip é renderizado. Figma `8735:14149`.
   */
  tooltip?: ReactNode;
  /**
   * Tooltip por dia: receba a data e retorne o conteúdo (ex.: "Dia de
   * pagamento", "Data já passou"). Quando retorna algo, a célula é envolvida
   * no `Tooltip` do DS (substitui o `title` nativo). Figma `8735:14149`.
   */
  dateTooltip?: (date: Dayjs) => ReactNode;
  /**
   * Exibe o botão "Hoje" no rodapé do popup (opcional, default oculto),
   * estilizado conforme o Figma `8085:9270`.
   */
  showToday?: boolean;
  /**
   * Variação do header do calendário (Figma `4066:4959`). Default
   * `year-and-month` (mês e ano como selects). Ver `DatePickerHeaderVariant`.
   */
  headerVariant?: DatePickerHeaderVariant;
};
