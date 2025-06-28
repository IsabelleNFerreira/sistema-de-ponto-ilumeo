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
    const { usuario_id, entrada, saida, comentario } = req.body;

    try {
        const novoRegistro = await criarRegistro(usuario_id, entrada, saida, comentario);
        res.status(201).json(novoRegistro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao registrar ponto', detalhes: err.message });
    }
};
