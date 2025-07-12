/**
 * Recupera y maneja las variables de entorno para la aplicación.
 * Permite acceder a configuraciones específicas como la URL del backend y el modo de producción.
 */
export class EnvHandler {
    private static instance: EnvHandler;
    private env: Record<string, string>;

    private constructor() {
        this.env = import.meta.env;
    }

    /**
     * Obtiene la instancia única de EnvHandler.
     * Utiliza el patrón Singleton para asegurar que solo haya una instancia de esta clase.
     * @returns Instancia única de EnvHandler.
     */
    public static getInstance(): EnvHandler {
        if (!EnvHandler.instance) {
            EnvHandler.instance = new EnvHandler();
        }
        return EnvHandler.instance;
    }

    /**
     * Obtiene el valor de una variable de entorno por su clave.
     * @param key Clave de la variable de entorno.
     * @return Valor de la variable de entorno o undefined si no existe.
     */
    public get(key: string): string | undefined {
        return this.env[key];
    }
    /**
     * Verifica si la aplicación está en modo producción.
     * Utiliza la variable de entorno VITE_IS_PRODUCTION para determinar el estado.
     * @returns true si la aplicación está en modo producción, false en caso contrario.
     */
    public isProduction(): boolean {
        return this.env.VITE_IS_PRODUCTION === "true";
    }

    /**
     * Obtiene la URL del backend configurada en las variables de entorno.
     * Utiliza la variable de entorno VITE_FORPET_URL para obtener la URL.
     * @returns La URL del backend configurada en las variables de entorno.
     */
    public getBackendUrl(): string {
        return this.env.VITE_FORPET_URL || "";
    }
}