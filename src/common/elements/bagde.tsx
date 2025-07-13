import type { JSX } from "react";
import type { ColorVariant } from "../types/variants";
/**
 * Propiedades del componente Bagde.
 * @property {string} variant - Variantes disponibles: "primary", "secondary", "success", "error", "tertiary".
 */
interface BagdeProps {
    variant?: ColorVariant;
}

/**
 * Componente Bagde que muestra un estado visual.
 * Permite personalizar el color según la variante seleccionada.
 * @param {BagdeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente Bagde.
 */
export default function Bagde({
    variant = "primary",
}: BagdeProps): JSX.Element {
    const variantStyles: Record<string, string> = {
        primary: "bg-primary",
        'primary-light': "bg-primary-light",
        secondary: "bg-secondary",
        success: "bg-success",
        error: "bg-error",
        tertiary: "bg-tertiary",
    };
    return (
        <span className={`absolute top-7 right-12 ${variantStyles[variant]} text-xs px-3 py-1 rounded-full font-semibold cursor-default`}>
            Activo
        </span>
    );
}