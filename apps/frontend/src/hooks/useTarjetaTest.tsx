import { useState, useEffect } from "react";
import type { Tarjeta } from "../model/TarjetaModel";

export function useTarjetasByUserIdtest(userId: number, enable: boolean) {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enable) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Simula una espera de 2 segundos antes de "recibir" los datos
    const timeout = setTimeout(() => {
      try {
        console.log("El hook está funcionando correctamente. userId:", userId);
        const data: Tarjeta[] = [
          {
            id: 1,
            palabra: "Prueba",
            traduccion: "Test",
            definicion: "Definición de prueba",
            categoria: ["Categoria1"],
          },
          {
            id: 2,
            palabra: "Ejemplo",
            traduccion: "Example",
            definicion: "Definición de ejemplo",
            categoria: ["Categoria2"],
          },
          {
            id: 3,
            palabra: "Simulación",
            traduccion: "Simulation",
            definicion: "Definición de simulación",
            categoria: ["Categoria3"],
          },
          {
            id: 4,
            palabra: "Test",
            traduccion: "Test",
            definicion: "Definición de test",
            categoria: ["Categoria4"],
          },
          {
            id: 5,
            palabra: "Validación",
            traduccion: "Validation",
            definicion: "Definición de validación",
            categoria: ["Categoria5"],
          },
          {
            id: 6,
            palabra: "Verificación",
            traduccion: "Verification",
            definicion: "Definición de verificación",
            categoria: ["Categoria6"],
          },
        ];
        if (isMounted) setTarjetas(data);
      } catch (err: any) {
        if (isMounted) setError("Error simulado");
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [userId, enable]);

  return { tarjetas, loading, error };
}

export function useEnviarRespuestasTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const enviar = async (respuestas: any[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simula una espera de 2 segundos antes de "enviar" los datos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      console.log("Simulación de POST funcionando. Respuestas enviadas:", respuestas);
      // Aquí podrías simular un error lanzando: throw new Error("Error simulado");
      setSuccess(true);
    } catch (err: any) {
      setError("Error simulado");
    } finally {
      setLoading(false);
    }
  };

  return { enviar, loading, error, success };
}