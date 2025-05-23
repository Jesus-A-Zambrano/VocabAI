import React, { useState } from 'react';
import Input from "../../ui/input";
import type { Tarjeta } from "../../../model/TarjetaModel";

interface TarjetaInteractivaProps {
    tarjeta: Tarjeta;
    total: number;
    index: number;
    onAnswer: (correct: boolean) => void;
    onNextCard: () => void;
}

const TarjetaInteractiva: React.FC<TarjetaInteractivaProps> = ({ 
    tarjeta, 
    total, 
    index, 
    onAnswer,
    onNextCard 
}) => {
    const [respuesta, setRespuesta] = useState('');
    const [estado, setEstado] = useState<'pendiente' | 'correcto' | 'incorrecto'>('pendiente');
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    const verificarRespuesta = () => {
        const esCorrecto = respuesta.trim().toLowerCase() === tarjeta.word.toLowerCase();
        setEstado(esCorrecto ? 'correcto' : 'incorrecto');
        setMostrarRespuesta(true);
        onAnswer(esCorrecto);
    };

    const siguienteTarjeta = () => {
        setRespuesta('');
        setEstado('pendiente');
        setMostrarRespuesta(false);
        onNextCard();
    };

    return (
        <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded p-6 flex flex-col text-center h-140">
            <div className="flex justify-end">
                <span className="text-sm text-gray-500">Tarjeta {index + 1} de {total}</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-700">Tarjeta interactiva</h3>

            {!mostrarRespuesta ? (
                <div className="bg-orange-500 text-white p-6 rounded-lg shadow h-full flex justify-center flex-col">
                    <p className="text-sm uppercase">Traduce al inglés:</p>
                    <h2 className="text-3xl font-bold mb-4">{tarjeta.translation}</h2>

                    <Input
                        label='Respuesta'
                        type='text'
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                        className="bg-white w-full mt-1 p-2 border text-black"
                        colorLabel={false}
                    />

                    <button
                        onClick={verificarRespuesta}
                        className="bg-white text-orange-600 font-semibold w-full py-2 rounded mt-4"
                        disabled={respuesta.trim() === ""}
                    >
                        Verificar respuesta
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-orange-500 p-6 rounded-lg h-full flex flex-col justify-center">
                    <h4 className="text-orange-500 font-semibold text-sm">Respuesta correcta</h4>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">{tarjeta.word}</h2>

                    <div className="bg-gray-100 p-4 mt-4 rounded">
                        <p className="font-semibold text-sm text-gray-700 mb-1">Ejemplo de uso:</p>
                    </div>

                    {estado === 'incorrecto' && (
                        <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded">
                            ✘ Incorrecto. La respuesta correcta es "<strong>{tarjeta.word}</strong>"
                        </div>
                    )}

                    <button
                        onClick={siguienteTarjeta}
                        className="mt-6 bg-orange-500 text-white font-semibold py-2 rounded"
                    >
                        {index < total - 1 ? 'Siguiente tarjeta' : 'Ver resultados'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TarjetaInteractiva;