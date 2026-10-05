import "./theme/global.css";

// Tokens, temas e utilitários de estilo do design system.
export * from "./theme";

// Camada base do antd: re-exporta TODOS os componentes e utilitários do antd
// pelo nome original (Tag, Steps, Cascader, Splitter, Masonry, etc.). Assim,
// qualquer componente do antd sem versão customizada fica disponível
// automaticamente — sem precisar mantê-los em uma lista manual. Isso evita
// regressões de "export ausente" quando o antd ganha componentes novos ou
// quando um componente proprietário é removido (o antd passa a ser o fallback).
export * from "antd";

// Componentes proprietários do design system.
export * from "./components";

// Os nomes abaixo existem TANTO no antd quanto em `./components`. Com dois
// `export *` (antd e ./components), esses nomes ficariam ambíguos e o import
// quebraria. O re-export explícito a partir de `./components` tem precedência
// sobre qualquer `export *`, garantindo que a versão proprietária vença e que
// o antd sirva apenas de fallback para o que não foi customizado.
export {
  Alert,
  type AlertProps,
  Avatar,
  type AvatarProps,
  Badge,
  type BadgeProps,
  Breadcrumb,
  type BreadcrumbProps,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  Carousel,
  type CarouselProps,
  Checkbox,
  type CheckboxProps,
  Collapse,
  type CollapseProps,
  DatePicker,
  type DatePickerProps,
  Drawer,
  type DrawerProps,
  Input,
  type InputProps,
  Modal,
  type ModalProps,
  Pagination,
  type PaginationProps,
  Popover,
  type PopoverProps,
  Progress,
  type ProgressProps,
  Radio,
  type RadioProps,
  Segmented,
  type SegmentedProps,
  Select,
  type SelectProps,
  Skeleton,
  type SkeletonProps,
  Slider,
  Switch,
  type SwitchProps,
  Table,
  type TableProps,
  Tabs,
  type TabsProps,
  Tooltip,
  type TooltipProps,
  Typography,
  Upload,
  type UploadProps,
} from "./components";

// Pass-through dos componentes do antd cujo nome colide com componentes
// proprietários do design system. Renomeados com prefixo `Ant` para que o
// consumidor possa usar o original do antd quando precisar de comportamento
// 1:1 sem a camada de identidade visual.
export {
  Alert as AntAlert,
  type AlertProps as AntAlertProps,
  Avatar as AntAvatar,
  type AvatarProps as AntAvatarProps,
  Breadcrumb as AntBreadcrumb,
  type BreadcrumbProps as AntBreadcrumbProps,
  Button as AntButton,
  type ButtonProps as AntButtonProps,
  Carousel as AntCarousel,
  type CarouselProps as AntCarouselProps,
  Collapse as AntCollapse,
  type CollapseProps as AntCollapseProps,
  DatePicker as AntDatePicker,
  type DatePickerProps as AntDatePickerProps,
  Drawer as AntDrawer,
  type DrawerProps as AntDrawerProps,
  Modal as AntModal,
  type ModalProps as AntModalProps,
  Pagination as AntPagination,
  type PaginationProps as AntPaginationProps,
  Popover as AntPopover,
  type PopoverProps as AntPopoverProps,
  Skeleton as AntSkeleton,
  type SkeletonProps as AntSkeletonProps,
  Tooltip as AntTooltip,
  type TooltipProps as AntTooltipProps,
} from "antd";

// Utilitários do antd que vivem em subpaths (não cobertos por `export *`).
export { LIST_IGNORE } from "antd/es/upload/Upload";
export type { RcFile, UploadFile } from "antd/es/upload/interface";

export * as LucideIcons from "lucide-react";
