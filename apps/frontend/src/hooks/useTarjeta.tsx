import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import TarjetasService from "../service/TarjetasService";
import type { Tarjeta } from "../model/TarjetaModel";

export function useTarjetasByUserId(userId: number, enable: boolean) {
  const { getToken } = useAuth();
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      
      if (!enable) return;
      let isMounted = true;
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const token = await getToken();
          console.log(token);
          if (!token) throw new Error("No autenticado");
          const data = await TarjetasService.getTarjetasByUserId(token);
          console.log(data);
          if (isMounted) setTarjetas(data);
        } catch (err: any) {
          if (isMounted) setError(err.message || "Error al cargar tarjetas");
        } finally {
          if (isMounted) setLoading(false);
        }
      })();
      return () => {
        isMounted = false;
      };
  }, [userId, getToken, enable]);

  return { tarjetas, loading, error };
}

export function useTarjetas() {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await TarjetasService.getTarjetas();
        if (isMounted) setTarjetas(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Error al cargar tarjetas");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return { tarjetas, loading, error };
}

export function useEnviarRespuestas() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const enviar = async (respuestas: any[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = await getToken();
      if (!token) throw new Error("No autenticado");
      await TarjetasService.postRespuestas(respuestas, token);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al enviar respuestas");
    } finally {
      setLoading(false);
    }
  };

  return { enviar, loading, error, success };
}