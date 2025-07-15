import type { JSX, ReactNode } from "react";
import Footer from "../common/utilities/footer";
import HeaderUser from "../common/utilities/headerUser";

/**
 * Props para el componente GeneralLayout.
 * @property {ReactNode} children - El contenido que se renderizará dentro del layout general.
 */
interface GeneralLayoutProps {
    children: ReactNode;
}

/**
 * Componente de layout general para la aplicación Vet App.
 * Este layout incluye un header, un footer y un área principal para el contenido.
 * @param children - El contenido que se renderizará dentro del layout general. 
 * @returns JSX.Element - El componente de layout general.
 */
export default function UserLayout({ children }: GeneralLayoutProps): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <HeaderUser />

            {/* Content */}
            <main className="flex-1 bg-gray-100 mt-27 md:mt-17 p-6">
                {children}
            </main>

            {/* Footer */}
            <Footer variant="bg-secondary-light" />
        </div>
    );
};