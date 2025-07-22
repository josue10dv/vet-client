import { useEffect, type JSX } from "react";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import Select from "../../common/elements/selector";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";
import ImageUpload from "../../common/elements/imageUpload";
import TextArea from "../../common/elements/textArea";

/**
 * Esquema de validación para el formulario de mascotas.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `name` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `type` es obligatorio.
 * - El campo `type` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `birthMonthYear` es obligatorio y debe ser un número mayor a 0.
 * - El campo `sex` es obligatorio y debe ser uno de los valores permitidos ("male", "female").
 */
const petSchema = yup.object({
    name: yup
        .string()
        .required("El nombre de la mascota es obligatorio")
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    type: yup
        .string()
        .required("La especie es obligatoria"),
    breed: yup
        .string()
        .required("La raza es obligatoria")
        .min(2, "La raza debe tener al menos 2 caracteres"),
    birthMonthYear: yup
        .string()
        .required("La fecha de nacimiento es obligatoria"),
    sex: yup
        .string()
        .required("El sexo es obligatorio")
        .oneOf(["male", "female"], "Sexo inválido"),
    image: yup
        .mixed()
        .nullable()
        .test("fileSize", "El archivo es demasiado grande (máximo 2MB)", (value) => {
            if (value && value instanceof File) {
                return value.size <= 2 * 1024 * 1024; // 2 MB
            }
            return true; // Si no hay archivo, es válido
        })
        .test("fileType", "Solo se permiten archivos de imagen (JPG, PNG, GIF)", (value) => {
            if (value && value instanceof File) {
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                return allowedTypes.includes(value.type);
            }
            return true; // Si no hay archivo, es válido
        })
        .default(null),
    ownerName: yup
        .string()
        .required("El nombre del propietario es obligatorio")
        .min(2, "El nombre del propietario debe tener al menos 2 caracteres"),
    ownerEmail: yup
        .string()
        .required("El email del propietario es obligatorio")
        .email("Email inválido"),
    ownerPhone: yup
        .string()
        .required("El teléfono del propietario es obligatorio")
        .min(10, "El teléfono debe tener al menos 10 caracteres"),
    description: yup
        .string()
        .required("La descripción es obligatoria")
        .min(10, "La descripción debe tener al menos 10 caracteres"),
}).required();

/**
 * Tipo inferido de los valores del formulario de mascota.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type PetFormValues = yup.InferType<typeof petSchema>;

/**
 * Propiedades del componente PetForm.
 * - `submited`: Función que se llama al enviar el formulario.
 * - `initialValues`: Valores iniciales para el formulario, puede ser nulo.
 * - `editingId`: ID de la mascota en modo edición, puede ser nulo.
 * - `clearEditing`: Función para limpiar el estado de edición.
 * - `isModalContained`: Indica si el formulario está contenido dentro de un modal.
 */
interface PetFormProps {
    submited?: () => void;
    initialValues?: Partial<PetFormValues> | null;
    editingId?: string | null;
    clearEditing: () => void;
    isModalContained?: boolean;
}

