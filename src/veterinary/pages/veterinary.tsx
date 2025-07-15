import { useEffect, useState, type JSX } from "react";
import VeterinaryList from "../components/veterinaryList";
import VeterinaryForm from "../components/veterinaryForm";
import VeterinaryDetails from "../components/veterinaryDetails";
import MyModal from "../../common/elements/modal";
import { axiosInstance } from "../../common/services/requestHandler";
import type { VeterinaryProps } from "../../common/interfaces/veterinaries";
import { useLoading } from "../../common/providers/loadingContext";
import { triggerToast } from "../../common/services/toastHandler";

export default function VeterinaryPage(): JSX.Element {
    /**
     * Interface para manejar el estado de edición de veterinaria
     */
    interface VeterinaryForEdition {
        id: string | null;
        initValues: VeterinaryProps | null;
    }

    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para controlar el proceso de edicion.
    const [veterinaryForEdition, setVeterinaryForEdition] = useState<VeterinaryForEdition>({
        id: null,
        initValues: null
    });
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    // Estado para manejar el listado de veterinarias.
    const [veterinaries, setVeterinaries] = useState<VeterinaryProps[]>([]);
    // Estado para controlar el modal de detalles
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        veterinary: VeterinaryProps | null;
    }>({
        isOpen: false,
        veterinary: null
    });
    // Obtiene el listado de veterinarias
    useEffect(() => {
        fetchVeterinaries();
    }, []);
    /*************************
     ******** UTILS **********
     *************************/
    // Obtiene el listado de veterinarias
    const fetchVeterinaries = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/veterinary/get-all");
            setVeterinaries(response.data.payload.items || []);
        } catch (error) {
            console.error("Error al obtener veterinarias:", error);
        } finally {
            hideLoading();
        }
    };
    // Carga una veterinaria específica para editar
    const loadVeterinaryForEdit = async (id: string) => {
        try {
            const response = await axiosInstance.get(`/veterinary/get-one/${id}`);
            setVeterinaryForEdition({
                id: response.data.payload.id,
                initValues: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar veterinaria:", error);
        }
    };

    // Elimina una veterinaria
    const deleteVeterinary = async (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta veterinaria?")) {
            try {
                await axiosInstance.delete(`/veterinary/delete/${id}`);
                await fetchVeterinaries(); // Refrescar la lista
                triggerToast("Veterinaria eliminada exitosamente", "success");
            } catch (error) {
                console.error("Error al eliminar veterinaria:", error);
            }
        }
    };

    // Visualiza los detalles de una veterinaria
    const viewVeterinary = async (id: string) => {
        try {
            showLoading();
            const response = await axiosInstance.get(`/veterinary/get-one/${id}`);
            setModalState({
                isOpen: true,
                veterinary: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar detalles de veterinaria:", error);
            triggerToast("Error al cargar los detalles de la veterinaria", "error");
        } finally {
            hideLoading();
        }
    };

    // Cierra el modal de detalles
    const closeModal = () => {
        setModalState({
            isOpen: false,
            veterinary: null
        });
    };

    // Accede a la aplicación de una veterinaria específica
    const accessVeterinary = (id: string) => {
        console.log(`Acceder a la aplicación de veterinaria ${id}`);
        // Aquí puedes implementar la lógica para redirigir a la aplicación específica de la veterinaria
    };

    // Función para limpiar el estado de edición
    const clearEditing = () => {
        setVeterinaryForEdition({
            id: null,
            initValues: null
        });
    };

    // Función mejorada para manejar el callback después de submit
    const handleFormSubmitted = async () => {
        await fetchVeterinaries(); // Refrescar la lista
        clearEditing(); // Limpiar el estado de edición
    };

    // Determina qué acciones están disponibles para cada veterinaria
    const getAvailableActions = (veterinary: VeterinaryProps) => {
        return {
            onEdit: loadVeterinaryForEdit,
            onDelete: veterinary.isActive ? deleteVeterinary : undefined,
            onView: viewVeterinary,
            onAccess: veterinary.isActive ? accessVeterinary : undefined
        };
    };

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <>
            <section className="flex flex-col md:flex-row gap-4 w-full">
                <div className="md:flex-[60%] w-full">
                    {/* Lista de Veterinarias */}
                    <VeterinaryList
                        list={veterinaries}
                        onEdit={loadVeterinaryForEdit}
                        onDelete={deleteVeterinary}
                        onView={viewVeterinary}
                        onAccess={accessVeterinary}
                        getActions={getAvailableActions}
                    />
                </div>
                <div className="md:flex-[40%] w-full">
                    {/* Formulario */}
                    <VeterinaryForm
                        submited={handleFormSubmitted} // Callback para refrescar la lista después de enviar el formulario
                        initialValues={veterinaryForEdition.initValues}
                        editingId={veterinaryForEdition.id}
                    />

                </div>
            </section>

            {/* Modal de Detalles */}
            <MyModal
                isOpen={modalState.isOpen}
                onRequestClose={closeModal}
            >
                {
                    modalState.veterinary ? (
                        <VeterinaryDetails veterinary={modalState.veterinary} />
                    ) : (
                        <div>Cargando detalles de la veterinaria...</div>
                    )
                }
            </MyModal>
        </>
    );
}
