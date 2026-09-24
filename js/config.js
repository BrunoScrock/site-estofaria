/* ==========================================================================
   CONFIGURAÇÃO CENTRALIZADA — ESTOFARIA CAPITAL
   --------------------------------------------------------------------------
   Altere aqui as informações da empresa em um único lugar.
   ========================================================================== */

const CONFIG = {

  /* Nome e identidade ---------------------------------------------------- */
  empresa: "Estofaria Capital",
  logoNome: "E",
  subtitulo: "Reforma e Reparo de Estofados",
  tagline: "Reforma e Reparo de Estofados",
  slogan: "Renovamos seus estofados. Transformamos seus ambientes.",

  /* Contato -------------------------------------------------------------- */
  whatsapp: "",                // Formato: 55 + DDD + número (somente dígitos). Ex.: 5541999999999
  telefone: "[INSERIR TELEFONE]",
  email: "[INSERIR E-MAIL]",

  /* Localização ---------------------------------------------------------- */
  cidade: "[INSERIR CIDADE]",
  endereco: "[INSERIR ENDEREÇO]",
  atendimento: "[INSERIR CIDADES/REGIÕES ATENDIDAS]",
  mapaOpenStreetMap: "",          // URL de embed do OpenStreetMap (ex.: https://www.openstreetmap.org/export/embed.html?bbox=...&layer=mapnik&marker=...)
  mapaLinkGoogle: "",             // Link "Como chegar" no Google Maps (ex.: https://www.google.com/maps?q=...)

  /* Funcionamento -------------------------------------------------------- */
  horario: "[INSERIR HORÁRIO]",
  horarioResumo: "[INSERIR HORÁRIO]",

  /* Redes Sociais -------------------------------------------------------- */
  instagram: "[INSERIR INSTAGRAM]",

  /* Mensagens do WhatsApp ------------------------------------------------ */
  mensagemPadrao:
    "Olá, Estofaria Capital! Meu nome é [NOME] e gostaria de solicitar um orçamento.",

  mensagemFormulario:
    "Olá, Estofaria Capital! Gostaria de solicitar um orçamento."
};

/* ==========================================================================
   SERVIÇOS
   ========================================================================== */

const SERVICOS = [
  {
    id: "sofas",
    titulo: "Reforma de Sofás",
    descricao: "Renovação completa de estofados com acabamento de qualidade e conforto renovado.",
    icone: "sofa",
    detalhes: [
      "Substituição de espuma e estofamento",
      "Reparo estrutural quando necessário",
      "Escolha de tecido ou couro",
      "Acabamento profissional"
    ]
  },
  {
    id: "poltronas",
    titulo: "Reforma de Poltronas",
    descricao: "Recuperação e renovação de poltronas com atenção aos detalhes e acabamento impecável.",
    icone: "armchair",
    detalhes: [
      "Restauração do estofamento",
      "Reparo de estrutura e encaixes",
      "Novo revestimento sob medida",
      "Acabamento refinado"
    ]
  },
  {
    id: "cadeiras",
    titulo: "Reforma de Cadeiras",
    descricao: "Atualização de revestimento e acabamento para cadeiras de diversos estilos.",
    icone: "scan-line",
    detalhes: [
      "Troca de tecido ou couro",
      "Reparo de estrutura em madeira",
      "Revestimento personalizado",
      "Revisão de acabamento"
    ]
  },
  {
    id: "bancos",
    titulo: "Reforma de Bancos",
    descricao: "Recuperação de bancos e assentos com novo visual e conforto renovado.",
    icone: "square",
    detalhes: [
      "Novo estofamento sob medida",
      "Reparo estrutural",
      "Escolha de materiais",
      "Acabamento profissional"
    ]
  },
  {
    id: "tecido",
    titulo: "Troca de Tecido",
    descricao: "Substituição completa do revestimento conforme projeto e preferência do cliente.",
    icone: "scissors",
    detalhes: [
      "Amostras de tecidos disponíveis",
      "Corte e costura sob medida",
      "Diversas opções de cores e texturas",
      "Aplicação profissional"
    ]
  },
  {
    id: "restauracao",
    titulo: "Restauração",
    descricao: "Recuperação visual e estrutural para devolver o conforto e a beleza ao móvel.",
    icone: "sparkles",
    detalhes: [
      "Análise do estado do móvel",
      "Recuperação de espumas",
      "Reparo de costuras",
      "Tratamento do acabamento"
    ]
  }
];

/* ==========================================================================
   ANTES E DEPOIS — PROJETOS
   ========================================================================== */

