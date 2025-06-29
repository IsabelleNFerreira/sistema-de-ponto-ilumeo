import axios from 'axios';
import { Registro } from '../models/registroModel';

const API_BASE = 'http://localhost:5000/api';


function getDataHoraLocalISO(): string {
    const agora = new Date();
    const offsetMs = agora.getTimezoneOffset() * 60000;
    const localISOTime = new Date(agora.getTime() - offsetMs)
        .toISOString()
        .slice(0, 19);
    return localISOTime;
}

export async function listarRegistros(): Promise<Registro[]> {
    const response = await axios.get<Registro[]>(`${API_BASE}/registros`);
    return response.data;
}

export async function checkIn(usuario_id: number): Promise<Registro> {
    const entrada = getDataHoraLocalISO();

    const response = await axios.post<Registro>(`${API_BASE}/registros`, {
        usuario_id,
        entrada,
    });
    return response.data;
}

export async function checkOut(
    registroId: number,
    total_horas: number,
    comentario?: string
): Promise<Registro> {
    const saida = getDataHoraLocalISO();

    const response = await axios.put<Registro>(
        `${API_BASE}/registros/${registroId}`,
        {
            saida,
            total_horas,
            comentario,
        }
    );
    return response.data;
}
