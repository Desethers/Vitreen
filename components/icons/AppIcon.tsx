/**
 * Brand app icons used inside mock UIs. Uses official assets from
 * /public/logos/ when available, falls back to a tuned SVG/css mock
 * for the calendar.
 */

type Brand = "outlook" | "whatsapp" | "calendar";

type AppIconProps = {
  brand: Brand;
  size?: number;
  /** Optional rounded-corner override for square brand marks. */
  rounded?: number;
};

export function AppIcon({ brand, size = 11, rounded }: AppIconProps) {
  if (brand === "outlook") {
    return (
      <img
        src="/logos/Microsoft_Office_Outlook_Logo.svg"
        alt=""
        aria-hidden="true"
        className="flex-shrink-0 object-contain"
        style={{ height: size, width: size }}
      />
    );
  }

  if (brand === "whatsapp") {
    return (
      <img
        src="/logos/Android_App_Icon_2026.png"
        alt=""
        aria-hidden="true"
        className="flex-shrink-0 object-contain"
        style={{ height: size, width: size, borderRadius: rounded ?? size / 5 }}
      />
    );
  }

  // calendar — Apple-style card
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`cal-clip-${size}`}>
          <rect width="32" height="32" rx={rounded ?? 6} />
        </clipPath>
      </defs>
      <g clipPath={`url(#cal-clip-${size})`}>
        <rect width="32" height="32" fill="white" />
        <rect width="32" height="9" fill="#FF3B30" />
        <text
          x="16"
          y="6.5"
          fontSize="4"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          fontFamily="-apple-system, system-ui, sans-serif"
        >
          TUE
        </text>
        <text
          x="16"
          y="25"
          fontSize="14"
          fontWeight="700"
          fill="#111110"
          textAnchor="middle"
          fontFamily="-apple-system, system-ui, sans-serif"
        >
          25
        </text>
        <rect
          x="0.25"
          y="0.25"
          width="31.5"
          height="31.5"
          rx={(rounded ?? 6) - 0.25}
          fill="none"
          stroke="#E0E0DD"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}
