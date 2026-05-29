import React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Resolve um valor que pode ser `ReactNode` ou nome de um ícone do
 * `lucide-react` para um elemento renderizável. Mantém o Lucide como único
 * provedor de ícones do design system (regra `CLAUDE.md`).
 *
 * - Se `icon` é `null`/`undefined`, retorna `null`.
 * - Se `icon` é `ReactNode`, retorna direto.
 * - Se `icon` é string, busca no registry do `lucide-react` e instancia o
 *   componente com o `size` informado. Quando o nome não existe, retorna a
 *   string como fallback (tratado pelo React como texto).
 */
export function resolveLucideIcon(icon: React.ReactNode | string | undefined, size: number): React.ReactNode {
  if (icon === undefined || icon === null) return null;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return icon;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  return <IconComponent size={size} />;
}
