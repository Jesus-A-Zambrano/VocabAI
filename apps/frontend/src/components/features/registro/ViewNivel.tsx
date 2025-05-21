
interface ViewCuentaProps {
    level: "" | "Principiante" | "Intermedio" | "Avanzado";
    setLevel: React.Dispatch<React.SetStateAction<"" | "Principiante" | "Intermedio" | "Avanzado">>;
}

const ViewNivel: React.FC<ViewCuentaProps> = ({level, setLevel}) => {
    return (
        <div className="space-y-3">
            {["Principiante", "Intermedio", "Avanzado"].map((option) => (
                <div
                    key={option}
                    className={`border rounded-md p-3 cursor-pointer flex items-center gap-2 ${
                        level === option ? "border-orange-500" : "border-orange-200"
                    }`}
                    onClick={() => setLevel(option as typeof level)}
                    >
                    <div className="text-orange-500">{option === "Principiante" ? "⭐" : option === "Intermedio" ? "✔️" : "⚡"}</div>
                    <div>
                        <div className="font-medium">{option}</div>
                        <div className="text-sm text-gray-500">
                        {option === "Principiante" && "Vocabulario básico y frases simples"}
                        {option === "Intermedio" && "Conversaciones y gramática avanzada"}
                        {option === "Avanzado" && "Expresiones idiomáticas y fluidez"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewNivel