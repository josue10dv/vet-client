import type { JSX } from "react";

/**
 * Componente de sección Hero para la página principal de 4Pets.
 * Muestra un título, una descripción y botones de acción para agendar una demostración o conocer los servicios.
 * @returns {JSX.Element} Componente de sección Hero que muestra el título, descripción y botones de acción.
 */
export default function HeroSection(): JSX.Element {
    return (
        <section className="bg-tertiary no-hover py-16 px-6">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Bienvenidos a 4Pets
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Tu software veterinario de confianza. Brindamos atención integral para tus mascotas con amor y profesionalismo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="btn-primary px-8 py-3 rounded-lg font-semibold transition-smooth"
                        onClick={() => window.location.href = "#contactUs"}
                    >
                        Agendar Demostración
                    </button>
                    <button
                        className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-smooth"
                        onClick={() => window.location.href = "#services"}
                    >
                        Conocer Servicios
                    </button>
                </div>
            </div>
        </section>
    );
};