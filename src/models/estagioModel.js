import prisma from "../lib/prismaClient.js";


export default class estagioModel {
    constructor({
        id = null,
        ordem,
        titulo,
        descricao,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.ordem = ordem;
        this.titulo = titulo;
        this.descricao = descricao;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.estagio.create({
            data: {
                ordem: this.ordem,
                titulo: this.titulo,
                descricao: this.descricao,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm,
            },
        })
    }


    async atualizar() {
        return prisma.estagio.update({
            where: { id: this.id },
            data: {
                ordem: this.ordem,
                nome: this.nome,
                descricao: this.descricao,
                titulo: this.titulo,
            },
        });
    }
    static async buscarTodos() {
        return prisma.estagio.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.estagio.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new estagio(data);
    }
      async deletar() {
    return prisma.estagio.delete({ where: { id: this.id } });
  }
}