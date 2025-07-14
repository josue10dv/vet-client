import type { JSX } from "react";
import type { UserProps } from "../../common/interfaces/user";
import UserCard from "./userCard";

/**
 * Propiedades del componente UserList.
 * - `list`: Lista de usuarios con tipo UserProps[].
 * - `onEdit`: Función para manejar la edición de un usuario.
 * - `onDelete`: Función para manejar la eliminación de un usuario.
 * - `onView`: Función para manejar la visualización de un usuario.
 * - `onToggleStatus`: Función para manejar el cambio de estado de un usuario.
 * - `getActions`: Función que retorna las acciones disponibles para cada usuario (opcional).
 */
interface UserListProps {
    list: UserProps[];
    onEdit: (id: string) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    onView?: (id: string) => void;
    onToggleStatus?: (id: string) => Promise<void>;
    getActions?: (user: UserProps) => {
        onEdit?: (id: string) => Promise<void>;
        onDelete?: (id: string) => Promise<void>;
        onView?: (id: string) => void;
        onToggleStatus?: (id: string) => Promise<void>;
    };
}

/**
 * Extiende las propiedades de UserProps para incluir acciones personalizadas.
 */
interface ListWithActions extends UserProps {
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
 * Componente que renderiza una lista de usuarios.
 * Incluye un botón para agregar un nuevo usuario y una tabla para mostrar los existentes.
 * @returns {JSX.Element} Componente de lista de usuarios.
 */
export default function UserList({
    list,
    onEdit,
    onDelete,
    onView,
    onToggleStatus,
    getActions
}: UserListProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar el estado de carga del formulario.
    // const { showLoading, hideLoading } = useLoading();

    /*************************
     ******** UTILS **********
     *************************/

    // Mapear usuarios a filas de tabla
    const userList: ListWithActions[] = list.map((user: UserProps) => {
        const actions = getActions ? getActions(user) : {
            onEdit,
            onDelete,
            onView,
            onToggleStatus
        };

        const allowedActions: any = {};

        if (actions.onView) {
            allowedActions.view = () => actions.onView!(user.id);
        }

        if (actions.onEdit) {
            allowedActions.edit = () => actions.onEdit!(user.id);
        }

        if (actions.onToggleStatus || actions.onDelete) {
            allowedActions.custom = [];

            if (actions.onToggleStatus) {
                allowedActions.custom.push({
                    label: user.isActive ? "Desactivar" : "Activar",
                    onClick: () => actions.onToggleStatus!(user.id)
                });
            }

            if (actions.onDelete && user.type !== 'admin') {
                allowedActions.custom.push({
                    label: "Eliminar",
                    onClick: () => actions.onDelete!(user.id)
                });
            }
        }

        return {
            ...user,
            actions: allowedActions
        };
    });

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Usuarios</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona los usuarios del sistema ({list.length} usuarios)
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {
                    list.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {userList.map((user: ListWithActions) => (
                                <div key={user.id}>
                                    <UserCard
                                        variant={user.isActive ? "success" : "error"}
                                        {...user}
                                        actions={user.actions}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-primary-dark">
                            No hay usuarios registrados.
                        </div>
                    )
                }
            </div>
        </div>
    );
}