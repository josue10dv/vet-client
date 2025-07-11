import type { JSX } from "react";

/**
 * Pie de página del sitio web.
 * Muestra el año actual y un mensaje de derechos reservados.
 * @returns {JSX.Element} Componente de pie de página.
 */
export default function Footer(): JSX.Element {
    return (
        <footer className="bg-primary py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} 4Pets. Todos los derechos reservados. </p>
            </div>
        </footer>
    );
}