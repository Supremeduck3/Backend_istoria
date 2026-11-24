import noticiasModel from './../models/noticiasModel.js'

export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { fotoUrl, categoria, titulo, linhaFina, autor, publicadaEm, corpo } = req.body;
        const campos = [categoria, titulo, linhaFina, corpo, autor]

        if(campos.some(campo => typeof campo != "string") || (fotoUrl !== undefined && typeof fotoUrl != "string")){
            return res.status(400).json({error:"Os campos categoria, titulo, linha fina, corpo, autor e foto url tem que ser em forma de caracteres(String)"});
        }
        if (!categoria || !titulo || !linhaFina || !corpo || !autor) {
            return res.status(400).json({ error: 'O campo de Categoria, Titulo, linha fina, corpo do texto e autor, não podem estar vazios' });
        }
        if([titulo, linhaFina, corpo].some(campo => campo.length <= 5)){
            return res.status(400).json({error:"Os campos titulo, linha fina e corpo não podem ter menos de 6 caracteres"});
        }
        if (publicadaEm !== undefined && isNaN(new Date(publicadaEm))) {
            return res.status(400).json({ error: 'A data de publicação é inválida' });
        }
        const noticia = new noticiasModel({
            fotoUrl,
            categoria,
            titulo,
            linhaFina,
            autor,
            corpo,
            publicadaEm: publicadaEm !== undefined ? new Date(publicadaEm) : undefined,
        });

        const data = await noticia.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}

export const buscarTodos = async (req, res ) => {
    try{
        const data = await noticiasModel.buscarTodos();
        return res.status(200).json({ data });
    }catch (error){
        console.error('Erro ao buscar registros:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
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

        const noticias = await noticiasModel.buscarPorId(parseInt(id));

        if (!noticias) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.categoria !== undefined) {
            noticias.categoria = req.body.categoria;
        }
        if (req.body.fotoUrl !== undefined) {
            noticias.fotoUrl = req.body.fotoUrl;
        }
        if (req.body.titulo !== undefined) {
            noticias.titulo = req.body.titulo;
        }
        if (req.body.linhaFina !== undefined) {
            noticias.linhaFina = req.body.linhaFina;
        }
        if (req.body.autor !== undefined) {
            noticias.autor = req.body.autor;
        }
        if (req.body.publicadaEm !== undefined) {
            if (isNaN(new Date(req.body.publicadaEm))) {
                return res.status(400).json({ error: 'A data de publicação é inválida' });
            }
            noticias.publicadaEm = new Date(req.body.publicadaEm);
        }
        if (req.body.corpo !== undefined) {
            noticias.corpo = req.body.corpo;
        }

        const data = await noticias.atualizar();

        return res.status(200).json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
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

        const Noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!Noticia) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: Noticia });
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

        const Noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!Noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Noticia.deletar();

        return res.status(200).json({ message: `O registro "${Noticia.titulo}" foi deletado com sucesso!`, deletado: Noticia });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
