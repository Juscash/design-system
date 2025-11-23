export type ComponentRegistryItem = {
  name: string;
  slug: string;
  description?: string;
};

export const componentRegistry: ComponentRegistryItem[] = [
  {
    name: 'Typography',
    slug: 'typography',
    description: 'Componente de tipografia com variantes de heading, body e caption',
  },
  {
    name: 'Button',
    slug: 'button',
    description: 'Botões baseados em Ant Design com variante secondary',
  },
];


