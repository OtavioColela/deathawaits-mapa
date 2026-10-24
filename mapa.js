/* =====================================================================
   DeathAwaits · seção "O mapa" (protótipo v1)
   TUDO que muda com frequência fica neste objeto MAPA_CONFIG.
   Edite aqui; não precisa mexer no HTML.
   ===================================================================== */
const MAPA_CONFIG = {
  // Pasta das imagens (vazio = mesma pasta do index.html, igual ao site atual).
  pastaImagens: "",

  /* ------------------------------------------------------------------
     STATUS AO VIVO (atualiza sozinho a cada "atualizarACadaSeg")
     - Servidor: pergunta para a API publica mcsrvstat.us (e, se ela falhar,
       para a api.mcstatus.io) se o servidor esta online e quantos jogadores
       tem. Bolinha verde = online, vermelha = offline, cinza = sem resposta.
     - Discord: total de membros pelo convite (with_counts=true).
     ------------------------------------------------------------------ */
  status: {
    servidorIP: "node.skycenterhosting.com.br:25567",
    // Status enviado pelo proprio servidor (plugin VipLoja -> Cloudflare). Nao depende do query/porta UDP.
    statusApi: "https://deathawaits-loja.deathawaitscda.workers.dev/status",
    discordConvite: "gc73gQfb5F", // codigo de https://discord.gg/gc73gQfb5F
    atualizarACadaSeg: 60
  },


  /* ------------------------------------------------------------------
     IMAGEM DO MAPA (render real do servidor, visto de cima)
     largura/altura = tamanho em pixels do arquivo original (define a proporção).
     blocosPorPixel = escala para a "distância aproximada" da rota.
       SUPOSIÇÃO: 1 pixel = 1 bloco (padrão de renders tipo uNmINeD/Chunky).
       Se o render foi reduzido (ex.: 1 px = 4 blocos), troque aqui.
       Use null para esconder o número de blocos.
     ------------------------------------------------------------------ */
  mapa: {
    imagemGrande: "mapa-real.jpg", // aberta em tela cheia (resolução original)
    largura: 1833,
    altura: 2040,
    blocosPorPixel: 1
  },

  /* ------------------------------------------------------------------
     LOCAIS DO MAPA (nomes e caixas marcados pela equipe no mapa real)
     x / y = posição em PORCENTAGEM da imagem do mapa (0–100), medida a partir
     do canto superior esquerdo. Ex.: x: 50, y: 50 = centro da imagem.
     As posições abaixo são o CENTRO de cada caixa que a equipe desenhou no
     mapa (foto09). Para ajustar: abra a página com ?calibrar=1 no fim do
     endereço (ex.: index.html?calibrar=1#mapa), clique no lugar certo do mapa
     e cole aqui o "x: …, y: …" que foi copiado.
     tag: lado do nome do local em relação ao ponto: "b" (baixo, padrão),
          "t" (cima), "l" (esquerda), "r" (direita). Use para não encavalar
          nomes de locais próximos (Castelo / Capital / Safezone).
     risco: "baixo" | "medio" | "alto" | "extremo"
     loot:  "comum" | "raro" | "militar"
     ATENÇÃO: risco e loot abaixo são sugestões do protótipo. Ajustem para
     o que realmente acontece no servidor.
     ------------------------------------------------------------------ */
  locais: [
    { id: "safezone", n: "01", nome: "Safezone", img: "safezone.jpg", x: 62.71, y: 27.01, tag: "b", // caixa "safezone": logo abaixo da Capital, junto ao lago
      risco: "baixo", loot: "comum",
      alt: "Safezone: praça cercada com caminhões do exército, hospital, helicópteros e bandeiras do Brasil em volta de um prédio do governo",
      lore: "Bandeiras do Brasil ainda tremulam sobre a praça. Os caminhões do exército e o hospital são a última coisa organizada que sobrou. Aqui ninguém atira. Lá fora, ninguém te espera." },
    { id: "capital", n: "02", nome: "Capital", img: "capital.jpg", x: 69.72, y: 16.64, tag: "r", // caixa "capital": a maior cidade, norte
      risco: "alto", loot: "raro",
      alt: "Capital: horizonte de arranha-céus com um capitólio de cúpula, um estádio e uma ponte vermelha ao fundo",
      lore: "Do estádio dá pra ver o capitólio e a ponte vermelha. Cada arranha-céu tem andares que ninguém saqueou, porque quem sobe nem sempre desce." },
    { id: "castelo", n: "03", nome: "Castelo", img: "castelo.jpg", x: 61.05, y: 6.76, tag: "l", // caixa "castelo": ponto cercado por fosso, topo do mapa
      risco: "medio", loot: "raro",
      alt: "Castelo de pedra numa ilha cercada por um rio, no meio de uma floresta de pinheiros",
      lore: "Uma ponte, um fosso e muralhas de pedra. O melhor esconderijo do mapa, se você conseguir tirar quem já está lá dentro." },
    { id: "base-radioativa", n: "04", nome: "Base radioativa", img: "base-radioativa.jpg", x: 31.23, y: 18.06, tag: "r", // caixa "base radioativa": quadrado vermelho, noroeste
      risco: "extremo", loot: "militar",
      alt: "Base radioativa: complexo murado com galpões e tonéis laranja de material perigoso, visto do alto",
      lore: "Tonéis laranja empilhados até onde a vista alcança. O contador Geiger não para de estalar, e os mortos daqui andam de roupa hazmat. O melhor loot do mapa cobra caro." },
    { id: "springfield", n: "05", nome: "Springfield", img: "springfield.jpg", x: 11.4, y: 14.88, tag: "b", // caixa "springfield": cidade no litoral noroeste
      risco: "medio", loot: "comum",
      alt: "Springfield: cidade com um posto de controle militar no cruzamento, um prédio de tijolos vermelhos e o mar ao fundo",
      lore: "O posto de controle no cruzamento ainda tem a cancela abaixada. Os soldados foram embora; o que eles deixaram nas caixas, não." },
    { id: "prisao", n: "06", nome: "Prisão", img: "prisao.jpg", x: 51.36, y: 42.35, tag: "r", // caixa "prisão": centro do mapa, à beira do rio
      risco: "alto", loot: "raro",
      alt: "Prisão: pátio cercado por muros e grades, com bancos de madeira e blocos de celas ao fundo",
      lore: "As celas se abriram quando a energia caiu. Os presos não foram longe: ainda rondam o pátio, esperando a próxima visita." },
    { id: "base-aerea", n: "07", nome: "Base aérea", img: "base-aerea.jpg", x: 91.35, y: 49.09, tag: "l", // caixa "base aérea": pista no leste
      risco: "alto", loot: "militar",
      alt: "Base aérea: estrada ao lado de hangares militares verdes, um helicóptero caído e um quartel de bombeiros",
      lore: "Hangares verdes, um helicóptero no chão e a pista vazia. A evacuação saiu daqui, e quem ficou para trás ainda guarda as armas." },
    { id: "tacoma", n: "08", nome: "Tacoma", img: "tacoma.jpg", x: 59.87, y: 60.56, tag: "b", // caixa "tacoma": cidade em grade, centro-sul
      risco: "medio", loot: "comum",
      alt: "Tacoma: cruzamento com um tanque abandonado, um prédio com cúpula e uma bandeira entre prédios de apartamentos",
      lore: "Um tanque parado no cruzamento, sem combustível e sem tripulação. As ruas em grade parecem calmas. É exatamente isso que preocupa." },
    { id: "aeroporto", n: "09", nome: "Aeroporto", img: "aeroporto.jpg", x: 11.62, y: 68.21, tag: "b", // caixa "aeroporto": litoral oeste
      risco: "medio", loot: "raro",
      alt: "Aeroporto: terminal com aviões estacionados, carrinhos de bagagem e a torre de controle à beira-mar",
      lore: "O último voo nunca saiu. As malas continuam na esteira, os aviões no pátio, e a torre de controle ainda enxerga tudo até o mar." },
    { id: "residencial", n: "10", nome: "Residencial", img: "residencial.jpg", x: 16.67, y: 77.97, tag: "r", // caixa "residencial": sudoeste, abaixo do aeroporto
      risco: "baixo", loot: "comum",
      alt: "Residencial: rua de casas grandes com telhados cinza no meio de uma floresta",
      lore: "Casas grandes, garagens fechadas e despensas cheias. Bom lugar pra começar, desde que você feche a porta ao entrar." }
  ],

  links: {
    launcher: "https://www.dropbox.com/scl/fi/nmkjsgwz30eq004yfdkuc/DeathAwaits-Launcher-Setup-1.0.0.exe?rlkey=nyyislrsiw7ogw8956etbm78i&st=9kq0o0xe&dl=1",
    discord: "https://discord.gg/gc73gQfb5F"
  }
};

