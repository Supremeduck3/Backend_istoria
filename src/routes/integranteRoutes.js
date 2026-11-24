import express from 'express';
import * as integrantes from './../controllers/integranteControllers.js';

const router = express.Router();

router.post('/criar', integrantes.criar);
router.get('/', integrantes.buscarTodos);
router.get('/:id', integrantes.buscarPorId);
router.delete('/:id', integrantes.deletar);
router.put('/:id', integrantes.atualizar);

export default router;
