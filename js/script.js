/* ==========================================================================
   ESTOFARIA CAPITAL — Funcionalidades Principais
   ========================================================================== */

/* --------------------------------------------------------------------------
   WHATSAPP CENTRALIZADO
   -------------------------------------------------------------------------- */

function obterWhatsapp() {
  return String(CONFIG.whatsapp || "").replace(/\D/g, "");
}

function semWhatsappConfigurado() {
  alert(
    "WhatsApp ainda não configurado.\n\n" +
    "Abra o arquivo js/config.js e preencha CONFIG.whatsapp " +
    "com o número no formato 55 + DDD + número (somente dígitos)."
  );
}

function gerarUrlWhatsApp(mensagem) {
  const numero = obterWhatsapp();
  if (numero.length < 10) {
    semWhatsappConfigurado();
    return "";
  }
  const texto = encodeURIComponent(mensagem);
  return "https://api.whatsapp.com/send?phone=" + numero + "&text=" + texto;
}

function abrirWhatsApp(mensagem) {
  const url = gerarUrlWhatsApp(mensagem);
  if (url) window.open(url, "_blank", "noopener");
}

function enviarSolicitacao() {
  abrirWhatsApp(CONFIG.mensagemPadrao || "Olá, Estofaria Capital! Gostaria de solicitar um orçamento.");
}

function enviarFotosWhatsApp() {
  const msg = "Olá, Estofaria Capital! Envio fotos do meu móvel para avaliação de orçamento.";
  abrirWhatsApp(msg);
}

/* --------------------------------------------------------------------------
   FORMULÁRIO DE ORÇAMENTO
   -------------------------------------------------------------------------- */

function enviarFormulario(event) {
  event.preventDefault();

  const form = event.target;
  const nome = form.querySelector('[name="nome"]').value.trim();
  const telefone = form.querySelector('[name="telefone"]').value.trim();
  const mobili = form.querySelector('[name="mobili"]').value;
  const servico = form.querySelector('[name="servico"]').value;
  const mensagemExtra = form.querySelector('[name="mensagem"]').value.trim();

  if (!nome || !telefone) {
    alert("Por favor, preencha os campos obrigatórios (Nome e WhatsApp).");
    return;
  }

  let mensagem = "Olá, Estofaria Capital! Meu nome é " + nome + " e gostaria de solicitar um orçamento.\n\n";
  if (mobili) mensagem += "*Tipo de móvel:* " + mobili + "\n";
  if (servico) mensagem += "*Serviço:* " + servico + "\n";
  if (mensagemExtra) mensagem += "*Descrição:* " + mensagemExtra + "\n";
  mensagem += "\nAguardo confirmação. Obrigado!";

  abrirWhatsApp(mensagem);
}

/* --------------------------------------------------------------------------
   PREENCHIMENTO AUTOMÁTICO COM BASE NA CONFIGURAÇÃO
   -------------------------------------------------------------------------- */

