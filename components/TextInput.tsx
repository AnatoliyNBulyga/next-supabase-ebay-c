"use client"

type TextInputProps = {
    string: string;
    placeholder: string;
    error: string;
    onUpdate: (value: string) => void;
    className: string;
}
export default function TextInput({ string, placeholder, error, onUpdate, className }: TextInputProps) {

    return (
        <>
            <input
                placeholder={placeholder}
                className={`
                    w-full
                    bg-white
                    text-gray-800
                    border
                    text-sm
                    border-[#272727]
                    p-3
                    placeholder-gray-500
                    focus:outline-none
                    ${className}
                `}
                value={string || ''}
                onChange={(event) => onUpdate(event.target.value)}
                type="text"
                autoComplete="off"
            />

            {
                error && (
                    <div className="text-red-500 text-[14px] font-semibold">
                        {error}
                    </div>
                )
            }
        </>
    )
}