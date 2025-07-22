/**
 * Propiedades de la sesión del usuario.
 * Estas propiedades se utilizan para almacenar información del usuario autenticado,
 * como su nombre de usuario, nombre completo, ID de veterinaria, nombre de veterinaria,
 * correo electrónico de veterinaria y logo de veterinaria.
 */
export interface SessionData {
    userType: string;
    username: string;
    userFullName: string;
    veterinaryId?: string;
    veterinaryName?: string;
    veterinaryEmail?: string;
    veterinaryLogoImg?: string;
}
