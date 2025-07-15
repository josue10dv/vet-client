import { useForm } from "react-hook-form";
import Input from "../../common/elements/input";
import Button from "../../common/elements/button";

interface NewEventFormProps {
    close: () => void;
}

export default function NewEventForm({ close }: NewEventFormProps) {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log("Evento registrado:", data);
        reset();
        close();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full px-2 sm:px-0"
        >
            <div className="mb-2">
                <h3 className="text-2xl font-bold text-primary-dark mb-1">
                    Registrar Nueva Cita
                </h3>
                <p className="text-sm text-primary">
                    Completa los campos para agendar una nueva cita en el calendario.
                </p>
            </div>

            {/* Título */}
            <Input
                id="title"
                label="Título"
                placeholder="Ej: Vacunación, Consulta"
                inputClassName="input input-primary"
                {...register("title", { required: true })}
            />

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    id="date"
                    label="Fecha"
                    type="date"
                    inputClassName="input input-primary"
                    {...register("date", { required: true })}
                />
                <Input
                    id="time"
                    label="Hora"
                    type="time"
                    inputClassName="input input-primary"
                    {...register("time", { required: true })}
                />
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-6">
                <Button
                    text="Cancelar"
                    type="button"
                    variant="error"
                    className="min-w-[120px]"
                    onClick={close}
                />
                <Button
                    text="Guardar"
                    type="submit"
                    variant="success"
                    className="min-w-[120px]"
                />
            </div>
        </form>
    );
}
