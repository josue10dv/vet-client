import type { JSX } from "react";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";
import Select from "../../common/elements/selector";

export default function UserForm(): JSX.Element {
    return (
        <div className="flex-1 bg-neutral-light text-primary-dark p-6 rounded-xl shadow-md">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Formulario de Usuarios</h2>
            </div>
            <form className="space-y-4">
                <Input
                    label="Nombre y Apellido"
                    name="name"
                    type="text"
                    placeholder="Ingrese nombre y apellido"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Nombre de Usuario"
                    name="username"
                    type="text"
                    placeholder="Ingrese el nombre de usuario"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <Input
                    label="Correo"
                    name="email"
                    type="text"
                    placeholder="Ingrese el correo electrónico"
                    register={() => { }}
                    inputClassName="input input-primary"
                />

                <Select
                    label="Rol"
                    name="role"
                    options={[
                        { value: "user", label: "Usuario" },
                        { value: "admin", label: "Administrador" },
                    ]}
                    register={() => { }}
                    selectClassName="input input-primary"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        text="Guardar"
                        variant="success"
                        fullWidth={false}
                        type="submit"
                    />
                    <Button
                        text="Limpiar"
                        variant="primary"
                        fullWidth={false}
                        type="reset"
                    />
                </div>
            </form>
        </div>
    );
}