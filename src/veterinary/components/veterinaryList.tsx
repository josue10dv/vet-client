import type { JSX } from "react";
import Table from "../../common/elements/table";
import type { VeterinaryProps } from "../../common/interfaces/veterinaries";
import { useLoading } from "../../common/providers/loadingContext";

/**
 * Propiedades del componente VeterinaryList.
 * - `list`: Lista de veterinarias con tipo VeterinaryProps[].
 * - `onEdit`: Función para manejar la edición de una veterinaria.
 * - `onDelete`: Función para manejar la eliminación de una veterinaria.
 * - `onView`: Función para manejar la visualización de una veterinaria.
 * - `onAccess`: Función para manejar el acceso a la aplicación de una veterinaria.
 * - `getActions`: Función que retorna las acciones disponibles para cada veterinaria (opcional).
 */
interface VeterinaryListProps {
    list: VeterinaryProps[];
    onEdit: (id: string) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    onView?: (id: string) => void;
    onAccess?: (veterinary: VeterinaryProps) => void;
    getActions?: (veterinary: VeterinaryProps) => {
        onEdit?: (id: string) => Promise<void>;
        onDelete?: (id: string) => Promise<void>;
        onView?: (id: string) => void;
        onAccess?: (veterinary: VeterinaryProps) => void;
    };
}

/**
 * Componente que renderiza una lista de veterinarias.
 * Incluye un botón para agregar una nueva veterinaria y una tabla para mostrar las existentes.
 * @returns {JSX.Element} Componente de lista de veterinarias.
 */
export default function VeterinaryList({
    list,
    onEdit,
    onDelete,
    onView,
    onAccess,
    getActions
}: VeterinaryListProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();

    /*************************
     ******** UTILS **********
     *************************/
    // Transforma el array de objetos veterinarias en un formato adecuado para la tabla.
    const rows = list.map((veterinary) => {
        // Obtiene las acciones disponibles para esta veterinaria específica
        const actions = getActions ? getActions(veterinary) : {
            onEdit,
            onDelete,
            onView,
            onAccess
        };

        return {
            id: veterinary.id,
            cells: [
                veterinary.name,
                veterinary.location,
                veterinary.phoneNumber
            ],
            actions: {
                edit: actions.onEdit ? async () => {
                    showLoading();
                    try {
                        await actions.onEdit!(veterinary.id);
                    } catch (error) {
                        console.error("Error al editar veterinaria:", error);
                    } finally {
                        hideLoading();
                    }
                } : undefined,
                delete: actions.onDelete ? async () => {
                    showLoading();
                    try {
                        await actions.onDelete!(veterinary.id);
                    } catch (error) {
                        console.error("Error al eliminar veterinaria:", error);
                    } finally {
                        hideLoading();
                    }
                } : undefined,
                view: actions.onView ? () => actions.onView!(veterinary.id) : undefined,
                custom: actions.onAccess ? [
                    {
                        label: "Acceder",
                        onClick: () => actions.onAccess!(veterinary)
                    }
                ] : undefined
            }
        };
    });


    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Veterinarias</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona las veterinarias del sistema ({list.length} veterinarias)
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <Table
                    color="bg-primary-dark"
                    headers={["Nombre", "Ubicación", "Teléfono"]}
                    rows={rows}
                    hasActions={true}
                    page={1}
                    pageSize={10}
                    totalItems={2}
                    iconFill="icon-secondary-light"
                />
            </div>
        </div>
    );
}