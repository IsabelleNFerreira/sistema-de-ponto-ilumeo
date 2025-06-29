import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Registro } from '../models/registroModel';
import * as registroService from '../services/registroService';

export default function Relatorios() {
    const [registros, setRegistros] = useState<Registro[]>([]);

    useEffect(() => {
        registroService
            .listarRegistros()
            .then(setRegistros)
            .catch((err) => console.error('Erro ao buscar registros:', err));
    }, []);

    const formatarData = (dataISO: string | null | undefined) => {
        if (!dataISO) return '—';
        const data = new Date(dataISO);
        const dataAjustada = new Date(data.getTime());
        return dataAjustada.toLocaleString('pt-BR', {
            timeStyle: 'medium',
            dateStyle: 'short',
        });
    };

    const formatarHorasDecimais = (valor: number): string => {
        const horas = Math.floor(valor);
        const minutos = Math.round((valor - horas) * 60);

        const partes = [];

        if (horas > 0) partes.push(`${horas}h`);
        if (minutos > 0 || horas === 0) partes.push(`${minutos}min`);

        return partes.join(' ');
    };

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">Relatório de Registros</h2>

            <div style={{ width: '100%', overflowX: 'auto' }}>
                <DataTable
                    value={registros}
                    scrollable
                    scrollHeight="600px"
                    showGridlines
                    stripedRows
                    size="normal"
                    paginator
                    rows={20}
                    emptyMessage="Nenhum registro encontrado."
                    style={{ minWidth: '1000px' }}
                >
                    {/* <Column field="id" header="ID" /> */}
                    <Column field="id" header="ID" />
                    <Column field="email" header="Usuário" />
                    <Column
                        field="entrada"
                        header="Entrada"
                        body={(rowData) => formatarData(rowData.entrada)}
                    />
                    <Column
                        field="saida"
                        header="Saída"
                        body={(rowData) => formatarData(rowData.saida)}
                    />
                    <Column
                        field="total_horas"
                        header="Horas trabalhadas no dia"
                        body={(rowData) =>
                            formatarHorasDecimais(rowData.total_horas)
                        }
                    />
                    <Column
                        field="comentario"
                        header="Comentário"
                        body={(rowData) => (
                            <div
                                style={{
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {rowData.comentario}
                            </div>
                        )}
                        style={{ maxWidth: '500px' }}
                    />
                </DataTable>
            </div>
        </div>
    );
}
