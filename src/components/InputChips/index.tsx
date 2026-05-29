import React from "react";
import { X } from "lucide-react";
import type { InputChipsProps, InputChipsSize } from "../../types/components/InputChips";
import "./index.module.css";

const BASE_CLASS = "juscash-input-chips";
const FIELD_CLASS = `${BASE_CLASS}__field`;
const CHIP_CLASS = `${BASE_CLASS}__chip`;
const DEFAULT_PLACEHOLDER = "Digite e aperte enter";
const REMOVE_ICON_SIZE = 12;

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

/**
 * Renderiza um chip individual com botão de remoção (aria-label "Remover {chip}").
 */
function renderChip(label: string, index: number, disabled: boolean, onRemove: (index: number) => void): React.ReactElement {
  const chipClass = [CHIP_CLASS, disabled ? `${CHIP_CLASS}--disabled` : ""].filter(Boolean).join(" ");
  return (
    <span key={`${label}-${index}`} className={chipClass}>
      <span>{label}</span>
      <button
        type="button"
        className={`${BASE_CLASS}__chip-remove`}
        aria-label={`Remover ${label}`}
        disabled={disabled}
        onClick={() => onRemove(index)}
      >
        <X size={REMOVE_ICON_SIZE} aria-hidden="true" />
      </button>
    </span>
  );
}

/**
 * `InputChips` — campo de entrada que cria chips ao pressionar Enter.
 * Cada chip pode ser removido pelo botão `X` ou via Backspace com input vazio.
 *
 * Spec Figma `8292:10349` — label Inter Regular 16 `text/dark` acima do input;
 * field 36h, bg `neutral/50`, border `border/regular`, radius `xl` (8),
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
  const sizeModifier: InputChipsSize = size;
  const fieldClassName = [FIELD_CLASS, `${FIELD_CLASS}--${sizeModifier}`, disabled ? `${FIELD_CLASS}--disabled` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} style={style}>
      {label !== undefined && label !== null ?
        <label htmlFor={inputId} className={`${BASE_CLASS}__label`}>
          {label}
        </label>
      : null}
      <div className={fieldClassName}>
        {chips.map((chip, index) => renderChip(chip, index, disabled, removeAt))}
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
    </div>
  );
}

InputChips.displayName = "InputChips";

export type { InputChipsProps, InputChipsSize } from "../../types/components/InputChips";
