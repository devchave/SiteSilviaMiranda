// Gerador estático do site do Programa EIXO Comercial (Silvia Miranda).
// Mantém header/footer/SEO consistentes entre páginas sem precisar de um framework.
// Uso: node scripts/build.mjs  (gera os arquivos .html na raiz do projeto)

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SITE_URL = 'https://silviamiranda.com.br';
const WA_LINK = 'https://wa.me/5531983022570?text=Vim%20do%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es';
const SITE_NAME = 'Programa EIXO Comercial — Silvia Miranda';

/* ---------------------------------------------------------------- */
/* Ícones (SVG inline, sem dependências externas)                    */
/* ---------------------------------------------------------------- */
const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 16.5l6-6 4 4 6.5-7.5"/><path d="M14.5 6.5h5.5V12"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h9M4 12h16M4 17h7"/><circle cx="16.5" cy="7" r="2"/><circle cx="9.5" cy="17" r="2"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.3 15.2c.5 1 1.5 1.5 2.7 1.5 1.7 0 2.7-.9 2.7-2.1 0-1.3-1.2-1.8-2.8-2.2-1.5-.4-2.6-1-2.6-2.2 0-1.1 1-2 2.6-2 1.1 0 2 .5 2.5 1.3M12 6.7v10.6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.6-3 7.6-7 8.9-4-1.3-7-4.3-7-8.9V6l7-3z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><circle cx="17" cy="9.2" r="2.3"/><path d="M15.8 14.7c2.6.2 4.7 2.2 4.7 4.9"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-4-1 2-6z" stroke-linejoin="round"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M4.2 12H2M22 12h-2.2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18"/><circle cx="12" cy="12" r="3.2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V11M12 20V4M20 20v-7"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3 9 3 16c0 2.4.7 4.7 1.9 6.7L3 29l6.5-1.8A13 13 0 0 0 16 29c7 0 13-6 13-13S23 3 16 3zm7.4 18.4c-.3.9-1.7 1.7-2.6 1.9-.7.1-1.6.2-4.7-1-4-1.6-6.5-5.6-6.7-5.9-.2-.3-1.6-2.1-1.6-4s1-2.8 1.4-3.2c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.6.3.7 1 2.4 1.1 2.6.1.2.2.4 0 .7-.1.3-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.3-.3.7-.7 1-.1l.3-.8c.3-.6.5-.5.9-.4l2.4 1.1c.3.1.5.2.6.3.1.2.1 1-.2 1.9z"/></svg>',
  top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M6 11l6-6 6 6"/></svg>',
};

const CM_MARK = `<img src="/assets/img/cm-logo.svg" alt="" width="26" height="18" loading="lazy">`;

/* ---------------------------------------------------------------- */
/* Navegação                                                         */
/* ---------------------------------------------------------------- */
const NAV = [
  { key: 'inicio', file: 'index.html', label: 'Início' },
  { key: 'programa', file: 'o-programa.html', label: 'O Programa' },
  { key: 'pilares', file: 'pilares.html', label: 'Pilares' },
  { key: 'para-quem-e', file: 'para-quem-e.html', label: 'Para Quem É' },
  { key: 'sobre', file: 'sobre.html', label: 'Sobre' },
  { key: 'resultados', file: 'resultados.html', label: 'Resultados' },
  { key: 'faq', file: 'faq.html', label: 'FAQ' },
];

/* ---------------------------------------------------------------- */
/* Helpers de marcação                                                */
/* ---------------------------------------------------------------- */
function head({ title, description, path, ogImage }) {
  const url = `${SITE_URL}/${path === 'index.html' ? '' : path}`;
  const img = ogImage || `${SITE_URL}/assets/img/og-image.jpg`;
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="author" content="Silvia Miranda">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="alternate" hreflang="pt-BR" href="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${img}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="stylesheet" href="/assets/css/style.css">`;
}

function breadcrumbSchema(path, label) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` }];
  if (path !== 'index.html') {
    items.push({ '@type': 'ListItem', position: 2, name: label, item: `${SITE_URL}/${path}` });
  }
  return { '@type': 'BreadcrumbList', itemListElement: items };
}

function baseGraph(path, label, extra = []) {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'pt-BR',
      description: 'Programa EIXO Comercial: gestão, lucro e escala com método, por Silvia Miranda.',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#silvia-miranda`,
      name: 'Silvia Miranda',
      jobTitle: 'Estrategista comercial',
      description: 'Mais de 20 anos de experiência em vendas, operação, gestão de riscos e desenvolvimento de negócios. Criadora do Programa EIXO Comercial.',
      url: `${SITE_URL}/sobre.html`,
      image: `${SITE_URL}/assets/img/silvia-headshot.jpg`,
      worksFor: { '@id': `${SITE_URL}/#eixo-comercial` },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#eixo-comercial`,
      name: 'Programa EIXO Comercial',
      serviceType: 'Consultoria e estruturação comercial',
      provider: { '@id': `${SITE_URL}/#silvia-miranda` },
      areaServed: 'BR',
      description: 'Programa de estruturação empresarial que une marketing, vendas e gestão para transformar empresas que já vendem, mas crescem no improviso, em operações previsíveis, lucrativas e escaláveis.',
      url: `${SITE_URL}/o-programa.html`,
    },
    breadcrumbSchema(path, label),
  ];
  return { '@context': 'https://schema.org', '@graph': [...graph, ...extra] };
}

