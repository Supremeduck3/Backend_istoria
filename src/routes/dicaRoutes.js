import express from 'express';
import * as dica from './../controllers/dicaControllers.js';

const router = express.Router();

router.post('/criar',dica.criar);
router.get('/', dica.buscarTodos);
router.get('/:id', dica.buscarPorId);
router.delete('/:id',dica.deletar);
router.put('/:id', dica.atualizar);

export default router
