import { useEffect, useState, type JSX } from "react";
import Logo from "../elements/logo";

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
    /*************************
     ****** FUNCIONES ********
     *************************/

    /*************************
     ********* JSX ***********
     *************************/
    return (
        <>
            {/* Header Desktop */}
            <header className="hidden md:flex items-center bg-secondary fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-2 py-3 flex items-center">
                    <Logo
                        fill="icon-secondary-light"
                        textColor="text-on-secondary"
                        href="/historias"
                    />

                    <div className="h-13 border-l border-on-secondary-light mx-4 opacity-40"></div>

                    <nav>
                        <ul className="flex space-x-8">
                            {["historias", "mascotas", "miUsuario", "citas"].map((section) => (
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
            </header>

            {/* Header Mobile */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-center p-4">
                    <div className="bg-secondary text-on-secondary w-full max-w-[90%] px-4 py-2 rounded-full shadow-lg">
                        <div className="w-full">
                            <Logo
                                fill="icon-secondary-light"
                                textColor="text-on-secondary"
                                href="/historias"
                            />
                        </div>

                        <div className="flex flex-col justify-between items-center mt-1">
                            <nav className="flex flex-row gap-4">
                                {["historias", "mascotas", "miUsuario"].map((section) => (
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