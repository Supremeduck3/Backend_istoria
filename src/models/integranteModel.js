import prisma from "../lib/prismaClient.js";


export default class integranteModel {
    constructor({
        id = null,
        cargo,
        nome,
        descriaoCargo,
        fotoUrl,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.cargo = cargo;
        this.nome = nome;
        this.descriaoCargo = descriaoCargo;
        this.fotoUrl = fotoUrl;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.integrante.create({
            data: {
                cargo: this.cargo,
                nome: this.nome,
                descriaoCargo: this.descriaoCargo,
                fotoUrl: this.fotoUrl,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm,
            },
        })
    }
    static async buscarTodos() {
        return prisma.integrante.findMany();
    }
      async deletar() {
    return prisma.integrante.delete({ where: { id: this.id } });
  }
}