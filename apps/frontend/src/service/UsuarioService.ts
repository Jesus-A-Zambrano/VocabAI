import { getData, postData } from "../api";
import type { Usuario } from "../model/UserModel";

// Obtener todos los usuarios
const getUsuariosbyId = async (userId: number, token: string): Promise<Usuario[]> => {
    const usuarios = await getData<Usuario[]>(`/usuarios/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return usuarios;
}

export default { getUsuariosbyId };