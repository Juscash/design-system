import type { RadioProps as AntdRadioProps } from "antd";

export type RadioProps = AntdRadioProps & {
  error?: boolean;
};

export type RichRadioProps = RadioProps & {
  label: string;
  secondaryText?: string;
};

export interface RichRadioOption {
  value: string;
  label: string;
  secondaryText?: string;
  disabled?: boolean;
}

export interface RichRadioGroupProps {
  options: RichRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
