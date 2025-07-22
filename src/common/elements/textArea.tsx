import type { FieldError } from "react-hook-form";

interface TextAreaProps {
    label: string;
    name: string;
    register?: any;
    error?: FieldError;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    value?: string;
}

export default function TextArea({
    label,
    name,
    register,
    error,
    placeholder,
    value = "",
    onChange,
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
                {...(value ? { value } : {})}
                {...(placeholder ? { placeholder } : {})}
                {...(register ? register(name) : {})}
                {...rest}
                onChange={onChange}
                className="p-3 rounded-md border border-primary-dark/30 bg-neutral-gray010 text-primary-dark resize-y min-h-[120px]"
            />
        </div>
    );
}
