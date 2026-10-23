/* =====================================================================
   DeathAwaits · interações do site inteiro (v3)
   CSS + JS puro. Tudo respeita prefers-reduced-motion e teclado.
   A seção do mapa tem o próprio script (mapa.js).
   ===================================================================== */
(function () {
  "use strict";
  const d = document, html = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const mq = (q) => window.matchMedia(q);
  const reduz = mq("(prefers-reduced-motion: reduce)");
  const fino = mq("(hover: hover) and (pointer: fine)");
  const mobile = mq("(max-width: 820px)");
  const anima = () => !reduz.matches && html.classList.contains("da-anim");

  /* ---------- toast ---------- */
  const toastEl = $(".da-toast"); let toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("is-on"), 2200); }

  /* ---------- boot (1x por sessão) ---------- */
  function terminaBoot() {
    if (!html.classList.contains("da-booting")) return;
    html.classList.add("da-boot-out");
    setTimeout(() => { html.classList.remove("da-booting", "da-boot-out"); }, 360);
  }
  function carregado() { requestAnimationFrame(() => html.classList.add("is-loaded")); iniciaHero(); }

  /* ---------- título em estêncil: letra por letra ---------- */
  const h1 = $(".hero h1");
  if (h1 && anima()) {
    let i = 0;
    $$(".da-line", h1).forEach((line) => {
      const alvo = line.querySelector("span") || line;
      alvo.innerHTML = alvo.textContent.split("").map((c) => `<span class="da-ch" style="--d:${(0.15 + i++ * 0.055).toFixed(3)}s">${c}</span>`).join("");
    });
  }

  /* ---------- ficha: digitação ---------- */
  let heroIniciado = false;
  function iniciaHero() {
    if (heroIniciado) return; heroIniciado = true;
    const campos = $$(".ficha .da-typed");
    if (!anima()) return;
    const textos = campos.map((c) => c.textContent);
    campos.forEach((c) => { c.style.minWidth = c.offsetWidth + "px"; c.style.display = "inline-block"; c.textContent = ""; c.setAttribute("aria-label", textos[campos.indexOf(c)]); });
    let k = 0;
    setTimeout(function proximo() {
      if (k >= campos.length) return;
      const el = campos[k], txt = textos[k]; let n = 0; el.classList.add("is-typing");
      const tick = () => { el.textContent = txt.slice(0, ++n); if (n < txt.length) setTimeout(tick, 28); else { el.classList.remove("is-typing"); el.removeAttribute("aria-label"); k++; setTimeout(proximo, 90); } };
      tick();
    }, 900);
  }

  /* ---------- copiar ---------- */
  d.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    const txt = b.dataset.copy;
    try { await navigator.clipboard.writeText(txt); }
    catch (_) { const ta = d.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0"; d.body.appendChild(ta); ta.select(); try { d.execCommand("copy"); } catch (__) {} ta.remove(); }
    b.textContent = "Copiado!"; b.classList.add("is-ok"); toast("Link do Discord copiado");
    setTimeout(() => { b.textContent = "Copiar"; b.classList.remove("is-ok"); }, 1800);
  });

  /* ---------- cabeçalho, progresso, voltar ao topo, CTA flutuante, parallax ---------- */
  const head = $(".da-head"), prog = $(".da-progress"), topo = $(".da-top"), mcta = $(".da-mcta");
  const heroBox = $(".da-hero-wrap");
  const para = $$("[data-parallax]");
  let heroVisivel = true, ctaMapaVisivel = false, rodapeVisivel = false, ticking = false;
  function onScroll() {
    ticking = false;
    const y = window.scrollY, max = d.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, y / max) : 0;
    prog.style.setProperty("--p", p.toFixed(4)); topo.style.setProperty("--p", p.toFixed(4));
    head.classList.toggle("is-scrolled", y > 12);
    topo.classList.toggle("is-on", y > innerHeight * 0.9);
    const showM = !heroVisivel && !ctaMapaVisivel && !rodapeVisivel && !$(".mp-dossie.is-open") && !$(".da-lb.is-open");
    mcta.classList.toggle("is-on", showM); d.body.classList.toggle("da-mcta-visible", showM && mobile.matches);
    if (anima() && heroVisivel) para.forEach((el) => { el.style.transform = `translate3d(0, ${(y * parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`; });
  }
  const pedeScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  addEventListener("scroll", pedeScroll, { passive: true }); addEventListener("resize", pedeScroll);
  const seen = (el, cb, opt) => { if (!el) return; new IntersectionObserver((es) => es.forEach((e) => cb(e.isIntersecting, e)), opt).observe(el); };
  seen(heroBox, (v) => { heroVisivel = v; pedeScroll(); ash.toggle(v); }, { rootMargin: "-80px 0px 0px 0px" });
  seen($(".mp-cta"), (v) => { ctaMapaVisivel = v; pedeScroll(); });
  seen($("footer"), (v) => { rodapeVisivel = v; pedeScroll(); });
  topo.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduz.matches ? "auto" : "smooth" }); $(".brand").focus({ preventScroll: true }); });

  /* ---------- nav ativa ---------- */
  const navLinks = $$('#da-nav a[href^="#"]');
  const secs = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const ioNav = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id)));
  }), { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach((s) => ioNav.observe(s));
  seen(heroBox, (v) => { if (v) navLinks.forEach((a) => a.setAttribute("aria-current", "false")); }, { rootMargin: "-45% 0px -50% 0px" });

  /* ---------- menu mobile ---------- */
  const burger = $(".da-burger"), nav = $("#da-nav");
  function menu(abrir) {
    burger.setAttribute("aria-expanded", String(abrir)); burger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    head.style.setProperty("--head-real", head.getBoundingClientRect().height + "px");
    nav.classList.toggle("is-open", abrir);
    if (abrir) nav.querySelector("a").focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => menu(burger.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a") && mobile.matches) menu(false); });
  d.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { menu(false); burger.focus(); } });
  d.addEventListener("click", (e) => { if (nav.classList.contains("is-open") && !e.target.closest(".da-head")) menu(false); });
  mobile.addEventListener?.("change", () => menu(false));

  /* ---------- rolagem suave com compensação do cabeçalho (o CSS já faz scroll-margin) ---------- */
  d.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const alvo = a.getAttribute("href") === "#inicio" ? d.body : $(a.getAttribute("href")); if (!alvo) return;
    e.preventDefault();
    if (alvo === d.body) window.scrollTo({ top: 0, behavior: reduz.matches ? "auto" : "smooth" });
    else alvo.scrollIntoView({ behavior: reduz.matches ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", a.getAttribute("href"));
    if (alvo !== d.body) { alvo.setAttribute("tabindex", "-1"); alvo.focus({ preventScroll: true }); }
  });

  /* ---------- scroll-reveal do site (o mapa usa o mesmo padrão em mapa.js) ---------- */
  const gruposStagger = [[".da-cards .item", 0.07], [".passos li", 0.12]];
  gruposStagger.forEach(([sel, step]) => $$(sel).forEach((el, i) => { if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", (i % 4 * step).toFixed(2) + "s"); }));
  const ioRev = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); ioRev.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-sr], .da-divider").forEach((el) => ioRev.observe(el));

  /* ---------- botões magnéticos ---------- */
  $$("[data-magnetic]").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      if (!fino.matches || !anima()) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px");
      b.style.setProperty("--my", ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px");
    });
    b.addEventListener("pointerleave", () => { b.style.removeProperty("--mx"); b.style.removeProperty("--my"); });
  });

  /* ---------- cinzas/brasas no hero (canvas leve; pausa fora da tela) ---------- */
  const ash = (function () {
    const cv = $(".da-ash"); if (!cv || reduz.matches) return { toggle() {} };
    const ctx = cv.getContext("2d"); let W = 0, H = 0, dpr = 1, raf = 0, on = false, parts = [];
    const escuro = () => getComputedStyle(html).getPropertyValue("--bg").trim().toLowerCase() === "#181a13";
    function size() { dpr = Math.min(1.5, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function nova(y) { return { x: Math.random() * W, y: y ?? H + 10, r: Math.random() * 1.8 + .6, vy: Math.random() * .35 + .15, vx: (Math.random() - .5) * .25, a: Math.random() * .5 + .25, w: Math.random() * 6.28, brasa: Math.random() < .3 }; }
    function init() { size(); const n = Math.round(Math.min(70, W / 18)); parts = Array.from({ length: n }, () => nova(Math.random() * H)); }
    function frame() {
      ctx.clearRect(0, 0, W, H); const dk = escuro();
      for (const p of parts) {
        p.y -= p.vy; p.w += .02; p.x += p.vx + Math.sin(p.w) * .2;
        if (p.y < -10) Object.assign(p, nova());
        ctx.globalAlpha = p.a * (p.brasa ? (.6 + Math.sin(p.w * 3) * .4) : 1);
        ctx.fillStyle = p.brasa ? (dk ? "#e0b43c" : "#8e6608") : (dk ? "#a3a48d" : "#5c604d");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    addEventListener("resize", () => { if (on) size(); });
    d.addEventListener("visibilitychange", () => { if (d.hidden) cancelAnimationFrame(raf); else if (on) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } });
    let pronto = false;
    return { toggle(v) { if (v === on) return; on = v; if (v) { if (!pronto) { init(); pronto = true; } raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf); } };
  })();

  /* ---------- como entrar: linha de progresso dos passos ---------- */
  const passos = $(".passos");
  if (passos) {
    const track = d.createElement("div"); track.className = "da-track"; track.setAttribute("aria-hidden", "true"); track.innerHTML = "<i></i>"; passos.prepend(track);
    const lis = $$("li", passos);
    if (anima()) {
      let pend = false;
      const upd = () => {
        pend = false;
        const r = passos.getBoundingClientRect();
        const k = Math.max(0, Math.min(1, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25)));
        const fill = mobile.matches ? k : Math.min(1, k * 1.15);
        track.style.setProperty("--fill", fill.toFixed(3));
        lis.forEach((li, i) => li.classList.toggle("is-done", fill >= (mobile.matches ? i / lis.length + 0.02 : (i + 0.15) / lis.length)));
      };
      addEventListener("scroll", () => { if (!pend) { pend = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
    } else lis.forEach((li) => li.classList.add("is-done"));
  }

  /* ---------- acordeão ---------- */
  $$(".da-acc-btn").forEach((b) => b.addEventListener("click", () => {
    const abre = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", String(abre)); b.closest(".da-acc").classList.toggle("is-open", abre);
  }));

  /* ---------- inclinação + reflexo (launcher) ---------- */
  if (fino.matches && !reduz.matches) html.classList.add("da-tilt-on");
  $$(".da-tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      if (!fino.matches || reduz.matches) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((x - .5) * 8).toFixed(2) + "deg"); el.style.setProperty("--rx", ((.5 - y) * 8).toFixed(2) + "deg");
      el.style.setProperty("--gx", (x * 100).toFixed(1) + "%"); el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    });
    el.addEventListener("pointerleave", () => ["--rx", "--ry"].forEach((p) => el.style.removeProperty(p)));
  });

  /* ---------- recursos: spotlight + abas ---------- */
  const feats = $("#da-feats");
  if (feats) {
    feats.addEventListener("pointermove", (e) => {
      const c = e.target.closest(".item"); if (!c) return;
      const r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    const items = $$(".item", feats), tabs = $$(".da-tab");
    items.forEach((it) => {
      const nomes = { pvp: "PvP", pve: "PvE", clas: "Clãs" };
      const t = d.createElement("div"); t.className = "da-tags"; t.innerHTML = it.dataset.tags.split(" ").map((x) => `<span>${nomes[x]}</span>`).join("");
      it.querySelector("div").appendChild(t);
    });
    tabs.forEach((t) => { const k = t.dataset.tab; t.querySelector("em").textContent = k === "todos" ? items.length : items.filter((i) => i.dataset.tags.includes(k)).length; });
    function filtra(k) {
      const antes = new Map(items.map((i) => [i, i.getBoundingClientRect()]));
      items.forEach((i) => { const v = k === "todos" || i.dataset.tags.split(" ").includes(k); i.classList.toggle("is-hidden", !v); });
      if (!anima()) return;
      items.forEach((i) => { // FLIP: anima da posição antiga para a nova
        if (i.classList.contains("is-hidden")) return;
        const a = antes.get(i), b = i.getBoundingClientRect();
        if (a.width === 0) { i.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "cubic-bezier(.2,.75,.2,1)" }); return; }
        const dx = a.left - b.left, dy = a.top - b.top; if (!dx && !dy) return;
        i.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 450, easing: "cubic-bezier(.2,.75,.2,1)" });
      });
    }
    function seleciona(t, foco) {
      tabs.forEach((x) => { const s = x === t; x.setAttribute("aria-selected", String(s)); x.tabIndex = s ? 0 : -1; });
      if (foco) t.focus(); filtra(t.dataset.tab);
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => seleciona(t));
      t.addEventListener("keydown", (e) => {
        const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!n) return;
        e.preventDefault(); seleciona(tabs[(i + n + tabs.length) % tabs.length], true);
      });
    });
  }

  /* ---------- Meu PC roda? ---------- */
  const pc = $(".da-pc");
  if (pc) {
    const v = $(".da-verdict", pc);
    pc.addEventListener("change", () => {
      const f = new FormData(pc), so = f.get("so"), ram = f.get("ram"), disco = f.get("disco");
      let estado = "pend", selo = "Aguardando", txt = "Marque as três opções para ver o resultado.";
      const falhas = [];
      if (so === "win32") falhas.push("o DeathAwaits pede Windows 64 bits");
      if (so === "outro") falhas.push("o launcher é só para Windows");
      if (ram && +ram < 4) falhas.push("a memória está abaixo dos 4 GB mínimos");
      if (disco === "0") falhas.push("é preciso liberar pelo menos 3 GB no disco");
      if (falhas.length) { estado = "no"; selo = "Reprovado"; txt = "Atenção: " + falhas.join("; ") + "."; }
      else if (so && ram && disco) { estado = "ok"; selo = "Liberado"; txt = "Seu PC atende aos requisitos mínimos. Baixe o launcher e bom jogo, sobrevivente."; }
      if (v.dataset.v !== estado) { v.classList.remove("is-new"); void v.offsetWidth; v.classList.add("is-new"); }
      v.dataset.v = estado; $(".da-vstamp", v).textContent = selo; $(".da-vtxt", v).textContent = txt;
    });
  }

  /* ---------- lightbox (launcher + fotos do mapa) ---------- */
  const lb = $(".da-lb"), lbImg = $(".da-lb-img"), lbCap = $(".da-lb-cap"), lbCount = $(".da-lb-count");
  let lista = [], idx = 0, voltaFoco = null, origem = null;
  function mostra(i, dir) {
    idx = (i + lista.length) % lista.length; const it = lista[idx];
    lbImg.src = it.src; lbImg.alt = it.alt || ""; lbCap.textContent = it.caption || it.alt || ""; lbCount.textContent = `Registro ${idx + 1} / ${lista.length}`;
    $(".da-lb-prev").hidden = $(".da-lb-next").hidden = lista.length < 2;
    lb.classList.remove("is-1x1"); lb.classList.toggle("is-zoomavel", !!it.zoom); lbImg.title = it.zoom ? "Clique para ver em tamanho real" : "";
    if (dir && anima()) { lbImg.style.setProperty("--sx", dir * 40 + "px"); lbImg.classList.remove("is-swap"); void lbImg.offsetWidth; lbImg.classList.add("is-swap"); }
  }
  function abre(items, i = 0, fromEl) {
    lista = items; voltaFoco = d.activeElement; origem = fromEl || null;
    lb.hidden = false; lb.classList.add("is-open"); mostra(i);
    d.body.style.overflow = "hidden"; pedeScroll();
    requestAnimationFrame(() => {
      lb.classList.add("is-shown");
      if (origem && anima()) { // zoom a partir da miniatura
        const go = () => {
          const a = origem.getBoundingClientRect(), b = lbImg.getBoundingClientRect(); if (!b.width) return;
          lbImg.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`, opacity: .6 }, { transform: "none", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.2,.75,.2,1)" });
        };
        lbImg.complete ? go() : lbImg.addEventListener("load", go, { once: true });
      }
      $(".da-lb-close").focus();
    });
  }
  function fecha() {
    if (!lb.classList.contains("is-open")) return;
    lb.classList.remove("is-shown");
    setTimeout(() => { lb.classList.remove("is-open", "is-1x1"); lb.hidden = true; d.body.style.overflow = ""; pedeScroll(); }, anima() ? 280 : 0);
    if (voltaFoco) voltaFoco.focus({ preventScroll: true });
  }
  window.DALightbox = { open: abre, close: fecha };
  // itens com zoom:true (mapa): clique alterna entre "cabe na tela" e tamanho real com rolagem
  lbImg.addEventListener("click", (e) => {
    if (!lb.classList.contains("is-zoomavel")) return;
    const st = $(".da-lb-stage"), r = lbImg.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    const on = lb.classList.toggle("is-1x1"); lbImg.title = on ? "Clique para caber na tela" : "Clique para ver em tamanho real";
    if (on) { st.scrollLeft = fx * lbImg.offsetWidth - st.clientWidth / 2; st.scrollTop = fy * lbImg.offsetHeight - st.clientHeight / 2; }
  });
  $(".da-lb-close").addEventListener("click", fecha);
  $(".da-lb-bg").addEventListener("click", fecha);
  $(".da-lb-prev").addEventListener("click", () => mostra(idx - 1, -1));
  $(".da-lb-next").addEventListener("click", () => mostra(idx + 1, 1));
  lb.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); fecha(); }
    if (e.key === "ArrowRight") mostra(idx + 1, 1);
    if (e.key === "ArrowLeft") mostra(idx - 1, -1);
    if (e.key === "Tab") { const f = $$("button:not([hidden])", lb); const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  let sx = null; // swipe
  $(".da-lb-stage").addEventListener("pointerdown", (e) => { sx = e.clientX; });
  $(".da-lb-stage").addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 45) mostra(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); else if (e.target === e.currentTarget) fecha(); });
  $$("[data-lightbox]").forEach((fig) => {
    const im = $("img", fig); fig.tabIndex = 0; fig.setAttribute("role", "button"); fig.setAttribute("aria-label", "Ampliar foto: " + (fig.dataset.caption || im.alt));
    const go = () => abre([{ src: im.currentSrc || im.src, alt: im.alt, caption: fig.dataset.caption }], 0, im);
    fig.addEventListener("click", go); fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  /* ---------- cursor de mira (só mouse, sem "reduzir movimento") ---------- */
  (function () {
    if (!fino.matches || reduz.matches) return;
    const cur = $(".da-cursor"), dot = $(".da-cursor-dot"), ring = $(".da-cursor-ring");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, ativo = false;
    const loop = () => { rx += (x - rx) * .22; ry += (y - ry) * .22; ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`; raf = Math.abs(x - rx) + Math.abs(y - ry) > .3 ? requestAnimationFrame(loop) : 0; };
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      if (!ativo) { ativo = true; html.classList.add("da-cursor-on"); rx = e.clientX; ry = e.clientY; }
      x = e.clientX; y = e.clientY; dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cur.classList.toggle("is-link", !!e.target.closest("a, button, [role=button], label, .mp-marker, summary"));
      cur.classList.remove("is-hidden"); if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    d.addEventListener("pointerdown", () => cur.classList.add("is-down")); d.addEventListener("pointerup", () => cur.classList.remove("is-down"));
    d.documentElement.addEventListener("mouseleave", () => cur.classList.add("is-hidden"));
    addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse" && ativo) { ativo = false; html.classList.remove("da-cursor-on"); } });
  })();

  onScroll();

  /* ---------- arranque: boot 1x por sessão, depois anima o hero ---------- */
  if (html.classList.contains("da-booting")) {
    const t = setTimeout(() => { terminaBoot(); carregado(); }, 1250);
    const pular = () => { clearTimeout(t); terminaBoot(); carregado(); d.removeEventListener("keydown", pular); };
    $(".da-boot").addEventListener("click", pular); d.addEventListener("keydown", pular, { once: true });
  } else carregado();
})();
