interface LoginLayoutProps {
    children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="bg-white rounded-xl shadow-md w-full max-w-lg">
            <div className="bg-gradient-to-b from-orange-500 to-orange-400 rounded-t-xl p-6 text-center">
                <div className="text-white text-3xl mb-2">
                    <div className="text-3xl mb-1">📖</div>
                </div>
                <h1 className="text-white text-xl font-bold">Voca<span className="text-black">IA</span></h1>
                <p className="text-white text-sm">Mejora tu vocabulario de forma divertida</p>
            </div>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-center mb-4">¡Bienvenido de nuevo!</h2>
                {children}
                <div className="mt-6 text-center text-sm text-gray-500">O continúa con</div>
                <div className="mt-3 flex justify-center gap-4">
                    <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100">
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-700">
                    ¿No tienes una cuenta?{" "}
                    <a href="/registro" className="text-orange-500 font-semibold hover:underline">
                    Regístrate
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginLayout;