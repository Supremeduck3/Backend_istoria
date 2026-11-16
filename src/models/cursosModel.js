import prisma from "@prisma/client";


export default class cursoModel {
    constructor({
        id = null,
        ordem,
        nome,
        descricao,
        criadaEm,
        atualizadaEm
    } = {}) {
        this.id = id;
        this.ordem = ordem;
        this.nome = nome;
        this.descricao = descricao;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar() {
        return prisma.cursos.create({
            data: {
                ordem: this.ordem,
                nome: this.nome,
                descricao: this.descricao,
                criadaEm: this.criadaEm,
                atualizadaEm: this.atualizadaEm,
            },
        })
    }


    async atualizar() {
        return prisma.cursos.update({
            where: { id: this.id },
            data: {
                ordem: this.ordem,
                nome: this.nome,
                descricao: this.descricao,
            },
        });
    }
    static async buscarTodos() {
        return prisma.cursos.findMany();
    }


    static async buscarPorId(id) {
        const data = await prisma.cursos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new Cursos(data);
    }
    async deletar() {
        return prisma.cursos.delete({ where: { id: this.id } });
    }
}