import ReactModal from 'react-modal';
import { type JSX } from 'react';

/**
 * Propiedades del componente MyModal.
 * - `isOpen`: Indica si el modal está abierto.
 * - `onRequestClose`: Función que se llama cuando se solicita cerrar el modal.
 * - `children`: Contenido que se mostrará dentro del modal.
 */
interface MyModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: JSX.Element;
    closeButton?: boolean;
}

ReactModal.setAppElement('#root'); // Evita advertencia de accesibilidad

/**
 * Componente de Modal personalizado que utiliza ReactModal.
 * @param {MyModalProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Componente de modal.
 */
export default function Modal(
    {
        isOpen,
        onRequestClose,
        children,
        closeButton = true
    }: MyModalProps
): JSX.Element {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="modal"
            className="relative bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg mx-4"
            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
        >
            {closeButton && (
                <button
                    onClick={onRequestClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 group"
                    aria-label="Cerrar modal"
                >
                    <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
            {children}
        </ReactModal>
    );
}