function header(activeKey) {
  const links = NAV.map(
    (n) => `<li><a href="/${n.file}" data-nav="${n.key}"${n.key === activeKey ? ' class="is-active" aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `<a class="visually-hidden" href="#conteudo">Pular para o conteúdo</a>
<div class="scroll-progress" aria-hidden="true"></div>
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a href="/index.html" class="brand" aria-label="Silvia Miranda — Programa EIXO Comercial — Início">
      <img class="brand-logo" src="/assets/img/logo.svg" alt="Silvia Miranda" width="220" height="56">
    </a>
    <nav class="main-nav" aria-label="Navegação principal">
      <button class="nav-toggle" aria-expanded="false" aria-controls="navMenu" aria-label="Abrir menu de navegação">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        ${links}
        <li class="header-cta mobile-only" style="list-style:none">
          <a class="btn btn-primary" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais ${ICON.arrow}</a>
        </li>
        <span class="nav-pill" aria-hidden="true"></span>
      </ul>
    </nav>
    <a class="btn btn-primary header-cta" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais ${ICON.arrow}</a>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-col">
      <div class="footer-brand"><img src="/assets/img/logo-white.svg" alt="Silvia Miranda" width="190" height="48"></div>
      <p>Gestão, lucro e escala com método. Um programa de estruturação empresarial para donos de negócio que querem sair do improviso.</p>
      <a class="btn btn-outline" style="border-color:oklch(100% 0 0 / .3);color:#fff" href="${WA_LINK}" target="_blank" rel="noopener">Falar no WhatsApp ${ICON.arrow}</a>
    </div>
    <div class="footer-col">
      <h4>Navegação</h4>
      <ul>
        ${NAV.map((n) => `<li><a href="/${n.file}">${n.label}</a></li>`).join('\n        ')}
        <li><a href="/contato.html">Contato</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contato</h4>
      <ul>
        <li><a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp: (31) 98302-2570</a></li>
        <li>Diagnóstico de aplicação gratuito, sem contratação imediata.</li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; <span data-year>2026</span> Silvia Miranda — Programa EIXO Comercial. Todos os direitos reservados.</p>
    <a class="footer-credit" href="https://chavemestresolucoes.com" target="_blank" rel="noopener noreferrer" aria-label="Site desenvolvido por Chave Mestre Soluções de TI">
      ${CM_MARK}
      <span>Desenvolvido por <strong>Chave Mestre</strong> Soluções de TI</span>
    </a>
  </div>
</footer>
<div class="float-stack">
  <button class="top-btn" aria-label="Voltar ao topo" type="button">${ICON.top}</button>
  <a class="wa-float" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ICON.whatsapp}</a>
</div>
<script src="/assets/js/main.js"></script>`;
}

function pageHead({ eyebrow, title, lede, crumbLabel }) {
  return `<section class="page-head">
  <div class="container">
    <p class="breadcrumbs"><a href="/index.html">Início</a><span class="sep">/</span><span>${crumbLabel}</span></p>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="lede">${lede}</p>
  </div>
</section>`;
}

function ctaBand({ title, text }) {
  return `<section class="section">
  <div class="container">
    <div class="cta-band reveal">
      <h2>${title}</h2>
      <p>${text}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais sobre o EIXO ${ICON.arrow}</a>
      </div>
    </div>
  </div>
</section>`;
}

function page({ path, navKey, title, description, ogImage, crumbLabel, bodyClass, main, extraSchema }) {
  const schema = baseGraph(path, crumbLabel, extraSchema);
  return `<!doctype html>
<html lang="pt-BR">
<head>
${head({ title, description, path, ogImage })}
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''} data-page="${navKey}">
${header(navKey)}
<main id="conteudo">
${main}
</main>
${footer()}
</body>
</html>
`;
}

/* ---------------------------------------------------------------- */
/* Conteúdo compartilhado                                            */
/* ---------------------------------------------------------------- */
const PROBLEM_TAGS = ['Vendas que oscilam', 'Metas sem base real', 'Marketing e vendas desalinhados', 'Leads sem perfil', 'Baixa conversão', 'Margem apertada', 'Equipe sem direção', 'Processos pouco claros', 'Indicadores pouco confiáveis', 'Dependência excessiva do dono'];

const TRANSFORMATIONS = [
  { icon: 'compass', title: 'Previsibilidade no lugar da ansiedade', text: 'Você para de tomar decisão no escuro. Passa a olhar para os números e entender o que está acontecendo, o que precisa corrigir e o que tende a acontecer nos próximos meses.' },
  { icon: 'coin', title: 'Lucro que dá segurança para decidir', text: 'Não basta vender mais se o dinheiro some. Você começa a entender margem, rentabilidade e o que realmente sobra — para decidir com mais segurança.' },
  { icon: 'trend', title: 'Crescimento sem exaustão', text: 'A operação deixa de crescer só às custas da sua energia. Processos, rotina e time sustentam o avanço sem exigir sua presença em cada detalhe.' },
  { icon: 'spark', title: 'Mais presença, menos urgência', text: 'Você reduz o modo reativo. Tem mais espaço mental para pensar estrategicamente — e mais presença para viver sua vida fora do trabalho.' },
  { icon: 'clock', title: 'Descanso sem medo', text: 'Fim de semana, feriado ou férias deixam de ser ameaça. A empresa continua rodando melhor porque passa a existir estrutura além de você.' },
  { icon: 'shield', title: 'Empresa que vira patrimônio', text: 'Negócio dependente do dono gera cansaço. Negócio estruturado gera valor. Você deixa de construir só renda mensal e começa a construir ativo.' },
];

const TRIAD = [
  { n: '01', title: 'Marketing gera interesse', text: 'Atrai o público, posiciona a oferta, comunica valor e gera demanda.' },
  { n: '02', title: 'Vendas transforma interesse em receita', text: 'Qualifica, investiga, conduz, acompanha e converte oportunidades.' },
  { n: '03', title: 'Gestão transforma receita em lucro e escala', text: 'Organiza processos, pessoas, indicadores, margem, decisões e capacidade de crescimento.' },
];

const PILLARS = [
  { key: 'gestao', title: 'Gestão', lead: 'Para transformar objetivos em prioridades, processos, responsáveis e indicadores. Você passa a ter mais clareza sobre o que precisa ser corrigido, quem deve executar e como acompanhar os resultados.', tags: ['Direção', 'Prioridades', 'Metas', 'Processos', 'Decisões', 'Acompanhamento'] },
  { key: 'lucro', title: 'Lucro', lead: 'Para entender quais produtos, clientes, canais e decisões realmente contribuem para o resultado. O foco não está apenas em faturar mais, mas em proteger margem, reduzir desperdícios e aumentar a rentabilidade.', tags: ['Margem', 'Rentabilidade', 'Carteira', 'CAC', 'LTV', 'Produtividade'] },
  { key: 'escala', title: 'Escala', lead: 'Para crescer com processos replicáveis, equipe preparada, tecnologia, indicadores e menos dependência do dono. Escalar não é aumentar o caos. É construir capacidade para crescer sem perder o controle.', tags: ['Processos', 'Equipe', 'Tecnologia', 'Autonomia', 'Previsibilidade', 'Crescimento'] },
];

const STRUCTURE_LIST = ['Direção, prioridades e metas', 'Mercado, cliente e posicionamento', 'Marketing e geração de demanda', 'Vendas, processo e conversão', 'CRM, pipeline e indicadores', 'Rentabilidade, CAC e LTV', 'Equipe, liderança e responsabilidades', 'Autonomia e redução da dependência do dono'];

const FORMATS = ['Encontros ao vivo', 'Diagnósticos', 'Análises individuais', 'Ferramentas práticas', 'Planilhas e calculadoras', 'Templates e checklists', 'Planos de ação', 'Role plays', 'Análise de atendimentos', 'Revisão de pipeline', 'Suporte e acompanhamento', 'Participação de especialistas'];

const METHOD = [
  { n: '1', label: 'ANALISAR', text: 'Entender a operação real: números, gargalos e onde o crescimento trava hoje.' },
  { n: '2', label: 'DECIDIR', text: 'Definir prioridades — o que precisa mudar primeiro e o que pode esperar.' },
  { n: '3', label: 'ESTRUTURAR', text: 'Organizar processos, responsáveis e indicadores para cada frente da operação.' },
  { n: '4', label: 'APLICAR', text: 'Colocar em prática com ferramentas, planos de ação e implementação real.' },
  { n: '5', label: 'ACOMPANHAR', text: 'Revisar resultados com consistência e ajustar a rota conforme o negócio evolui.' },
];

const FIT = ['Seu negócio já possui faturamento validado.', 'Você já vende, mas enfrenta oscilações.', 'Não tem clareza sobre o lucro real.', 'Depende demais da própria atuação.', 'Marketing e vendas não trabalham na mesma direção.', 'Sua equipe precisa de processos, gestão ou desenvolvimento.', 'Você está disposto a implementar, não apenas ouvir.', 'Quer escalar com processos e não depender apenas de pessoas.', 'Entende que precisará tomar decisões sobre produto, equipe, investimento e operação.'];

const NOT_FIT = ['Procura apenas mais um curso.', 'Espera que alguém faça toda a implementação no seu lugar.', 'Não quer compartilhar os dados do negócio.', 'Busca uma fórmula rápida.', 'Não pretende envolver a equipe.', 'Deseja apenas conhecer o conteúdo sem disposição para aplicar.', 'Ainda não validou minimamente o negócio.', 'Não pretende manter ou desenvolver a empresa nos próximos anos.'];

const SKILLS = ['Analisar cenários', 'Identificar riscos', 'Organizar operações', 'Estruturar processos', 'Desenvolver equipes', 'Melhorar conversão', 'Gerir carteira', 'Aumentar LTV', 'Reduzir CAC', 'Ampliar previsibilidade', 'Apoiar decisões comerciais mais seguras'];

const CASES = [
  { name: 'Concred · Facilita Soluções', segment: 'Crédito e mercado financeiro', text: 'Estruturação da esteira de produtos, definição de instituições financeiras parceiras, recrutamento, seleção, treinamento e gestão da equipe comercial.', result: 'Aproximadamente R$ 121 milhões gerados em produtos financeiros ao longo de 15 anos de operação.' },
  { name: 'ONM', segment: 'Educação e programa high ticket', text: 'Atuação comercial como closer.', result: 'R$ 660 mil em vendas em 25 dias.' },
  { name: 'Vectec', segment: 'Engenharia', text: 'Gestão comercial e acompanhamento estratégico da operação.', result: 'R$ 2,3 milhões em receita gerada em 90 dias.' },
  { name: 'Alef Turismo', segment: 'Turismo', text: 'Gestão de projetos e atuação comercial como closer.', result: 'Faturamento mensal médio de R$ 60 mil evoluiu para R$ 800 mil ao longo de 120 dias de atuação.' },
  { name: 'Permaneo', segment: 'Comunidade e produtos digitais', text: 'Atuação comercial como closer no lançamento de uma comunidade digital.', result: 'R$ 87,4 mil em receita gerada em 10 dias, com destaque em vendas à vista.' },
  { name: 'Segredos da Franquia', segment: 'Franquias e educação empresarial', text: 'Atuação comercial como closer.', result: 'R$ 160 mil em faturamento gerado.' },
  { name: 'TDAH Summit', segment: 'Saúde e eventos presenciais', text: 'Gestão comercial e atuação como closer na venda de um evento presencial.', result: 'R$ 160 mil em receita gerada durante 70 dias de vendas.' },
  { name: 'IEATO', segment: 'Carreira e educação', text: 'Estratégia de marketing, gestão comercial e atuação como CMO.', result: 'Mais de R$ 500 mil gerados sem tráfego pago.' },
];

const RESULTS = [
  { tag: 'Lançamento', figure: 'R$ 660 mil', period: 'em aproximadamente 25 dias' },
  { tag: 'Expansão de receita', figure: 'R$ 2,3 milhões', period: 'em 90 dias' },
  { tag: 'Melhoria de conversão', figure: 'R$ 60 mil → R$ 800 mil', period: 'em 120 dias, sem aumento de tráfego pago' },
  { tag: 'Estruturação comercial', figure: 'R$ 87,4 mil', period: 'em 10 dias' },
  { tag: 'Venda de evento', figure: 'R$ 160 mil', period: 'em aproximadamente 70 dias' },
  { tag: 'Reativação de base', figure: '143 vendas', period: 'em 30 dias por meio de reativação, sem tráfego pago' },
];

const FAQ = [
  { q: 'Quanto custa participar do Programa EIXO Comercial?', a: 'O investimento é apresentado depois de compreendermos o momento atual da empresa, os principais desafios e o nível de estruturação necessário. Antes de falar sobre valores, precisamos entender se o programa é adequado para o negócio e se existe disponibilidade real para implementar as mudanças.' },
  { q: 'Em quanto tempo começo a perceber resultados?', a: 'Alguns ajustes podem gerar melhorias rapidamente, principalmente quando existem falhas claras de atendimento, follow-up, qualificação ou condução de oportunidades. Mudanças mais estruturais, como organizar processos, desenvolver equipe, melhorar indicadores e reduzir a dependência do dono, exigem consistência. O prazo depende do ponto de partida, da complexidade da operação e da velocidade de implementação.' },
  { q: 'O Programa EIXO Comercial é um curso?', a: 'Não. O programa pode utilizar aulas objetivas, mas a entrega não se resume a conteúdo gravado. A empresa trabalha a própria realidade por meio de diagnóstico, ferramentas, análises, encontros, planos de ação, aplicação prática e acompanhamento.' },
  { q: 'Vocês fazem toda a implementação?', a: 'Não. O programa orienta, estrutura, disponibiliza ferramentas, analisa decisões e acompanha a aplicação. A empresa precisa participar ativamente. O objetivo não é criar dependência de um prestador externo, mas desenvolver capacidade interna para gerir e crescer.' },
  { q: 'Preciso ter equipe comercial?', a: 'Não necessariamente. Quando a empresa ainda não possui equipe, o programa ajuda a organizar a operação antes das contratações. Quando já existe um time, trabalhamos estrutura, responsabilidades, processos, gestão e desempenho.' },
  { q: 'E se meu time não quiser participar?', a: 'Primeiro, precisamos entender a causa da resistência. Ela pode estar relacionada à falta de clareza, sobrecarga, insegurança, ausência de liderança ou dificuldade de adaptação. Em alguns casos, a resistência persistente pode indicar que a empresa não está com as pessoas certas para o próximo estágio de crescimento.' },
  { q: 'O programa trabalha marketing e vendas?', a: 'Sim. Marketing e vendas são tratados como partes de uma mesma operação de crescimento. Analisamos como a empresa atrai, comunica valor, qualifica, vende, acompanha e transforma receita em lucro.' },
  { q: 'O programa garante aumento de faturamento?', a: 'Nenhum programa sério pode garantir resultado sem considerar mercado, oferta, estrutura, capacidade de entrega e execução. O Programa EIXO Comercial oferece método, ferramentas, direcionamento e acompanhamento para melhorar a qualidade das decisões e da operação.' },
  { q: 'Qual é a política de cancelamento?', a: 'O Programa EIXO Comercial possui prazo e condições definidos em contrato. Nas contratações realizadas pela internet, aplica-se o prazo legal de arrependimento previsto na legislação vigente. Após esse período, as condições seguem o contrato firmado entre as partes.' },
];

const ENGAGEMENT_TIERS = [
  { n: '01', key: 'diagnostico', title: 'EIXO Diagnóstico', stage: 'Entrada', text: 'Mapeamento profundo de gargalos, processos e oportunidades da operação comercial — avalia dependência do dono, gargalos de conversão e uso do CRM.', format: 'Diagnóstico executivo e consultoria pontual.' },
  { n: '02', key: 'mentoria', title: 'EIXO Mentoria', stage: 'Desenvolvimento', text: 'Silvia direciona e transfere o método. A liderança e a equipe da empresa aplicam a estruturação na própria operação, com acompanhamento próximo.', format: 'Formato: a empresa executa, com direcionamento.' },
  { n: '03', key: 'consultoria', title: 'EIXO Consultoria', stage: 'Transformação', text: 'Atuação mão na massa. Silvia e sua equipe participam ativamente da reestruturação da máquina comercial, lado a lado com o time do cliente.', format: 'Formato: implementação assistida.' },
  { n: '04', key: 'advisory', title: 'EIXO Advisory', stage: 'Continuidade', text: 'Acompanhamento executivo de longo prazo, pensado para empresas mais maduras que querem um conselho recorrente para sustentar performance e decisões.', format: 'Formato: acompanhamento contínuo.' },
];

const JOURNEY = [
  'Trabalhadora rural',
  'Professora de História',
  'Servidora pública',
  'Especialista em vendas e estruturação comercial',
];

const ICP_FIT = ['CEO ou diretor(a) de uma PME com faturamento acima de R$ 500 mil por ano.', 'Já possui equipe comercial montada.', 'Sente que a operação é reativa e sem previsibilidade.', 'É o fundador exausto de sustentar o crescimento sozinho no dia a dia.'];
const ICP_NOT_FIT = ['Empreendedores iniciantes que ainda não validaram o negócio.', 'Psicólogos e profissionais liberais buscando apenas "aprender a vender".', 'Quem procura fórmulas rápidas e genéricas de persuasão e fechamento.'];

const GALLERY = [
  { img: 'gallery-02-palestra-dellas.jpg', alt: 'Silvia Miranda palestrando no Clube Dellas, com slide de apresentação ao fundo', caption: 'Palestra · Clube Dellas' },
  { img: 'gallery-01-palco-entrevista.jpg', alt: 'Silvia Miranda no palco sendo entrevistada, com seu nome e "Estrategista Comercial" projetados na tela', caption: 'Palco · Estrategista Comercial' },
  { img: 'gallery-04-podcast.jpg', alt: 'Silvia Miranda gravando podcast em estúdio', caption: 'Podcast · Hotmart Cast' },
  { img: 'gallery-06-fire-expo.jpg', alt: 'Silvia Miranda na entrada do evento Hotmart FIRE, na Expominas', caption: 'Hotmart FIRE · Expominas' },
  { img: 'gallery-05-reuniao.jpg', alt: 'Silvia Miranda em reunião de negócios no Café com Impacto, Casa Baanko', caption: 'Café com Impacto · Casa Baanko' },
  { img: 'gallery-03-palestra-dellas2.jpg', alt: 'Silvia Miranda gesticulando durante palestra no Clube Dellas', caption: 'Palestra · Clube Dellas' },
  { img: 'gallery-07-dellas-mesa.jpg', alt: 'Silvia Miranda falando ao microfone em evento de networking', caption: 'Encontro de networking' },
  { img: 'gallery-09-painel.jpg', alt: 'Silvia Miranda em painel de discussão em conferência de negócios', caption: 'Painel · Conferência Bestseller' },
  { img: 'gallery-08-craft.jpg', alt: 'Silvia Miranda em conferência de marketing e dados', caption: 'Conferência Craft' },
];

/* ---------------------------------------------------------------- */
/* Blocos reutilizáveis                                               */
/* ---------------------------------------------------------------- */
function statRow() {
  return `<div class="stat-row reveal-stagger">
  <div class="stat-card"><div class="num"><span data-count-to="20">0</span><span class="accent">+</span></div><div class="label">anos de experiência em vendas, operação e gestão</div></div>
  <div class="stat-card"><div class="num"><span data-count-to="17">0</span><span class="accent">+</span></div><div class="label">segmentos de atuação em diferentes mercados</div></div>
  <div class="stat-card"><div class="num">R$ <span data-count-to="130">0</span><span class="accent">M+</span></div><div class="label">em vendas geradas e apoiadas</div></div>
