import type { JSX } from "react";
import { ColorMap, type ColorVariant } from "../types/variants";
/**
 * Propiedades del componente Badge.
 * `variant` - Define el color del badge.
 * `text` - Texto que se mostrará dentro del badge.
 * `position` - Posición del badge en relación al elemento padre.
 */
interface BadgeProps {
    variant?: ColorVariant;
    text?: string;
    position?: string;
}

/**
 * Componente Badge que muestra un estado visual.
 * Permite personalizar el color según la variante seleccionada.
 * @param {BadgeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente Badge.
 */
export function Badge({
    variant = "primary",
    text,
    position = "absolute top-7 right-12"
}: BadgeProps): JSX.Element {
    return (
        <span className={`${position} ${ColorMap[variant]} text-xs px-3 py-1 rounded-full font-semibold cursor-default`}>
            {text}
        </span>
    );
}

/**
 * Componente BadgeStatus que muestra un estado visual con un texto.
 * Permite personalizar el color según la variante seleccionada y muestra un texto descriptivo.
 * @param {BadgeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente BadgeStatus.
 */
export function BadgeStatus({
    variant = "primary",
    text
}: BadgeProps): JSX.Element {
    const variantState: Record<string, string> = {
        success: "--success-green020",
    };
    return (

        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-default ${ColorMap[variant]}`}>
            <div className={`w-2 h-2 rounded-full mr-2 bg-[var(${variantState[variant]})]`} />
            {text}
        </span>
    );
}