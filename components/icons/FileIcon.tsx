/**
 * Mini file-type badges used inside the pillar mocks and stories.
 * Pure presentational — sized via the `size` prop (default 16).
 */

type FileKind = "pdf" | "xlsx" | "doc";

type FileIconProps = {
  kind: FileKind;
  size?: number;
};

const KIND_STYLE: Record<FileKind, { bg: string; label: string; labelSize: number }> = {
  pdf: { bg: "#EA4335", label: "PDF", labelSize: 4.5 },
  xlsx: { bg: "#107C41", label: "X", labelSize: 5 },
  doc: { bg: "#2A6DF4", label: "DOC", labelSize: 4.5 },
};

export function FileIcon({ kind, size = 16 }: FileIconProps) {
  const { bg, label, labelSize } = KIND_STYLE[kind];
  const width = (size * 14) / 16; // preserve original 14:16 ratio
  const cornerSize = size / 4; // folded-corner triangle
  const fontSize = (labelSize * size) / 16;

  return (
    <div
      className="relative flex flex-shrink-0 items-end justify-center overflow-hidden rounded-[1.5px]"
      style={{ height: size, width, background: bg }}
    >
      <span className="font-bold leading-none text-white" style={{ marginBottom: 1, fontSize }}>
        {label}
      </span>
      {/* Folded-corner triangle (top-right) */}
      <div
        className="absolute right-0 top-0"
        style={{
          height: 0,
          width: 0,
          borderBottom: `${cornerSize}px solid rgba(255,255,255,0.4)`,
          borderLeft: `${cornerSize}px solid transparent`,
        }}
      />
    </div>
  );
}
