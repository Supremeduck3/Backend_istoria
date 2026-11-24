import simuladoModel from './../models/simuladoModel.js';

export const criar = async (req, res) => {

    try {
        if(!req.body) {
            return res.status(400).json({error: 'A requisição está vazia'});
        }
        const {enunciado, explicacao, alternativa} = req.body;

        if(typeof enunciado != 'string' || (explicacao !== undefined && typeof explicacao != 'string')){
            return res.status(400).json({error: "Os campos enunciado e explicação devem ser caracteres(String) "});
        }
        if(!enunciado) {
            return res.status(400).json({error: 'O campo enunciado é obrigatório e não pode ser vazio!'});
        }
        if(alternativa !== undefined && (!Array.isArray(alternativa) || alternativa.some(alt => typeof alt.letra != 'string' || typeof alt.texto != 'string'))){
            return res.status(400).json({error: 'As alternativas devem ser uma lista com letra e texto em forma de caracteres(String)'});
        }
        const simulado = new simuladoModel({
            enunciado,
            explicacao,
            alternativa: alternativa !== undefined ? { create: alternativa } : undefined,
        });

        const data = await simulado.criar();
        return res.status(201).json({message: 'Registro foi criado corretamente', data});
    } catch(error){
        console.error('Erro ao criar', error);
        return res.status(500).json({error: 'Erro interno ao salvar registro'});
    }
}

export const buscarTodos = async (req, res) => {
    try {
        const data = await simuladoModel.buscarTodos();
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
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

        const simulado = await simuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.enunciado !== undefined) {
            simulado.enunciado = req.body.enunciado;
        }
        if (req.body.explicacao !== undefined) {
            simulado.explicacao = req.body.explicacao;
        }
        const data = await simulado.atualizar();

        return res.status(200).json({ message: `O registro "${data.id}" foi atualizado com sucesso!`, data });
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

        const simulado = await simuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: simulado });
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

        const simulado = await simuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await simulado.deletar();

        return res.status(200).json({ message: `O registro "${simulado.id}" foi deletado com sucesso!`, deletado: simulado });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
