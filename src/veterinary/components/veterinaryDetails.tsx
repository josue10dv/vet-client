import type { JSX } from "react";
import type { VeterinaryProps } from "../../common/interfaces/veterinaries";
import { BagdeStatus } from "../../common/elements/bagde";

/**
 * Propiedades del componente VeterinaryDetails.
 * @property {VeterinaryProps} veterinary - Datos de la veterinaria a mostrar.
 */
interface VeterinaryDetailsProps {
    veterinary: VeterinaryProps;
}

/**
 * Componente que muestra los detalles de una veterinaria.
 * @param {VeterinaryDetailsProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de detalles de veterinaria.
 */
export default function VeterinaryDetails({ veterinary }: VeterinaryDetailsProps): JSX.Element {
    return (
        <div className="space-y-6">
            {/* Logo y Nombre Principal */}
            <div className="flex flex-col items-center text-center space-y-4">
                {veterinary.logoImg ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img
                            src={veterinary.logoImg}
                            alt={`Logo de ${veterinary.name}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="hidden w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                        </svg>
                    </div>
                )}

                <div>
                    <h3 className="text-2xl font-bold text-gray-900">{veterinary.name}</h3>
                    <div className="flex items-center justify-center mt-2">
                        <BagdeStatus
                            variant={veterinary.isActive ? 'success' : 'error'}
                            text={veterinary.isActive ? 'Activa' : 'Inactiva'}
                        />
                    </div>
                </div>
            </div>

            {/* Información de Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Información de Contacto
                    </h4>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Correo Electrónico</p>
                                <p className="text-sm text-gray-600">{veterinary.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Teléfono</p>
                                <p className="text-sm text-gray-600">{veterinary.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Ubicación</p>
                                <p className="text-sm text-gray-600">{veterinary.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Información Legal
                    </h4>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Número de Identificación</p>
                                <p className="text-sm text-gray-600">{veterinary.numIdentification}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">ID del Sistema</p>
                                <p className="text-sm text-gray-600 font-mono">{veterinary.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información Adicional */}
            {/* <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Información Adicional</h4>
                <p className="text-sm text-gray-600">
                    Esta veterinaria {veterinary.isActive ? 'está actualmente activa' : 'se encuentra inactiva'} en el sistema.
                    {veterinary.isActive && ' Puede acceder a todas las funcionalidades de la plataforma.'}
                </p>
            </div> */}
        </div>
    );
}