/* ===================================================================== */
(function () {
  const C = MAPA_CONFIG;
  const root = document.getElementById("mapa");
  if (!root) return;
  // o overlay usa 1000 unidades de largura e MH de altura (mesma proporção da imagem)
  const MI = C.mapa || { largura: 1000, altura: 620 };
  const MH = Math.round(1000 * MI.altura / MI.largura * 10) / 10;
  const LINHAS = 11, LH = MH / LINHAS; // grade: colunas A–J × linhas 1–11
  C.locais.forEach((l) => { if (l.px == null) { l.px = l.x; l.py = l.y; } l.x = l.px * 10; l.y = l.py * MH / 100; });
  const pctX = (mx) => mx / 10 + "%", pctY = (my) => my / MH * 100 + "%";

  const RISCO = { baixo: ["Baixo", 1], medio: ["Médio", 2], alto: ["Alto", 3], extremo: ["Extremo", 4] };
  const LOOT = { comum: "Comum", raro: "Raro", militar: "Militar" };
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => Array.from(el.querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 820px)");
  const hoverOk = window.matchMedia("(hover: hover) and (pointer: fine)");
  const quadrante = (l) => "ABCDEFGHIJ"[Math.min(9, Math.max(0, Math.floor(l.x / 100)))] + Math.min(LINHAS, Math.max(1, Math.floor(l.y / LH) + 1));
  const img = (f) => C.pastaImagens + f;
  // animações só para quem não pediu "reduzir movimento"; sem JS nada fica escondido
  const anima = () => !reduz.matches;
  if (anima() && "IntersectionObserver" in window) root.classList.add("mp-anim");

  /* ---------- vídeo: pausa se o usuário pediu menos movimento ---------- */
  const video = $(".mp-video video");
  if (video) {
    const ajustaVideo = () => { if (reduz.matches) { video.removeAttribute("autoplay"); video.pause(); } else if (video.querySelector("source")) { video.play().catch(() => {}); } };
    ajustaVideo(); reduz.addEventListener?.("change", ajustaVideo);
  }

  /* ---------- links do CTA ---------- */
  $$("[data-link]").forEach((a) => { if (C.links[a.dataset.link]) a.href = C.links[a.dataset.link]; });

  /* ---------- marcadores e cards ---------- */
  const canvas = $(".mp-canvas");
  const stage = $(".mp-stage") || canvas;
  // ganchos do "mapa vivo" (v4), preenchidos no fim do arquivo
  const hooks = { linha() {}, rota() {}, foco() {} };
  const cards = $(".mp-cards");
  C.locais.forEach((l, i) => {
    const b = document.createElement("button");
    b.style.setProperty("--d", (0.7 + i * 0.16).toFixed(2) + "s");
    b.type = "button"; b.className = "mp-marker"; b.dataset.id = l.id; b.dataset.risco = l.risco; b.dataset.tag = l.tag || "b";
    b.style.left = pctX(l.x); b.style.top = pctY(l.y);
    b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-controls", "mp-dossie");
    b.setAttribute("aria-label", `${l.nome}: risco ${RISCO[l.risco][0]}, loot ${LOOT[l.loot]}`);
    b.innerHTML = `<span class="mp-ring" aria-hidden="true"></span><span class="mp-lock" aria-hidden="true"></span><span class="mp-pin" aria-hidden="true"></span><span class="mp-flash" aria-hidden="true"></span><span class="mp-tag" aria-hidden="true"><b>${l.n}</b>${esc(l.nome)}</span>`;
    stage.appendChild(b);

    const li = document.createElement("li");
    li.className = "mp-card"; li.dataset.id = l.id; li.dataset.risco = l.risco;
    li.setAttribute("data-reveal", ""); li.style.setProperty("--d", (i * 0.07).toFixed(2) + "s");
    li.innerHTML = `<button type="button" aria-pressed="false" aria-controls="mp-dossie"><div class="mp-thumb"><img src="${img(l.img)}" alt="${esc(l.alt)}" loading="lazy" width="1280" height="661"></div><span>Registro ${l.n} · ${RISCO[l.risco][0]}<b>${esc(l.nome)}</b></span></button>`;
    cards.appendChild(li);
  });

  /* ---------- contagem por risco no filtro ---------- */
  $$(".mp-chip[data-filtro]").forEach((c) => {
    const f = c.dataset.filtro;
    const n = f === "todos" ? C.locais.length : C.locais.filter((l) => l.risco === f).length;
    c.querySelector("em").textContent = n;
  });

  /* ---------- dossiê ---------- */
  const dossie = $("#mp-dossie");
  const backdrop = $(".mp-backdrop");
  let fixado = "safezone"; // local selecionado (clique/teclado)
  let filtro = "todos";
  let ultimoGatilho = null;

  /* lore: digita rápido; clique pula. Leitor de tela recebe o texto inteiro de uma vez. */
  let typeRaf = 0;
  function digitar(txt, animar) {
    const sr = $(".mp-lore .mp-sr", dossie), out = $(".mp-lore .mp-type", dossie);
    cancelAnimationFrame(typeRaf); sr.textContent = txt;
    if (!animar) { out.textContent = txt; out.classList.remove("is-typing"); return; }
    const t0 = performance.now() + 250, cps = 70; // caracteres por segundo
    out.textContent = ""; out.classList.add("is-typing");
    const passo = (t) => {
      const n = Math.max(0, Math.floor((t - t0) / 1000 * cps));
      out.textContent = txt.slice(0, n);
      if (n < txt.length) typeRaf = requestAnimationFrame(passo); else out.classList.remove("is-typing");
    };
    typeRaf = requestAnimationFrame(passo);
    out.onclick = () => { cancelAnimationFrame(typeRaf); out.textContent = txt; out.classList.remove("is-typing"); };
  }

  function render(id, animar = true) {
    const l = C.locais.find((x) => x.id === id); if (!l) return;
    const [rNome, rNivel] = RISCO[l.risco];
    dossie.style.setProperty("--r", `var(--mp-${l.risco})`);
    $(".mp-dossie-h .mp-titulo", dossie).textContent = `Dossiê ${l.n} · ${quadrante(l)}`;
    const fotoImg = $(".mp-foto img", dossie);
    fotoImg.src = img(l.img); fotoImg.alt = l.alt;
    $(".mp-carimbo", dossie).textContent = rNome === "Extremo" ? "Extremo" : `Risco ${rNome.toLowerCase()}`;
    $(".mp-ref", dossie).textContent = `Registro ${l.n} · Quadrante ${quadrante(l)}`;
    $("h3", dossie).textContent = l.nome;
    $("[data-f=risco]", dossie).innerHTML = `<span class="mp-meter" aria-hidden="true">${[1,2,3,4].map((i) => `<i class="${i <= rNivel ? "on" : ""}"></i>`).join("")}</span>${rNome}`;
    $("[data-f=loot]", dossie).innerHTML = `<span class="mp-loot" data-loot="${l.loot}">${LOOT[l.loot]}</span>`;
    digitar(`“${l.lore}”`, animar && anima());
    if (animar && anima()) {
      const body = $(".mp-dossie-in", dossie);
      body.classList.remove("mp-swap"); void body.offsetWidth; body.classList.add("mp-swap");
    }
    hooks.linha();
  }

  function marcar(id) {
    $$(".mp-marker").forEach((m) => m.setAttribute("aria-pressed", String(m.dataset.id === id)));
    $$(".mp-card button").forEach((b) => b.setAttribute("aria-pressed", String(b.closest(".mp-card").dataset.id === id)));
  }

  function selecionar(id, origem) {
    fixado = id; marcar(id); render(id);
    if (origem !== "init") { hooks.foco(id); hooks.rota(id); }
    if (mobile.matches && origem !== "init") abrirSheet(origem);
    if (history.replaceState && origem !== "init") history.replaceState(null, "", "#mapa-" + id);
  }

  function abrirSheet(gatilho) {
    ultimoGatilho = gatilho instanceof HTMLElement ? gatilho : document.activeElement;
    dossie.classList.add("is-open"); backdrop.classList.add("is-open");
    dossie.setAttribute("role", "dialog"); dossie.setAttribute("aria-modal", "true");
    $(".mp-close", dossie).focus({ preventScroll: true });
  }
  function fecharSheet() {
    if (!dossie.classList.contains("is-open")) return;
    dossie.classList.remove("is-open"); backdrop.classList.remove("is-open");
    dossie.removeAttribute("role"); dossie.removeAttribute("aria-modal");
    if (ultimoGatilho) ultimoGatilho.focus({ preventScroll: true });
  }

  const visiveis = () => C.locais.filter((l) => filtro === "todos" || l.risco === filtro);
  function passo(d) {
    const v = visiveis(); if (!v.length) return;
    let i = v.findIndex((l) => l.id === fixado); i = (i + d + v.length) % v.length;
    selecionar(v[i].id, "nav");
    if (!mobile.matches) $(`.mp-marker[data-id="${v[i].id}"]`).focus({ preventScroll: true });
  }

  // cliques
  canvas.addEventListener("click", (e) => { const m = e.target.closest(".mp-marker"); if (m) selecionar(m.dataset.id, m); });
  cards.addEventListener("click", (e) => { const c = e.target.closest(".mp-card"); if (c) selecionar(c.dataset.id, c.querySelector("button")); });
  // hover = prévia (só desktop com mouse); ao sair do mapa volta ao fixado
  canvas.addEventListener("mouseover", (e) => {
    const m = e.target.closest(".mp-marker");
    if (m && hoverOk.matches && !mobile.matches && m.dataset.id !== dossie.dataset.preview) { dossie.dataset.preview = m.dataset.id; render(m.dataset.id); hooks.rota(m.dataset.id); }
  });
  canvas.addEventListener("mouseleave", () => {
    const tinha = dossie.dataset.preview;
    delete dossie.dataset.preview;
    if (tinha && tinha !== fixado) { render(fixado); hooks.rota(fixado); }
  });
  // teclado: setas percorrem os locais, Esc fecha o sheet
  canvas.addEventListener("keydown", (e) => {
    if (!e.target.closest(".mp-marker")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); passo(1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); passo(-1); }
  });
  $(".mp-prev", dossie).addEventListener("click", () => passo(-1));
  $(".mp-next", dossie).addEventListener("click", () => passo(1));
  $(".mp-close", dossie).addEventListener("click", fecharSheet);
  // foto do dossiê abre o visualizador do site (site.js), com as 7 fotos do mapa
  const fotoBox = $(".mp-foto", dossie);
  fotoBox.tabIndex = 0; fotoBox.setAttribute("role", "button"); fotoBox.setAttribute("aria-label", "Ampliar foto do local");
  const abreFoto = () => {
    if (!window.DALightbox) return;
    const v = C.locais.findIndex((l) => l.id === (dossie.dataset.preview || fixado));
    window.DALightbox.open(C.locais.map((l) => ({ src: img(l.img), alt: l.alt, caption: `Registro ${l.n} · ${l.nome}` })), Math.max(0, v), $("img", fotoBox));
  };
  fotoBox.addEventListener("click", abreFoto);
  fotoBox.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abreFoto(); } });
  backdrop.addEventListener("click", fecharSheet);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharSheet(); });
  // prende o foco dentro do sheet no celular
  dossie.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !dossie.classList.contains("is-open")) return;
    const f = $$("button, a[href]", dossie); const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });
  mobile.addEventListener?.("change", () => { if (!mobile.matches) fecharSheet(); });

  /* ---------- filtro por risco ---------- */
  $(".mp-filtro").addEventListener("click", (e) => {
    const c = e.target.closest(".mp-chip"); if (!c) return;
    filtro = c.dataset.filtro;
    $$(".mp-chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    const ok = (id) => filtro === "todos" || C.locais.find((l) => l.id === id).risco === filtro;
    $$(".mp-marker").forEach((m) => { const v = ok(m.dataset.id); m.classList.toggle("is-off", !v); m.tabIndex = v ? 0 : -1; m.setAttribute("aria-hidden", String(!v)); });
    $$(".mp-card").forEach((m) => { const v = ok(m.dataset.id); m.classList.toggle("is-off", !v); m.querySelector("button").tabIndex = v ? 0 : -1; });
    const v = visiveis();
    $(".mp-filtro-msg").textContent = filtro === "todos" ? "Mostrando todos os locais." : `Mostrando ${v.length} local(is) com risco ${RISCO[filtro][0]}.`;
    if (v.length && !ok(fixado)) { fixado = v[0].id; marcar(fixado); render(fixado); }
  });

  /* ---------- status ao vivo ---------- */
  const S = C.status;
  const strip = $(".mp-status");
  let stripVisto = false;
  const ultimo = {};
  // conta de 0 (ou do último valor) até o número, quando a faixa aparece na tela
  function contar() {
    $$(".mp-n", strip).forEach((el) => {
      const key = el.parentElement.dataset.s, to = +el.dataset.n, from = ultimo[key] ?? 0;
      ultimo[key] = to;
      if (!anima() || from === to) { el.textContent = fmt(to); return; }
      const t0 = performance.now(), dur = 1300;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(Math.round(from + (to - from) * e));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  const fmt = (n) => (typeof n === "number" ? n.toLocaleString("pt-BR") : "—");
  // estado: "online" | "offline" | "erro" (sem resposta das APIs) | "verificando"
  function pintaStatus(d) {
    const est = d.estado || "verificando";
    ["online", "offline", "erro", "verificando"].forEach((e) => strip.classList.toggle("is-" + e, e === est));
    strip.classList.remove("is-exemplo");
    $(".mp-live-txt", strip).textContent = { online: "Servidor online", offline: "Servidor offline", erro: "Status indisponível", verificando: "Verificando..." }[est];
    $("[data-s=online]", strip).innerHTML = d.online == null ? "—" : `<span class="mp-n" data-n="${d.online}">${fmt(d.online)}</span>${d.max ? ` <small>/ ${fmt(d.max)}</small>` : ""}`;
    $("[data-s=discord]", strip).innerHTML = d.discord == null ? "—" : `<span class="mp-n" data-n="${d.discord}">${fmt(d.discord)}</span>`;
    if (stripVisto) contar();
    $(".mp-status-note", strip).textContent = est === "verificando" ? "Consultando o servidor..."
      : `Atualizado às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} · atualiza sozinho a cada ${Math.max(30, S.atualizarACadaSeg)} s.`;
  }
  async function getJSON(url) {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 10000);
    try { const r = await fetch(url, { cache: "no-store", signal: ctl.signal }); if (!r.ok) throw new Error(r.status); return await r.json(); }
    finally { clearTimeout(t); }
  }
  // tenta mcsrvstat.us; se falhar, api.mcstatus.io. Retorna { online, players, max } ou lança erro.
  async function pingServidor(ip) {
    if (S.statusApi) {
      try {
        const s = await getJSON(S.statusApi);
        if (s.online) return { online: true, players: s.jogadores ?? 0, max: s.max ?? null };
      } catch (e) { /* cai para o ping abaixo */ }
    }
    if (!ip) return { online: false, players: 0, max: null };
    try {
      const j = await getJSON(`https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}`);
      return { online: !!j.online, players: j.players?.online ?? 0, max: j.players?.max ?? null };
    } catch (e) {
      const j = await getJSON(`https://api.mcstatus.io/v2/status/java/${encodeURIComponent(ip)}`);
      return { online: !!j.online, players: j.players?.online ?? 0, max: j.players?.max ?? null };
    }
  }
  async function atualizaStatus() {
    const d = { estado: "erro", online: null, max: null, discord: null };
    const tarefas = [];
    if (S.servidorIP || S.statusApi) tarefas.push(pingServidor(S.servidorIP).then((r) => {
      d.estado = r.online ? "online" : "offline";
      d.online = r.online ? r.players : 0;
      d.max = r.online ? r.max : null;
    }));
    if (S.discordConvite) tarefas.push(getJSON(`https://discord.com/api/v10/invites/${S.discordConvite}?with_counts=true`).then((j) => { d.discord = j.approximate_member_count ?? null; }));
    await Promise.allSettled(tarefas); // se uma fonte falhar, aquele campo mostra "—" (nunca um número inventado)
    pintaStatus(d);
  }
  pintaStatus({ estado: "verificando" });
  atualizaStatus();
  setInterval(atualizaStatus, Math.max(30, S.atualizarACadaSeg) * 1000);

  /* ---------- início (aceita link direto: #mapa-capital, #mapa-castelo...) ---------- */
  const hash = location.hash.replace("#mapa-", "");
  const inicial = C.locais.some((l) => l.id === hash) ? hash : "safezone";
  fixado = inicial; marcar(inicial); render(inicial, false);
  if (hash === inicial && location.hash.startsWith("#mapa-")) {
    root.scrollIntoView();
    if (mobile.matches) abrirSheet($(`.mp-marker[data-id="${inicial}"]`));
  }
  /* ---------- scroll-reveal + intro do mapa ---------- */
  $$('[data-reveal="stagger"]').forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty("--d", (i * 0.12).toFixed(2) + "s")));
  const mapaBox = $(".mp-mapa");
  function introMapa() {
    if (mapaBox.classList.contains("is-in")) return;
    mapaBox.classList.add("is-in");
    if (anima()) setTimeout(() => render(fixado, true), 450); // dossiê "chega" junto com o mapa
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in"); io.unobserve(e.target);
      if (e.target === strip) { stripVisto = true; contar(); }
    }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    $$("[data-reveal]").forEach((el) => io.observe(el));
    if (!strip.hasAttribute("data-reveal")) io.observe(strip);
    const ioMapa = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { introMapa(); ioMapa.disconnect(); } }, { threshold: 0.35 });
    ioMapa.observe(mapaBox);
  } else { $$("[data-reveal]").forEach((el) => el.classList.add("is-in")); introMapa(); stripVisto = true; contar(); }

  /* ---------- cards: inclinação 3D seguindo o mouse ---------- */
  cards.addEventListener("pointermove", (e) => {
    if (!anima() || !hoverOk.matches) return;
    const b = e.target.closest(".mp-card button"); if (!b) return;
    const r = b.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    b.style.setProperty("--ry", (x * 10).toFixed(2) + "deg"); b.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
  });
  cards.addEventListener("pointerout", (e) => { const b = e.target.closest(".mp-card button"); if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty("--rx"); b.style.removeProperty("--ry"); } });
  /* =====================================================================
     v4 · MAPA VIVO
     - animações contínuas: radar, helicóptero, veículos, hordas, airdrop
     - zoom/arrasto (mouse, Ctrl+rolagem, 2 dedos, botões), foco no local
     - rota tracejada até o local, coordenadas, visão noturna,
       linha do marcador até o dossiê
     Tudo pausa fora da tela e com a aba escondida; nada se mexe sozinho
     com "reduzir movimento". Eventos (hordas, airdrop, veículos) são
     SIMULAÇÕES visuais, não dados do servidor.
     ===================================================================== */
  if (stage === canvas) return; // HTML antigo sem .mp-stage: mantém só o básico
  const mapaEl = mapaBox;
  const grid = $(".mp-grid");
  const LOC = Object.fromEntries(C.locais.map((l) => [l.id, l]));
  const SAFE = LOC.safezone || C.locais[0];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let W = stage.offsetWidth || 1, H = stage.offsetHeight || 1;
  const px = (mx, my) => [mx / 1000 * W, my / MH * H];

  /* ---------- camadas que dependem das posições (zonas, radar) ---------- */
  const zonasBox = $(".mp-zonas");
  const RAIO = { extremo: 95, alto: 72 }; // raio das zonas de perigo, em unidades (1000 = largura)
  function circulo(el, x, y, r) { el.style.left = pctX(x - r); el.style.top = pctY(y - r); el.style.width = pctX(2 * r); el.style.height = pctY(2 * r); }
  if (zonasBox) {
    C.locais.forEach((l) => {
      if (RAIO[l.risco]) { const z = document.createElement("i"); z.className = "mp-perigo"; z.dataset.id = l.id; z.dataset.risco = l.risco; circulo(z, l.x, l.y, RAIO[l.risco]); zonasBox.appendChild(z); }
    });
    ["mp-escudo", "mp-escudo mp-escudo2"].forEach((c) => { const z = document.createElement("i"); z.className = c; z.dataset.id = SAFE.id; circulo(z, SAFE.x, SAFE.y, 55); zonasBox.appendChild(z); });
  }
  $$(".mp-alcance circle").forEach((c) => { c.setAttribute("cx", SAFE.x); c.setAttribute("cy", SAFE.y); });
  const sweepEl = $(".mp-sweep"); if (sweepEl) { sweepEl.style.left = pctX(SAFE.x); sweepEl.style.top = pctY(SAFE.y); }
  canvas.style.setProperty("--sx", pctX(SAFE.x)); canvas.style.setProperty("--sy", pctY(SAFE.y));

  /* ---------- zoom / arrasto ---------- */
  const view = { z: 1, tx: 0, ty: 0 };
  // ao aproximar no celular, pede a versão grande da imagem (o navegador troca sozinho)
  const fonteImg = $(".mp-img source"); let imgGrande = false;
  const pedeImgGrande = () => { if (!imgGrande && fonteImg && view.z > 1.2) { imgGrande = true; fonteImg.sizes = "1800px"; } };
  const ZMAX = 3;
  const btnIn = $(".mp-zin"), btnOut = $(".mp-zout"), btnReset = $(".mp-zreset"), btnMover = $(".mp-mover");
  function clampView() {
    view.z = clamp(view.z, 1, ZMAX);
    view.tx = clamp(view.tx, W - W * view.z, 0); view.ty = clamp(view.ty, H - H * view.z, 0);
  }
  function aplica(suave) {
    stage.classList.toggle("is-ease", !!suave && anima());
    stage.style.transform = view.z === 1 && !view.tx && !view.ty ? "" : `translate(${view.tx.toFixed(1)}px, ${view.ty.toFixed(1)}px) scale(${view.z.toFixed(4)})`;
    stage.style.setProperty("--iz", Math.pow(view.z, -0.8).toFixed(3));
    const zoom = view.z > 1.01;
    if (zoom) pedeImgGrande();
    mapaEl.classList.toggle("is-zoom", zoom);
    if (!zoom) mapaEl.classList.remove("is-foco");
    btnOut.disabled = !zoom; btnReset.disabled = !zoom; btnIn.disabled = view.z >= ZMAX - 0.01;
    if (suave && anima()) seguirLinha(950); else atualizaLinha();
  }
  function zoomEm(z, cx, cy, suave) { // (cx, cy) = ponto que fica parado, em px do mapa
    const k = clamp(z, 1, ZMAX) / view.z;
    view.tx = cx - (cx - view.tx) * k; view.ty = cy - (cy - view.ty) * k; view.z *= k;
    clampView(); aplica(suave);
  }
  function focoEm(id) {
    const l = LOC[id]; if (!l || !anima()) return; // com menos movimento não dá zoom sozinho
    const z = mobile.matches ? 1.7 : 1.9, [x, y] = px(l.x, l.y);
    view.z = z; view.tx = W / 2 - x * z; view.ty = H / 2 - y * z; clampView(); aplica(true);
    mapaEl.classList.add("is-foco");
  }
  function resetView() { view.z = 1; view.tx = 0; view.ty = 0; aplica(true); }
  btnIn.addEventListener("click", () => zoomEm(view.z * 1.45, W / 2, H / 2, true));
  btnOut.addEventListener("click", () => zoomEm(view.z / 1.45, W / 2, H / 2, true));
  btnReset.addEventListener("click", resetView);
  canvas.addEventListener("keydown", (e) => {
    if (!e.target.closest(".mp-marker, .mp-ctrl")) return;
    if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomEm(view.z * 1.45, W / 2, H / 2, true); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomEm(view.z / 1.45, W / 2, H / 2, true); }
    else if (e.key === "0") { e.preventDefault(); resetView(); }
  });
  canvas.addEventListener("dblclick", (e) => { if (!e.target.closest(".mp-marker, .mp-ctrl")) resetView(); });

  // dica (ex.: rolagem sem Ctrl) — no máximo a cada 4 s
  const hint = $(".mp-hint"); let hintT = 0, hintUlt = 0;
  function dica(txt) {
    const t = performance.now(); if (t - hintUlt < 4000) return; hintUlt = t;
    hint.textContent = txt; hint.classList.add("is-on"); clearTimeout(hintT); hintT = setTimeout(() => hint.classList.remove("is-on"), 1500);
  }
  // rolagem: só dá zoom com Ctrl/⌘ (pinça do trackpad também chega assim); senão a página rola normal
  canvas.addEventListener("wheel", (e) => {
    if (!(e.ctrlKey || e.metaKey)) { if (hoverOk.matches) dica("Ctrl + rolagem para dar zoom"); return; }
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    zoomEm(view.z * Math.exp(-clamp(e.deltaY, -60, 60) * 0.006), e.clientX - r.left, e.clientY - r.top, false);
  }, { passive: false });

  // arrastar com mouse/caneta
  let drag = null, arrastou = false;
  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch" || e.button !== 0 || e.target.closest(".mp-ctrl")) return;
    drag = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty, id: e.pointerId, on: false }; arrastou = false;
  });
  canvas.addEventListener("pointermove", (e) => {
    coord(e);
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.on) {
      if (Math.hypot(dx, dy) < 6) return;
      drag.on = true; arrastou = true; mapaEl.classList.add("is-drag");
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      if (view.z <= 1.01) dica("Aproxime (+) para arrastar");
    }
    view.tx = drag.tx + dx; view.ty = drag.ty + dy; clampView(); aplica(false);
  });
  const fimDrag = () => { if (drag && drag.on) mapaEl.classList.remove("is-drag"); drag = null; };
  canvas.addEventListener("pointerup", fimDrag); canvas.addEventListener("pointercancel", fimDrag);
  canvas.addEventListener("click", (e) => { if (arrastou) { e.stopPropagation(); e.preventDefault(); arrastou = false; } }, true);

  // toque: 1 dedo rola a página (a não ser com "Mover" ligado); 2 dedos movem e dão zoom
  let toque = null, moverModo = false;
  function gesto(ts) {
    const r = canvas.getBoundingClientRect();
    const p = Array.from(ts).slice(0, 2).map((t) => [t.clientX - r.left, t.clientY - r.top]);
    const c = p.length === 2 ? [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2] : p[0];
    const d = p.length === 2 ? Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]) : 0;
    return { c, d, n: p.length, z: view.z, tx: view.tx, ty: view.ty };
  }
  canvas.addEventListener("touchstart", (e) => {
    if (e.target.closest(".mp-ctrl")) return;
    if (e.touches.length >= 2) { if (e.cancelable) e.preventDefault(); toque = gesto(e.touches); }
    else if (moverModo) toque = gesto(e.touches);
  }, { passive: false });
  canvas.addEventListener("touchmove", (e) => {
    if (!toque) return;
    if (Math.min(e.touches.length, 2) !== toque.n) { toque = gesto(e.touches); return; }
    if (e.cancelable) e.preventDefault();
    const g = gesto(e.touches);
    const z = clamp(toque.n === 2 && toque.d > 0 ? toque.z * g.d / toque.d : toque.z, 1, ZMAX), k = z / toque.z;
    view.z = z; view.tx = g.c[0] - (toque.c[0] - toque.tx) * k; view.ty = g.c[1] - (toque.c[1] - toque.ty) * k;
    clampView(); aplica(false);
  }, { passive: false });
  const fimToque = (e) => { if (!toque) return; toque = e.touches.length >= 2 || (moverModo && e.touches.length) ? gesto(e.touches) : null; };
  canvas.addEventListener("touchend", fimToque); canvas.addEventListener("touchcancel", fimToque);
  btnMover.addEventListener("click", () => {
    moverModo = !moverModo; btnMover.setAttribute("aria-pressed", String(moverModo));
    canvas.classList.toggle("is-mover", moverModo);
    if (moverModo && view.z <= 1.01) zoomEm(1.6, W / 2, H / 2, true);
  });

  /* ---------- coordenadas no cabeçalho ---------- */
  const coordEl = $(".mp-coord");
  const coordTxt = (mx, my) => `Grade ${quadrante({ x: clamp(mx, 0, 999), y: clamp(my, 0, MH - 1) })} · ${String(Math.round(mx)).padStart(3, "0")} / ${String(Math.round(my)).padStart(3, "0")}`;
  function coord(e) {
    if (!coordEl || e.pointerType === "touch") return;
    const r = canvas.getBoundingClientRect();
    const mx = (e.clientX - r.left - view.tx) / view.z / W * 1000, my = (e.clientY - r.top - view.ty) / view.z / H * MH;
    if (mx >= 0 && my >= 0 && mx <= 1000 && my <= MH) coordEl.textContent = coordTxt(mx, my);
  }
  canvas.addEventListener("mouseleave", () => { if (coordEl) coordEl.textContent = `Grade — · ${C.locais.length} locais`; });

  /* ---------- rota tracejada da safezone até o local ---------- */
  const rotaG = $(".mp-route"), rotaLinha = $(".mp-route-line"), rotaGlow = $(".mp-route-glow"), rotaMask = $(".mp-route-mask"), rotaFim = $(".mp-route-end");
  const rotaLbl = $(".mp-route-lbl");
  let rotaId = null;
  function rota(id) {
    const l = LOC[id];
    if (!l || l === SAFE || (filtro !== "todos" && l.risco !== filtro)) { rotaG.classList.remove("is-on"); rotaLbl.classList.remove("is-on"); rotaId = null; return; }
    if (id === rotaId) return; rotaId = id;
    const x0 = SAFE.x, y0 = SAFE.y, x1 = l.x, y1 = l.y, dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    const cx = (x0 + x1) / 2 - dy * 0.2, cy = (y0 + y1) / 2 + dx * 0.2;
    const d = `M${x0} ${y0}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1} ${y1}`;
    [rotaLinha, rotaGlow, rotaMask].forEach((p) => p.setAttribute("d", d));
    rotaFim.setAttribute("cx", x1); rotaFim.setAttribute("cy", y1);
    // distância em linha reta, convertida para pixels da imagem e depois para blocos (escala em MAPA_CONFIG.mapa)
    const bpp = MI.blocosPorPixel;
    if (bpp) { const blocos = Math.max(10, Math.round(len * MI.largura / 1000 * bpp / 10) * 10); rotaLbl.innerHTML = `~${blocos.toLocaleString("pt-BR")} blocos<small>distância aproximada</small>`; }
    else rotaLbl.innerHTML = `Rota a partir da safezone<small>distância aproximada</small>`;
    const lx = 0.25 * x0 + 0.5 * cx + 0.25 * x1, ly = 0.25 * y0 + 0.5 * cy + 0.25 * y1;
    rotaLbl.style.left = pctX(lx); rotaLbl.style.top = pctY(ly);
    rotaG.classList.add("is-on"); rotaLbl.classList.add("is-on");
    if (anima() && rotaMask.animate) rotaMask.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    else rotaMask.style.strokeDashoffset = "0";
  }
  canvas.addEventListener("focusin", (e) => {
    const m = e.target.closest(".mp-marker"); if (!m) return;
    rota(m.dataset.id);
    const l = LOC[m.dataset.id]; if (coordEl && l) coordEl.textContent = coordTxt(l.x, l.y);
  });
  canvas.addEventListener("focusout", (e) => { if (!canvas.contains(e.relatedTarget)) rota(fixado); });

  /* ---------- linha do marcador até o dossiê (desktop) ---------- */
  const link = $(".mp-link"), linkPath = link && link.querySelector("path"), linkA = link && link.querySelector(".a"), linkB = link && link.querySelector(".b");
  function atualizaLinha() {
    if (!link) return;
    const id = dossie.dataset.preview || fixado, m = $(`.mp-marker[data-id="${id}"]`);
    if (mobile.matches || !mapaEl.classList.contains("is-in") || !m || m.classList.contains("is-off")) { link.classList.remove("is-on"); return; }
    const g = grid.getBoundingClientRect(), mr = m.getBoundingClientRect(), cr = canvas.getBoundingClientRect(), dr = dossie.getBoundingClientRect();
    const x0 = mr.left + mr.width / 2, y0 = mr.top + mr.height / 2;
    if (x0 < cr.left + 4 || x0 > cr.right - 4 || y0 < cr.top + 4 || y0 > cr.bottom - 4 || dr.left < cr.right) { link.classList.remove("is-on"); return; }
    const x1 = dr.left, y1 = clamp(y0, dr.top + 50, dr.bottom - 40), xm = cr.right + (dr.left - cr.right) / 2;
    const r = Math.min(10, Math.abs(y1 - y0) / 2), sy = y1 > y0 ? 1 : -1;
    const X0 = x0 - g.left, Y0 = y0 - g.top, XM = xm - g.left, Y1 = y1 - g.top, X1 = x1 - g.left;
    linkPath.setAttribute("d", r < 1 ? `M${X0} ${Y0}H${X1}` : `M${X0} ${Y0}H${XM - r}Q${XM} ${Y0} ${XM} ${Y0 + r * sy}V${Y1 - r * sy}Q${XM} ${Y1} ${XM + r} ${Y1}H${X1}`);
    linkA.setAttribute("cx", X0); linkA.setAttribute("cy", Y0); linkB.setAttribute("cx", X1); linkB.setAttribute("cy", Y1);
    link.style.setProperty("--r", `var(--mp-${LOC[id].risco})`);
    link.classList.add("is-on");
  }
  let linhaAte = 0, linhaRaf = 0;
  function seguirLinha(ms) {
    linhaAte = performance.now() + ms;
    if (linhaRaf) return;
    const f = (t) => { atualizaLinha(); linhaRaf = t < linhaAte ? requestAnimationFrame(f) : 0; };
    linhaRaf = requestAnimationFrame(f);
  }
  addEventListener("resize", () => seguirLinha(200));
  addEventListener("scroll", () => { if (link && link.classList.contains("is-on")) seguirLinha(0); }, { passive: true }); // dossiê é sticky

  /* ---------- filtro também apaga zonas e rota ---------- */
  $(".mp-filtro").addEventListener("click", () => {
    $$(".mp-zonas [data-id]").forEach((z) => z.classList.toggle("is-off", filtro !== "todos" && LOC[z.dataset.id].risco !== filtro));
    rotaId = null; rota(fixado); atualizaLinha();
  });

  /* ---------- tamanho ---------- */
  const mede = () => {
    const w = stage.offsetWidth || 1, h = stage.offsetHeight || 1; if (w === W && h === H) return;
    const k = w / W; view.tx *= k; view.ty *= k; W = w; H = h; clampView(); aplica(false);
  };
  if ("ResizeObserver" in window) new ResizeObserver(mede).observe(stage); else addEventListener("resize", mede);

  /* ---------- visão noturna ---------- */
  const nvBtn = $(".mp-nv-btn");
  nvBtn.addEventListener("click", () => {
    const on = !mapaEl.classList.contains("is-nv");
    mapaEl.classList.toggle("is-nv", on); nvBtn.setAttribute("aria-pressed", String(on));
  });

  /* ---------- mapa em tela cheia (resolução original, carregada só ao abrir) ---------- */
  const btnFull = $(".mp-full");
  if (btnFull) btnFull.addEventListener("click", () => {
    if (!window.DALightbox) { window.open(MI.imagemGrande || "mapa-real.jpg", "_blank", "noopener"); return; }
    window.DALightbox.open([{ src: MI.imagemGrande || "mapa-real.jpg", alt: "Mapa real do servidor DeathAwaits em resolução original", caption: "Mapa do servidor · clique na imagem para ver em tamanho real", zoom: true }], 0, $(".mp-img img"));
  });

  /* ---------- calibração: index.html?calibrar=1 ----------
     Mostra uma mira com a posição em % e, ao clicar, copia "x: …, y: …"
     para colar em MAPA_CONFIG.locais. Fica escondido para os visitantes. */
  if (/[?&]calibrar=1\b/.test(location.search)) {
    mapaEl.classList.add("is-calibrar");
    const cal = document.createElement("div"); cal.className = "mp-cal"; cal.setAttribute("aria-hidden", "true");
    cal.innerHTML = '<i class="h"></i><i class="v"></i><b></b>';
    const calLbl = cal.querySelector("b");
    const calInfo = document.createElement("div"); calInfo.className = "mp-cal-info";
    calInfo.innerHTML = "<b>Modo calibrar</b> · clique no lugar certo para copiar a posição";
    const toast = document.createElement("div"); toast.className = "mp-cal-toast"; toast.setAttribute("role", "status");
    canvas.append(cal, calInfo, toast);
    const pos = (e) => {
      const r = stage.getBoundingClientRect(); // já inclui zoom/arrasto
      return [clamp((e.clientX - r.left) / r.width * 100, 0, 100), clamp((e.clientY - r.top) / r.height * 100, 0, 100)];
    };
    const f1 = (n) => n.toFixed(1);
    canvas.addEventListener("pointermove", (e) => {
      const c = canvas.getBoundingClientRect(), [x, y] = pos(e);
      cal.style.setProperty("--cx", (e.clientX - c.left).toFixed(1) + "px"); cal.style.setProperty("--cy", (e.clientY - c.top).toFixed(1) + "px");
      calLbl.textContent = `x ${f1(x)} · y ${f1(y)}`; cal.classList.add("is-on");
    });
    canvas.addEventListener("pointerleave", () => cal.classList.remove("is-on"));
    let toastT = 0;
    canvas.addEventListener("click", (e) => {
      if (arrastou || e.target.closest(".mp-ctrl")) return;
      const [x, y] = pos(e), txt = `x: ${f1(x)}, y: ${f1(y)}`;
      console.info("[calibrar]", txt);
      const ok = () => { toast.textContent = `Copiado: ${txt}`; }, falha = () => { toast.textContent = `Posição: ${txt} (copie à mão)`; };
      toast.textContent = `Posição: ${txt}`;
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, falha); else falha();
      toast.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-on"), 2600);
    });
  }

  hooks.linha = atualizaLinha;
  hooks.rota = rota;
  hooks.foco = focoEm;

  /* ---------- animação contínua (um único requestAnimationFrame) ---------- */
  if (!anima()) { const ini = () => (mapaEl.classList.contains("is-in") ? (rota(fixado), atualizaLinha()) : setTimeout(ini, 300)); ini(); return; }
  const fxOver = $(".mp-fx-over");
  const sweep = $(".mp-sweep", fxOver), heli = $(".mp-heli", fxOver), heliSh = $(".mp-heli-sh", fxOver);
  const aviao = $(".mp-aviao", fxOver), aviaoSh = $(".mp-aviao-sh", fxOver);
  const blips = $(".mp-blips", fxOver), drops = $(".mp-drops", fxOver), carrosBox = $(".mp-carros", fxOver);
  const PERIODO = 7000; // uma volta do radar
  const bearing = (l) => (Math.atan2(l.x - SAFE.x, -(l.y - SAFE.y)) * 180 / Math.PI + 360) % 360;
  const alvos = C.locais.filter((l) => l !== SAFE).map((l) => ({ l, b: bearing(l) }));
  const passou = (a0, a1, b) => (a0 <= a1 ? b > a0 && b <= a1 : b > a0 || b <= a1);
  function pingMarker(id) {
    const m = $(`.mp-marker[data-id="${id}"]`); if (!m || m.classList.contains("is-off")) return;
    const f = m.querySelector(".mp-flash");
    f.animate && f.animate([{ opacity: 0.95, transform: "scale(.5)" }, { opacity: 0, transform: "scale(2.4)" }], { duration: 900, easing: "ease-out" });
  }
  // helicóptero: laço entre a safezone e a base militar
  const BASE = LOC["base-aerea"] || SAFE; // heli: Safezone <-> Base aérea
  const hc = [(SAFE.x + BASE.x) / 2, (SAFE.y + BASE.y) / 2], hv = [BASE.x - SAFE.x, BASE.y - SAFE.y], hl = Math.hypot(hv[0], hv[1]) || 1;
  const hu = [hv[0] / hl, hv[1] / hl], hn = [-hu[1], hu[0]], HA = hl / 2 + 30, HB = Math.max(58, hl * 0.12);
  function poeEnt(el, mx, my, ang, dx = 0, dy = 0) {
    const [x, y] = px(mx, my);
    el.style.transform = `translate(${(x + dx).toFixed(1)}px, ${(y + dy).toFixed(1)}px) translate(-50%, -50%) rotate(${ang.toFixed(1)}deg)`;
  }
  // veículos nas estradas (vão e voltam)
  const carros = ["mp-v1", "mp-v2", "mp-v3", "mp-v4", "mp-v5"].map((id, i) => {
    const path = document.getElementById(id); if (!path || !path.getTotalLength) return null;
    const el = document.createElement("i"); el.className = "mp-carro"; carrosBox.appendChild(el);
    const len = path.getTotalLength();
    return { path, len, el, s: rnd(0, len), dir: i % 2 ? -1 : 1, v: rnd(22, 34), espera: 0 };
  }).filter(Boolean);
  // hordas: mais frequentes perto das zonas Extremo/Alto
  const PESO = { extremo: 6, alto: 3, medio: 1.4, baixo: 0.5 };
  const zonasBlip = C.locais.filter((l) => l !== SAFE).map((l) => [l, PESO[l.risco] || 1]);
  const somaPeso = zonasBlip.reduce((a, z) => a + z[1], 0);
  function novoBlip() {
    if (blips.childElementCount >= 7) return;
    let r = Math.random() * somaPeso, l = zonasBlip[0][0];
    for (const [z, w] of zonasBlip) { if ((r -= w) <= 0) { l = z; break; } }
    const x = clamp(l.x + rnd(-75, 75), 20, 980), y = clamp(l.y + rnd(-65, 65), 20, MH - 20);
    const el = document.createElement("i"); el.className = "mp-blip";
    el.style.left = pctX(x); el.style.top = pctY(y);
    el.style.setProperty("--wx", (rnd(-1, 1) * W * 0.03).toFixed(1) + "px"); el.style.setProperty("--wy", (rnd(-1, 1) * W * 0.02).toFixed(1) + "px");
    if (Math.random() < 0.35) el.innerHTML = "<b>contato</b>";
    el.addEventListener("animationend", (e) => { if (e.target === el) el.remove(); });
    blips.appendChild(el);
  }
  // airdrop: avião cruza o mapa e solta uma caixa num ponto aleatório (~a cada 20 s)
  let voo = null;
  function novoVoo(t) {
    const daEsq = Math.random() < 0.5, y0 = rnd(110, MH - 110), y1 = clamp(y0 + rnd(-160, 160), 80, MH - 80);
    voo = { t0: t, dur: 8000, x0: daEsq ? -70 : 1070, x1: daEsq ? 1070 : -70, y0, y1, f: rnd(0.32, 0.68), solto: false };
    voo.ang = Math.atan2(y1 - y0, voo.x1 - voo.x0) * 180 / Math.PI;
    aviao.classList.add("is-on"); aviaoSh.classList.add("is-on");
  }
  function soltaCaixa(x, y) {
    const el = document.createElement("span"); el.className = "mp-drop";
    el.style.left = pctX(x); el.style.top = pctY(y);
    el.innerHTML = '<i class="mp-drop-sh"></i><i class="mp-drop-pulse"></i><span class="mp-drop-box"><i class="mp-drop-chute"></i></span><b class="mp-drop-lbl">Airdrop</b>';
    el.addEventListener("animationend", (e) => { if (e.target === el) el.remove(); });
    drops.appendChild(el);
  }

  // evita soltar a caixa em cima de um marcador/rótulo (mantém o "AIRDROP" legível)
  const longeDosLocais = (x, y) => x > 60 && x < 940 && y > 60 && y < MH - 60 && C.locais.every((l) => Math.hypot(l.x - x, (l.y + 30) - y) > 105);
  let live = false, raf = 0, ult = 0, relogio = 0, proxBlip = 1200, proxDrop = 4500;
  function quadro(t) {
    const dt = Math.min(64, t - (ult || t)); ult = t; relogio += dt;
    // radar
    const a1 = (relogio / PERIODO * 360) % 360, a0 = ((relogio - dt) / PERIODO * 360 + 360) % 360;
    sweep.style.transform = `translate(-50%, -50%) rotate(${a1.toFixed(2)}deg)`;
    for (const { l, b } of alvos) if (passou(a0, a1, b)) pingMarker(l.id);
    // helicóptero
    const th = relogio / 34000 * Math.PI * 2, c = Math.cos(th), s = Math.sin(th);
    const hx = hc[0] + hu[0] * HA * c + hn[0] * HB * s, hy = hc[1] + hu[1] * HA * c + hn[1] * HB * s;
    const dxh = -hu[0] * HA * s + hn[0] * HB * c, dyh = -hu[1] * HA * s + hn[1] * HB * c, ah = Math.atan2(dyh, dxh) * 180 / Math.PI;
    poeEnt(heli, hx, hy, ah); poeEnt(heliSh, hx, hy, ah, W * 0.014, W * 0.02);
    // veículos
    for (const v of carros) {
      if (v.espera > 0) { v.espera -= dt; continue; }
      v.s += v.dir * v.v * dt / 1000;
      if (v.s <= 0 || v.s >= v.len) { v.s = clamp(v.s, 0, v.len); v.dir *= -1; v.espera = rnd(600, 2200); }
      const p = v.path.getPointAtLength(v.s), q = v.path.getPointAtLength(clamp(v.s + v.dir * 3, 0, v.len));
      poeEnt(v.el, p.x, p.y, Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI);
    }
    // hordas
    if (relogio >= proxBlip) { novoBlip(); proxBlip = relogio + rnd(900, 2600); }
    // airdrop
    if (!voo && relogio >= proxDrop) novoVoo(relogio);
    if (voo) {
      const k = (relogio - voo.t0) / voo.dur, x = voo.x0 + (voo.x1 - voo.x0) * k, y = voo.y0 + (voo.y1 - voo.y0) * k;
      poeEnt(aviao, x, y, voo.ang); poeEnt(aviaoSh, x, y, voo.ang, W * 0.03, W * 0.045);
      if (!voo.solto && k >= voo.f && (k > 0.9 || longeDosLocais(x, y))) { voo.solto = true; soltaCaixa(clamp(x, 60, 940), clamp(y, 60, MH - 60)); }
      if (k >= 1) { aviao.classList.remove("is-on"); aviaoSh.classList.remove("is-on"); proxDrop = voo.t0 + 20000; voo = null; }
    }
    raf = requestAnimationFrame(quadro);
  }
  let naTela = false, introOk = false;
  function ajustaLive() {
    const v = naTela && introOk && !document.hidden && anima();
    if (v === live) return; live = v;
    mapaEl.classList.toggle("is-live", v);
    if (v) { ult = 0; raf = requestAnimationFrame(quadro); } else cancelAnimationFrame(raf);
  }
  mapaEl.classList.add("is-live"); // a intro roda normalmente
  const ioVivo = new IntersectionObserver((ents) => { naTela = ents[0].isIntersecting; if (introOk) ajustaLive(); else mapaEl.classList.toggle("is-live", naTela); }, { rootMargin: "60px 0px" });
  ioVivo.observe(canvas);
  document.addEventListener("visibilitychange", ajustaLive);
  reduz.addEventListener?.("change", ajustaLive);
  // começa depois da intro (marcadores caindo + radar)
  const esperaIntro = () => { if (!mapaEl.classList.contains("is-in")) return setTimeout(esperaIntro, 250);
    setTimeout(() => { introOk = true; mapaEl.classList.add("is-vivo"); ajustaLive(); rota(fixado); atualizaLinha(); }, 2300); };
  esperaIntro();
})();
