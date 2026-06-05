import type { ReactNode } from "react";
import type { Dayjs } from "dayjs";
import type { TimeRangePickerProps } from "antd";
import type { DatePickerSize } from "../DatePicker";

type CleanAntdRangeProps = Omit<TimeRangePickerProps, "size">;

export type RangePickerProps = CleanAntdRangeProps & {
  /**
   * Altura discreta do input (`xs` 24 · `s` 32 · `m` 36 · `l` 40). Default
   * `m`, igual ao `Input` e ao `DatePicker`.
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
};
