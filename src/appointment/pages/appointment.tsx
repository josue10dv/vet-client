import { useEffect, useState } from "react";
import type { JSX } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MyModal from "../../common/elements/modal";
import Button from "../../common/elements/button";
import NewEventForm from "../components/eventForm";
import { useLoading } from "../../common/providers/loadingContext";
import { axiosInstance } from "../../common/services/requestHandler";
import { BadgeStatus } from "../../common/elements/badge";
import { triggerToast } from "../../common/services/toastHandler";

interface Appointment {
    id: string;
    date: string;
    reason: string;
    status: string;
    petId: {
        name: string;
        ownerName: string;
        birthMonthYear?: string;
        type?: string;
        breed?: string;
    };
}

export default function Appointment(): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar el listado de citas
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    // Estado para manejar el listado de mascotas de la veterinaria
    const [pets, setPets] = useState<{
        value: string;
        label: string;
    }[]>([]);
    // Estado para manejar la apertura del modal y el evento seleccionado.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Estado para manejar el evento seleccionado en el calendario.
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    // Estado para controla el boton mis citas - todas las citas
    const [showMyAppointments, setShowMyAppointments] = useState(false);
    // Obtiene el listado de veterinarias
    useEffect(() => {
        fetchPets();
    }, []);
    // Obtiene el listado de citas
    useEffect(() => {
        fetchAppointments();
    }, []);

    function handleEventClick(clickInfo: any) {
        setSelectedEvent(clickInfo.event);
        setIsModalOpen(true);
    }

    // Obtiene el listado de mascotas
    const fetchPets = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/pet/get-all");
            const options = response.data.payload.items.map((pet: { id: string, name: string }) => ({
                value: pet.id,
                label: pet.name
            }));
            setPets(options);
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
        } finally {
            hideLoading();
        }
    };
    // Obtiene el listado de citas
    const fetchAppointments = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/appointment/get-all");
            const options = response.data.payload.map((appointment: Appointment) => {
                const { petId } = appointment;
                return {
                    id: appointment.id,
                    start: new Date(appointment.date),
                    title: appointment.reason,
                    extendedProps: {
                        petName: petId.name,
                        petOwner: petId.ownerName,
                        birthMonthYear: petId.birthMonthYear,
                        petType: petId.type,
                        breed: petId.breed,
                        status: appointment.status,
                        reason: appointment.reason
                    }
                }
            });
            setAppointments(options);
        } catch (error) {
            console.error("Error al obtener citas:", error);
        } finally {
            hideLoading();
        }
    };
    // Cancela una cita
    const dropAppointment = async (id: string, status: string) => {
        try {
            showLoading();
            const response = status === 'pendiente'
                ? await axiosInstance.get(`/appointment/cancel/${id}`)
                : await axiosInstance.delete(`/appointment/delete/${id}`);
            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');

            if (success) {
                fetchAppointments();
                setIsModalOpen(false);
                setSelectedEvent(null);
            }
        } catch (error) {
            console.error("Error al cancelar la cita:", error);
            triggerToast("Error al cancelar la cita", 'error');
        } finally {
            hideLoading();
        }
    }

    return (
        <section className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)] p-6">
            <div className="border-b border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Citas</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona los eventos del calendario ({appointments.length} eventos)
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            text={showMyAppointments ? "Ver Todas las Citas" : "Mis Citas"}
                            variant={showMyAppointments ? "secondary" : "tertiary"}
                            onClick={() => setShowMyAppointments(!showMyAppointments)}
                        />
                        <Button
                            text="Registrar Cita"
                            variant="primary"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={appointments}
                    height="auto"
                    eventClick={handleEventClick}
                    headerToolbar={{
                        start: 'title',
                        center: '',
                        end: 'today prev,next',
                    }}
                    dayMaxEventRows={2}
                    showNonCurrentDates={false}
                    dayCellClassNames="!text-sm !text-gray-700"
                    contentHeight="auto"
                />
            </div>

            <MyModal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                }}
                closeButton={false}
            >
                {selectedEvent ? (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary-dark">Detalle de la Cita</h3>
                        <div className="text-sm space-y-2">
                            <p><strong>Motivo:</strong> {selectedEvent.title}</p>
                            <p>
                                <strong>Fecha y Hora:</strong>{" "}
                                {selectedEvent.start?.toLocaleDateString()} -{" "}
                                {selectedEvent.start?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            <p><strong>Mascota:</strong> {selectedEvent.extendedProps?.petName}</p>
                            <p><strong>Tipo:</strong> {selectedEvent.extendedProps?.petType}</p>
                            <p><strong>Raza:</strong> {selectedEvent.extendedProps?.breed || 'No especificado'}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {selectedEvent.extendedProps?.birthMonthYear || 'No registrada'}</p>
                            <p><strong>Propietario:</strong> {selectedEvent.extendedProps?.petOwner}</p>
                            <p>
                                <strong>Estado:</strong>
                                <div className="p-1">
                                    <BadgeStatus
                                        text={selectedEvent.extendedProps?.status}
                                        variant={
                                            selectedEvent.extendedProps?.status === 'pendiente'
                                                ? 'primary'
                                                : selectedEvent.extendedProps?.status === 'completada'
                                                    ? 'success'
                                                    : selectedEvent.extendedProps?.status === 'cancelada'
                                                        ? 'error'
                                                        : 'primary'
                                        }
                                    />
                                </div>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Button
                                variant="error"
                                text="Cerrar"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedEvent(null);
                                }}
                            />
                            <Button
                                variant="tertiary"
                                text={selectedEvent.extendedProps?.status === 'pendiente' ? "Cancelar Cita" : "Eliminar Cita"}
                                onClick={() => {
                                    dropAppointment(selectedEvent.id, selectedEvent.extendedProps?.status);
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <NewEventForm
                        closeModal={() => setIsModalOpen(false)}
                        clearEditing={() => setSelectedEvent(null)}
                        initialValues={null}
                        editingId={null}
                        petOptions={pets}
                        submited={() => {
                            fetchAppointments(); // Refrescar la lista de citas
                            setIsModalOpen(false); // Cerrar el modal
                            setSelectedEvent(null); // Limpiar el evento seleccionado
                        }}
                    />
                )}
            </MyModal>

        </section>
    );
}
