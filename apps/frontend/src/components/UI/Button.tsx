import React from "react";

interface ButtonProps {
    type?: "button" | "submit";
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({type = "button", children, onClick, disabled = false, fullWidth = false, className = "",}) => {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
            ${fullWidth ? "w-full" : ""}
            px-4 py-2 rounded-md text-white font-semibold transition
            ${disabled ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
            ${className}
        `}
        >
        {children}
        </button>
    );
};

export default Button;
