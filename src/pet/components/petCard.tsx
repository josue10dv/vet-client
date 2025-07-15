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
    };
}

/**
 * Componente PetCard que muestra la información de una mascota.
 */
export default function PetCard({
    variant = "primary",
    actions,
    ...pet
}: PetCardProps): JSX.Element {
    const avatar: JSX.Element = pet.img ? (
        <img
            src={pet.img}
            alt={pet.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[var(--neutral-gray010)]"
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
        return sex === "male" ? "Macho" : "Hembra";
    };

    return (
        <div className="relative flex flex-col items-center bg-white rounded-xl shadow-sm p-4 w-full text-center border border-[var(--neutral-gray030)] transition hover:shadow-md">
            {/* Dropdown flotante en la esquina superior derecha */}
            <div className="absolute top-3 right-3 z-10">
                <DropdownButton
                    text=""
                    variant="primary-light"
                    options={[
                        ...(actions?.view ? [{ label: "Ver", onClick: actions.view }] : []),
                        ...(actions?.edit ? [{ label: "Editar", onClick: actions.edit }] : []),
                        ...(actions?.delete ? [{ label: "Eliminar", onClick: actions.delete }] : []),
                        ...(actions?.custom || []),
                    ]}
                />
            </div>

            {/* Avatar */}
            <div className="mb-2">
                {avatar}
            </div>

            {/* Nombre */}
            <h3 className="text-base font-semibold text-primary-dark mb-1">{pet.name}</h3>

            {/* Edad y Sexo */}
            <div className="flex flex-row gap-2 justify-center mb-2">
                <Badge
                    variant="tertiary"
                    text={`${pet.age} años`}
                    position=""
                />
                <Badge
                    variant={pet.sex === "male" ? "primary" : "secondary"}
                    text={getSexDisplayName(pet.sex)}
                    position=""
                />
            </div>

            {/* Especie y Raza */}
            <div className="text-sm text-neutral-dark leading-tight">
                {getSpeciesDisplayName(pet.species)}
                <br />
                {pet.breed}
            </div>
        </div>
    );
}