function aplicarConfiguracao() {
  const logoNome = document.getElementById("logo-nome");
  const logoMark = document.getElementById("logo-mark");
  const footerNome = document.getElementById("footer-nome");
  const footerSub = document.getElementById("footer-sub");
  const copyrightNome = document.getElementById("copyright-nome");
  const heroSub = document.getElementById("hero-subtitulo");
  const ctaFooterDesc = document.getElementById("slogan-footer");
  const heroTitleLine1 = document.getElementById("hero-title-line-1");

  if (logoNome) logoNome.textContent = CONFIG.empresa;
  if (logoMark) logoMark.textContent = CONFIG.logoNome || "E";
  const logoSub = document.getElementById("logo-sub");
  if (logoSub) logoSub.textContent = CONFIG.subtitulo || CONFIG.tagline;
  if (footerNome) footerNome.textContent = CONFIG.empresa;
  if (footerSub) footerSub.textContent = CONFIG.subtitulo;
  if (copyrightNome) copyrightNome.textContent = CONFIG.empresa;

  document.title = CONFIG.empresa + " | " + CONFIG.tagline;

  if (heroSub && CONFIG.slogan) heroSub.textContent = CONFIG.slogan;
  if (ctaFooterDesc && CONFIG.slogan) ctaFooterDesc.textContent = CONFIG.slogan;
  if (heroTitleLine1) heroTitleLine1.textContent = CONFIG.empresa || "ESTOFARIA CAPITAL";

  const badgeHorario2 = document.getElementById("badge-horario-2");
  if (badgeHorario2) badgeHorario2.textContent = CONFIG.horario || "[INSERIR HORÁRIO]";

  const coverageText = document.getElementById("coverage-text");
  if (coverageText) {
    coverageText.textContent = CONFIG.atendimento && !CONFIG.atendimento.startsWith("[INSERIR")
      ? "Atendimento em " + CONFIG.atendimento
      : "[INSERIR ÁREA DE ATENDIMENTO]";
  }

  const formCidade = document.getElementById("form-cidade");
  if (formCidade) {
    formCidade.textContent = CONFIG.cidade && !CONFIG.cidade.startsWith("[INSERIR")
      ? CONFIG.cidade
      : "[INSERIR CIDADE]";
  }

  document.querySelectorAll(".js-phone").forEach(function (el) {
    const limpo = String(CONFIG.telefone || "").replace(/\s/g, "");
    if (/\d/.test(limpo)) {
      el.textContent = CONFIG.telefone;
      el.setAttribute("href", "tel:" + limpo.replace(/\D/g, ""));
    }
  });

  document.querySelectorAll(".js-email").forEach(function (el) {
    if (String(CONFIG.email || "").includes("@")) {
      el.textContent = CONFIG.email;
      el.setAttribute("href", "mailto:" + CONFIG.email);
    }
  });

  const numero = obterWhatsapp();
  const urlWhatsApp = numero.length >= 10 ? gerarUrlWhatsApp(CONFIG.mensagemPadrao) : "";

  if (urlWhatsApp) {
    document.querySelectorAll(".js-whatsapp-solicitar").forEach(function (el) {
      el.setAttribute("href", urlWhatsApp);
    });
    const whatsAppFloat = document.getElementById("whatsapp-float");
    if (whatsAppFloat) whatsAppFloat.setAttribute("href", urlWhatsApp);
  }

  document.addEventListener("click", function (e) {
    const alvo = e.target.closest(".js-whatsapp-solicitar");
    if (alvo) {
      e.preventDefault();
      if (urlWhatsApp) enviarSolicitacao();
      else semWhatsappConfigurado();
    }
  });

  const fotosBtn = document.querySelector(".js-whatsapp-fotos");
  if (fotosBtn) {
    fotosBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (urlWhatsApp) enviarFotosWhatsApp();
      else semWhatsappConfigurado();
    });
  }

  const enderecoEl = document.getElementById("footer-endereco");
  const enderecoFooter2 = document.getElementById("footer-endereco-2");
  const temEndereco = CONFIG.endereco && !String(CONFIG.endereco).startsWith("[INSERIR");

  if (enderecoEl && temEndereco) {
    enderecoEl.textContent = CONFIG.endereco + (CONFIG.cidade && !String(CONFIG.cidade).startsWith("[INSERIR") ? " · " + CONFIG.cidade : "");
  }

  if (enderecoFooter2 && temEndereco) {
    enderecoFooter2.textContent = CONFIG.endereco;
  }

  const mapaPlaceholder = document.getElementById("mapa-placeholder");
  const mapaIframe = document.getElementById("mapa-iframe");
  const mapaLink = document.getElementById("mapa-link");
  const mapaUrl = CONFIG.mapaOpenStreetMap && String(CONFIG.mapaOpenStreetMap).startsWith("http")
    ? CONFIG.mapaOpenStreetMap
    : "";
  const mapaLinkGoogle = CONFIG.mapaLinkGoogle && String(CONFIG.mapaLinkGoogle).startsWith("http")
    ? CONFIG.mapaLinkGoogle
    : "";

  if (mapaPlaceholder && mapaIframe && mapaLink) {
    const temMapa = !!mapaUrl;
    if (temMapa) {
      mapaIframe.setAttribute("src", mapaUrl);
      if (mapaLinkGoogle) mapaLink.setAttribute("href", mapaLinkGoogle);
    }
    mapaIframe.hidden = !temMapa;
    mapaLink.hidden = !temMapa;
    mapaPlaceholder.hidden = temMapa;
  }

  const instagram = document.getElementById("footer-instagram");
  if (instagram && CONFIG.instagram && !CONFIG.instagram.startsWith("[INSERIR")) {
    instagram.setAttribute("href", CONFIG.instagram);
  }

  const anoAtual = document.getElementById("ano-atual");
  if (anoAtual) anoAtual.textContent = new Date().getFullYear();

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   ANIMAÇÃO DO TÍTULO DO HERO (REVEAL + BLUR + SHIMMER)
   -------------------------------------------------------------------------- */

