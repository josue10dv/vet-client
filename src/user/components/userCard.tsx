import type { JSX } from "react";
import { BadgeStatus, Badge } from "../../common/elements/badge";
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
 * Componente UserCard que muestra la información de un usuario.
 */
export default function UserCard({
    variant = "primary",
    actions,
    ...user
}: UserCardProps): JSX.Element {
    const avatar: JSX.Element = user.profileImg ? (
        <img
            src={user.profileImg}
            alt={user.username}
            className="w-20 h-20 rounded-full object-cover border-4 border-[var(--neutral-gray010)]"
        />
    ) : (
        <div className="w-20 h-20 rounded-full bg-[var(--neutral-gray010)] flex items-center justify-center">
            <UserIcon className="w-10 h-10 icon-primary-dark" />
        </div>
    );

    return (
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs text-center border border-[var(--neutral-gray030)] transition hover:shadow-xl">
            {/* Dropdown en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
                <DropdownButton
                    text=""
                    variant="primary-light"
                    options={[
                        ...(actions?.edit
                            ? [{ label: "Editar", onClick: actions.edit }]
                            : []),
                        ...(actions?.delete
                            ? [{ label: "Eliminar", onClick: actions.delete }]
                            : []),
                        ...(actions?.view
                            ? [{ label: "Ver", onClick: actions.view }]
                            : []),
                        ...(actions?.custom || []),
                    ]}
                />
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-3">{avatar}</div>

            {/* Nombre y descripción */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary-dark">@{user.username}</h3>
                <p className="text-sm text-neutral-dark leading-tight mt-1">
                    {user.name}
                    <br />
                    {user.email}
                </p>
                <p>
                    <Badge
                        variant={user.type === 'admin' ? 'secondary' : 'tertiary'}
                        text={user.type === 'admin' ? "Administrador" : "Usuario Regular"}
                        position=""
                    />
                </p>
            </div>

            {/* Estado */}
            <div className="flex justify-center">
                <BadgeStatus
                    variant={'success'}
                    text={user.isActive ? "Activo" : "Inactivo"}
                />
            </div>
        </div>
    );
}
