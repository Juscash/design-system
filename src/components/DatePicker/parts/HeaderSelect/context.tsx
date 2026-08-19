import React, { createContext, useContext, useMemo, useRef } from "react";

/** Classe do popup dos Selects de mês/ano do header do DatePicker. */
export const HEADER_DROPDOWN_CLASS = "ds-datepicker-header-select-dropdown";

interface HeaderSelectGuardContextValue {
  /** Marca interação iminente (mousedown no gatilho) antes do blur fechar o calendário. */
  markInteracting: () => void;
  /** Sincroniza o estado aberto/fechado do Select de mês/ano. */
  setSelectOpen: (open: boolean) => void;
}

const HeaderSelectGuardContext = createContext<HeaderSelectGuardContextValue>({
  markInteracting: () => {},
  setSelectOpen: () => {},
});

export function useHeaderSelectGuard(): HeaderSelectGuardContextValue {
  return useContext(HeaderSelectGuardContext);
}

export interface HeaderSelectGuardState {
  value: HeaderSelectGuardContextValue;
  shouldKeepCalendarOpen: () => boolean;
}

/** Estado compartilhado entre o DatePicker e os Selects de mês/ano do header. */
export function useHeaderSelectGuardState(): HeaderSelectGuardState {
  const interactingRef = useRef(false);
  const selectOpenRef = useRef(false);

  const value = useMemo<HeaderSelectGuardContextValue>(
    () => ({
      markInteracting: () => {
        interactingRef.current = true;
      },
      setSelectOpen: (open: boolean) => {
        selectOpenRef.current = open;
        if (!open) {
          interactingRef.current = false;
        }
      },
    }),
    [],
  );

  const shouldKeepCalendarOpen = (): boolean => {
    if (interactingRef.current || selectOpenRef.current) return true;

    const dropdown = document.querySelector(`.${HEADER_DROPDOWN_CLASS}`);
    if (!dropdown) return false;

    return (dropdown as HTMLElement).getClientRects().length > 0;
  };

  return { value, shouldKeepCalendarOpen };
}

export function HeaderSelectGuardProvider({
  value,
  children,
}: {
  value: HeaderSelectGuardContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <HeaderSelectGuardContext.Provider value={value}>
      {children}
    </HeaderSelectGuardContext.Provider>
  );
}
