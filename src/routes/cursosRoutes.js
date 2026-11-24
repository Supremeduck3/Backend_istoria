import express from 'express';
import * as cursos from './../controllers/cursosControllers.js';

const router = express.Router();

router.post('/criar',cursos.criar);
router.get('/:id', cursos.buscarPorId);
router.delete('/:id',cursos.deletar);
router.put('/:id', cursos.atualizar);

export default router