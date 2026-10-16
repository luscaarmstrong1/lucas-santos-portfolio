export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/lucasssantos1/',
  github: 'https://github.com/luscaarmstrong1',
} as const;

export const SITE = {
  name: 'LUCAS SANTOS',
  shortName: 'Lucas Santos',
  fullName: 'Lucas Silva Santos',
  role: 'Engenheiro Eletricista',
  secondaryRole: 'Gerente de Projetos',
  headline: 'Engenheiro Eletricista | Gerente de Projetos | Energia, Dados & Automação',
  positioning:
    'Engenharia aplicada, inteligência de dados e tecnologia para transformar desafios complexos em soluções reais.',
  heroTitlePrimary: 'LUCAS',
  heroTitleSecondary: 'SANTOS',
  heroHeadline: 'Engenharia, dados e tecnologia.',
  heroSubheadline:
    'Transformando desafios técnicos e operacionais em soluções inteligentes, com engenharia aplicada, análise de dados e automação.',
  heroDomains: 'Energia • Dados • Inteligência Artificial',
  marqueeText: 'Engenharia • Inteligência • Automação • Resultados',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lucassantos.eng.br',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'lucas.silva.santos.eng@gmail.com',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535999528858',
  whatsappDisplay: '(35) 99952-8858',
  location: 'São João da Boa Vista, SP • Itajubá, MG',
  coverage: 'Atuação nacional remota e presencial',
  metrics: [
    {
      value: '100+',
      label: 'projetos homologados',
      detail: 'Liderança e responsabilidade técnica em micro e minigeração distribuída',
    },
    {
      value: '500+',
      label: 'projetos reanalisados',
      detail: 'Reanálise técnico-regulatória, pareceres de acesso e inversão de fluxo',
    },
    {
      value: '~80 MWp',
      label: 'analisados em estudos',
      detail: 'Aproximadamente 80 MWp analisados em estudos técnico-regulatórios',
    },
  ],
  about: {
    title: 'Resolver problemas é o que move minha engenharia.',
    paragraphs: [
      'Sou Lucas Silva Santos, engenheiro eletricista e gerente de projetos, com experiência em energia solar, geração distribuída, regulação do setor elétrico e gestão de operações.',
      'Minha trajetória evoluiu da engenharia de produto e monitoramento IoT para a liderança de projetos e a análise técnico-regulatória de sistemas elétricos.',
      'Ao longo desse caminho, ampliei minha atuação em Python, dados, inteligência artificial e automação, desenvolvendo soluções que conectam engenharia, processos e tecnologia.',
      'Meu foco é aplicar conhecimento técnico para estruturar soluções consistentes, melhorar processos e apoiar decisões.',
    ],
  },
  ctas: {
    headerPrimary: 'Ver projetos',
    heroPrimary: 'Explorar meus projetos',
    heroSecondary: 'Conectar no LinkedIn',
    featuredProject: 'Explorar projeto no GitHub',
    finalLinkedin: 'Conectar no LinkedIn',
    finalGithub: 'Explorar GitHub',
    finalContact: 'Entrar em contato',
  },
  seo: {
    title: 'Lucas Santos | Engenharia Elétrica, Energia, Dados e Automação',
    description:
      'Portfólio de Lucas Silva Santos. Engenharia elétrica, energia solar, geração distribuída, regulação, inteligência de dados, automação e projetos de tecnologia.',
  },
  nome: 'Lucas Santos',
  nomeCompleto: 'Lucas Silva Santos',
  cargo: 'Engenheiro Eletricista | Gerente de Projetos',
  descricao:
    'Portfólio de Lucas Silva Santos com foco em engenharia elétrica, energia solar, regulação técnica, ciência de dados, inteligência artificial, automação e desenvolvimento de aplicações.',
  linkedin: SOCIAL_LINKS.linkedin,
  linkedinHandle: 'in/lucasssantos1',
  github: SOCIAL_LINKS.github,
  githubHandle: '@luscaarmstrong1',
  contato: '/contato/',
  avaliacao: '/contato/',
  api: '',
} as const;

