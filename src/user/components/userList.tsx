import type { JSX } from "react";
import type { UserProps } from "../../common/interfaces/user";
import UserCard from "./userCard";

/**
 * Propiedades del componente UserList.
 * - `list`: Lista de usuarios con tipo UserProps[].
 */
interface UserListProps {
    list: UserProps[]
}

/**
 * Componente UserList que muestra una lista de usuarios.
 * Incluye un botón para agregar nuevos usuarios y renderiza cada usuario con UserCard.
 * @param {UserListProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente UserList.
 */
export default function UserList({
    list
}: UserListProps): JSX.Element {
    return (
        <div className="flex-1 bg-neutral-light text-primary-dark rounded-xl shadow-md p-6 max-h-[570px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lista de Usuarios</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {list.map((user: UserProps) => (
                    <div key={user.id}>
                        <UserCard
                            variant={user.isActive ? "success" : "error"}
                            {...user}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}