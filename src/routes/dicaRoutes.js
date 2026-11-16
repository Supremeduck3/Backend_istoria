import express from 'express';
import * as dica from './../controllers/dicaControllers.js';

const router = express.Router();

router.post('/dicas',carrerias.criar);
router.get('/:id', carrerias.buscarPorId);
router.delete('/:id',carrerias.deletar);
router.put('/:id', carrerias.atualizar);
