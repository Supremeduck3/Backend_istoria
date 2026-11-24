
import cursoModel from './../models/cursosModel.js';

export const criar = async (req, res) => {

    try {
        if(!req.body) {
            return res.status(400).json({error: 'A requisição está vazia'});
        }
         const {nome, descricao} = req.body;
        const campos = [ nome, descricao]

        if(campos.some(campo => typeof campo != 'string')){
            return res.status(400).json({error: "Os campos nome e descrição devem ser caracteres(String) "});
        }
        if(!tipo || !descricao || !nome) {
            return res.status(400).json({error: 'Os campos descrição e nome são obrigatórios e não podem ser vazios!'});
        }
        const curso = new cursoModel({descricao, nome});

        const data = await curso.criar();
        return res.status(201).json({message: 'Registro foi criado corretamente', data});
    } catch(error){
        console.error('Erro ao criar', error);
        return res.status(500).json({error: 'Erro interno ao salvar registro'});
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

        const cursos = await cursoModel.buscarPorId(parseInt(id));

        if (!cursos) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.cursos !== undefined) {
            cursos.descricao = req.body.descricao;
        }
        if (req.body.cursos !== undefined) {
            cursos.nome = req.body.nome;
        }
        const data = await cursos.atualizar();

        return res.status(200).json({ message: `O registro "${data.nome}" foi atualizado com sucesso!, data `});
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

        const curso = await cursosModel.buscarPorId(parseInt(id));

        if (!curso) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: curso });
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

        const curso = await curso.buscarPorId(parseInt(id));

        if (!curso) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await curso.deletar();

        return res.status(200).json({ message: `O registro ${curso.nome}" foi deletado com sucesso!, deletado: curso `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
