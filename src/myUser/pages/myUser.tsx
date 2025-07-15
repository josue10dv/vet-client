import { useState, useEffect, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import Button from "../../common/elements/button";
import Input from "../../common/elements/input";
import ImageUpload from "../../common/elements/imageUpload";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UserProps } from "../../common/interfaces/user";


/**
 * Esquema de validación para el formulario de perfil de usuario.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `name` es obligatorio y debe tener al menos 2 caracteres.
 * - El campo `username` es obligatorio y debe tener al menos 3 caracteres.
 * - El campo `email` es obligatorio y debe ser un correo electrónico válido.
 * - El campo `profileImg` es opcional y puede ser un archivo.
 */
const profileSchema = yup.object({
    name: yup
        .string()
        .required("El nombre es obligatorio")
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    username: yup
        .string()
        .required("El nombre de usuario es obligatorio")
        .min(3, "Debe tener al menos 3 caracteres"),
    email: yup
        .string()
        .required("El email es obligatorio")
        .email("Formato de email inválido"),
    profileImg: yup
        .mixed()
        .test("fileSize", "El archivo es demasiado grande", (value) => {
            if (value && value instanceof File) {
                return value.size <= 2 * 1024 * 1024; // 2 MB
            }
            return true;
        })
        .default(null)
        .nullable()
});

/**
 * Esquema de validación para el formulario de cambio de contraseña.
 * Utiliza Yup para definir las reglas de validación.
 * - El campo `currentPassword` es obligatorio.
 * - El campo `newPassword` es obligatorio y debe tener al menos 6 caracteres.
 */
const passwordSchema = yup.object({
    currentPassword: yup
        .string()
        .required("La contraseña actual es obligatoria"),
    newPassword: yup
        .string()
        .required("La nueva contraseña es obligatoria")
        .min(6, "Debe tener al menos 6 caracteres"),
    confirmPassword: yup
        .string()
        .required("Confirma la nueva contraseña")
        .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
});

/**
 * Tipo inferido de los valores del formulario de perfil.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type ProfileFormValues = yup.InferType<typeof profileSchema>;

/**
 * Tipo inferido de los valores del formulario de cambio de contraseña.
 * Utiliza `yup.InferType` para obtener el tipo basado en el esquema de validación.
 */
type PasswordFormValues = yup.InferType<typeof passwordSchema>;

/**
 * Componente que renderiza la página de perfil del usuario.
 * Permite al usuario ver y editar su información personal y cambiar su contraseña.
 * @returns {JSX.Element} Componente de perfil del usuario.
 */
