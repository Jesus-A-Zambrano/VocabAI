import React from 'react';

type WordStatus = 'correct' | 'incorrect' | 'in-progress' | 'pending';

interface SesionProgresionProps {
    wordStatus: WordStatus[]; 
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

const SesionProgresion: React.FC<SesionProgresionProps> = ({ wordStatus }) => {

    const completedCount = wordStatus.filter(
        (status) => status === 'correct' || status === 'incorrect'
    ).length;
    const progressPercent = (completedCount / wordStatus.length) * 100;

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

        <div className="flex justify-center  gap-8 text-center grap flex-wrap">
            {wordStatus.map((status, index) => (
            <div
                key={index}
                className={`rounded-md py-2 font-semibold w-20 ${getColor(status)}`}
            >
                {index + 1}
            </div>
            ))}
        </div>

        <div className="text-right mt-2 font-medium text-orange-500">
            {completedCount}/{wordStatus.length}
        </div>
        </div>
    );
    };

export default SesionProgresion;
