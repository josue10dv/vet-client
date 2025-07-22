import { useEffect, useState, useRef, type JSX } from "react";
import Logo from "../elements/logo";
import { useSession } from "../context/sessionProvider";

/**
 * Componente de encabezado para la sección de gestion veterinaria.
 * Este componente incluye un logo y enlaces de navegación para las secciones de "Mascotas" e "Historias".
 * @returns {JSX.Element} Componente de encabezado para la sección de gestion veterinaria.
 */
export default function HeaderUser(): JSX.Element {
    /*************************
     ******** HOOKS **********
     *************************/
    // Estado para la sección activa y el menú móvil
    const [activeSection, setActiveSection] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Lee la url para activar el nav correcto
    useEffect(() => {
        const path = window.location.pathname;

        if (path.includes("mascotas")) {
            setActiveSection("mascotas");
        } else if (path.includes("miUsuario")) {
            setActiveSection("miUsuario");
        } else if (path.includes("citas")) {
            setActiveSection("citas");
        } else {
            setActiveSection("historias");
        }
    }, []);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    /*************************
     ******** UTILS **********
     *************************/
    // Session activa
    const { session } = useSession();

    // Función para alternar el menú desplegable
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    /*************************
     ********* JSX ***********
     *************************/
    return (
        <>
            {/* Header Desktop */}
            <header className="hidden md:flex items-center bg-secondary fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-2 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <Logo
                            fill="icon-secondary-light"
                            textColor="text-on-secondary"
                            href="/historias"
                        />

                        <div className="h-13 border-l border-on-secondary-light mx-4 opacity-40"></div>

                        <nav>
                            <ul className="flex space-x-8">
                                {["historias", "mascotas", "citas", "miUsuario"].map((section) => (
                                    <li key={section}>
                                        <a
                                            href={`/${section === "historias" ? "historias" : section}`}
                                            className={`nav-link text-current transition-opacity duration-200 font-medium ${activeSection === section ? "active" : ""
                                                }`}
                                        >
                                            {section.charAt(0).toUpperCase() + section.slice(1)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Nombre de la veterinaria */}
                    <div className="flex items-center">
                        <div className="text-on-secondary font-medium text-right">
                            <div>
                                <span className="text-sm opacity-80">Veterinaria:</span>
                                <span className="ml-2 font-semibold">{session?.veterinaryName || 'Veterinaria'}</span>
                            </div>
                            <div>
                                <span className="text-sm opacity-80">User:</span>
                                <span className="ml-2 font-semibold">{session?.username || 'Usuario'}</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            {
                                session?.userType == "admin"
                                    ? (
                                        <>
                                            <button
                                                className="bg-gradient-to-r from-[#38322E] to-[#A3978F] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg hover:from-[#38322E] hover:to-[#38322E] transform hover:scale-105 transition-all duration-200 ease-in-out flex items-center gap-2"
                                                onClick={() => {
                                                    window.location.href = "/admin/dashboard";
                                                }}
                                            >
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                </svg>
                                                Dashboard Admin
                                            </button>
                                        </>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </header>

            {/* Header Mobile */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-center p-4">
                    <div
                        ref={dropdownRef}
                        className="bg-secondary text-on-secondary w-full max-w-[90%] px-4 py-2 rounded-full shadow-lg relative"
                    >
                        <div className="flex justify-center items-center gap-2 mb-1">
                            <Logo
                                fill="icon-secondary-light"
                                textColor="text-on-secondary"
                                href="/historias"
                            />
                            {/* Botón del menú de información */}
                            <button
                                onClick={toggleDropdown}
                                className="text-on-secondary text-xs font-medium flex items-center gap-1 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <svg className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Menú desplegable */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-gray-800 z-50">
                                <div className="space-y-2">
                                    <div className="pb-2 border-b border-gray-100">
                                        <div className="text-xs text-gray-500">Veterinaria</div>
                                        <div className="font-semibold text-sm">{session?.veterinaryName || 'Veterinaria'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Usuario</div>
                                        <div
                                            className="font-semibold text-sm underline cursor-pointer hover:text-blue-600 transition-colors"
                                            onClick={() => {
                                                window.location.href = "/miUsuario";
                                            }}
                                        >
                                            {session?.username || 'Usuario'}
                                        </div>
                                    </div>
                                    {
                                        session?.userType == "admin"
                                            ? (
                                                <>
                                                    <div className="pt-2 border-t border-gray-100">
                                                        <button
                                                            className="w-full bg-gradient-to-r from-[#38322E] to-[#A3978F] text-white text-xs font-medium px-3 py-2 rounded-lg shadow-md hover:from-[#38322E] hover:to-[#38322E] transform hover:scale-[0.98] transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
                                                            onClick={() => {
                                                                window.location.href = "/admin/dashboard";
                                                            }}
                                                        >
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                            </svg>
                                                            Dashboard Admin
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col justify-between items-center mt-1">
                            <nav className="flex flex-row gap-4">
                                {["historias", "mascotas", "citas"].map((section) => (
                                    <a
                                        key={section}
                                        href={`/${section === "historias" ? "historias" : section}`}
                                        className={`nav-link-mobile text-current text-sm transition-opacity duration-200 font-medium ${activeSection === section ? "active" : ""
                                            }`}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}