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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    function handleEventClick(clickInfo: any) {
        setSelectedEvent(clickInfo.event);
        setIsModalOpen(true);
    }

    return (
        <section className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--neutral-gray020)] p-6">
            <div className="border-b border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-primary-dark">Lista de Mascotas</h2>
                        <p className="text-sm text-primary mt-1">
                            Gestiona los eventos del calendario ({events.length} eventos)
                        </p>
                    </div>
                    <div>
                        <Button
                            text="Registrar Cita"
                            variant="primary"
                            onClick={() => setIsModalOpen(true)}
                            fullWidth={false}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={false}
                    events={events}
                    eventContent={renderEventContent}
                    height="auto"
                    eventClick={handleEventClick}
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
                        <h3 className="text-xl font-bold">Detalle de Cita</h3>
                        <p><strong>Título:</strong> {selectedEvent.title}</p>
                        <p><strong>Fecha:</strong> {selectedEvent.start?.toLocaleDateString()}</p>
                        {selectedEvent.extendedProps?.description && (
                            <p><strong>Descripción:</strong> {selectedEvent.extendedProps.description}</p>
                        )}
                        <div className="flex justify-end">
                            <Button
                                variant="error"
                                text="Cerrar"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedEvent(null);
                                }}
                                fullWidth={false}
                            />
                        </div>
                    </div>
                ) : (
                    <NewEventForm close={() => setIsModalOpen(false)} />
                )}
            </MyModal>

        </section>
    );
}

function renderEventContent(eventInfo: any) {
    return (
        <>
            <b className="mr-1">{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
