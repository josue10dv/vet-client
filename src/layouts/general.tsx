import type { JSX, ReactNode } from "react";
import PublicHeader from "../components/common/headerPublic";
import Footer from "../components/common/footer";

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
export default function GeneralLayout({ children }: GeneralLayoutProps): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <PublicHeader />

            {/* Content */}
            <main className="flex-1 pt-20 p-6 bg-gray-100">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};