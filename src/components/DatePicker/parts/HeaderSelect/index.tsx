import React from "react";
import { Select } from "../../../Select";
import type { HeaderSelectProps } from "../../../../types/components/DatePicker";
import { HEADER_DROPDOWN_CLASS, useHeaderSelectGuard } from "./context";

const WRAP_CLASS = "ds-datepicker-select-wrap";
const DROPDOWN_SELECTOR = ".ant-select-dropdown";

/**
 * Abre o dropdown ao clicar no gatilho. Roda na fase de **captura**
 * (`onClickCapture`) porque o seletor interno do Antd interrompe a propagação do
 * clique — na fase de bolha o handler nunca seria alcançado. Ignora cliques
 * vindos de dentro do dropdown (opções): como o dropdown é um portal, o React
 * propaga o evento pela árvore de componentes até o wrap; sem este guard, clicar
 * numa opção reabriria o dropdown logo após a seleção fechá-lo.
 */
function handleWrapClickCapture(
  event: React.MouseEvent<HTMLDivElement>,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  if ((event.target as HTMLElement).closest(DROPDOWN_SELECTOR)) return;
  if (!open) setOpen(true);
}

/**
 * Select de mês/ano do header do calendário. **Usa o `Select` do DS** (mesmo
 * visual do componente original — não uma cópia).
 *
 * O `open` é controlado porque o painel do DatePicker faz `preventDefault` no
 * `mousedown`, o que impediria o Select de abrir pelo foco: `onClickCapture`
 * força a abertura no clique do gatilho. O fechamento (seleção, clique fora) é
 * delegado ao Antd via `onOpenChange` (no Antd 6 `onDropdownVisibleChange` está
 * depreciado e não dispara). O dropdown é renderizado no `body` (padrão) para
 * ficar acima do calendário e totalmente clicável — não dentro do popup, onde
 * sobreporia as células. O DatePicker mantém o calendário aberto enquanto este
 * dropdown estiver visível (ver `index.tsx`).
 */
export function HeaderSelect({ value, options, onChange, ariaLabel, width }: HeaderSelectProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const { markInteracting, setSelectOpen } = useHeaderSelectGuard();

  function handleOpenChange(visible: boolean): void {
    setOpen(visible);
    setSelectOpen(visible);
  }

  return (
    <div
      className={WRAP_CLASS}
      style={{ width }}
      onClickCapture={(event) => handleWrapClickCapture(event, open, setOpen)}
      // Impede que o `mousedown` chegue ao painel do DatePicker (que faz
      // `preventDefault` para manter o foco no input). Sem isto o Select abriria
      // e o Antd o fecharia no mesmo gesto, por nunca receber foco.
      onMouseDown={(event) => {
        event.stopPropagation();
        markInteracting();
      }}
    >
      <Select
        size="s"
        aria-label={ariaLabel}
        value={value}
        options={options}
        open={open}
        popupClassName={HEADER_DROPDOWN_CLASS}
        onChange={(next) => onChange(Number(next))}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
}

HeaderSelect.displayName = "HeaderSelect";

export { HEADER_DROPDOWN_CLASS } from "./context";
