import type { ChangeEvent, ReactNode } from "react";
import type { InputProps as AntdInputProps } from "antd";
import type { InputMask, MaskTransform } from "../../utils/applyMask";

export type InputSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdInputProps as K extends "size" | "prefix" | "suffix" | "onChange" ? never : K]: AntdInputProps[K];
};

export type InputProps = CleanAntdProps & {
  /** Altura discreta (`xs` 24, `s` 32, `m` 36, `l` 40). Default `m`. */
  size?: InputSize;
  /**
   * Conteúdo antes do input (ícone, avatar, checkbox, texto, etc.).
   * Aceita `ReactNode` ou string com nome de ícone Lucide (ex.: `"Search"`).
   * Quando string, o tamanho do ícone é derivado do `size` do input
   * (12px xs · 14px s · 16px m/l).
   */
  prefix?: ReactNode | string;
  /** Conteúdo depois do input. Mesma regra de `prefix`. */
  suffix?: ReactNode | string;
  /**
   * Máscara proprietária. Formata o valor digitado conforme o padrão. Quando
   * presente, o consumidor recebe o valor formatado em `event.target.value`
   * e o valor sem formatação no segundo argumento de `onChange`.
   */
  mask?: InputMask;
  /**
   * Regex usada como filtro caractere-a-caractere quando `mask="custom"`.
   * Cada char digitado é testado contra o pattern; chars que não casam são
   * descartados. Ignorada quando `mask` é um valor predefinido.
   */
  maskPattern?: RegExp;
  /**
   * Transformação aplicada após o filtro de `mask="custom"`. `upper` força
   * MAIÚSCULAS; `lower` força minúsculas. Ignorada quando `mask` é um
   * valor predefinido.
   */
  maskTransform?: MaskTransform;
  /**
   * Handler de mudança. Quando `mask` está ativa, recebe `(event, raw)` onde
   * `event.target.value` é o valor formatado e `raw` é o valor sem máscara.
   * Sem `mask`, comporta-se como o `onChange` padrão do Antd.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, raw?: string) => void;
  /**
   * Validador customizado executado no `onBlur`. Recebe o valor formatado
   * e o `raw` (quando há máscara). Retorne uma string com a mensagem de erro
   * se inválido, ou `undefined` quando válido. Validações built-in
   * (email/cpf/cnj) rodam antes; o consumer só é chamado se as built-in
   * passarem.
   */
  validate?: (value: string, raw?: string) => string | undefined;
  /**
   * Mensagem de erro controlada externamente. Quando fornecida, sobrescreve
   * qualquer erro detectado pelo validador interno e mantém o input em
   * status="error" até ser alterada/removida pelo consumer.
   */
  errorMessage?: string;
};
