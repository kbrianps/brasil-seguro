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
    return banner + '<header class="hdr"><div class="hdr-in">' + seal + '<h1><a href="' + root + '">Brasil Seguro</a><small>Proteção e Defesa Civil · proposta</small></h1><div class="tools">' +
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

  function home() {
    document.title = "Brasil Seguro · protótipo";
    var opts = Object.keys(U).sort(function (a, b) { return U[a][0].localeCompare(U[b][0]); }).map(function (k) {
      var subs = L[k] ? Object.keys(L[k]).map(function (s) { return '<option value="' + k + "/" + s + '">   ' + esc(L[k][s][0]) + " (" + k + ")</option>"; }).join("") : "";
      return '<option value="' + k + '">' + esc(U[k][0]) + "</option>" + subs;
    }).join("");
    app.innerHTML = header(false) +
      '<main class="home">' +
      "<h2>Saiba o que fazer agora, onde você está.</h2>" +
      "<p>Alertas oficiais de chuva, calor, seca e queimadas explicados em passos simples, com locais seguros perto de você.</p>" +
      '<button class="btn btn-pri" id="geo">📍 Usar minha localização</button>' +
      '<div class="msg" id="msg">Sua localização é usada só neste aparelho e não é enviada.</div>' +
      '<div class="or">ou escolha o seu local</div>' +
      '<select id="sel" aria-label="Escolha o estado ou bairro"><option value="">Selecione o estado ou bairro</option>' + opts + "</select>" +
      '<div class="sub">Protótipo acadêmico desenvolvido na UNIRIO para o desafio "Inovação na prática: El Niño no Brasil". Telas estáticas com dados simulados, inspiradas nos boletins do Painel El Niño 2026–2027 (Inmet, INPE, ANA, Cemaden, SGB, Sedec). Funciona no celular e no computador e pode ser instalado na tela inicial.</div>' +
      "</main>" + sheet();
    document.getElementById("sel").onchange = function () { if (this.value) location.href = root + this.value + "/"; };
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
      '<h3 id="sh-t">Como podemos facilitar para você?</h3><p>Escolha uma opção. Você pode mudar depois no ícone 👤.</p>' +
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
      '<div class="status"><div class="lbl"><span>Status agora · ' + esc(r.alerta.hora) + "</span><span>✓ Alerta oficial assinado</span></div>" +
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
      '<div class="h">Sem internet</div>' +
      '<div class="card sms"><div class="from">SMS · Defesa Civil</div><div class="bubble">' + esc(r.alerta.titulo) + ". Abra o Brasil Seguro, que funciona sem internet, ou responda 1 = Estou bem, 2 = Preciso de ajuda. Cód. " + code + '</div><div class="note">O código abre o guia certo já salvo no aparelho. Só alertas com assinatura digital válida abrem o app.</div></div>' +
      "</section>" +

      '<section class="view" data-v="locais"><div class="h">Locais seguros perto de você</div><div class="card">' + places + "</div>" +
      '<button class="btn btn-sec">📷 Informar um problema no local</button></section>' +

      '<section class="view" data-v="guia"><div class="h">Guias para a sua região</div><p class="note" style="margin:0 0 12px">Ordenados pelos eventos mais comuns onde você está.</p>' + docs + "</section>" +

      '<section class="view" data-v="rede"><div class="h">Sua rede</div>' +
      '<div class="card"><div class="row" style="border:0"><span class="ic">👵</span><div><b>' + esc(r.rede[0]) + "</b><small>" + esc(r.rede[1]) + '</small></div><div class="r"><span class="tag t-warn">' + esc(r.rede[2]) + '</span></div></div><div class="note">' + esc(r.rede[3]) + "</div></div>" +
      '<div class="card"><div class="row"><span class="ic">👩</span><div><b>Mãe</b></div><div class="r"><span class="tag t-ok">Estou bem · 13:58</span></div></div>' +
      '<div class="row"><span class="ic">🧑</span><div><b>Irmão</b></div><div class="r"><span class="tag t-ok">Estou bem · 14:01</span></div></div>' +
      '<div class="row"><span class="ic">🙋</span><div><b>Carlos</b><small>vizinho voluntário</small></div><div class="r"><span class="tag t-ok">disponível</span></div></div></div>' +
      '<div class="card"><b>Você avisou: Estou bem ✓</b><div class="note">Sua família e 3 vizinhos foram avisados. Sem internet, o aviso sai por SMS.</div></div>' +
      "</section></main>" +

      '<nav class="tabs" aria-label="Menu"><div class="tabs-in"><button class="on" data-t="inicio"><i>🏠</i>Agora</button><button data-t="alertas"><i>🔔</i>Alertas</button><button data-t="locais"><i>📍</i>Locais</button><button data-t="guia"><i>📘</i>Guias</button><button data-t="rede"><i>🤝</i>Rede</button></div></nav>' +
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
      b.onclick = function () { store.set("bs-perfil", b.dataset.p); apply(b.dataset.p); sh.hidden = true; if (b.dataset.p === "audio") speak(); };
    });
    var p = store.get("bs-perfil");
    if (p) apply(p); else if (sh) sh.hidden = false;
  }
})();
