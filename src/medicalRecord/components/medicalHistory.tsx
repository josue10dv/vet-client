import type { JSX } from "react";
import TextArea from "../../common/elements/textArea";
import type { MedicalRecordState } from "../interfaces/medicalRecord";

/**
 * Propiedades del componente MedicalHistory.
 */
interface MedicalHistoryProps {
    data: MedicalRecordState["history"];
    onChange: (updatedFields: Partial<MedicalRecordState["history"]>) => void;
}

export default function MedicalHistory({
    data,
    onChange
}: MedicalHistoryProps): JSX.Element {

    return (
        <section className="w-full text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)] bg-white">
            <div className="mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    Historia Clínica
                </h2>
                <p className="text-sm text-primary mt-1">Registro clínico del paciente.</p>
            </div>

            {/* Anamnesis */}
            <div className="mb-6">
                <TextArea
                    name="anamnesis"
                    label="Anamnesis"
                    onChange={(e: any) => onChange({ anamnesis: e.target.value })}
                    placeholder="Ingrese la anamnesis del paciente"
                    value={data.anamnesis}
                />
            </div>

            {/* Examen físico */}
            <div className="mb-6">
                <TextArea
                    name="examen_fisico"
                    label="Examen Físico"
                    onChange={(e: any) => onChange({ physicalExam: e.target.value })}
                    placeholder="Ingrese los hallazgos del examen físico"
                    value={data.physicalExam}
                />
            </div>

            {/* Diagnóstico */}
            <div className="mb-6">
                <TextArea
                    name="diagnostico"
                    label="Diagnóstico"
                    onChange={(e: any) => onChange({ diagnosis: e.target.value })}
                    placeholder="Ingrese el diagnóstico del paciente"
                    value={data.diagnosis}
                />
            </div>
        </section>
    );
}
