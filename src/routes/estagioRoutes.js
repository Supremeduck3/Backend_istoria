import express from 'express';
import * as estagio from './../controllers/estagioControllers.js';

const router = express.Router();

router.post('/criar', estagio.criar);
router.get('/', estagio.buscarTodos);
router.delete('/:id', estagio.deletar);
router.put('/:id', estagio.atualizar);

export default router;
