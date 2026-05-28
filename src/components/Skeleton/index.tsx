import React from "react";
import type {
  SkeletonAvatarProps,
  SkeletonComponent,
  SkeletonLineProps,
  SkeletonObjectProps,
  SkeletonProps,
} from "../../types/components/Skeleton";
import "./index.module.css";

const ROOT_CLASS = "ds-skeleton";
const STACK_CLASS = "ds-skeleton-stack";
const AVATAR_CLASS = "ds-skeleton-avatar";
const LINE_CLASS = "ds-skeleton-line";
const OBJECT_CLASS = "ds-skeleton-object";
const ANIMATED_CLASS = "ds-skeleton-animated";
const DEFAULT_ARIA_LABEL = "Carregando...";

/**
 * Combina classes próprias do design system com `className` externo. Filtra
 * valores falsy para evitar espaços duplicados na string final.
 */
function composeClassName(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Subcomponente avatar do skeleton. Disco 48x48 com cor `neutral/100`,
 * `radius.full` e animação de pulse opcional (`animated`, default `true`).
 * Fonte: dump `figma/components/skeleton/...` node 4080:20600.
 */
const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ animated = true, className, ...rest }) => (
  <div {...rest} className={composeClassName(AVATAR_CLASS, animated && ANIMATED_CLASS, className)} />
);
SkeletonAvatar.displayName = "Skeleton.Avatar";

/**
 * Subcomponente linha do skeleton. Barra 100% × 16px com `radius.xl` e
 * animação de pulse opcional. Fonte: dump node 4080:20604.
 */
const SkeletonLine: React.FC<SkeletonLineProps> = ({ animated = true, className, ...rest }) => (
  <div {...rest} className={composeClassName(LINE_CLASS, animated && ANIMATED_CLASS, className)} />
);
SkeletonLine.displayName = "Skeleton.Line";

/**
 * Subcomponente bloco do skeleton. Bloco 100% × 132px com `radius.xl` e
 * animação de pulse opcional. Fonte: dump node 4080:20608.
 */
const SkeletonObject: React.FC<SkeletonObjectProps> = ({ animated = true, className, ...rest }) => (
  <div {...rest} className={composeClassName(OBJECT_CLASS, animated && ANIMATED_CLASS, className)} />
);
SkeletonObject.displayName = "Skeleton.Object";

/**
 * Componente composto `Skeleton`. Renderiza um placeholder visual de
 * carregamento composto por avatar + stack (linha + bloco). Estrutura
 * extraída do dump `figma/components/skeleton/design-context-4080-20627.md`
 * (node 4080:20658).
 *
 * Acessibilidade: o wrapper externo carrega `role="status"`,
 * `aria-live="polite"`, `aria-busy="true"` e `aria-label` (default
 * `"Carregando..."`). Os subcomponentes internos recebem `aria-hidden="true"`
 * para evitar leitura redundante.
 *
 * Para layouts customizados, use os subcomponentes diretamente:
 *
 * ```tsx
 * <Skeleton.Avatar />
 * <Skeleton.Line />
 * <Skeleton.Object />
 * ```
 */
const SkeletonRoot: React.FC<SkeletonProps> = (props) => {
  const { animated = true, className, "aria-label": ariaLabel = DEFAULT_ARIA_LABEL, ...rest } = props;
  return (
    <div
      {...rest}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      className={composeClassName(ROOT_CLASS, className)}
    >
      <SkeletonAvatar animated={animated} aria-hidden="true" />
      <div className={STACK_CLASS}>
        <SkeletonLine animated={animated} aria-hidden="true" />
        <SkeletonObject animated={animated} aria-hidden="true" />
      </div>
    </div>
  );
};
SkeletonRoot.displayName = "Skeleton";

const SkeletonComposed = SkeletonRoot as SkeletonComponent;
SkeletonComposed.Avatar = SkeletonAvatar;
SkeletonComposed.Line = SkeletonLine;
SkeletonComposed.Object = SkeletonObject;

export const Skeleton = SkeletonComposed;

export type {
  SkeletonProps,
  SkeletonAvatarProps,
  SkeletonLineProps,
  SkeletonObjectProps,
  SkeletonComponent,
} from "../../types/components/Skeleton";
