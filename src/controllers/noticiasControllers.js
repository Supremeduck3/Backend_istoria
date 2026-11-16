import { json } from 'express';
import noticiasModel from './../models/';

export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { Url, categoria, titulo, linha_fina, autor, Data, corpo_texto } = req.body;
        const campos = [Url,categoria, titulo, linha_fina, corpo_texto]

        if(campos.some(campo => typeof campo != "string")){
            return res.status(400).json({error:"Os campos categoria, url, linha fina, autor e corpo do texto tem que ser em forma de caracteres(String)"});
        }
        if(typeof autor != "string"){
            return res.status(400)({error:"o Campo autor tem que ser uma string"})
        }

        if(campos.some(campo => campo.length <= 5)){
            return res.status(400).json({error:"Nenhum dos campos pode ter menos de 6 caracteres"});
        }
        if (!categoria || !titulo || !linha_fina || !corpo_texto || !autor) {
            return res.status(400).json({ error: 'O campo de Categoria, Titulo, linha_fina, corpo do texto e autor, não podem estar vazios' });
        }
        const noticia = new noticiasModel({ Url, categoria, titulo, linha_fina, autor, Data, corpo_texto });

        const data = await noticia.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}

export const buscarTodos = async (req, res ) => {
    const registros = new noticiasModel.buscarTodos(req.query);

    if(!registros || registros.length === 0){
        return res.status(400).json({error:"Registros vazios"});
    }
    
}