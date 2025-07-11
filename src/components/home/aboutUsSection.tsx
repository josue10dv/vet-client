import type { JSX } from "react";

/**
 * Componente de sección "Sobre Nosotros" para la página principal del software 4Pets.
 * Muestra información sobre el equipo y la misión de 4Pets.
 * @returns {JSX.Element} Componente de sección "Sobre Nosotros" que muestra información sobre el equipo y la misión de 4Pets.
 */
export default function AboutUsSection(): JSX.Element {
    return (
        <section id="aboutUs" className="py-16 px-4 md:px-12 lg:px-24 bg-primary text-on-primary">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nosotros</h2>
                <p className="text-lg leading-relaxed">
                    En <strong>4Pets</strong> entendemos que cada mascota es un miembro más de la familia. Por eso, hemos desarrollado una plataforma pensada para facilitar la gestión médica de tus pacientes peludos.
                    Nuestro objetivo es brindar a clínicas veterinarias una herramienta moderna, segura y eficiente para el manejo de historias clínicas, programación de citas, y seguimiento de tratamientos.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                    Somos un equipo apasionado por la tecnología y los animales, comprometido con mejorar la experiencia de atención veterinaria mediante soluciones digitales intuitivas, adaptables y confiables.
                </p>
            </div>
        </section>
    )
};