import { createContext, useContext, useState } from "react";

/**
 * Propiedades del contexto de carga.
 * - `isLoading`: Indica si la aplicación está en estado de carga.
 * - `showLoading`: Función para activar el estado de carga.
 * - `hideLoading`: Función para desactivar el estado de carga.
 */
interface LoadingContextProps {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

/**
 * Contexto de carga que proporciona el estado de carga y funciones para manejarlo.
 * Este contexto se utiliza para mostrar u ocultar pantallas de carga en la aplicación.
 */
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

/**
 * Componente proveedor de contexto de carga.
 * Este componente envuelve la aplicación y proporciona el estado de carga y las funciones para manejarlo
 * @param {Object} children - Los componentes hijos que se renderizarán dentro del proveedor de contexto de carga.
 * @returns {JSX.Element} Componente proveedor de contexto de carga.
 */
export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

/**
 * Hook para acceder al contexto de carga.
 * @returns {LoadingContextProps} El contexto de carga que contiene el estado de carga y las funciones para manejarlo.
 * @throws {Error} Si el hook se usa fuera del proveedor de contexto de carga.
 */
export const useLoading = (): LoadingContextProps => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
