// Seed do Portal de História
// Rodar com:  npm run seed   (ou: npx prisma db seed)
// O seed é idempotente: apaga os dados de conteúdo e recria tudo do zero.

import prisma from "../src/lib/prismaClient.js";

// ---------- PERÍODOS ----------
// Anos a.C. são negativos. anoFim null = período atual.
const periodos = [
  {
    categoria: "PRE_HISTORIA",
    anoInicio: -2500000,
    anoFim: -4000,
    figuraMarcante: "Luzia (fóssil humano mais antigo das Américas)",
  },
  {
    categoria: "ANTIGUIDADE",
    anoInicio: -4000,
    anoFim: 476,
    figuraMarcante: "Júlio César",
  },
  {
    categoria: "IDADE_MEDIA",
    anoInicio: 476,
    anoFim: 1453,
    figuraMarcante: "Carlos Magno",
  },
  {
    categoria: "IDADE_MODERNA",
    anoInicio: 1453,
    anoFim: 1789,
    figuraMarcante: "Leonardo da Vinci",
  },
  {
    categoria: "IDADE_CONTEMPORANEA",
    anoInicio: 1789,
    anoFim: null,
    figuraMarcante: "Napoleão Bonaparte",
  },
];

// ---------- NOTÍCIAS ----------
const noticias = [
  {
    titulo: "Como a escrita cuneiforme mudou a história da humanidade",
    categoria: "Antiguidade",
    linhaFina:
      "Criada pelos sumérios na Mesopotâmia, a escrita marcou a passagem da Pré-História para a Antiguidade.",
    corpo:
      "Por volta de 4000 a.C., os sumérios começaram a registrar informações em placas de argila usando estiletes em forma de cunha. " +
      "No início, os registros serviam para controlar estoques de grãos e animais, mas logo passaram a guardar leis, contratos e narrativas. " +
      "É por isso que muitos historiadores usam o surgimento da escrita como marco do fim da Pré-História.",
    autor: "Equipe Portal de História",
    publicadaEm: new Date("2026-11-01T10:00:00-03:00"),
  },
  {
    titulo: "A queda de Constantinopla e o início da Idade Moderna",
    categoria: "Idade Média",
    linhaFina:
      "Em 1453, a tomada da cidade pelos otomanos encerrou o Império Bizantino e mudou as rotas de comércio da Europa.",
    corpo:
      "Constantinopla era a capital do Império Romano do Oriente havia mais de mil anos. " +
      "Com a conquista otomana liderada por Maomé II, as rotas terrestres para o Oriente ficaram mais caras para os europeus, " +
      "o que incentivou portugueses e espanhóis a buscar caminhos pelo mar — dando início às Grandes Navegações.",
    autor: "Equipe Portal de História",
    publicadaEm: new Date("2026-11-08T10:00:00-03:00"),
  },
  {
    titulo: "Revolução Francesa: liberdade, igualdade e fraternidade",
    categoria: "Idade Contemporânea",
    linhaFina:
      "A tomada da Bastilha, em 1789, é o marco tradicional do início da Idade Contemporânea.",
    corpo:
      "A crise financeira da França, somada às ideias iluministas e à insatisfação do Terceiro Estado, levou à queda do Antigo Regime. " +
      "A Declaração dos Direitos do Homem e do Cidadão influenciou constituições do mundo todo, inclusive a brasileira.",
    autor: "Equipe Portal de História",
    publicadaEm: new Date("2026-11-15T10:00:00-03:00"),
  },
  {
    titulo: "Por que estudar a Pré-História brasileira?",
    categoria: "Pré-História",
    linhaFina:
      "Sítios arqueológicos como os da Serra da Capivara (PI) e de Lagoa Santa (MG) contam a história dos primeiros habitantes do Brasil.",
    corpo:
      "Pinturas rupestres, ferramentas de pedra e fósseis encontrados no território brasileiro ajudam a entender como os primeiros grupos humanos chegaram às Américas. " +
      "O Parque Nacional Serra da Capivara é Patrimônio Mundial da UNESCO e reúne uma das maiores concentrações de arte rupestre do continente.",
    autor: "Equipe Portal de História",
    publicadaEm: new Date("2026-11-22T10:00:00-03:00"),
  },
];

