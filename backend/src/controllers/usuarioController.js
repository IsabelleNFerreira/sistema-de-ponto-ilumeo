import bcrypt from 'bcrypt';
import { criarUsuario, buscarTodosUsuarios } from '../models/usuarioModel.js';

export const registrarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const usuario = await criarUsuario(email, senhaHash);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: err.message });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await buscarTodosUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
};
