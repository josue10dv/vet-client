import { useState } from "react";
import type { JSX } from "react";
import Button from "../../common/elements/button";
import Input from "../../common/elements/input";
import type { Pet } from "../../common/interfaces/pets";
import type { MedicalRecordState } from "../interfaces/medicalRecord";

/**
 * Propiedades del propietario de la mascota.
 * - `name`: Nombres del propietario.
 * - `lastName`: Apellidos del propietario.
 * - `identification`: Cédula o RUC del propietario.
 * - `phoneNumber`: Teléfono de contacto del propietario.
 * - `email`: Correo electrónico del propietario.
 */
interface Owner {
    name: string;
    lastName: string;
    identification: string;
    phoneNumber: string;
    email: string;
}

const mascotasMock: Pet[] = [
    { id: "1", name: "Luna", species: "Canina", breed: "Labrador", age: "4 años", sex: "female" },
    { id: "2", name: "Simba", species: "Felina", breed: "Siames", age: "2 años", sex: "male" }
];

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
    const [mascotas] = useState<Pet[]>(mascotasMock);
    const [selectedId, setSelectedId] = useState<string>(mascotas[0]?.id || "");
    const selectedMascota = mascotas.find(m => m.id === selectedId);

    const propietarioMock: Owner = {
        name: "Juan",
        lastName: "Pérez",
        identification: "1723456789",
        phoneNumber: "0991234567",
        email: "juan.perez@email.com"
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
                    onChange={(e) => setSelectedId(e.target.value)}
                >
                    {mascotas.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
                <Button variant="primary" text="Nueva Mascota" fullWidth={false} />
            </div>

            {/* Información de la mascota */}
            <div className="grid grid-cols-2 gap-4">
                <Input readOnly name="" label="Nombre" value={selectedMascota?.name || ""} />
                <Input readOnly name="" label="Especie" value={selectedMascota?.species || ""} />
                <Input readOnly name="" label="Raza" value={selectedMascota?.breed || ""} />
                <Input readOnly name="" label="Edad" value={selectedMascota?.age || ""} />
                <Input readOnly name="" label="Sexo" value={selectedMascota?.sex || ""} />
            </div>

            {/* Información del propietario */}
            <div className="mb-6">
                <div className="p-2 border-t border-gray-200"></div>
                <p className="text-sm text-primary mt-1">
                    Información del propietario.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input readOnly name="" label="Nombres del Propietario" value={propietarioMock.name} />
                <Input readOnly name="" label="Apellidos del Propietario" value={propietarioMock.lastName} />
                <Input readOnly name="" label="Cédula/RUC" value={propietarioMock.identification} />
                <Input readOnly name="" label="Teléfono" value={propietarioMock.phoneNumber} />
                <Input readOnly name="" label="Correo electrónico" value={propietarioMock.email} />
            </div>
        </section>
    );
}
