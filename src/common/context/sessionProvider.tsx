import {
    createContext,
    useContext,
    useState,
    useEffect,
    type JSX
} from "react";
import type { SessionData } from "../interfaces/session";

/**
 * Propiedades de la sesión del usuario.
 * Incluye el nombre de usuario y la clínica asociada.
 */
interface SessionContextProps {
    session: SessionData;
    updateSession: (data: Partial<SessionData>) => void;
    clearSession: () => void;
}

/**
 * Valor por defecto para la sesión del usuario.
 * Este valor se utiliza cuando no hay sesión activa.
 */
const defaultSession: SessionData = {
    username: "nombre_usuario",
    clinic: "veterinaria"
};

/**
 * Contexto para la sesión del usuario.
 * Proporciona acceso a los datos de la sesión y funciones para actualizarla.
 */
const SessionContext = createContext<SessionContextProps | undefined>(undefined);

/**
 * Proveedor de contexto para la sesión del usuario.
 */
export function SessionProvider(
    {
        children
    }: { children: JSX.Element }
): JSX.Element {
    const [session, setSession] = useState<SessionData>(() => {
        const saved = localStorage.getItem("session");
        return saved ? JSON.parse(saved) : defaultSession;
    });

    useEffect(() => {
        localStorage.setItem("session", JSON.stringify(session));
    }, [session]);

    const updateSession = (data: Partial<SessionData>) => {
        setSession((prev) => ({ ...prev, ...data }));
    };

    const clearSession = () => {
        setSession(defaultSession);
        localStorage.removeItem("session");
    };

    return (
        <SessionContext.Provider value={{ session, updateSession, clearSession }}>
            {children}
        </SessionContext.Provider>
    );
}

/**
 * Hook para el acceso a la informacion de la sesión
 */
export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession debe usarse dentro de un <SessionProvider>");
    }
    return context;
}
