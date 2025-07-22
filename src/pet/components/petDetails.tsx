import type { JSX } from "react";
import type { Pet } from "../../common/interfaces/pets";
import { Badge } from "../../common/elements/badge";
import PetIcon from "../../assets/icons/pet.svg?react";
import { EnvHandler } from "../../common/services/envHandler";

/**
 * Propiedades del componente PetDetails.
 * - `pet`: Objeto con la información de la mascota.
 */
interface PetDetailsProps {
    pet: Pet;
}

/**
 * Componente que muestra los detalles completos de una mascota.
 * @returns {JSX.Element} Componente de detalles de mascota.
 */
export default function PetDetails({ pet }: PetDetailsProps): JSX.Element {
    const env = EnvHandler.getInstance();
    const avatar: JSX.Element = pet.image ? (
            <img
                src={`${env.getBackendUrl() || 'http://localhost:3001'}/${pet.image}`}
                alt={pet.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[var(--neutral-gray010)]"
                onError={(e) => {
                    // Fallback si la imagen no se puede cargar
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                }}
            />
        ) : (
            <div className="w-20 h-20 rounded-full bg-[var(--neutral-gray010)] flex items-center justify-center">
                <PetIcon className="w-7 h-7 icon-primary-dark" />
            </div>
        );

    const getSpeciesDisplayName = (species: string): string => {
        const speciesMap: { [key: string]: string } = {
            dog: "Perro",
            cat: "Gato",
            bird: "Ave",
            rabbit: "Conejo",
            fish: "Pez",
            hamster: "Hámster",
            other: "Otro"
        };
        return speciesMap[species] || species;
    };

    const getSexDisplayName = (sex: string): string => {
        return sex === 'male' ? 'Macho' : 'Hembra';
    };

    function getPetAge(birthMonthYear: string): number {
        const [monthStr, yearStr] = birthMonthYear.split('/');
        const birthMonth = parseInt(monthStr) - 1; // JS usa 0 = enero
        const birthYear = parseInt(yearStr);

        const fechaNacimiento = new Date(birthYear, birthMonth);
        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        // Si aún no ha llegado el mes de cumpleaños este año, restamos 1
        if (
            hoy.getMonth() < fechaNacimiento.getMonth() ||
            (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < 1)
        ) {
            edad--;
        }

        return edad;
    }

    return (
        <div className="space-y-6">
            {/* Header con avatar y nombre */}
            <div className="flex items-center space-x-4">
                {avatar}
                <div>
                    <h3 className="text-2xl font-bold text-primary-dark">{pet.name}</h3>
                    <p className="text-lg text-neutral-dark">{getSpeciesDisplayName(pet.type)}</p>
                </div>
            </div>

            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID de la mascota
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-900 font-mono">{pet.id}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-900">{pet.name}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Especie
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-900">{pet.type}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Raza
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-900">{pet.breed}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Edad
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <Badge
                                variant="tertiary"
                                text={`${getPetAge(pet.birthMonthYear)} años`}
                                position=""
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sexo
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <Badge
                                variant={pet.sex === 'male' ? 'primary' : 'secondary'}
                                text={getSexDisplayName(pet.sex)}
                                position=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="border-t pt-4">
                <h4 className="text-lg font-semibold text-primary-dark mb-3">
                    Descripción
                </h4>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p>
                        {pet.description || "No hay descripción disponible."}
                    </p>
                </div>
            </div>
        </div>
    );
}
