import type { JSX } from "react";
import { ColorMap, type ColorVariant } from "../types/variants";
/**
 * Propiedades del componente Bagde.
 * `variant` - Define el color del badge.
 * `text` - Texto que se mostrará dentro del badge.
 */
interface BagdeProps {
    variant?: ColorVariant;
    text?: string;
}

/**
 * Componente Bagde que muestra un estado visual.
 * Permite personalizar el color según la variante seleccionada.
 * @param {BagdeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente Bagde.
 */
export function Bagde({
    variant = "primary",
    text
}: BagdeProps): JSX.Element {
    return (
        <span className={`absolute top-7 right-12 ${ColorMap[variant]} text-xs px-3 py-1 rounded-full font-semibold cursor-default`}>
            {text}
        </span>
    );
}

/**
 * Componente BagdeStatus que muestra un estado visual con un texto.
 * Permite personalizar el color según la variante seleccionada y muestra un texto descriptivo.
 * @param {BagdeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente BagdeStatus.
 */
export function BagdeStatus({
    variant = "primary",
    text
}: BagdeProps): JSX.Element {
    const variantState: Record<string, string> = {
        success: "--success-green020",
    };
    return (

        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ColorMap[variant]}`}>
            <div className={`w-2 h-2 rounded-full mr-2 bg-[var(${variantState[variant]})]`} />
            {text}
        </span>
    );
}