</div>`;
}

function problemTags() {
  return `<div class="chip-list reveal-stagger">${PROBLEM_TAGS.map((t) => `<span class="chip">${t}</span>`).join('')}</div>`;
}

function transformationsGrid() {
  return `<div class="grid grid-3 reveal-stagger">
${TRANSFORMATIONS.map((t) => `  <div class="card"><div class="ico">${ICON[t.icon]}</div><h3>${t.title}</h3><p>${t.text}</p></div>`).join('\n')}
</div>`;
}

function triadGrid() {
  return `<div class="grid grid-3 reveal-stagger">
${TRIAD.map((t) => `  <div class="card"><p class="pillar-num">${t.n}</p><h3>${t.title}</h3><p>${t.text}</p></div>`).join('\n')}
</div>`;
}

function pillarsTabs() {
  const tabs = PILLARS.map((p, i) => `<button class="tab-btn" role="tab" id="tab-${p.key}" aria-controls="panel-${p.key}" aria-selected="${i === 0}" tabindex="${i === 0 ? '0' : '-1'}"><span class="n">0${i + 1}</span> ${p.title}</button>`).join('\n    ');
  const panels = PILLARS.map((p, i) => `<div class="pillar-block" id="panel-${p.key}" role="tabpanel" aria-labelledby="tab-${p.key}" ${i === 0 ? '' : 'hidden'}>
    <div>
      <p class="pillar-num">PILAR 0${i + 1}</p>
      <h3>${p.title}</h3>
      <p>${p.lead}</p>
    </div>
    <div class="chip-list">${p.tags.map((t) => `<span class="chip">${t}</span>`).join('')}</div>
  </div>`).join('\n  ');
  return `<div class="tabs" data-tabs>
  <div class="tablist" role="tablist" aria-label="Pilares do Programa EIXO Comercial" hidden>
    ${tabs}
  </div>
  ${panels}
