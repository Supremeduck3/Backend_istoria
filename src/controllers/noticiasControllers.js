import noticiasModel from './../models/';

export const criar = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'A requisição está vazia' });
        }
        const { Url, categoria, titulo, linha_fina, autor, Data, corpo_texto } = req.body;

        if (!categoria || !titulo || !linha_fina || !corpo_texto || !autor) {
            return res.status(400).json({ error: 'O campo de Categoria, Titulo, linha_fina, corpo do texto e autor, não podem estar vazions' });
        }
        const noticia = new noticiasModel({ Url, categoria, titulo, linha_fina, autor, Data, corpo_texto });

        const data = await noticia.criar();
        return res.status(201).json({message: 'Registro foi criado certo', data});
    }catch(error){
         console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
}