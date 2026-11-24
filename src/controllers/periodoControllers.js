import periodoModel from './../models/periodoModel.js';

const CATEGORIAS_VALIDAS = ['PRE_HISTORIA', 'ANTIGUIDADE', 'IDADE_MEDIA', 'IDADE_MODERNA', 'IDADE_CONTEMPORANEA'];

export const criar = async (req, res) => {

    try {
        if(!req.body) {
            return res.status(400).json({error: 'A requisição está vazia'});
        }
        const {categoria, anoInicio, anoFim, figuraMarcante} = req.body;

        if(typeof categoria != 'string' || typeof figuraMarcante != 'string'){
            return res.status(400).json({error: "Os campos categoria e figura marcante devem ser caracteres(String) "});
        }
        if(!Number.isInteger(anoInicio) || (anoFim !== undefined && anoFim !== null && !Number.isInteger(anoFim))){
            return res.status(400).json({error: "Os campos ano de início e ano de fim devem ser números inteiros"});
        }
        if(!categoria || !figuraMarcante) {
            return res.status(400).json({error: 'Os campos categoria, ano de início e figura marcante são obrigatórios e não podem ser vazios!'});
        }
        if (!CATEGORIAS_VALIDAS.includes(categoria)) {
            return res.status(400).json({error: `A categoria deve ser uma destas: ${CATEGORIAS_VALIDAS.join(', ')}`});
        }
        const periodo = new periodoModel({categoria, anoInicio, anoFim, figuraMarcante});

        const data = await periodo.criar();
        return res.status(201).json({message: 'Registro foi criado corretamente', data});
    } catch(error){
        console.error('Erro ao criar', error);
        return res.status(500).json({error: 'Erro interno ao salvar registro'});
    }
}

export const buscarTodos = async (req, res) => {
    try {
        const data = await periodoModel.buscarTodos();
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

        const periodo = await periodoModel.buscarPorId(parseInt(id));

        if (!periodo) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.categoria !== undefined) {
            if (!CATEGORIAS_VALIDAS.includes(req.body.categoria)) {
                return res.status(400).json({ error: `A categoria deve ser uma destas: ${CATEGORIAS_VALIDAS.join(', ')}` });
            }
            periodo.categoria = req.body.categoria;
        }
        if (req.body.anoInicio !== undefined) {
            periodo.anoInicio = req.body.anoInicio;
        }
        if (req.body.anoFim !== undefined) {
            periodo.anoFim = req.body.anoFim;
        }
        if (req.body.figuraMarcante !== undefined) {
            periodo.figuraMarcante = req.body.figuraMarcante;
        }
        const data = await periodo.atualizar();

        return res.status(200).json({ message: `O registro "${data.categoria}" foi atualizado com sucesso!`, data });
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

        const periodo = await periodoModel.buscarPorId(parseInt(id));

        if (!periodo) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: periodo });
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

        const periodo = await periodoModel.buscarPorId(parseInt(id));

        if (!periodo) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await periodo.deletar();

        return res.status(200).json({ message: `O registro "${periodo.categoria}" foi deletado com sucesso!`, deletado: periodo });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
