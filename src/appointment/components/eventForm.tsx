import { useForm } from "react-hook-form";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";
import { useEffect, type JSX } from "react";

/**
 * Esquema de validación para el formulario de citas.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `date` es obligatorio.
 * - El campo `petId` es obligatorio.
 * - El campo `reason` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `time` es obligatorio.
 */
const eventSchema = yup.object({
    date: yup
        .string()
        .required("La fecha de la cita es obligatoria"),
    petId: yup
        .string()
        .required("La mascota es obligatoria"),
    reason: yup
        .string()
        .min(2, "El motivo debe tener al menos 2 caracteres")
        .required("El motivo de la cita es obligatorio"),
    time: yup
        .string()
        .required("La hora es obligatoria"),
}).required();

/**
 * Tipo inferido de los valores del formulario de mascota.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type AppointmentFormValues = yup.InferType<typeof eventSchema>;

/**
 * Propiedades del componente PetForm.
 * - `submited`: Función que se llama al enviar el formulario.
 * - `initialValues`: Valores iniciales para el formulario, puede ser nulo.
 * - `editingId`: ID de la mascota en modo edición, puede ser nulo.
 * - `clearEditing`: Función para limpiar el estado de edición.
 * - `closeModal`: Función para cerrar el modal.
 */
interface AppointmentFormProps {
    submited?: () => void;
    initialValues?: Partial<AppointmentFormValues> | null;
    editingId?: string | null;
    clearEditing: () => void;
    closeModal: () => void;
}

export default function NewEventForm({
    submited,
    initialValues = null,
    editingId = null,
    clearEditing,
    closeModal
}: AppointmentFormProps): JSX.Element {
    /*************************
    ******** HOOKS **********
    *************************/
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AppointmentFormValues>({
        resolver: yupResolver(eventSchema),
    });
    // Efecto para inicializar el formulario con valores predefinidos si existen.
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (eventData: AppointmentFormValues) => {
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
                response = await axiosInstance.patch(`/appointment/update/${editingId}`, eventData, config);
            } else {
                // Modo creación: usar endpoint POST
                response = await axiosInstance.post("/appointment/create", eventData, config);
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full px-2 sm:px-0"
        >
            <div className="mb-2">
                <h3 className="text-2xl font-bold text-primary-dark mb-1">
                    Registrar Nueva Cita
                </h3>
                <p className="text-sm text-primary">
                    Completa los campos para agendar una nueva cita en el calendario.
                </p>
            </div>

            {/* Título */}
            <Input
                id="reason"
                label="Motivo de la Cita"
                placeholder="Ej: Vacunación, Consulta"
                {...register("reason")}
                error={errors.reason}
            />

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    id="date"
                    label="Fecha"
                    type="date"
                    {...register("date")}
                    error={errors.date}
                />
                <Input
                    id="time"
                    label="Hora"
                    type="time"
                    {...register("time")}
                    error={errors.time}
                />
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-6">
                <Button
                    text="Cancelar"
                    type="button"
                    variant="error"
                    className="min-w-[120px]"
                    onClick={() => {
                        if (editingId) clearEditing();
                        closeModal();
                    }}
                />
                <Button
                    text="Guardar"
                    type="submit"
                    variant="success"
                    className="min-w-[120px]"
                />
            </div>
        </form>
    );
}
