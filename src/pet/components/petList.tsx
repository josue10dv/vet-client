import type { JSX } from "react";
import type { Pet } from "../../common/interfaces/pets";
import PetCard from "./petCard";

/**
 * Propiedades del componente PetList.
 * - `list`: Lista de mascotas con tipo Pet[].
 * - `onEdit`: Función para manejar la edición de una mascota.
 * - `onDelete`: Función para manejar la eliminación de una mascota.
 * - `onView`: Función para manejar la visualización de una mascota.
 * - `getActions`: Función que retorna las acciones disponibles para cada mascota (opcional).
 */
interface PetListProps {
    list: Pet[];
    onEdit: (id: string) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    onView?: (id: string) => void;
    getActions?: (pet: Pet) => {
        onEdit?: (id: string) => Promise<void>;
        onDelete?: (id: string) => Promise<void>;
        onView?: (id: string) => void;
    };
}

/**
 * Extiende las propiedades de Pet para incluir acciones personalizadas.
 */
interface ListWithActions extends Pet {
    actions: {
        view?: () => Promise<void>;
        edit?: () => Promise<void>;
        custom?: Array<{
            label: string;
            onClick: () => Promise<void>;
        }>;
    };
}

/**
 * Componente que renderiza una lista de mascotas.
 * Incluye una grid para mostrar las mascotas existentes.
 * @returns {JSX.Element} Componente de lista de mascotas.
 */
export default function PetList({
    list,
    onEdit,
    onDelete,
    onView,
    getActions
}: PetListProps): JSX.Element {
    /*************************
     ******** UTILS **********
     *************************/

    // Mapear mascotas a cards con acciones
    const petList: ListWithActions[] = list.map((pet: Pet) => {
        const actions = getActions ? getActions(pet) : {
            onEdit,
            onDelete,
            onView
        };

        const allowedActions: any = {};

        if (actions.onView) {
            allowedActions.view = () => actions.onView!(pet.id);
        }

        if (actions.onEdit) {
            allowedActions.edit = () => actions.onEdit!(pet.id);
        }

        if (actions.onDelete) {
            allowedActions.custom = [];
            allowedActions.custom.push({
                label: "Eliminar",
                onClick: () => actions.onDelete!(pet.id)
            });
        }

        return {
            ...pet,
            actions: allowedActions,
            // Calcula la edad
            age: getPetAge(pet.birthMonthYear),
        };
    });

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

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Mascotas</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona las mascotas del sistema ({list.length} mascotas)
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {
                    list.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {petList.map((pet: ListWithActions) => (
                                <div key={pet.id}>
                                    <PetCard
                                        variant="primary"
                                        {...pet}
                                        actions={pet.actions}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-primary-dark">
                            No hay mascotas registradas.
                        </div>
                    )
                }
            </div>
        </div>
    );
}
