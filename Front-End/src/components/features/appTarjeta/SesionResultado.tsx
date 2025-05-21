import Card from "../../UI/Card"

const SesionResultado: React.FC = () => {
    return (
        <div className="flex justify-center gap-24 mt-12">
        <Card
        color="orange"
        titulo="Respuestas Correctas"
        mensaje="2"
        >
        </Card>
        <Card
        color="orange"
        titulo="Respuestas Incorrectas"
        mensaje="2"
        >
        </Card>


        </div>
    )
}

export default SesionResultado