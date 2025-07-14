import { useEffect, useRef, useState, type JSX } from "react";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import type { IconColor } from "../types/icons";
import { createPortal } from "react-dom";
import { ColorMap, type ColorVariant } from "../types/variants";

/**
 * Propiedades del botón desplegable.
 * - `text`: Texto del botón.
 * - `onClick`: Función que se ejecuta al hacer clic en el botón.
 * - `disabled`: Indica si el botón está deshabilitado.
 */
export interface DropdownOption {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

/**
 * Propiedades del componente DropdownButton.
 * - `text`: Texto del botón.
 * - `variant`: Estilo semántico del botón, puede ser "primary", "secondary", "success", "error" o "tertiary".
 * - `options`: Lista de opciones del menú desplegable.
 * - `className`: Clases CSS adicionales para personalización.
 * - `fill`: Clase CSS para el color del icono.
 */
interface DropdownButtonProps {
    text: string;
    variant?: ColorVariant;
    options: DropdownOption[];
    className?: string;
    fill?: IconColor;
}

/**
 * Componente de botón desplegable.
 * Permite seleccionar una opción de un menú desplegable con estilos semánticos.
 * @returns {JSX.Element} Componente de botón desplegable.
 * @param {DropdownButtonProps} props - Propiedades del componente.
 */
export default function DropdownButton({
    text,
    variant = "primary",
    options,
    fill = "icon-primary",
}: DropdownButtonProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para controlar la visibilidad del menú desplegable
    const [isOpen, setIsOpen] = useState(false);
    // Referencia al botón para calcular la posición del menú
    const buttonRef = useRef<HTMLButtonElement>(null);
    // Estado para almacenar las coordenadas del menú desplegable
    const [menuStyles, setMenuStyles] = useState<{ top: number; left: number } | null>(null);
    // Efecto para actualizar las coordenadas del menú cuando se abre
    useEffect(() => {
        if (isOpen) {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setMenuStyles({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                });
            }

            const handleScroll = () => setIsOpen(false);
            window.addEventListener("scroll", handleScroll, true); // `true` para capturar en fase de captura
            return () => window.removeEventListener("scroll", handleScroll, true);
        }
    }, [isOpen]);
    /*************************
     ******** UTILS **********
     *************************/
    // Tipo de redondeo y espaciado del botón según el texto
    const roundType = text == '' ? "rounded-full" : "rounded-md px-4 py-2";
    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`w-11 h-11 flex justify-center items-center gap-2 ${roundType} font-semibold transition duration-200 focus:outline-none ${ColorMap[variant]}`}
            >
                {text}
                <ChevronDown className={`w-6 h-6 ${fill}`} />
            </button>

            {isOpen && menuStyles && createPortal(
                <div
                    className="absolute mt-1 w-44 z-50 bg-white shadow-md rounded-md ring-1 ring-black/10"
                    style={{ top: `${menuStyles.top}px`, left: `${menuStyles.left}px`, position: 'absolute' }}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <ul className="py-1 text-sm">
                        {options.map((option, idx) => (
                            <li key={idx}>
                                <button
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-300 transition ${option.disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                    onClick={() => {
                                        if (!option.disabled) {
                                            option.onClick();
                                            setIsOpen(false);
                                        }
                                    }}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>,
                document.body
            )}
        </>
    );
}
