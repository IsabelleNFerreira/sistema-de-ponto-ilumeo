export interface Registro {
  id: number;
  usuario_id: number;
  email: string;
  entrada: string;
  saida: string | null;
  comentario: string | null;
  total_horas?: number | null;
}
