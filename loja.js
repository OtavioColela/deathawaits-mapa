/* Loja VIP: lista os VIPs, cria o pagamento e mostra o status na volta do Mercado Pago. */
// Endereco do backend da loja (Cloudflare Worker), sem barra no final
const LOJA_API = "https://deathawaits-loja.deathawaitscda.workers.dev";

(() => {
  "use strict";
  const API = LOJA_API.replace(/\/$/, "");
  const configurada = !API.includes("SEU-USUARIO");
  const $ = (s, r = document) => r.querySelector(s);
  const brl = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  let produtos = [], escolhido = null;

  // menu do celular
  const burger = $(".da-burger"), nav = $("#da-nav");
  if (burger) burger.addEventListener("click", () => {
    const abre = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(abre));
    nav.classList.toggle("is-open", abre);
    document.documentElement.style.setProperty("--head-real", $(".da-head").offsetHeight + "px");
  });

  // ---------- VIPs
  const grade = $("#lj-produtos");
  function desenha() {
    grade.innerHTML = "";
    produtos.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "lj-card"; b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(escolhido === p.id)); b.dataset.id = p.id;
      b.innerHTML =
        (p.destaque ? '<span class="lj-card-tag">Mais pedido</span>' : "") +
        '<span class="lj-card-n"></span><span class="lj-card-p"></span><ul class="lj-card-b"></ul>' +
        '<span class="lj-card-sel"></span>';
      $(".lj-card-n", b).textContent = p.nome;
      $(".lj-card-p", b).innerHTML = brl(p.preco) + " <small>/ " + p.dias + " dias</small>";
      const ul = $(".lj-card-b", b);
      (p.beneficios || []).forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
      $(".lj-card-sel", b).textContent = escolhido === p.id ? "✓ Escolhido" : "Escolher";
      b.addEventListener("click", () => escolhe(p.id, true));
      grade.appendChild(b);
    });
  }
  function escolhe(id, rolar) {
    escolhido = id;
    const p = produtos.find((x) => x.id === id);
    $("#lj-r-nome").textContent = p ? p.nome : "Nenhum escolhido";
    $("#lj-r-dias").textContent = p ? p.dias + " dias" : "—";
    $("#lj-r-preco").textContent = p ? brl(p.preco) : "—";
    desenha();
    try { sessionStorage.setItem("lj-vip", id); } catch (e) {}
    if (rolar && window.matchMedia("(max-width: 820px)").matches) $("#comprar").scrollIntoView({ behavior: "smooth" });
  }
  if (!configurada) grade.innerHTML = '<p class="lj-carregando">A loja abre em breve.</p>';
  else fetch(API + "/produtos", { cache: "no-store" })
    .then((r) => r.json())
    .then((d) => {
      produtos = d.produtos || [];
      let salvo = null; try { salvo = sessionStorage.getItem("lj-vip"); } catch (e) {}
      const ini = produtos.find((p) => p.id === salvo) || produtos.find((p) => p.destaque) || produtos[0];
      if (ini) escolhe(ini.id, false); else grade.innerHTML = '<p class="lj-carregando">Nenhum VIP à venda no momento.</p>';
    })
    .catch(() => { grade.innerHTML = '<p class="lj-carregando">Não foi possível carregar os VIPs. Atualize a página.</p>'; });

  // ---------- compra
  const form = $("#lj-form"), nick = $("#lj-nick"), ok = $("#lj-ok"), btn = $("#lj-btn"), erro = $("#lj-erro");
  try { const n = localStorage.getItem("lj-nick"); if (n) nick.value = n; } catch (e) {}
  const mostraErro = (t) => { erro.textContent = t; erro.hidden = !t; };
  nick.addEventListener("input", () => { nick.removeAttribute("aria-invalid"); mostraErro(""); });

  document.querySelectorAll('a[href="#termos"]').forEach((a) => a.addEventListener("click", () => { $(".lj-termos").open = true; }));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const n = nick.value.trim();
    if (!configurada) return mostraErro("A loja ainda não está aberta.");
    if (!escolhido) return mostraErro("Escolha um VIP.");
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)) { nick.setAttribute("aria-invalid", "true"); nick.focus(); return mostraErro("Nick inválido: use de 3 a 16 letras, números ou _."); }
    if (!ok.checked) return mostraErro("Confirme o nick e aceite os Termos de Compra.");
    mostraErro(""); btn.disabled = true; btn.textContent = "Abrindo pagamento...";
    try { localStorage.setItem("lj-nick", n); } catch (e) {}
    try {
      const r = await fetch(API + "/comprar", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nick: n, produto: escolhido }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.url) throw new Error(d.erro || "Não foi possível abrir o pagamento.");
      window.location.href = d.url;
    } catch (err) {
      mostraErro(err.message); btn.disabled = false; btn.textContent = "Ir para o pagamento";
    }
  });

  // ---------- volta do Mercado Pago
  const qs = new URLSearchParams(location.search);
  const pedido = qs.get("pedido");
  if (pedido && /^[a-f0-9]{24}$/.test(pedido)) {
    const sec = $("#status"), rec = $(".lj-recibo", sec);
    sec.hidden = false;
    const pagId = qs.get("payment_id") || qs.get("collection_id") || "";
    const textos = {
      aguardando: ["Aguardando", "Conferindo seu pagamento", "Isso leva alguns segundos. Se pagou por Pix, pode levar até 1 minuto."],
      pago: ["Aprovado", "Pagamento aprovado!", "Entre no servidor com o nick abaixo: o VIP é ativado em até 1 minuto."],
      entregue: ["Entregue", "VIP ativado!", "Seu VIP já está ativo no servidor. Bom jogo!"],
      recusado: ["Recusado", "Pagamento não aprovado", "Nada foi cobrado. Você pode tentar de novo com outra forma de pagamento."],
      estornado: ["Estornado", "Pagamento estornado", "Este pagamento foi devolvido. Fale com a equipe no Discord se tiver dúvidas."],
    };
    let tentativas = 0;
    const pinta = (d) => {
      let st = d.status;
      if (st === "aguardando" && ["rejected", "cancelled"].includes(d.mp_status)) st = "recusado";
      const t = textos[st] || textos.aguardando;
      rec.dataset.st = st;
      $(".lj-carimbo", rec).textContent = t[0];
      $(".lj-recibo-t", rec).textContent = t[1];
      $(".lj-recibo-txt", rec).textContent = t[2];
      $('[data-r="nick"]', rec).textContent = d.nick || "—";
      $('[data-r="produto"]', rec).textContent = d.produto ? d.produto + " · " + d.dias + " dias" : "—";
      return st;
    };
    const consulta = async () => {
      tentativas++;
      try {
        const r = await fetch(API + "/pedido?codigo=" + pedido + "&payment_id=" + encodeURIComponent(pagId), { cache: "no-store" });
        const d = await r.json();
        if (!r.ok) throw new Error(d.erro);
        const st = pinta(d);
        if ((st === "aguardando" || st === "pago") && tentativas < 120) setTimeout(consulta, st === "pago" ? 10000 : 4000);
      } catch (e) {
        $(".lj-recibo-txt", rec).textContent = "Não foi possível consultar o pedido. Atualize a página em instantes.";
      }
    };
    consulta();
    sec.scrollIntoView();
  }
})();
