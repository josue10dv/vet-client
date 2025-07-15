/**
 * Propiedades de la sesión del usuario.
 * Incluye el nombre de usuario y la clínica asociada.
 * - `username`: Nombre de usuario.
 * - `clinic`: Nombre o ID de la clínica asociada al usuario.
 */
export interface SessionData {
    username: string;
    clinic: string; // o `clinicId`, `clinicName`, etc.
}
