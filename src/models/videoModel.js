import prisma from "@prisma/client";


export default class videoModel {
    constructor({
        id = null,
        titulo,
        categoria,
        descricao,
        url,
        fonte,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.descricao = descricao;
        this.url = url;
        this.fonte = fonte;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.video.create({
            data: {
                titulo: this.titulo,
                categoria: this.categoria,
                descricao: this.descricao,
                url: this.url,
                fonte: this.fonte,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm
            },
        })
    }


    async atualizar() {
        return prisma.video.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                categoria: this.categoria,
                descricao: this.descricao,
                url: this.url,
                fonte: this.fonte,
            },
        });
    }
    static async buscarTodos() {
        return prisma.video.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.video.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new video(data);
    }
    async deletar() {
        return prisma.video.delete({ where: { id: this.id } });
    }
}