import estagioModel from './../models/estagioModel.js';

export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const {ordem, titulo,descricao } = req.body;
        const campos = [titulo,descricao]

        if(campos.some(campo => typeof campo != "string")){
            return res.status(400).json({error:"Os campos titulo,descricao tem que ser em forma de caracteres(String)"});
        }

        if(campos.some(campo => campo.length <= 5)){
            return res.status(400).json({error:"Nenhum dos campos pode ter menos de 6 caracteres"});
        }
        const estagio = new estagioModel({ ordem, titulo,descricao});

        const data = await estagio.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}

export const buscarTodos = async (req, res ) => {
    try{
        const data = await estagioModel.buscarTodos();
        return res.status(200).json({ data });
    }catch (error){
        console.error('Erro ao buscar registros:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
}

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const estagio = await estagioModel.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: estagio });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const estagio = await estagioModel.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.ordem !== undefined) {
            estagio.ordem = req.body.ordem;
        }
        if (req.body.titulo !== undefined) {
            estagio.titulo = req.body.titulo;
        }
        if (req.body.descricao !== undefined) {
            estagio.descricao = req.body.descricao;
        }

        const data = await estagio.atualizar();

        return res.status(200).json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};


export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const Estagio = await estagioModel.buscarPorId(parseInt(id));

        if (!Estagio) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Estagio.deletar();

        return res.status(200).json({ message: `O registro "${Estagio.titulo}" foi deletado com sucesso!`, deletado: Estagio });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
