import dicaModel from './../models/dicaModel.js'

const TIPOS_VALIDOS = ['COMO_ESTUDAR', 'APRENDIZAGEM', 'VESTIBULARES'];

export const buscarTodos = async (req, res) => {
    try {
        const data = await dicaModel.buscarTodos();
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const criar = async (req, res) => {

    try {
        if(!req.body) {
            return res.status(400).json({error: 'A requisição está vazia'});
        }
        const {tipo, nome, descricao} = req.body;
        const campos = [tipo, nome, descricao]

        if(campos.some(campo => typeof campo != 'string')){
            return res.status(400).json({error: "Os campos tipo, descrição e nome devem ser caracteres(String) "});
        }
        if(!tipo || !descricao || !nome) {
            return res.status(400).json({error: 'Os campos tipo, descrição e nome são obrigatórios e não podem ser vazios!'});
        }
        if (!TIPOS_VALIDOS.includes(tipo)) {
            return res.status(400).json({error: `O tipo deve ser um destes: ${TIPOS_VALIDOS.join(', ')}`});
        }
        const dica = new dicaModel({tipo, descricao, nome});

        const data = await dica.criar();
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

        const dicas = await dicaModel.buscarPorId(parseInt(id));

        if (!dicas) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.tipo !== undefined) {
            if (!TIPOS_VALIDOS.includes(req.body.tipo)) {
                return res.status(400).json({ error: `O tipo deve ser um destes: ${TIPOS_VALIDOS.join(', ')}` });
            }
            dicas.tipo = req.body.tipo;
        }
        if (req.body.descricao !== undefined) {
            dicas.descricao = req.body.descricao;
        }
        if (req.body.nome !== undefined) {
            dicas.nome = req.body.nome;
        }
        if (req.body.ordem !== undefined) {
            dicas.ordem = req.body.ordem;
        }
        const data = await dicas.atualizar();

        return res.status(200).json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
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

        const Dica = await dicaModel.buscarPorId(parseInt(id));

        if (!Dica) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Dica });
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

        const dica = await dicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await dica.deletar();

        return res.status(200).json({ message: `O registro "${dica.nome}" foi deletado com sucesso!`, deletado: dica });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
