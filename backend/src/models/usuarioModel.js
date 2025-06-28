import database from '../config/database.js';

export const criarUsuario = async (email, senhaHash) => {
    const result = await database.query(
        'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING *',
        [email, senhaHash]
    );
    return result.rows[0];
};

export const buscarTodosUsuarios = async () => {
    const result = await database.query('SELECT id, email FROM usuarios ORDER BY id');
    return result.rows;
};

export const buscarPorEmail = async (email) => {
    const result = await database.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return result.rows[0];
};
