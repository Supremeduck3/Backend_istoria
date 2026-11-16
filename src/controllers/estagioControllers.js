import estagioModels from "./../models/estagioModels"

export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const {ordem, titulo,descricao } = req.body;
        const campos = [titulo,descricao]

        if(campos.some(campo => typeof campo != "string")){
            return res.status(400).json({error:"Os campos titulo,descricao tem que ser em forma de caracteres(String)"});
        }

        if(campos.some(campo => campo.length <= 5)){
            return res.status(400).json({error:"Nenhum dos campos pode ter menos de 6 caracteres"});
        }
        if (!ordem || !titulo || !descricao) {
            return res.status(400).json({ error: 'O campo de Categoria, Titulo, linha_fina, corpo do texto e autor, não podem estar vazios' });
        }
        const estagio = new estagioModels({ ordem, titulo,descricao});

        const data = await estagio.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}

export const buscarTodos = async (req, res ) => {
    try{
        const registros = new estagioModels.buscarTodos(req.query);

    if(!registros || registros.length === 0){
        return res.status(400).json({error:"Registros vazios"});
    }
    return res.status(200).json(registros);
    }catch (error){
        console.error('Erro ao buscar registros');
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

        const estagio = await estagioModels.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.estagio !== undefined) {
            estagio.ordem = req.body.ordem;
        }
        if (req.body.estagio !== undefined) {
            estagio.titulo = req.body.titulo;
        }
        if (req.body.estagio !== undefined) {
            estagio.descricao = req.body.descricao;
        }

        const data = await estagio.atualizar();

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

        const Noticia = await estagioModels.buscarPorId(parseInt(id));

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

        const Noticia = await Noti.buscarPorId(parseInt(id));

        if (!Noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Noticia.deletar();

        return res.status(200).json({ message: `O registro ${Noticia.titulo}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
