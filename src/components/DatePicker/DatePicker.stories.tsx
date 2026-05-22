import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DatePicker } from ".";
import { RangePicker } from "../RangePicker";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4066-8379&m=dev";

type DatePickerStoryProps = React.ComponentProps<typeof DatePicker> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

type RangePickerStoryProps = React.ComponentProps<typeof RangePicker> & {
  focus?: boolean;
};

const meta: Meta<DatePickerStoryProps> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de seleção de data (DatePicker) baseado no [Ant Design DatePicker](https://ant.design/components/date-picker).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD DatePicker.

### Como usar:

\`\`\`tsx
import { DatePicker, RangePicker } from "@juscash/design-system";

function Example() {
  return (
    <>
      <DatePicker onChange={(date) => console.log(date)} />
      <RangePicker onChange={(dates) => console.log(dates)} />
    </>
  );
}
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <Primary />

          <Controls />

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🎨 Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    focus: false,
  },
  argTypes: {
    focus: {
      control: "boolean",
      description: "Força o estado focus",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, className, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus pseudo-focus-all"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <DatePicker {...props} className={mergedClassName} />;
  },
};

export default meta;

type DatePickerStory = StoryObj<DatePickerStoryProps>;
type RangePickerStory = StoryObj<RangePickerStoryProps>;

export const Default: DatePickerStory = {
  render: (args) => {
    const { focus, className, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <DatePicker {...props} className={mergedClassName} />;
  },
};

export const WithPlaceholder: DatePickerStory = {
  args: {
    placeholder: "Selecione uma data",
  },
  render: (args) => {
    const { focus, className, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <DatePicker {...props} className={mergedClassName} />;
  },
};

export const Range: RangePickerStory = {
  args: {
    focus: false,
  },
  render: (args) => {
    const { focus, className, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <RangePicker {...props} className={mergedClassName} />;
  },
};

export const RangeWithPlaceholder: RangePickerStory = {
  args: {
    placeholder: ["Data inicial", "Data final"],
    focus: false,
  },
  render: (args) => {
    const { focus, className, ...props } = args;
    const pseudoClasses = [focus && "pseudo-focus"].filter(Boolean).join(" ");
    const mergedClassName = [className, pseudoClasses].filter(Boolean).join(" ");

    return <RangePicker {...props} className={mergedClassName} />;
  },
};
