import database from '../config/database.js';

export const listarRegistros = async () => {
    const result = await database.query(`
    SELECT r.id, r.entrada, r.saida, r.comentario, u.email
    FROM registros r
    JOIN usuarios u ON r.usuario_id = u.id
    ORDER BY r.entrada DESC
  `);

    return result.rows;
};

export const criarRegistro = async (usuario_id, entrada, saida, comentario) => {
    const result = await database.query(
        `INSERT INTO registros (usuario_id, entrada, saida, comentario)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
        [usuario_id, entrada, saida, comentario]
    );

    return result.rows[0];
};