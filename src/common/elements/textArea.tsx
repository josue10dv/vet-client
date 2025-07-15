interface TextAreaProps {
    name: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
    name,
    label,
    value,
    onChange,
    placeholder
}: TextAreaProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-primary-dark">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                className="p-3 rounded-md border border-primary-dark/30 bg-neutral-gray010 text-primary-dark resize-y min-h-[120px]"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
