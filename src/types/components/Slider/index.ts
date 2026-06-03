import type { SliderSingleProps, SliderRangeProps } from "antd/es/slider";

/**
 * Props do Slider do design system. União das duas variantes nativas do
 * Ant Design (`SliderSingleProps` para slider de valor único e
 * `SliderRangeProps` para slider de intervalo). Conforme o dump
 * `figma/components/slider/` (`4069:5196`), o componente cobre as variantes
 * horizontal default, horizontal range, vertical default e vertical range,
 * todas já mapeadas no Antd via combinações de `vertical` + `range`.
 */
export type SliderProps = SliderSingleProps | SliderRangeProps;
