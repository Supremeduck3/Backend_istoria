import express from 'express';
import * as integrantes from './../controllers/integranteControllers.js';

const router = express.Router();

router.post('/dicas', integrantes.criar);
router.get('/', integrantes.buscarTodos);
router.delete('/:id', integrantes.deletar);

export default router;