</div>`;
}

function methodStepper() {
  const btns = METHOD.map((m, i) => `<button class="step-btn" role="tab" id="step-${m.n}" aria-controls="stepPanel-${m.n}" aria-selected="${i === 0}" tabindex="${i === 0 ? '0' : '-1'}"><span class="circle">${m.n}</span><span class="label">${m.label}</span></button>`).join('\n    ');
  const panels = METHOD.map((m, i) => `<div class="step-panel" id="stepPanel-${m.n}" role="tabpanel" aria-labelledby="step-${m.n}" ${i === 0 ? '' : 'hidden'}><p class="badge-inline">Etapa ${m.n} · ${m.label}</p><p style="margin-top:14px;color:var(--ink-soft);font-size:1.02rem">${m.text}</p></div>`).join('\n  ');
  return `<div class="tabs" data-tabs>
  <div class="stepper tablist" role="tablist" aria-label="Método do Programa EIXO Comercial" hidden>
    ${btns}
  </div>
  ${panels}
</div>`;
}

function formatsChips() {
  return `<div class="chip-list reveal-stagger">${FORMATS.map((f) => `<span class="chip">${f}</span>`).join('')}</div>`;
}

function fitCompare() {
  return `<div class="table-compare reveal-stagger">
  <div class="compare-col good">
    <h3>${ICON.check} É para você se...</h3>
    <ul class="list-check">${FIT.map((f) => `<li>${ICON.check}<span>${f}</span></li>`).join('')}</ul>
  </div>
  <div class="compare-col bad">
    <h3>${ICON.x} Não é para você se...</h3>
    <ul class="list-check">${NOT_FIT.map((f) => `<li>${ICON.x}<span>${f}</span></li>`).join('')}</ul>
  </div>
