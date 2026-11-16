import prisma from "@prisma/client";

export default class dicaModel{
    constructor({
    id=null,
    ordem,
    tipo,
    nome,
    descricao,
    criadaEm,
    atualizadaEm
} = {}){
    this.id = id;
    this.ordem = ordem;
    this.tipo = tipo;
    this.nome = nome;
    this.descricao = descricao;
    this.destaque = destaque;
    this.criadaEm = criadaEm;
    this.atualizadaEm = atualizadaEm;
}
    async criar(){
    return prisma.noticias.create({
        data: {
            ordem: this.ordem,
            nome: this.nome,
            tipo: this.tipo,
            ondeAtua: this.ondeAtua,
            descricao: this.descricao,
            criadaEm: this.criadaEm,
            atualizadaEm: this.atualizadaEm,
            },
        })
    }
}