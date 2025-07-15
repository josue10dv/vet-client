import { useEffect, type JSX } from "react";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import Select from "../../common/elements/selector";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";

/**
 * Esquema de validación para el formulario de mascotas.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `name` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `species` es obligatorio.
 * - El campo `breed` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `age` es obligatorio y debe ser un número mayor a 0.
 * - El campo `sex` es obligatorio y debe ser uno de los valores permitidos ("male", "female").
 */
const petSchema = yup.object({
    name: yup
        .string()
        .required("El nombre de la mascota es obligatorio")
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    species: yup
        .string()
        .required("La especie es obligatoria"),
    breed: yup
        .string()
        .required("La raza es obligatoria")
        .min(2, "La raza debe tener al menos 2 caracteres"),
    age: yup
        .string()
        .required("La edad es obligatoria"),
    sex: yup
        .string()
        .required("El sexo es obligatorio")
        .oneOf(["male", "female"], "Sexo inválido"),
}).required();

/**
 * Tipo inferido de los valores del formulario de mascota.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type PetFormValues = yup.InferType<typeof petSchema>;

// Propiedades del componente PetFormProps.
interface PetFormProps {
    submited?: () => void;
    initialValues?: Partial<PetFormValues> | null;
    editingId?: string | null; // ID de la mascota que se está editando
    clearEditing: () => void;
}

export default function PetForm({
    submited,
    initialValues = null,
    editingId = null,
    clearEditing
}: PetFormProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        handleSubmit,
        reset,
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
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            if (isEditing) {
                // Modo edición: usar endpoint PUT con ID
                response = await axiosInstance.patch(`/pet/update/${editingId}`, petData, config);
            } else {
                // Modo creación: usar endpoint POST
                response = await axiosInstance.post("/pet/create", petData, config);
            }

            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');

            if (success) {
                if (submited) submited();
                reset();
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
     ******** RENDER **********
     *************************/
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)] h-fit">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-primary-dark">
                    {editingId ? "Editar Mascota" : "Registrar Nueva Mascota"}
                </h2>
                <p className="text-sm text-primary mt-1">
                    {editingId ? "Modifica los datos de la mascota" : "Completa los campos para registrar una nueva mascota"}
                </p>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nombre */}
                    <Input
                        id="name"
                        label="Nombre de la mascota"
                        placeholder="Ej: Max, Luna, Firulais"
                        type="text"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    {/* Especie */}
                    <Select
                        id="species"
                        label="Especie"
                        placeholder="Selecciona la especie"
                        options={speciesOptions}
                        {...register("species")}
                        error={errors.species?.message}
                    />

                    {/* Raza */}
                    <Input
                        id="breed"
                        label="Raza"
                        placeholder="Ej: Labrador, Persa, Canario"
                        type="text"
                        {...register("breed")}
                        error={errors.breed?.message}
                    />

                    {/* Edad */}
                    <Input
                        id="age"
                        label="Edad"
                        placeholder="Ej: 3"
                        type="text"
                        {...register("age")}
                        error={errors.age?.message}
                    />

                    {/* Sexo */}
                    <Select
                        id="sex"
                        label="Sexo"
                        placeholder="Selecciona el sexo"
                        options={sexOptions}
                        {...register("sex")}
                        error={errors.sex?.message}
                    />

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                        >
                            {editingId ? "Actualizar Mascota" : "Registrar Mascota"}
                        </Button>
                        
                        {editingId && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
