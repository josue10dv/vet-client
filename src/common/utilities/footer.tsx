import type { JSX } from "react";

interface FooterProps {
    variant?: 'bg-white' | 'bg-primary' | 'bg-primary-container' | 'bg-primary-light' |
    'bg-primary-medium' | 'bg-primary-dark' | 'bg-secondary' | 'bg-secondary-container' |
    'bg-secondary-light' | 'bg-secondary-medium' | 'bg-secondary-dark' | 'bg-tertiary' |
    'bg-tertiary-container' | 'bg-tertiary-light' | 'bg-tertiary-medium' | 'bg-tertiary-dark' |
    'bg-error' | 'bg-error-container' | 'bg-error-light' | 'bg-error-medium' | 'bg-error-dark' |
    'bg-success' | 'bg-success-container' | 'bg-success-light' | 'bg-success-medium' |
    'bg-success-dark' | 'bg-neutral-light' | 'bg-neutral-medium' | 'bg-neutral-dark'
};

/**
 * Pie de página del sitio web.
 * Muestra el año actual y un mensaje de derechos reservados.
 * @returns {JSX.Element} Componente de pie de página.
 */
export default function Footer(
    { variant = 'bg-primary' }: FooterProps
): JSX.Element {
    return (
        <footer className={`${variant} py-4`}>
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} 4Pets. Todos los derechos reservados. </p>
            </div>
        </footer>
    );
}