import database from '../config/database.js';

export const listarRegistros = async () => {
    const result = await database.query(`
    SELECT r.id, r.entrada, r.saida, r.comentario, u.email, r.total_horas
    FROM registros r
    JOIN usuarios u ON r.usuario_id = u.id
    ORDER BY r.id DESC
  `);

    return result.rows;
};

export const criarRegistro = async (usuario_id, entrada) => {
    const result = await database.query(
        `INSERT INTO registros (usuario_id, entrada)
     VALUES ($1, $2)
     RETURNING *`,
        [usuario_id, entrada]
    );

    return result.rows[0];
};

export const atualizarRegistro = async (id, saida, comentario, total_horas) => {
    const result = await database.query(
        `UPDATE registros 
     SET saida = $1, comentario = $2, total_horas = $3 
     WHERE id = $4 
     RETURNING *`,
        [saida, comentario, total_horas, id]
    );

    return result.rows[0];
};
