import React, { useState } from "react";
import ViewCuenta from "../../features/registro/ViewCuenta";
import ViewNivel from "../../features/registro/ViewNivel"
import ViewCategoria from "../../features/registro/ViewCategoria";
import Button from "../../UI/Button";

const steps = [
"Información personal",
"Nivel de aprendizaje",
"Temas de interés",
];

const RegistroLayout: React.FC = () => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState<"Principiante" | "Intermedio" | "Avanzado" | "">("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 2) return;
    console.log({ name, email, password, level, selectedInterests });
};

return (

        <div className="bg-white rounded-xl shadow-md w-full max-w-lg">
            <div className="bg-gradient-to-b from-orange-500 to-orange-400 rounded-t-xl p-6 text-center">
                <div className="text-white text-3xl mb-2">📖</div>
                <h1 className="text-white text-xl font-bold">Voca<span className="text-black">IA</span></h1>
                <p className="text-white text-sm">Mejora tu vocabulario de forma divertida</p>
            </div>
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-center">{step < 2 ? "Crea tu cuenta" : "Personaliza tu experiencia de aprendizaje"}</h2>
                <div className="flex justify-center gap-2">
                    {steps.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-orange-500" : "bg-orange-300"}`} />
                    ))}
                </div>
                {step === 0 && (
                    <ViewCuenta
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    />
                )}

                {step === 1 && (
                    <ViewNivel
                    level={level}
                    setLevel={setLevel}
                    />
                )}

                {step === 2 && (
                    <ViewCategoria 
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                    />
                )}

                <div className="flex justify-between">
                    {step > 0 && (
                    <Button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        className="px-4 py-2 border rounded-md text-gray-700 hover:bg-orange-100 border-orange-200"

                        >
                        Atrás
                    </Button>
                    )}
                    {step < 2 ? (
                        <>

                        <Button
                        type="button"
                        onClick={() => setStep((prev) => prev + 1)}
                        className="ml-auto px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            
                            Continuar
                        </Button>
                        
                        </>
                    ) : (
                        <Button
                        type="submit"
                        disabled={selectedInterests.length < 3}
                        className={`ml-auto px-4 py-2 rounded-md text-white ${
                        selectedInterests.length < 3
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                        >
                            Completar registro 
                        </Button>
                    )}
                </div>

                <p className="text-center text-sm text-gray-700">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-orange-500 font-semibold hover:underline">
                    Inicia sesión
                    </a>
                </p>
            </form>
        </div>

);
};

export default RegistroLayout;
