import React from "react";
import { Search } from "lucide-react";
import type { MenuComboboxSearchProps } from "../../../../types/components/MenuCombobox";

const SEARCH_CLASS = "ds-menu-combobox-search";
const ICON_SIZE = 16;
const DEFAULT_SEARCH_LABEL = "Buscar";

interface SearchValueController {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Hook interno que controla o input de busca, suportando os modos
 * controlado (`value` + `onChange`) e não-controlado (`defaultValue`).
 */
function useSearchValue(
  controlledValue: string | undefined,
  defaultValue: string | undefined,
  onChange?: (value: string) => void,
): SearchValueController {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? "");
  const value = isControlled ? (controlledValue ?? "") : internalValue;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const next = event.target.value;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return { value, handleChange };
}

/**
 * Input de busca embarcado no menu. O estado `active` é derivado do
 * `:focus-within` real no CSS (sem prop simulada).
 */
export const MenuComboboxSearch: React.FC<MenuComboboxSearchProps> = (props) => {
  const { size = "m", value: controlledValue, defaultValue, onChange, placeholder } = props;
  const { value, handleChange } = useSearchValue(controlledValue, defaultValue, onChange);
  const className = `${SEARCH_CLASS} ${SEARCH_CLASS}--size-${size}`;
  return (
    <div className={className}>
      <span className={`${SEARCH_CLASS}__icon`}>
        <Search size={ICON_SIZE} />
      </span>
      <input
        type="text"
        className={`${SEARCH_CLASS}__input`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder ?? DEFAULT_SEARCH_LABEL}
      />
    </div>
  );
};

MenuComboboxSearch.displayName = "MenuCombobox.Search";
