/**
 * Interface que define las propiedades de un usuario.
 * @property {string} id - Identificador único del usuario.
 * @property {string} name - Nombre de la veterinaria.
 * @property {boolean} isActive - Indica si la veterinaria está activa.
 * @property {string | null} logoImg - URL de la imagen del logo de la veterinaria (opcional).
 * @property {string} email - Correo electrónico de la veterinaria.
 * @property {string} phoneNumber - Número de teléfono de la veterinaria.
 * @property {string} location - Ubicación de la veterinaria.
 * @property {string} numIdentification - Número de identificación de la veterinaria.
 */
export interface VeterinaryProps {
    id: string;
    name: string;
    isActive: boolean;
    logoImg: string | null;
    email: string;
    phoneNumber: string;
    location: string;
    numIdentification: string;
}