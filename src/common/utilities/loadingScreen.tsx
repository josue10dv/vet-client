import type { JSX } from "react";
import Logo from "../elements/logo";
import { useLoading } from "../providers/loadingContext";

/**
 * Componente de pantalla de carga que muestra un logo animado y un mensaje de carga.
 * @returns {JSX.Element | null} Componente de pantalla de carga que muestra un logo animado y un mensaje de carga.
 */
export default function LoadingScreen(): JSX.Element | null {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-opacity">
            <Logo className="animate-bounce" size="w-24 h-24" />
            <p className="text-lg font-semibold text-primary-dark dark:text-white">Cargando...</p>
        </div>
    );
}
