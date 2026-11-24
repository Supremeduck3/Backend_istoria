import express from 'express';
import cors from 'cors';
const app = express();

import carreirasRoutes from './../Backend_istoria/src/routes/carreirasRoutes.js';
import cursosRoutes from './src/routes/cursosRoutes.js';
import dicasRoutes from './src/routes/dicaRoutes.js';
import estagioRoutes from './src/routes/estagioRoutes.js';
import noticiasRoutes from './src/routes/noticiasRoutes.js';

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req,res)=>{
    res.send('A api está funcionando');
});

//rotas

app.use('/carreiras',carreirasRoutes);
app.use('/cursos',cursosRoutes);
app.use('/dicas',dicasRoutes);
app.use('/estagio',estagioRoutes);
app.use('/noticias', noticiasRoutes);


app.use((req,res)=>{
    res.status(404).json({error:'Rota não encontrada'});
})

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})






