-- CreateEnum
CREATE TYPE "CategoriaPeriodo" AS ENUM ('PRE_HISTORIA', 'ANTIGUIDADE', 'IDADE_MEDIA', 'IDADE_MODERNA', 'IDADE_CONTEMPORANEA');

-- CreateEnum
CREATE TYPE "TipoDica" AS ENUM ('COMO_ESTUDAR', 'APRENDIZAGEM', 'VESTIBULARES');

-- CreateTable
CREATE TABLE "periodos" (
    "id" SERIAL NOT NULL,
    "categoria" "CategoriaPeriodo" NOT NULL,
    "ano_inicio" INTEGER NOT NULL,
    "ano_fim" INTEGER,
    "figura_marcante" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periodos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticias" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "linha_fina" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "foto_url" TEXT,
    "publicada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carreiras" (
    "id" SERIAL NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "onde_atua" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carreiras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dicas" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoDica" NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estagios" (
    "id" SERIAL NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estagios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulados" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "explicacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternativas" (
    "id" SERIAL NOT NULL,
    "letra" CHAR(1) NOT NULL,
    "texto" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL DEFAULT false,
    "simulado_id" INTEGER NOT NULL,

    CONSTRAINT "alternativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT,
    "url" TEXT NOT NULL,
    "fonte" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrantes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "descricao_cargo" TEXT NOT NULL,
    "foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "periodos_categoria_key" ON "periodos"("categoria");

-- CreateIndex
CREATE INDEX "noticias_publicada_em_idx" ON "noticias"("publicada_em");

-- CreateIndex
CREATE INDEX "carreiras_ordem_idx" ON "carreiras"("ordem");

-- CreateIndex
CREATE INDEX "cursos_ordem_idx" ON "cursos"("ordem");

-- CreateIndex
CREATE INDEX "dicas_tipo_ordem_idx" ON "dicas"("tipo", "ordem");

-- CreateIndex
CREATE INDEX "estagios_ordem_idx" ON "estagios"("ordem");

-- CreateIndex
CREATE INDEX "alternativas_simulado_id_idx" ON "alternativas"("simulado_id");

-- CreateIndex
CREATE UNIQUE INDEX "alternativas_simulado_id_letra_key" ON "alternativas"("simulado_id", "letra");

-- AddForeignKey
ALTER TABLE "alternativas" ADD CONSTRAINT "alternativas_simulado_id_fkey" FOREIGN KEY ("simulado_id") REFERENCES "simulados"("id") ON DELETE CASCADE ON UPDATE CASCADE;
