import type { InputHTMLAttributes, JSX } from "react";
import type { FieldError } from "react-hook-form";

/**
 * Propiedades del componente FormInput.
 * - `label`: Texto de la etiqueta del campo.
 * - `name`: Nombre del campo, utilizado para el registro y la identificación.
 * - `register`: Función de registro de react-hook-form para vincular el campo al formulario.
 * - `error`: Error asociado al campo, si existe.
 * - `containerClassName`: Clase CSS para el contenedor del campo.
 * - `labelClassName`: Clase CSS para la etiqueta del campo.
 * - `inputClassName`: Clase CSS para el campo de entrada.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register?: any;
    error?: FieldError;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

/**
 * Componente Input.
 * Este componente renderiza un campo de entrada con una etiqueta y maneja errores de validación.
 * @returns {JSX.Element} Componente de entrada de formulario.
 * @param {InputProps} props - Propiedades del componente.
 */
export default function Input({
    label,
    name,
    register,
    error,
    containerClassName = "mb-5",
    labelClassName = "block text-sm font-medium text-current mb-2",
    inputClassName = "",
    ...rest
}: InputProps): JSX.Element {
    const inputBaseStyle = "w-full p-3 rounded-md outline-none input";

    return (
        <div className={containerClassName}>
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                {...(register ? register(name) : {})}
                {...rest}
                className={`${inputBaseStyle} ${inputClassName}`}
            />
            {error && (
                <p className="text-error text-sm mt-1 italic">{error.message}</p>
            )}
        </div>
    );
}