export default function MyUser(): JSX.Element {
    const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);

    // Formulario de perfil
    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        control: controlProfile,
        formState: { errors: errorsProfile },
        setValue: setValueProfile,
        reset: resetProfile
    } = useForm<ProfileFormValues>({
        resolver: yupResolver(profileSchema)
    });

    // Formulario de contraseña
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        reset: resetPassword
    } = useForm<PasswordFormValues>({
        resolver: yupResolver(passwordSchema)
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const response = await axiosInstance.get("/users/profile");
            const userData = response.data;
            setUser(userData);

            // Llenar el formulario con los datos existentes
            setValueProfile("name", userData.name);
            setValueProfile("username", userData.username);
            setValueProfile("email", userData.email);
        } catch (error) {
            triggerToast("Error al cargar los datos del usuario", "error");
        }
    };

    const onSubmitProfile = async (data: ProfileFormValues) => {
        setIsLoadingProfile(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("username", data.username);
            formData.append("email", data.email);

            if (data.profileImg) {
                formData.append("profileImg", data.profileImg as Blob);
            }

            await axiosInstance.put("/users/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            triggerToast("Perfil actualizado correctamente", "success");
            loadUserData(); // Recargar datos
        } catch (error) {
            triggerToast("Error al actualizar el perfil", "error");
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const onSubmitPassword = async (data: PasswordFormValues) => {
        setIsLoadingPassword(true);
        try {
            await axiosInstance.put("/users/change-password", data);

            triggerToast("Contraseña actualizada correctamente", "success");
            resetPassword(); // Limpiar formulario
        } catch (error) {
            triggerToast("Error al cambiar la contraseña", "error");
        } finally {
            setIsLoadingPassword(false);
        }
    };

    return (
        <section className="flex-1 bg-white text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-primary-dark mb-2">Mi Perfil</h2>
                <p className="text-gray-600">Gestiona tu información personal y configuración de seguridad</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-6 py-3 font-medium transition-colors ${activeTab === "profile"
                        ? "text-primary-dark border-b-2 border-primary-dark"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Información Personal
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`px-6 py-3 font-medium transition-colors ${activeTab === "security"
                        ? "text-primary-dark border-b-2 border-primary-dark"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Seguridad
                </button>
            </div>

            {/* Contenido de las tabs */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === "profile" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {user?.profileImg ? (
                                    <img
                                        src={user.profileImg}
                                        alt="Foto de perfil"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                                <p className="text-gray-500">@{user?.username}</p>
                                <p className="text-sm text-gray-400 capitalize">{user?.type}</p>
                            </div>
                        </div>

                        <form onSubmit={
                            handleSubmitProfile(onSubmitProfile)
                        } className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Nombre completo"
                                    name="name"
                                    type="text"
                                    register={registerProfile}
                                    error={errorsProfile.name}
                                    placeholder="Ingresa tu nombre completo"
                                    inputClassName="input input-primary"
                                />

                                <Input
                                    label="Nombre de usuario"
                                    name="username"
                                    type="text"
                                    register={registerProfile}
                                    error={errorsProfile.username}
                                    placeholder="Ingresa tu nombre de usuario"
                                    inputClassName="input input-primary"
                                />
                            </div>

                            <Input
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                register={registerProfile}
                                error={errorsProfile.email}
                                placeholder="Ingresa tu correo electrónico"
                                inputClassName="input input-primary"
                            />

                            <ImageUpload
                                name="profileImg"
                                control={controlProfile}
                                label="Foto de perfil"
                                className="mb-4"
                            />

                            <div className="flex justify-end">
                                <Button
                                    text="Guardar Cambios"
                                    type="submit"
                                    variant="primary"
                                    fullWidth={false}
                                    isLoading={isLoadingProfile}
                                    className="px-8"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Cambiar Contraseña</h3>

                        <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6 max-w-md">
                            <Input
                                label="Contraseña actual"
                                name="currentPassword"
                                type="password"
                                register={registerPassword}
                                error={errorsPassword.currentPassword}
                                placeholder="Ingresa tu contraseña actual"
                                inputClassName="input input-primary"
                            />

                            <Input
                                label="Nueva contraseña"
                                name="newPassword"
                                type="password"
                                register={registerPassword}
                                error={errorsPassword.newPassword}
                                placeholder="Ingresa una nueva contraseña"
                                inputClassName="input input-primary"
                            />

                            <Input
                                label="Confirmar nueva contraseña"
                                name="confirmPassword"
                                type="password"
                                register={registerPassword}
                                error={errorsPassword.confirmPassword}
                                placeholder="Confirma tu nueva contraseña"
                                inputClassName="input input-primary"
                            />

                            <div className="flex gap-4">
                                <Button
                                    text="Cambiar Contraseña"
                                    type="submit"
                                    variant="primary"
                                    fullWidth={false}
                                    isLoading={isLoadingPassword}
                                    className="px-8"
                                />
                                <Button
                                    text="Cancelar"
                                    type="button"
                                    variant="secondary"
                                    fullWidth={false}
                                    onClick={() => resetPassword()}
                                    className="px-8"
                                />
                            </div>
                        </form>

                        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 className="font-medium text-yellow-800 mb-2">Consejos de seguridad:</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Usa al menos 8 caracteres</li>
                                <li>• Incluye mayúsculas, minúsculas y números</li>
                                <li>• Evita información personal fácil de adivinar</li>
                                <li>• No reutilices contraseñas de otras cuentas</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}