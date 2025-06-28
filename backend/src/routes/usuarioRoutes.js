import express from 'express';
import { registrarUsuario, listarUsuarios } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', registrarUsuario);
router.get('/usuarios', listarUsuarios);

export default router;
