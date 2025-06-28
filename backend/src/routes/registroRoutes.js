import express from 'express';
import { obterRegistros, registrarPonto } from '../controllers/registroController.js';

const router = express.Router();

router.get('/registros', obterRegistros);
router.post('/registros', registrarPonto);

export default router;
