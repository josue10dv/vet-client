import type { JSX } from "react";
import ServiceSection from "../components/serviceSection";
import AboutUsSection from "../components/aboutUsSection";
import ContactUsSection from "../components/contactUsSection";
import HeroSection from "../components/heroSection";

/**
 * Componente principal de la página Home
 * Incluye las secciones: Nosotros, Servicios y Contactos
 * @returns JSX.Element - Componente de la página Home que renderiza las secciones principales del software 4Pets.
 */
export default function Home(): JSX.Element {
    return (
        <div className="min-h-screen">
            {/* Sección Hero */}
            <HeroSection />

            {/* Sección Nosotros */}
            <AboutUsSection />

            {/* Sección Servicios */}
            <ServiceSection />

            {/* Sección Contactos */}
            <ContactUsSection />
        </div>
    );
}
