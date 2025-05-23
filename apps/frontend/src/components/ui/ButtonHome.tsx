import type { ReactNode } from "react";
import { cn } from "clsx-for-tailwind";

interface Props {
  secundario?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
const ButtonHome: React.FC<Props> = ({
  secundario = false,
  children,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded font-bold",
        "transition-all",
        "hover:shadow-md hover:scale-105",
        {
          "bg-orange-200 text-orange-600": !secundario,
          "bg-orange-500 text-white": secundario,
        },
      )}
    >
      {children}
    </button>
  );
};

export default ButtonHome;
