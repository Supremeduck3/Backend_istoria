import prisma from '../lib/prismaClient.js';


export default class carreirasModel {
    constructor({
        id = null,
        ordem,
        titulo,
        descricao,
        ondeAtua,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.ordem = ordem;
        this.titulo = titulo;
        this.descricao = descricao;
        this.ondeAtua = ondeAtua;
        this.destaque = destaque;
        this.temaId = temaId;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.Carreira.create({
            data: {
                ordem: this.ordem,
                titulo: this.titulo,
                descricao: this.descricao,
                ondeAtua: this.ondeAtua,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm,
            },
        })
    }


    async atualizar() {
        return prisma.Carreira.update({
            where: { id: this.id },
            data: {
                ordem: this.ordem,
                titulo: this.titulo,
                descricao: this.descricao,
                ondeAtua: this.ondeAtua,
            },
        });
    }
    static async buscarTodos() {
        return prisma.Carreira.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.Carreira.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new Carreira(data);
    }
      async deletar() {
    return prisma.Carreira.delete({ where: { id: this.id } });
  }

}