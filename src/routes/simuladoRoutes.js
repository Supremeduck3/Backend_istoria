import express from 'express';
import * as simulado from './../controllers/simuladoControllers.js';

const router = express.Router();

router.post('/criar', simulado.criar);
router.get('/', simulado.buscarTodos);
router.get('/:id', simulado.buscarPorId);
router.delete('/:id', simulado.deletar);
router.put('/:id', simulado.atualizar);

export default router;
