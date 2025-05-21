import SelectorCategoria from "./SelectorCategoria"
import TarjetaPractica from "./TarjetaPractica"
import Card from "../../UI/Card"
import NavegationBar from "./SesionProgresion"
import SesionResultado from "./SesionResultado"


const PracticaDashboard: React.FC = () => {

    const estado: ('correct' | 'incorrect' | 'in-progress' | 'pending')[] = ['correct', 'pending', 'incorrect', 'in-progress',]

    return (
        <section className="flex-1 bg-orange-50 p-12 rounded-lg shadow-md pb-6 min-h-screen ml-64">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Práctica Interactiva</h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 mb-6">
                <Card
                titulo="Tarjeta"
                mensaje="Memoriza con tarjetas de vocabulario"
                color="orange"
                />
                <Card
                titulo="Escritura"
                mensaje="Practica escribiendo palabras"
                color="blue"
                />
                <Card
                titulo="Interactivo"
                mensaje="Aprende con tarjetas interactivas"
                color="green"
                />
                <Card
                titulo="Tarjeta"
                mensaje="Memoriza con tarjetas de vocabulario"
                color="purple"
                />
            </div>
            <SelectorCategoria></SelectorCategoria>
            <TarjetaPractica></TarjetaPractica> 
            <NavegationBar
            wordStatuses={estado}
            ></NavegationBar>
            <SesionResultado></SesionResultado>
        </section>

    
    )
}

export default PracticaDashboard