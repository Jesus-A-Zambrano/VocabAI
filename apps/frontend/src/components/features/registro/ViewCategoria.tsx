import React from 'react';

interface ViewCategoriaProps {
    selectedInterests: string[];
    setSelectedInterests: React.Dispatch<React.SetStateAction<string[]>>;
}

const interests = [
    "Viajes", "Negocios", "Tecnología", "Cocina",
    "Arte y Cultura", "Deportes", "Ciencia", "Salud",
    "Música", "Naturaleza"
];

const ViewCategoria: React.FC<ViewCategoriaProps> = ({ selectedInterests, setSelectedInterests }) => {
    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
        prev.includes(interest)
            ? prev.filter((item) => item !== interest)
            : [...prev, interest]
        );
    };

    return (
        <>
        <label className="block text-sm font-medium mb-1">¿Qué temas te interesan?</label>
        <p className="text-sm text-gray-500 mb-2">Selecciona al menos 3 categorías</p>
        <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
            <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                selectedInterests.includes(interest)
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white border-orange-200 text-gray-700"
                }`}
            >
                {interest}
            </button>
            ))}
        </div>
        </>
    );
};

export default ViewCategoria;
