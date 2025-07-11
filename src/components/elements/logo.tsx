import ForPetsIcon from "../../assets/icons/pet.svg?react";
import type { JSX } from "react";

type LogoIconColor = 
    | 'icon-primary' | 'icon-primary-light' | 'icon-primary-medium' | 'icon-primary-dark'
    | 'icon-on-primary' | 'icon-on-primary-container'
    | 'icon-secondary' | 'icon-secondary-light' | 'icon-secondary-medium' | 'icon-secondary-dark'
    | 'icon-on-secondary' | 'icon-on-secondary-container'
    | 'icon-tertiary' | 'icon-tertiary-light' | 'icon-tertiary-medium' | 'icon-tertiary-dark'
    | 'icon-on-tertiary' | 'icon-on-tertiary-container'
    | 'icon-error' | 'icon-error-light' | 'icon-error-medium' | 'icon-error-dark'
    | 'icon-on-error' | 'icon-on-error-container'
    | 'icon-success' | 'icon-success-light' | 'icon-success-medium' | 'icon-success-dark'
    | 'icon-on-success' | 'icon-on-success-container'
    | 'icon-neutral-light' | 'icon-neutral-medium' | 'icon-neutral-dark';

type LogoTextColor = 
    | 'text-primary' | 'text-primary-light' | 'text-primary-medium' | 'text-primary-dark'
    | 'text-on-primary' | 'text-on-primary-container'
    | 'text-secondary' | 'text-secondary-light' | 'text-secondary-medium' | 'text-secondary-dark'
    | 'text-on-secondary' | 'text-on-secondary-container'
    | 'text-tertiary' | 'text-tertiary-light' | 'text-tertiary-medium' | 'text-tertiary-dark'
    | 'text-on-tertiary' | 'text-on-tertiary-container'
    | 'text-error' | 'text-error-light' | 'text-error-medium' | 'text-error-dark'
    | 'text-on-error' | 'text-on-error-container'
    | 'text-success' | 'text-success-light' | 'text-success-medium' | 'text-success-dark'
    | 'text-on-success' | 'text-on-success-container'
    | 'text-neutral-light' | 'text-neutral-medium' | 'text-neutral-dark';

interface LogoProps {
    fill?: LogoIconColor; // Clase CSS para el color del icono
    textColor?: LogoTextColor; // Clase CSS para el color del texto
    size?: string; // Clase CSS para el tamaño del icono
}

/**
 * Componente que renderiza el logo de 4Pets.
 * Este componente muestra un icono y el texto "4Pets" alineados verticalmente.
 * Acepta diferentes colores tanto para el icono como para el texto según el sistema de diseño.
 * @param fill - Color del icono usando las clases CSS disponibles
 * @param textColor - Color del texto, si no se especifica, usa el mismo que el icono
 * @param size - Tamaño del icono usando clases de Tailwind
 * @returns {JSX.Element} Componente que renderiza el logo de 4Pets.
 */
export default function Logo(
    {
        fill = 'icon-primary',
        textColor,
        size = 'w-8 h-8'
    }: LogoProps
): JSX.Element {
    // Función para convertir la clase de icono a clase de texto equivalente
    const getTextColorFromIconColor = (iconColor: LogoIconColor): LogoTextColor => {
        return iconColor.replace('icon-', 'text-') as LogoTextColor;
    };

    // Usar textColor si se proporciona, sino derivar del color del icono
    const finalTextColor = textColor || getTextColorFromIconColor(fill);

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Icono y 4Pets */}
            <div className="flex flex-col items-center leading-none">
                <ForPetsIcon className={`${size} ${fill} transition-smooth`} />
                <span className={`text-sm font-semibold ${finalTextColor} transition-smooth`}>
                    4Pets
                </span>
            </div>
        </div>
    );
}