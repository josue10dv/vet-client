import { useEffect, useState } from "react";
import type { JSX } from "react";
import Button from "../../common/elements/button";
import Input from "../../common/elements/input";
import type { MedicalRecordState } from "../interfaces/medicalRecord";
import MyModal from "../../common/elements/modal";
import PetForm from "../../pet/components/petForm";
import { useLoading } from "../../common/providers/loadingContext";
import { axiosInstance } from "../../common/services/requestHandler";

/**
 * Propiedades del componente PaientFile.
 */
interface PaientFileProps {
    data: MedicalRecordState["patient"];
    onChange: (updatedFields: Partial<MedicalRecordState["patient"]>) => void;
}

/**
 * Componente PatientFile.
 * Renderiza la ficha del paciente con información de la mascota y su propietario.
 * @returns {JSX.Element} Componente de ficha del paciente.
 */
export default function PatientFile(
    {
        data,
        onChange
    }: PaientFileProps
): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para manejar el estado de carga del formulario.
    const { showLoading, hideLoading } = useLoading();
    // Estado para manejar la lista de mascotas y la mascota seleccionada
    const [pets, setPets] = useState<any[]>([]);
    // Estado para manejar la mascota seleccionada por el usuario
    const [selectedId, setSelectedId] = useState<string>(pets[0]?.id || "");
    // Estado para seleccionar una mascota específica
    const [selectedPet, setSelectedPet] = useState<any | undefined>(undefined);
    // Estado para manejar el modal de formulario de mascota
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // Obtiene el listado de veterinarias
    useEffect(() => {
        fetchPets();
    }, []);
    // Efecto para actualizar el ID de la mascota seleccionada al cargar los datos
    useEffect(() => {
        if (data.patientId) {
            setSelectedId(data.patientId);
            const selected = pets.find(p => p.value === data.patientId);
            if (selected) {
                setSelectedPet(selected.pet);
            }
        }
    }, [data.patientId, pets]);

    // Obtiene el listado de mascotas
    const fetchPets = async () => {
        try {
            showLoading();
            const response = await axiosInstance.get("/pet/get-all");
            const options = response.data.payload.items.map((item: any) => {
                return {
                    value: item.id,
                    label: item.name,
                    pet: {
                        id: item.id,
                        name: item.name,
                        type: item.type,
                        breed: item.breed,
                        age: item.birthMonthYear,
                        sex: item.sex,
                        ownerName: item.ownerName,
                        ownerEmail: item.ownerEmail,
                        ownerPhone: item.ownerPhone
                    }
                };
            });
            setPets(options);
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
        } finally {
            hideLoading();
        }
    };

    return (
        <section className="flex-1 bg-white text-primary-dark p-6 rounded-xl shadow-sm border border-[var(--neutral-gray020)]">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary-dark">
                    Ficha del paciente
                </h2>
                <p className="text-sm text-primary mt-1">
                    Información del paciente.
                </p>
            </div>

            {/* Selector de mascota */}
            <div className="flex items-center gap-4 mb-2">
                <label className="font-medium">Mascota:</label>
                <select
                    className="p-2 rounded-md border border-primary-dark/30 w-full max-w-xs"
                    value={selectedId}
                    onChange={(e) => {
                        const selectedPet = pets.find(p => p.value === e.target.value);
                        setSelectedId(e.target.value ?? "");
                        setSelectedPet(selectedPet.pet ?? undefined);
                        onChange({ patientId: e.target.value });
                    }}
                >
                    <option value="">Seleccione una mascota</option>
                    {pets.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
                <Button
                    variant="primary"
                    text="Nueva Mascota"
                    fullWidth={false}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {/* Información de la mascota */}
            <div className="grid grid-cols-2 gap-4">
                <Input readOnly name="" label="Nombre" value={selectedPet?.name || ""} />
                <Input readOnly name="" label="Especie" value={selectedPet?.type || ""} />
                <Input readOnly name="" label="Raza" value={selectedPet?.breed || ""} />
                <Input readOnly name="" label="Edad" value={selectedPet?.age || ""} />
                <Input readOnly name="" label="Sexo" value={selectedPet?.sex || ""} />
            </div>

            {/* Información del propietario */}
            <div className="mb-6">
                <div className="p-2 border-t border-gray-200"></div>
                <p className="text-sm text-primary mt-1">
                    Información del propietario.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input readOnly name="" label="Propietario" value={selectedPet?.ownerName || ""} />
                <Input readOnly name="" label="Teléfono" value={selectedPet?.ownerPhone || ""} />
                <Input readOnly name="" label="Correo electrónico" value={selectedPet?.ownerEmail || ""} />
            </div>

            <MyModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="overflow-y-auto max-h-[90vh]">
                    <PetForm
                        editingId={null}
                        submited={() => {
                            setIsModalOpen(false);
                            fetchPets();
                        }}
                        clearEditing={() => {
                            setSelectedId("");
                            setSelectedPet(undefined);
                        }}
                        isModalContained={true}
                    />
                </div>
            </MyModal>
        </section>
    );
}
