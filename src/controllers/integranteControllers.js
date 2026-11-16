

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const Estagio = await Estagio.buscarPorId(parseInt(id));

        if (!Estagio) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await Estagio.deletar();

        return res.status(200).json({ message: `O registro ${Estagio.titulo}" foi deletado com sucesso!, deletado: Dica `});
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};

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