/* =====================================================================
   DeathAwaits · seção "O mapa" (protótipo v1)
   TUDO que muda com frequência fica neste objeto MAPA_CONFIG.
   Edite aqui; não precisa mexer no HTML.
   ===================================================================== */
const MAPA_CONFIG = {
  // Pasta das imagens (vazio = mesma pasta do index.html, igual ao site atual).
  pastaImagens: "",

  /* ------------------------------------------------------------------
     STATUS AO VIVO
     Enquanto modoExemplo = true, a faixa mostra os números de "exemplo"
     abaixo com o selo "DADOS DE EXEMPLO". NUNCA publique o site com
     modoExemplo = true fingindo que são números reais.

     Para ligar dados reais:
     1) Jogadores online -> API pública mcsrvstat.us (aceita CORS):
          https://api.mcsrvstat.us/3/SEU_IP
        Resposta: { online: true, players: { online: 12, max: 100 } }
        Preencha "servidorIP" com o IP/domínio do servidor.
     2) Discord -> duas opções:
        a) Convite com contagem (membros totais e online, sem configurar nada):
             https://discord.com/api/v10/invites/CODIGO?with_counts=true
           Campos: approximate_member_count / approximate_presence_count.
           Preencha "discordConvite" (já está com o código do site).
        b) Widget do servidor (só conta quem está ONLINE no Discord):
             https://discord.com/api/guilds/ID_DO_SERVIDOR/widget.json
           Ative em Configurações do servidor > Widget. Campo: presence_count.
     3) Clã no topo / domínio dos locais -> não existe API pública.
        Exporte do plugin de clãs/dominação um JSON (ex.: status.json no
        próprio GitHub Pages, atualizado por um bot) e coloque a URL em
        "statusJsonUrl". Formato esperado:
          { "claTopo": "[TAG] Nome", "dominio": { "centro": "[TAG] Nome", ... } }
     Depois de configurar, troque modoExemplo para false.
     ------------------------------------------------------------------ */
  status: {
    modoExemplo: true,
    exemplo: { online: 37, max: 120, discord: 850, claTopo: "[TAG] Clã de exemplo" },
    servidorIP: "",              // ex.: "jogar.deathawaits.com.br"
    discordConvite: "gc73gQfb5F", // código de https://discord.gg/gc73gQfb5F
    statusJsonUrl: "",           // ex.: "status.json"
    atualizarACadaSeg: 60
  },

  /* ------------------------------------------------------------------
     LOCAIS DO MAPA
     x / y = posição no mapa ilustrativo (0–1000 na horizontal, 0–620 na vertical).
     risco: "baixo" | "medio" | "alto" | "extremo"
     loot:  "comum" | "raro" | "militar"
     dominio: texto do clã. Enquanto for placeholder, deixe dominioExemplo: true
     (mostra o selo "exemplo" ao lado).
     ATENÇÃO: risco e loot abaixo são sugestões do protótipo. Ajustem para
     o que realmente acontece no servidor.
     ------------------------------------------------------------------ */
  locais: [
    { id: "safezone", n: "01", nome: "Safezone", img: "safezone.jpg", x: 500, y: 318,
      risco: "baixo", loot: "comum", dominio: "Ninguém · zona neutra", dominioExemplo: false,
      alt: "Safezone: praça com caminhões do exército, helicópteros e um prédio do governo ao fundo",
      lore: "Os últimos caminhões do exército ainda estão estacionados na praça. Aqui dentro dá pra respirar. Lá fora, ninguém vai te esperar." },
    { id: "base", n: "02", nome: "Base militar", img: "base-hazmat.jpg", x: 850, y: 108,
      risco: "extremo", loot: "militar", dominio: "[TAG] Clã de exemplo", dominioExemplo: true,
      alt: "Instalação militar com helicóptero, prédios de concreto e zumbis com roupas hazmat laranja andando pela pista",
      lore: "O helicóptero de evacuação nunca decolou. A tripulação ainda está na pista, de roupa hazmat e com fome." },
    { id: "posto", n: "03", nome: "Posto destruído", img: "ruinas-militares.jpg", x: 470, y: 535,
      risco: "alto", loot: "militar", dominio: "Em disputa", dominioExemplo: true,
      alt: "Vista do alto de uma fortificação militar em ruínas, com jipes, caixas de suprimentos e um helicóptero caído",
      lore: "Caixas de suprimento lacradas no meio dos escombros. Alguém derrubou aquele helicóptero, e ainda pode estar por perto." },
    { id: "centro", n: "04", nome: "Centro", img: "cidade.jpg", x: 690, y: 250,
      risco: "alto", loot: "raro", dominio: "[TAG] Clã de exemplo", dominioExemplo: true,
      alt: "Centro de uma cidade com prédios altos, ruas asfaltadas e árvores",
      lore: "Cada janela é um atirador em potencial. Os andares de cima ainda não foram saqueados, porque quem sobe nem sempre desce." },
    { id: "bairros", n: "05", nome: "Bairros", img: "bairros.jpg", x: 725, y: 476,
      risco: "medio", loot: "comum", dominio: "Sem dono", dominioExemplo: true,
      alt: "Bairro com dezenas de casas, um viaduto e um arranha-céu ao fundo",
      lore: "Dezenas de casas, cada uma com uma geladeira, um armário e um morador que não saiu a tempo. Bom lugar pra começar." },
    { id: "castelo", n: "06", nome: "Castelo", img: "castelo.jpg", x: 250, y: 400,
      risco: "medio", loot: "raro", dominio: "[TAG] Clã de exemplo", dominioExemplo: true,
      alt: "Castelo de pedra numa ilha cercada por um rio, no meio de uma floresta de pinheiros",
      lore: "Uma ponte, uma ilha e muralhas de pedra. O melhor esconderijo do mapa, se você conseguir tirar quem já está lá dentro." },
    { id: "floresta", n: "07", nome: "Floresta e cânion", img: "floresta.jpg", x: 180, y: 158,
      risco: "baixo", loot: "comum", dominio: "Sem dono", dominioExemplo: true,
      alt: "Rio correndo num cânion de pedra no meio de uma floresta de pinheiros",
      lore: "Pinheiros fechados e um rio no fundo do cânion. Ninguém te vê aqui, mas você também não vê quem está te seguindo." }
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

  const RISCO = { baixo: ["Baixo", 1], medio: ["Médio", 2], alto: ["Alto", 3], extremo: ["Extremo", 4] };
  const LOOT = { comum: "Comum", raro: "Raro", militar: "Militar" };
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => Array.from(el.querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 820px)");
  const hoverOk = window.matchMedia("(hover: hover) and (pointer: fine)");
  const quadrante = (l) => "ABCDEFGHIJ"[Math.min(9, Math.floor(l.x / 100))] + (Math.floor(l.y / 100) + 1);
  const img = (f) => C.pastaImagens + f;

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
  const cards = $(".mp-cards");
  C.locais.forEach((l) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "mp-marker"; b.dataset.id = l.id; b.dataset.risco = l.risco;
    b.style.left = (l.x / 10) + "%"; b.style.top = (l.y / 6.2) + "%";
    b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-controls", "mp-dossie");
    b.setAttribute("aria-label", `${l.nome}: risco ${RISCO[l.risco][0]}, loot ${LOOT[l.loot]}`);
    b.innerHTML = `<span class="mp-pin" aria-hidden="true"></span><span class="mp-tag" aria-hidden="true"><b>${l.n}</b>${esc(l.nome)}</span>`;
    canvas.appendChild(b);

    const li = document.createElement("li");
    li.className = "mp-card"; li.dataset.id = l.id; li.dataset.risco = l.risco;
    li.innerHTML = `<button type="button" aria-pressed="false" aria-controls="mp-dossie"><div class="mp-thumb"><img src="${img(l.img)}" alt="${esc(l.alt)}" loading="lazy" width="320" height="200"></div><span>Registro ${l.n} · ${RISCO[l.risco][0]}<b>${esc(l.nome)}</b></span></button>`;
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
    const dom = (dominioReal && dominioReal[l.id]) || l.dominio;
    const ehEx = !(dominioReal && dominioReal[l.id]) && l.dominioExemplo;
    $("[data-f=dominio]", dossie).innerHTML = `${esc(dom)}${ehEx ? ' <span class="mp-ex">exemplo</span>' : ""}`;
    $(".mp-lore", dossie).textContent = `“${l.lore}”`;
    if (animar && !reduz.matches) {
      const body = $(".mp-dossie-in", dossie);
      body.classList.remove("mp-swap"); void body.offsetWidth; body.classList.add("mp-swap");
    }
  }

  function marcar(id) {
    $$(".mp-marker").forEach((m) => m.setAttribute("aria-pressed", String(m.dataset.id === id)));
    $$(".mp-card button").forEach((b) => b.setAttribute("aria-pressed", String(b.closest(".mp-card").dataset.id === id)));
  }

  function selecionar(id, origem) {
    fixado = id; marcar(id); render(id);
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
    if (m && hoverOk.matches && !mobile.matches && m.dataset.id !== dossie.dataset.preview) { dossie.dataset.preview = m.dataset.id; render(m.dataset.id); }
  });
  canvas.addEventListener("mouseleave", () => {
    if (dossie.dataset.preview && dossie.dataset.preview !== fixado) render(fixado);
    delete dossie.dataset.preview;
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
  let dominioReal = null;
  const fmt = (n) => (typeof n === "number" ? n.toLocaleString("pt-BR") : "—");
  function pintaStatus(d, exemplo) {
    strip.classList.toggle("is-exemplo", exemplo);
    $(".mp-badge-ex", strip).hidden = !exemplo;
    $(".mp-live-txt", strip).textContent = exemplo ? "Status do servidor" : "Ao vivo";
    $("[data-s=online]", strip).innerHTML = d.online == null ? "—" : `${fmt(d.online)}${d.max ? ` <small>/ ${fmt(d.max)}</small>` : ""}`;
    $("[data-s=discord]", strip).textContent = fmt(d.discord);
    $("[data-s=cla]", strip).textContent = d.claTopo || "—";
    $(".mp-status-note", strip).textContent = exemplo
      ? "Números ilustrativos do protótipo. Ainda não estão conectados ao servidor nem ao Discord."
      : `Atualizado às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`;
  }
  async function getJSON(url) { const r = await fetch(url, { cache: "no-store" }); if (!r.ok) throw new Error(r.status); return r.json(); }
  async function atualizaStatus() {
    const d = { online: null, max: null, discord: null, claTopo: null };
    const tarefas = [];
    if (S.servidorIP) tarefas.push(getJSON(`https://api.mcsrvstat.us/3/${encodeURIComponent(S.servidorIP)}`).then((j) => { d.online = j.online ? j.players?.online ?? 0 : 0; d.max = j.players?.max ?? null; }));
    if (S.discordConvite) tarefas.push(getJSON(`https://discord.com/api/v10/invites/${S.discordConvite}?with_counts=true`).then((j) => { d.discord = j.approximate_member_count ?? null; }));
    if (S.statusJsonUrl) tarefas.push(getJSON(S.statusJsonUrl).then((j) => { d.claTopo = j.claTopo || null; dominioReal = j.dominio || null; }));
    await Promise.allSettled(tarefas); // se uma fonte falhar, aquele campo mostra "—" (nunca um número inventado)
    pintaStatus(d, false); render(fixado, false);
  }
  if (S.modoExemplo) pintaStatus(S.exemplo, true);
  else { pintaStatus({}, false); atualizaStatus(); setInterval(atualizaStatus, Math.max(30, S.atualizarACadaSeg) * 1000); }

  /* ---------- início (aceita link direto: #mapa-base, #mapa-castelo...) ---------- */
  const hash = location.hash.replace("#mapa-", "");
  const inicial = C.locais.some((l) => l.id === hash) ? hash : "safezone";
  fixado = inicial; marcar(inicial); render(inicial, false);
  if (hash === inicial && location.hash.startsWith("#mapa-")) {
    root.scrollIntoView();
    if (mobile.matches) abrirSheet($(`.mp-marker[data-id="${inicial}"]`));
  }
})();
