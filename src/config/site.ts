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
  projectType: 'Plataforma Web B2B' | 'Landing Pages & Sites' | 'Catálogo & E-commerce' | 'Site Institucional Técnico' | 'Portal & Landing Pages';
  description: string;
  syntheticNote?: string;
  technologies: string[];
  siteUrl: string;
  siteDomain: string;
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  metricsBadge: string;
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'prospecta-nicho-b2b',
    title: 'Prospecta Nicho B2B',
    category: 'Inteligência Comercial • Dados • SaaS',
    projectType: 'Plataforma Web B2B',
    description:
      'Plataforma digital para prospecção empresarial e estruturação de bases B2B em todo o Brasil, com segmentação por CNAE, porte e região, enriquecimento automatizado e fluxos comerciais.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'Dados B2B'],
    siteUrl: 'https://luscaarmstrong1.github.io/prospecta-nicho/leads/',
    siteDomain: 'Prospecta Nicho B2B',
    image: '/assets/images/projects/proj-web-01-prospecta-b2b.webp',
    metricsBadge: '+5.8M Empresas • Segmentação B2B',
  },
  {
    id: 'prospecta-nicho-sites',
    title: 'Prospecta Nicho • Landing Pages & Sites',
    category: 'Desenvolvimento Web • UI/UX • Conversão',
    projectType: 'Landing Pages & Sites',
    description:
      'Frente digital dedicada à criação de sites institucionais e landing pages de alta conversão, com design autoral responsivo, copy estratégica, SEO técnico e integração direta ao WhatsApp.',
    technologies: ['React', 'Next.js', 'TypeScript', 'UI/UX Design', 'SEO & Performance'],
    siteUrl: 'https://luscaarmstrong1.github.io/prospecta-nicho/',
    siteDomain: 'Prospecta Web',
    image: '/assets/images/projects/proj-web-02-prospecta-sites.webp',
    metricsBadge: 'Alta Conversão • Mobile First',
  },
  {
    id: 'omega-imports',
    title: 'Omega Imports',
    category: 'E-commerce • Eletrônica • IoT & Automação',
    projectType: 'Catálogo & E-commerce',
    description:
      'Catálogo digital e vitrine online de componentes eletrônicos, sensores, módulos ESP32/IoT e fontes para automação e prototipagem, com busca instantânea e checkout integrado.',
    technologies: ['Next.js', 'TypeScript', 'Catálogo Digital', 'Integração Mercado Livre', 'UI/UX'],
    siteUrl: 'https://luscaarmstrong1.github.io/omegaimports-catalogo/',
    siteDomain: 'Omega Imports',
    image: '/assets/images/projects/proj-web-03-omega-imports.webp',
    metricsBadge: 'Eletrônica, IoT & Automação',
  },
  {
    id: 'conexium-engenharia',
    title: 'Conexium Engenharia',
    category: 'Engenharia Elétrica • Consultoria • Web',
    projectType: 'Site Institucional Técnico',
    description:
      'Presença digital corporativa especializada em engenharia elétrica, consultoria técnico-regulatória (ANEEL/PRODIST), estudos de conexão e assistência técnica pericial.',
    technologies: ['Astro', 'TypeScript', 'Design Editorial', 'SEO Técnico', 'Performance'],
    siteUrl: 'https://conexium-engenharia.vercel.app/',
    siteDomain: 'Conexium Engenharia',
    image: '/assets/images/projects/proj-web-04-conexium.webp',
    metricsBadge: 'Engenharia, Regulação & Evidência',
  },
  {
    id: 'renovera-landing-pages',
    title: 'Renovera • Landing Pages',
    category: 'Energia Solar • Projetos Elétricos • Web',
    projectType: 'Portal & Landing Pages',
    description:
      'Ecossistema de landing pages públicas e portal institucional para soluções em energia solar, consultoria regulatória, projetos elétricos de média tensão e infraestrutura de eletropostos.',
    technologies: ['TypeScript', 'Vite', 'Arquitetura Multi-Landing', 'UI/UX Técnico', 'Captação B2B'],
    siteUrl: 'https://luscaarmstrong1.github.io/renovera-landings-publicas/',
    siteDomain: 'Renovera Energia',
    image: '/assets/images/projects/proj-web-05-renovera.webp',
    metricsBadge: 'Solar • Regulação • Eletropostos',
  },
];

