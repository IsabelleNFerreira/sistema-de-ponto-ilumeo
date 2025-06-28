import axios from 'axios';
import { Registro } from '../models/registroModel';

const API_BASE = 'http://localhost:5000/api';

export async function listarRegistros(): Promise<Registro[]> {
    const response = await axios.get<Registro[]>(`${API_BASE}/registros`);
    return response.data;
}

export async function checkIn(usuario_id: number, email: string, ): Promise<Registro> {
    const response = await axios.post<Registro>(`${API_BASE}/registros`, {
        usuario_id,
        email,
        entrada: new Date().toISOString(),
    });
    return response.data;
}

export async function checkOut(registroId: number): Promise<Registro> {
    const response = await axios.put<Registro>(`${API_BASE}/checkout/${registroId}`, {
        saida: new Date().toISOString(),
    });
    return response.data;
}
