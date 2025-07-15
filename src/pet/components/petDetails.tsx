import type { JSX } from "react";
import type { Pet } from "../../common/interfaces/pets";
import { Badge } from "../../common/elements/badge";
import PetIcon from "../../assets/icons/pet.svg?react";

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

    const avatar: JSX.Element = (
        <div className="w-24 h-24 rounded-full bg-[var(--neutral-gray010)] flex items-center justify-center">
            <PetIcon className="w-12 h-12 icon-primary-dark" />
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header con avatar y nombre */}
            <div className="flex items-center space-x-4">
                {avatar}
                <div>
                    <h3 className="text-2xl font-bold text-primary-dark">{pet.name}</h3>
                    <p className="text-lg text-neutral-dark">{getSpeciesDisplayName(pet.species)}</p>
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
                            <Badge
                                variant="tertiary"
                                text={getSpeciesDisplayName(pet.species)}
                                position=""
                            />
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
                                variant="primary"
                                text={`${pet.age} años`}
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
                    Información Adicional
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{pet.age}</div>
                        <div className="text-sm text-blue-700">Años de edad</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{getSpeciesDisplayName(pet.species)}</div>
                        <div className="text-sm text-green-700">Especie</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{getSexDisplayName(pet.sex)}</div>
                        <div className="text-sm text-purple-700">Sexo</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
