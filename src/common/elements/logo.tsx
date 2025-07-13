import ForPetsIcon from "../../assets/icons/pet.svg?react";
import type { JSX } from "react";
import type { IconColor, IconTextColor } from "../types/icons";


interface LogoProps {
    fill?: IconColor; // Clase CSS para el color del icono
    textColor?: IconTextColor; // Clase CSS para el color del texto
    size?: string; // Clase CSS para el tamaño del icono
    href?: string; // URL opcional para redireccionar al hacer clic
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
        size = 'w-8 h-8',
        href = '',
    }: LogoProps
): JSX.Element {
    // Función para convertir la clase de icono a clase de texto equivalente
    const getTextColorFromIconColor = (iconColor: IconColor): IconTextColor => {
        return iconColor.replace('icon-', 'text-') as IconTextColor;
    };

    // Usar textColor si se proporciona, sino derivar del color del icono
    const finalTextColor = textColor || getTextColorFromIconColor(fill);

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Icono y 4Pets */}
            <div className="flex flex-col items-center leading-none cursor-pointer" {
                ...(
                    href != ''
                        ? { onClick: () => window.location.href = href }
                        : {}
                )
            }>
                <ForPetsIcon className={`${size} ${fill} transition-smooth`} />
                <span className={`text-sm font-semibold ${finalTextColor} transition-smooth`}>
                    4Pets
                </span>
            </div>
        </div>
    );
}