export interface InteractiveStage {
  id: string;
  stepLabel: string;
  shortNavLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  metrics: string;
  image: string;
  imageAlt: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

export const INTERACTIVE_SHOWCASE = {
  sectionTitle: 'Um projeto. Múltiplas camadas de engenharia.',
  sectionSubtitle: 'Do modelo ao diagnóstico. Da análise à decisão.',
  projectName: 'Ecossistema de Simuladores, Energia, Dados & IA',
  githubUrl: 'https://github.com/luscaarmstrong1/solar-pv-digital-twin-bess-platform',
  ctaLabel: 'Explorar no GitHub',
  demoCtaLabel: 'Abrir Simulador Web',
  disclaimer:
    '9 plataformas analíticas e simuladores interativos em Python, sistemas de potência, energia solar, BESS, hidrogênio verde e IA.',
  stages: [
    {
      id: 'digital-twin-solar-bess',
      stepLabel: 'CAMADA 01: DIGITAL TWIN & BESS',
      shortNavLabel: '01 • Digital Twin & BESS',
      titleLine1: 'Gêmeo Digital',
      titleLine2: 'FV & BESS',
      subtitle: 'CAMADA 01 • PLANTA 1,20 MWp + BESS 250 kW / 750 kWh',
      description:
        'Modelagem física horária de usina fotovoltaica (1,20 MWp), rastreamento Expected vs. Observed, decomposição da árvore de perdas O&M e despacho ótimo de baterias com cálculo de LCOS e VPL.',
      metrics: '1,20 MWp • BESS 250 kW / 750 kWh • LCOS & O&M',
      image: '/assets/images/stages/stage-eng-01-digital-twin.png',
      imageAlt: 'Camada 01: Gêmeo Digital Fotovoltaico e Otimização BESS',
      demoUrl: 'https://luscaarmstrong1.github.io/solar-pv-digital-twin-bess-platform/',
      githubUrl: 'https://github.com/luscaarmstrong1/solar-pv-digital-twin-bess-platform',
      technologies: ['Python', 'pvlib', 'FastAPI', 'Streamlit', 'BESS Dispatch'],
    },
    {
      id: 'energy-intelligence-ai',
      stepLabel: 'CAMADA 02: ENERGY AI & MLOPS',
      shortNavLabel: '02 • Energy AI & MLOps',
      titleLine1: 'Energy AI &',
      titleLine2: 'Forecasting',
      subtitle: 'CAMADA 02 • MACHINE LEARNING, ANOMALIAS & LOAD SHIFTING',
      description:
        'Plataforma de inteligência energética com Data Warehouse local, previsão horária de carga e geração solar (MAPE 2,8%), detecção de anomalias via Isolation Forest e otimização de ponta.',
      metrics: 'MAPE 2,8% • Isolation Forest • PR-AUC 0,91',
      image: '/assets/images/stages/stage-eng-02-energy-ai.png',
      imageAlt: 'Camada 02: Plataforma de Inteligência Energética e Machine Learning',
      demoUrl: 'https://luscaarmstrong1.github.io/energy-intelligence-ai-platform/',
      githubUrl: 'https://github.com/luscaarmstrong1/energy-intelligence-ai-platform',
      technologies: ['Python', 'Scikit-Learn', 'FastAPI', 'SQLite DW', 'MLOps'],
    },
    {
      id: 'brazilian-power-system',
      stepLabel: 'CAMADA 03: SISTEMA ELÉTRICO (SIN)',
      shortNavLabel: '03 • Sistema Elétrico SIN',
      titleLine1: 'Matriz & Carga',
      titleLine2: 'do SIN (ONS)',
      subtitle: 'CAMADA 03 • CAPACIDADE SIGA/ANEEL, SUBSISTEMAS ONS & MMGD',
      description:
        'Análise integrada do Sistema Interligado Nacional: distinção rigorosa entre MW instalado, MWmed gerado e carga por subsistema (SE/CO, S, NE, N), complementaridade renovável e expansão MMGD.',
      metrics: '206+ GW • 4 Subsistemas ONS • 88,4% Renovável',
      image: '/assets/images/stages/stage-eng-03-power-system.png',
      imageAlt: 'Camada 03: Dashboard Analítico do Sistema Elétrico Brasileiro SIN/ONS',
      demoUrl: 'https://luscaarmstrong1.github.io/brazilian-power-system-dashboard/',
      githubUrl: 'https://github.com/luscaarmstrong1/brazilian-power-system-dashboard',
      technologies: ['Python', 'Dados ONS/ANEEL', 'Power BI / DAX', 'Streamlit'],
    },
    {
      id: 'solar-feasibility-25y',
      stepLabel: 'CAMADA 04: VIABILIDADE SOLAR 25 ANOS',
      shortNavLabel: '04 • Viabilidade Solar 25a',
      titleLine1: 'Viabilidade',
      titleLine2: 'Solar 25 Anos',
      subtitle: 'CAMADA 04 • FLUXO DE CAIXA DESCONTADO, VPL, TIR & LCOE',
      description:
        'Simulador técnico-econômico de sistemas fotovoltaicos em horizonte de 25 anos, integrando dimensionamento por HSP/PR, degradação anual de módulos, VPL, TIR, payback descontado e LCOE.',
      metrics: '38,4 kWp • VPL R$ 427k • TIR 34,1% • LCOE R$ 0,396',
      image: '/assets/images/stages/stage-eng-04-solar-feasibility.png',
      imageAlt: 'Camada 04: Simulador de Viabilidade Técnico-Econômica Solar 25 Anos',
      demoUrl: 'https://luscaarmstrong1.github.io/solar-energy-feasibility-simulator/',
      githubUrl: 'https://github.com/luscaarmstrong1/solar-energy-feasibility-simulator',
      technologies: ['Python', 'Engenharia Econômica', 'Streamlit', 'Excel', 'LCOE'],
    },
    {
      id: 'mercado-livre-acl',
      stepLabel: 'CAMADA 05: MERCADO LIVRE (ACR vs ACL)',
      shortNavLabel: '05 • Mercado Livre ACL',
      titleLine1: 'Migração para',
      titleLine2: 'Mercado Livre',
      subtitle: 'CAMADA 05 • COMPARATIVO ACR VS ACL, CCEE & BREAK-EVEN',
      description:
        'Ferramenta técnico-regulatória para avaliação de migração do Grupo A ao Ambiente de Contratação Livre (ACL), com desconto de TUSD incentivada, encargos CCEE, break-even e análise de risco.',
      metrics: 'Economia R$ 538k/ano (-18,7%) • Break-Even R$ 385/MWh',
      image: '/assets/images/stages/stage-eng-05-mercado-livre.png',
      imageAlt: 'Camada 05: Simulador de Migração para o Mercado Livre de Energia',
      demoUrl: 'https://luscaarmstrong1.github.io/mercado-livre-energia-simulador/',
      githubUrl: 'https://github.com/luscaarmstrong1/mercado-livre-energia-simulador',
      technologies: ['Python', 'Regulação ANEEL/CCEE', 'ACR vs ACL', 'Streamlit'],
    },
    {
      id: 'green-hydrogen-h2v',
      stepLabel: 'CAMADA 06: HIDROGÊNIO VERDE (H2V)',
      shortNavLabel: '06 • Hidrogênio Verde',
      titleLine1: 'Hidrogênio',
      titleLine2: 'Verde & LCOH',
      subtitle: 'CAMADA 06 • HÍBRIDO SOLAR + EÓLICA, ELETRÓLISE PEM & LCOH',
      description:
        'Simulador técnico-econômico de produção de H2 verde combinando geração solar e eólica horária, amortecimento em BESS, eletrólise (PEM, Alcalino e SOEC), balanço de massa e cálculo de LCOH.',
      metrics: '50 MW PEM • Solar + Eólica + BESS • Cálculo de LCOH',
      image: '/assets/images/stages/stage-eng-06-green-hydrogen.png',
      imageAlt: 'Camada 06: Simulador Técnico-Econômico de Hidrogênio Verde',
      demoUrl: 'https://luscaarmstrong1.github.io/green-hydrogen-techno-economic-simulator/',
      githubUrl: 'https://github.com/luscaarmstrong1/green-hydrogen-techno-economic-simulator',
      technologies: ['Python', 'Eletrólise PEM', 'BESS Dispatch', 'LCOH', 'Pytest'],
    },
    {
      id: 'electrical-project-mgmt',
      stepLabel: 'CAMADA 07: GESTÃO DE PROJETOS & PMO',
      shortNavLabel: '07 • Gestão de Projetos',
      titleLine1: 'Gestão PMO &',
      titleLine2: 'Homologação',
      subtitle: 'CAMADA 07 • CARTEIRA GD/MT, PRAZOS PRODIST, ARTs & MARGEM',
      description:
        'Painel executivo de Business Intelligence para gestão de carteiras de projetos elétricos e fotovoltaicos: controle de SLA de pareceres de acesso, emissão de ARTs, gargalos e margem financeira.',
      metrics: '120 Projetos • 16,8 MWp • SLA PRODIST Módulo 3',
      image: '/assets/images/stages/stage-eng-07-project-mgmt.png',
      imageAlt: 'Camada 07: Dashboard de Gestão de Projetos Elétricos e Homologação',
      demoUrl: 'https://luscaarmstrong1.github.io/electrical-project-management-dashboard/',
      githubUrl: 'https://github.com/luscaarmstrong1/electrical-project-management-dashboard',
      technologies: ['Python', 'Power BI / DAX', 'PRODIST Mód. 3', 'PMO & ART'],
    },
    {
      id: 'energy-management-iso',
      stepLabel: 'CAMADA 08: EFICIÊNCIA ENERGÉTICA',
      shortNavLabel: '08 • Eficiência Energética',
      titleLine1: 'Gestão &',
      titleLine2: 'Eficiência',
      subtitle: 'CAMADA 08 • DEMANDA DE PONTA, FATOR DE POTÊNCIA & ISO 50001',
      description:
        'Plataforma de gestão energética industrial multi-unidade: monitoramento horário de consumo e demanda contratada, prevenção de ultrapassagem, autoconsumo solar e linha de base EnPI.',
      metrics: 'ISO 50001 • -15,2% Demanda Ponta • Baseline EnPI',
      image: '/assets/images/stages/stage-eng-08-energy-mgmt.png',
      imageAlt: 'Camada 08: Dashboard de Gestão e Eficiência Energética Industrial',
      demoUrl: 'https://luscaarmstrong1.github.io/energy-management-dashboard/',
      githubUrl: 'https://github.com/luscaarmstrong1/energy-management-dashboard',
      technologies: ['Python', 'ISO 50001', 'Gestão de Demanda', 'Streamlit', 'Power BI'],
    },
    {
      id: 'solar-pv-sizing',
      stepLabel: 'CAMADA 09: DIMENSIONAMENTO & STRINGS FV',
      shortNavLabel: '09 • Dimensionamento FV',
      titleLine1: 'Engenharia &',
      titleLine2: 'Strings MPPT',
      subtitle: 'CAMADA 09 • HSP, PR MULTIPLICATIVO, RELAÇÃO CC/CA & VOC/VMP',
      description:
        'Calculadora de engenharia fotovoltaica para pré-dimensionamento e coordenação de strings: cálculo de PR por perdas, seleção inteira de módulos por MPPT e validação térmica de tensão Voc e Vmp.',
      metrics: 'Coordenação CC/CA • Validação Térmica Voc/Vmp • MPPT',
      image: '/assets/images/stages/stage-eng-09-pv-sizing.png',
      imageAlt: 'Camada 09: Calculadora de Dimensionamento e Strings Fotovoltaicas',
      demoUrl: 'https://luscaarmstrong1.github.io/solar-pv-sizing-calculator/',
      githubUrl: 'https://github.com/luscaarmstrong1/solar-pv-sizing-calculator',
      technologies: ['Python', 'Engenharia FV', 'Coordenação MPPT', 'Streamlit'],
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
    currentRole: 'Gerente de Projetos',
    previousRole: 'Anteriormente: Analista de Projetos e Equipamentos (Out/2024 a Set/2025)',
    period: 'Out/2024 a Atual',
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
    currentRole: 'Analista de Projetos e Sistemas Fotovoltaicos',
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
      'Estudos de Conexão & Fluxo de Carga',
      'Regulação ANEEL / PRODIST',
      'Subestações BT/MT & Proteção',
      'Eletromobilidade (AC/DC)',
      'Responsabilidade Técnica (ART)',
      'AutoCAD & Diagramas Unifilares',
    ],
  },
  {
    category: 'Desenvolvimento',
    code: 'DEV',
    items: [
      'Python',
      'TypeScript & JavaScript',
      'React & Next.js',
      'APIs RESTful & Integrações',
      'Git & GitHub Workflow',
      'HTML5 / CSS3 / Tailwind',
      'Node.js & Scripts Backend',
      'Arquitetura de Aplicações Web',
    ],
  },
  {
    category: 'Dados & IA',
    code: 'DATA',
    items: [
      'SQL & Modelagem Relacional',
      'Power BI, DAX & Power Query',
      'Microsoft Excel Avançado',
      'Pandas, NumPy & Análise de Dados',
      'Machine Learning & IA Aplicada',
      'Streamlit & Dashboards Web',
      'Visualização & Storytelling de Dados',
      'ETL & Pipelines Automatizados',
    ],
  },
  {
    category: 'Automação & IoT',
    code: 'AUTO',
    items: [
      'Google Apps Script & Google Cloud',
      'Fluxos Automatizados & Webhooks',
      'Integração de Sistemas & APIs',
      'Monitoramento IoT & Telemetria',
      'Ferramentas de IA & Automação LLM',
      'RPA & Scripts Operacionais em Python',
      'Web Scraping & Extração de Dados',
      'Automação de Relatórios Técnicos',
    ],
  },
  {
    category: 'Gestão & Métodos',
    code: 'MGMT',
    items: [
      'Gestão de Projetos & Prazos',
      'Viabilidade Técnico-Econômica',
      'Gestão de Riscos & Indicadores (KPIs)',
      'CRM & Estruturação de Operações',
      'Lean / Kaizen & Eficiência',
      'Documentação Técnica & Pericial',
      'Scrum & Metodologias Ágeis',
      'Análise de Custos CAPEX / OPEX',
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
