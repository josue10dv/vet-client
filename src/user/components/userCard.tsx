import type { JSX } from "react";
import { BagdeStatus } from "../../common/elements/bagde";
import type { ColorVariant } from "../../common/types/variants";
import type { UserProps } from "../../common/interfaces/user";
import DropdownButton from "../../common/elements/dropdown";
import UserIcon from "../../assets/icons/user.svg?react";

/**
 * Propiedades del componente UserCard.
 * - `variant`: Estilo semántico del estado del usuario con tipo ColorVariant.
 */
interface UserCardProps extends UserProps {
    variant?: ColorVariant;
}

/**
 * Componente UserCard que muestra la información de un usuario.
 * Incluye un estado visual, avatar, nombre y descripción.
 * @param {UserCardProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente UserCard.
 */
export default function UserCard({ variant = "primary", ...user }: UserCardProps): JSX.Element {
    // Obtiene la referencia a la imagen del avatar
    const avatar: JSX.Element = user.profileImg
        ? (
            <div
                className="w-24 h-24 bg-gray-300 rounded-full"
                style={{
                    backgroundImage: `url(${new URL("../../assets/images/default-avatar.png", import.meta.url).href})`, backgroundSize: 'cover'
                }}
            />
        )
        : (
            <div className="rounded-full bg-neutral-light w-24 h-24 flex items-center justify-center icon-neutral-medium">
                <UserIcon className="w-18 h-18" />
            </div>
        );
    return (
        <div
            className="bg-neutral-dark rounded-xl p-6 
                shadow-md w-65 max-w-sm mx-auto 
                relative text-primary-light"
        >
            {/* Estado */}
            <div className="top-7 right-5 absolute">
                <BagdeStatus
                    variant={variant}
                    text={user.isActive ? "Activo" : "Inactivo"}
                />
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
                {avatar}
            </div>

            {/* Nombre y descripción */}
            <div className="text-center text-current mb-4">
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-sm mt-2">
                    {user.name}<br />
                    {user.email}<br />
                </p>
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-4 mt-6">
                <DropdownButton
                    text=""
                    variant="primary-light"
                    options={[
                        { label: "Editar", onClick: () => console.log("Editar usuario") },
                        { label: "Eliminar", onClick: () => console.log("Eliminar usuario") },
                        { label: "Ver Detalles", onClick: () => console.log("Ver detalles del usuario") },
                    ]}
                />
            </div>
        </div>
    );
}