</div>`;
}

function casesGrid() {
  return `<div class="grid grid-3 reveal-stagger">
${CASES.map((c) => `  <div class="case-card"><p class="tag">${c.segment}</p><h3>${c.name}</h3><p>${c.text}</p><p class="result">${c.result}</p></div>`).join('\n')}
</div>`;
}

function resultsGrid() {
  return `<div class="grid grid-3 reveal-stagger">
${RESULTS.map((r) => `  <div class="result-card"><span class="tag">${r.tag}</span><div class="figure">${r.figure}</div><p class="period">${r.period}</p></div>`).join('\n')}
</div>`;
}

function faqAccordion(idPrefix = '') {
  return `<div class="accordion">
${FAQ.map((f, i) => `  <details class="accordion-item"${i === 0 ? ' open' : ''}>
    <summary><span>${f.q}</span><span class="plus" aria-hidden="true"></span></summary>
    <div class="accordion-body"><p>${f.a}</p></div>
  </details>`).join('\n')}
</div>`;
}

function skillsList() {
  return `<ul class="chip-list reveal-stagger">${SKILLS.map((s) => `<li class="chip">${s}</li>`).join('')}</ul>`;
}

function engagementTiers() {
  return `<div class="grid grid-4 reveal-stagger">
${ENGAGEMENT_TIERS.map((t) => `  <div class="tier-card"><span class="tier-stage">${t.stage}</span><p class="tier-num">${t.n}</p><h3>${t.title}</h3><p>${t.text}</p><p class="tier-format">${t.format}</p></div>`).join('\n')}
</div>`;
}

function journeyList() {
  return `<ol class="journey reveal-stagger">${JOURNEY.map((j, i) => `<li><span class="journey-dot">${i + 1}</span><span>${j}</span></li>`).join('')}</ol>`;
}

function icpCompare() {
  return `<div class="table-compare reveal-stagger">
  <div class="compare-col good">
    <h3>${ICON.check} O EIXO é para você se...</h3>
    <ul class="list-check">${ICP_FIT.map((f) => `<li>${ICON.check}<span>${f}</span></li>`).join('')}</ul>
  </div>
  <div class="compare-col bad">
    <h3>${ICON.x} Não é para você se...</h3>
    <ul class="list-check">${ICP_NOT_FIT.map((f) => `<li>${ICON.x}<span>${f}</span></li>`).join('')}</ul>
  </div>
</div>`;
}

function galleryGrid() {
  return `<div class="gallery-grid reveal-stagger">
${GALLERY.map((g) => `  <figure class="gallery-item"><img src="/assets/img/${g.img}" alt="${g.alt}" loading="lazy" width="700" height="700"><figcaption>${g.caption}</figcaption></figure>`).join('\n')}
</div>`;
}

/* ---------------------------------------------------------------- */
/* Páginas                                                            */
/* ---------------------------------------------------------------- */
const pages = [];

/* ---- Início ---- */
pages.push(page({
  path: 'index.html',
  navKey: 'inicio',
  title: 'Programa EIXO Comercial | Gestão, Lucro e Escala com Método — Silvia Miranda',
  description: 'Estruture marketing, vendas e gestão para construir uma operação mais previsível, lucrativa e menos dependente do dono. Conheça o Programa EIXO Comercial, de Silvia Miranda.',
  crumbLabel: 'Início',
  main: `