export default function PetForm({
    submited,
    initialValues = null,
    editingId = null,
    clearEditing,
    isModalContained = false
}: PetFormProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<PetFormValues>({
        resolver: yupResolver(petSchema),
    });

    // Efecto para inicializar el formulario con valores predefinidos si existen.
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (petData: PetFormValues) => {
        try {
            const isEditing = Boolean(editingId);
            let response;
            
            // Crear FormData para manejar la imagen y otros datos
            const formData = new FormData();
            
            // Agregar todos los campos del formulario al FormData
            Object.entries(petData).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    // Agregar la imagen como archivo
                    formData.append('image', value);
                } else if (value !== null && value !== undefined) {
                    // Agregar otros campos como texto
                    formData.append(key, String(value));
                }
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };

            if (isEditing) {
                // Modo edición: usar endpoint PUT con ID
                response = await axiosInstance.patch(`/pet/update/${editingId}`, formData, config);
            } else {
                // Modo creación: usar endpoint POST
                response = await axiosInstance.post("/pet/create", formData, config);
            }

            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');

            if (success) {
                if (submited) submited();
                reset();
                clearEditing();
            }
        } catch (error) {
            console.error("Error al procesar la mascota:", error);
            triggerToast("Error al procesar la mascota", 'error');
        }
    };

    const handleCancel = () => {
        reset();
        clearEditing();
    };

    const speciesOptions = [
        { value: "dog", label: "Perro" },
        { value: "cat", label: "Gato" },
        { value: "bird", label: "Ave" },
        { value: "rabbit", label: "Conejo" },
        { value: "fish", label: "Pez" },
        { value: "hamster", label: "Hámster" },
        { value: "other", label: "Otro" }
    ];

    const sexOptions = [
        { value: "male", label: "Macho" },
        { value: "female", label: "Hembra" }
    ];

    /*************************
     ******** UTILS **********
     *************************/
    // Obtiene las clases del contenedor del formlario cuando esta dentro de un modal.
    const baseClases = isModalContained
        ? "flex-1 bg-white text-primary-dark p-2"
        : "flex-1 bg-white text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)]";

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <div className={baseClases}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary-dark">
                    {editingId ? "Editar Mascota" : "Crear Nueva Mascota"}
                </h2>
                <p className="text-sm text-primary mt-1">
                    {editingId ? "Modifica los datos de la mascota" : "Completa la información para crear una nueva mascota"}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Nombre */}
                <Input
                    id="name"
                    label="Nombre de la mascota"
                    placeholder="Ej: Max, Luna, Firulais"
                    type="text"
                    {...register("name")}
                    error={errors.name}
                />

                {/* Especie */}
                <Select
                    id="type"
                    label="Especie"
                    defaultValue=""
                    options={speciesOptions}
                    {...register("type")}
                    error={errors.type}
                />

                {/* Raza */}
                <Input
                    id="breed"
                    label="Raza"
                    placeholder="Ej: Labrador, Persa, Canario"
                    type="text"
                    {...register("breed")}
                    error={errors.breed}
                />

                {/* Fecha de nacimiento */}
                <Input
                    id="birthMonthYear"
                    label="Fecha nacimiento"
                    placeholder="Ej: 01/2020"
                    type="text"
                    {...register("birthMonthYear")}
                    error={errors.birthMonthYear}
                />

                {/* Sexo */}
                <Select
                    id="sex"
                    label="Sexo"
                    options={sexOptions}
                    {...register("sex")}
                    error={errors.sex}
                />

                {/* Imagen de la mascota */}
                <ImageUpload
                    name="image"
                    control={control}
                    label="Foto de la mascota"
                />

                {/* Descripción */}
                <TextArea
                    label="Descripción"
                    {...register("description")}
                    error={errors.description}
                    placeholder="Ingrese una breve descripción de la mascota"
                    value={initialValues?.description || ""}
                />

                {/* Información del propietario */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary-dark">Información del propietario</h3>
                </div>
                <Input
                    id="ownerName"
                    label="Nombre del propietario"
                    placeholder="Ej: Juan Pérez"
                    type="text"
                    {...register("ownerName")}
                    error={errors.ownerName}
                />

                <Input
                    id="ownerEmail"
                    label="Email del propietario"
                    placeholder="Ej: juanperez@example.com"
                    type="email"
                    {...register("ownerEmail")}
                    error={errors.ownerEmail}
                />

                <Input
                    id="ownerPhone"
                    label="Teléfono del propietario"
                    placeholder="Ej: +1234567890"
                    type="tel"
                    {...register("ownerPhone")}
                    error={errors.ownerPhone}
                />

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <Button
                        text={editingId ? "Actualizar Mascota" : "Registrar Mascota"}
                        type="submit"
                        variant="primary"
                        className="flex-1"
                    >
                        {editingId ? "Actualizar Mascota" : "Registrar Mascota"}
                    </Button>

                    {editingId && (
                        <Button
                            text="Limpiar"
                            type="button"
                            variant="primary"
                            onClick={handleCancel}
                            className="flex-1"
                        >
                            Limpiar
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