export function linkWhatsApp(mensagem?: string): string {
  const texto =
    mensagem ||
    'Olá, Lucas! Vi seu portfólio de Engenharia, Dados e Automação e gostaria de conversar sobre um projeto.';
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(texto)}`;
}

export function linkEmail(assunto?: string, corpo?: string): string {
  const s = encodeURIComponent(assunto || 'Contato via Portfólio: Lucas Santos');
  const b = encodeURIComponent(
    corpo || 'Olá, Lucas!\n\nVi seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.\n'
  );
  return `mailto:${SITE.email}?subject=${s}&body=${b}`;
}

export const linkContatoEmail = linkEmail;

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  details: string;
}

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Engenharia Elétrica',
    institution: 'FEPI (Centro Universitário de Itajubá)',
    period: 'Concluído em Jul/2025',
    status: 'Graduado',
    details:
      'TCC em dispositivo de medição inteligente IoT para sistemas fotovoltaicos e Iniciação Científica em automação com CLP.',
  },
  {
    degree: 'Pós-graduação em Energia Solar Fotovoltaica',
    institution: 'UNINTER',
    period: 'Concluída em Mar/2026',
    status: 'Especialista',
    details:
      'Sistemas fotovoltaicos, geração distribuída, subestações BT/MT, estudos de proteção e conformidade regulatória.',
  },
  {
    degree: 'Pós-graduação em Ciência de Dados e Inteligência Artificial',
    institution: 'UNINTER',
    period: 'Set/2025 a Em andamento',
    status: 'Em andamento',
    details:
      'Modelagem analítica, aprendizado de máquina, engenharia de dados, simulações e automação inteligente.',
  },
];

export interface SpecialtyBlock {
  id: string;
  indexLabel: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export const SPECIALTIES: SpecialtyBlock[] = [
  {
    id: 'engenharia-energia',
    indexLabel: '01',
    category: 'ENGENHARIA & ENERGIA',
    title: 'Energia com fundamento técnico.',
    description:
      'Projetos elétricos, geração distribuída, energia solar, sistemas de potência, estudos de conexão, análises de redes, subestações, proteção e infraestrutura de recarga.',
    image: '/assets/images/solar-engineering.webp',
    imageAlt: 'Infraestrutura de engenharia solar fotovoltaica e sistemas de potência',
    highlights: ['Geração Distribuída (GD/MMGD)', 'Sistemas BT/MT & Subestações', 'Eletromobilidade AC/DC'],
  },
  {
    id: 'regulacao-consultoria',
    indexLabel: '02',
    category: 'REGULAÇÃO & CONSULTORIA',
    title: 'Análise técnica para decisões fundamentadas.',
    description:
      'Regulação ANEEL/PRODIST, negativas de conexão, inversão de fluxo, pareceres técnicos, análises de concessionárias, suporte técnico-jurídico e estudos regulatórios.',
    image: '/assets/images/power-systems.webp',
    imageAlt: 'Análise regulatória ANEEL PRODIST e estudos de conexão à rede elétrica',
    highlights: ['ANEEL & PRODIST Módulo 3', 'Reversão de Inversão de Fluxo', 'Assistência Técnica & Pericial'],
  },
  {
    id: 'dados-ia',
    indexLabel: '03',
    category: 'DADOS & INTELIGÊNCIA ARTIFICIAL',
    title: 'Dados que apoiam decisões.',
    description:
      'Python, análise de dados, dashboards, Business Intelligence, modelagem analítica, simulações, inteligência artificial e soluções de apoio à decisão.',
    image: '/assets/images/data-intelligence.webp',
    imageAlt: 'Dashboards analíticos, modelos em Python e inteligência de dados energéticos',
    highlights: ['Python, SQL & Power BI', 'Modelagem Técnico-Econômica', 'Machine Learning Aplicado'],
  },
  {
    id: 'automacao-solucoes',
    indexLabel: '04',
    category: 'AUTOMAÇÃO & SOLUÇÕES DIGITAIS',
    title: 'Menos tarefas repetitivas. Mais capacidade de execução.',
    description:
      'Automação de processos, APIs, monitoramento, IoT, desenvolvimento de aplicações, integrações, sistemas de gestão e ferramentas digitais.',
    image: '/assets/images/ai-automation.webp',
    imageAlt: 'Arquitetura de automação, integrações via API, IoT e plataformas digitais',
    highlights: ['APIs REST & Apps Script', 'Telemetria & Dispositivos IoT', 'Aplicações Web & Produtos Digitais'],
  },
];

export const COMPLEMENTARY_AREAS = {
  title: 'Da engenharia de campo ao ambiente digital.',
  pillars: ['Projetos técnicos.', 'Soluções digitais.', 'Dados e automação.', 'Gestão e negócios.'],
  areas: [
    {
      title: 'Eletromobilidade',
      detail: 'Dimensionamento e viabilização de eletropostos AC/DC, análise de demanda e modelos de operação.',
    },
    {
      title: 'Monitoramento e IoT',
      detail: 'Aquisição de dados, calibração de sensores, plataformas de telemetria e diagnóstico remoto de usinas.',
    },
    {
      title: 'Gestão de operações',
      detail: 'Liderança de carteira de projetos, padronização de processos, indicadores operacionais e melhoria contínua.',
    },
    {
      title: 'Viabilidade técnico-econômica',
      detail: 'Modelagem de CAPEX/OPEX, fluxo de caixa descontado, VPL, TIR, payback, LCOE/LCOS e análise de cenários.',
    },
    {
      title: 'Engenharia de produto',
      detail: 'Testes funcionais, controle de qualidade, documentação técnica e integração entre hardware e software.',
    },
    {
      title: 'Inteligência comercial',
      detail: 'Benchmarking técnico de equipamentos, estruturação de bases B2B e automação de funis operacionais.',
    },
    {
      title: 'Desenvolvimento de websites e plataformas',
      detail: 'Arquitetura de aplicações web em React, Next.js, TypeScript e Streamlit orientadas a performance e clareza.',
    },
  ],
} as const;

export interface ComparisonRow {
  isolated: string;
  integrated: string;
}

export const COMPARISON_ITEMS: ComparisonRow[] = [
  {
    isolated: 'Visão de uma única disciplina',
    integrated: 'Integração entre engenharia, dados e operações',
  },
  {
    isolated: 'Análise pontual',
    integrated: 'Diagnóstico estruturado',
  },
  {
    isolated: 'Informações fragmentadas',
    integrated: 'Dados organizados e rastreáveis',
  },
  {
    isolated: 'Processos repetitivos',
    integrated: 'Oportunidades de automação',
  },
  {
    isolated: 'Decisões sem simulação',
    integrated: 'Análise de cenários e viabilidade',
  },
  {
    isolated: 'Entrega desconectada',
    integrated: 'Documentação e acompanhamento',
  },
  {
    isolated: 'Ferramentas independentes',
    integrated: 'Integrações entre sistemas',
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  projectType: 'Demonstrativo Analítico' | 'Produto Digital' | 'Presença Digital Técnica' | 'Empreendedorismo & Operação';
  description: string;
  syntheticNote?: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  metricsBadge: string;
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'digital-twin-solar-bess',
    title: 'Digital Twin Solar & BESS',
    category: 'Engenharia • Energia • Python',
    projectType: 'Demonstrativo Analítico',
    description:
      'Plataforma analítica de gêmeo digital fotovoltaico, desempenho energético, monitoramento, diagnóstico operacional, armazenamento por baterias (BESS) e análise de cenários.',
    syntheticNote: 'Caráter demonstrativo e analítico com dados sintéticos classificados e cálculos reproduzíveis.',
    technologies: ['Python', 'pvlib', 'Pandas', 'FastAPI', 'Streamlit', 'BESS Optimization'],
    githubUrl: 'https://github.com/luscaarmstrong1/solar-pv-digital-twin-bess-platform',
    image: '/assets/images/projects/proj-01-digital-twin.webp',
    metricsBadge: '1.20 MWp • BESS 250 kW / 750 kWh',
  },
  {
    id: 'energy-intelligence-ai',
    title: 'Energy Intelligence AI',
    category: 'Dados • IA • Energia',
    projectType: 'Demonstrativo Analítico',
    description:
      'Plataforma demonstrativa de inteligência energética integrando engenharia de dados, aprendizado de máquina (previsão de carga e geração, detecção de anomalias), análise operacional, APIs e visualização.',
    syntheticNote: 'Ambiente demonstrativo sobre base sintética horária estruturada (Data Warehouse SQLite/Parquet).',
    technologies: ['Python', 'Scikit-Learn', 'FastAPI', 'Streamlit', 'SQLite', 'MLOps'],
    githubUrl: 'https://github.com/luscaarmstrong1/energy-intelligence-ai-platform',
    demoUrl: 'https://luscaarmstrong1.github.io/energy-intelligence-ai-platform/',
    image: '/assets/images/projects/proj-02-energy-ai.webp',
    metricsBadge: 'Forecasting • Anomaly Detection • API',
  },
  {
    id: 'brazilian-power-system-dashboard',
    title: 'Dashboard do Sistema Elétrico Brasileiro',
    category: 'Python • Dados • Sistemas Elétricos',
    projectType: 'Demonstrativo Analítico',
    description:
      'Plataforma analítica do setor elétrico brasileiro, estruturada para explorar capacidade instalada (SIGA/ANEEL), geração e carga do SIN (ONS), expansão renovável e geração distribuída (MMGD).',
    technologies: ['Python', 'Power BI', 'DAX', 'Streamlit', 'Dados ANEEL/ONS', 'Modelagem Dimensional'],
    githubUrl: 'https://github.com/luscaarmstrong1/brazilian-power-system-dashboard',
    image: '/assets/images/projects/proj-03-power-dashboard.webp',
    metricsBadge: 'SIN & ANEEL • Capacidade, Carga & MMGD',
  },
  {
    id: 'prospecta-nicho',
    title: 'Prospecta Nicho',
    category: 'Tecnologia • Inteligência Comercial • Automação',
    projectType: 'Produto Digital',
    description:
      'Plataforma digital para prospecção empresarial e organização de dados B2B, com automação de enriquecimento, segmentação por nicho, integrações e fluxos operacionais.',
    technologies: ['TypeScript', 'Next.js', 'Python', 'Automação B2B', 'Data Pipelines'],
    githubUrl: 'https://github.com/luscaarmstrong1/prospecta-nicho',
    image: '/assets/images/projects/proj-04-prospecta-nicho.webp',
    metricsBadge: 'Inteligência Comercial • Dados B2B',
  },
  {
    id: 'conexium-engenharia',
    title: 'Conexium Engenharia',
    category: 'Engenharia • Desenvolvimento Web',
    projectType: 'Presença Digital Técnica',
    description:
      'Projeto de presença digital especializado em engenharia elétrica, consultoria técnico-regulatória, estudos de conexão e assistência técnica pericial.',
    technologies: ['Astro', 'TypeScript', 'UI/UX Editorial', 'SEO Técnico', 'Engenharia Regulatória'],
    githubUrl: 'https://github.com/luscaarmstrong1/conexium-engenharia',
    image: '/assets/images/projects/proj-05-conexium.webp',
    metricsBadge: 'Consultoria Regulatória & Perícias',
  },
  {
    id: 'omega-imports',
    title: 'Omega Imports',
    category: 'Empreendedorismo • E-commerce • Automação',
    projectType: 'Empreendedorismo & Operação',
    description:
      'Operação digital de componentes eletrônicos, IoT e automação, fundada e gerida por mim, com catálogo web próprio, integração com marketplace, gestão de estoque e inteligência comercial.',
    technologies: ['Gestão de Operações', 'IoT & Hardware', 'Automação Comercial', 'Catálogo Digital', 'Marketplace'],
    githubUrl: 'https://github.com/luscaarmstrong1/omegaimports-catalogo',
    image: '/assets/images/projects/proj-06-omega-imports.webp',
    metricsBadge: 'Fundação & Gestão • Eletrônica & IoT',
  },
  {
    id: 'solar-energy-feasibility-simulator',
    title: 'Simulador de Energia Solar',
    category: 'Engenharia • Finanças • Simulação',
    projectType: 'Demonstrativo Analítico',
    description:
      'Modelagem técnico-econômica de sistemas fotovoltaicos em horizonte de 25 anos, com dimensionamento por HSP/PR, degradação anual, fluxo de caixa descontado, VPL, TIR, payback e LCOE.',
    syntheticNote: 'Simulador analítico com premissas tarifárias e financeiras editáveis.',
    technologies: ['Python', 'Streamlit', 'Excel Automatizado', 'Engenharia Econômica', 'VPL / TIR / LCOE'],
    githubUrl: 'https://github.com/luscaarmstrong1/solar-energy-feasibility-simulator',
    image: '/assets/images/projects/proj-07-solar-simulator.webp',
    metricsBadge: 'Modelagem 25 Anos • VPL, TIR & LCOE',
  },
  {
    id: 'mercado-livre-energia-simulador',
    title: 'Simulador do Mercado Livre de Energia',
    category: 'Energia • Economia • Python',
    projectType: 'Demonstrativo Analítico',
    description:
      'Ferramenta de análise de migração do Ambiente de Contratação Regulada (ACR) ao Ambiente de Contratação Livre (ACL), com memória de cálculo auditável, break-even e análise de risco.',
    syntheticNote: 'Estudo demonstrativo baseado em premissas configuráveis de tarifas e contratos.',
    technologies: ['Python', 'Streamlit', 'Excel', 'Regulação CCEE/ANEEL', 'Análise de Cenários'],
    githubUrl: 'https://github.com/luscaarmstrong1/mercado-livre-energia-simulador',
    image: '/assets/images/projects/proj-08-mercado-livre.webp',
    metricsBadge: 'ACR vs ACL • Break-Even & Sensibilidade',
  },
  {
    id: 'green-hydrogen-simulator',
    title: 'Hidrogênio Verde',
    category: 'Energia • Modelagem • Python',
    projectType: 'Demonstrativo Analítico',
    description:
      'Simulador técnico-econômico para produção de hidrogênio verde, integrando geração solar e eólica horária, eletrólise (PEM, Alcalino, SOEC), armazenamento BESS, balanço energético e LCOH.',
    syntheticNote: 'Modelagem técnico-econômica demonstrativa validada por suíte automatizada de testes.',
    technologies: ['Python', 'BESS Dispatch', 'Eletrólise PEM', 'LCOH', 'Streamlit', 'Pytest'],
    githubUrl: 'https://github.com/luscaarmstrong1/green-hydrogen-techno-economic-simulator',
    image: '/assets/images/projects/proj-09-green-hydrogen.webp',
    metricsBadge: 'Solar + Eólica + BESS • Cálculo de LCOH',
  },
];

export interface InteractiveStage {
  id: string;
  stepLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  metrics: string;
  image: string;
  imageAlt: string;
}

export const INTERACTIVE_SHOWCASE = {
  sectionTitle: 'Um projeto. Múltiplas camadas de engenharia.',
  sectionSubtitle: 'Do modelo ao diagnóstico. Da análise à decisão.',
  projectName: 'Solar PV Digital Twin & BESS Optimization Platform',
  githubUrl: 'https://github.com/luscaarmstrong1/solar-pv-digital-twin-bess-platform',
  ctaLabel: 'Explorar projeto no GitHub',
  disclaimer:
    'Plataforma analítica e demonstrativa de portfólio baseada em modelagem física reproduzível e séries sintéticas auditáveis.',
  stages: [
    {
      id: 'modelagem',
      stepLabel: 'ETAPA 1: MODELAGEM',
      titleLine1: 'Modelagem',
      titleLine2: 'Física FV',
      subtitle: 'ETAPA 01 • PARÂMETROS E GERAÇÃO ESPERADA',
      description:
        'Representação física dos componentes de uma planta fotovoltaica de 1,20 MWp, integrando recurso solar, temperatura de célula, eficiência de inversores, clipping e parâmetros nominais de operação.',
      metrics: '1,20 MWp • Modelagem Horária & Curvas de Potência',
      image: '/assets/images/stages/stage-01-modelagem.webp',
      imageAlt: 'Etapa 1: Modelagem física do sistema fotovoltaico e fluxo energético',
    },
    {
      id: 'analise-dados',
      stepLabel: 'ETAPA 2: ANÁLISE DE DADOS',
      titleLine1: 'Análise de',
      titleLine2: 'Dados & Twin',
      subtitle: 'ETAPA 02 • ESPERADO VS OBSERVADO',
      description:
        'Organização de séries temporais horárias, consolidação de indicadores de Performance Ratio (PR) e comparação contínua entre o comportamento esperado pelo modelo físico e a geração observada.',
      metrics: 'Digital Twin • Rastreabilidade de Séries Horárias',
      image: '/assets/images/stages/stage-02-analise.webp',
      imageAlt: 'Etapa 2: Comparação entre geração esperada e observada no Digital Twin',
    },
    {
      id: 'diagnostico',
      stepLabel: 'ETAPA 3: DIAGNÓSTICO',
      titleLine1: 'Diagnóstico',
      titleLine2: '& Perdas',
      subtitle: 'ETAPA 03 • DESEMPENHO, FALHAS E O&M',
      description:
        'Avaliação estruturada de desempenho com decomposição da árvore de perdas (temperatura, sujeira, degradação, clipping, curtailment e indisponibilidade) e detecção de desvios operacionais para O&M.',
      metrics: 'Árvore de Perdas • Triagem de Anomalias e O&M',
      image: '/assets/images/stages/stage-03-diagnostico.webp',
      imageAlt: 'Etapa 3: Árvore de perdas e diagnóstico operacional da usina',
    },
    {
      id: 'otimizacao',
      stepLabel: 'ETAPA 4: OTIMIZAÇÃO',
      titleLine1: 'Otimização',
      titleLine2: 'BESS & LCOS',
      subtitle: 'ETAPA 04 • ARMAZENAMENTO E DECISÃO ECONÔMICA',
      description:
        'Simulação de armazenamento por baterias (BESS 250 kW / 750 kWh) com controle de estado de carga (SOC), arbitragem tarifária, redução de ponta, análise de LCOS e sensibilidade financeira.',
      metrics: 'BESS 250 kW / 750 kWh • Despacho, LCOS & VPL',
      image: '/assets/images/stages/stage-04-otimizacao.webp',
      imageAlt: 'Etapa 4: Otimização de despacho BESS e viabilidade técnico-econômica',
    },
  ] as InteractiveStage[],
} as const;

export interface ExperienceItem {
  company: string;
  location: string;
  currentRole: string;
  previousRole?: string;
  period: string;
  summary: string;
  highlights: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'RENOVERA',
    location: 'São João da Boa Vista, SP',
    currentRole: 'Gerente de Projetos (Set/2025 a Presente)',
    previousRole: 'Anteriormente: Analista de Projetos e Equipamentos (Out/2024 a Set/2025)',
    period: 'Out/2024 a Presente',
    summary:
      'Liderança de engenharia, homologação de carteira nacional de projetos fotovoltaicos, responsabilidade técnica, consultoria técnico-regulatória e transformação digital da operação.',
    highlights: [
      'Gestão de carteira com mais de 100 projetos homologados em micro e minigeração distribuída, BT/MT, subestações e estudos de proteção.',
      'Reanálise técnico-regulatória de mais de 500 projetos (~80 MWp analisados), atuando em negativas de conexão, inversão de fluxo e conformidade ANEEL/PRODIST.',
      'Responsabilidade Técnica (ART), suporte técnico-jurídico, quesitos periciais, pareceres técnicos e estudos de viabilidade de eletropostos AC/DC.',
      'Implantação de CRM, dashboards em Power BI, automações com Apps Script, Python e ferramentas de IA para controle de prazos e rastreabilidade.',
    ],
  },
  {
    company: 'OMEGA IMPORTS',
    location: 'Operação Digital & Marketplace',
    currentRole: 'Fundador e Gestor de Operações',
    previousRole: 'Iniciativa Empreendedora: E-commerce de Tecnologia & Automação',
    period: 'Dez/2024 a Atual',
    summary:
      'Iniciativa empreendedora voltada à comercialização de componentes eletrônicos, dispositivos IoT, sensores e equipamentos de automação.',
    highlights: [
      'Estruturação completa da operação comercial, curadoria técnica de produtos, importação, precificação, controle de estoque e logística em marketplace.',
      'Desenvolvimento de catálogo digital próprio e automações operacionais em Python para análise de margens, monitoramento de concorrência e reposição.',
      'Gestão de carteira de dispositivos eletrônicos, sensores IoT e módulos de automação, garantindo suporte técnico especializado e alta avaliação de clientes.',
      'Implementação de pipelines de dados integrando APIs de vendas, processamento de pedidos e conciliação financeira com rastreabilidade total.',
    ],
  },
  {
    company: 'SOL PLACE',
    location: 'Itajubá, MG',
    currentRole: 'Analista de Projetos e Sistemas Fotovoltaicos (Dez/2023 a Fev/2025)',
    previousRole: 'Anteriormente: Estagiário em Engenharia Eletrônica (Set/2023 a Dez/2023)',
    period: 'Set/2023 a Fev/2025',
    summary:
      'Análise técnica de sistemas fotovoltaicos, suporte especializado a integradores, integração de plataformas via API e gestão de dispositivos IoT de monitoramento.',
    highlights: [
      'Análise técnica e econômica de mais de 600 projetos fotovoltaicos e suporte técnico nacional especializado com taxa de ~90% de resolução no primeiro contato.',
      'Gestão e otimização do fluxo operacional de mais de 300 dispositivos IoT de monitoramento solar, elevando a produtividade da equipe em ~30%.',
      'Desenvolvimento de automação em VBA e scripts de processamento que reduziram em mais de 90% o tempo de geração de relatórios técnicos de engenharia.',
      'Modelagem de dashboards analíticos em Power BI para acompanhamento de KPIs de campo, telemetria de geração e rastreabilidade de atendimentos técnicos.',
    ],
  },
  {
    company: 'IRRICONTROL',
    location: 'Itajubá, MG',
    currentRole: 'Estagiário em Engenharia de Produto',
    previousRole: 'Pesquisa & Desenvolvimento: Hardware & Sistemas Embarcados',
    period: 'Set/2022 a Set/2023',
    summary:
      'Atuação em eletrônica, montagem, calibração, controle de qualidade e testes funcionais em equipamentos para irrigação inteligente.',
    highlights: [
      'Montagem técnica, calibração de precisão, inspeção e testes funcionais em bancada para mais de 2.000 unidades de equipamentos eletrônicos e embarcados.',
      'Padronização de procedimentos operacionais (POP), controle de qualidade rigoroso (QA), identificação de falhas em circuitos e documentação de produção.',
      'Validação funcional de hardware para irrigação inteligente, executando testes de estresse, retrabalho de componentes SMD e verificação de firmware.',
      'Interface técnica direta com a engenharia de desenvolvimento para sugestões de melhoria em layout de placas, redução de retrabalho e confiabilidade.',
    ],
  },
];

export interface SkillGroup {
  category: string;
  code: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: 'Engenharia',
    code: 'ENG',
    items: [
      'Sistemas Fotovoltaicos (GD / MMGD)',
      'Sistemas Elétricos de Potência',
      'Estudos de Conexão & Fluxo de Potência',
      'Regulação ANEEL / PRODIST',
      'Subestações BT/MT & Proteção',
      'Eletromobilidade (AC/DC)',
      'Responsabilidade Técnica (ART)',
      'AutoCAD',
    ],
  },
  {
    category: 'Desenvolvimento',
    code: 'DEV',
    items: ['Python', 'TypeScript', 'JavaScript', 'React', 'Next.js', 'Git & GitHub', 'HTML5 / CSS3'],
  },
  {
    category: 'Dados',
    code: 'DATA',
    items: [
      'SQL',
      'Power BI & DAX',
      'Microsoft Excel Avançado',
      'Streamlit',
      'Pandas & Modelagem Analítica',
      'Visualização de Dados',
    ],
  },
  {
    category: 'Automação',
    code: 'AUTO',
    items: [
      'APIs REST',
      'Google Apps Script',
      'Fluxos Automatizados & ETL',
      'Integração de Sistemas',
      'Monitoramento IoT',
      'Ferramentas de IA Aplicada',
    ],
  },
  {
    category: 'Gestão',
    code: 'MGMT',
    items: [
      'Gestão de Projetos',
      'Viabilidade Técnico-Econômica',
      'Gestão de Riscos & Indicadores',
      'CRM & Operações',
      'Lean / Kaizen',
      'Documentação Técnica & Pericial',
    ],
  },
];

export const CONTACT_OPTIONS = [
  {
    id: 'linkedin',
    label: 'LinkedIn Profissional',
    value: 'linkedin.com/in/lucasssantos1',
    description: 'Canal prioritário para conexões profissionais, oportunidades, parcerias e networking técnico.',
    href: SOCIAL_LINKS.linkedin,
    actionLabel: 'Conectar no LinkedIn',
    external: true,
    primary: true,
  },
  {
    id: 'github',
    label: 'GitHub & Portfólio Técnico',
    value: 'github.com/luscaarmstrong1',
    description: 'Repositórios públicos, simuladores técnico-econômicos, plataformas de dados e documentação.',
    href: SOCIAL_LINKS.github,
    actionLabel: 'Explorar GitHub',
    external: true,
    primary: false,
  },
  {
    id: 'briefing',
    label: 'Briefing Estruturado de Projeto',
    value: 'Formulário interativo em 7 passos',
    description: 'Estruture sua demanda de engenharia, energia, dados ou automação em menos de 2 minutos.',
    href: '/contato/',
    actionLabel: 'Iniciar Briefing',
    external: false,
    primary: false,
  },
  {
    id: 'email',
    label: 'E-mail Profissional',
    value: SITE.email,
    description: 'Contato direto para envio de escopos técnicos, convites e propostas corporativas.',
    href: linkEmail(),
    actionLabel: 'Enviar E-mail',
    external: true,
    primary: false,
  },
] as const;
