// Gera jogo/menu.txt (lido pela tela inicial do jogo) a partir do MAPA_CONFIG do mapa.js
// e do jogo/noticias.txt. Rode com: node jogo/gerar.js  (a GitHub Action roda sozinha)
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");
const raiz = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(raiz, "mapa.js"), "utf8");
const ini = js.indexOf("const MAPA_CONFIG =");
const fim = js.indexOf("\n};", ini);
if (ini < 0 || fim < 0) throw new Error("MAPA_CONFIG nao encontrado no mapa.js");
const C = vm.runInNewContext("(" + js.slice(ini + "const MAPA_CONFIG =".length, fim + 2).trim().replace(/;$/, "") + ")");
const limpa = (s) => String(s == null ? "" : s).replace(/[|\r\n]+/g, " ").trim();

const linhas = ["# gerado por jogo/gerar.js - nao edite (edite mapa.js e jogo/noticias.txt)"];
const img = path.join(__dirname, "mapa.jpg");
const versao = fs.existsSync(img) ? crypto.createHash("sha1").update(fs.readFileSync(img)).digest("hex").slice(0, 12) : "0";
linhas.push(["imagem", "https://deathawaits.com.br/jogo/mapa.jpg", versao].join("|"));
for (const l of C.locais || []) {
  linhas.push(["ponto", limpa(l.n), limpa(l.nome), Number(l.x).toFixed(2), Number(l.y).toFixed(2), limpa(l.risco), limpa(l.loot), limpa(l.lore)].join("|"));
}
const nt = path.join(__dirname, "noticias.txt");
if (fs.existsSync(nt)) {
  for (const raw of fs.readFileSync(nt, "utf8").split(/\r?\n/)) {
    const s = raw.trim(); if (!s || s.startsWith("#")) continue;
    const i = s.indexOf("|"); if (i < 0) continue;
    linhas.push(["noticia", limpa(s.slice(0, i)).toUpperCase(), limpa(s.slice(i + 1))].join("|"));
  }
}
fs.writeFileSync(path.join(__dirname, "menu.txt"), linhas.join("\n") + "\n");
console.log("menu.txt:", (C.locais || []).length, "pontos, imagem", versao);
