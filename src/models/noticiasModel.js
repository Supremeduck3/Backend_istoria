import prisma from "../lib/prismaClient.js";


export default class noticiasModel {
    constructor({
        id = null,
        titulo,
        categoria,
        linhaFina,
        corpo,
        autor,
        fotoUrl,
        publicadaEm,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.linhaFina = linhaFina;
        this.corpo = corpo;
        this.autor = autor;
        this.fotoUrl = fotoUrl;
        this.publicadaEm = publicadaEm;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.noticias.create({
            data: {
                titulo: this.titulo,
                categoria: this.categoria,
                linhaFina: this.linhaFina,
                corpo: this.corpo,
                autor: this.autor,
                fotoUrl: this.fotoUrl,
                publicadaEm: this.publicadaEm,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm
            },
        })
    }


    async atualizar() {
        return prisma.noticias.update({
            where: { id: this.id },
            data: {
                                titulo: this.titulo,
                categoria: this.categoria,
                linhaFina: this.linhaFina,
                corpo: this.corpo,
                autor: this.autor,
                fotoUrl: this.fotoUrl,
            },
        });
    }
    static async buscarTodos() {
        return prisma.noticias.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.noticias.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new noticiasModel(data);
    }
    async deletar() {
        return prisma.noticias.delete({ where: { id: this.id } });
    }
}