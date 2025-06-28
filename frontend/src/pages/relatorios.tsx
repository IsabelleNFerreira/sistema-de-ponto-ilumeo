import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Registro } from '../models/registroModel';
import * as registroService from '../services/registroService';

export default function Relatorios() {
    const [registros, setRegistros] = useState<Registro[]>([]);

    useEffect(() => {
        registroService.listarRegistros()
            .then(setRegistros)
            .catch(err => console.error('Erro ao buscar registros:', err));
    }, []);

    return (
        <div className="p-2" >
            <h2 className="text-xl font-bold mb-4">Relatório de Registros</h2>

            <div style={{ overflowX: 'auto' }}>
                <DataTable
                    value={registros}
                    scrollable
                    scrollHeight="400px"
                    showGridlines
                    stripedRows
                    size="small"
                    paginator
                    rows={10}
                    emptyMessage="Nenhum registro encontrado."
                    style={{ minWidth: '700px' }} // min-width para que as colunas não encolham demais
                >
                    {/* <Column field="id" header="ID" /> */}
                    <Column field="email" header="Usuário" />
                    <Column field="entrada" header="Entrada" />
                    <Column field="saida" header="Saída" />
                    <Column field="comentario" header="Comentário" />
                    <Column field="total_horas" header="Horas trabalhadas no dia" />
                </DataTable>
            </div>
        </div>
    );
}
