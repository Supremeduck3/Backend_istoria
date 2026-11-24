import express from 'express';
import * as noticias from './../controllers/noticiasControllers.js';

const router = express.Router();

router.post('/criar', noticias.criar);
router.get('/', noticias.buscarTodos);
router.get('/:id', noticias.buscarPorId);
router.delete('/:id', noticias.deletar);
router.put('/:id', noticias.atualizar);

export default router;
