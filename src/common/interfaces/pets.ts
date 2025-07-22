/**
 * Propiedades de la interfaz Pet
 * - `id`: Identificador único de la mascota.
 * - `name`: Nombre de la mascota.
 * - `type`: Especie de la mascota (ej. perro, gato).
 * - `breed`: Raza de la mascota.
 * - `age`: Edad de la mascota.
 * - `sex`: Sexo de la mascota (ej. macho, hembra).
 * - `image`: URL de la imagen de la mascota (opcional).
 * - `birthMonthYear`: Fecha de nacimiento en formato "MM/YYYY".
 * - `description`: Descripción de la mascota (opcional).
 */
export interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: number
    sex: 'male' | 'female';
    image?: string;
    birthMonthYear: string;
    description?: string;
}