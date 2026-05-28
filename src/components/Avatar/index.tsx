import React from "react";
import { Avatar as AntdAvatar, ConfigProvider } from "antd";
import { ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { designSystemColors } from "../../theme";
import type { AvatarProps, AvatarSize } from "../../types/components/Avatar";
import "./index.module.css";

const SIZE_MAP: Record<AvatarSize, number> = {
  small: 32,
  regular: 40,
};

/** Conforme Figma: `body/02 - 13px` em **Bold** para ambos os tamanhos. */
const TEXT_FONT_SIZE = 13;
const MENU_CHEVRON_SIZE = 16;
const MENU_GAP = 4;
const MENU_AVATAR_SIZE: AvatarSize = "small";
const BASE_CLASS = "ds-avatar";
const MENU_CLASS = "ds-avatar-menu";
const MENU_OPEN_CLASS = "ds-avatar-menu--open";

/**
 * Resolve o conteúdo de `src`: quando string, renderiza `<img>` interno com
 * `objectFit: cover`, `userSelect: none` e `pointerEvents: none` — evita o
 * usuário arrastar/copiar a imagem. ReactNode passa direto. Quando a imagem
 * falha (404, sem internet, etc.), `onError` aciona o callback do consumer
 * para cair no fallback (iniciais ou ícone).
 */
function resolveSrc(src: AvatarProps["src"], alt: string | undefined, onError: () => void): React.ReactNode {
  if (typeof src !== "string") return src;
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={onError}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * Resolve `icon`: aceita `ReactNode` (passa direto) ou string com nome de
 * ícone Lucide (ex.: `"User"`) — neste caso, instancia o componente com
 * tamanho adequado ao avatar.
 */
function resolveIcon(icon: React.ReactNode | string | undefined, size: AvatarSize): React.ReactNode {
  if (icon === undefined || icon === null) return undefined;
  if (typeof icon !== "string") return icon;
  const registry = LucideIcons as unknown as Record<string, unknown>;
  const Candidate = registry[icon];
  if (typeof Candidate !== "function" && typeof Candidate !== "object") return icon;
  const IconComponent = Candidate as React.ComponentType<{ size?: number }>;
  const iconSize = size === "small" ? 16 : 20;
  return <IconComponent size={iconSize} />;
}

/**
 * Estilo inline aplicado ao Avatar do Antd. Reúne tokens do Figma: bg
 * `neutral/200`, border 1px `neutral/50`, color `text/dark`, Inter Bold 13px.
 * `borderRadius` fixado em `50%` — conforme Figma, a única forma é `round`.
 * A fonte é herdada do `body` global via `theme/global.css`.
 */
function buildAvatarStyle(external?: React.CSSProperties): React.CSSProperties {
  return {
    ...external,
    borderRadius: "50%",
    fontSize: TEXT_FONT_SIZE,
    fontWeight: 700,
    backgroundColor: designSystemColors.neutral[200],
    color: designSystemColors.neutral[800],
    border: `1px solid ${designSystemColors.neutral[50]}`,
    userSelect: "none",
    WebkitUserSelect: "none",
    overflow: "hidden",
  };
}

/**
 * Avatar do design system. Suporta 3 tipos de conteúdo (initials/icon/picture),
 * 2 tamanhos (`small`/`regular`), forma fixa `round` (círculo) e a variante
 * "avatar menu" (botão com ChevronDown ao lado, conforme Figma).
 */
export function Avatar(props: AvatarProps): React.ReactElement {
  const {
    dsSize = "regular",
    roundness: _roundnessIgnored = "round",
    avatarMenu = false,
    menuOpen,
    onMenuOpenChange,
    style,
    src,
    alt,
    icon,
    className,
    size: _sizeIgnored,
    ...rest
  } = props;

  const effectiveSize = avatarMenu ? MENU_AVATAR_SIZE : dsSize;
  const currentSize = SIZE_MAP[effectiveSize];
  const avatarStyle = buildAvatarStyle(style);
  const [imageError, setImageError] = React.useState(false);
  // Quando a imagem cai em erro, voltamos para children/icon (sem renderizar
  // o <img> interno). Reset automático se o `src` mudar.
  React.useEffect(() => {
    setImageError(false);
  }, [src]);
  const resolvedSrc = imageError ? undefined : resolveSrc(src, alt, () => setImageError(true));
  const resolvedIcon = resolveIcon(icon, effectiveSize);
  const finalClassName = [BASE_CLASS, className].filter(Boolean).join(" ");

  const avatarNode = (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSize: currentSize,
            containerSizeSM: SIZE_MAP.small,
            containerSizeLG: SIZE_MAP.regular,
            textFontSize: TEXT_FONT_SIZE,
            textFontSizeSM: TEXT_FONT_SIZE,
            textFontSizeLG: TEXT_FONT_SIZE,
          },
        },
      }}
    >
      <AntdAvatar
        size={currentSize}
        style={avatarStyle}
        src={resolvedSrc}
        alt={alt}
        icon={resolvedIcon}
        className={finalClassName}
        {...rest}
      />
    </ConfigProvider>
  );

  if (!avatarMenu) return avatarNode;
  const menuLabel = buildMenuLabel(props, alt);
  return (
    <AvatarMenuButton menuOpen={menuOpen} onMenuOpenChange={onMenuOpenChange} ariaLabel={menuLabel}>
      {avatarNode}
    </AvatarMenuButton>
  );
}

/**
 * Compõe o `aria-label` do botão de avatar-menu. Usa, em ordem de prioridade:
 * 1. `aria-label` explicitamente informado pelo consumer;
 * 2. `alt` da imagem;
 * 3. iniciais quando `children` é texto;
 * 4. fallback genérico "Menu do usuário".
 */
function buildMenuLabel(props: AvatarProps, alt: string | undefined): string {
  const explicit = (props as { "aria-label"?: string })["aria-label"];
  if (explicit) return explicit;
  if (alt) return alt;
  if (typeof props.children === "string") return props.children;
  return "Menu do usuário";
}

Avatar.displayName = "Avatar";

interface AvatarMenuButtonProps {
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  ariaLabel: string;
  children: React.ReactNode;
}

/**
 * Wrapper de botão para a variante "avatar menu" — adiciona `ChevronDown`
 * (Lucide) à direita do avatar, controla `aria-expanded` e chama
 * `onMenuOpenChange` no click. Suporta uso controlled (via `menuOpen`)
 * ou uncontrolled (state interno).
 */
function AvatarMenuButton({ menuOpen, onMenuOpenChange, ariaLabel, children }: AvatarMenuButtonProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = menuOpen !== undefined;
  const open = isControlled ? Boolean(menuOpen) : internalOpen;

  const handleToggle = (): void => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onMenuOpenChange?.(next);
  };

  const className = [MENU_CLASS, open ? MENU_OPEN_CLASS : undefined].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-expanded={open}
      aria-haspopup="menu"
      aria-label={ariaLabel}
      onClick={handleToggle}
      style={{ gap: MENU_GAP }}
    >
      {children}
      <ChevronDown size={MENU_CHEVRON_SIZE} aria-hidden="true" className="ds-avatar-menu__chevron" />
    </button>
  );
}

AvatarMenuButton.displayName = "AvatarMenuButton";

export const AvatarGroup = AntdAvatar.Group;

export type { AvatarProps, AvatarSize, AvatarRoundness } from "../../types/components/Avatar";
