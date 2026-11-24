import express from 'express';
import * as carrerias from './../controllers/carreiraControllers.js';

const router = express.Router();

router.post('/criar',carrerias.criar);
router.get('/', carrerias.buscarTodos);
router.get('/:id', carrerias.buscarPorId);
router.delete('/:id',carrerias.deletar);
router.put('/:id', carrerias.atualizar);

export default router