import { useEffect, useState, type JSX } from "react";
import PetList from "../components/petList";
import PetForm from "../components/petForm";
import PetDetails from "../components/petDetails";
import MyModal from "../../common/elements/modal";
import { axiosInstance } from "../../common/services/requestHandler";
import type { Pet } from "../../common/interfaces/pets";
import { useLoading } from "../../common/providers/loadingContext";
import { triggerToast } from "../../common/services/toastHandler";

export default function PetPage(): JSX.Element {
    /**
     * Interface para manejar el estado de edición de mascota
     */
    interface PetForEdition {
        id: string | null;
        initValues: Pet | null;
    }

    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para controlar el proceso de edicion.
    const [petForEdition, setPetForEdition] = useState<PetForEdition>({
        id: null,
        initValues: null
    });
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    // Estado para manejar el listado de mascotas.
    const [pets, setPets] = useState<Pet[]>([]);
    // Estado para controlar el modal de detalles
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        pet: Pet | null;
    }>({
        isOpen: false,
        pet: null
    });

    // Obtiene el listado de mascotas
    useEffect(() => {
        fetchPets();
    }, []);

    /*************************
     ******** UTILS **********
     *************************/
    // Obtiene el listado de mascotas
    const fetchPets = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/pet/get-all");
            setPets(response.data.payload.items || []);
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
            // Datos mock en caso de error
            const mockPets: Pet[] = [
                {
                    id: "1",
                    name: "Max",
                    species: "dog",
                    breed: "Labrador",
                    age: "3",
                    sex: "male"
                },
                {
                    id: "2",
                    name: "Luna",
                    species: "cat",
                    breed: "Persa",
                    age: "2",
                    sex: "female"
                },
                {
                    id: "3",
                    name: "Rocky",
                    species: "dog",
                    breed: "Pastor Alemán",
                    age: "5",
                    sex: "male"
                },
                {
                    id: "4",
                    name: "Mimi",
                    species: "cat",
                    breed: "Siamés",
                    age: "1",
                    sex: "female"
                }
            ];
            setPets(mockPets);
        } finally {
            hideLoading();
        }
    };

    // Carga una mascota específica para editar
    const loadPetForEdit = async (id: string) => {
        try {
            showLoading();
            const response = await axiosInstance.get(`/pet/get-one/${id}`);
            setPetForEdition({
                id: response.data.payload.id,
                initValues: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar mascota:", error);
            // Usar datos mock para la edición
            const pet = pets.find(p => p.id === id);
            if (pet) {
                setPetForEdition({
                    id: pet.id,
                    initValues: pet
                });
            }
        } finally {
            hideLoading();
        }
    };

    // Elimina una mascota
    const deletePet = async (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
            try {
                await axiosInstance.delete(`/pet/delete/${id}`);
                await fetchPets(); // Refrescar la lista
                triggerToast("Mascota eliminada exitosamente", "success");
            } catch (error) {
                console.error("Error al eliminar mascota:", error);
                triggerToast("Error al eliminar mascota", "error");
            }
        }
    };

    // Visualiza los detalles de una mascota
    const viewPet = async (id: string) => {
        try {
            showLoading();
            const response = await axiosInstance.get(`/pet/get-one/${id}`);
            setModalState({
                isOpen: true,
                pet: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar detalles de mascota:", error);
            // Usar datos mock si falla la API
            const pet = pets.find(p => p.id === id);
            if (pet) {
                setModalState({
                    isOpen: true,
                    pet: pet
                });
            } else {
                triggerToast("Error al cargar los detalles de la mascota", "error");
            }
        } finally {
            hideLoading();
        }
    };

    // Cierra el modal de detalles
    const closeModal = () => {
        setModalState({
            isOpen: false,
            pet: null
        });
    };

    // Función para limpiar el estado de edición
    const clearEditing = () => {
        setPetForEdition({
            id: null,
            initValues: null
        });
    };

    // Función mejorada para manejar el callback después de submit
    const handleFormSubmitted = async () => {
        await fetchPets(); // Refrescar la lista
        clearEditing(); // Limpiar el estado de edición
    };

    // Determina qué acciones están disponibles para cada mascota
    const getAvailableActions = () => {

        return {
            onEdit: loadPetForEdit,
            onDelete: deletePet,
            onView: viewPet
        };
    };

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <>
            <section className="flex flex-col md:flex-row gap-4 w-full">
                <div className="md:flex-[0_0_60%] w-full">
                    {/* Lista de Mascotas */}
                    <PetList
                        list={pets}
                        onEdit={loadPetForEdit}
                        onDelete={deletePet}
                        onView={viewPet}
                        getActions={getAvailableActions}
                    />
                </div>
                <div className="md:flex-[0_0_40%] w-full">
                    {/* Formulario */}
                    <PetForm
                        submited={handleFormSubmitted}
                        initialValues={petForEdition.initValues}
                        editingId={petForEdition.id}
                        clearEditing={clearEditing}
                    />
                </div>
            </section>

            {/* Modal de Detalles */}
            <MyModal
                isOpen={modalState.isOpen}
                onRequestClose={closeModal}
            >
                {modalState.pet
                    ? (
                        <PetDetails
                            pet={modalState.pet}
                        />
                    )
                    : (
                        <>
                            <p>No se encontraron detalles de la mascota.</p>
                        </>
                    )}
            </MyModal>
        </>
    );
}