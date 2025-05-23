import { useUsuario } from "../../../hooks/useUsuario";


const SideBar: React.FC = () => {
    const { nombre, apellido, imagen, isLoaded, isSignedIn } = useUsuario();
    console.log({nombre, apellido, imagen, isLoaded, isSignedIn});

    return (
        <aside className="w-64 bg-white p-6 shadow-md h-screen fixed ">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">VocabIA</h1>
                
                <div className="flex items-center gap-4 mb-4">
                    {imagen ? (
                        <img src={imagen} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {nombre?.[0] ?? "U"}
                            {apellido?.[0] ?? ""}
                        </div>
                    )}
                    <div>
                        <div className="font-semibold text-gray-800">
                            {isLoaded && isSignedIn ? `${nombre ?? ""} ${apellido ?? ""}`.trim() : "Cargando..."}
                        </div>
                        <div className="text-sm text-gray-500">Nivel Intermedio</div>
                    </div>
                </div>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md">
                        Dashboard
                    </li>
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md">
                        Mis tarjetas
                    </li>
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md border-l-4 border-orange-500 bg-orange-100" >
                        Práctica diaria
                    </li>
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md">
                        Estadísticas
                    </li>
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md">
                        Configuración
                    </li>
                    <li className="flex items-center p-2 text-gray-600 hover:bg-orange-100 rounded-md">
                        Cerrar sesión
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;