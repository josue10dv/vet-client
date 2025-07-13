import type { JSX } from "react";
import type { UserProps } from "../../common/interfaces/user";
import Button from "../../common/elements/button";
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
        <div className="flex-1 bg-neutral-light text-primary-dark p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lista de Usuarios</h2>
                <Button
                    text="Nuevo"
                    variant="success"
                    fullWidth={false}
                    type="button"
                />
            </div>

            {/* Listado de usuarios */}
            {
                list.map((user: UserProps) => (
                    <UserCard
                        key={user.id}
                        variant={user.isActive ? 'success' : 'error'}
                        {...user}
                    />
                ))
            }
        </div>
    );
}