// ---------- CARREIRAS ----------
const carreiras = [
  {
    ordem: 1,
    titulo: "Professor(a) de História",
    descricao:
      "Ensina História na educação básica, prepara aulas, avalia os alunos e ajuda a desenvolver o pensamento crítico.",
    ondeAtua: "Escolas públicas e particulares, cursinhos pré-vestibular e plataformas de ensino online.",
  },
  {
    ordem: 2,
    titulo: "Historiador(a) / Pesquisador(a)",
    descricao:
      "Investiga fontes históricas (documentos, imagens, relatos orais) para produzir conhecimento sobre o passado.",
    ondeAtua: "Universidades, institutos de pesquisa, arquivos públicos e centros de documentação.",
  },
  {
    ordem: 3,
    titulo: "Arqueólogo(a)",
    descricao:
      "Estuda sociedades do passado a partir de vestígios materiais, como ferramentas, construções e sítios arqueológicos.",
    ondeAtua: "Museus, universidades, órgãos de patrimônio (como o IPHAN) e empresas de licenciamento ambiental.",
  },
  {
    ordem: 4,
    titulo: "Museólogo(a)",
    descricao:
      "Cuida da conservação, catalogação e exposição de acervos históricos e culturais.",
    ondeAtua: "Museus, galerias, centros culturais e acervos de empresas.",
  },
  {
    ordem: 5,
    titulo: "Arquivista",
    descricao:
      "Organiza, preserva e disponibiliza documentos de valor histórico ou administrativo.",
    ondeAtua: "Arquivos públicos, cartórios, empresas, tribunais e bibliotecas.",
  },
];

// ---------- CURSOS ----------
const cursos = [
  {
    ordem: 1,
    nome: "Licenciatura em História",
    descricao:
      "Forma professores para a educação básica. Combina disciplinas de História com didática e estágios em escolas.",
  },
  {
    ordem: 2,
    nome: "Bacharelado em História",
    descricao:
      "Voltado para a pesquisa histórica, trabalho em arquivos, museus e produção de conhecimento acadêmico.",
  },
  {
    ordem: 3,
    nome: "Arqueologia",
    descricao:
      "Estuda culturas antigas a partir de vestígios materiais, com bastante trabalho de campo e laboratório.",
  },
  {
    ordem: 4,
    nome: "Museologia",
    descricao:
      "Ensina a planejar exposições, conservar acervos e gerir instituições de memória.",
  },
  {
    ordem: 5,
    nome: "Arquivologia",
    descricao:
      "Foca na gestão, organização e preservação de documentos e informações.",
  },
];

// ---------- DICAS ----------
const dicas = [
  // COMO_ESTUDAR
  {
    tipo: "COMO_ESTUDAR",
    ordem: 1,
    nome: "Monte uma linha do tempo",
    descricao:
      "Organizar os fatos em ordem cronológica ajuda a entender causas e consequências, em vez de decorar datas soltas.",
  },
  {
    tipo: "COMO_ESTUDAR",
    ordem: 2,
    nome: "Faça mapas mentais",
    descricao:
      "Ligue personagens, eventos e conceitos de um mesmo período em um esquema visual para revisar mais rápido.",
  },
  {
    tipo: "COMO_ESTUDAR",
    ordem: 3,
    nome: "Estude em blocos curtos",
    descricao:
      "Sessões de 25 a 50 minutos com pequenas pausas mantêm a concentração por mais tempo.",
  },
  // APRENDIZAGEM
  {
    tipo: "APRENDIZAGEM",
    ordem: 1,
    nome: "Explique para alguém",
    descricao:
      "Ensinar o conteúdo para um colega (ou em voz alta) mostra rapidamente o que você ainda não entendeu.",
  },
  {
    tipo: "APRENDIZAGEM",
    ordem: 2,
    nome: "Relacione o passado com o presente",
    descricao:
      "Procure conexões entre o que você estuda e notícias atuais: isso dá sentido ao conteúdo e facilita lembrar.",
  },
  {
    tipo: "APRENDIZAGEM",
    ordem: 3,
    nome: "Use fontes variadas",
    descricao:
      "Filmes, documentários, podcasts e museus virtuais complementam o livro didático e fixam o conteúdo.",
  },
  // VESTIBULARES
  {
    tipo: "VESTIBULARES",
    ordem: 1,
    nome: "Resolva provas anteriores",
    descricao:
      "Treinar com questões antigas do Enem e dos vestibulares mostra o estilo da prova e os temas que mais caem.",
  },
  {
    tipo: "VESTIBULARES",
    ordem: 2,
    nome: "Leia o enunciado com atenção",
    descricao:
      "As questões de História costumam trazer textos e imagens; muitas vezes a resposta está na interpretação da fonte.",
  },
  {
    tipo: "VESTIBULARES",
    ordem: 3,
    nome: "Priorize História do Brasil",
    descricao:
      "Temas como Brasil Colônia, Era Vargas e Ditadura Militar aparecem com frequência nas provas.",
  },
];

