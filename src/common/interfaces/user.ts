/**
 * Interface que define las propiedades de un usuario.
 * @property {string} id - Identificador único del usuario.
 * @property {string} username - Nombre de usuario.
 * @property {string} name - Nombre completo del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} [profileImg] - URL de la imagen de perfil del usuario (opcional).
 * @property {boolean} isActive - Indica si el usuario está activo.
 * @property {string} createdAt - Fecha de creación del usuario en formato ISO.
 * @property {string} type - Tipo de usuario, puede ser "admin" o "user".
 */
export interface UserProps {
    id: string;
    username: string;
    name: string;
    email: string;
    profileImg?: string;
    isActive: boolean;
    createdAt: string;
    type: "admin" | "user";
}