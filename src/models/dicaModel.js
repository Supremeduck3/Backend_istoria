import prisma from "../lib/prismaClient.js";


export default class dicaModel {
    constructor({
        id = null,
        ordem,
        nome,
        descricao,
        tipo,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.ordem = ordem;
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo,
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.dicas.create({
            data: {
                ordem: this.ordem,
                nome: this.nome,
                descricao: this.descricao,
                tipo: this.tipo,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm,
            },
        })
    }


    async atualizar() {
        return prisma.dicas.update({
            where: { id: this.id },
            data: {
                ordem: this.ordem,
                nome: this.nome,
                descricao: this.descricao,
                tipo: this.tipo,
            },
        });
    }
    static async buscarTodos() {
        return prisma.dicas.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.dicas.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new dicas(data);
    }
      async deletar() {
    return prisma.dicas.delete({ where: { id: this.id } });
  }
}