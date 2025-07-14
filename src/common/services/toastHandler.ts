import { toast } from "react-toastify";

/**
 * Función para disparar notificaciones de toast.
 * Utiliza la librería react-toastify para mostrar mensajes de éxito o error.
 * @param message - El mensaje a mostrar en la notificación.
 * @param type - El tipo de notificación, puede ser "success" o "error". Por defecto es "success".
 * @returns void
 */
export function triggerToast(
    message: string,
    type: "success" | "error" = "success"
): void {
    if (type === "success") {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

}