import express from 'express';
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req,res)=>{
    res.send('A api está funcionando');
});
app.use((req,res)=>{
    res.status(404).json({error:'Rota não encontrada'});
})

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})




