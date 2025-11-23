'use client';

import Link from 'next/link';
import { Card, Empty } from 'antd';
import { componentRegistry, Heading2, Heading5, Body1, Body2 } from '@juscash/design-system';

export default function ComponentsPage() {
  if (!componentRegistry.length) {
    return <Empty description="Nenhum componente cadastrado ainda" style={{ marginTop: 64 }} />;
  }

  return (
    <div style={{ maxWidth: 1200 }}>
      <Heading2 style={{ marginBottom: 8 }}>Componentes</Heading2>
      <Body1 style={{ marginBottom: 32, color: '#666' }}>
        Explore os componentes disponíveis no design system
      </Body1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {componentRegistry.map((c) => (
          <Link key={c.slug} href={`/components/${c.slug}`} style={{ textDecoration: 'none' }}>
            <Card
              hoverable
              style={{
                height: '100%',
                transition: 'all 0.2s',
              }}
            >
              <Heading5 style={{ marginBottom: 8 }}>{c.name}</Heading5>
              {c.description ? (
                <Body2 style={{ color: '#666', margin: 0 }}>{c.description}</Body2>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
