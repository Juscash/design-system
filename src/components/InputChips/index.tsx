import React from "react";
import { X } from "lucide-react";
import type { InputChipsProps, InputChipsSize } from "../../types/components/InputChips";
import "./index.module.css";

const BASE_CLASS = "ds-input-chips";
const ROW_CLASS = `${BASE_CLASS}__row`;
const FIELD_CLASS = `${BASE_CLASS}__field`;
const CHIPS_CLASS = `${BASE_CLASS}__chips`;
const CHIP_CLASS = `${BASE_CLASS}__chip`;
const DEFAULT_PLACEHOLDER = "Digite e aperte enter";
const REMOVE_ICON_SIZE = 12;
const REMOVE_ICON_SIZE_SMALL = 10;

interface UseChipsResult {
  chips: string[];
  setChips: (next: string[]) => void;
}

/**
 * Mantém o estado da lista de chips. Quando `value` é definido o componente
 * opera controlado (estado interno congelado); caso contrário usa estado
 * interno seedado por `defaultValue`. `onChange` é sempre invocado.
 */
function useChips(
  value: string[] | undefined,
  defaultValue: string[] | undefined,
  onChange: ((chips: string[]) => void) | undefined,
): UseChipsResult {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string[]>(() => defaultValue ?? []);
  const chips = isControlled ? (value as string[]) : internal;
  const setChips = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return { chips, setChips };
}

interface UseHandlersArgs extends UseChipsResult {
  inputValue: string;
  setInputValue: (value: string) => void;
  disabled: boolean;
}

interface HandlersResult {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeAt: (index: number) => void;
}

/**
 * Handlers de teclado e remoção. `Enter` adiciona (trim + dedupe) e limpa o
 * input; `Backspace` com input vazio remove o último chip; `removeAt` é usado
 * pelo botão `X` de cada chip.
 */
function useHandlers(args: UseHandlersArgs): HandlersResult {
  const { chips, setChips, inputValue, setInputValue, disabled } = args;

  const removeAt = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= chips.length) return;
      setChips([...chips.slice(0, index), ...chips.slice(index + 1)]);
    },
    [chips, setChips],
  );

  const handleEnter = React.useCallback(() => {
    const trimmed = inputValue.trim();
    setInputValue("");
    if (trimmed === "" || chips.includes(trimmed)) return;
    setChips([...chips, trimmed]);
  }, [chips, setChips, inputValue, setInputValue]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (event.key === "Enter") {
        event.preventDefault();
        handleEnter();
        return;
      }
      if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
        removeAt(chips.length - 1);
      }
    },
    [disabled, handleEnter, inputValue, chips.length, removeAt],
  );

  return { handleKeyDown, removeAt };
}

interface ChipRenderArgs {
  label: string;
  index: number;
  size: InputChipsSize;
  disabled: boolean;
  onRemove: (index: number) => void;
}

/**
 * Renderiza um chip individual com botão de remoção (aria-label "Remover {chip}").
 * O modificador de tamanho garante que o chip acompanhe a altura do input —
 * regra do Figma `8292:10349`: "As versões X e XS dos chips são ajustadas
 * para acompanhar a altura do input."
 */
function renderChip(args: ChipRenderArgs): React.ReactElement {
  const { label, index, size, disabled, onRemove } = args;
  const chipClass = [CHIP_CLASS, `${CHIP_CLASS}--${size}`, disabled ? `${CHIP_CLASS}--disabled` : ""]
    .filter(Boolean)
    .join(" ");
  const iconSize = size === "xs" ? REMOVE_ICON_SIZE_SMALL : REMOVE_ICON_SIZE;
  return (
    <span key={`${label}-${index}`} className={chipClass}>
      <span className={`${CHIP_CLASS}-label`}>{label}</span>
      <button
        type="button"
        className={`${CHIP_CLASS}-remove`}
        aria-label={`Remover ${label}`}
        disabled={disabled}
        onClick={() => onRemove(index)}
      >
        <X size={iconSize} aria-hidden="true" />
      </button>
    </span>
  );
}

/**
 * `InputChips` — campo de entrada que cria chips ao pressionar Enter.
 * Cada chip pode ser removido pelo botão `X` ou via Backspace com input vazio.
 *
 * Spec Figma `8292:10349` — label Inter Regular 16 `text/dark` acima do
 * conjunto; em seguida uma linha (flex row) com o input à esquerda e os
 * chips como irmãos à direita. Os chips NÃO ficam dentro do input.
 * Field 36h, bg `neutral/50`, border `border/regular`, radius `xl` (8),
 * padding `spacing/2 spacing/3`. Placeholder `body/02 text/soft`.
 */
export function InputChips(props: InputChipsProps): React.ReactElement {
  const {
    value,
    defaultValue,
    onChange,
    size = "m",
    placeholder = DEFAULT_PLACEHOLDER,
    label,
    disabled = false,
    className,
    style,
  } = props;

  const { chips, setChips } = useChips(value, defaultValue, onChange);
  const [inputValue, setInputValue] = React.useState<string>("");
  const reactId = React.useId();
  const inputId = `${BASE_CLASS}-${reactId}`;
  const { handleKeyDown, removeAt } = useHandlers({ chips, setChips, inputValue, setInputValue, disabled });

  const rootClassName = [BASE_CLASS, className].filter(Boolean).join(" ");
  const fieldClassName = [FIELD_CLASS, `${FIELD_CLASS}--${size}`, disabled ? `${FIELD_CLASS}--disabled` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} style={style}>
      {label !== undefined && label !== null ?
        <label htmlFor={inputId} className={`${BASE_CLASS}__label`}>
          {label}
        </label>
      : null}
      <div className={ROW_CLASS}>
        <div className={fieldClassName}>
          <input
            id={inputId}
            type="text"
            className={`${BASE_CLASS}__input`}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {chips.length > 0 ?
          <div className={CHIPS_CLASS}>
            {chips.map((chip, index) => renderChip({ label: chip, index, size, disabled, onRemove: removeAt }))}
          </div>
        : null}
      </div>
    </div>
  );
}

InputChips.displayName = "InputChips";

export type { InputChipsProps, InputChipsSize } from "../../types/components/InputChips";
