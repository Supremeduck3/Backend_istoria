import express from 'express';
import * as periodo from './../controllers/periodoControllers.js';

const router = express.Router();

router.post('/criar', periodo.criar);
router.get('/', periodo.buscarTodos);
router.get('/:id', periodo.buscarPorId);
router.delete('/:id', periodo.deletar);
router.put('/:id', periodo.atualizar);

export default router;
