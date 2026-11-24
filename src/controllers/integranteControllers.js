import integranteModel from './../models/integranteModel.js';

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const integrante = await integranteModel.buscarPorId(parseInt(id));

        if (!integrante) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await integrante.deletar();

        return res
            .status(200)
            .json({
                message: `O registro "${integrante.nome}" foi deletado com sucesso!`,
                deletado: integrante,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const data = await integranteModel.buscarTodos();
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao buscar registros:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const integrante = await integranteModel.buscarPorId(parseInt(id));

        if (!integrante) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: integrante });
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

        const integrante = await integranteModel.buscarPorId(parseInt(id));

        if (!integrante) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            integrante.nome = req.body.nome;
        }
        if (req.body.cargo !== undefined) {
            integrante.cargo = req.body.cargo;
        }
        if (req.body.descricaoCargo !== undefined) {
            integrante.descricaoCargo = req.body.descricaoCargo;
        }
        if (req.body.fotoUrl !== undefined) {
            integrante.fotoUrl = req.body.fotoUrl;
        }

        const data = await integrante.atualizar();

        return res.status(200).json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { nome,cargo,descricaoCargo,fotoUrl } = req.body;
        const campos =  [nome,cargo,descricaoCargo];

        if (campos.some((campo) => typeof campo != 'string') || (fotoUrl !== undefined && typeof fotoUrl != 'string')) {
            return res
                .status(400)
                .json({
                    error: 'Os campos nome, cargo, descricao do cargo e foto Url devem ser caracteres(String) ',
                });
        }
        if (!nome || !cargo || !descricaoCargo) {
            return res
                .status(400)
                .json({
                    error: 'Os campos nome, cargo e descricao do cargo são obrigatórios e não podem ser vazios!',
                });
        }
        const integrante = new integranteModel({ nome, cargo, descricaoCargo,fotoUrl });

        const data = await integrante.criar();
        return res.status(201).json({ message: 'Registro foi criado corretamente', data });
    } catch (error) {
        console.error('Erro ao criar', error);
        return res.status(500).json({ error: 'Erro interno ao salvar registro' });
    }
};
