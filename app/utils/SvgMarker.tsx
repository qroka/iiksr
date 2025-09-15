"use client";
import React from "react";

type SvgMarkerProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string; // CSS color or var(--...)
  title?: string;
};

/**
 * Inline SVG renderer that loads an external SVG and forces all fills to currentColor
 * so you can recolor via CSS (style.color).
 */
export default function SvgMarker({ src, width, height, className, style, color, title }: SvgMarkerProps) {
  const [svgHtml, setSvgHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;
    async function load() {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        const text = await res.text();
        if (isCancelled) return;
        // Force fill to currentColor to enable CSS coloring
        let processed = text
          // normalize hardcoded fills to currentColor
          .replace(/fill\s*=\s*"#[0-9a-fA-F]{3,8}"/g, "fill=\"currentColor\"")
          .replace(/fill\s*=\s*'#[0-9a-fA-F]{3,8}'/g, "fill='currentColor'")
          // normalize hardcoded strokes to currentColor
          .replace(/stroke\s*=\s*"#[0-9a-fA-F]{3,8}"/g, "stroke=\"currentColor\"")
          .replace(/stroke\s*=\s*'#[0-9a-fA-F]{3,8}'/g, "stroke='currentColor'")
          // ensure root svg has fill and stroke currentColor if not present
          .replace(/<svg([^>]*)>/, (m, attrs) => {
            let newAttrs = attrs;
            if (!/\sfill\s*=/.test(newAttrs)) {
              newAttrs += ' fill="currentColor"';
            }
            if (!/\sstroke\s*=/.test(newAttrs)) {
              newAttrs += ' stroke="currentColor"';
            }
            return `<svg${newAttrs}>`;
          });
        setSvgHtml(processed);
      } catch (e) {
        // fallback: nothing
        setSvgHtml(null);
      }
    }
    load();
    return () => {
      isCancelled = true;
    };
  }, [src]);

  return (
    <div
      className={className}
      style={{
        display: "block",
        width,
        height,
        color: color,
        lineHeight: 0,
        ...style,
      }}
      title={title}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={svgHtml ? { __html: svgHtml } : undefined}
    />
  );
}


