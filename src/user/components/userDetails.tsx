import type { JSX } from "react";
import type { UserProps } from "../../common/interfaces/user";
import { Badge, BadgeStatus } from "../../common/elements/badge";

/**
 * Propiedades del componente UserDetails.
 * @property {UserProps} user - Datos del usuario a mostrar.
 */
interface UserDetailsProps {
    user: UserProps;
}

/**
 * Componente que muestra los detalles de un usuario.
 * @param {UserDetailsProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de detalles de usuario.
 */
export default function UserDetails({ user }: UserDetailsProps): JSX.Element {
    // Formatear fecha de creación
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            {/* Avatar y Información Principal */}
            <div className="flex flex-col items-center text-center space-y-4">
                {user.profileImg ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img 
                            src={user.profileImg} 
                            alt={`Avatar de ${user.name}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="hidden w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                )}
                
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-lg text-gray-600">@{user.username}</p>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                        <BadgeStatus variant={user.isActive ? 'success' : 'error'} text={user.isActive ? 'Activo' : 'Inactivo'}/>
                        <Badge position="" variant={user.type == 'admin' ? 'primary' : 'secondary'} text={user.type == 'admin' ? 'Administrador' : 'Usuario Regular'} />
                    </div>
                </div>
            </div>

            {/* Información de Contacto y Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Información Personal
                    </h4>
                    
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Nombre Completo</p>
                                <p className="text-sm text-gray-600">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Correo Electrónico</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Nombre de Usuario</p>
                                <p className="text-sm text-gray-600 font-mono">@{user.username}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Información del Sistema
                    </h4>
                    
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Tipo de Usuario</p>
                                <p className="text-sm text-gray-600">
                                    {user.type === 'admin' ? 'Administrador' : 'Usuario Regular'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">ID del Sistema</p>
                                <p className="text-sm text-gray-600 font-mono">{user.id}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Fecha de Creación</p>
                                <p className="text-sm text-gray-600">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información Adicional */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Permisos y Acceso</h4>
                <p className="text-sm text-gray-600">
                    Este usuario {user.isActive ? 'tiene acceso activo' : 'no tiene acceso'} al sistema.
                    {user.type === 'admin' && user.isActive && ' Como administrador, tiene acceso completo a todas las funcionalidades.'}
                    {user.type === 'user' && user.isActive && ' Como usuario regular, tiene acceso limitado según los permisos asignados.'}
                    {!user.isActive && ' El acceso está deshabilitado hasta que se reactive la cuenta.'}
                </p>
            </div>
        </div>
    );
}
