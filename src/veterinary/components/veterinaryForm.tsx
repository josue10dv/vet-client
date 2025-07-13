import type { JSX } from "react";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";

/**
 * Componente que renderiza un formulario para agregar o editar veterinarias.
 * Incluye campos para el nombre, ubicación y teléfono de la veterinaria.
 * @returns {JSX.Element} Componente de formulario para agregar o editar veterinarias.
 */
export default function VeterinaryForm(): JSX.Element {
    return (
        <div className="flex-1 bg-neutral-light text-primary-dark p-6 rounded-xl shadow-md">
            <form className="space-y-4">
                <Input
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Ingrese el nombre de la veterinaria"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Ubicación"
                    name="location"
                    type="text"
                    placeholder="Ingrese la dirección de la veterinaria"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Teléfono"
                    name="phone"
                    type="number"
                    placeholder="Ingrese el número de teléfono"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        text="Guardar"
                        variant="success"
                        fullWidth={false}
                        type="submit"
                    />
                    <Button
                        text="Cancelar"
                        variant="error"
                        fullWidth={false}
                        type="reset"
                    />
                </div>
            </form>
        </div>
    )
}