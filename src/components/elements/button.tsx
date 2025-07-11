import type { ButtonHTMLAttributes, JSX } from "react";

/**
 * Propiedades del componente FormButton.
 * - `text`: Texto del botón.
 * - `variant`: Estilo semántico del botón, puede ser "primary", "secondary", "success", "error" o "tertiary".
 * - `fullWidth`: Si el botón debe ocupar todo el ancho del contenedor.
 * - `className`: Clases CSS adicionales para personalización.
 * - `isLoading`: Indica si el botón está en estado de carga.
 */
interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "success" | "error" | "tertiary";
    fullWidth?: boolean;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

/**
 * Componente reutilizable de botón para formularios y acciones generales.
 * Permite estilos semánticos dinámicos y personalización.
 * @returns {JSX.Element} Componente de botón de formulario.
 * @param {FormButtonProps} props - Propiedades del componente.
 */
export default function Button({
    text,
    type = "button",
    variant = "primary",
    fullWidth = true,
    className = "",
    isLoading = false,
    disabled = false,
    ...rest
}: FormButtonProps): JSX.Element {
    const baseClass =
        "rounded-md font-semibold py-3 px-4 text-white transition duration-200 ease-in-out focus:outline-none";

    const variantStyles: Record<string, string> = {
        primary: "bg-[var(--semantic-primary)] hover:bg-[var(--primary-blue080)]",
        secondary: "bg-[var(--semantic-secondary)] hover:bg-[var(--secondary-rose080)]",
        success: "bg-[var(--semantic-success)] hover:bg-[var(--success-green090)]",
        error: "bg-[var(--semantic-error)] hover:bg-[var(--error-red080)]",
        tertiary: "bg-[var(--semantic-tertiary)] hover:bg-[var(--tertiary-cream090)] text-neutral-gray090",
    };

    const widthClass = fullWidth ? "w-full" : "w-auto";

    return (
        <button
            type={type}
            className={`${baseClass} ${variantStyles[variant]} ${widthClass} ${className} ${(isLoading || disabled) ? "opacity-50 cursor-not-allowed" : ""
                }`}
            disabled={isLoading || disabled}
            {...rest}
        >
            {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Procesando...
                </span>
            ) : (
                text
            )}
        </button>
    );
}
