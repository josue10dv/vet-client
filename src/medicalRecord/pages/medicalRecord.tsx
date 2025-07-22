import { useState, type JSX } from "react";
import ForPetsIcon from "../../assets/icons/pet.svg?react";
import TaskIcon from "../../assets/icons/task.svg?react";
import PillIcon from "../../assets/icons/pill.svg?react";
import PatientFile from "../components/patientFile";
import MedicalHistory from "../components/medicalHistory";
import Button from "../../common/elements/button";
import Treatment from "../components/treatment";
import type { MedicalRecordState } from "../interfaces/medicalRecord";
import LateralNavbar from "../../common/elements/lateralNavbar";
import { useLoading } from "../../common/providers/loadingContext";
import { axiosInstance } from "../../common/services/requestHandler";
import { triggerToast } from "../../common/services/toastHandler";
/**
 * Tipos para las secciones del historial médico
 */
type Section = "ficha" | "historia" | "receta";

export default function MedicalRecord(): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar la sección activa del historial médico
    const [activeSection, setActiveSection] = useState<Section>("ficha");
    // Estado para manejar los datos del historial médico
    const [medicalRecord, setMedicalRecord] = useState<MedicalRecordState>({
        patient: {
            patientId: ""
        },
        history: {
            anamnesis: "",
            physicalExam: "",
            diagnosis: ""
        },
        treatment: {
            examNotes: "",
            eventType: "",
            eventDate: "",
            eventTime: "",
            eventMotive: "",
            medications: []
        }
    });
    /*************************
     ******** HOOKS **********
     *************************/
    // Configura las opciones de la barra de navegación lateral
    const navbarOptions = [
        {
            label: 'Ficha',
            icon: <ForPetsIcon className={`w-8 h-8 mb-1 
                        ${activeSection === "ficha" ? 'icon-primary-light' : 'icon-primary'}`} />
        },
        {
            label: 'Historia',
            icon: <TaskIcon className={`w-8 h-8 mb-1 
                        ${activeSection === "historia" ? 'icon-primary-light' : 'icon-primary'}`} />
        },
        {
            label: 'Receta',
            icon: <PillIcon className={`w-8 h-8 mb-1 
                        ${activeSection === "receta" ? 'icon-primary-light' : 'icon-primary'}`} />
        }
    ];
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    /*************************
     ******** UTILS *********
     *************************/
    async function saveMedicalRecord(medicalRecord: MedicalRecordState) {
        try {
            showLoading();
            const response = await axiosInstance.post("/medical-record/create", medicalRecord);
            const { success, message } = response.data;
            triggerToast(message, success ? 'success' : 'error');
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
        } finally {
            hideLoading();
        }
    }

    /*************************
     ******** RENDER *********
     *************************/
    return (
        <div className="flex h-119 overflow-hidden gap-6">
            {/* Barra de navegación lateral */}
            <div className="flex flex-col">
                <LateralNavbar
                    options={navbarOptions}
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}

                />
                <Button
                    variant="success"
                    text="Guardar"
                    fullWidth={false}
                    className="mt-4"
                    onClick={() => {
                        saveMedicalRecord(medicalRecord);
                    }}
                />
                <Button
                    variant="error"
                    text="Limpiar"
                    fullWidth={false}
                    className="mt-4"
                />
            </div>

            {/* Contenido dinámico */}
            <div className="flex-1 overflow-y-auto pr-2">

                {activeSection === "ficha" && (
                    <PatientFile
                        data={medicalRecord.patient}
                        onChange={(newData) =>
                            setMedicalRecord((prev) => ({
                                ...prev,
                                patient: { ...prev.patient, ...newData }
                            }))
                        }
                    />
                )}
                {activeSection === "historia" && (
                    <MedicalHistory
                        data={medicalRecord.history}
                        onChange={(updatedFields) =>
                            setMedicalRecord((prev) => ({
                                ...prev,
                                history: { ...prev.history, ...updatedFields }
                            }))
                        }
                    />
                )}
                {activeSection === "receta" && (
                    <Treatment
                        data={medicalRecord.treatment}
                        onChange={(newData) =>
                            setMedicalRecord((prev) => ({
                                ...prev,
                                treatment: { ...prev.treatment, ...newData }
                            }))
                        }
                    />
                )}
            </div>
        </div>
    );
}
