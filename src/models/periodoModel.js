import prisma from "@prisma/client";


export default class periodoModel {
    constructor({
        id = null,
        categoria,
        anoInicio,
        anoFim,
        figuraMarcante,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.categoria = categoria;
        this.anoInicio = anoInicio;
        this.anoFim = anoFim;
        this.figuraMarcante = figuraMarcante;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.periodo.create({
            data: {
                categoria: this.categoria,
                anoInicio: this.anoInicio,
                anoFim: this.anoFim,
                figuraMarcante: this.figuraMarcante,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm
            },
        })
    }


    async atualizar() {
        return prisma.periodo.update({
            where: { id: this.id },
            data: {
                categoria: this.categoria,
                anoInicio: this.anoInicio,
                anoFim: this.anoFim,
                figuraMarcante: this.figuraMarcante,
            },
        });
    }
    static async buscarTodos() {
        return prisma.periodo.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.periodo.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new periodo(data);
    }
    async deletar() {
        return prisma.periodo.delete({ where: { id: this.id } });
    }
}