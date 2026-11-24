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
                message: `O registro ${integrante.titulo}" foi deletado com sucesso!, deletado: Dica `,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = new integranteModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ error: 'Registros vazios' });
        }
        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar registros');
    }
};

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { nome,cargo,descricaoCargo,fotoUrl } = req.body;
        const campos =  [nome,cargo,descricaoCargo,fotoUrl ];

        if (campos.some((campo) => typeof campo != 'string')) {
            return res
                .status(400)
                .json({
                    error: 'Os campos nome,cargo,descricao do cargo e foto Url e onde atua devem ser caracteres(String) ',
                });
        }
        if (!nome || !cargo || !descricaoCargo) {
            return res
                .status(400)
                .json({
                    error: 'Os campos nome, cargo e descricao do cargo e onde atua são obrigatórios e não podem ser vazios!',
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