function animarTituloHero() {
  const h1 = document.querySelector(".hero-title");
  const linhas = document.querySelectorAll(".hero-title .line-inner");
  if (!h1 || !linhas.length) return;

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzirMovimento) return;

  if (!h1.querySelector(".hero-char")) {
    linhas.forEach(function (linha) {
      const texto = linha.textContent.trim();
      if (!texto) return;

      linha.setAttribute("aria-hidden", "true");
      let html = "";
      let indice = 0;

      texto.split("").forEach(function (ch) {
        if (ch === " ") {
          html += '<span class="hero-char hero-char-space" aria-hidden="true">\u00A0</span>';
        } else {
          html += '<span class="hero-char" aria-hidden="true" style="--d:' + indice * 45 + 'ms">' + ch + "</span>";
          indice++;
        }
      });

      linha.innerHTML = html;
    });

    h1.classList.add("hero-title-animated");
  }
}

/* --------------------------------------------------------------------------
   MONTAR SERVIÇOS
   -------------------------------------------------------------------------- */

function montarServicos() {
  const grid = document.getElementById("servicos-grid");
  if (!grid || typeof SERVICOS === "undefined") return;

  grid.innerHTML = "";

  SERVICOS.forEach(function (servico) {
    var card = document.createElement("article");
    card.className = "service-card reveal";

    var iconHtml = '<div class="service-icon"><i data-lucide="' + (servico.icone || "cog") + '" aria-hidden="true"></i></div>';
    var titleHtml = "<h3>" + servico.titulo + "</h3>";
    var descHtml = "<p>" + servico.descricao + "</p>";

    var listHtml = "";
    if (servico.detalhes && servico.detalhes.length) {
      listHtml = '<ul class="service-list">';
      servico.detalhes.forEach(function (d) {
        listHtml += "<li>" + d + "</li>";
      });
      listHtml += "</ul>";
    }

    var btnHtml = '<a href="#" class="btn-cta btn-cta-secondary js-whatsapp-solicitar" style="align-self:flex-start;font-size:0.82rem;padding:10px 20px;">Solicitar <i data-lucide="arrow-right" aria-hidden="true"></i></a>';

    card.innerHTML = iconHtml + titleHtml + descHtml + listHtml + btnHtml;
    grid.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   MONTAR PROCESSO
   -------------------------------------------------------------------------- */

function montarProcesso() {
  const grid = document.getElementById("process-grid");
  if (!grid || typeof PROCESSO === "undefined") return;

  grid.innerHTML = "";

  PROCESSO.forEach(function (etapa) {
    var item = document.createElement("article");
    item.className = "process-item reveal";
    item.innerHTML =
      '<span class="process-number">' + etapa.numero + "</span>" +
      '<div class="process-icon"><i data-lucide="' + (etapa.icone || "check") + '" aria-hidden="true"></i></div>' +
      "<h3>" + etapa.titulo + "</h3>" +
      "<p>" + etapa.descricao + "</p>";
    grid.appendChild(item);
  });

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   MONTAR DIFERENCIAIS
   -------------------------------------------------------------------------- */

function montarDiferenciais() {
  const grid = document.getElementById("diff-grid");
  if (!grid || typeof DIFERENCIAIS === "undefined") return;

  grid.innerHTML = "";

  DIFERENCIAIS.forEach(function (diff) {
    var card = document.createElement("article");
    card.className = "diff-card reveal";
    card.innerHTML =
      '<div class="diff-icon"><i data-lucide="' + (diff.icone || "check") + '" aria-hidden="true"></i></div>' +
      "<h3>" + diff.titulo + "</h3>" +
      "<p>" + diff.descricao + "</p>";
    grid.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   MONTAR PORTFÓLIO (MASONRY)
   -------------------------------------------------------------------------- */

function montarPortfolio() {
  const grid = document.getElementById("portfolio-masonry");
  if (!grid || typeof PORTFOLIO === "undefined") return;

  grid.innerHTML = "";

  PORTFOLIO.forEach(function (item, i) {
    var el = document.createElement("div");
    el.className = "portfolio-item";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", item.titulo);
    el.innerHTML =
      '<img src="' + item.imagem + '" alt="' + item.titulo + '" loading="lazy">' +
      '<div class="portfolio-info">' +
        '<div class="portfolio-tag">' + item.tag + "</div>" +
        '<div class="portfolio-title">' + item.titulo + "</div>" +
      "</div>";
    el.addEventListener("click", function () {
      abrirLightboxPortfolio(i);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirLightboxPortfolio(i);
      }
    });
    grid.appendChild(el);
  });
}

/* --------------------------------------------------------------------------
   LIGHTBOX PORTFÓLIO
   -------------------------------------------------------------------------- */

var lightboxOverlay = null;
var portfolioAtual = 0;
var portfolioFotos = 0;

function criarLightbox() {
  if (lightboxOverlay) return;

  lightboxOverlay = document.createElement("div");
  lightboxOverlay.className = "lightbox";
  lightboxOverlay.setAttribute("role", "dialog");
  lightboxOverlay.setAttribute("aria-modal", "true");
  lightboxOverlay.setAttribute("aria-label", "Galeria de fotos da Estofaria Capital");
  lightboxOverlay.innerHTML =
    '<button class="lightbox-close" aria-label="Fechar galeria"><i data-lucide="x"></i></button>' +
    '<div class="lightbox-counter"></div>' +
    '<button class="lightbox-arrow prev" aria-label="Foto anterior"><i data-lucide="chevron-left"></i></button>' +
    '<button class="lightbox-arrow next" aria-label="Próxima foto"><i data-lucide="chevron-right"></i></button>' +
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" src="" alt="">' +
      '<figcaption>' +
        '<span class="coverflow-tag lightbox-tag"></span>' +
        '<h3 class="lightbox-title"></h3>' +
        '<p class="lightbox-desc"></p>' +
      "</figcaption>" +
    "</figure>";
  document.body.appendChild(lightboxOverlay);

  lightboxOverlay.querySelector(".lightbox-close").addEventListener("click", fecharLightbox);
  lightboxOverlay.querySelector(".lightbox-arrow.prev").addEventListener("click", function (e) {
    e.stopPropagation();
    fotoAnterior();
  });
  lightboxOverlay.querySelector(".lightbox-arrow.next").addEventListener("click", function (e) {
    e.stopPropagation();
    fotoProxima();
  });
  lightboxOverlay.addEventListener("click", function (e) {
    if (e.target === lightboxOverlay) fecharLightbox();
  });

  lightboxOverlay.addEventListener("touchstart", function (e) {
    this._touchX = e.touches[0].clientX;
  }, { passive: true });

  lightboxOverlay.addEventListener("touchend", function (e) {
    var diff = e.changedTouches[0].clientX - (this._touchX || 0);
    if (Math.abs(diff) > 45) {
      if (diff < 0) fotoProxima();
      else fotoAnterior();
    }
  }, { passive: true });

  document.addEventListener("keydown", function (e) {
    if (!lightboxOverlay || !lightboxOverlay.classList.contains("open")) return;
    if (e.key === "Escape") { fecharLightbox(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { fotoAnterior(); e.preventDefault(); }
    else if (e.key === "ArrowRight") { fotoProxima(); e.preventDefault(); }
  });
}

function abrirLightboxPortfolio(i) {
  criarLightbox();
  portfolioAtual = i;
  var item = PORTFOLIO[i];
  var fotos = Array.isArray(item.imagens) && item.imagens.length ? item.imagens : [item.imagem];
  portfolioFotos = fotos.length;

  lightboxOverlay.querySelector(".lightbox-img").src = fotos[0];
  lightboxOverlay.querySelector(".lightbox-img").alt = item.titulo;
  lightboxOverlay.querySelector(".lightbox-tag").textContent = item.tag;
  lightboxOverlay.querySelector(".lightbox-title").textContent = item.titulo;
  lightboxOverlay.querySelector(".lightbox-desc").textContent = item.descricao || "";
  lightboxOverlay.querySelector(".lightbox-counter").textContent = portfolioFotos > 1 ? "1 / " + portfolioFotos : "";

  var arrows = lightboxOverlay.querySelectorAll(".lightbox-arrow");
  arrows.forEach(function (a) { a.style.display = portfolioFotos > 1 ? "flex" : "none"; });

  lightboxOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
  if (window.lucide) window.lucide.createIcons();
}

function fecharLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function fotoAnterior() {
  if (portfolioFotos <= 1) return;
  portfolioAtual = (portfolioAtual - 1 + portfolioFotos) % portfolioFotos;
  var fotos = getFotosAtuais();
  lightboxOverlay.querySelector(".lightbox-img").src = fotos[portfolioAtual];
  lightboxOverlay.querySelector(".lightbox-img").alt = PORTFOLIO[portfolioAtual].titulo;
  lightboxOverlay.querySelector(".lightbox-counter").textContent = (portfolioAtual + 1) + " / " + portfolioFotos;
}

function fotoProxima() {
  if (portfolioFotos <= 1) return;
  portfolioAtual = (portfolioAtual + 1) % portfolioFotos;
  var fotos = getFotosAtuais();
  lightboxOverlay.querySelector(".lightbox-img").src = fotos[portfolioAtual];
  lightboxOverlay.querySelector(".lightbox-img").alt = PORTFOLIO[portfolioAtual].titulo;
  lightboxOverlay.querySelector(".lightbox-counter").textContent = (portfolioAtual + 1) + " / " + portfolioFotos;
}

function getFotosAtuais() {
  return Array.isArray(PORTFOLIO[portfolioAtual].imagens) && PORTFOLIO[portfolioAtual].imagens.length
    ? PORTFOLIO[portfolioAtual].imagens
    : [PORTFOLIO[portfolioAtual].imagem];
}

/* --------------------------------------------------------------------------
   MONTAR GALERIA ANTES E DEPOIS
   -------------------------------------------------------------------------- */

var galeriaADItems = [];

function montarGaleriaAD() {
  var grid = document.getElementById("gallery-ad-grid");
  if (!grid || typeof ANTES_DEPOIS === "undefined") return;

  grid.innerHTML = "";
  galeriaADItems = ANTES_DEPOIS.slice();

  galeriaADItems.forEach(function (item, i) {
    var card = document.createElement("div");
    card.className = "gallery-ad-card";
    card.dataset.categoria = item.categoria;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", item.titulo + " — antes e depois");
    card.innerHTML =
      '<img src="' + item.depois + '" alt="' + item.titulo + '" loading="lazy">' +
      '<div class="card-overlay">' +
        '<div class="card-tag">' + item.categoria + "</div>" +
        '<div class="card-title">' + item.titulo + "</div>" +
        '<div class="card-desc">' + item.descricao + "</div>" +
      "</div>";
    card.addEventListener("click", function () {
      abrirLightboxAD(i);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirLightboxAD(i);
      }
    });
    grid.appendChild(card);
  });
}

var lightboxADOverlay = null;
var adAtual = 0;

function criarLightboxAD() {
  if (lightboxADOverlay) return;

  lightboxADOverlay = document.createElement("div");
  lightboxADOverlay.className = "lightbox";
  lightboxADOverlay.setAttribute("role", "dialog");
  lightboxADOverlay.setAttribute("aria-modal", "true");
  lightboxADOverlay.setAttribute("aria-label", "Galeria antes e depois da Estofaria Capital");
  lightboxADOverlay.innerHTML =
    '<button class="lightbox-close" aria-label="Fechar galeria"><i data-lucide="x"></i></button>' +
    '<div class="lightbox-counter"></div>' +
    '<button class="lightbox-arrow prev" aria-label="Projeto anterior"><i data-lucide="chevron-left"></i></button>' +
    '<button class="lightbox-arrow next" aria-label="Próximo projeto"><i data-lucide="chevron-right"></i></button>' +
    '<figure class="lightbox-figure">' +
      '<div class="ba-slider" style="max-width:900px;margin:0 auto;">' +
        '<img class="ba-depois-img" src="" alt="">' +
        '<div class="ba-after"><img class="ba-antes-img" src="" alt=""></div>' +
        '<div class="ba-handle"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l-6 8 6 8"/><path d="M16 4l6 8-6 8"/></svg></div>' +
        '<span class="ba-label ba-label-before">ANTES</span>' +
        '<span class="ba-label ba-label-after">DEPOIS</span>' +
      '</div>' +
      '<figcaption>' +
        '<span class="coverflow-tag lightbox-tag"></span>' +
        '<h3 class="lightbox-title"></h3>' +
        '<p class="lightbox-desc"></p>' +
      "</figcaption>" +
    "</figure>";
  document.body.appendChild(lightboxADOverlay);

  lightboxADOverlay.querySelector(".lightbox-close").addEventListener("click", fecharLightboxAD);
  lightboxADOverlay.querySelector(".lightbox-arrow.prev").addEventListener("click", function (e) {
    e.stopPropagation();
    adAnterior();
  });
  lightboxADOverlay.querySelector(".lightbox-arrow.next").addEventListener("click", function (e) {
    e.stopPropagation();
    adProximo();
  });
  lightboxADOverlay.addEventListener("click", function (e) {
    if (e.target === lightboxADOverlay) fecharLightboxAD();
  });

  lightboxADOverlay.addEventListener("touchstart", function (e) {
    this._touchX = e.touches[0].clientX;
  }, { passive: true });

  lightboxADOverlay.addEventListener("touchend", function (e) {
    var diff = e.changedTouches[0].clientX - (this._touchX || 0);
    if (Math.abs(diff) > 45) {
      if (diff < 0) adProximo();
      else adAnterior();
    }
  }, { passive: true });

  lightboxADOverlay.addEventListener("touchstart", function (e) {
    this._sliderTouch = e.touches[0].clientX;
  }, { passive: true });

  lightboxADOverlay.addEventListener("touchend", function (e) {
    if (!this._sliderTouch) return;
    var slider = lightboxADOverlay.querySelector(".ba-slider");
    if (!slider) return;
    var rect = slider.getBoundingClientRect();
    var touch = e.changedTouches[0];
    if (touch.clientX >= rect.left && touch.clientX <= rect.right) {
      var pct = ((touch.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      var afterDiv = slider.querySelector(".ba-after");
      var handle = slider.querySelector(".ba-handle");
      if (afterDiv) afterDiv.style.width = pct + "%";
      if (handle) handle.style.left = pct + "%";
    }
    this._sliderTouch = 0;
  }, { passive: true });

  document.addEventListener("keydown", function (e) {
    if (!lightboxADOverlay || !lightboxADOverlay.classList.contains("open")) return;
    if (e.key === "Escape") { fecharLightboxAD(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { adAnterior(); e.preventDefault(); }
    else if (e.key === "ArrowRight") { adProximo(); e.preventDefault(); }
  });
}

function abrirLightboxAD(i) {
  criarLightboxAD();
  adAtual = i;
  var item = ANTES_DEPOIS[i];

  lightboxADOverlay.querySelector(".ba-antes-img").src = item.antes;
  lightboxADOverlay.querySelector(".ba-antes-img").alt = item.titulo + " — Antes";
  lightboxADOverlay.querySelector(".ba-depois-img").src = item.depois;
  lightboxADOverlay.querySelector(".ba-depois-img").alt = item.titulo + " — Depois";
  lightboxADOverlay.querySelector(".lightbox-tag").textContent = item.categoria;
  lightboxADOverlay.querySelector(".lightbox-title").textContent = item.titulo;
  lightboxADOverlay.querySelector(".lightbox-desc").textContent = item.descricao || "";
  lightboxADOverlay.querySelector(".lightbox-counter").textContent = (i + 1) + " / " + ANTES_DEPOIS.length;

  var slider = lightboxADOverlay.querySelector(".ba-slider");
  if (slider) {
    var afterDiv = slider.querySelector(".ba-after");
    var handle = slider.querySelector(".ba-handle");
    if (afterDiv) afterDiv.style.width = "50%";
    if (handle) handle.style.left = "50%";
    ajustarLarguraAfter(slider);
  }

  var arrows = lightboxADOverlay.querySelectorAll(".lightbox-arrow");
  arrows.forEach(function (a) { a.style.display = ANTES_DEPOIS.length > 1 ? "flex" : "none"; });

  lightboxADOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
  if (window.lucide) window.lucide.createIcons();
}

function fecharLightboxAD() {
  if (!lightboxADOverlay) return;
  lightboxADOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function adAnterior() {
  adAtual = (adAtual - 1 + ANTES_DEPOIS.length) % ANTES_DEPOIS.length;
  abrirLightboxAD(adAtual);
}

function adProximo() {
  adAtual = (adAtual + 1) % ANTES_DEPOIS.length;
  abrirLightboxAD(adAtual);
}

/* --------------------------------------------------------------------------
   SLIDER ANTES E DEPOIS (INTERATIVO)
   -------------------------------------------------------------------------- */

function montarSlidersAD() {
  var container = document.getElementById("before-after-slider-container");
  if (!container || typeof ANTES_DEPOIS === "undefined") return;

  container.innerHTML = "";

  ANTES_DEPOIS.forEach(function (item, index) {
    var wrapper = document.createElement("div");
    wrapper.className = "ba-slider-wrapper";

    var slider = document.createElement("div");
    slider.className = "ba-slider";
    slider.setAttribute("role", "slider");
    slider.setAttribute("aria-label", item.titulo + " — compare antes e depois");
    slider.setAttribute("aria-valuemin", "0");
    slider.setAttribute("aria-valuemax", "100");
    slider.setAttribute("aria-valuenow", "50");

    slider.innerHTML =
      '<img src="' + item.depois + '" alt="' + item.titulo + ' — depois" loading="lazy">' +
      '<div class="ba-after"><img src="' + item.antes + '" alt="' + item.titulo + ' — antes"></div>' +
      '<div class="ba-handle"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l-6 8 6 8"/><path d="M16 4l6 8-6 8"/></svg></div>' +
      '<span class="ba-label ba-label-before">ANTES</span>' +
      '<span class="ba-label ba-label-after">DEPOIS</span>';

    var hint = document.createElement("div");
    hint.className = "ba-hint";
    hint.innerHTML = '<i data-lucide="move-horizontal" aria-hidden="true"></i> Arraste para comparar';

    var info = document.createElement("div");
    info.className = "ba-info";
    info.innerHTML =
      '<span class="ba-categoria">' + item.categoria + "</span>" +
      "<h4>" + item.titulo + "</h4>" +
      "<p>" + item.descricao + "</p>";

    wrapper.appendChild(slider);
    wrapper.appendChild(hint);
    wrapper.appendChild(info);
    container.appendChild(wrapper);

    inicializarSliderAD(slider, hint);
  });

  if (window.lucide) window.lucide.createIcons();
}

function ajustarLarguraAfter(slider) {
  if (!slider) return;
  var largura = slider.clientWidth || slider.offsetWidth;
  var img = slider.querySelector(".ba-after img");
  if (img && largura) img.style.width = largura + "px";
}

function inicializarSliderAD(slider, hint) {
  var dragging = false;
  var afterDiv = slider.querySelector(".ba-after");
  var handle = slider.querySelector(".ba-handle");

  function getPercentage(clientX) {
    var rect = slider.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  }

  function updateSlider(pct) {
    if (afterDiv) afterDiv.style.width = pct + "%";
    if (handle) handle.style.left = pct + "%";
    slider.setAttribute("aria-valuenow", Math.round(pct));
  }

  function startDrag(clientX) {
    dragging = true;
    updateSlider(getPercentage(clientX));
    if (hint) hint.style.opacity = "0";
  }

  function moveDrag(clientX) {
    if (!dragging) return;
    updateSlider(getPercentage(clientX));
  }

  function endDrag() {
    dragging = false;
  }

  ajustarLarguraAfter(slider);

  slider.addEventListener("mousedown", function (e) {
    e.preventDefault();
    startDrag(e.clientX);
  });

  document.addEventListener("mousemove", function (e) {
    moveDrag(e.clientX);
  });

  document.addEventListener("mouseup", endDrag);

  slider.addEventListener("touchstart", function (e) {
    startDrag(e.touches[0].clientX);
  }, { passive: true });

  slider.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    e.preventDefault();
    moveDrag(e.touches[0].clientX);
  }, { passive: false });

  slider.addEventListener("touchend", endDrag, { passive: true });

  slider.addEventListener("click", function (e) {
    updateSlider(getPercentage(e.clientX));
    if (hint) hint.style.opacity = "0";
  });

  slider.addEventListener("keydown", function (e) {
    var current = parseInt(slider.getAttribute("aria-valuenow")) || 50;
    if (e.key === "ArrowLeft") { updateSlider(Math.max(5, current - 5)); e.preventDefault(); }
    if (e.key === "ArrowRight") { updateSlider(Math.min(95, current + 5)); e.preventDefault(); }
    if (hint) hint.style.opacity = "0";
  });
}

function reajustarTodosSlidersAD() {
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    ajustarLarguraAfter(slider);
  });
}

/* --------------------------------------------------------------------------
   FILTROS DA GALERIA
   -------------------------------------------------------------------------- */

function inicializarFiltros() {
  var botoes = document.querySelectorAll("[data-filtro]");
  if (!botoes.length) return;

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoes.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      botao.classList.add("active");
      botao.setAttribute("aria-pressed", "true");

      var filtro = botao.getAttribute("data-filtro");
      var cards = document.querySelectorAll(".gallery-ad-card");

      cards.forEach(function (card) {
        if (filtro === "Todos" || card.dataset.categoria === filtro) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   MENU MOBILE
   -------------------------------------------------------------------------- */

function inicializarMenuMobile() {
  var botao = document.getElementById("mobileMenuBtn");
  var menu = document.querySelector(".nav-menu");

  if (!botao || !menu) return;

  function fecharMenu() {
    menu.classList.remove("active");
    botao.classList.remove("open");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("active");
    botao.classList.toggle("open", aberto);
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      fecharMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   ANIMAÇÕES DE ENTRADA (REVEAL AO ROLAR)
   -------------------------------------------------------------------------- */

function iniciarReveal() {
  var seletoresReveal = [
    ".diff-grid > *",
    ".services-grid > *",
    ".about-grid > *",
    ".coverage-grid > *",
    ".form-grid > *",
    ".form-info-features > *",
    ".process-grid > *",
    ".portfolio-item",
    ".section-title",
    ".fabrics-grid > *",
    ".transformation-labels",
    ".transformation-text",
    ".form-foto-tip",
    ".final-cta > .container > *"
  ];

  var seletoresLeft = [".about-image"];
  var seletoresRight = [".about-content"];

  if (!("IntersectionObserver" in window)) return;

  function observar(seletores, classe) {
    var items = document.querySelectorAll(seletores.join(","));
    if (!items.length) return;

    items.forEach(function (el) {
      el.classList.add(classe);
      var idx = Array.prototype.indexOf.call(el.parentElement.childNodes, el);
      el.style.transitionDelay = (Math.max(idx, 0) % 6 * 0.1) + "s";
    });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          obs.unobserve(entrada.target);
          var atraso = parseFloat(entrada.target.style.transitionDelay || 0);
          setTimeout(function () {
            entrada.target.style.transitionDelay = "0s";
          }, atraso * 1000 + 800);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { obs.observe(el); });
  }

  observar(seletoresReveal, "reveal");
  observar(seletoresLeft, "reveal-left");
  observar(seletoresRight, "reveal-right");
}

/* --------------------------------------------------------------------------
   NAVEGAÇÃO ATIVA (SCROLL SPY)
   -------------------------------------------------------------------------- */

function iniciarScrollSpy() {
  var links = document.querySelectorAll(".nav-menu a");
  if (!links.length) return;

  var secoes = [];
  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      var secao = document.querySelector(href);
      if (secao) secoes.push({ el: secao, link: link });
    }
  });

  if (!secoes.length) return;

  var observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("active"); });
        var item = secoes.find(function (s) { return s.el === entrada.target; });
        if (item) item.link.classList.add("active");
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  secoes.forEach(function (s) { observer.observe(s.el); });
}

/* --------------------------------------------------------------------------
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  aplicarConfiguracao();
  animarTituloHero();

  montarServicos();
  montarProcesso();
  montarDiferenciais();
  montarPortfolio();
  montarSlidersAD();
  montarGaleriaAD();
  inicializarFiltros();
  criarLightbox();

  iniciarReveal();
  inicializarMenuMobile();
  iniciarScrollSpy();

  var header = document.getElementById("topo");
  var hero = document.querySelector(".hero");

  function aoRolar() {
    var scrollY = window.scrollY;
    var limiteGlass = hero
      ? hero.offsetTop + hero.offsetHeight * 0.7
      : window.innerHeight * 0.85;

    header.classList.toggle("scrolled", scrollY > 40);
    header.classList.toggle("glass", scrollY > limiteGlass);
  }

  if (header) {
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  document.querySelectorAll(".logo, .footer-logo").forEach(function (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  window.addEventListener("resize", function () {
    reajustarTodosSlidersAD();
  }, { passive: true });

  if (window.lucide) window.lucide.createIcons();
});
