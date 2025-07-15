import { useState, type JSX } from "react";
import TextArea from "../../common/elements/textArea";

export default function MedicalHistory(): JSX.Element {
    const [anamnesis, setAnamnesis] = useState("");
    const [physicalExam, setPhysicalExam] = useState("");
    const [diagnosis, setDiagnosis] = useState("");

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
                    value={anamnesis}
                    onChange={(e) => setAnamnesis(e.target.value)}
                    placeholder="Describe los síntomas, antecedentes y motivo de consulta..."
                />
            </div>

            {/* Examen físico */}
            <div className="mb-6">
                <TextArea
                    name="examen_fisico"
                    label="Examen Físico"
                    value={physicalExam}
                    onChange={(e) => setPhysicalExam(e.target.value)}
                    placeholder="Registra signos vitales, observaciones físicas, etc."
                />
            </div>

            {/* Diagnóstico */}
            <div className="mb-6">
                <TextArea
                    name="diagnostico"
                    label="Diagnóstico"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Conclusión clínica basada en los datos recopilados."
                />
            </div>
        </section>
    );
}
