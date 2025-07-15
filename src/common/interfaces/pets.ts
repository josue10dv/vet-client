/**
 * Propiedades de la interfaz Pet
 * - `id`: Identificador único de la mascota.
 * - `name`: Nombre de la mascota.
 * - `species`: Especie de la mascota (ej. perro, gato).
 * - `breed`: Raza de la mascota.
 * - `age`: Edad de la mascota.
 * - `sex`: Sexo de la mascota (ej. macho, hembra).
 */
export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: string
    sex: 'male' | 'female';
}