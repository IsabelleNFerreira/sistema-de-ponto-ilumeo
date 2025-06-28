import express from 'express';
import { obterRegistros, registrarPonto, editarRegistro } from '../controllers/registroController.js';

const router = express.Router();

router.get('/registros', obterRegistros);
router.post('/registros', registrarPonto);
router.put('/registros/:id', editarRegistro);

export default router;
