import { useState } from 'react';

const CategoriaSelector: React.FC = () => {
    const todasLasCategorias: string[] = ['Negocios', 'Tecnología', 'Salud', 'Educación'];
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Negocios');
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [categoriasAgregadas, setCategoriasAgregadas] = useState<string[]>([]);

    const handleAgregarCategoria = (categoria: string) => {
        if (!categoriasAgregadas.includes(categoria) && categoria !== categoriaSeleccionada) {
            setCategoriasAgregadas([...categoriasAgregadas, categoria]);
        }
        setMostrarDropdown(false);
    };

    const handleEliminarCategoria = (categoria: string) => {
        setCategoriasAgregadas(categoriasAgregadas.filter(cat => cat !== categoria));
    };

    return (
        <div className="w-full bg-white shadow p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
                    <p className="text-lg font-semibold text-gray-800">Categoría seleccionada</p>
                </div>
                <div className="relative mt-2 sm:mt-0">
                    <button
                        className="text-sm text-orange-600 hover:underline"
                        onClick={() => setMostrarDropdown(!mostrarDropdown)}
                    >
                        Agregar/Eliminar categoría
                    </button>

                    {mostrarDropdown && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-44 z-10">
                            {todasLasCategorias.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategoriaSeleccionada(cat);
                                        handleAgregarCategoria(cat);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-orange-100 text-gray-700"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {categoriasAgregadas.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 font-semibold mb-2">Categorías:</p>
                    <ul className="space-y-2">
                        {categoriasAgregadas.map((cat, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-orange-50 px-3 py-2 rounded"
                            >
                                <span className='text-orange-600 font-bold '>{cat}</span>
                                <button
                                    onClick={() => handleEliminarCategoria(cat)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoriaSelector;
