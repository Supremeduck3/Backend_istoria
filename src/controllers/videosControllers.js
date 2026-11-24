import videoModel from './../models/videoModel.js'
export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { titulo, categoria, descricao, url, fonte } = req.body;
        const campos = [titulo, categoria, url, fonte]

        if(campos.some(campo => typeof campo != "string") || (descricao !== undefined && typeof descricao != "string")){
            return res.status(400).json({error:"Os campos titulo, categoria, descricao, url e fonte tem que ser em forma de caracteres(String)"});
        }
        if (!titulo || !categoria || !url || !fonte) {
            return res.status(400).json({ error: 'Os campos titulo, categoria, url e fonte não podem estar vazios' });
        }
        const video = new videoModel({ titulo, categoria, descricao, url, fonte });

        const data = await video.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}

export const buscarTodos = async (req, res ) => {
    try{
        const data = await videoModel.buscarTodos();
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

        const video = await videoModel.buscarPorId(parseInt(id));

        if (!video) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: video });
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

        const video = await videoModel.buscarPorId(parseInt(id));

        if (!video) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            video.titulo = req.body.titulo;
        }
        if (req.body.categoria !== undefined) {
            video.categoria = req.body.categoria;
        }
        if (req.body.descricao !== undefined) {
            video.descricao = req.body.descricao;
        }
        if (req.body.url !== undefined) {
            video.url = req.body.url;
        }
        if (req.body.fonte !== undefined) {
            video.fonte = req.body.fonte;
        }

        const data = await video.atualizar();

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

        const video = await videoModel.buscarPorId(parseInt(id));

        if (!video) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await video.deletar();

        return res.status(200).json({ message: `O registro "${video.titulo}" foi deletado com sucesso!`, deletado: video });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
