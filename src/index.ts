import "./theme/global.css";

export * from "./theme";
export { LIST_IGNORE } from "antd/es/upload/Upload";
export { type RcFile } from "antd/es/upload/interface";
export * from "./components";
export { applyMask } from "./utils/applyMask";
export type { ApplyMaskResult, InputMask, MaskTransform } from "./types/utils/applyMask";
export { BUILTIN_ERROR_MESSAGES, getBuiltinValidator, isValidCnj, isValidCpf, isValidEmail } from "./utils/validateInput";

export {
  type UploadFile,

  // Núcleo
  ConfigProvider,
  theme,
  type ThemeConfig,

  // Layout
  Layout,
  Grid,
  Row,
  Col,
  Space,
  Divider,
  Flex,
  Form,
  type FormProps,

  // Navegação
  Menu,
  type MenuProps,
  Steps,
  type StepsProps,
  Anchor,
  type AnchorProps,

  // Entrada de dados
  InputNumber,
  type InputNumberProps,
  TreeSelect,
  type TreeSelectProps,
  Cascader,
  type CascaderProps,
  TimePicker,
  type TimePickerProps,
  Calendar,
  type CalendarProps,
  Transfer,
  type TransferProps,
  Rate,
  type RateProps,
  Mentions,
  type MentionsProps,
  AutoComplete,
  type AutoCompleteProps,
  ColorPicker,
  type ColorPickerProps,

  // Exibição de dados
  Tree,
  type TreeProps,
  Timeline,
  type TimelineProps,
  Descriptions,
  type DescriptionsProps,
  Empty,
  type EmptyProps,
  Image,
  type ImageProps,
  List,
  type ListProps,
  Statistic,
  type StatisticProps,
  QRCode,
  type QRCodeProps,

  // Feedback
  message,
  notification,
  Popconfirm,
  type PopconfirmProps,
  Spin,
  type SpinProps,
  Result,
  type ResultProps,

  // Geral
  FloatButton,
  type FloatButtonProps,

  // Outros
  Affix,
  type AffixProps,
  BackTop,
  type BackTopProps,
  Dropdown,
  type DropdownProps,
  Tour,
  type TourProps,
  Watermark,
  type WatermarkProps,
} from "antd";

// Pass-through dos componentes do Antd cujo nome colide com componentes
// proprietários do design system. Renomeados com prefixo `Ant` para que o
// consumidor possa usar o original do Antd quando precisar de comportamento
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

export * as LucideIcons from "lucide-react";
