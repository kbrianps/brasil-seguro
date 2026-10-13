(function () {
  var R = window.BS_RISKS, U = window.BS_UFS, L = window.BS_LOCAIS || {}, ORD = window.BS_ORDEM, P = window.BS_PONTOS, BG = window.BS_BAIRROS_GEO;
  var root = window.BS_ROOT || "/";
  var app = document.getElementById("app");
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var seal = '<svg class="seal" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4l24 9v17c0 15-10 26-24 31C18 56 8 45 8 30V13z" fill="#1351B4"/><path d="M32 12l16 6v12c0 10-6.5 17.5-16 21-9.5-3.5-16-11-16-21V18z" fill="#fff"/><path d="M24 32l6 6 11-12" stroke="#168821" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var banner = '<div class="proto"><b>PROTÓTIPO ACADÊMICO</b> · UNIRIO · simulação com dados fictícios · não é canal oficial do governo</div>';
  var header = function (extra) {
    return '<header class="hdr"><div class="hdr-in">' + seal + '<h1><a href="' + root + '">Brasil Seguro</a><small>Proteção e Defesa Civil · proposta</small></h1><div class="tools">' +
      '<button data-a="font" aria-label="Aumentar letra" title="Aumentar letra">A+</button>' +
      '<button data-a="contrast" aria-label="Alto contraste" title="Alto contraste"><svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor"/></svg></button>' +
      (extra ? '<button data-a="speak" aria-label="Ouvir" title="Ouvir">🔊</button><button data-a="libras" aria-label="Libras" title="Libras">🤟</button>' : "") +
      '<button data-a="perfil" aria-label="Perfil de acessibilidade" title="Perfil de acessibilidade">👤</button></div></div></header>';
  };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register(root + "sw.js").catch(function () {}); });
  }

  var segs = decodeURIComponent(location.pathname.slice(root.length)).split("/").filter(Boolean);
  if (!segs.length || segs[0] === "index.html") { home(); return; }
  var uf = segs[0].toUpperCase();
  if (!U[uf]) { location.replace(root); return; }
  var slug = (segs[1] || "").toLowerCase();
  if (segs[0] !== uf) { location.replace(root + uf + "/" + (slug ? slug + "/" : "")); return; }
  var loc = null;
  if (slug) loc = (L[uf] && L[uf][slug]) || [slug.split("-").map(function (w) { return w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w; }).join(" "), U[uf][2]];
  page(uf, slug, loc);

  function dist(a, b, c, d) { var x = (d - b) * Math.cos((a + c) * Math.PI / 360), y = c - a; return Math.sqrt(x * x + y * y) * 111; }

  function slugify(t) { return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function home() {
    document.title = "Brasil Seguro · protótipo";
    var M = window.BS_MUNIS || {}, CEPS = window.BS_CEP || [];
    var ufs = Object.keys(U).sort(function (a, b) { return U[a][0].localeCompare(U[b][0]); }).map(function (k) { return '<option value="' + k + '">' + esc(U[k][0]) + "</option>"; }).join("");
    app.innerHTML = header(false) +
      '<main class="home">' +
      "<h2>Saiba o que fazer agora, onde você está.</h2>" +
      "<p>Alertas oficiais de chuva, calor, seca e queimadas explicados em passos simples, com locais seguros perto de você.</p>" +
      '<button class="btn btn-pri" id="geo">📍 Usar minha localização</button>' +
      '<div class="msg" id="msg">Sua localização é usada só neste aparelho e não é enviada.</div>' +
      '<div class="or">ou escolha o seu local</div>' +
      '<div class="field"><label for="uf">1. Estado</label><select id="uf"><option value="">Selecione o estado</option>' + ufs + "</select></div>" +
      '<div class="field"><label for="mu">2. Município</label><select id="mu" disabled><option value="">Selecione o município</option></select></div>' +
      '<div class="field"><label for="ba">3. Bairro</label><select id="ba" disabled><option value="">Selecione o bairro</option></select></div>' +
      '<button class="btn btn-pri" id="go" disabled>Ver orientações</button>' +
      '<div class="or">ou digite o seu CEP</div>' +
      '<div class="cep"><input id="cep" inputmode="numeric" autocomplete="postal-code" maxlength="9" placeholder="00000-000" aria-label="CEP"><button class="btn btn-pri" id="gocep">Buscar</button></div>' +
      '<div class="msg" id="cepmsg"></div>' +
      '<div class="sub">Protótipo acadêmico desenvolvido na UNIRIO para o desafio "Inovação na prática: El Niño no Brasil". Telas estáticas com dados simulados, inspiradas nos boletins do Painel El Niño 2026–2027 (Inmet, INPE, ANA, Cemaden, SGB, Sedec).</div>' +
      "</main>" + sheet();
    var $ = function (id) { return document.getElementById(id); };
    var target = "";
    var setTarget = function (t) { target = t; $("go").disabled = !t; };
    var munis = function (uf) { return M[uf] || [[U[uf][3].split(",").pop().trim(), null]]; };
    $("uf").onchange = function () {
      var uf = this.value, mu = $("mu"), ba = $("ba");
      ba.innerHTML = '<option value="">Selecione o bairro</option>'; ba.disabled = true;
      if (!uf) { mu.innerHTML = '<option value="">Selecione o município</option>'; mu.disabled = true; setTarget(""); return; }
      mu.innerHTML = '<option value="">Selecione o município</option>' + munis(uf).map(function (m, i) { return '<option value="' + i + '">' + esc(m[0]) + "</option>"; }).join("");
      mu.disabled = false; setTarget(uf + "/");
    };
    $("mu").onchange = function () {
      var uf = $("uf").value, ba = $("ba"), m = munis(uf)[this.value];
      ba.innerHTML = '<option value="">Selecione o bairro</option>'; ba.disabled = true;
      if (!m) { setTarget(uf + "/"); return; }
      if (Array.isArray(m[1])) {
        ba.innerHTML = '<option value="">Selecione o bairro</option>' + m[1].map(function (s) { return '<option value="' + s + '">' + esc(L[uf][s][0]) + "</option>"; }).join("");
        ba.disabled = false; setTarget(uf + "/");
      } else if (m[1]) { setTarget(uf + "/" + m[1] + "/"); ba.innerHTML = '<option value="">Município inteiro</option>'; }
      else { setTarget(uf + "/"); ba.innerHTML = '<option value="">Município inteiro</option>'; }
    };
    $("ba").onchange = function () { var uf = $("uf").value; setTarget(this.value ? uf + "/" + this.value + "/" : uf + "/"); };
    $("go").onclick = function () { if (target) location.href = root + target; };
    $("cep").oninput = function () { var v = this.value.replace(/\D/g, "").slice(0, 8); this.value = v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; };
    var byPrefix = function (n) { var p = parseInt(n.slice(0, 5), 10); for (var i = 0; i < CEPS.length; i++) if (p >= CEPS[i][0] && p <= CEPS[i][1]) return CEPS[i][2]; return null; };
    var goCep = function () {
      var n = $("cep").value.replace(/\D/g, ""), msg = $("cepmsg");
      if (n.length !== 8) { msg.textContent = "Digite os 8 números do CEP."; return; }
      msg.textContent = "Buscando CEP…";
      var fallback = function () { var uf = byPrefix(n); if (uf) location.href = root + uf + "/"; else msg.textContent = "CEP não encontrado."; };
      fetch("https://viacep.com.br/ws/" + n + "/json/").then(function (r) { return r.json(); }).then(function (d) {
        if (!d || d.erro || !U[d.uf]) { fallback(); return; }
        var b = slugify(d.bairro || ""), c = slugify(d.localidade || ""), known = L[d.uf] || {};
        if (b && known[b]) location.href = root + d.uf + "/" + b + "/";
        else if (c && known[c]) location.href = root + d.uf + "/" + c + "/";
        else if (b) location.href = root + d.uf + "/" + b + "/";
        else location.href = root + d.uf + "/";
      }).catch(fallback);
    };
    $("gocep").onclick = goCep;
    $("cep").onkeydown = function (e) { if (e.key === "Enter") goCep(); };
    document.getElementById("geo").onclick = function () {
      var msg = document.getElementById("msg");
      if (!navigator.geolocation) { msg.textContent = "Este aparelho não informa a localização. Escolha o local abaixo."; return; }
      msg.textContent = "Buscando sua localização…";
      navigator.geolocation.getCurrentPosition(function (pos) {
        var la = pos.coords.latitude, lo = pos.coords.longitude, best = null, bd = 1e9;
        P.forEach(function (p) { var d = dist(la, lo, p[1], p[2]); if (d < bd) { bd = d; best = p[0]; } });
        var dest = best + "/", sb = null, sd = 25;
        if (BG[best]) Object.keys(BG[best]).forEach(function (s) { var d = dist(la, lo, BG[best][s][0], BG[best][s][1]); if (d < sd) { sd = d; sb = s; } });
        if (sb) dest = best + "/" + sb + "/";
        location.href = root + dest;
      }, function () { msg.textContent = "Não foi possível obter a localização. Escolha o local abaixo."; }, { timeout: 10000, maximumAge: 600000 });
    };
    wire(null);
  }

  function sheet() {
    return '<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-labelledby="sh-t"><div class="sheet-in">' +
      '<h3 id="sh-t">Bem-vindo ao Brasil Seguro</h3>' +
      '<div class="govbr"><button class="btn btn-pri" data-p="govbr">Entrar com a conta gov.br</button><p>Opcional. Ajuda a Defesa Civil a saber quem e quais locais precisam de prioridade. Você pode usar o app sem entrar. Nesta simulação, nada é coletado.</p></div>' +
      '<p style="margin-top:14px"><b>Como podemos facilitar para você?</b> Você pode mudar depois no ícone 👤.</p>' +
      '<div class="opts">' +
      '<button data-p="idoso"><i>👵</i>Sou pessoa idosa: letra grande e linguagem simples</button>' +
      '<button data-p="visao"><i>👁️</i>Tenho baixa visão: letra grande e alto contraste</button>' +
      '<button data-p="surdo"><i>🤟</i>Sou surdo ou tenho deficiência auditiva: Libras</button>' +
      '<button data-p="audio"><i>🔊</i>Prefiro ouvir: leitura em voz alta</button>' +
      '<button data-p="padrao"><i>🙂</i>Não preciso de ajustes</button>' +
      "</div></div></div>";
  }

  function page(uf, slug, loc) {
    var d = U[uf], rk = loc ? loc[1] : d[2], r = R[rk];
    var lugar = loc ? loc[0] + (uf === "RJ" && slug !== "petropolis" ? ", Rio de Janeiro" : "") : d[3];
    document.documentElement.style.setProperty("--risk", r.cor);
    document.title = "Brasil Seguro · " + (loc ? loc[0] + " · " : "") + uf;
    var code = uf + "-" + (slug ? slug.slice(0, 3).toUpperCase() : "EST") + "-0412";

    var steps = r.passos.map(function (p, i) { return '<li><span class="n">' + (i + 1) + "</span><div><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></div></li>"; }).join("");
    var ico = function (t) {
      if (/Abrigo|apoio/.test(t)) return "🏠"; if (/resfriamento/.test(t)) return "❄️"; if (/alagamento/.test(t)) return "⚠️"; if (/água/.test(t)) return "💧";
      if (/saúde/.test(t)) return "🏥"; if (/Carro-pipa/.test(t)) return "🚚"; if (/Doações/.test(t)) return "📦"; if (/resgate/.test(t)) return "🚤";
      if (/Embarque/.test(t)) return "🛶"; if (/Brigada/.test(t)) return "🚒"; if (/Atendimento/.test(t)) return "🏛️"; return "📍";
    };
    var places = r.locais.map(function (l) {
      var occ = l[3] ? '<span class="tag ' + (l[3] > 85 ? "t-bad" : l[3] > 60 ? "t-warn" : "t-ok") + '">' + l[3] + "% ocupado</span>" : '<span class="tag t-ok">aberto</span>';
      return '<div class="row"><span class="ic">' + ico(l[0]) + "</span><div><b>" + esc(l[1]) + "</b><small>" + esc(l[0]) + " · " + esc(l[4]) + '</small></div><div class="r">' + esc(l[2]) + "<br>" + occ + "</div></div>";
    }).join("");
    var list = function (a) { return a.map(function (x, i) { return '<div class="li"><i>' + (i + 1) + "</i><span>" + esc(x) + "</span></div>"; }).join(""); };

    var ordem = ORD[d[1]].slice();
    ordem.splice(ordem.indexOf(rk), 1); ordem.unshift(rk);
    var docs = ordem.map(function (k, i) {
      var x = R[k], t = i === 0 ? '<span class="tag t-bad">agora</span>' : i < 3 ? '<span class="tag t-warn">comum na região</span>' : "";
      return '<details class="card"' + (i === 0 ? " open" : "") + '><summary class="row" style="border:0;padding:4px 0;cursor:pointer"><span class="ic">' + x.icone + "</span><div><b>" + esc(x.nome) + '</b></div><div class="r">' + t + "</div></summary>" +
        '<div class="h">Antes</div>' + list(x.antes) + '<div class="h">Durante</div>' + list(x.durante) + '<div class="h">Depois</div>' + list(x.depois) +
        '<div class="h">Seus direitos</div>' + list(x.direitos) + "</details>";
    }).join("");

    var html = header(true) +
      '<main class="wrap">' +
      '<div class="where"><div>Você está em<b>' + esc(lugar) + " · " + uf + '</b></div><a href="' + root + '">Trocar local</a></div>' +

      '<section class="view on" data-v="inicio">' +
      '<div class="status"><div class="lbl"><span>' + esc(r.alerta.hora) + "</span></div>" +
      "<h2>" + r.icone + " " + esc(r.alerta.titulo) + '</h2><span class="lvl">' + esc(r.nivel) + "</span><p>" + esc(r.alerta.texto) + "</p></div>" +
      '<p class="calm">Mantenha a calma. Você tem tempo. Siga os passos abaixo.</p>' +
      '<div class="libras" hidden><span class="vid">🤟</span><div><b>Vídeo em Libras</b><small>Intérprete explicando este alerta (simulação)</small></div></div>' +
      '<div class="h">O que fazer agora</div><ol class="steps">' + steps + "</ol>" +
      '<div class="acts"><button class="btn btn-ok" data-go="rede">✓ Estou bem</button><button class="btn btn-help" data-go="rede">Preciso de ajuda</button></div>' +
      '<button class="btn btn-sec" data-go="locais">Ver local seguro mais perto</button>' +
      "</section>" +

      '<section class="view" data-v="alertas">' +
      '<div class="h">Alertas para o seu local</div><div class="card">' +
      '<div class="row"><span class="ic">' + r.icone + "</span><div><b>" + esc(r.alerta.titulo) + "</b><small>Defesa Civil · " + esc(r.alerta.hora) + '</small></div><div class="r"><span class="tag t-ok">oficial</span></div></div>' +
      '<div class="row"><span class="ic">📘</span><div><b>Guia de preparação atualizado</b><small>Defesa Civil · ontem</small></div><div class="r"><span class="tag t-ok">oficial</span></div></div></div>' +
      '<div class="h">Isso é real?</div>' +
      '<div class="card fake"><div class="q">Circulando no WhatsApp:</div><b>' + esc(r.rumor[0]) + '</b><span class="tag t-bad">✕ Não é oficial</span><p>' + esc(r.rumor[1]) + "</p></div>" +
      "</section>" +

      '<section class="view" data-v="locais"><div class="h">Locais seguros perto de você</div><div class="card">' + places + "</div>" +
      '<p class="note" style="margin:0 0 12px">Locais cadastrados e atualizados pela Defesa Civil do seu município e do seu estado.' + (uf === "RJ" && rk === "calor" ? ' Pontos de resfriamento previstos no Decreto Rio nº 54.740/2024 (art. 5º, IV, c), para o nível 4 de calor.' : "") + "</p>" +
      '<button class="btn btn-sec">📷 Informar um problema no local</button></section>' +

      '<section class="view" data-v="guia"><div class="h">Guias para a sua região</div><p class="note" style="margin:0 0 12px">Ordenados pelos eventos mais comuns onde você está.</p>' + docs + "</section>" +

      '<section class="view" data-v="rede"><div class="h">Ligar agora</div>' +
      '<div class="calls">' + [["193", "Bombeiros", "Incêndio, resgate, afogamento"], ["199", "Defesa Civil", "Enchente, deslizamento, risco"], ["192", "SAMU", "Emergência de saúde"], ["190", "Polícia Militar", "Segurança"]].map(function (c) {
        return '<a class="call" href="tel:' + c[0] + '"><span class="num">' + c[0] + '</span><span><b>' + c[1] + "</b><small>" + c[2] + '</small></span><span class="ph">📞</span></a>';
      }).join("") + "</div>" +
      '<div class="h">Sua rede de confiança</div>' +
      '<div class="card"><div class="row" style="border:0"><span class="ic">👵</span><div><b>' + esc(r.rede[0]) + "</b><small>" + esc(r.rede[1]) + '</small></div><div class="r"><span class="tag t-warn">' + esc(r.rede[2]) + '</span></div></div><div class="note">' + esc(r.rede[3]) + "</div></div>" +
      '<div class="card"><div class="row"><span class="ic">👩</span><div><b>Mãe</b></div><div class="r"><span class="tag t-ok">Estou bem · 13:58</span></div></div>' +
      '<div class="row"><span class="ic">🧑</span><div><b>Irmão</b></div><div class="r"><span class="tag t-ok">Estou bem · 14:01</span></div></div>' +
      '<div class="row"><span class="ic">🙋</span><div><b>Carlos</b><small>vizinho voluntário</small></div><div class="r"><span class="tag t-ok">disponível</span></div></div></div>' +
      '<div class="card"><b>Você avisou: Estou bem ✓</b><div class="note">Sua família e 3 vizinhos foram avisados. Sem internet, o aviso sai por SMS.</div></div>' +
      '</section><p class="disc">Protótipo acadêmico (UNIRIO) · dados simulados</p></main>' +

      '<nav class="tabs" aria-label="Menu"><div class="tabs-in"><button class="on" data-t="inicio"><i>🏠</i>Agora</button><button data-t="alertas"><i>🔔</i>Alertas</button><button data-t="locais"><i>📍</i>Locais</button><button data-t="guia"><i>📘</i>Guias</button><button data-t="rede"><i>🆘</i>Ajuda</button></div></nav>' +
      sheet();

    app.innerHTML = html;
    var show = function (v) {
      app.querySelectorAll(".view").forEach(function (s) { s.classList.toggle("on", s.dataset.v === v); });
      app.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("on", b.dataset.t === v); });
      window.scrollTo(0, 0);
    };
    app.querySelectorAll("[data-t]").forEach(function (b) { b.onclick = function () { show(b.dataset.t); }; });
    app.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { show(b.dataset.go); }; });
    wire(r);
  }

  function wire(r) {
    var big = 0;
    var setFont = function (n) { big = n; document.documentElement.style.setProperty("--fs", [1, 1.15, 1.3][n]); var b = app.querySelector('[data-a="font"]'); if (b) b.classList.toggle("on", n > 0); };
    var setHc = function (on) { document.body.classList.toggle("hc", on); var b = app.querySelector('[data-a="contrast"]'); if (b) b.classList.toggle("on", on); };
    var setLibras = function (on) { var lb = app.querySelector(".libras"); if (lb) lb.hidden = !on; var b = app.querySelector('[data-a="libras"]'); if (b) b.classList.toggle("on", on); };
    var speak = function () {
      if (!r || !("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      var t = r.alerta.titulo + ". " + r.alerta.texto + " Mantenha a calma. " + r.passos.map(function (p, i) { return "Passo " + (i + 1) + ": " + p[0] + ". " + p[1]; }).join(" ");
      var u = new SpeechSynthesisUtterance(t); u.lang = "pt-BR"; u.rate = 0.95; speechSynthesis.speak(u);
    };
    var apply = function (p) {
      setFont(p === "idoso" || p === "visao" ? 2 : 0);
      setHc(p === "visao");
      setLibras(p === "surdo");
      var sp = app.querySelector('[data-a="speak"]'); if (sp) sp.classList.toggle("on", p === "audio");
    };
    var sh = document.getElementById("sheet");
    app.querySelectorAll("[data-a]").forEach(function (b) {
      b.onclick = function () {
        var a = b.dataset.a;
        if (a === "font") setFont((big + 1) % 3);
        if (a === "contrast") setHc(!document.body.classList.contains("hc"));
        if (a === "speak") speak();
        if (a === "libras") { var lb = app.querySelector(".libras"); setLibras(lb && lb.hidden); }
        if (a === "perfil" && sh) sh.hidden = false;
      };
    });
    if (sh) sh.querySelectorAll("[data-p]").forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.p === "govbr") { b.textContent = "✓ Conta gov.br conectada (simulação)"; b.disabled = true; store.set("bs-govbr", "1"); return; }
        store.set("bs-perfil", b.dataset.p); apply(b.dataset.p); sh.hidden = true; if (b.dataset.p === "audio") speak();
      };
    });
    var p = store.get("bs-perfil");
    if (p) apply(p); else if (sh) sh.hidden = false;
  }
})();
