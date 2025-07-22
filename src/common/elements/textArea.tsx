import type { FieldError } from "react-hook-form";

interface TextAreaProps {
    label: string;
    name: string;
    register?: any;
    error?: FieldError;
}

export default function TextArea({
    label,
    name,
    register,
    error,
    ...rest
}: TextAreaProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-primary-dark">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                {...(register ? register(name) : {})}
                {...rest}
                className="p-3 rounded-md border border-primary-dark/30 bg-neutral-gray010 text-primary-dark resize-y min-h-[120px]"
            />
        </div>
    );
}