<section class="hero">
  <div class="hero-blobs" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="container hero-grid-photo">
    <div>
      <p class="eyebrow hero-kicker">Programa EIXO Comercial</p>
      <h1 class="reveal">Uma operação comercial que <mark class="hl">vende, lucra e cresce</mark> sem depender de você para tudo.</h1>
      <p class="lede reveal">Gestão, lucro e escala com método. O Programa EIXO Comercial une marketing, vendas e gestão para transformar empresas que já vendem, mas ainda crescem no improviso, em operações mais previsíveis, lucrativas e preparadas para escalar.</p>
      <div class="hero-tagline reveal"><span class="bar"></span>Vendas com estrutura. Crescimento com autonomia.</div>
      <div class="hero-actions reveal">
        <a class="btn btn-primary btn-lg" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais sobre o EIXO ${ICON.arrow}</a>
        <a class="btn btn-outline btn-lg" href="/o-programa.html">Conhecer o programa</a>
      </div>
      <div class="hero-tags reveal">
        <span class="tag">${ICON.compass} Previsibilidade</span>
        <span class="tag">${ICON.coin} Lucro real</span>
        <span class="tag">${ICON.gear} Processos</span>
      </div>
    </div>
    <div class="hero-photo-wrap reveal">
      <div class="photo-frame"><img src="/assets/img/hero-silvia.jpg" alt="Silvia Miranda palestrando sobre estruturação comercial" width="1067" height="1600" loading="lazy"></div>
      <div class="hero-photo-badge"><strong>20+</strong><span>anos estruturando operações comerciais</span></div>
    </div>
  </div>
  <div class="container">${statRow()}</div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">O ponto de partida</p>
      <h2>O que impede sua empresa de crescer com consistência.</h2>
      <p class="lede">Muitos negócios conseguem gerar faturamento e, ainda assim, convivem com vendas que oscilam, metas sem base real, marketing e vendas trabalhando separados, margem apertada, equipe sem direção e decisões concentradas no dono.</p>
    </div>
    <p class="quote-block reveal" style="margin-bottom:36px">A empresa vende, mas não sabe exatamente por que vendeu. Fatura, mas não tem clareza sobre quanto realmente lucrou. Cresce, mas o crescimento aumenta a pressão, o retrabalho e a dependência do proprietário.</p>
    ${problemTags()}
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div class="reveal">
      <p class="eyebrow">O que é o EIXO</p>
      <h2>Crescer não depende apenas de vender mais, mas de organizar o que sustenta a venda.</h2>
      <p class="lede" style="margin-top:18px">É um programa de estruturação empresarial para donos de negócios que querem sair do improviso, organizar a gestão, melhorar a rentabilidade e construir escala com mais controle — analisando, decidindo, estruturando, aplicando e acompanhando cada frente da operação comercial.</p>
      <p class="lede" style="margin-top:14px">Quando a operação se organiza, não muda só o faturamento. Muda a forma como você vive o negócio.</p>
      <a class="btn btn-outline" style="margin-top:26px" href="/o-programa.html">Entender o programa completo ${ICON.arrow}</a>
    </div>
    <div class="reveal">${transformationsGrid()}</div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Os 3 pilares</p>
      <h2>Gestão, lucro e escala em um único método.</h2>
      <p class="lede" style="margin-inline:auto">No Programa EIXO Comercial, marketing e vendas não são tratados como áreas isoladas. A operação é analisada como um sistema único.</p>
    </div>
    ${pillarsTabs()}
    <div style="text-align:center;margin-top:40px" class="reveal"><a class="btn btn-outline" href="/pilares.html">Ver os 3 pilares em detalhe ${ICON.arrow}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Quem conduz</p>
      <h2>Silvia Miranda conhece a operação por dentro.</h2>
    </div>
    <div class="bio-grid reveal">
      <div class="bio-photo">
        <div class="photo-frame"><img src="/assets/img/silvia-headshot.jpg" width="733" height="1100" loading="lazy" alt="Silvia Miranda, estrategista comercial e criadora do Programa EIXO Comercial"></div>
        <div class="bio-badge"><span class="num">20+</span><span class="label">anos de experiência em vendas e gestão</span></div>
      </div>
      <div>
        <p class="lede">Mais de 20 anos de experiência nas áreas comercial, operacional, gestão de riscos e desenvolvimento de negócios. Ao longo da carreira, participou da geração e do apoio a mais de R$ 130 milhões em vendas, sendo R$ 128 milhões em produtos financeiros.</p>
        <p class="lede" style="margin-top:14px">Sua atuação não se limita a vender mais. Ela está concentrada em construir negócios mais organizados, rentáveis e preparados para crescer.</p>
        <a class="btn btn-outline" style="margin-top:24px" href="/sobre.html">Conhecer a trajetória completa ${ICON.arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Resultados apoiados</p>
      <h2>Resultados construídos em diferentes mercados e operações.</h2>
    </div>
    ${resultsGrid()}
    <div style="text-align:center;margin-top:40px" class="reveal"><a class="btn btn-outline" href="/resultados.html">Ver todos os resultados ${ICON.arrow}</a></div>
  </div>
</section>

${ctaBand({ title: 'Seu negócio não precisa apenas vender mais.', text: 'Ele precisa vender com previsibilidade, lucrar de verdade e crescer sem depender de você para tudo.' })}
`,
}));

/* ---- O Programa ---- */
pages.push(page({
  path: 'o-programa.html',
  navKey: 'programa',
  title: 'O Programa EIXO Comercial | Marketing, Vendas e Gestão Integrados',
  description: 'Entenda o que é o Programa EIXO Comercial: estruturação empresarial que une marketing, vendas e gestão para transformar vendas em lucro, previsibilidade e escala.',
  crumbLabel: 'O Programa',
  main: `
${pageHead({ eyebrow: 'O Programa', title: 'O que é o Programa EIXO Comercial?', lede: 'Um programa de estruturação empresarial para donos de negócios que querem sair do improviso, organizar a gestão, melhorar a rentabilidade e construir escala com mais controle.', crumbLabel: 'O Programa' })}

<section class="section">
  <div class="container">
    <div class="two-col reveal">
      <div>
        <p class="eyebrow">Diagnóstico</p>
        <h2>O que impede sua empresa de crescer com consistência.</h2>
        <p class="lede" style="margin-top:16px">Muitos negócios conseguem gerar faturamento e, ainda assim, convivem com vendas que oscilam, metas sem base real, marketing e vendas trabalhando separados, margem apertada, equipe sem direção e decisões concentradas no dono.</p>
        <p class="quote-block" style="margin-top:22px">O problema nem sempre é vender pouco. Muitas vezes, é não ter uma gestão capaz de transformar vendas em lucro, previsibilidade e escala.</p>
      </div>
      <div>${problemTags()}</div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Propósito</p>
      <h2>Criado para transformar crescimento em clareza, lucro, autonomia e qualidade de vida.</h2>
      <p class="lede">O Programa EIXO não foi criado apenas para aumentar receita. Porque no fim, uma empresa saudável precisa funcionar bem também para quem a lidera.</p>
    </div>
    ${transformationsGrid()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Como se conecta</p>
      <h2>Marketing, vendas e gestão na mesma direção.</h2>
      <p class="lede" style="margin-inline:auto">A operação é analisada como um sistema único, no qual estratégia, aquisição, conversão, pessoas, processos, indicadores e rentabilidade precisam trabalhar na mesma direção.</p>
    </div>
    ${triadGrid()}
    <p class="lede reveal" style="text-align:center;margin:36px auto 0">O objetivo não é gerar mais volume a qualquer custo. É atrair melhor, converter melhor, gerir melhor e crescer com mais lucro.</p>
  </div>
</section>

<section class="section dark">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Formato</p>
      <h2>Conhecimento aplicado ao negócio real.</h2>
      <p class="lede">Cada problema é tratado com o formato mais adequado. O programa pode combinar diferentes recursos, sempre com foco em decisão e implementação. Nem tudo precisa virar aula — alguns desafios exigem ferramenta, decisão, prática, implementação ou acompanhamento.</p>
    </div>
    ${formatsChips()}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">O método</p>
      <h2>Cinco etapas para sair do improviso.</h2>
    </div>
    ${methodStepper()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Como trabalhamos juntos</p>
      <h2>Quatro formas de aplicar o método, de acordo com o momento da empresa.</h2>
      <p class="lede">O nível de envolvimento muda conforme a necessidade: da análise inicial até o acompanhamento executivo de longo prazo.</p>
    </div>
    ${engagementTiers()}
  </div>
</section>

${ctaBand({ title: 'Quer entender se o EIXO é o próximo passo para sua empresa?', text: 'Fale com Silvia Miranda e solicite seu diagnóstico de aplicação gratuito.' })}
`,
}));

/* ---- Pilares ---- */
pages.push(page({
  path: 'pilares.html',
  navKey: 'pilares',
  title: 'Os 3 Pilares do EIXO Comercial | Gestão, Lucro e Escala',
  description: 'Conheça os três pilares do Programa EIXO Comercial — Gestão, Lucro e Escala — e tudo o que é estruturado ao longo do programa.',
  crumbLabel: 'Pilares',
  main: `
${pageHead({ eyebrow: 'Os 3 pilares', title: 'Gestão, lucro e escala em um único método.', lede: 'No Programa EIXO Comercial, marketing e vendas não são tratados como áreas isoladas. A operação é analisada como um sistema único.', crumbLabel: 'Pilares' })}

<section class="section">
  <div class="container">
    ${pillarsTabs()}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Escopo do programa</p>
      <h2>O que será estruturado ao longo do programa.</h2>
    </div>
    <div class="grid grid-2 reveal-stagger">
      ${STRUCTURE_LIST.map((s) => `<div class="pill-item good">${ICON.check}<span>${s}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section dark">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Formato</p>
      <h2>Conhecimento aplicado ao negócio real.</h2>
      <p class="lede">Cada problema é tratado com o formato mais adequado. O programa pode combinar diferentes recursos, sempre com foco em decisão e implementação.</p>
    </div>
    ${formatsChips()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">O método</p>
      <h2>Um programa desenhado para quem quer estruturar, não improvisar.</h2>
    </div>
    ${methodStepper()}
  </div>
</section>

${ctaBand({ title: 'Pronto para estruturar gestão, lucro e escala?', text: 'Solicite seu diagnóstico de aplicação gratuito e descubra por onde começar.' })}
`,
}));

/* ---- Para Quem É ---- */
pages.push(page({
  path: 'para-quem-e.html',
  navKey: 'para-quem-e',
  title: 'Para Quem É o Programa EIXO Comercial?',
  description: 'Veja se o Programa EIXO Comercial é adequado para o seu momento de negócio: para quem é feito e para quem não é indicado.',
  crumbLabel: 'Para Quem É',
  main: `
${pageHead({ eyebrow: 'Para quem é', title: 'Um programa desenhado para quem quer estruturar, não improvisar.', lede: 'Antes de avançar, é importante entender se este é o momento certo para o seu negócio e se há disposição real para implementar mudanças.', crumbLabel: 'Para Quem É' })}

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Perfil ideal</p>
      <h2>O EIXO foi desenhado para donos de PME que já saíram do zero.</h2>
    </div>
    ${icpCompare()}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Em detalhe</p>
      <h2>Critérios que ajudam a confirmar se este é o seu momento.</h2>
    </div>
    ${fitCompare()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Ainda com dúvidas?</p>
      <h2>Fale diretamente com Silvia Miranda.</h2>
      <p class="lede" style="margin-inline:auto">O diagnóstico de aplicação gratuito ajuda a entender se o Programa EIXO Comercial é adequado para este momento da sua empresa — sem compromisso de contratação imediata.</p>
    </div>
    <div style="text-align:center" class="reveal">
      <a class="btn btn-primary btn-lg" href="${WA_LINK}" target="_blank" rel="noopener">Solicitar diagnóstico gratuito ${ICON.arrow}</a>
    </div>
  </div>
</section>

${ctaBand({ title: 'Seu negócio não precisa apenas vender mais.', text: 'Ele precisa vender com previsibilidade, lucrar de verdade e crescer sem depender de você para tudo.' })}
`,
}));

/* ---- Sobre ---- */
pages.push(page({
  path: 'sobre.html',
  navKey: 'sobre',
  title: 'Sobre Silvia Miranda | Estrategista Comercial e Criadora do EIXO',
  description: 'Conheça a trajetória de Silvia Miranda: mais de 20 anos de experiência em vendas, operação e gestão, e mais de R$ 130 milhões em vendas geradas e apoiadas em 17+ segmentos.',
  ogImage: `${SITE_URL}/assets/img/og-image.jpg`,
  crumbLabel: 'Sobre',
  main: `
${pageHead({ eyebrow: 'Quem conduz o EIXO', title: 'Silvia Miranda conhece a operação por dentro.', lede: 'Mais de 20 anos de experiência nas áreas comercial, operacional, gestão de riscos e desenvolvimento de negócios.', crumbLabel: 'Sobre' })}

<section class="section">
  <div class="container">
    <div class="bio-grid reveal">
      <div class="bio-photo">
        <div class="photo-frame"><img src="/assets/img/silvia-headshot.jpg" width="733" height="1100" loading="lazy" alt="Silvia Miranda, estrategista comercial e criadora do Programa EIXO Comercial"></div>
        <div class="bio-badge"><span class="num">130M+</span><span class="label">em vendas geradas e apoiadas</span></div>
      </div>
      <div>
        <p class="quote-block">Eu profissionalizo a máquina comercial da sua empresa.</p>
        <p class="lede" style="margin-top:18px">Silvia Miranda possui mais de 20 anos de experiência nas áreas comercial, operacional, gestão de riscos e desenvolvimento de negócios. Ao longo da carreira, participou da geração e do apoio a mais de R$ 130 milhões em vendas, sendo R$ 128 milhões em produtos financeiros.</p>
        <p class="lede" style="margin-top:14px">Sua experiência em mais de 17 áreas e segmentos ampliou sua capacidade de:</p>
        <div style="margin-top:18px">${skillsList()}</div>
        <p class="lede" style="margin-top:20px">Sua atuação não se limita a vender mais. Ela está concentrada em construir negócios mais organizados, rentáveis e preparados para crescer.</p>
      </div>
    </div>
    ${statRow()}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Trajetória pessoal</p>
      <h2>De trabalhadora rural a especialista em estruturação comercial.</h2>
      <p class="lede" style="margin-inline:auto">Antes de estruturar operações comerciais de outras empresas, Silvia construiu o próprio caminho passando por realidades bem diferentes — o que hoje sustenta sua capacidade de entender negócios de qualquer segmento.</p>
    </div>
    ${journeyList()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Trajetória profissional</p>
      <h2>Negócios diferentes. Uma mesma capacidade de estruturar receita.</h2>
      <p class="lede">Não existe uma fórmula única para mercados diferentes. Existe capacidade de leitura, estratégia e adaptação. Ao longo da trajetória, atuação em operações de crédito, engenharia, turismo, saúde, carreira, educação, franquias, eventos e produtos digitais ampliou a capacidade de identificar gargalos, adaptar processos e tomar decisões comerciais de acordo com a realidade de cada negócio.</p>
    </div>
    ${casesGrid()}
    <p class="lede reveal" style="margin-top:30px;text-align:center">Resultados de operações apoiadas. Os resultados variam conforme mercado, oferta, estrutura, execução e momento de cada empresa.</p>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Bastidores</p>
      <h2>Onde você já pode ter visto Silvia Miranda.</h2>
      <p class="lede" style="margin-inline:auto">Palestras, painéis, podcasts e encontros de negócio pelo Brasil.</p>
    </div>
    ${galleryGrid()}
  </div>
</section>

${ctaBand({ title: 'Quer estruturar sua operação comercial com quem já viveu isso na prática?', text: 'Solicite seu diagnóstico de aplicação gratuito e converse diretamente com Silvia Miranda.' })}
`,
}));

/* ---- Resultados ---- */
pages.push(page({
  path: 'resultados.html',
  navKey: 'resultados',
  title: 'Resultados do Programa EIXO Comercial | Casos Reais',
  description: 'Resultados construídos em diferentes mercados e operações apoiadas por Silvia Miranda: lançamentos, expansão de receita, melhoria de conversão e reativação de base.',
  crumbLabel: 'Resultados',
  main: `
${pageHead({ eyebrow: 'Resultados apoiados', title: 'Resultados construídos em diferentes mercados e operações.', lede: 'O Programa EIXO Comercial não trabalha com promessas vazias. Trabalha com análise, método, processo, aplicação e acompanhamento.', crumbLabel: 'Resultados' })}

<section class="section">
  <div class="container">
    ${resultsGrid()}
    <p class="lede reveal" style="margin-top:30px;max-width:70ch">Os resultados variam conforme o mercado, a oferta, a estrutura, a capacidade de execução e o momento de cada empresa.</p>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Casos por segmento</p>
      <h2>Negócios diferentes. Uma mesma capacidade de estruturar receita.</h2>
      <p class="lede">Ao longo da trajetória de Silvia Miranda, atuação em operações de crédito, engenharia, turismo, saúde, carreira, educação, franquias, eventos e produtos digitais.</p>
    </div>
    ${casesGrid()}
  </div>
</section>

${ctaBand({ title: 'Seu negócio pode ser o próximo case de estruturação comercial.', text: 'Solicite seu diagnóstico de aplicação gratuito e descubra o que é possível para o seu momento.' })}
`,
}));

/* ---- FAQ ---- */
pages.push(page({
  path: 'faq.html',
  navKey: 'faq',
  title: 'Perguntas Frequentes | Programa EIXO Comercial',
  description: 'Tire suas dúvidas sobre o Programa EIXO Comercial: investimento, prazos, implementação, equipe comercial, marketing e vendas, garantias e cancelamento.',
  crumbLabel: 'FAQ',
  extraSchema: [{
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }],
  main: `
${pageHead({ eyebrow: 'Perguntas frequentes', title: 'Perguntas que ajudam na sua decisão.', lede: 'Reunimos as dúvidas mais comuns sobre o Programa EIXO Comercial para ajudar você a decidir com mais clareza.', crumbLabel: 'FAQ' })}

<section class="section">
  <div class="container" style="max-width:900px">
    ${faqAccordion()}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Diagnóstico gratuito</p>
      <h2>Solicite seu diagnóstico de aplicação gratuito.</h2>
      <p class="lede" style="margin-inline:auto">O diagnóstico de aplicação é uma análise inicial do momento da sua empresa. Não é uma contratação imediata. A partir das suas respostas, avaliaremos os principais desafios e se o Programa EIXO Comercial é adequado para este momento.</p>
    </div>
    <div style="text-align:center" class="reveal">
      <a class="btn btn-primary btn-lg" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais sobre o EIXO ${ICON.arrow}</a>
    </div>
  </div>
</section>
`,
}));

/* ---- Contato ---- */
pages.push(page({
  path: 'contato.html',
  navKey: '',
  title: 'Contato | Programa EIXO Comercial — Silvia Miranda',
  description: 'Fale com Silvia Miranda pelo WhatsApp e solicite o diagnóstico de aplicação gratuito do Programa EIXO Comercial.',
  crumbLabel: 'Contato',
  main: `
${pageHead({ eyebrow: 'Contato', title: 'Vamos conversar sobre o momento da sua empresa.', lede: 'O primeiro passo é um diagnóstico de aplicação gratuito — uma análise inicial, sem compromisso de contratação imediata.', crumbLabel: 'Contato' })}

<section class="section">
  <div class="container two-col">
    <div class="reveal">
      <p class="eyebrow">Diagnóstico de aplicação</p>
      <h2>O que acontece depois que você chama no WhatsApp.</h2>
      <ul class="list-check" style="margin-top:24px">
        <li>${ICON.check}<span>Você conta um pouco sobre o momento atual da sua empresa.</span></li>
        <li>${ICON.check}<span>Avaliamos os principais desafios da operação comercial.</span></li>
        <li>${ICON.check}<span>Verificamos se o Programa EIXO Comercial é adequado para este momento.</span></li>
        <li>${ICON.check}<span>Só depois disso o investimento é apresentado — sem contratação imediata.</span></li>
      </ul>
    </div>
    <div class="card reveal" style="text-align:center;padding:40px 30px">
      <div class="ico" style="margin-inline:auto">${ICON.whatsapp}</div>
      <h3>Fale agora no WhatsApp</h3>
      <p style="margin:10px 0 22px">(31) 98302-2570</p>
      <a class="btn btn-primary btn-lg btn-block" href="${WA_LINK}" target="_blank" rel="noopener">Quero saber mais sobre o EIXO ${ICON.arrow}</a>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Antes de falar</p>
      <h2>Dê uma olhada em quem é o programa e quem conduz.</h2>
    </div>
    <div class="grid grid-3 reveal-stagger">
      <div class="card"><div class="ico">${ICON.target}</div><h3>O Programa</h3><p>Entenda como marketing, vendas e gestão se conectam no método EIXO.</p><a class="btn btn-outline" style="margin-top:16px" href="/o-programa.html">Ver o programa ${ICON.arrow}</a></div>
      <div class="card"><div class="ico">${ICON.users}</div><h3>Para Quem É</h3><p>Veja se este é o momento certo para o seu negócio.</p><a class="btn btn-outline" style="margin-top:16px" href="/para-quem-e.html">Ver critérios ${ICON.arrow}</a></div>
      <div class="card"><div class="ico">${ICON.chart}</div><h3>Resultados</h3><p>Conheça resultados de operações já apoiadas por Silvia Miranda.</p><a class="btn btn-outline" style="margin-top:16px" href="/resultados.html">Ver resultados ${ICON.arrow}</a></div>
    </div>
  </div>
</section>
`,
}));

/* ---------------------------------------------------------------- */
/* Escrita dos arquivos                                               */
/* ---------------------------------------------------------------- */
for (const html of pages) {
  const match = html.match(/data-page="[^"]*"/);
}

const pathsMap = ['index.html', 'o-programa.html', 'pilares.html', 'para-quem-e.html', 'sobre.html', 'resultados.html', 'faq.html', 'contato.html'];
pages.forEach((html, i) => {
  writeFileSync(join(ROOT, pathsMap[i]), html, 'utf8');
  console.log('wrote', pathsMap[i]);
});

/* ---------------------------------------------------------------- */
/* robots.txt + sitemap.xml + llms.txt                                */
/* ---------------------------------------------------------------- */
const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
writeFileSync(join(ROOT, 'robots.txt'), robots, 'utf8');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pathsMap.map((p) => `  <url>
    <loc>${SITE_URL}/${p === 'index.html' ? '' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === 'index.html' ? '1.0' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

const llms = `# Programa EIXO Comercial — Silvia Miranda

> Programa de estruturação empresarial que une marketing, vendas e gestão para transformar empresas que já vendem, mas crescem no improviso, em operações previsíveis, lucrativas e escaláveis. Criado e conduzido por Silvia Miranda, estrategista comercial com mais de 20 anos de experiência em vendas, operação, gestão de riscos e desenvolvimento de negócios, com participação na geração e apoio de mais de R$ 130 milhões em vendas em 17+ segmentos de mercado.

## Sobre o programa
O Programa EIXO Comercial trabalha três pilares — Gestão, Lucro e Escala — analisando a operação comercial como um sistema único, no qual marketing, vendas e gestão precisam trabalhar na mesma direção. Não é um curso: combina diagnóstico, ferramentas, encontros ao vivo, planos de ação e acompanhamento, seguindo um método de 5 etapas (Analisar, Decidir, Estruturar, Aplicar, Acompanhar).

## Páginas
- [Início](${SITE_URL}/): visão geral do programa, estatísticas e chamada principal.
- [O Programa](${SITE_URL}/o-programa.html): o que é o EIXO, o problema que resolve e como marketing, vendas e gestão se conectam.
- [Pilares](${SITE_URL}/pilares.html): detalhamento dos pilares Gestão, Lucro e Escala, e o que é estruturado no programa.
- [Para Quem É](${SITE_URL}/para-quem-e.html): critérios de fit e não fit para participar do programa.
- [Sobre](${SITE_URL}/sobre.html): biografia de Silvia Miranda e cases de clientes por segmento.
- [Resultados](${SITE_URL}/resultados.html): resultados numéricos de operações apoiadas.
- [FAQ](${SITE_URL}/faq.html): perguntas frequentes sobre investimento, prazos, implementação e cancelamento.
- [Contato](${SITE_URL}/contato.html): como solicitar o diagnóstico de aplicação gratuito via WhatsApp.

## Contato
WhatsApp: +55 31 98302-2570 — diagnóstico de aplicação gratuito, sem contratação imediata.
`;
writeFileSync(join(ROOT, 'llms.txt'), llms, 'utf8');

console.log('robots.txt, sitemap.xml e llms.txt gerados.');
