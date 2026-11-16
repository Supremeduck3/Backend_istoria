import prisma from "@prisma/client";

export default class estagioModel{
    constructor({
    id=null,
    ordem,
    titulo,
    descricao,
    criadaEm,
    atualizadaEm
} = {}){
    this.id = id;
    this.ordem = ordem;
    this.titulo = titulo;
    this.descricao = descricao;
    this.criadaEm = criadaEm;
    this.atualizadaEm = atualizadaEm;
}
    async criar(){
    return prisma.noticias.create({
        data: {
            ordem: this.ordem,
            titulo: this.titulo,
            descricao: this.descricao,
            criadaEm: this.criadaEm,
            atualizadaEm: this.atualizadaEm,
            },
        })
    }
}