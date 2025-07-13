import { useState, type JSX } from "react";
import Logo from "../elements/logo";

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
    /*************************
     ****** FUNCIONES ********
     *************************/

    /*************************
     ********* JSX ***********
     *************************/
    return (
        <>
            <header className="hidden md:flex items-center bg-tertiary fixed top-0 left-0 w-full z-50">
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
                    <nav>
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
                </div>
            </header>
            <header className="md:hidden fixed top-0 left-0 right-0 z-50">
                {/* Menú móvil redondeado centrado */}
                <div className="flex justify-center p-4">
                    <div className="bg-tertiary text-on-tertiary w-full max-w-[90%] px-4 py-2 rounded-full shadow-lg">

                        {/* Logo centrado */}
                        <div className="w-full">
                            <Logo
                                fill="icon-tertiary-light"
                                textColor="text-on-tertiary"
                                href="/admin/dashboard"
                            />
                        </div>

                        {/* Navegación */}
                        <div className="flex flex-col justify-between items-center mt-1">
                            <nav className="flex flex-row gap-4">
                                <a
                                    href="/admin/mascotas"
                                    className={`nav-link-mobile text-current text-sm transition-opacity duration-200 font-medium ${activeSection === 'mascotas' ? 'active' : ''}`}
                                >
                                    Mascotas
                                </a>
                                <a
                                    href="/admin/historias"
                                    className={`nav-link-mobile text-current text-sm transition-opacity duration-200 font-medium ${activeSection === 'historias' ? 'active' : ''}`}
                                >
                                    Historias
                                </a>
                                <a
                                    href="/admin/usuarios"
                                    className={`nav-link-mobile text-current text-sm transition-opacity duration-200 font-medium ${activeSection === 'usuarios' ? 'active' : ''}`}
                                >
                                    Usuarios
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}