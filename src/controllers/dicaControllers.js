import dicasModel from './../models/dicaModel.js'

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

        if (req.body.dicas !== undefined) {
            dicas.tipo = req.body.tipo;
        }
        if (req.body.dicas !== undefined) {
            dicas.descricao = req.body.descricao;
        }
        if (req.body.dicas !== undefined) {
            dicas.nome = req.body.nome;
        }
        const data = await dicas.atualizar();

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

        const Dica = await dicasModel.buscarPorId(parseInt(id));

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

        const Dica = await Dica.buscarPorId(parseInt(id));

        if (!Dica) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Dica.deletar();

        return res.status(200).json({ message: `O registro ${Dica.nome}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
