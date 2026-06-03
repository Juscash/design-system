import React from "react";
import * as LucideIcons from "lucide-react";

const ICON_SIZE = 16;

/**
 * Junta tokens de classe filtrando valores falsy.
 */
export function composeClassName(...tokens: Array<string | false | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Resolve um ícone Lucide passado como string para um `ReactNode`.
 * Retorna o próprio `ReactNode` quando o `icon` já vier como elemento.
 */
export function resolveIcon(icon: string | React.ReactNode | undefined): React.ReactNode {
  if (icon === undefined || icon === null) return null;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Found = registry[icon];
  if (typeof Found !== "function" && typeof Found !== "object") return null;
  const IconComponent = Found as React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  return <IconComponent size={ICON_SIZE} aria-hidden />;
}

/**
 * Contexto que indica se a `Sidebar` ancestral está colapsada (72px).
 * Permite que `SidebarItem`/`SidebarGroupLabel` se ajustem automaticamente
 * sem precisar receber a flag via prop.
 */
export const SidebarCollapsedContext = React.createContext<boolean>(false);