const ANTES_DEPOIS = [
  {
    id: "projeto-01",
    titulo: "Reforma de Sofá",
    categoria: "Sofás",
    antes: "assets/images/antes-depois/projeto-01/antes.jpg",
    depois: "assets/images/antes-depois/projeto-01/depois.jpg",
    descricao: "Sofá com estofamento desgastado completamente renovado com novo tecido e espuma."
  },
  {
    id: "projeto-02",
    titulo: "Restauração de Poltrona",
    categoria: "Poltronas",
    antes: "assets/images/antes-depois/projeto-02/antes.jpg",
    depois: "assets/images/antes-depois/projeto-02/depois.jpg",
    descricao: "Poltrona antiga recuperada com novo revestimento e acabamento refinado."
  },
  {
    id: "projeto-03",
    titulo: "Reforma de Cadeira",
    categoria: "Cadeiras",
    antes: "assets/images/antes-depois/projeto-03/antes.jpg",
    depois: "assets/images/antes-depois/projeto-03/depois.jpg",
    descricao: "Cadeira com estofamento danificado transformada com novo tecido e acabamento."
  },
  {
    id: "projeto-04",
    titulo: "Reforma de Banco",
    categoria: "Bancos",
    antes: "assets/images/antes-depois/projeto-04/antes.jpg",
    depois: "assets/images/antes-depois/projeto-04/depois.jpg",
    descricao: "Banco renovado com novo estofamento e estrutura revisada."
  }
];

/* ==========================================================================
   PORTFÓLIO — TRABALHOS REALIZADOS
   ========================================================================== */

const PORTFOLIO = [
  {
    tag: "Sofás",
    titulo: "Reforma de Sofá 3 Lugares",
    descricao: "Renovação completa com novo tecido e espuma, devolvendo conforto e elegância ao móvel.",
    imagem: "assets/images/portfolio/sofa/projeto-01.jpg",
    imagens: [
      "assets/images/portfolio/sofa/projeto-01.jpg"
    ],
    categoria: "Sofás"
  },
  {
    tag: "Poltronas",
    titulo: "Restauração de Poltrona",
    descricao: "Poltrona clássica recuperada com acabamento refinado e novo revestimento.",
    imagem: "assets/images/portfolio/poltrona/projeto-01.jpg",
    imagens: [
      "assets/images/portfolio/poltrona/projeto-01.jpg"
    ],
    categoria: "Poltronas"
  },
  {
    tag: "Cadeiras",
    titulo: "Reforma de Cadeiras de Jantar",
    descricao: "Jogo de cadeiras renovado com novo tecido e acabamento profissional.",
    imagem: "assets/images/portfolio/cadeira/projeto-01.jpg",
    imagens: [
      "assets/images/portfolio/cadeira/projeto-01.jpg"
    ],
    categoria: "Cadeiras"
  },
  {
    tag: "Bancos",
    titulo: "Reforma de Banco",
    descricao: "Banco renovado com estofamento novo e estrutura completa revisada.",
    imagem: "assets/images/portfolio/banco/projeto-01.jpg",
    imagens: [
      "assets/images/portfolio/banco/projeto-01.jpg"
    ],
    categoria: "Bancos"
  }
];

/* ==========================================================================
   ETAPAS DO PROCESSO
   ========================================================================== */

const PROCESSO = [
  {
    numero: "01",
    titulo: "Avaliação",
    descricao: "Analisamos o móvel e identificamos o melhor serviço necessário para a renovação.",
    icone: "clipboard-list"
  },
  {
    numero: "02",
    titulo: "Escolha",
    descricao: "Defina o tecido, acabamento, cores e demais detalhes do projeto junto com você.",
    icone: "palette"
  },
  {
    numero: "03",
    titulo: "Preparação",
    descricao: "Preparamos o móvel para o processo de reforma com toda atenção e cuidado.",
    icone: "wrench"
  },
  {
    numero: "04",
    titulo: "Reforma",
    descricao: "Executamos o trabalho com precisão e técnica para garantir o melhor resultado.",
    icone: "scissors"
  },
  {
    numero: "05",
    titulo: "Acabamento",
    descricao: "Revisão detalhada de todos os pontos para assegurar qualidade impecável.",
    icone: "sparkles"
  },
  {
    numero: "06",
    titulo: "Entrega",
    descricao: "Seu móvel renovado e pronto para transformar seu ambiente novamente.",
    icone: "check-circle"
  }
];

/* ==========================================================================
   DIFERENCIAIS
   ========================================================================== */

const DIFERENCIAIS = [
  {
    titulo: "Acabamento Cuidadoso",
    descricao: "Cada detalhe é revisado para garantir um resultado impecável e duradouro.",
    icone: "sparkles"
  },
  {
    titulo: "Atendimento Personalizado",
    descricao: "Acompanhamento próximo em cada etapa, desde a avaliação até a entrega final.",
    icone: "user-check"
  },
  {
    titulo: "Atenção aos Detalhes",
    descricao: "Costuras, acabamentos e encaixes são trabalhados com precisão e esmero.",
    icone: "target"
  },
  {
    titulo: "Renovação de Móveis",
    descricao: "Transformamos móveis antigos ou desgastados em peças com visual renovado.",
    icone: "refresh-cw"
  },
  {
    titulo: "Qualidade no Serviço",
    descricao: "Utilizamos materiais de qualidade e técnicas adequadas para cada tipo de estofado.",
    icone: "shield-check"
  },
  {
    titulo: "Orientação na Escolha",
    descricao: "Orientamos na seleção do tecido, cor e acabamento ideal para o seu ambiente.",
    icone: "palette"
  },
  {
    titulo: "Compromisso com o Resultado",
    descricao: "Nosso objetivo é entregar um móvel renovado que supere suas expectativas.",
    icone: "heart"
  }
];
