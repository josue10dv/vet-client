import type { JSX } from "react";
import VeterinaryList from "../components/veterinaryList";
import VeterinaryForm from "../components/veterinaryForm";

export default function VeterinaryPage(): JSX.Element {
    return (
        <section className="flex flex-col md:flex-row gap-4 w-full">
            {/* Lista de Veterinarias */}
            <VeterinaryList />

            {/* Formulario */}
            <VeterinaryForm />
        </section>
    );
}
