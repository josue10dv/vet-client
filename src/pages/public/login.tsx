import { useState, type JSX } from "react";
import Logo from "../../components/elements/logo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/elements/input";
import Button from "../../components/elements/button";

/**
 * Esquema de validación para el formulario de inicio de sesión.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `email` es obligatorio y debe tener un formato de correo electrónico válido.
 * - El campo `password` es obligatorio y debe tener al menos 6 caracteres.
 */
const loginSchema = yup.object({
    email: yup
        .string()
        .required("El correo es obligatorio")
        .email("Formato de correo inválido"),
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
export function Login(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login exitoso:", data);
        // Aquí podrías hacer un fetch hacia tu backend para autenticar
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
                        {/* Campo email */}
                        <Input
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            placeholder="Ingrese su correo electrónico"
                            register={register}
                            error={errors.email}
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
