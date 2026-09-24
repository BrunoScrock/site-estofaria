# Estofaria Capital

Site institucional para divulgação de serviços de reparo, reforma e restauração de estofados.

**"Seu estofado renovado como novo."**

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub Pages

Sem backend, sem banco de dados, sem bibliotecas pesadas. O site funciona abrindo o `index.html` diretamente ou hospedado no GitHub Pages.

## Estrutura de Pastas

```text
site-estofaria/
├── index.html
├── README.md
├── .gitignore
├── robots.txt
├── sitemap.xml
├── llms.txt
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── script.js
└── assets/
    └── images/
        ├── logo/
        ├── hero/
        ├── empresa/
        ├── servicos/
        ├── antes-depois/
        │   ├── projeto-01/
        │   ├── projeto-02/
        │   ├── projeto-03/
        │   └── projeto-04/
        ├── portfolio/
        │   ├── sofa/
        │   ├── poltrona/
        │   ├── cadeira/
        │   ├── banco/
        │   └── outros/
        └── estudio/
```

## Como executar localmente

Abra o arquivo `index.html` diretamente no navegador.

Ou, se preferir, use um servidor simples:

```bash
# Python
python -m http.server 8000
```

```bash
# Node.js (npx)
npx serve
```

Acesse `http://localhost:8000`.

## Como trocar o logotipo

1. Substitua o arquivo `assets/images/logo/logo-gl.svg` pelo seu logotipo.
2. Ou altere o texto/abreviação no `js/config.js` (`CONFIG.logoNome`).
3. O texto do logo é renderizado automaticamente a partir da configuração.

## Como trocar fotos

Todas as imagens ficam em `assets/images/`. Basta substituir os arquivos mantendo os mesmos nomes:

- `assets/images/hero/hero-01.jpg` — imagem de fundo do Hero
- `assets/images/empresa/` — fotos da seção Sobre
- `assets/images/estudio/tecido-01.jpg` a `tecido-04.jpg` — seção de acabamentos
- `assets/images/portfolio/sofa/` `poltrona/` `cadeira/` `banco/` — trabalhos realizados
- `assets/images/antes-depois/projeto-01/` a `projeto-04/` — projetos antes/depois

Use imagens comprimidas (WebP ou JPG otimizado) para manter o site rápido.

## Como adicionar projetos ao portfólio

Abra `js/config.js`, localize o array `PORTFOLIO` e adicione um novo item:

```javascript
{
  tag: "Sofás",                    // Categoria exibida
  titulo: "Reforma de Sofá",
  descricao: "Descrição do projeto.",
  imagem: "assets/images/portfolio/sofa/novo-projeto.jpg",
  imagens: [
    "assets/images/portfolio/sofa/novo-projeto.jpg",
    "assets/images/portfolio/sofa/novo-projeto-2.jpg"
  ],
  categoria: "Sofás"               // Filtro (Sofás / Poltronas / Cadeiras / Bancos / Outros)
}
```

O item aparecerá automaticamente na seção "Trabalhos Realizados" e no Lightbox.

## Como adicionar projetos antes/depois

Abra `js/config.js`, localize o array `ANTES_DEPOIS` e adicione:

```javascript
{
  id: "projeto-05",
  titulo: "Reforma de Poltrona",
  categoria: "Poltronas",
  antes: "assets/images/antes-depois/projeto-05/antes.jpg",
  depois: "assets/images/antes-depois/projeto-05/depois.jpg",
  descricao: "Descrição do trabalho realizado."
}
```

O novo projeto aparecerá automaticamente no slider interativo e na galeria antes/depois.

## Como trocar o WhatsApp

Abra `js/config.js` e preencha:

```javascript
whatsapp: "5541999999999",  // 55 + DDD + número, somente dígitos
```

## Como alterar textos

Todos os textos principais ficam no `js/config.js`:

- `CONFIG.empresa` — nome da empresa
- `CONFIG.slogan` — slogan exibido no Hero
- `CONFIG.tagline` — tagline exibida no `<title>`
- `CONFIG.email`, `CONFIG.instagram`, `CONFIG.cidade`, `CONFIG.endereco`, `CONFIG.horario` — contatos e localização
- `SERVICOS` — lista de serviços (título, descrição, detalhes)
- `PROCESSO` — etapas do processo
- `DIFERENCIAIS` — diferenciais exibidos

Para textos institucionais (seção Sobre), edite diretamente no `index.html` (substitua os placeholders `[INSERIR ...]`).

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `site-estofaria`).
2. Envie os arquivos:

```bash
git init
git add .
git commit -m "Primeira versão do site Estofaria Capital"
git branch -M main
git remote add origin https://github.com/seu-usuario/site-estofaria.git
git push -u origin main
```

3. No GitHub, acesse **Settings → Pages**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`, e clique em **Save**.
5. O site ficará disponível em `https://seu-usuario.github.io/site-estofaria/`.

**Importante:** todos os caminhos de imagens e arquivos usam caminhos relativos — funcionam em qualquer subpasta do GitHub Pages sem alteração.

## Funcionalidades

- Hero cinematográfico com efeito Ken Burns
- Título animado (reveal letra por letra, blur, shimmer)
- Slider interativo Antes e Depois (mouse + touch + teclado)
- Galeria de antes/depois com filtros
- Lightbox (teclado, touch, setas)
- Portfólio em layout masonry/editorial
- Formulário de orçamento integrado com WhatsApp
- Botão flutuante WhatsApp
- Menu responsivo
- Animações de scroll (IntersectionObserver)
- Suporte a `prefers-reduced-motion`
- SEO (Open Graph, Twitter Cards, Schema.org, sitemap, robots.txt)

## Observações

As informações com `[INSERIR ...]` são placeholders que devem ser substituídas pelos dados reais da empresa antes da publicação. Nenhuma informação fictícia é apresentada como real.