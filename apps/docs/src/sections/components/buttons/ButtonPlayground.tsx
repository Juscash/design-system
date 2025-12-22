import React, { useCallback } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as DS from "@Juscash/design-system";

interface ButtonPlaygroundProps {
  code: string;
  title?: string;
}

export const ButtonPlayground: React.FC<ButtonPlaygroundProps> = ({
  code,
  title,
}) => {
  const transformCode = useCallback((src: string) => {
    const cleaned = src
      .replace(/^import[^;]+;\s*/gm, "")
      .replace(/export\s+default\s+function\s+(\w+)/g, "function $1")
      .replace(/export\s+default\s+class\s+(\w+)/g, "class $1")
      .replace(/export\s+default\s+(\w+)/g, "$1")
      .replace(/export\s+(function|const|let|var|class)\s+/g, "$1 ");

    const match =
      cleaned.match(/function\s+(\w+)/) ||
      cleaned.match(/const\s+(\w+)\s*=/) ||
      cleaned.match(/class\s+(\w+)/);
    const componentName = match ? match[1] : "Example";

    return `${cleaned}\nrender(<${componentName} />);`;
  }, []);

  return (
    <div style={{ border: "1px solid #f0f0f0", borderRadius: 8 }}>
      {title ? (
        <div style={{ padding: "8px 12px", fontWeight: 600 }}>{title}</div>
      ) : null}
      <LiveProvider
        code={code}
        transformCode={transformCode}
        scope={{ React, ...DS }}
        noInline
        language="tsx"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            padding: 12,
          }}
        >
          <div
            style={{
              border: "1px solid #eaeaea",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <LiveEditor
              style={{ fontSize: 12, fontFamily: "monospace", minHeight: 220 }}
            />
          </div>
          <div
            style={{
              border: "1px solid #eaeaea",
              borderRadius: 6,
              padding: 12,
              minHeight: 220,
              background: "#fafafa",
            }}
          >
            <LivePreview />
          </div>
        </div>
        <LiveError style={{ color: "red", padding: "8px 12px" }} />
      </LiveProvider>
    </div>
  );
};
