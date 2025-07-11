import type { JSX } from "react";
import ServiceSection from "../../components/home/serviceSection";
import AboutUsSection from "../../components/home/aboutUsSection";
import ContactUsSection from "../../components/home/contactUsSection";
import HeroSection from "../../components/home/heroSection";

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
