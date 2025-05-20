import React from "react";

interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showLink?: boolean;
    linkText?: string;
    linkHref?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({label, type="text", placeholder="", value, onChange, showLink=false, linkText = "Olvidaste tu contraseña", linkHref ="#", error}) => {
    return (
        <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 mb-2">{label}</label> {showLink && (
                    <a href={linkHref} className="text-sm text-orange-500 hover:underline">
                        {linkText}
                    </a>
                )}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full mt-1 p-2 border ${ error ? "border-red-500" : "border-gray-300" } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );

}

export default Input;