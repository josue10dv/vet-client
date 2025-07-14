import type { JSX, ReactNode } from "react";
import { useEffect } from "react";

/**
 * Propiedades del componente Modal.
 * @property {boolean} isOpen - Indica si el modal está abierto.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {string} title - Título del modal.
 * @property {ReactNode} children - Contenido del modal.
 * @property {string} size - Tamaño del modal ('sm', 'md', 'lg', 'xl').
 */
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Componente Modal reutilizable.
 * @param {ModalProps} props - Propiedades del modal.
 * @returns {JSX.Element | null} El componente Modal o null si no está abierto.
 */
export default function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'md' 
}: ModalProps): JSX.Element | null {
    
    // Cerrar modal con tecla Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={`relative bg-white rounded-lg shadow-xl w-full mx-4 ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
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
                </div>
                
                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
