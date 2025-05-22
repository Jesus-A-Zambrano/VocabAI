import { getData, postData } from "../api";
import type { Tarjeta } from "../model/TarjetaModel";

// Obtener todas las tarjetas
const getTarjetas = async (): Promise<Tarjeta[]> => {
    const tarjetas = await getData<Tarjeta[]>("/tarjetas");
    return tarjetas;
};

// Obtener tarjetas por usuario
const getTarjetasByUserId = async (userId: number, token: string): Promise<Tarjeta[]> => {
    const tarjetas = await getData<Tarjeta[]>(`/tarjetas/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return tarjetas;
};

// Enviar respuestas del usuario (POST)
const postRespuestas = async (respuestas: any[], token: string): Promise<any> => {
    return await postData<any, any[]>("/respuestas", respuestas, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default { getTarjetas, getTarjetasByUserId, postRespuestas };