import React, { useState } from 'react';
import Input from "../../UI/input"

interface Tarjeta {
    palabra: string;
    traduccion: string;
    ejemplo: string;
    ejemploTraduccion: string;
    pronunciacion: string;
    categoria: string
}

const tarjetas: Tarjeta[] = [
    {
        palabra: 'Presupuesto',
        traduccion: 'Budget',
        ejemplo: 'We need to prepare the annual budget for next year\'s projects.',
        ejemploTraduccion: 'Necesitamos preparar el presupuesto anual para los proyectos del próximo año.',
        pronunciacion: '[ˈbʌdʒɪt]',
        categoria:'Negocios'
    },
    {
        palabra: 'Presupuesto',
        traduccion: 'Budget',
        ejemplo: 'We need to prepare the annual budget for next year\'s projects.',
        ejemploTraduccion: 'Necesitamos preparar el presupuesto anual para los proyectos del próximo año.',
        pronunciacion: '[ˈbʌdʒɪt]',
        categoria:'Negocios'
    },
    {
        palabra: 'Presupuesto',
        traduccion: 'Budget',
        ejemplo: 'We need to prepare the annual budget for next year\'s projects.',
        ejemploTraduccion: 'Necesitamos preparar el presupuesto anual para los proyectos del próximo año.',
        pronunciacion: '[ˈbʌdʒɪt]',
        categoria:'Negocios'
    },
];

const TarjetaInteractiva: React.FC = () => {
    const [indice, setIndice] = useState(0);
    const [respuesta, setRespuesta] = useState('');
    const [estado, setEstado] = useState<'pendiente' | 'correcto' | 'incorrecto'>('pendiente');
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    const tarjetaActual = tarjetas[indice];

    const verificarRespuesta = () => {
        if (respuesta.trim().toLowerCase() === tarjetaActual.traduccion.toLowerCase()) {
        setEstado('correcto');
        } else {
        setEstado('incorrecto');
        }
        setMostrarRespuesta(true);
    };

    const siguienteTarjeta = () => {
        setIndice((prev) => (prev + 1) % tarjetas.length);
        setRespuesta('');
        setEstado('pendiente');
        setMostrarRespuesta(false);
    };

    return (
        <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded p-6 flex flex-col text-center h-140">
            <div className="flex justify-end ">
                <span className="text-sm text-gray-500">Tarjeta {indice + 1} de {tarjetas.length}</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-700">Tarjeta interactiva</h3>

            {!mostrarRespuesta ? (
                <div className="bg-orange-500 text-white p-6 rounded-lg shadow h-full flex justify-center flex-col">
                    <p className="text-sm uppercase">Traduce al inglés:</p>
                    <h2 className="text-3xl font-bold mb-4">{tarjetaActual.palabra}</h2>

                    <Input
                    label='Respuesta'
                    type='text'
                    value={respuesta}
                    onChange={(e)=> setRespuesta(e.target.value)}
                    className="bg-white w-full mt-1 p-2 border text-black"
                    colorLabel={false}
                    >
                    </Input>
                    

                    <button
                        onClick={verificarRespuesta}
                        className="bg-white text-orange-600 font-semibold w-full py-2 rounded"
                    >
                        Verificar respuesta
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-orange-500 p-6 rounded-lg h-full flex flex-col justify-center">
                    <h4 className="text-orange-500 font-semibold text-sm">Respuesta correcta</h4>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">{tarjetaActual.traduccion}</h2>
                    <p className="text-gray-500">{tarjetaActual.pronunciacion}</p>

                    <div className="bg-gray-100 p-4 mt-4 rounded">
                        <p className="font-semibold text-sm text-gray-700 mb-1">Ejemplo de uso:</p>
                        <p>{tarjetaActual.ejemplo}</p>
                        <p className="text-sm italic text-gray-500 mt-1">{tarjetaActual.ejemploTraduccion}</p>
                    </div>

                    <button
                        onClick={siguienteTarjeta}
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded font-semibold"
                    >
                        Siguiente tarjeta
                    </button>

                    {estado === 'incorrecto' && (
                        <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded">
                        ✘ Incorrecto. La respuesta correcta es "<strong>{tarjetaActual.traduccion}</strong>"
                        </div>
                    )}
                </div>
            )}

            {mostrarRespuesta && (
                <div className="flex justify-between mt-6">
                
                </div>
            )}
        </div>
    );
};

export default TarjetaInteractiva;

