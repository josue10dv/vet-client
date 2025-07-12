import type { JSX } from "react";
import { useState, useEffect } from "react";
import MenuIcon from "../../assets/icons/menu.svg?react";
import Logo from "../elements/logo";

/**
 * Componente de encabezado público para la aplicación 4Pets.
 * @returns {JSX.Element} Componente de encabezado público para la aplicación 4Pets.
 */
export default function PublicHeader(): JSX.Element {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('aboutUs');

    // Función para detectar la sección activa
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -60% 0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observar las secciones después de que el DOM esté listo
        const observeSections = () => {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => observer.observe(section));
        };

        // Ejecutar inmediatamente y después de un delay para asegurar el DOM
        observeSections();
        const timeoutId = setTimeout(observeSections, 100);

        return () => {
            clearTimeout(timeoutId);
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    // Función para manejar clics en navegación
    const handleNavClick = (sectionId: string, event: React.MouseEvent) => {
        event.preventDefault();
        setActiveSection(sectionId);
        closeMobileMenu();

        // Scroll suave a la sección
        const section = document.getElementById(sectionId);
        if (section) {
            // Calcular la posición teniendo en cuenta el header fijo
            const headerHeight = 50; // Altura aproximada del header
            const sectionTop = section.offsetTop - headerHeight;

            // Scroll suave usando scrollTo
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });

            // Verificar el estado después del scroll
            setTimeout(() => {
                setActiveSection(sectionId);
            }, 300);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-primary fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Logo fill="icon-primary-light" />

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex">
                        <ul className="flex space-x-8">
                            <li>
                                <a
                                    href="#aboutUs"
                                    className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === 'aboutUs' ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick('aboutUs', e)}
                                >
                                    Nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === 'services' ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick('services', e)}
                                >
                                    Servicios
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contactUs"
                                    className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === 'contactUs' ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick('contactUs', e)}
                                >
                                    Contactos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/login"
                                    className="nav-link text-current hover:opacity-80 transition-opacity duration-200 font-medium"
                                >
                                    Iniciar sesión
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Botón hamburguesa para móvil */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-current hover:opacity-80 transition-opacity duration-200 focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        <MenuIcon className="w-6 h-6 icon-primary" />
                    </button>
                </div>

                {/* Menú móvil desplegable */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-opacity-20">
                        <nav className="flex flex-col space-y-3 mt-4">
                            <a
                                href="#aboutUs"
                                className={`nav-link-mobile text-current transition-opacity duration-200 font-medium ${activeSection === 'nosotros' ? 'active' : ''}`}
                                onClick={(e) => handleNavClick('aboutUs', e)}
                            >
                                Nosotros
                            </a>
                            <a
                                href="#services"
                                className={`nav-link-mobile text-current transition-opacity duration-200 font-medium ${activeSection === 'servicios' ? 'active' : ''}`}
                                onClick={(e) => handleNavClick('services', e)}
                            >
                                Servicios
                            </a>
                            <a
                                href="#contactUs"
                                className={`nav-link-mobile text-current transition-opacity duration-200 font-medium ${activeSection === 'contactos' ? 'active' : ''}`}
                                onClick={(e) => handleNavClick('contactUs', e)}
                            >
                                Contactos
                            </a>
                            <a
                                href="/login"
                                onClick={closeMobileMenu}
                                className="nav-link-mobile text-current transition-opacity duration-200 font-medium"
                            >
                                Iniciar sesión
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
