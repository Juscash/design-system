import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Heading2,
  Heading4,
  Body1,
  Body2,
  LucideIcons,
} from "@Juscash/design-system";
import { ButtonPlayground } from "./ButtonPlayground";

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>["type"]>;
const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "neutral",
  "outlined",
  "ghost",
  "destructive",
  "default",
  "dashed",
  "link",
  "text",
];

const buttonSizes: NonNullable<
  React.ComponentProps<typeof Button>["dsSize"]
>[] = ["xs", "s", "m"];

interface DemoCardProps {
  title: string;
  description: string;
  code: string;
  renderButtons?: () => React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  renderButtons,
  code,
}) => {
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <Card
      title={title}
      style={{ width: "100%" }}
      extra={
        <Button type="link" onClick={() => setShowPlayground((prev) => !prev)}>
          {showPlayground ? "Ocultar exemplo" : "Exemplo interativo"}
        </Button>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Body1>{description}</Body1>
        {renderButtons ? (
          <>
            {renderButtons()}
            <Divider plain>
              <Body2 style={{ fontWeight: 600 }}>Exemplo interativo</Body2>
            </Divider>
          </>
        ) : null}
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

const typesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonTypes() {
  return (
    <Space wrap>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="neutral">Neutral</Button>
      <Button type="outlined">Outlined</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="destructive">Destructive</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
      <Button type="text">Text</Button>
    </Space>
  );
}`;

const TypesDemo = () => (
  <DemoCard
    title="Todos os tipos"
    description="Variedade de tipos suportados pelo Button."
    code={typesCode}
    renderButtons={() => (
      <Space size="small" wrap>
        {buttonVariants.map((variant) => (
          <Button key={variant} type={variant}>
            {variant}
          </Button>
        ))}
      </Space>
    )}
  />
);

const sizesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonSizes() {
  return (
    <Space wrap>
      <Button type="primary" dsSize="xs">Primary xs</Button>
      <Button type="primary" dsSize="s">Primary s</Button>
      <Button type="primary" dsSize="m">Primary m</Button>
    </Space>
  );
}`;

const SizesDemo = () => (
  <DemoCard
    title="Tamanhos"
    description="Exemplo com o tipo primary nos tamanhos XS, S e M."
    code={sizesCode}
    renderButtons={() => (
      <Space size="small" wrap>
        {buttonSizes.map((size) => (
          <Button key={size} type="primary" dsSize={size}>
            Primary {size}
          </Button>
        ))}
      </Space>
    )}
  />
);

const iconsCode = `import { Button, Space, LucideIcons } from '@Juscash/design-system';

export function ButtonIcons() {
  const icons = [{icon: LucideIcons.Star, label: "Star"}, {icon: LucideIcons.Bell, label: "Bell"}, {icon: LucideIcons.Settings, label: "Settings"}];

  return (
    <Space wrap>
      {icons.map((Icon, index) => (
        <Button key={index} type="secondary" dsSize="s" icon={<Icon.icon size={16} />}>
          {Icon.label}
        </Button>
      ))}
    </Space>
  );
}`;

const IconsDemo = () => (
  <DemoCard
    title="Com ícones"
    description="Botões com ícones do pacote Lucide (reexportado pelo design system)."
    code={iconsCode}
    renderButtons={() => (
      <Space size="small" wrap>
        {["Star", "Bell", "Settings"].map((icon) => {
          const Icon = (LucideIcons as any)[icon];
          return (
            <Button
              key={icon}
              type="secondary"
              dsSize="s"
              icon={<Icon size={16} />}
            />
          );
        })}
      </Space>
    )}
  />
);

const statesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonStates() {
  return (
    <Space wrap>
      <Button type="primary" loading>Carregando</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="secondary">Normal</Button>
    </Space>
  );
}`;

const StatesDemo = () => (
  <DemoCard
    title="Estados"
    description="Demonstração de estados comuns (loading, disabled, etc.)."
    code={statesCode}
    renderButtons={() => (
      <Space size="small" wrap>
        <Button type="primary" loading>
          Carregando
        </Button>
        <Button type="primary" disabled>
          Disabled
        </Button>
        <Button type="secondary">Normal</Button>
      </Space>
    )}
  />
);

export const ButtonsShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Heading2>Button</Heading2>
    <Body1>
      Botões do design system com tipos, tamanhos, ícones e estados
      personalizados.
    </Body1>
    <TypesDemo />
    <SizesDemo />
    <IconsDemo />
    <StatesDemo />
  </Space>
);
