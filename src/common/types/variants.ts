export type ColorVariant = "primary" | "secondary" | "success" | "error" | "tertiary" | "primary-light";

export const ColorMap: Record<ColorVariant, string> = {
    primary: "bg-primary hover:bg-opacity-light transition-smooth",
    "primary-light": "bg-primary-light hover:bg-opacity-light transition-smooth",
    secondary: "bg-secondary hover:bg-opacity-light transition-smooth",
    success: "bg-success hover:bg-opacity-light transition-smooth",
    error: "bg-error hover:bg-opacity-light transition-smooth",
    tertiary: "bg-tertiary hover:bg-opacity-light transition-smooth",
}