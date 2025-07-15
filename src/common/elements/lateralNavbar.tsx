import type { Dispatch, JSX, SetStateAction } from "react";

interface NavbarOption {
    label: string;
    icon: JSX.Element;
}

interface NavbarProps<T = string> {
    options: NavbarOption[];
    setActiveSection: Dispatch<SetStateAction<T>>;
    activeSection: T;
}

export default function LateralNavbar<T = string>(
    {
        options,
        setActiveSection,
        activeSection
    }: NavbarProps<T>
): JSX.Element {
    return (
        <nav
            className="flex flex-col items-center gap-4 p-4 bg-primary-light rounded-full shadow-md w-24"
            role="navigation"
            aria-label="Navegación de historias clínicas"
        >
            {
                options.map((option: NavbarOption) => (
                    <button
                        key={option.label}
                        onClick={() => setActiveSection(option.label.toLowerCase() as T)}
                        className={`flex flex-col items-center justify-center rounded-full w-20 h-20 transition-all duration-200
                            ${String(activeSection) === option.label.toLowerCase()
                                ? "bg-primary text-primary-light"
                                : "bg-primary-light text-primary hover:bg-primary-dark"
                            }`}
                    >
                        {option.icon}
                        <span className="text-sm font-medium">{option.label}</span>
                    </button>
                ))
            }
        </nav>
    );
}