import { useEffect, useRef, useState, type JSX } from "react";
import { useController, type Control } from "react-hook-form";

/**
 * Propiedades del componente ImageUpload.
 * - `name`: Nombre del campo en el formulario.
 * - `register`: Control de react-hook-form para manejar el estado del formulario.
 * - `label`: Etiqueta opcional para el campo de carga de imagen.
 * - `className`: Clases CSS opcionales para personalizar el estilo del componente.
 */
interface ImageUploadProps {
    name: string;
    control: Control<any>;
    label?: string;
    className?: string;
}

/**
 * Componente ImageUpload.
 * Este componente permite a los usuarios cargar una imagen y muestra una vista previa de la misma.
 * @param {ImageUploadProps} props - Propiedades del componente.    
 * @returns {JSX.Element} Componente de carga de imagen con vista previa.
 */
export default function ImageUpload(
    {
        name,
        control,
        label,
        className = ""
    }: ImageUploadProps
): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        field: { onChange, value },
    } = useController({ name, control });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
    };

    return (
        <div className={`flex flex-col items-start gap-2 ${className}`}>
            {label && <label className="text-sm font-medium">{label}</label>}

            <div
                className="w-40 h-40 border-2 border-dashed border-neutral-gray030 rounded-lg flex items-center justify-center cursor-pointer bg-neutral-gray010 hover:border-primary"
                onClick={() => inputRef.current?.click()}
            >
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                ) : (
                    <span className="text-neutral-gray090 text-sm text-center px-2">Haz clic o arrastra una imagen</span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
}
