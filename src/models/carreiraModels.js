import prisma from "@prisma/client";

export default class carreiraModel{
    constructor({
    id=null,
    ordem,
    titulo,
    descricao,
    ondeAtua,
    criadaEm,
    atualizadaEm
} = {}){
    this.id = id;
    this.ordem = ordem;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ondeAtua = ondeAtua;
    this.destaque = destaque;
    this.temaId = temaId;
    this.criadaEm = criadaEm;
    this.atualizadaEm = atualizadaEm;
}
    async criar(){
    return prisma.noticias.create({
        data: {
            ordem: this.ordem,
            titulo: this.titulo,
            descricao: this.descricao,
            ondeAtua: this.ondeAtua,
            criadaEm: this.criadaEm,
            atualizadaEm: this.atualizadaEm,
            },
        })
    }
}