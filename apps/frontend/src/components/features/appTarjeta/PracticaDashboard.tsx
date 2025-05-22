import { useState, useEffect, useRef } from "react";
import SelectorCategoria from "./SelectorCategoria";
import TarjetaInteractiva from "./TarjetaPractica";
import Card from "../../UI/Card";
import NavegationBar from "./SesionProgresion";
import SesionResultado from "./SesionResultado";
import { useTarjetasByUserIdtest, useEnviarRespuestasTest } from "../../../hooks/useTarjetaTest";

interface UsuarioPalabraRespuesta {
  wordId: number;
  correct: boolean;
  answeredAt: string;
}

const PracticaDashboard: React.FC = () => {
  const [indexActual, setIndexActual] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [userResponses, setUserResponses] = useState<UsuarioPalabraRespuesta[]>([]);
  const [empezado, setEmpezado] = useState(false);
  const { tarjetas, loading, error } = useTarjetasByUserIdtest(1, empezado);
  const { enviar, loading: enviando, error: errorEnvio, success } = useEnviarRespuestasTest();

  const respuestasFinales = useRef<UsuarioPalabraRespuesta[]>([]);
  const enviado = useRef(false);

  useEffect(() => {
    if (terminado && !enviado.current) {
      enviado.current = true; 
      enviar(respuestasFinales.current);
    }
  }, [terminado, enviar]);

  const handleAnswer = (correct: boolean) => {
    const respuesta: UsuarioPalabraRespuesta = {
      wordId: tarjetas[indexActual].id,
      correct,
      answeredAt: new Date().toISOString(),
    };
    setUserResponses((prev) => [...prev, respuesta]);
  };

  const handleNextCard = () => {
    if (indexActual < tarjetas.length - 1) {
      setIndexActual((prev) => prev + 1);
    } else {
      respuestasFinales.current = userResponses;
      setTerminado(true);
      console.log(userResponses);
    }
  };

  const estado = tarjetas.map((palabra) => {
    const respuesta = userResponses.find((r) => r.wordId === palabra.id);
    if (!respuesta) return "pending";
    return respuesta.correct ? "correct" : "incorrect";
  });

  return (
    <section className="flex-1 bg-orange-50 p-12 rounded-lg shadow-md pb-6 min-h-screen ml-64">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Práctica Interactiva
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 mb-6">
        <Card titulo="Tarjeta" mensaje="Memoriza con tarjetas de vocabulario" color="orange" />
        <Card titulo="Escritura" mensaje="Practica escribiendo palabras" color="blue" />
        <Card titulo="Interactivo" mensaje="Aprende con tarjetas interactivas" color="green" />
        <Card titulo="Tarjeta" mensaje="Memoriza con tarjetas de vocabulario" color="purple" />
      </div>

      <SelectorCategoria />

      {!empezado ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-lg text-gray-700 mb-4">
            Pulsa el botón para comenzar la práctica
          </p>
          <button
            className="w-20 h-20 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-transform duration-300 hover:scale-110 text-lg font-semibold"
            onClick={() => setEmpezado(true)}
          >
            ▶
          </button>
        </div>
      ) : loading ? (
        <div>Cargando tarjetas...</div>
      ) : error ? (
        <div>Error al cargar tarjetas: {error}</div>
      ) : !terminado && tarjetas.length > 0 ? (
        <TarjetaInteractiva
          tarjeta={tarjetas[indexActual]}
          index={indexActual}
          total={tarjetas.length}
          onAnswer={handleAnswer}
          onNextCard={handleNextCard}
        />
      ) : (
        <div className="flex flex-col bg-white text-center justify-center my-16 border-2 border-orange-600 rounded-xl h-140 gap-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-orange-600">
            ¡Has terminado la práctica! 🎉
          </h2>
        </div>
      )}
      {terminado && enviando && <div>Enviando respuestas...</div>}
      {terminado && success && <div>¡Respuestas enviadas correctamente!</div>}
      {terminado && errorEnvio && <div>Error al enviar respuestas: {errorEnvio}</div>}
      {empezado && (
        <>
          <NavegationBar wordStatus={estado} />
          <SesionResultado respuestas={userResponses} />
        </>
      )}
    </section>
  );
};

export default PracticaDashboard;