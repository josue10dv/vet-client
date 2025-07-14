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
 * Esquema de validación para el formulario de usuarios.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `username` es obligatorio y debe tener al menos 6 caracteres.
 * - El campo `email` es obligatorio y debe ser un correo electrónico válido.
 * - El campo `type` es obligatorio y debe ser uno de los valores permitidos ("user", "admin").
 * - El campo `name` es obligatorio y debe tener al menos 6 caracteres.
 */
const userSchema = yup.object({
    username: yup
        .string()
        .required("El nombre del usuario es obligatorio")
        .min(6, "El nombre del usuario debe tener al menos 6 caracteres"),
    email: yup
        .string()
        .required("El correo electrónico es obligatorio")
        .email("Debe ser un correo electrónico válido"),
    type: yup
        .string()
        .required("El tipo de usuario es obligatorio")
        .oneOf(["user", "admin"], "Tipo de usuario inválido"),
    name: yup
        .string()
        .required("El nombre completo es obligatorio")
        .min(6, "El nombre completo debe tener al menos 6 caracteres"),
}).required();
/**
 * Tipo inferido de los valores del formulario de veterinaria.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type UserFormValues = yup.InferType<typeof userSchema>;

// Propiedades del componente UserFormProps.
interface UserFormProps {
    submited?: () => void;
    initialValues?: Partial<UserFormValues> | null;
    editingId?: string | null; // ID de la veterinaria que se está editando
    clearEditing: () => void;
}

export default function UserForm({
    submited,
    initialValues = null,
    editingId = null,
    clearEditing
}: UserFormProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: yupResolver(userSchema),
    });
    // Efecto para inicializar el formulario con valores predefinidos si existen.
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (userData: UserFormValues) => {
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
                response = await axiosInstance.patch(`/user/update/${editingId}`, userData, config);
            } else {
                // Modo creación: usar endpoint POST
                response = await axiosInstance.post("/user/create", userData, config);
            }

            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');

            if (success) {
                if (submited) submited();
                reset();
            }
        } catch (error) {
            console.error(`Error al ${editingId ? 'actualizar' : 'crear'} usuario:`, error);
        }
    };

    return (
        <div className="flex-1 bg-white text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary-dark">
                    {editingId ? "Editar Usuario" : "Crear Nuevo Usuario"}
                </h2>
                <p className="text-sm text-primary mt-1">
                    {editingId ? "Modifica los datos del usuario" : "Completa la información para crear un nuevo usuario"}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <Input
                    label="Nombre Completo"
                    name="name"
                    type="text"
                    placeholder="Ingrese el nombre completo"
                    register={register}
                    error={errors.name}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Nombre de Usuario"
                    name="username"
                    type="text"
                    placeholder="Ingrese el nombre de usuario"
                    register={register}
                    error={errors.username}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    placeholder="Ingrese el correo electrónico"
                    register={register}
                    error={errors.email}
                    inputClassName="input input-primary"
                />

                <Select
                    label="Tipo de Usuario"
                    name="type"
                    options={[
                        { value: "user", label: "Usuario Regular" },
                        { value: "admin", label: "Administrador" },
                    ]}
                    register={register}
                    error={errors.type}
                    selectClassName="input input-primary"
                />

                <div className="flex gap-4 pt-4">
                    <Button
                        text={editingId ? "Actualizar Usuario" : "Crear Usuario"}
                        type="submit"
                        variant="primary"
                        className="flex-1"
                    />

                    {editingId && (
                        <Button
                            text="Cancelar"
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                clearEditing();
                                reset();
                            }}
                            className="flex-1"
                        />
                    )}
                </div>
            </form>
        </div>
    );
}