// ---------- ESTÁGIO ----------
const estagios = [
  {
    ordem: 1,
    titulo: "Estágio obrigatório na licenciatura",
    descricao:
      "Nos cursos de licenciatura, o estágio supervisionado em escolas é obrigatório e acontece geralmente a partir da metade do curso.",
  },
  {
    ordem: 2,
    titulo: "Estágio em museus e arquivos",
    descricao:
      "Museus, arquivos públicos e centros de documentação oferecem vagas para quem quer trabalhar com acervos e pesquisa.",
  },
  {
    ordem: 3,
    titulo: "Iniciação científica",
    descricao:
      "Projetos de pesquisa com bolsa (como as do CNPq e da FAPESP) são uma ótima forma de ganhar experiência acadêmica.",
  },
  {
    ordem: 4,
    titulo: "Onde encontrar vagas",
    descricao:
      "Fique de olho no setor de estágios da sua faculdade, no CIEE e nos editais de prefeituras, museus e universidades.",
  },
];

// ---------- SIMULADO ----------
const simulados = [
  {
    enunciado:
      "Qual acontecimento é tradicionalmente usado como marco do fim da Pré-História e início da Antiguidade?",
    explicacao:
      "O surgimento da escrita, por volta de 4000 a.C. na Mesopotâmia, permitiu registros documentais e é o marco tradicional.",
    alternativas: [
      { letra: "A", texto: "O domínio do fogo", correta: false },
      { letra: "B", texto: "O surgimento da escrita", correta: true },
      { letra: "C", texto: "A invenção da roda", correta: false },
      { letra: "D", texto: "A queda do Império Romano", correta: false },
      { letra: "E", texto: "O início da agricultura", correta: false },
    ],
  },
  {
    enunciado:
      "A queda do Império Romano do Ocidente, em 476, marca o início de qual período histórico?",
    explicacao:
      "A deposição do último imperador romano do Ocidente, em 476, é o marco tradicional do início da Idade Média.",
    alternativas: [
      { letra: "A", texto: "Antiguidade", correta: false },
      { letra: "B", texto: "Idade Moderna", correta: false },
      { letra: "C", texto: "Idade Média", correta: true },
      { letra: "D", texto: "Idade Contemporânea", correta: false },
      { letra: "E", texto: "Pré-História", correta: false },
    ],
  },
  {
    enunciado:
      "A tomada de Constantinopla pelos turcos otomanos, em 1453, contribuiu diretamente para:",
    explicacao:
      "Com as rotas terrestres para o Oriente controladas pelos otomanos, os europeus passaram a buscar novos caminhos pelo mar.",
    alternativas: [
      { letra: "A", texto: "o fim do feudalismo na Inglaterra", correta: false },
      { letra: "B", texto: "o início das Grandes Navegações", correta: true },
      { letra: "C", texto: "a Revolução Industrial", correta: false },
      { letra: "D", texto: "a independência dos Estados Unidos", correta: false },
      { letra: "E", texto: "a unificação da Itália", correta: false },
    ],
  },
  {
    enunciado:
      "O lema “Liberdade, Igualdade e Fraternidade” está associado a qual movimento?",
    explicacao:
      "O lema ficou conhecido na Revolução Francesa (1789), influenciada pelas ideias iluministas.",
    alternativas: [
      { letra: "A", texto: "Revolução Russa", correta: false },
      { letra: "B", texto: "Reforma Protestante", correta: false },
      { letra: "C", texto: "Revolução Gloriosa", correta: false },
      { letra: "D", texto: "Revolução Francesa", correta: true },
      { letra: "E", texto: "Renascimento", correta: false },
    ],
  },
  {
    enunciado:
      "O Parque Nacional Serra da Capivara, no Piauí, é conhecido principalmente por:",
    explicacao:
      "O parque reúne uma das maiores concentrações de pinturas rupestres das Américas e é Patrimônio Mundial da UNESCO.",
    alternativas: [
      { letra: "A", texto: "suas pinturas rupestres pré-históricas", correta: true },
      { letra: "B", texto: "ruínas de cidades incas", correta: false },
      { letra: "C", texto: "fortes construídos pelos holandeses", correta: false },
      { letra: "D", texto: "igrejas barrocas do século XVIII", correta: false },
      { letra: "E", texto: "ser a primeira capital do Brasil", correta: false },
    ],
  },
];

