import { axiosInstance } from "../../common/services/requestHandler";
import type { MedicalRecordState } from "../interfaces/medicalRecord";

/**
 * Estructura de datos para enviar la historia clínica al backend
 */
export interface MedicalRecordPayload {
    patientId: string;
    anamnesis: string;
    physicalExam: string;
    diagnosis: string;
    examNotes: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    eventMotive?: string;
    medications: Array<{
        name: string;
        quantity: string;
        instructions: string;
    }>;
}

/**
 * Servicio para manejar las historias clínicas
 */
export class MedicalRecordService {
    /**
     * Registra una nueva historia clínica
     * @param medicalRecord - Datos completos de la historia clínica
     * @returns Promise con la respuesta del servidor
     */
    static async createMedicalRecord(medicalRecord: MedicalRecordState): Promise<any> {
        try {
            const payload: MedicalRecordPayload = {
                patientId: medicalRecord.patient.patientId,
                anamnesis: medicalRecord.history.anamnesis,
                physicalExam: medicalRecord.history.physicalExam,
                diagnosis: medicalRecord.history.diagnosis,
                examNotes: medicalRecord.treatment.examNotes,
                eventType: medicalRecord.treatment.eventType,
                eventDate: medicalRecord.treatment.eventDate,
                eventTime: medicalRecord.treatment.eventTime,
                eventMotive: medicalRecord.treatment.eventMotive,
                medications: medicalRecord.treatment.medications
            };

            const response = await axiosInstance.post("/medical-record/create", payload);
            return response.data;
        } catch (error) {
            console.error("Error al registrar historia clínica:", error);
            throw new Error("No se pudo registrar la historia clínica");
        }
    }

    /**
     * Obtiene el historial médico de una mascota
     * @param petId - ID de la mascota
     * @returns Promise con el historial médico
     */
    static async getMedicalRecordsByPet(petId: string): Promise<any[]> {
        try {
            const response = await axiosInstance.get(`/medical-record/get-by-pet/${petId}`);
            return response.data.payload || [];
        } catch (error) {
            console.error("Error al obtener historial médico:", error);
            throw new Error("No se pudo obtener el historial médico");
        }
    }

    /**
     * Actualiza una historia clínica existente
     * @param id - ID de la historia clínica
     * @param medicalRecord - Datos actualizados
     * @returns Promise con la respuesta del servidor
     */
    static async updateMedicalRecord(id: string, medicalRecord: MedicalRecordState): Promise<any> {
        try {
            const payload: MedicalRecordPayload = {
                patientId: medicalRecord.patient.patientId,
                anamnesis: medicalRecord.history.anamnesis,
                physicalExam: medicalRecord.history.physicalExam,
                diagnosis: medicalRecord.history.diagnosis,
                examNotes: medicalRecord.treatment.examNotes,
                eventType: medicalRecord.treatment.eventType,
                eventDate: medicalRecord.treatment.eventDate,
                eventTime: medicalRecord.treatment.eventTime,
                eventMotive: medicalRecord.treatment.eventMotive,
                medications: medicalRecord.treatment.medications
            };

            const response = await axiosInstance.put(`/medical-record/update/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar historia clínica:", error);
            throw new Error("No se pudo actualizar la historia clínica");
        }
    }

    /**
     * Valida que todos los campos obligatorios estén completos
     * @param medicalRecord - Datos a validar
     * @returns Array de errores encontrados
     */
    static validateMedicalRecord(medicalRecord: MedicalRecordState): string[] {
        const errors: string[] = [];

        // Validaciones del paciente
        if (!medicalRecord.patient.patientId) {
            errors.push("Debe seleccionar una mascota");
        }

        // Validaciones de la historia
        if (!medicalRecord.history.anamnesis.trim()) {
            errors.push("La anamnesis es obligatoria");
        }
        if (!medicalRecord.history.physicalExam.trim()) {
            errors.push("El examen físico es obligatorio");
        }
        if (!medicalRecord.history.diagnosis.trim()) {
            errors.push("El diagnóstico es obligatorio");
        }

        // Validaciones del tratamiento
        if (!medicalRecord.treatment.eventDate) {
            errors.push("La fecha del evento es obligatoria");
        }
        if (!medicalRecord.treatment.eventTime) {
            errors.push("La hora del evento es obligatoria");
        }

        return errors;
    }
}
