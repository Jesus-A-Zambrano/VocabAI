import Card from "../../ui/Card";

interface ResultadoProps {
    respuestas: {
        vocabularyId: number;
        correct: boolean;
        learnedAt: string;
    }[];
}

const SesionResultado: React.FC<ResultadoProps> = ({ respuestas }) => {
    const correctas = respuestas.filter(r => r.correct).length;
    const incorrectas = respuestas.filter(r => !r.correct).length;

    return (
        <div className="flex justify-center gap-24 mt-12">
            <Card
                color="green"
                titulo="Respuestas Correctas"
                mensaje={`${correctas}`}
            />
            <Card
                color="red"
                titulo="Respuestas Incorrectas"
                mensaje={`${incorrectas}`}
            />
        </div>
    );
};

export default SesionResultado;