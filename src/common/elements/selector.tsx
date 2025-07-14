import type { JSX, SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

/**
 * Propiedades de la opción del selector.
 * - `label`: Texto que se mostrará en la opción del selector.
 * - `value`: Valor asociado a la opción del selector.
 */
interface Option {
    label: string;
    value: string;
}

/**
 * Propiedades para el componente Select personalizado.
 * - `label`: Texto de la etiqueta del selector.
 * - `name`: Nombre del selector, utilizado para el registro y la identificación.
 * - `register`: Función de registro de react-hook-form para vincular el selector al formulario.
 * - `options`: Lista de opciones que se mostrarán en el selector.
 * - `error`: Error asociado al selector, si existe.
 * - `containerClassName`: Clase CSS para el contenedor del selector.
 * - `labelClassName`: Clase CSS para la etiqueta del selector.
 * - `selectClassName`: Clase CSS para el elemento select.
 */
interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    register: any;
    options: Option[];
    error?: FieldError;
    containerClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
}

/**
 * Componente Select.
 * Este componente renderiza un selector con una etiqueta y maneja errores de validación.
 * @param {FormSelectProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de selector de formulario.
 */
export default function Select({
    label,
    name,
    register,
    options,
    error,
    containerClassName = "mb-5",
    labelClassName = "block text-sm font-medium text-current mb-2",
    selectClassName = "",
    ...rest
}: FormSelectProps): JSX.Element {
    const baseStyle = "w-full p-3 rounded-md outline-none input";

    return (
        <div className={containerClassName}>
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>
            <select
                id={name}
                {...register(name)}
                {...rest}
                className={`${baseStyle} ${selectClassName}`}
            >
                <option value="" selected>Seleccione una opción</option>
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-error text-sm mt-1 italic">{error.message}</p>
            )}
        </div>
    );
}
