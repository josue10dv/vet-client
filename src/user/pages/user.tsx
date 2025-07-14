
import { useEffect, useState, type JSX } from "react";
import UserList from "../components/userList";
import UserForm from "../components/userForm";
import UserDetails from "../components/userDetails";
import Modal from "../../common/elements/modal";
import { axiosInstance } from "../../common/services/requestHandler";
import type { UserProps } from "../../common/interfaces/user";
import { useLoading } from "../../common/providers/loadingContext";
import { triggerToast } from "../../common/services/toastHandler";

export default function UserPage(): JSX.Element {
    /**
     * Interface para manejar el estado de edición de usuario
     */
    interface UserForEdition {
        id: string | null;
        initValues: UserProps | null;
    }

    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para controlar el proceso de edicion.
    const [userForEdition, setUserForEdition] = useState<UserForEdition>({
        id: null,
        initValues: null
    });
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    // Estado para manejar el listado de usuarios.
    const [users, setUsers] = useState<UserProps[]>([]);
    // Estado para controlar el modal de detalles
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        user: UserProps | null;
    }>({
        isOpen: false,
        user: null
    });

    // Obtiene el listado de usuarios
    useEffect(() => {
        fetchUsers();
    }, []);

    /*************************
     ******** UTILS **********
     *************************/
    // Obtiene el listado de usuarios
    const fetchUsers = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/user/get-all");
            setUsers(response.data.payload.items || []);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        } finally {
            hideLoading();
        }
    };

    // Carga un usuario específico para editar
    const loadUserForEdit = async (id: string) => {
        try {
            showLoading();
            const response = await axiosInstance.get(`/user/get-one/${id}`);
            setUserForEdition({
                id: response.data.payload.id,
                initValues: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar usuario:", error);
            // Usar datos mock para la edición
            const user = users.find(u => u.id === id);
            if (user) {
                setUserForEdition({
                    id: user.id,
                    initValues: user
                });
            }
        } finally {
            hideLoading();
        }
    };

    // Elimina un usuario
    const deleteUser = async (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            try {
                await axiosInstance.delete(`/user/delete/${id}`);
                await fetchUsers(); // Refrescar la lista
                triggerToast("Usuario eliminado exitosamente", "success");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                triggerToast("Error al eliminar usuario", "error");
            }
        }
    };

    // Visualiza los detalles de un usuario
    const viewUser = async (id: string) => {
        try {
            showLoading();
            const response = await axiosInstance.get(`/user/get-one/${id}`);
            setModalState({
                isOpen: true,
                user: response.data.payload
            });
        } catch (error) {
            console.error("Error al cargar detalles de usuario:", error);
            // Usar datos mock si falla la API
            const user = users.find(u => u.id === id);
            if (user) {
                setModalState({
                    isOpen: true,
                    user: user
                });
            } else {
                triggerToast("Error al cargar los detalles del usuario", "error");
            }
        } finally {
            hideLoading();
        }
    };

    // Cambia el estado (activo/inactivo) de un usuario
    const toggleUserStatus = async (id: string) => {
        const user = users.find(u => u.id === id);
        if (!user) return;

        const action = user.isActive ? "desactivar" : "activar";
        if (window.confirm(`¿Estás seguro de que quieres ${action} este usuario?`)) {
            try {
                await axiosInstance.patch(`/user/toggle-status/${id}`);
                await fetchUsers(); // Refrescar la lista
                triggerToast(`Usuario ${action}do exitosamente`, "success");
            } catch (error) {
                console.error(`Error al ${action} usuario:`, error);
                triggerToast(`Error al ${action} usuario`, "error");
            }
        }
    };

    // Cierra el modal de detalles
    const closeModal = () => {
        setModalState({
            isOpen: false,
            user: null
        });
    };

    // Función para limpiar el estado de edición
    const clearEditing = () => {
        setUserForEdition({
            id: null,
            initValues: null
        });
    };

    // Función mejorada para manejar el callback después de submit
    const handleFormSubmitted = async () => {
        await fetchUsers(); // Refrescar la lista
        clearEditing(); // Limpiar el estado de edición
    };

    // Determina qué acciones están disponibles para cada usuario
    const getAvailableActions = (user: UserProps) => {
        return {
            onEdit: loadUserForEdit,
            onDelete: user.type !== "admin" ? deleteUser : undefined,
            onView: viewUser,
            onToggleStatus: toggleUserStatus
        };
    };

    /*************************
     ******** RENDER **********
     *************************/
    return (
        <>
            <section className="flex flex-col md:flex-row gap-4 w-full">
                <div className="md:flex-[0_0_60%] w-full">
                    {/* Lista de Usuarios */}
                    <UserList
                        list={users}
                        onEdit={loadUserForEdit}
                        onDelete={deleteUser}
                        onView={viewUser}
                        onToggleStatus={toggleUserStatus}
                        getActions={getAvailableActions}
                    />
                </div>
                <div className="md:flex-[0_0_40%] w-full">
                    {/* Formulario */}
                    <UserForm
                        submited={handleFormSubmitted}
                        initialValues={userForEdition.initValues}
                        editingId={userForEdition.id}
                        clearEditing={clearEditing}
                    />
                </div>
            </section>

            {/* Modal de Detalles */}
            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title="Detalles del Usuario"
                size="lg"
            >
                {modalState.user && (
                    <UserDetails user={modalState.user} />
                )}
            </Modal>
        </>
    );
}