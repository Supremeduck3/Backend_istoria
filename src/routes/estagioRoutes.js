import express from 'express';
import * as estagio from './../controllers/estagioControllers.js';

const router = express.Router();

router.post('/dicas', estagio.criar);
router.get('/:id', estagio.buscarPorId);
router.get('/', estagio.buscarTodos);
router.delete('/:id', estagio.deletar);
router.put('/:id', estagio.atualizar);

export default router;
