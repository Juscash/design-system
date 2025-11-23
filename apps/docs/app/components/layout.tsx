'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { componentRegistry } from '@juscash/design-system';

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: '/components',
    label: <Link href="/components">Visão Geral</Link>,
  },
  ...componentRegistry.map((component) => ({
    key: `/components/${component.slug}`,
    label: <Link href={`/components/${component.slug}`}>{component.name}</Link>,
  })),
];

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Layout style={{ minHeight: 'calc(100vh - 65px)' }}>
      <Sider
        width={250}
        style={{
          background: '#fff',
          borderRight: '1px solid #e5e5e5',
          paddingTop: 16,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[pathname || '/components']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>
      <Content style={{ padding: 24, background: '#fafafa' }}>{children}</Content>
    </Layout>
  );
}

