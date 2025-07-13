import { useState, type JSX } from "react";
import Logo from "../../common/elements/logo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import { axiosInstance } from "../../common/services/requestHandler";

/**
 * Esquema de validación para el formulario de inicio de sesión.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `username` es obligatorio y debe tener la menos 3 caracteres.
 * - El campo `password` es obligatorio y debe tener al menos 6 caracteres.
 */
const loginSchema = yup.object({
    username: yup
        .string()
        .required("El nombre de usuario es obligatorio")
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
}).required();
/**
 * Tipo inferido de los valores del formulario de inicio de sesión.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type LoginFormValues = yup.InferType<typeof loginSchema>;

/**
 * Componente de inicio de sesión.
 * Este componente renderiza un formulario de inicio de sesión con campos para el correo electrónico y la contraseña.
 * Incluye validación de campos utilizando Yup.
 * @returns {JSX.Element} Componente de inicio de sesión.
 */
export default function LoginPage(): JSX.Element {
    // Estado para manejar el estado de carga del formulario.
    const [isLoading, setIsLoading] = useState(false);
    // Hook de react-hook-form para manejar el formulario.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    /**
     * Función que maneja el envío del formulario de inicio de sesión.
     * Realiza una petición POST al endpoint de inicio de sesión con los datos del formulario.
     * @param data Datos del formulario de inicio de sesión.
     */
    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/login", data);
            const { redirectUrl } = response.data.payload;
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                console.error("No se recibió redirección después del inicio de sesión.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <section className="bg-primary w-full min-h-screen flex items-center justify-center px-4">
            <div className="bg-white text-secondary-dark rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-secondary flex flex-col items-center px-6 py-5">
                    <Logo fill="icon-secondary-light" size="w-16 h-16" />
                    <h2 className="text-2xl font-bold mt-2">Iniciar Sesión</h2>
                </div>

                {/* Formulario */}
                <div className="px-6 py-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        {/* Campo username */}
                        <Input
                            label="Nombre de usuario"
                            name="username"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            register={register}
                            error={errors.username}
                            inputClassName="input input-secondary"

                        />

                        {/* Campo contraseña */}
                        <Input
                            label="Contraseña"
                            name="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            register={register}
                            error={errors.password}
                            inputClassName="input input-secondary"
                        />

                        {/* Botón de inicio de sesión */}
                        <Button
                            text="Iniciar Sesión"
                            variant="secondary"
                            isLoading={isLoading}
                            type="submit"
                        />

                        {/* Enlace de recuperación */}
                        <div className="mt-4 text-right">
                            <a
                                href="/forgot-password"
                                className="text-sm text-secondary-dark hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
