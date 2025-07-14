import type { JSX } from "react";

/**
 * Componente de sección de servicios para la página principal del software 4Pets.
 * Muestra los servicios ofrecidos por el software, incluyendo pacientes, historias clínicas y citas.
 * @returns {JSX.Element} Componente de sección de servicios que muestra los servicios ofrecidos por el software 4Pets.
 */
export default function ServiceSection(): JSX.Element {
    const services = [
        {
            titulo: "PACIENTES",
            texto: "Gestiona la información de tus pacientes de forma rápida y sencilla.",
            bg: new URL("../../assets/images/paciente.jpg", import.meta.url).href,
            class: 'bg-primary-dark'
        },
        {
            titulo: "HISTORIAS",
            texto: "Accede a las historias clínicas de tus pacientes con un solo clic.",
            bg: new URL("../../assets/images/historia.jpg", import.meta.url).href,
            class: 'bg-secondary-dark'
        },
        {
            titulo: "CITAS",
            texto: "Organiza tus citas y mantén un control eficiente de tu agenda.",
            bg: new URL("../../assets/images/cita.jpg", import.meta.url).href,
            class: 'bg-tertiary-dark'
        },
    ];
    return (
        <section id="services" >
            <div className="w-full">
                <div className="text-center p-8 text-primary-light">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3">
                {services.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-[500px] bg-cover bg-center flex items-end text-white"
                        style={{ backgroundImage: `url(${item.bg})` }}
                    >
                        {/* Overlay semitransparente */}
                        <div className="absolute inset-0 bg-black/50 z-0" />

                        {/* Título vertical */}
                        <div className="absolute top-0 left-0 p-4 z-10">
                            <h2 className="text-4xl font-bold rotate-180 writing-vertical">
                                {item.titulo}
                            </h2>
                        </div>

                        {/* Texto inferior */}
                        <div className={`relative z-10 p-6 text-sm font-medium ${item.class} text-center`}>
                            {item.texto}
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
};