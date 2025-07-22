import { useState } from "react";
import type { JSX } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MyModal from "../../common/elements/modal";
import Button from "../../common/elements/button";
import NewEventForm from "../components/eventForm";

const events = [
    { title: "Meeting", start: new Date() }
];

export default function Appointment(): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar la apertura del modal y el evento seleccionado.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Estado para manejar el evento seleccionado en el calendario.
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    // Estado para controla el boton mis citas - todas las citas
    const [showMyAppointments, setShowMyAppointments] = useState(false);

    function handleEventClick(clickInfo: any) {
        setSelectedEvent(clickInfo.event);
        setIsModalOpen(true);
    }

    return (
        <section className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)] p-6">
            <div className="border-b border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Citas</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona los eventos del calendario ({events.length} eventos)
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
                    events={events}
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
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-primary-dark">Detalle de la Cita</h3>
                        <div className="text-sm space-y-1">
                            <p><strong>Motivo:</strong> {selectedEvent.timeText}</p>
                            <p><strong>Fecha:</strong> {selectedEvent.start?.toLocaleDateString()}</p>
                            {selectedEvent.extendedProps?.description && (
                                <p><strong>Descripción:</strong> {selectedEvent.extendedProps.description}</p>
                            )}
                        </div>
                        <div className="flex justify-end pt-3">
                            <Button
                                variant="error"
                                text="Cerrar"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedEvent(null);
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
                    />
                )}
            </MyModal>

        </section>
    );
}
