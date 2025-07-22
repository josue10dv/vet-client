import { axiosInstance } from "../../common/services/requestHandler";
import type { Pet } from "../../common/interfaces/pets";

/**
 * Servicio para obtener información de mascotas en el módulo de historia clínica
 */
export class PetService {
    /**
     * Obtiene el listado completo de mascotas
     * @returns Promise con el array de mascotas
     */
    static async getAllPets(): Promise<Pet[]> {
        try {
            const response = await axiosInstance.get("/pet/get-all");
            return response.data.payload.items || [];
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
            throw new Error("No se pudo obtener el listado de mascotas");
        }
    }

    /**
     * Obtiene una mascota específica por su ID
     * @param id - ID de la mascota
     * @returns Promise con los datos de la mascota
     */
    static async getPetById(id: string): Promise<Pet> {
        try {
            const response = await axiosInstance.get(`/pet/get-one/${id}`);
            return response.data.payload;
        } catch (error) {
            console.error("Error al obtener mascota:", error);
            throw new Error("No se pudo obtener la información de la mascota");
        }
    }

    /**
     * Convierte el array de mascotas a formato de opciones para selector
     * @param pets - Array de mascotas
     * @returns Array de opciones con value y label
     */
    static formatPetsForSelector(pets: Pet[]): Array<{ value: string; label: string }> {
        return pets.map(pet => ({
            value: pet.id,
            label: `${pet.name} - ${pet.type} (${pet.breed})`
        }));
    }
}
