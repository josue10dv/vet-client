import { useState, type JSX } from "react";
import Table from "../../common/elements/table";
import Button from "../../common/elements/button";
import Input from "../../common/elements/input";
import Select from "../../common/elements/selector";
import TextArea from "../../common/elements/textArea";
import type { Event, MedicalRecordState, Medication } from "../interfaces/medicalRecord";

/**
 * Propiedades del componente Treatment.
 */
interface TreatmentProps {
    data: MedicalRecordState["treatment"];
    onChange: (updatedFields: Partial<MedicalRecordState["treatment"]>) => void;
}

/**
 * Componente que renderiza la sección de tratamiento del historial médico.
 * Incluye la gestión de eventos, exámenes y medicamentos.
 * @returns {JSX.Element} Componente de tratamiento del historial médico.
 */
export default function Treatment({
    data,
    onChange
}: TreatmentProps): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado temporal para el nuevo medicamento que se va a ingresar
    const [newMedication, setNewMedication] = useState<Medication>({
        name: "",
        quantity: "",
        instructions: ""
    });

    /*************************
     ******** UTILS **********
     *************************/
    // Agrega un nuevo medicamento a la lista
    const addMedication = () => {
        if (
            newMedication.name.trim() &&
            newMedication.quantity.trim() &&
            newMedication.instructions.trim()
        ) {
            const updatedList = [...(data.medications || []), newMedication];
            onChange({ medications: updatedList });

            // Limpia el formulario temporal
            setNewMedication({ name: "", quantity: "", instructions: "" });
        }
    };

    // Elimina un medicamento de la lista
    const removeMedication = (indexToRemove: number) => {
        const updatedList = (data.medications || []).filter(
            (_: Medication, i: number) => i !== indexToRemove
        );
        onChange({ medications: updatedList });
    };

    return (
        <section className="w-full text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)] bg-white space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exámenes */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Orden de exámenes</h2>
                    <TextArea
                        name="exams"
                        label="Notas de Exámenes"
                        placeholder="Ingrese las órdenes de exámenes o notas relevantes..."
                        value={data.examNotes || ""}
                        onChange={(e) => onChange({ examNotes: e.target.value })}
                    />
                </div>

                {/* Eventos */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Eventos</h2>
                    <Select
                        label="Tipo de Evento"
                        name="eventType"
                        defaultValue={data.eventType || "seguimiento"}
                        options={[
                            { label: "Seguimiento", value: "seguimiento" },
                            { label: "Vacuna", value: "vacuna" },
                            { label: "Desparasitación", value: "desparacitación" },
                            { label: "Otro", value: "otro" }
                        ]}
                        onChange={(e) =>
                            onChange({ eventType: e.target.value as Event })
                        }
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Fecha"
                            name="eventDate"
                            type="date"
                            value={data.eventDate || ""}
                            onChange={(e) => onChange({ eventDate: e.target.value })}
                        />
                        <Input
                            label="Hora"
                            name="eventTime"
                            type="time"
                            value={data.eventTime || ""}
                            onChange={(e) => onChange({ eventTime: e.target.value })}
                        />
                    </div>

                    {data.eventType === "otro" && (
                        <Input
                            label="Motivo del Evento"
                            name="eventMotive"
                            type="text"
                            value={data.eventMotive || ""}
                            onChange={(e) => onChange({ eventMotive: e.target.value })}
                        />
                    )}
                </div>
            </div>

            {/* Medicamentos */}
            <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Lista de Medicamentos</h2>
                        <p className="text-sm text-primary mt-1">
                            Listado de medicamentos y tratamientos prescritos.
                        </p>
                    </div>
                </div>

                {/* Formulario de nuevo medicamento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Nombre del medicamento"
                        name="medicationName"
                        value={newMedication.name}
                        onChange={(e) =>
                            setNewMedication({
                                ...newMedication,
                                name: e.target.value
                            })
                        }
                    />
                    <Input
                        label="Cantidad"
                        name="quantity"
                        value={newMedication.quantity}
                        onChange={(e) =>
                            setNewMedication({
                                ...newMedication,
                                quantity: e.target.value
                            })
                        }
                    />
                    <Input
                        label="Instrucciones"
                        name="instructions"
                        value={newMedication.instructions}
                        onChange={(e) =>
                            setNewMedication({
                                ...newMedication,
                                instructions: e.target.value
                            })
                        }
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        variant="primary"
                        text="Agregar Medicamento"
                        fullWidth={false}
                        onClick={addMedication}
                    />
                </div>

                {/* Tabla de medicamentos */}
                <Table
                    color="bg-primary-dark"
                    headers={["Nombre", "Cantidad", "Indicaciones", "Op."]}
                    rows={(data.medications || []).map((med, index) => ({
                        id: index,
                        cells: [
                            med.name,
                            med.quantity,
                            med.instructions,
                            <Button
                                variant="error"
                                text="x"
                                onClick={() => removeMedication(index)}
                            />
                        ],
                        actions: {}
                    }))}
                    hasActions={false}
                    page={1}
                    pageSize={10}
                    totalItems={data.medications?.length || 0}
                    iconFill="icon-secondary-light"
                />
            </div>
        </section>
    );
}
