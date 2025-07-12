import axios, { AxiosError, type AxiosInstance } from "axios";
import { EnvHandler } from "./envHandler";

/**
 * Gestor de peticiones HTTP usando Axios.
 * - Agrega token JWT desde localStorage.
 * - Guarda nuevo token si el backend lo envía en el header Authorization.
 */
export class RequestHandler {
    private static instance: RequestHandler;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const env = EnvHandler.getInstance();
        this.axiosInstance = axios.create({
            baseURL: env.getBackendUrl(),
            timeout: 10000,
            withCredentials: true,
        });

        // Interceptor de petición: agrega token si existe
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Interceptor de respuesta: guarda nuevo token si llega
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const authHeader = response.headers["authorization"];
                const newToken = authHeader?.startsWith("Bearer ")
                    ? authHeader.split(" ")[1]
                    : undefined;

                if (newToken) {
                    localStorage.setItem("access_token", newToken);
                }

                return response;
            },
            (error: AxiosError<any>) => {
                if (error.response) {
                    const { status, data } = error.response;

                    switch (status) {
                        case 401:
                            console.warn("No autorizado: token inválido o expirado.");
                            break;
                        case 403:
                            console.warn("Prohibido: permisos insuficientes.");
                            break;
                        case 405:
                            console.warn("Método no permitido.");
                            break;
                        default:
                            if (data?.error || data?.message) {
                                console.error("Error del backend:", data.message || data.error);
                            }
                    }
                } else if (error.request) {
                    console.error("No se recibió respuesta del servidor:", error.request);
                } else {
                    console.error("Error en la configuración de la solicitud:", error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    /** Instancia singleton */
    public static getInstance(): RequestHandler {
        if (!RequestHandler.instance) {
            RequestHandler.instance = new RequestHandler();
        }
        return RequestHandler.instance;
    }

    /** Axios configurado */
    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

// Exporta directamente la instancia para uso global
export const axiosInstance = RequestHandler.getInstance().getAxiosInstance();
