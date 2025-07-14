import { useEffect, type JSX } from "react";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import ImageUpload from "../../common/elements/imageUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";

/**
 * Esquema de validación para el formulario de veterinarias.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `name` es obligatorio y debe tener al menos 6 caracteres.
 * - El campo `location` es obligatorio y debe tener al menos 6 caracteres.
 * - El campo `email` es obligatorio y debe ser un correo electrónico válido.
 * - El campo `phoneNumber` es obligatorio y debe contener solo dígitos.
 * - El campo `image` es opcional y puede ser un archivo.
 */
const veterinarySchema = yup.object({
    name: yup
        .string()
        .required("El nombre de la veterinaria es obligatorio")
        .min(6, "El nombre de la veterinaria debe tener al menos 6 caracteres"),
    numIdentification: yup
        .string()
        .required("El nombre de la veterinaria es obligatorio")
        .min(6, "El nombre de la veterinaria debe tener al menos 6 caracteres"),
    location: yup
        .string()
        .required("La dirección es obligatoria")
        .min(6, "La dirección debe tener al menos 6 caracteres"),
    email: yup
        .string()
        .required("El correo electrónico es obligatorio")
        .email("Debe ser un correo electrónico válido"),
    phoneNumber: yup
        .string()
        .required("El número de teléfono es obligatorio")
        .matches(/^\d+$/, "El número de teléfono debe contener solo dígitos"),
    logoImg: yup
        .mixed()
        .test("fileSize", "El archivo es demasiado grande", (value) => {
            if (value && value instanceof File) {
                return value.size <= 2 * 1024 * 1024; // 2 MB
            }
            return true;
        })
        .default(null)
        .nullable(),
}).required();
/**
 * Tipo inferido de los valores del formulario de veterinaria.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type VeterinaryFormValues = yup.InferType<typeof veterinarySchema>;

// Propiedades del componente VeterinaryForm.
interface VeterinaryFormProps {
    submited?: (data: VeterinaryFormValues) => void;
    initialValues?: Partial<VeterinaryFormValues> | null;
    editingId?: string | null; // ID de la veterinaria que se está editando
}

/**
 * Componente que renderiza un formulario para agregar o editar veterinarias.
 * Incluye campos para el nombre, ubicación y teléfono de la veterinaria.
 * @returns {JSX.Element} Componente de formulario para agregar o editar veterinarias.
 */
export default function VeterinaryForm({
    submited,
    initialValues,
    editingId
}: VeterinaryFormProps): JSX.Element {
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VeterinaryFormValues>({
        resolver: yupResolver(veterinarySchema),
    });
    // Efecto para inicializar el formulario con valores predefinidos si existen.
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    /**
     * Función que maneja el envío del formulario de veterinaria.
     * Realiza una petición POST/PUT según si estamos creando o editando.
     * @param data Datos del formulario de veterinaria.
     */
    const onSubmit = async (data: VeterinaryFormValues) => {
        try {
            const isEditing = Boolean(editingId);

            // Crea el formData para enviar la imagen y los demás datos.
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("location", data.location);
            formData.append("email", data.email);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("numIdentification", data.numIdentification);

            if (data.logoImg) {
                formData.append("logoImg", data.logoImg as Blob);
            }

            let response;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            if (isEditing) {
                // Modo edición: usar endpoint PUT con ID
                formData.append("id", editingId!);
                response = await axiosInstance.patch(`/veterinary/update/${editingId}`, formData, config);
            } else {
                // Modo creación: usar endpoint POST
                response = await axiosInstance.post("/veterinary/create", formData, config);
            }

            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');

            if (success) {
                if (submited) submited(data);
                reset();
            }
        } catch (error) {
            console.error(`Error al ${editingId ? 'actualizar' : 'crear'} veterinaria:`, error);
        }
    };

    return (
        <div className="flex-1 bg-neutral-light text-primary-dark p-6 rounded-xl shadow-md">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">
                    {editingId ? 'Editar' : 'Crear'} Veterinaria
                </h2>
            </div>
            <form id="veterinary-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

                <Input
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Ingrese el nombre de la veterinaria"
                    register={register}
                    error={errors.name}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Identificación"
                    name="numIdentification"
                    type="text"
                    placeholder="Ingrese la número de identificació de la veterinaria"
                    register={register}
                    error={errors.numIdentification}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Ubicación"
                    name="location"
                    type="text"
                    placeholder="Ingrese la dirección de la veterinaria"
                    register={register}
                    error={errors.location}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Correo"
                    name="email"
                    type="email"
                    placeholder="Ingrese el número de teléfono"
                    register={register}
                    error={errors.email}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Número de Celular"
                    name="phoneNumber"
                    type="number"
                    placeholder="Ingrese el número de celular"
                    register={register}
                    error={errors.phoneNumber}
                    inputClassName="input input-primary"
                />

                <ImageUpload
                    name="logoImg"
                    control={control}
                    label="Cargar Imagen"
                    className="w-full"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        text={editingId ? "Actualizar" : "Registrar"}
                        variant="success"
                        fullWidth={false}
                        type="submit"
                    />
                    <Button
                        text="Limpiar"
                        variant="primary"
                        fullWidth={false}
                        type="button"
                        onClick={() => reset()}
                    />
                </div>
            </form>
        </div >);
}