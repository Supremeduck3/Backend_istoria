import prisma from "@prisma/client";

export default class noticiasModels{
    constructor({
        id=null,
        titulo,
        slug,
        resumo,
        conteudo,
        imagemUrl,
        publicadaEm,
        ativa,
        destaque,
        temaId,
        criadaEm,
        atualizadaEm
    }={}){
        this.id =id;
        this.titulo = titulo;
        this.slug = slug;
        this.resumo = resumo;
        this.conteudo = conteudo;
        this.imagemUrl = imagemUrl;
        this.publicadaEm = publicadaEm;
        this.ativa = ativa;
        this.destaque = destaque;
        this.temaId = temaId;
        this.criadaEm = criadaEm;
        this.atualizadaEm = atualizadaEm;
    }
    async criar(){
        return prisma.noticias.create({
            data:{
                titulo : this.titulo,
                slug :this.slug,
                resumo : this.resumo,
                conteudo : this.conteudo,
                imagemUrl : this.imagemUrl,
                publicadaEm : this.publicadaEm,
                ativa : this.ativa,
                destaque : this.destaque,
                temaId : this.temaId,
                criadaEm : this.criadaEm, 
                atualizadaEm : this.atualizadaEm,
            },
        })
    }
}