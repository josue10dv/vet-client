import { useState, type JSX } from "react";
import Logo from "../elements/logo";
import MenuIcon from "../../assets/icons/menu.svg?react";

/**
 * Componente de encabezado para la sección de administración.
 * Este componente incluye un logo y enlaces de navegación para las secciones de "Veterinarias" y "Usuarios".
 * @returns {JSX.Element} Componente de encabezado para la sección de administración.
 */
export default function HeaderAdmin(): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para la sección activa y el menú móvil
    const [activeSection, setActiveSection] = useState<string>('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    /*************************
     ****** FUNCIONES ********
     *************************/
    // Controla la visibilidad del menú móvil
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    /*************************
     ********* JSX ***********
     *************************/
    return (
        <header className="bg-tertiary fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-2 py-3 flex items-center">
                {/* Logo */}
                <Logo
                    fill="icon-tertiary-light"
                    textColor="text-on-tertiary"
                    href="/admin/dashboard"
                />

                {/* Línea divisoria */}
                <div className="h-13 border-l border-on-tertiary-light mx-4 opacity-40"></div>

                {/* Navegación */}
                <nav className="hidden md:flex items-center">
                    <ul className="flex space-x-8">
                        <li>
                            <a
                                href="/admin/dashboard"
                                className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === "dashboard" ? "active" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection("dashboard");
                                }}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/veterinarias"
                                className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === "veterinarias" ? "active" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection("veterinarias");
                                }}
                            >
                                Veterinarias
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/usuarios"
                                className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === "usuarios" ? "active" : ""
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection("usuarios");
                                }}
                            >
                                Usuarios
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Botón hamburguesa (solo visible en móvil) */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden ml-4 text-current hover:opacity-80 transition-opacity duration-200 focus:outline-none"
                    aria-label="Abrir menú"
                >
                    <MenuIcon className="w-6 h-6 icon-primary" />
                </button>
            </div>
        </header>
    );
}