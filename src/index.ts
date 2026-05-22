import "./theme/global.css";

export * from "./theme";
export { LIST_IGNORE } from "antd/es/upload/Upload";
export { type RcFile } from "antd/es/upload/interface";
export * from "./components";

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
  Breadcrumb,
  type BreadcrumbProps,
  Pagination,
  type PaginationProps,
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
  DatePicker,
  type DatePickerProps,
  TimePicker,
  type TimePickerProps,
  Calendar,
  type CalendarProps,
  Transfer,
  type TransferProps,
  Slider,
  Rate,
  type RateProps,
  Mentions,
  type MentionsProps,
  AutoComplete,
  type AutoCompleteProps,
  ColorPicker,
  type ColorPickerProps,

  // Exibição de dados
  Progress,
  type ProgressProps,
  Tree,
  type TreeProps,
  Timeline,
  type TimelineProps,
  Collapse,
  type CollapseProps,
  Carousel,
  type CarouselProps,
  Avatar,
  type AvatarProps,
  Descriptions,
  type DescriptionsProps,
  Empty,
  type EmptyProps,
  Image,
  type ImageProps,
  List,
  type ListProps,
  Popover,
  type PopoverProps,
  Statistic,
  type StatisticProps,
  Skeleton,
  type SkeletonProps,
  QRCode,
  type QRCodeProps,

  // Feedback
  Alert,
  type AlertProps,
  Drawer,
  type DrawerProps,
  Modal,
  type ModalProps,
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
  Tooltip,
  type TooltipProps,
  Tour,
  type TourProps,
  Watermark,
  type WatermarkProps,
} from "antd";

export { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";

export * as LucideIcons from "lucide-react";
