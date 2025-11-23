import { componentRegistry } from '@juscash/design-system';

export default function ComponentsPage() {
  if (!componentRegistry.length) {
    return <p>Nenhum componente cadastrado ainda.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {componentRegistry.map((c) => (
        <div
          key={c.slug}
          style={{ padding: 12, borderRadius: 8, border: '1px solid #e5e5e5', background: '#fff' }}
        >
          <strong>{c.name}</strong>
          {c.description ? <p style={{ margin: '4px 0 0 0' }}>{c.description}</p> : null}
        </div>
      ))}
    </div>
  );
}