// ---------- VÍDEOS ----------
// URLs de busca no YouTube (sempre funcionam). Troque pelos links dos vídeos escolhidos pela equipe.
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

const videos = [
  {
    titulo: "Pré-História: Paleolítico e Neolítico",
    categoria: "Pré-História",
    descricao: "Resumo dos períodos da Pré-História e da Revolução Agrícola.",
    url: yt("pré-história paleolítico neolítico resumo"),
    fonte: "YouTube",
  },
  {
    titulo: "Mesopotâmia e o surgimento da escrita",
    categoria: "Antiguidade",
    descricao: "Como os sumérios criaram a escrita cuneiforme.",
    url: yt("mesopotâmia escrita cuneiforme aula"),
    fonte: "YouTube",
  },
  {
    titulo: "Feudalismo na Idade Média",
    categoria: "Idade Média",
    descricao: "Sociedade, economia e política no sistema feudal.",
    url: yt("feudalismo idade média resumo"),
    fonte: "YouTube",
  },
  {
    titulo: "Grandes Navegações",
    categoria: "Idade Moderna",
    descricao: "Portugal, Espanha e a expansão marítima europeia.",
    url: yt("grandes navegações resumo enem"),
    fonte: "YouTube",
  },
  {
    titulo: "Revolução Francesa",
    categoria: "Idade Contemporânea",
    descricao: "Causas, fases e consequências da Revolução Francesa.",
    url: yt("revolução francesa resumo enem"),
    fonte: "YouTube",
  },
];

// ---------- INTEGRANTES ----------
// Dados de exemplo — troque pelos nomes e cargos reais da equipe.
const integrantes = [
  {
    nome: "Integrante 1",
    cargo: "Desenvolvedor Back-end",
    descricaoCargo: "Responsável pela API, banco de dados e integração com o front-end.",
  },
  {
    nome: "Integrante 2",
    cargo: "Desenvolvedor Front-end",
    descricaoCargo: "Responsável pelas telas, componentes e consumo da API.",
  },
  {
    nome: "Integrante 3",
    cargo: "Designer UI/UX",
    descricaoCargo: "Responsável pelo protótipo, identidade visual e experiência do usuário.",
  },
  {
    nome: "Integrante 4",
    cargo: "Pesquisador de Conteúdo",
    descricaoCargo: "Responsável pela pesquisa e revisão dos textos históricos do portal.",
  },
];

async function main() {
  console.log("🌱 Limpando tabelas...");
  // Alternativa é apagada em cascata junto com Simulado
  await prisma.simulado.deleteMany();
  await prisma.noticias.deleteMany();
  await prisma.carreira.deleteMany();
  await prisma.cursos.deleteMany();
  await prisma.dicas.deleteMany();
  await prisma.estagio.deleteMany();
  await prisma.video.deleteMany();
  await prisma.integrante.deleteMany();

  console.log("🌱 Inserindo períodos...");
  for (const p of periodos) {
    await prisma.periodo.upsert({
      where: { categoria: p.categoria },
      update: p,
      create: p,
    });
  }

  console.log("🌱 Inserindo conteúdo...");
  await prisma.noticias.createMany({ data: noticias });
  await prisma.carreira.createMany({ data: carreiras });
  await prisma.cursos.createMany({ data: cursos });
  await prisma.dicas.createMany({ data: dicas });
  await prisma.estagio.createMany({ data: estagios });
  await prisma.video.createMany({ data: videos });
  await prisma.integrante.createMany({ data: integrantes });

  console.log("🌱 Inserindo simulado...");
  for (const { alternativas, ...questao } of simulados) {
    await prisma.simulado.create({
      data: { ...questao, alternativa: { create: alternativas } },
    });
  }

  const [nPer, nNot, nSim, nAlt] = await Promise.all([
    prisma.periodo.count(),
    prisma.noticias.count(),
    prisma.simulado.count(),
    prisma.alternativa.count(),
  ]);
  console.log(
    `✅ Seed concluído: ${nPer} períodos, ${nNot} notícias, ${carreiras.length} carreiras, ${cursos.length} cursos, ` +
      `${dicas.length} dicas, ${estagios.length} estágios, ${nSim} questões (${nAlt} alternativas), ` +
      `${videos.length} vídeos, ${integrantes.length} integrantes.`
  );
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });