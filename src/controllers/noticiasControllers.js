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
    try{
        const registros = new noticiasModel.buscarTodos(req.query);

    if(!registros || registros.length === 0){
        return res.status(400).json({error:"Registros vazios"});
    }
    return res.status(200).json(registros);
    }catch (error){
        console.error('Erro ao buscar registros');
    }
    
}
export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const noticias = await noticiasModel.buscarPorId(parseInt(id));

        if (!noticias) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.noticias !== undefined) {
            noticias.categoria = req.body.categoria;
        }
        if (req.body.noticias !== undefined) {
            noticias.Url = req.body.Url;
        }
        if (req.body.noticias !== undefined) {
            noticias.titulo = req.body.titulo;
        }
        if (req.body.noticias !== undefined) {
            noticias.linha_fina = req.body.linha_fina;
        }
        if (req.body.noticias !== undefined) {
            noticias.autor = req.body.autor;
        }
        if (req.body.noticias !== undefined) {
            noticias.Data = req.body.Data;
        }
        if (req.body.noticias !== undefined) {
            noticias.corpo_texto = req.body.corpo_texto;
        }

        const data = await noticias.atualizar();

        return res.status(200).json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!, data `});
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};
export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const Noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!Noticia) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Noticia });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const Noticia = await Noti.buscarPorId(parseInt(id));

        if (!Noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Noticia.deletar();

        return res.status(200).json({ message: `O registro ${Noticia.titulo}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
