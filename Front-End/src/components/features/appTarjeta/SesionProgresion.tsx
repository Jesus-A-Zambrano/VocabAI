import React from 'react';

type WordStatus = 'correct' | 'incorrect' | 'in-progress' | 'pending';

interface SesionProgresionProps {
    wordStatuses: WordStatus[]; // array de 20 estados
}

const getColor = (status: WordStatus) => {
    switch (status) {
        case 'correct':
            return 'bg-green-500 text-white';
        case 'incorrect':
            return 'bg-red-500 text-white';
        case 'in-progress':
            return 'bg-orange-400 text-white';
        case 'pending':
            default:
        return 'bg-gray-200 text-gray-700';
    }
};

const SesionProgresion: React.FC<SesionProgresionProps> = ({ wordStatuses }) => {

    const completedCount = wordStatuses.filter(
        (status) => status === 'correct' || status === 'incorrect'
    ).length;
    const progressPercent = (completedCount / wordStatuses.length) * 100;

    return (
        <div className="bg-white p-6 rounded-xl w-full mt-8 border-orange-600 border-2">
        <h2 className="text-xl font-semibold mb-2">Progreso de la sesión</h2>
        <p className="text-sm text-gray-700 mb-1">Palabras completadas</p>

        <div className="w-full h-2 bg-orange-100 rounded-full mb-4">
            <div
            className="h-2 bg-orange-400 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
            />
        </div>

        <div className="grid grid-cols-10 gap-2 text-center">
            {wordStatuses.map((status, index) => (
            <div
                key={index}
                className={`rounded-md py-2 font-semibold ${getColor(status)}`}
            >
                {index + 1}
            </div>
            ))}
        </div>

        <div className="text-right mt-2 font-medium text-orange-500">
            {completedCount}/{wordStatuses.length}
        </div>
        </div>
    );
    };

export default SesionProgresion;
