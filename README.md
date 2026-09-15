# Site — Programa EIXO Comercial (Silvia Miranda)

Site institucional estático, multi-página, do Programa EIXO Comercial, conduzido por Silvia Miranda. Substitui o site anterior (Lovable) mantendo todo o conteúdo original, reorganizado em páginas temáticas com navegação em estilo abas, design responsivo e otimizado para indexação por buscadores e por IAs (SEO + AI search).

## Estrutura

Site estático (HTML + CSS + JS), sem framework nem build obrigatório para rodar — pronto para qualquer hospedagem estática (GitHub Pages, Hostinger, etc.).

```
index.html            Início
o-programa.html        O Programa
pilares.html            Pilares (Gestão / Lucro / Escala)
para-quem-e.html        Para Quem É
sobre.html               Sobre Silvia Miranda
resultados.html          Resultados
faq.html                 Perguntas frequentes
contato.html              Contato / WhatsApp
assets/css/style.css      Design system e estilos
assets/js/main.js         Interações (menu, abas, accordion, animações)
assets/img/               Imagens e ícones (inclui logo oficial da Chave Mestre)
robots.txt, sitemap.xml, llms.txt   SEO e descoberta por crawlers de IA
scripts/build.mjs         Gerador das páginas HTML (mantém header/footer/SEO consistentes)
scripts/dev-server.mjs    Servidor estático simples para pré-visualização local
```

## Editar conteúdo

Todo o conteúdo textual das páginas vive em `scripts/build.mjs` (arrays como `FAQ`, `CASES`, `RESULTS`, `PILLARS`, etc.). Após editar, gere os `.html` novamente:

```bash
npm run build
```

Isso mantém cabeçalho, rodapé, breadcrumbs e dados estruturados (JSON-LD) idênticos em todas as páginas.

## Pré-visualizar localmente

```bash
node scripts/dev-server.mjs
```

Abre em `http://localhost:4173`.

## Publicar

O site é 100% estático — basta enviar os arquivos para qualquer hospedagem (Hostinger, GitHub Pages, etc.). Domínio de produção: `silviamiranda.com.br`.

## Créditos

Desenvolvido por [Chave Mestre Soluções de TI](https://chavemestresolucoes.com).
