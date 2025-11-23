import { designSystemColors } from '@juscash/design-system';

type Palette = Record<string, string>;

function Swatch({ name, value }: { name: string; value: string }) {
  const textColor = '#000000';
  return (
    <div
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #e5e5e5',
        background: '#fff',
      }}
    >
      <div style={{ background: value, height: 56 }} />
      <div style={{ padding: 8 }}>
        <div style={{ fontSize: 12, color: textColor }}>{name}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{value}</div>
      </div>
    </div>
  );
}

function PaletteGrid({ title, palette }: { title: string; palette: Palette }) {
  const entries = Object.entries(palette);
  return (
    <section style={{ display: 'grid', gap: 8 }}>
      <h2 style={{ margin: '8px 0' }}>{title}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {entries.map(([k, v]) => (
          <Swatch key={k} name={k} value={v} />
        ))}
      </div>
    </section>
  );
}

export default function DesignTokensPage() {
  const { neutral, primary, secondary, feedback } = designSystemColors;
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <PaletteGrid title="Neutral" palette={neutral} />
      <PaletteGrid title="Primary" palette={primary} />
      <PaletteGrid title="Secondary" palette={secondary} />
      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ margin: '8px 0' }}>Feedback</h2>
        <div style={{ display: 'grid', gap: 20 }}>
          <PaletteGrid title="Green" palette={feedback.green} />
          <PaletteGrid title="Red" palette={feedback.red} />
          <PaletteGrid title="Yellow" palette={feedback.yellow} />
          <PaletteGrid title="Blue" palette={feedback.blue} />
          <PaletteGrid title="Orange" palette={feedback.orange} />
        </div>
      </section>
    </div>
  );
}
