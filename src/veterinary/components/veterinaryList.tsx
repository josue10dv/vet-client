import type { JSX } from "react";
import Button from "../../common/elements/button";
import Table from "../../common/elements/table";

/**
 * Componente que renderiza una lista de veterinarias.
 * Incluye un botón para agregar una nueva veterinaria y una tabla para mostrar las existentes.
 * @returns {JSX.Element} Componente de lista de veterinarias.
 */
export default function VeterinaryList(): JSX.Element {

    return (
        <div className="flex-1 bg-neutral-light text-primary-dark p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lista de Veterinarias</h2>
                <Button
                    text="Nuevo"
                    variant="success"
                    fullWidth={false}
                    type="button"
                />
            </div>

            <Table
                color="bg-primary-dark"
                headers={["Nombre", "Ubicación", "Teléfono"]}
                rows={[
                    {
                        id: 1,
                        cells: ["Veterinaria A", "Calle 123", "(123) 456-7890"],
                        actions: {
                            edit: () => console.log("Editar Veterinaria A"),
                            delete: () => console.log("Eliminar Veterinaria A"),
                            view: () => console.log("Ver Veterinaria A"),
                        },
                    },
                    {
                        id: 2,
                        cells: ["Veterinaria B", "Avenida 456", "(987) 654-3210"],
                        actions: {
                            edit: () => console.log("Editar Veterinaria B"),
                            delete: () => console.log("Eliminar Veterinaria B"),
                            view: () => console.log("Ver Veterinaria B"),
                        },
                    },
                ]}
                hasActions={true}
                page={1}
                pageSize={10}
                totalItems={2}
                iconFill="icon-secondary-light"
            />
        </div>
    );
}