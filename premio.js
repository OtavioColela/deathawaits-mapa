// Mostra o premio da temporada (porcentagem do lucro do servidor) com os numeros do Worker da loja.
(function () {
  const API = "https://deathawaits-loja.deathawaitscda.workers.dev/temporada";
  const sec = document.getElementById("premio");
  if (!sec) return;
  const brl = (v) => "R$ " + Number(v || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const $ = (s) => sec.querySelector(s);
  async function carregar() {
    try {
      const r = await fetch(API, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      $("[data-pr=nome]").textContent = d.temporada;
      for (const k of ["top1", "top2", "top3"]) {
        $(`[data-pr=${k}]`).textContent = brl(d.premios[k]);
        $(`[data-pr=${k}p]`).textContent = d.porcentagens[k] + "% do lucro";
      }
      $("[data-pr=vendas]").textContent = brl(d.bruto);
      $("[data-pr=taxas]").textContent = brl(d.taxas);
      $("[data-pr=custos]").textContent = brl(d.totalCustos);
      $("[data-pr=lucro]").textContent = brl(d.lucro);
      sec.hidden = false;
    } catch (e) { /* sem dados: o bloco continua escondido */ }
  }
  carregar();
  setInterval(carregar, 60000);
})();
