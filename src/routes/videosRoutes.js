import express from 'express';
import * as videos from './../controllers/videosControllers.js';

const router = express.Router();

router.post('/criar', videos.criar);
router.get('/', videos.buscarTodos);
router.get('/:id', videos.buscarPorId);
router.delete('/:id', videos.deletar);
router.put('/:id', videos.atualizar);

export default router;
