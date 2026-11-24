import carreirasModel from './../models/carreiraModel.js';

export const criar = async (req, res) => {

    try {
        if(!req.body) {
            return res.status(400).json({error: 'A requisição está vazia'});
        }
        const {titulo, descricao, ondeAtua} = req.body;
        const campos = [titulo, descricao, ondeAtua]

        if(campos.some(campo => typeof campo != 'string')){
            return res.status(400).json({error: "Os campos título, descrição e onde atua devem ser caracteres(String) "});
        }
        if(!titulo || !descricao || !ondeAtua) {
            return res.status(400).json({error: 'Os campos título descrição e onde atua são obrigatórios e não podem ser vazios!'});
        }
        const carreira = carreirasModel({titulo, descricao, ondeAtua});

        const data = await carreira.criar();
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

        const carreiras = await carreirasModel.buscarPorId(parseInt(id));

        if (!carreiras) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.carreiras !== undefined) {
            carreiras.titulo = req.body.titulo;
        }
        if (req.body.carreiras !== undefined) {
            carreiras.descricao = req.body.descricao;
        }
        if (req.body.carreiras !== undefined) {
            carreiras.ondeAtua = req.body.ondeAtua;
        }
        const data = await carreiras.atualizar();

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

        const Carreira = await carreirasModel.buscarPorId(parseInt(id));

        if (!Carreira) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Carreira });
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

        const Carreira = await carreirasModel.buscarPorId(parseInt(id));

        if (!Carreira) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Carreira.deletar();

        return res.status(200).json({ message: `O registro ${Carreira.titulo}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
