// FlowLens design-system — shared tokens consumed by apps/web Tailwind config and components.

export const colors = {
  brand: {
    50: "#f2f6ff",
    100: "#e2eaff",
    300: "#a9bdff",
    500: "#4f6df5",
    600: "#3c54dd",
    700: "#2f42ad",
    900: "#1b2454",
  },
  ink: {
    50: "#f7f8fa",
    100: "#eceef2",
    300: "#c3c8d3",
    500: "#6b7280",
    700: "#374151",
    900: "#101322",
  },
  accent: {
    amber: "#f5a524",
    rose: "#f5455c",
    emerald: "#22c55e",
  },
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
} as const;

export const shadows = {
  card: "0 1px 2px rgba(16,19,34,0.04), 0 8px 24px rgba(16,19,34,0.06)",
  cardHover: "0 2px 4px rgba(16,19,34,0.06), 0 16px 40px rgba(16,19,34,0.10)",
} as const;

export const fonts = {
  sans: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
} as const;
