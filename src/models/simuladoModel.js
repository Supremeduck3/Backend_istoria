import prisma from "@prisma/client";


export default class simuladoModel {
    constructor({
        id = null,
        enunciado,
        explicacao,
        alternativa,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.enunciado = enunciado;
        this.explicacao = explicacao;
        this.alternativa = alternativa;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.simulado.create({
            data: {
                enunciado: this.enunciado,
                explicacao: this.explicacao,
                alternativa: this.alternativa,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm
            },
        })
    }


    async atualizar() {
        return prisma.simulado.update({
            where: { id: this.id },
            data: {
                enunciado: this.enunciado,
                explicacao: this.explicacao,
                alternativa: this.alternativa,
            },
        });
    }
    static async buscarTodos() {
        return prisma.simulado.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.simulado.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new simulado(data);
    }
    async deletar() {
        return prisma.simulado.delete({ where: { id: this.id } });
    }
}