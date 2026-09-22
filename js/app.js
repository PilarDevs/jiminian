/**
 * Directorio Médico — Kiosco táctil Clínica Cruz Jiminián
 * Navegación SPA (sin recarga): Especialidad → Médico → Perfil.
 * Diseñado para pantalla táctil de kiosco. Datos en data.js.
 */
(function () {
  'use strict';

  var mainEl = document.getElementById('stage');

  var DIAS = [
    { key: 'lunes', nombre: 'Lunes' },
    { key: 'martes', nombre: 'Martes' },
    { key: 'miercoles', nombre: 'Miércoles' },
    { key: 'jueves', nombre: 'Jueves' },
    { key: 'viernes', nombre: 'Viernes' },
    { key: 'sabado', nombre: 'Sábado' }
  ];

  var PLACEHOLDER = 'assets/doctor-placeholder.svg';
  var specKeys = Object.keys(ESPECIALIDADES);

  var GRUPO_MAP = {};
  GRUPOS.forEach(function (g) {
    g.keys.forEach(function (k) { GRUPO_MAP[k] = g.key; });
  });

  var state = {
    view: 'home',
    grupo: null,
    specKey: null,
    homePage: 0,
    docsPage: 0,
    backDocPage: 0,
    standby: true,
    animating: false
  };

  var standbyEl = document.getElementById('standby');
  var clockTimeEl = document.getElementById('clock-time');
  var clockDateEl = document.getElementById('clock-date');
  var standbyTimeEl = document.getElementById('standby-time');
  var standbyDateEl = document.getElementById('standby-date');

  // ====== Reloj (header y standby) ======

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

function tickClock() {
    var now = new Date();
    var h = now.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    var time = h12 + ':' + pad2(now.getMinutes()) + ' ' + ampm;
    var date = now.toLocaleDateString('es-DO', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    clockTimeEl.textContent = time;
    clockDateEl.textContent = date;
    standbyTimeEl.textContent = time;
    standbyDateEl.textContent = date;
  }

  // ====== Utilidades ======

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // "8AM–12PM" -> "8:00 AM – 12:00 PM". No modifica valores especiales.
  function formatearHorario(texto) {
    var m = String(texto).match(/^(\d{1,2})(?::(\d{2}))?\s*([AP]M)\s*–\s*(\d{1,2})(?::(\d{2}))?\s*([AP]M)(.*)$/i);
    if (!m) return texto;
    var hora = function (h, min, ampm) {
      return h + ':' + (min || '00') + ' ' + ampm.toUpperCase();
    };
    return hora(m[1], m[2], m[3]) + ' – ' + hora(m[4], m[5], m[6]) + (m[7] || '');
  }

  function fotoDe(doc) {
    return doc.foto || DOCTOR_FOTOS[doc.nombre] || PLACEHOLDER;
  }

  // Tarjetas de especialidad por página según el tamaño de pantalla:
  // kiosco grande → 3×3 (9); escritorio/tablet → 3×2 o 2×3 (6).
  function specPerPage() {
    return window.innerWidth >= 1500 ? 9 : 6;
  }

  // Médicos por página en la lista de una especialidad: kiosco → 3×3 (9), resto → 6.
  function docPerPage() {
    return window.innerWidth >= 1500 ? 9 : 6;
  }

  // Botón de volver, siempre en la misma posición (solo en pantallas internas).
  function backTop() {
    return (
      '<button type="button" class="back-btn" data-action="back" aria-label="Volver">' +
      '<svg viewBox="0 0 24 24" width="30" height="30">' +
      '<path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="2.2"' +
      ' stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>'
    );
  }

  function pager(marca, total, actual) {
    if (total <= 1) return '';
    return (
      '<nav class="pager" aria-label="Paginación">' +
      '<button type="button" class="pager-btn" data-action="' + marca + '-prev"' +
      (actual === 0 ? ' disabled' : '') + '>‹ Anterior</button>' +
      '<span class="pager-count">' + (actual + 1) + ' / ' + total + '</span>' +
      '<button type="button" class="pager-btn" data-action="' + marca + '-next"' +
      (actual === total - 1 ? ' disabled' : '') + '>Siguiente ›</button>' +
      '</nav>'
    );
  }

  // ====== Transición suave entre pantallas ======

  function switchView(renderFn) {
    if (state.animating) return;
    state.animating = true;
    mainEl.classList.remove('enter');
    mainEl.classList.add('leave');
    setTimeout(function () {
      renderFn();
      mainEl.classList.remove('leave');
      void mainEl.offsetWidth;
      mainEl.classList.add('enter');
      state.animating = false;
    }, 140);
  }

  function goHome() {
    switchView(function () {
      state.view = 'home';
      renderHome();
    });
  }

  function renderHome() {
    var perPage = specPerPage();
    var visibles = state.grupo
      ? specKeys.filter(function (k) { return GRUPO_MAP[k] === state.grupo; })
      : specKeys;
    var total = Math.ceil(visibles.length / perPage);
    if (state.homePage > total - 1) state.homePage = total - 1;
    var start = state.homePage * perPage;
    var slice = visibles.slice(start, start + perPage);

    function chip(key, nombre, count, activo) {
      return (
        '<button type="button" class="grupo-chip' + (activo ? ' active' : '') +
        '" data-action="grupo" data-group="' + key + '">' +
        '<span>' + esc(nombre) + '</span>' +
        '<span class="cnt">' + count + '</span>' +
        '</button>'
      );
    }

    var cards = slice.map(function (key) {
      var esp = ESPECIALIDADES[key];
      var count = esp.doctores.length;
      return (
        '<button type="button" class="spec-card" data-action="open-specialty" data-key="' + key + '">' +
        '<span class="spec-card-name">' + esc(esp.nombre) + '</span>' +
        '<span class="spec-card-count">' + count + (count === 1 ? ' especialista' : ' especialistas') + '</span>' +
        '</button>'
      );
    }).join('');

    var chips = chip('__all', 'Todo', specKeys.length, !state.grupo) +
      GRUPOS.map(function (g) {
        return chip(g.key, g.nombre, g.keys.length, state.grupo === g.key);
      }).join('');

    mainEl.innerHTML =
      '<div class="home-main">' +
      '<h1 class="home-title">Seleccione una especialidad</h1>' +
      '<div class="grupos" aria-label="Filtrar por grupo">' + chips + '</div>' +
      '<div class="spec-grid">' + cards + '</div>' +
      pager('home', total, state.homePage) +
      '</div>';
  }

  function renderSpecialty(key) {
    var esp = ESPECIALIDADES[key];
    if (!esp) return;
    var perPage = docPerPage();
    var total = Math.ceil(esp.doctores.length / perPage);
    if (state.docsPage > total - 1) state.docsPage = total - 1;
    var start = state.docsPage * perPage;
    var slice = esp.doctores.slice(start, start + perPage);

    var cards = slice.map(function (doc, i) {
      return (
        '<button type="button" class="doctor-card" data-action="open-doctor" data-key="' + key + '" data-index="' + (start + i) + '">' +
        '<span class="doctor-photo">' +
        '<img src="' + esc(fotoDe(doc)) + '" alt=""' +
        ' onerror="this.onerror=null;this.src=&#39;assets/doctor-placeholder.svg&#39;">' +
        '</span>' +
        '<span class="doctor-info">' +
        '<span class="doctor-name">' + esc(doc.nombre) + '</span>' +
        '<span class="doctor-spec">' + esc(esp.nombre) + '</span>' +
        '</span>' +
        '</button>'
      );
    }).join('');

    mainEl.innerHTML =
      '<div class="topbar">' +
      backTop() +
      '<div class="topbar-titles">' +
      '<h1 class="sub-title">' + esc(esp.nombre) + '</h1>' +
      '<p class="sub-desc">' + esc(esp.desc) + '</p>' +
      '</div>' +
      '</div>' +
      '<div class="doctor-grid">' + cards + '</div>' +
      pager('docs', total, state.docsPage);
  }

  function renderProfile(key, index) {
    var esp = ESPECIALIDADES[key];
    var doc = esp.doctores[index];
    if (!doc) return;

    var desc = doc.bio ||
      ('Integrante del staff de ' + esp.nombre + ' de la Clínica Cruz Jiminián.');
    var perfil = doc.experiencia || esp.desc;

    var horarios = DIAS
      .filter(function (d) { return doc[d.key]; })
      .map(function (d) {
        return (
          '<div class="horo-row">' +
          '<span class="horo-day">' + d.nombre + '</span>' +
          '<span class="horo-time">' + esc(formatearHorario(doc[d.key])) + '</span>' +
          '</div>'
        );
      }).join('');

    var chips = '';
    if (doc.consultorio) {
      chips += '<div class="chip"><svg class="ico" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"/><circle fill="none" stroke="currentColor" stroke-width="1.8" cx="12" cy="11" r="2.3"/></svg><span>' + esc(doc.consultorio) + '</span></div>';
    }
    if (doc.telefono) {
      chips += '<div class="chip"><svg class="ico" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M5 4h4l1.5 4L8 9.6a12 12 0 0 0 6.4 6.4L17 13.5l4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg><span>' + esc(doc.telefono) + '</span></div>';
    }

    mainEl.innerHTML =
      '<div class="topbar">' + backTop() + '</div>' +
      '<div class="profile">' +
      '<div class="profile-photo">' +
      '<img src="' + esc(fotoDe(doc)) + '" alt=""' +
      ' onerror="this.onerror=null;this.src=&#39;assets/doctor-placeholder.svg&#39;">' +
      '</div>' +
      '<div class="profile-info">' +
      '<span class="spec-pill">' + esc(esp.nombre) + '</span>' +
      '<h1 class="profile-name">' + esc(doc.nombre) + '</h1>' +
      '<p class="profile-bio">' + esc(desc) + '</p>' +
      '<div class="chips">' + chips + '</div>' +
      '<div class="profile-section">' +
      '<h2 class="profile-sec-title">Perfil profesional</h2>' +
      '<p class="profile-sec-text">' + esc(perfil) + '</p>' +
      '</div>' +
      '<div class="profile-section">' +
      '<h2 class="profile-sec-title">Horarios</h2>' +
      '<div class="horo">' + horarios + '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  // ====== Navegación ======

  function openSpecialty(key) {
    switchView(function () {
      state.view = 'specialty';
      state.specKey = key;
      state.docsPage = 0;
      renderSpecialty(key);
    });
  }

  function openDoctor(key, index) {
    switchView(function () {
      state.backDocPage = state.docsPage;
      state.view = 'profile';
      state.specKey = key;
      renderProfile(key, index);
    });
  }

  function goBack() {
    if (state.view === 'profile') {
      switchView(function () {
        state.view = 'specialty';
        state.docsPage = state.backDocPage;
        renderSpecialty(state.specKey);
      });
    } else if (state.view === 'specialty') {
      goHome();
    }
  }

  function changePage(marca, dir) {
    if (marca === 'home') {
      state.homePage += dir;
      switchView(function () { renderHome(); });
    } else if (marca === 'docs' && state.view === 'specialty') {
      state.docsPage += dir;
      switchView(function () { renderSpecialty(state.specKey); });
    }
  }

  // ====== Delegación de eventos (toda la app) ======

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');
    if (action === 'open-specialty') openSpecialty(el.getAttribute('data-key'));
    else if (action === 'open-doctor') openDoctor(el.getAttribute('data-key'), parseInt(el.getAttribute('data-index'), 10) || 0);
    else if (action === 'grupo') {
      var g = el.getAttribute('data-group');
      switchView(function () {
        state.grupo = g === '__all' ? null : g;
        state.homePage = 0;
        renderHome();
      });
    } else if (action === 'back') goBack();
    else if (action === 'home-prev') changePage('home', -1);
    else if (action === 'home-next') changePage('home', 1);
    else if (action === 'docs-prev') changePage('docs', -1);
    else if (action === 'docs-next') changePage('docs', 1);
  });

  // ====== Auto-reset (modo kiosco) ======

  var idleTimer = null;
  var resizeTimer = null;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (state.standby) return;
      if (state.view === 'specialty') {
        renderSpecialty(state.specKey);
      } else if (state.view === 'home') {
        renderHome();
      }
    }, 160);
  });

  var standbyLeaving = false;
  var clockFlyEl = null;
  var motionAlive = false;
  var motionRaf = null;
  var ambientMovers = [];

  function reducedMotion() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Animación eliminada para evitar retrasos en la navegación del kiosco.
  function flyClockToHeader() {
    return false;
  }

  // ====== Movimiento ambiente: piezas flotando lentas, chocando entre sí ======

  function seedAmbientMotion() {
    ambientMovers = [];
    var sels = ['.helix-scene', '.plusw'];
    sels.forEach(function (sel) {
      var el = standbyEl.querySelector(sel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      ambientMovers.push({
        el: el,
        x: r.left,
        y: r.top,
        w: r.width || 40,
        h: r.height || 40,
        baseX: r.left,
        baseY: r.top,
        ang: Math.random() * Math.PI * 2,
        speed: 16 + Math.random() * 16,
        targetAng: Math.random() * Math.PI * 2,
        targetSpeed: 16 + Math.random() * 16,
        timer: Math.random() * 2
      });
    });
  }

  function collidePair(a, b) {
    var ax = a.x + a.w / 2, ay = a.y + a.h / 2;
    var bx = b.x + b.w / 2, by = b.y + b.h / 2;
    var dx = bx - ax, dy = by - ay;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var minDist = (Math.min(a.w, a.h) + Math.min(b.w, b.h)) / 2 * 0.55;
    if (!dist || dist >= minDist) return;
    var nx = dx / dist, ny = dy / dist;
    var overlap = minDist - dist;
    a.x -= nx * overlap * .5;
    a.y -= ny * overlap * .5;
    b.x += nx * overlap * .5;
    b.y += ny * overlap * .5;
    var rel = Math.cos(a.ang) - Math.cos(b.ang);
    if (rel < 0) {
      var imp = -rel * .25;
      a.ang += imp * .5;
      b.ang -= imp * .5;
    }
  }

  var lastT = null;
  var wormLayerEl = null;
  var worms = [];
  var symbols = [];
  var symbolsTimer = null;

  // ====== Gusanos médicos: líneas que recorren la pantalla ======

  var WORM_COLORS = ['#3D9A28', '#1A6B8A', '#C8CDEF', '#7FD0F2', '#92C8F0'];

  // Símbolos médicos dibujados por los gusanos al unirse.
  var SYMBOLS = [
    { name: 'cruz', d: 'M-10.5-10.5h21v21M0-21v21', w: 42, h: 42 },
    {
      name: 'pulso',
      d: 'M-26 0 L-14 0 L-8 -16 L-2 14 L3 -8 L7 0 L26 0',
      w: 52, h: 34
    },
    { name: 'pildora', d: 'M-18 0 a18 9 0 1 0 36 0 a18 9 0 1 0 -36 0 M0 -9v18', w: 36, h: 18 },
    {
      name: 'atomos',
      d: 'M0 -26 L10 26 M-24 -11 L24 11 M-24 11 L24 -11 M0 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
      w: 52, h: 41
    }
  ];

  // Crea la capa SVG y sus gusanos.
  function initWorms() {
    wormLayerEl = standbyEl.querySelector('.worm-layer');
    if (!wormLayerEl) return;
    worms = [];
    var n = 7;
    for (var i = 0; i < n; i++) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      wormLayerEl.appendChild(g);
      var worm = {
        g: g,
        pts: [],
        x: 0,
        y: 0,
        ang: Math.random() * Math.PI * 2,
        speed: 16 + Math.random() * 14,
        targetAng: Math.random() * Math.PI * 2,
        targetSpeed: 16 + Math.random() * 14,
        timer: Math.random() * 2,
        color: WORM_COLORS[i % WORM_COLORS.length],
        joinCooldown: Math.random() * 3
      };
      createWormEls(worm);
      worms.push(worm);
    }
    seedWormPoints();
  }

  function seedWormPoints() {
    for (var i = 0; i < worms.length; i++) {
      var w = worms[i];
      w.x = Math.random() * window.innerWidth;
      w.y = Math.random() * window.innerHeight;
      w.pts = [];
      var n = 26;
      for (var j = 0; j < n; j++) {
        w.pts.push({
          x: w.x - Math.cos(w.ang) * j * 7,
          y: w.y - Math.sin(w.ang) * j * 7
        });
      }
    }
  }

  // Reescribe el gusano (línea con cuerpo y cabeza en el SVG).
  function createWormEls(w) {
    var sNS = 'http://www.w3.org/2000/svg';
    var stroke = document.createElementNS(sNS, 'path');
    var body = document.createElementNS(sNS, 'path');
    var head = document.createElementNS(sNS, 'circle');

    stroke.setAttribute('fill', 'none');
    stroke.setAttribute('stroke', w.color);
    stroke.setAttribute('stroke-width', '12');
    stroke.setAttribute('stroke-linecap', 'round');
    stroke.setAttribute('stroke-linejoin', 'round');

    body.setAttribute('fill', 'none');
    body.setAttribute('stroke', w.color);
    body.setAttribute('stroke-width', '4');
    body.setAttribute('stroke-linecap', 'round');
    body.setAttribute('stroke-linejoin', 'round');
    body.setAttribute('opacity', '0.72');

    head.setAttribute('fill', '#FFFFFF');
    head.setAttribute('r', '4.5');

    w.g.appendChild(stroke);
    w.g.appendChild(body);
    w.g.appendChild(head);
    w.stroke = stroke;
    w.body = body;
    w.head = head;
  }

  function renderWorm(w) {
    if (!w || !w.pts || w.pts.length < 2) return;

    var strokePath = '';
    var bodyPath = '';

    for (var i = 0; i < w.pts.length; i++) {
      var p = w.pts[i];
      var x = Number(p.x).toFixed(2);
      var y = Number(p.y).toFixed(2);
      var cmd = i === 0 ? 'M' : 'L';
      strokePath += cmd + x + ' ' + y + ' ';
      if (i === 0 || i === w.pts.length - 1 || i % 3 === 0) {
        bodyPath += cmd + x + ' ' + y + ' ';
      }
    }

    if (w.stroke) w.stroke.setAttribute('d', strokePath.trim());
    if (w.body) w.body.setAttribute('d', bodyPath.trim() || strokePath.trim());
    if (w.head) {
      var head = w.pts[0];
      w.head.setAttribute('cx', Number(head.x).toFixed(2));
      w.head.setAttribute('cy', Number(head.y).toFixed(2));
    }
  }

  // Avanza un gusano y hace ondular su cola.
  function stepWorm(w, dt, W, H) {
    w.timer -= dt;
    if (w.timer <= 0) {
      w.timer = 1.5 + Math.random() * 2.5;
      w.targetAng += (Math.random() - 0.5) * Math.PI * 1.6;
      w.targetSpeed = 14 + Math.random() * 16;
    }

    var da = w.targetAng - w.ang;
    while (da > Math.PI) da -= Math.PI * 2;
    while (da < -Math.PI) da += Math.PI * 2;
    w.ang += da * Math.min(1, dt * 1.1);
    w.speed += (w.targetSpeed - w.speed) * Math.min(1, dt * 0.7);
    w.speed = Math.max(6, w.speed);

    if (w.joinCooldown > 0) w.joinCooldown -= dt;

    w.x += Math.cos(w.ang) * w.speed * dt;
    w.y += Math.sin(w.ang) * w.speed * dt;

    if (w.x < -15) { w.x = -15; w.ang = Math.PI - w.ang; }
    if (w.y < -15) { w.y = -15; w.ang = -w.ang; }
    if (w.x > W + 15) { w.x = W + 15; w.ang = Math.PI - w.ang; }
    if (w.y > H + 15) { w.y = H + 15; w.ang = -w.ang; }

    // La cabeza va a la nueva posición; los demás la siguen en cadena.
    w.pts[0].x = w.x;
    w.pts[0].y = w.y;
    for (var i = 1; i < w.pts.length; i++) {
      var prev = w.pts[i - 1];
      var cur = w.pts[i];
      var dx = prev.x - cur.x;
      var dy = prev.y - cur.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var want = 4;
      var k = (dist - want) / dist;
      cur.x = prev.x - dx * k;
      cur.y = prev.y - dy * k;
    }
  }

  // Si dos cabezas se cruzan, dibuja un símbolo médico en el punto medio.
  function stepSymbols(dt) {
    for (var i = 0; i < worms.length; i++) {
      for (var j = i + 1; j < worms.length; j++) {
        var a = worms[i].pts[0];
        var b = worms[j].pts[0];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        if (dx * dx + dy * dy > 60 * 60) continue;
        if (worms[i].joinCooldown > 0 || worms[j].joinCooldown > 0) continue;
        spawnSymbol((a.x + b.x) / 2, (a.y + b.y) / 2);
        worms[i].joinCooldown = 6;
        worms[j].joinCooldown = 6;
        break;
      }
    }

    for (i = symbols.length - 1; i >= 0; i--) {
      var s = symbols[i];
      s.t += dt;
      if (s.t > 1.6) {
        if (s.g.parentNode) s.g.parentNode.removeChild(s.g);
        symbols.splice(i, 1);
      }
    }
  }

  function spawnSymbol(x, y) {
    var spec = SYMBOLS[symbols.length % SYMBOLS.length];
    var sNS = 'http://www.w3.org/2000/svg';
    var g = document.createElementNS(sNS, 'g');
    g.setAttribute('class', 'worm-sym');

    // Halo del símbolo al unirse.
    var halo = document.createElementNS(sNS, 'circle');
    halo.setAttribute('cx', 0);
    halo.setAttribute('cy', 0);
    halo.setAttribute('r', '26');
    halo.setAttribute('fill', 'none');
    halo.setAttribute('stroke', '#FFFFFF');
    halo.setAttribute('stroke-width', '1.5');
    halo.setAttribute('opacity', '.35');
    g.appendChild(halo);

    var path = document.createElementNS(sNS, 'path');
    path.setAttribute('d', spec.d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#FFFFFF');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('transform', 'translate(' + (-spec.w / 2) + ' ' + (-spec.h / 2) + ')');
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
    g.appendChild(path);

    wormLayerEl.appendChild(g);
    symbols.push({ g: g, t: 0 });
  }

  function startWorms() {
    // los gusanos se animan dentro de motionStep (30fps)
  }

  function initWormLayer() {
    initWorms();
  }

  function clearSymbols() {
    symbols.slice().forEach(function (s) {
      if (s.g.parentNode) s.g.parentNode.removeChild(s.g);
    });
    symbols = [];
  }

  function motionStep() {
    if (!motionAlive) return;
    var W = window.innerWidth;
    var H = window.innerHeight;
    var now = Date.now();
    var dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 1 / 60;
    lastT = now;
    var i, j;

    for (i = 0; i < ambientMovers.length; i++) {
      var m = ambientMovers[i];

      m.timer -= dt;
      if (m.timer <= 0) {
        m.timer = 1.5 + Math.random() * 2.5;
        m.targetAng += (Math.random() - 0.5) * Math.PI * 1.6;
        m.targetSpeed = 16 + Math.random() * 16;
      }

      var da = m.targetAng - m.ang;
      while (da > Math.PI) da -= Math.PI * 2;
      while (da < -Math.PI) da += Math.PI * 2;
      m.ang += da * Math.min(1, dt * 1.2);
      m.speed += (m.targetSpeed - m.speed) * Math.min(1, dt * 0.8);
      m.speed = Math.max(8, m.speed);

      m.x += Math.cos(m.ang) * m.speed * dt;
      m.y += Math.sin(m.ang) * m.speed * dt;

      if (m.x < -30) { m.x = -30; m.ang = Math.PI - m.ang; }
      if (m.y < -30) { m.y = -30; m.ang = 0 - m.ang; }
      if (m.x + m.w > W + 30) { m.x = W + 30 - m.w; m.ang = Math.PI - m.ang; }
      if (m.y + m.h > H + 30) { m.y = H + 30 - m.h; m.ang = 0 - m.ang; }
    }

    for (i = 0; i < ambientMovers.length; i++) {
      for (j = i + 1; j < ambientMovers.length; j++) {
        collidePair(ambientMovers[i], ambientMovers[j]);
      }
    }

    for (i = 0; i < ambientMovers.length; i++) {
      var a = ambientMovers[i];
      a.el.style.transform = 'translate(' + (a.x - a.baseX).toFixed(2) + 'px, ' + (a.y - a.baseY).toFixed(2) + 'px)';
    }

    // Gusanos: avanzan por toda la página y dibujan símbolos médicos al unirse.
    for (i = 0; i < worms.length; i++) {
      stepWorm(worms[i], dt, W, H);
      renderWorm(worms[i]);
    }
    stepSymbols(dt);

    // El loop se agenda UNA sola vez desde startAmbient; aquí NUNCA se auto-reagenda.
  }

  function startAmbient() {
    if (reducedMotion()) return;
    stopAmbient();
    lastT = null;
    seedAmbientMotion();
    if (!ambientMovers.length) return;
    motionAlive = true;
    motionRaf = setInterval(motionStep, 33);
  }

  function stopAmbient() {
    motionAlive = false;
    if (motionRaf) {
      clearInterval(motionRaf);
      cancelAnimationFrame(motionRaf);
    }
    motionRaf = null;
    lastT = null;
  }

  function resetStateForStandby() {
    state.view = 'home';
    state.specKey = null;
    state.grupo = null;
    state.homePage = 0;
    state.docsPage = 0;
    state.backDocPage = 0;
  }

  function showStandby() {
    if (state.standby && !standbyEl.classList.contains('hidden')) return;
    state.standby = true;
    standbyLeaving = false;
    resetStateForStandby();
    resetClockFly();
    standbyEl.classList.remove('hidden');
    void standbyEl.offsetWidth;
    standbyEl.classList.remove('sb-enter');
    void standbyEl.offsetWidth;
    standbyEl.classList.add('sb-enter');
    startAmbient();
    disarmIdle();
  }

  function enterDirectory() {
    if (!state.standby || standbyLeaving) return;
    standbyLeaving = true;
    stopAmbient();
    standbyEl.classList.add('sb-leave');
    setTimeout(function () {
      standbyEl.classList.add('hidden');
      standbyEl.classList.remove('sb-leave');
      resetClockFly();
      state.standby = false;
      standbyLeaving = false;
      resetStateForStandby();
      disarmIdle();
      goHome();
      armIdle();
    }, 180);
  }

  // Revierte el reloj del standby a su estado normal tras el vuelo.
  function resetClockFly() {
    var src = standbyEl.querySelector('.standby-clock');
    if (!src) return;
    var anims = src.getAnimations ? src.getAnimations() : [];
    anims.forEach(function (a) { a.cancel(); });
    src.style.transform = '';
    src.style.opacity = '';
  }

  function armIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (!state.standby) {
        showStandby();
      }
    }, APP_CONFIG.idleTimeoutMs);
  }

  function disarmIdle() {
    clearTimeout(idleTimer);
    idleTimer = null;
  }

  function onActivity() {
    if (state.standby) {
      enterDirectory();
      return;
    }
    armIdle();
  }

  ['pointerdown', 'touchstart', 'keydown'].forEach(function (evt) {
    document.addEventListener(evt, onActivity, { passive: true });
  });

  // ====== Arranque ======

  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  tickClock();
  setInterval(tickClock, 1000);
  initWormLayer();
  showStandby();
})();