import { listarRegistros, criarRegistro } from '../models/registroModel.js';

export const obterRegistros = async (req, res) => {
    try {
        const registros = await listarRegistros();
        res.status(200).json(registros);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar registros' });
    }
};

export const registrarPonto = async (req, res) => {
    const { usuario_id, entrada} = req.body;

    try {
        const novoRegistro = await criarRegistro(usuario_id, entrada);
        res.status(201).json(novoRegistro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao registrar ponto', detalhes: err.message });
    }
};

import { atualizarRegistro } from '../models/registroModel.js';

export const editarRegistro = async (req, res) => {
    const { id } = req.params;
    const { saida, comentario, total_horas } = req.body;

    try {
        const registroAtualizado = await atualizarRegistro(id, saida, comentario, total_horas);

        if (!registroAtualizado) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }

        res.json(registroAtualizado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar registro', detalhes: error.message });
    }
};
