import type { JSX } from "react";

/**
 * Tipos para los diferentes eventos disponibles
 */
export type Event = "seguimiento" | "vacuna" | "desparacitación" | "otro" | "";

/**
 * Propiedades para una fila de medicamento.
 * - `name`: Componente JSX para el nombre del medicamento.
 * - `quantity`: Componente JSX para la cantidad del medicamento.
 * - `instructions`: Componente JSX para las instrucciones del medicamento.
 */
export interface MedicationRow {
    name: JSX.Element;
    quantity: JSX.Element;
    instructions: JSX.Element;
}

/**
 * Propiedades para un medicamento.
 * - `name`: Nombre del medicamento.
 * - `quantity`: Cantidad del medicamento.
 * - `instructions`: Instrucciones para el uso del medicamento.
 */
export interface Medication {
    name: string;
    quantity: string;
    instructions: string;
}

/**
 * Propiedades de una historia clínica
 * - `patient`: Información del paciente.
 * - `history`: Información de la historia clínica.
 * - `treatment`: Información del tratamiento.
 */
export interface MedicalRecordState {
    patient: {
        patientId: string;
    };
    history: {
        anamnesis: string;
        physicalExam: string;
        diagnosis: string;
    };
    treatment: {
        examNotes: string;
        eventType: Event;
        eventDate: string;
        eventTime: string;
        eventMotive?: string;
        medications: Medication[];
    };
}
