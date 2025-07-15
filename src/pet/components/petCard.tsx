import type { JSX } from "react";
import { Badge } from "../../common/elements/badge";
import type { ColorVariant } from "../../common/types/variants";
import type { Pet } from "../../common/interfaces/pets";
import DropdownButton from "../../common/elements/dropdown";
import PetIcon from "../../assets/icons/pet.svg?react";

/**
 * Propiedades del componente PetCard.
 * - `variant`: Estilo semántico del estado de la mascota con tipo ColorVariant.
 */
interface PetCardProps extends Pet {
    variant?: ColorVariant;
    actions: {
        view?: () => Promise<void>;
        edit?: () => Promise<void>;
        delete?: () => Promise<void>;
        custom?: Array<{
            label: string;
            onClick: () => Promise<void>;
        }>;
    }
}

/**
 * Componente PetCard que muestra la información de una mascota.
 */
export default function PetCard({
    variant = "primary",
    actions,
    ...pet
}: PetCardProps): JSX.Element {
    const avatar: JSX.Element = (
        <div className="w-20 h-20 rounded-full bg-[var(--neutral-gray010)] flex items-center justify-center">
            <PetIcon className="w-10 h-10 icon-primary-dark" />
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

    return (
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs text-center border border-[var(--neutral-gray030)] transition hover:shadow-xl">
            {/* Dropdown en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
                <DropdownButton
                    text=""
                    variant="primary-light"
                    options={[
                        ...(actions?.view
                            ? [{ label: "Ver", onClick: actions.view }]
                            : []),
                        ...(actions?.edit
                            ? [{ label: "Editar", onClick: actions.edit }]
                            : []),
                        ...(actions?.delete
                            ? [{ label: "Eliminar", onClick: actions.delete }]
                            : []),
                        ...(actions?.custom || []),
                    ]}
                />
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-3">{avatar}</div>

            {/* Nombre y descripción */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary-dark">{pet.name}</h3>
                <p className="text-sm text-neutral-dark leading-tight mt-1">
                    {getSpeciesDisplayName(pet.species)}
                    <br />
                    {pet.breed}
                </p>
                <div className="mt-2 space-y-1">
                    <p className="text-xs text-neutral-dark">
                        <Badge
                            variant="tertiary"
                            text={`${pet.age} años`}
                            position=""
                        />
                    </p>
                    <p className="text-xs text-neutral-dark">
                        <Badge
                            variant={pet.sex === 'male' ? 'primary' : 'secondary'}
                            text={getSexDisplayName(pet.sex)}
                            position=""
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}
