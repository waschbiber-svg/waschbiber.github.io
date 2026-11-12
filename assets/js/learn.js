(() => {
  'use strict';

  const D = window.FABI_DATA || { topics: [], questions: [] };
  const app = document.getElementById('app');

  const AREAS = [
    { id: 'GA1', name: 'GA1', full: 'Konzeption und Administration von IT-Systemen' },
    { id: 'GA2', name: 'GA2', full: 'Analyse und Entwicklung von Netzwerken' },
    { id: 'WISO', name: 'WiSo', full: 'Wirtschafts- und Sozialkunde' }
  ];
  const TYPES = { single: 'Single Choice', multi: 'Multiple Choice', number: 'Rechenaufgabe', match: 'Zuordnung', sql: 'SQL' };
  const LEVELS = { 1: 'einfach', 2: 'mittel', 3: 'schwer' };
  const DAY = 86400000;
  const INTERVALS = [0, 1, 3, 7, 14, 30];

  // ---------- Daten aufbereiten ----------
  const topics = D.topics;
  const topicById = Object.fromEntries(topics.map(t => [t.id, t]));
  const questions = D.questions.filter(q => topicById[q.topic]);
  const qById = Object.fromEntries(questions.map(q => [q.id, q]));
  const qByTopic = {};
  questions.forEach(q => (qByTopic[q.topic] = qByTopic[q.topic] || []).push(q));
  const cards = [];
  topics.forEach(t => {
    (t.terms || []).forEach((x, i) => cards.push({ id: `${t.id}#t${i}`, topic: t.id, front: x[0], back: x[1], kind: 'Begriff' }));
    (t.cards || []).forEach((x, i) => cards.push({ id: `${t.id}#c${i}`, topic: t.id, front: x[0], back: x[1], kind: 'Frage' }));
  });
  const cardById = Object.fromEntries(cards.map(c => [c.id, c]));
  const cardsByTopic = {};
  cards.forEach(c => (cardsByTopic[c.topic] = cardsByTopic[c.topic] || []).push(c));
  const topicsOfArea = a => topics.filter(t => t.area === a);

  // ---------- Speicher ----------
  const KEY = 'fabi.learn.v1';
  const defaults = () => ({
    cards: {}, q: {}, read: {},
    settings: { instant: true, minutesPerQ: 1.5, quizCfg: null, cardCfg: null }
  });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); S.settings = Object.assign(defaults().settings, S.settings); }
  catch { S = defaults(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* Speicher voll/gesperrt */ } };

  // ---------- Helfer ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = s => { const d = document.createElement('div'); d.innerHTML = String(s ?? ''); return d.textContent || ''; };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtNum = n => Number(n).toLocaleString('de-DE', { maximumFractionDigits: 6 });
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  const areaName = id => (AREAS.find(a => a.id === id) || {}).name || id;
  const $ = (sel, root = app) => root.querySelector(sel);
  const $$ = (sel, root = app) => [...root.querySelectorAll(sel)];
  const go = h => { if (location.hash === h) render(); else location.hash = h; };

  function cardScore(id) { const s = S.cards[id]; if (!s) return 0; return s.last === 'easy' ? 1 : s.last === 'mid' ? .5 : 0; }
  function isDue(id) { const s = S.cards[id]; return !s || s.due <= Date.now(); }
  function topicProgress(tid) {
    const cs = cardsByTopic[tid] || [], qs = qByTopic[tid] || [];
    const c = cs.length ? cs.reduce((n, x) => n + cardScore(x.id), 0) / cs.length : 0;
    const q = qs.length ? qs.filter(x => S.q[x.id] && S.q[x.id].last).length / qs.length : 0;
    const r = S.read[tid] ? 1 : 0;
    return Math.round((c * 0.4 + q * 0.5 + r * 0.1) * 100);
  }
  function igrade(p) {
    if (p >= 92) return 'Note 1 · sehr gut';
    if (p >= 81) return 'Note 2 · gut';
    if (p >= 67) return 'Note 3 · befriedigend';
    if (p >= 50) return 'Note 4 · ausreichend';
    if (p >= 30) return 'Note 5 · mangelhaft';
    return 'Note 6 · ungenügend';
  }

  // ---------- SQL (sql.js, lazy) ----------
  let SQL = null, sqlLoading = null;
  function ensureSql() {
    if (SQL) return Promise.resolve(SQL);
    if (!sqlLoading) {
      sqlLoading = new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = '../vendor/sql-wasm.js';
        s.onload = () => window.initSqlJs({ locateFile: f => '../vendor/' + f }).then(m => { SQL = m; res(m); }, rej);
        s.onerror = () => rej(new Error('sql.js konnte nicht geladen werden'));
        document.head.appendChild(s);
      });
    }
    return sqlLoading;
  }
  function runSql(query) {
    const db = new SQL.Database();
    try {
      db.exec(D.sqlDb);
      const r = db.exec(query);
      return r.length ? r[r.length - 1] : { columns: [], values: [] };
    } finally { db.close(); }
  }
  const normVal = v => v === null || v === undefined ? '∅' : typeof v === 'number' ? String(Math.round(v * 1e6) / 1e6) : String(v);
  function compareSql(q, userSql) {
    if (!userSql || !userSql.trim()) return { ok: false, msg: 'Keine Abfrage eingegeben.' };
    let exp, got;
    try { exp = runSql(q.solution); } catch (e) { return { ok: false, msg: 'Interner Fehler in der Musterlösung: ' + e.message }; }
    try { got = runSql(userSql); } catch (e) { return { ok: false, msg: 'SQL-Fehler: ' + e.message }; }
    if (!got.columns.length) return { ok: false, msg: 'Die Abfrage liefert keine Ergebnistabelle.' };
    if (got.columns.length !== exp.columns.length) return { ok: false, msg: `Spaltenanzahl stimmt nicht: erwartet ${exp.columns.length}, erhalten ${got.columns.length}.` };
    let a = exp.values.map(r => JSON.stringify(r.map(normVal)));
    let b = got.values.map(r => JSON.stringify(r.map(normVal)));
    if (a.length !== b.length) return { ok: false, msg: `Zeilenanzahl stimmt nicht: erwartet ${a.length}, erhalten ${b.length}.` };
    if (!q.ordered) { a = a.slice().sort(); b = b.slice().sort(); }
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return { ok: false, msg: q.ordered ? 'Inhalt oder Sortierung der Ergebniszeilen weicht ab.' : 'Inhalt der Ergebniszeilen weicht ab.' };
    return { ok: true, msg: 'Ergebnismenge stimmt mit der Musterlösung überein.' };
  }
  function sqlTable(r, max = 200) {
    if (!r || !r.columns.length) return '<p class="dim small">Keine Ergebniszeilen.</p>';
    const rows = r.values.slice(0, max).map(v => '<tr>' + v.map(x => `<td>${x === null ? '<span class="dim">NULL</span>' : esc(x)}</td>`).join('') + '</tr>').join('');
    return `<div class="table-wrap"><table><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
      <div class="dim small">${r.values.length} Zeile(n)</div>`;
  }
  function schemaHtml() {
    const tables = ['abteilung', 'mitarbeiter', 'geraet', 'ticket'];
    if (!SQL) return '<p class="dim small">Schema wird geladen …</p>';
    return tables.map(t => {
      const r = runSql(`SELECT * FROM ${t}`);
      return `<div style="margin-bottom:12px"><b class="small">${t}</b>${sqlTable(r)}</div>`;
    }).join('');
  }

  // ---------- Bewertung ----------
  function parseNumCandidates(s) {
    if (s == null) return [];
    s = String(s).trim().replace(/[^\d,.\-]/g, '');
    if (!s || !/\d/.test(s)) return [];
    const out = [];
    if (s.includes(',') && s.includes('.')) out.push(s.replace(/\./g, '').replace(',', '.'));
    else if (s.includes(',')) out.push(s.replace(/,/g, '.'));
    else {
      out.push(s);
      if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(s)) out.push(s.replace(/\./g, ''));
    }
    return out.map(Number).filter(n => Number.isFinite(n));
  }
  function answered(it, a) {
    const q = it.q;
    if (q.type === 'single') return Number.isInteger(a);
    if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
    if (q.type === 'number') return parseNumCandidates(a).length > 0;
    if (q.type === 'match') return Array.isArray(a) && a.every(x => x >= 0);
    if (q.type === 'sql') return typeof a === 'string' && a.trim().length > 0;
    return false;
  }
  function grade(it, a) {
    const q = it.q;
    switch (q.type) {
      case 'single': return { ok: Number.isInteger(a) && it.perm[a] === q.answer };
      case 'multi': {
        const sel = new Set((a || []).map(i => it.perm[i]));
        return { ok: sel.size === q.answer.length && q.answer.every(i => sel.has(i)) };
      }
      case 'number': {
        const tol = (q.tolerance || 0) + 1e-9;
        return { ok: parseNumCandidates(a).some(v => Math.abs(v - q.answer) <= tol) };
      }
      case 'match': return { ok: Array.isArray(a) && q.pairs.every((_, i) => a[i] === i) };
      case 'sql': return SQL ? compareSql(q, a) : { ok: false, msg: 'SQL-Engine nicht geladen.' };
    }
    return { ok: false };
  }
  function recordQ(id, ok) {
    const s = S.q[id] || { n: 0, ok: 0 };
    s.n++; if (ok) s.ok++; s.last = ok; s.at = Date.now();
    S.q[id] = s;
  }

  // ---------- Zustand Quiz / Karten ----------
  let QZ = null, FC = null, timerId = null;

  function makeItem(q) {
    const it = { q };
    if (q.type === 'single' || q.type === 'multi') it.perm = shuffle(q.options.map((_, i) => i));
    if (q.type === 'match') it.rightOrder = shuffle(q.pairs.map((_, i) => i));
    return it;
  }
  function initialAnswer(q) {
    if (q.type === 'multi') return [];
    if (q.type === 'match') return q.pairs.map(() => -1);
    if (q.type === 'single') return null;
    return '';
  }

  async function startQuiz(qs, opts) {
    if (!qs.length) { alert('Keine passenden Fragen gefunden.'); return; }
    if (qs.some(q => q.type === 'sql')) {
      app.innerHTML = '<p class="muted">SQL-Engine wird geladen …</p>';
      try { await ensureSql(); } catch (e) { alert(e.message + '. SQL-Fragen werden übersprungen.'); qs = qs.filter(q => q.type !== 'sql'); }
    }
    clearInterval(timerId);
    const items = qs.map(makeItem);
    QZ = {
      title: opts.title || 'Quiz', mode: opts.mode || 'practice',
      instant: opts.mode === 'exam' ? false : (opts.instant ?? S.settings.instant),
      items, idx: 0, answers: items.map(it => initialAnswer(it.q)),
      checked: items.map(() => false), res: items.map(() => null), recorded: items.map(() => false),
      finished: false, endAt: opts.mode === 'exam' ? Date.now() + Math.round(qs.length * (opts.minutesPerQ || S.settings.minutesPerQ) * 60000) : null
    };
    if (QZ.mode === 'exam') timerId = setInterval(tick, 1000);
    go('#/quiz/lauf');
  }
  function tick() {
    if (!QZ || QZ.finished || !QZ.endAt) { clearInterval(timerId); return; }
    const left = QZ.endAt - Date.now();
    const el = document.getElementById('timer');
    if (el) {
      const m = Math.max(0, Math.floor(left / 60000)), s = Math.max(0, Math.floor(left / 1000) % 60);
      el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      el.classList.toggle('low', left < 60000);
    }
    if (left <= 0) { finishQuiz(); }
  }
  function finishQuiz() {
    if (!QZ) return;
    clearInterval(timerId);
    QZ.items.forEach((it, i) => {
      if (!QZ.res[i]) QZ.res[i] = grade(it, QZ.answers[i]);
      if (!QZ.recorded[i]) { recordQ(it.q.id, QZ.res[i].ok); QZ.recorded[i] = true; }
    });
    QZ.finished = true;
    save();
    go('#/quiz/ergebnis');
  }

  function startCards(list, title) {
    if (!list.length) { alert('Keine passenden Karteikarten gefunden.'); return; }
    FC = { title, queue: shuffle(list.map(c => c.id)), pos: 0, flipped: false, total: list.length, tally: { hard: 0, mid: 0, easy: 0 } };
    go('#/karten/lauf');
  }
  function rateCard(r) {
    if (!FC) return;
    const id = FC.queue[FC.pos];
    const s = S.cards[id] || { box: 0, n: 0 };
    s.n++; s.last = r; s.at = Date.now();
    if (r === 'hard') { s.box = 0; s.due = Date.now(); FC.queue.splice(Math.min(FC.pos + 4, FC.queue.length), 0, id); }
    else if (r === 'mid') { s.box = Math.max(1, Math.min(s.box, 2)); s.due = Date.now() + DAY; }
    else { s.box = Math.min((s.box || 0) + 1, 5); s.due = Date.now() + INTERVALS[s.box] * DAY; }
    S.cards[id] = s; save();
    FC.tally[r]++;
    FC.pos++; FC.flipped = false;
    renderCardSession();
  }

  // ---------- Komponenten ----------
  function topicPicker(selected, name = 'tp') {
    return `<div class="topic-picker" data-picker="${name}">` + AREAS.map(a => {
      const ts = topicsOfArea(a.id);
      if (!ts.length) return '';
      return `<div class="grp">${a.name} <button type="button" class="chip" data-grp="${a.id}">alle / keine</button></div>` +
        ts.map(t => `<label class="check small"><input type="checkbox" value="${t.id}" data-area="${a.id}" ${selected.has(t.id) ? 'checked' : ''}> ${esc(t.title)}</label>`).join('');
    }).join('') + '</div>';
  }
  function bindPicker(onChange) {
    $$('.topic-picker [data-grp]').forEach(b => b.addEventListener('click', () => {
      const boxes = $$(`.topic-picker input[data-area="${b.dataset.grp}"]`);
      const all = boxes.every(x => x.checked);
      boxes.forEach(x => (x.checked = !all));
      onChange && onChange();
    }));
    $$('.topic-picker input').forEach(x => x.addEventListener('change', () => onChange && onChange()));
  }
  const pickedTopics = () => new Set($$('.topic-picker input:checked').map(x => x.value));
  function seg(name, options, value) {
    return `<div class="seg" data-seg="${name}">` + options.map(([v, l]) => `<button type="button" data-v="${v}" class="${String(v) === String(value) ? 'on' : ''}">${l}</button>`).join('') + '</div>';
  }
  function bindSeg(onChange) {
    $$('[data-seg]').forEach(s => s.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', s).forEach(x => x.classList.toggle('on', x === b));
      onChange && onChange(s.dataset.seg, b.dataset.v);
    }));
  }
  const segVal = name => { const b = $(`[data-seg="${name}"] button.on`); return b ? b.dataset.v : null; };
  function chips(name, options, selected) {
    return `<div class="chips" data-chips="${name}">` + options.map(([v, l]) => `<button type="button" class="chip ${selected.includes(String(v)) ? 'on' : ''}" data-v="${v}">${l}</button>`).join('') + '</div>';
  }
  function bindChips(onChange) {
    $$('[data-chips]').forEach(c => c.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      b.classList.toggle('on'); onChange && onChange();
    }));
  }
  const chipVals = name => $$(`[data-chips="${name}"] .chip.on`).map(b => b.dataset.v);
  const switchHtml = (id, checked, label) => `<label class="switch"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''}><span class="track"></span><span>${label}</span></label>`;

  function setNav(key) { document.querySelectorAll('#learnNav a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === key)); }

  // ---------- Seiten ----------
  function renderHome() {
    setNav('home');
    const readN = topics.filter(t => S.read[t.id]).length;
    const sure = cards.filter(c => cardScore(c.id) === 1).length;
    const qOk = questions.filter(q => S.q[q.id] && S.q[q.id].last).length;
    const due = cards.filter(c => S.cards[c.id] && isDue(c.id)).length;
    const fresh = cards.filter(c => !S.cards[c.id]).length;
    app.innerHTML = `
      <div class="page-head row between">
        <div><div class="label">Akte 01 · AP2</div><h1>Lernbereich</h1>
        <p class="muted">${topics.length} Themen · ${cards.length} Karteikarten · ${questions.length} Quizfragen</p></div>
        <div class="row">
          <a class="btn primary" href="#/quiz">Quiz starten</a>
          <a class="btn" href="#/karten">Karteikarten</a>
        </div>
      </div>
      <div class="stat-tiles">
        <div class="card"><div class="num">${readN}<span class="dim small"> / ${topics.length}</span></div><div class="lbl">Themen gelesen</div></div>
        <div class="card"><div class="num">${sure}<span class="dim small"> / ${cards.length}</span></div><div class="lbl">Karten „kann ich“</div></div>
        <div class="card"><div class="num">${qOk}<span class="dim small"> / ${questions.length}</span></div><div class="lbl">Fragen zuletzt richtig</div></div>
        <div class="card"><div class="num">${due}<span class="dim small"> + ${fresh} neu</span></div><div class="lbl">Karten fällig</div></div>
      </div>
      ${AREAS.map(a => {
        const ts = topicsOfArea(a.id); if (!ts.length) return '';
        return `<section class="area-block">
          <div class="row"><span class="label">${a.name}</span><span class="muted small">${a.full}</span></div>
          <div class="grid cols-3">${ts.map(t => {
            const p = topicProgress(t.id);
            return `<a class="card tight topic-card" href="#/thema/${t.id}/lernen">
              <h3>${esc(t.title)}</h3>
              <div class="meta">${t.extra ? '<span class="badge accent">Zusatz</span>' : ''}<span>${(qByTopic[t.id] || []).length} Fragen</span>·<span>${(cardsByTopic[t.id] || []).length} Karten</span>${S.read[t.id] ? '·<span>gelesen</span>' : ''}</div>
              <div class="progress" title="Fortschritt ${p} %"><span style="width:${p}%"></span></div>
            </a>`;
          }).join('')}</div></section>`;
      }).join('')}
      <hr>
      <div class="row between"><span class="dim small">Der Fortschritt wird lokal in diesem Browser gespeichert (localStorage).</span>
      <button class="btn small danger" id="resetAll">Fortschritt zurücksetzen</button></div>`;
    $('#resetAll').onclick = () => {
      if (confirm('Wirklich den gesamten Lernfortschritt (Karten, Quizstatistik, gelesene Themen) löschen?')) {
        const st = S.settings; S = defaults(); S.settings = st; save(); render();
      }
    };
  }

  function renderTopic(id, tab) {
    const t = topicById[id];
    if (!t) { app.innerHTML = '<p>Thema nicht gefunden. <a href="#/">Zur Übersicht</a></p>'; return; }
    setNav('');
    tab = tab || 'lernen';
    const area = topicsOfArea(t.area), i = area.indexOf(t);
    const prev = area[i - 1], next = area[i + 1];
    const qs = qByTopic[id] || [], cs = cardsByTopic[id] || [];
    let body = '';
    if (tab === 'lernen') {
      body = `<div class="overview"><div class="label">Kurzüberblick</div><ul>${t.overview.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <article class="prose">${t.content}</article>
        <div class="row" style="margin-top:22px">
          <button class="btn ${S.read[id] ? 'ok' : ''}" id="markRead">${S.read[id] ? '✓ Als gelesen markiert' : 'Als gelesen markieren'}</button>
          <a class="btn" href="#/thema/${id}/karten">Weiter zu den Karteikarten →</a>
        </div>`;
    } else if (tab === 'begriffe') {
      body = `<dl class="glossary prose">${t.terms.map(x => `<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join('')}</dl>`;
    } else if (tab === 'karten') {
      const counts = { new: 0, hard: 0, mid: 0, easy: 0 };
      cs.forEach(c => { const s = S.cards[c.id]; counts[s ? s.last : 'new']++; });
      body = `<div class="row" style="margin-bottom:18px">
          <button class="btn primary" id="cardsAll">Alle ${cs.length} Karten lernen</button>
          <button class="btn" id="cardsDue">Nur fällige &amp; neue</button>
          <button class="btn" id="cardsHard" ${counts.hard ? '' : 'disabled'}>Nur schwere (${counts.hard})</button>
        </div>
        <p class="muted small">Neu: ${counts.new} · Schwer: ${counts.hard} · Mittel: ${counts.mid} · Kann ich: ${counts.easy}</p>
        <div class="grid cols-2">${cs.map(c => {
          const s = S.cards[c.id]; const st = s ? { hard: 'schwer', mid: 'mittel', easy: 'kann ich' }[s.last] : 'neu';
          const cls = s ? { hard: 'l3', mid: 'l2', easy: 'l1' }[s.last] : '';
          return `<div class="card tight"><div class="row between"><span class="dim small">${c.kind}</span><span class="badge ${cls}">${st}</span></div><b>${c.front}</b><div class="muted small" style="margin-top:4px">${c.back}</div></div>`;
        }).join('')}</div>`;
    } else if (tab === 'quiz') {
      const ok = qs.filter(q => S.q[q.id] && S.q[q.id].last).length;
      const byL = [1, 2, 3].map(l => qs.filter(q => q.level === l).length);
      body = `<div class="card stack">
          <p>${qs.length} Fragen zu diesem Thema (${byL[0]} einfach · ${byL[1]} mittel · ${byL[2]} schwer). Zuletzt richtig: <b>${ok}</b> / ${qs.length}.</p>
          <div>${switchHtml('instantT', S.settings.instant, 'Erklärung sofort nach jeder Antwort anzeigen')}</div>
          <div class="row">
            <button class="btn primary" id="qPractice">Freie Übung starten</button>
            <button class="btn" id="qWrong" ${qs.some(q => !(S.q[q.id] && S.q[q.id].last)) ? '' : 'disabled'}>Nur noch nicht gekonnte</button>
            <button class="btn" id="qExam">Prüfungsmodus (Timer)</button>
          </div>
        </div>
        <h3 style="margin-top:26px">Fragenübersicht</h3>
        <div class="stack">${qs.map(q => { const s = S.q[q.id]; return `<div class="row small"><span class="badge l${q.level}">${LEVELS[q.level]}</span><span class="badge">${TYPES[q.type]}</span><span class="muted" style="flex:1;min-width:200px">${esc(strip(q.q).slice(0, 110))}${strip(q.q).length > 110 ? ' …' : ''}</span>${s ? `<span class="badge ${s.last ? 'l1' : 'l3'}">${s.last ? 'richtig' : 'falsch'}</span>` : '<span class="badge">neu</span>'}</div>`; }).join('')}</div>`;
    }
    app.innerHTML = `
      <a class="back-link" href="#/">← Übersicht</a>
      <div class="page-head">
        <div class="label">${areaName(t.area)}${t.extra ? ' · Zusatzthema' : ''}</div>
        <h1>${esc(t.title)}</h1>
      </div>
      <nav class="tabs">
        ${[['lernen', 'Lernen'], ['begriffe', `Begriffe (${t.terms.length})`], ['karten', `Karteikarten (${cs.length})`], ['quiz', `Quiz (${qs.length})`]]
          .map(([k, l]) => `<a href="#/thema/${id}/${k}" class="${k === tab ? 'on' : ''}">${l}</a>`).join('')}
      </nav>
      ${body}
      <hr>
      <div class="row between">
        ${prev ? `<a class="btn ghost" href="#/thema/${prev.id}/${tab}">← ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/thema/${next.id}/${tab}">${esc(next.title)} →</a>` : ''}
      </div>`;
    const on = (sel, fn) => { const el = $(sel); if (el) el.onclick = fn; };
    on('#markRead', () => { S.read[id] = !S.read[id]; save(); renderTopic(id, tab); });
    on('#cardsAll', () => startCards(cs, t.title));
    on('#cardsDue', () => startCards(cs.filter(c => isDue(c.id)), t.title + ' · fällig'));
    on('#cardsHard', () => startCards(cs.filter(c => S.cards[c.id] && S.cards[c.id].last === 'hard'), t.title + ' · schwer'));
    const inst = $('#instantT'); if (inst) inst.onchange = () => { S.settings.instant = inst.checked; save(); };
    on('#qPractice', () => startQuiz(shuffle(qs), { title: t.title, mode: 'practice' }));
    on('#qWrong', () => startQuiz(shuffle(qs.filter(q => !(S.q[q.id] && S.q[q.id].last))), { title: t.title + ' · nicht gekonnt', mode: 'practice' }));
    on('#qExam', () => startQuiz(shuffle(qs), { title: t.title + ' · Prüfung', mode: 'exam' }));
  }

  function renderGlossary() {
    setNav('glossar');
    const all = [];
    topics.forEach(t => t.terms.forEach(x => all.push({ term: x[0], def: x[1], t })));
    all.sort((a, b) => strip(a.term).localeCompare(strip(b.term), 'de'));
    app.innerHTML = `
      <div class="page-head"><div class="label">Nachschlagen</div><h1>Glossar</h1><p class="muted">${all.length} Begriffe aus allen Themen.</p></div>
      <div class="row" style="margin-bottom:18px">
        <input type="search" id="gq" placeholder="Begriff oder Definition suchen …" style="flex:1;min-width:220px">
        ${chips('garea', AREAS.map(a => [a.id, a.name]), AREAS.map(a => a.id))}
      </div>
      <dl class="glossary prose" id="glist" style="max-width:none"></dl>`;
    const draw = () => {
      const q = $('#gq').value.trim().toLowerCase();
      const areas = chipVals('garea');
      const list = all.filter(x => areas.includes(x.t.area) && (!q || strip(x.term + ' ' + x.def).toLowerCase().includes(q)));
      $('#glist').innerHTML = list.map(x => `<dt>${x.term}<a class="src" href="#/thema/${x.t.id}/lernen">${areaName(x.t.area)} · ${esc(x.t.title)}</a></dt><dd>${x.def}</dd>`).join('') || '<p class="muted">Keine Treffer.</p>';
    };
    $('#gq').addEventListener('input', draw);
    bindChips(draw);
    draw();
  }

  function renderCardSetup() {
    setNav('karten');
    const cfg = S.settings.cardCfg || { topics: topics.map(t => t.id), mode: 'due', limit: '30' };
    const sel = new Set(cfg.topics);
    app.innerHTML = `
      <div class="page-head"><div class="label">Wiederholen</div><h1>Karteikarten</h1>
      <p class="muted">Bewerte jede Karte mit <b>schwer</b>, <b>mittel</b> oder <b>kann ich</b>. Schwere Karten kommen in derselben Runde wieder, und gut gekonnte Karten werden in immer größeren Abständen fällig.</p></div>
      <div class="card">
        <div class="form-grid">
          <div class="lbl">Themen</div><div>${topicPicker(sel)}</div>
          <div class="lbl">Auswahl</div><div>${seg('mode', [['due', 'Fällige &amp; neue'], ['all', 'Alle'], ['hard', 'Nur schwere'], ['new', 'Nur neue']], cfg.mode)}</div>
          <div class="lbl">Maximal</div><div>${seg('limit', [['20', '20'], ['30', '30'], ['50', '50'], ['all', 'alle']], cfg.limit)}</div>
          <div></div><div class="row"><button class="btn primary" id="go">Lernen starten</button><span class="muted small" id="cnt"></span></div>
        </div>
      </div>`;
    const pick = () => {
      const ts = pickedTopics(), mode = segVal('mode');
      return cards.filter(c => ts.has(c.topic) && (
        mode === 'all' ? true : mode === 'due' ? isDue(c.id) : mode === 'hard' ? (S.cards[c.id] && S.cards[c.id].last === 'hard') : !S.cards[c.id]));
    };
    const upd = () => { $('#cnt').textContent = `${pick().length} Karten verfügbar`; };
    bindPicker(upd); bindSeg(upd); upd();
    $('#go').onclick = () => {
      const lim = segVal('limit');
      S.settings.cardCfg = { topics: [...pickedTopics()], mode: segVal('mode'), limit: lim }; save();
      let list = shuffle(pick());
      if (lim !== 'all') list = list.slice(0, +lim);
      startCards(list, 'Karteikarten');
    };
  }

  function renderCardSession() {
    setNav('karten');
    if (!FC) return go('#/karten');
    if (FC.pos >= FC.queue.length) {
      const t = FC.tally;
      app.innerHTML = `<div class="flash-wrap"><div class="card result-hero">
        <div class="label">Runde beendet</div><div class="big">${FC.total}</div><p class="muted">Karten durchgearbeitet</p>
        <p><span class="badge l1">kann ich ${t.easy}</span> <span class="badge l2">mittel ${t.mid}</span> <span class="badge l3">schwer ${t.hard}</span></p>
        <div class="row" style="justify-content:center;margin-top:16px"><a class="btn primary" href="#/karten">Neue Runde</a><a class="btn" href="#/schwachstellen">Schwachstellen</a><a class="btn ghost" href="#/">Übersicht</a></div>
      </div></div>`;
      return;
    }
    const c = cardById[FC.queue[FC.pos]], t = topicById[c.topic];
    const doneCount = Math.min(FC.pos, FC.queue.length);
    app.innerHTML = `<div class="flash-wrap">
      <div class="row between"><div><div class="label">${esc(FC.title)}</div><span class="muted small">Karte ${FC.pos + 1} von ${FC.queue.length}</span></div>
      <a class="btn small ghost" href="#/karten">Beenden</a></div>
      <div class="progress" style="margin-top:10px"><span style="width:${pct(doneCount, FC.queue.length)}%"></span></div>
      <div class="flashcard ${FC.flipped ? 'flipped' : ''}" id="fc">
        <div class="inner">
          <div class="face front"><span class="corner">${c.kind} · ${areaName(t.area)} · ${esc(t.title)}</span><div class="k">${c.front}</div><div class="dim small" style="margin-top:18px">Klicken oder Leertaste zum Umdrehen</div></div>
          <div class="face back"><span class="corner">Antwort</span><div class="v">${c.back}</div></div>
        </div>
      </div>
      <div class="rate-row ${FC.flipped ? '' : 'hidden'}" id="rate">
        <button class="btn bad" data-r="hard">Schwer <span class="dim small">[1]</span></button>
        <button class="btn mid" data-r="mid">Mittel <span class="dim small">[2]</span></button>
        <button class="btn ok" data-r="easy">Kann ich <span class="dim small">[3]</span></button>
      </div>
      <div class="center ${FC.flipped ? 'hidden' : ''}" id="flipHint"><button class="btn primary" id="flipBtn">Antwort zeigen</button></div>
    </div>`;
    const flip = () => { FC.flipped = !FC.flipped; $('#fc').classList.toggle('flipped', FC.flipped); $('#rate').classList.toggle('hidden', !FC.flipped); $('#flipHint').classList.toggle('hidden', FC.flipped); };
    $('#fc').onclick = flip; $('#flipBtn').onclick = flip;
    $$('#rate [data-r]').forEach(b => b.onclick = () => rateCard(b.dataset.r));
  }

  function renderQuizSetup() {
    setNav('quiz');
    const cfg = S.settings.quizCfg || { topics: topics.map(t => t.id), levels: ['1', '2', '3'], types: Object.keys(TYPES), pool: 'all', count: '20', mode: 'practice' };
    const sel = new Set(cfg.topics);
    app.innerHTML = `
      <div class="page-head"><div class="label">Abfragen</div><h1>Quiz</h1>
      <p class="muted">In der freien Übung lernst du ohne Zeitdruck. Der Prüfungsmodus hat einen Timer, zeigt die Auswertung erst am Ende und vergibt Punkte nach Schwierigkeit (1/2/3).</p></div>
      <div class="card">
        <div class="form-grid">
          <div class="lbl">Modus</div><div>${seg('mode', [['practice', 'Freie Übung'], ['exam', 'Prüfungsmodus']], cfg.mode)}</div>
          <div class="lbl">Erklärungen</div><div id="instWrap">${switchHtml('instant', S.settings.instant, 'Sofort nach jeder Antwort (aus = erst am Ende)')}</div>
          <div class="lbl">Zeit pro Frage</div><div class="row"><input type="number" id="mpq" min="0.5" max="10" step="0.5" value="${S.settings.minutesPerQ}" style="width:90px"> <span class="muted small">Minuten (nur Prüfungsmodus)</span></div>
          <div class="lbl">Themen</div><div>${topicPicker(sel)}</div>
          <div class="lbl">Schwierigkeit</div><div>${chips('levels', [['1', 'einfach'], ['2', 'mittel'], ['3', 'schwer']], cfg.levels)}</div>
          <div class="lbl">Fragetypen</div><div>${chips('types', Object.entries(TYPES), cfg.types)}</div>
          <div class="lbl">Fragenpool</div><div>${seg('pool', [['all', 'Alle'], ['notok', 'Noch nicht richtig'], ['wrong', 'Zuletzt falsch'], ['new', 'Noch nie beantwortet']], cfg.pool)}</div>
          <div class="lbl">Anzahl</div><div>${seg('count', [['10', '10'], ['20', '20'], ['30', '30'], ['50', '50'], ['all', 'alle']], cfg.count)}</div>
          <div></div><div class="row"><button class="btn primary" id="go">Quiz starten</button><span class="muted small" id="cnt"></span></div>
        </div>
      </div>`;
    const pick = () => {
      const ts = pickedTopics(), lv = chipVals('levels'), ty = chipVals('types'), pool = segVal('pool');
      return questions.filter(q => ts.has(q.topic) && lv.includes(String(q.level)) && ty.includes(q.type) && (
        pool === 'all' ? true : pool === 'notok' ? !(S.q[q.id] && S.q[q.id].last) : pool === 'wrong' ? (S.q[q.id] && S.q[q.id].last === false) : !S.q[q.id]));
    };
    const upd = () => {
      const n = pick().length, c = segVal('count'), take = c === 'all' ? n : Math.min(n, +c);
      const exam = segVal('mode') === 'exam';
      $('#instWrap').style.opacity = exam ? .4 : 1;
      $('#cnt').textContent = `${n} passende Fragen` + (exam ? ` · Zeit: ${Math.round(take * (+$('#mpq').value || 1.5))} min` : '');
    };
    bindPicker(upd); bindSeg(upd); bindChips(upd); upd();
    $('#mpq').oninput = upd;
    $('#instant').onchange = e => { S.settings.instant = e.target.checked; save(); };
    $('#go').onclick = () => {
      const c = segVal('count');
      S.settings.minutesPerQ = Math.max(0.5, +$('#mpq').value || 1.5);
      S.settings.quizCfg = { topics: [...pickedTopics()], levels: chipVals('levels'), types: chipVals('types'), pool: segVal('pool'), count: c, mode: segVal('mode') };
      save();
      let qs = shuffle(pick());
      if (c !== 'all') qs = qs.slice(0, +c);
      const exam = segVal('mode') === 'exam';
      startQuiz(qs, { title: exam ? 'Prüfungsmodus' : 'Freie Übung', mode: exam ? 'exam' : 'practice' });
    };
  }

  // ----- Frage-Rendering -----
  function qBody(it, i, a, locked, show) {
    const q = it.q;
    let h = `<div class="q-text">${q.q}</div>`;
    if (q.type === 'single' || q.type === 'multi') {
      const multi = q.type === 'multi';
      h += `<div class="opts ${locked ? 'locked' : ''}">` + it.perm.map((orig, d) => {
        const selected = multi ? (a || []).includes(d) : a === d;
        const right = multi ? q.answer.includes(orig) : q.answer === orig;
        let cls = selected ? 'sel' : '';
        if (show) cls = right && selected ? 'correct' : selected ? 'wrong' : right ? 'missed' : '';
        return `<label class="opt ${cls}"><input type="${multi ? 'checkbox' : 'radio'}" name="q${i}" data-d="${d}" ${selected ? 'checked' : ''} ${locked ? 'disabled' : ''}><span>${q.options[orig]}</span></label>`;
      }).join('') + '</div>';
      if (multi && !show) h += '<p class="dim small" style="margin-top:8px">Mehrfachauswahl: Alle richtigen Antworten müssen markiert sein.</p>';
    } else if (q.type === 'number') {
      h += `<div class="num-input"><input type="text" inputmode="decimal" data-num="${i}" value="${esc(a || '')}" placeholder="Ergebnis" ${locked ? 'disabled' : ''} autocomplete="off"><span class="muted">${esc(q.unit || '')}</span></div>
        <p class="dim small" style="margin-top:6px">Dezimaltrennzeichen: Komma oder Punkt.</p>`;
      if (show) h += `<p style="margin-top:8px">Richtige Lösung: <b>${fmtNum(q.answer)} ${esc(q.unit || '')}</b></p>`;
    } else if (q.type === 'match') {
      h += '<div>' + q.pairs.map((p, li) => {
        const v = a ? a[li] : -1;
        const cls = show ? (v === li ? 'correct' : 'wrong') : '';
        return `<div class="match-row ${cls}"><div>${p[0]}</div><select data-match="${li}" ${locked ? 'disabled' : ''}>
          <option value="-1">— zuordnen —</option>
          ${it.rightOrder.map(r => `<option value="${r}" ${v === r ? 'selected' : ''}>${esc(strip(q.pairs[r][1]))}</option>`).join('')}
        </select>${show && v !== li ? `<div class="fix">Richtig: ${q.pairs[li][1]}</div>` : ''}</div>`;
      }).join('') + '</div>';
    } else if (q.type === 'sql') {
      h += `<textarea rows="6" data-sql="${i}" spellcheck="false" placeholder="SELECT …" ${locked ? 'disabled' : ''}>${esc(a || '')}</textarea>
        <div class="row" style="margin-top:8px">
          ${locked ? '' : '<button type="button" class="btn small" data-run="1">▶ Ausführen <span class="dim small">(Strg+Enter)</span></button>'}
          <details class="schema-box" style="flex:1"><summary class="btn small ghost" style="display:inline-flex">Tabellen &amp; Daten anzeigen</summary><div style="margin-top:10px">${schemaHtml()}</div></details>
        </div>
        <div class="sql-result" data-sqlout></div>`;
      if (show) {
        let r = null; try { r = runSql(q.solution); } catch { /* */ }
        h += `<div style="margin-top:12px"><div class="label">Musterlösung</div><pre><code>${esc(q.solution)}</code></pre>${r ? `<details><summary class="small muted" style="cursor:pointer">Erwartetes Ergebnis</summary>${sqlTable(r)}</details>` : ''}</div>`;
      }
    }
    if (show) {
      const res = QZ.res[i] || grade(it, a);
      h += `<div class="feedback ${res.ok ? 'ok' : 'bad'}"><div class="title">${res.ok ? '✓ Richtig' : '✗ Leider falsch'}</div>${res.msg ? `<p class="small">${esc(res.msg)}</p>` : ''}<div>${q.explain}</div></div>`;
    }
    return h;
  }

  function bindQuestionInputs(it, i, onChange) {
    const q = it.q;
    if (q.type === 'single') $$(`input[name="q${i}"]`).forEach(x => x.onchange = () => {
      QZ.answers[i] = +x.dataset.d; $$('.opt').forEach(o => o.classList.toggle('sel', o.querySelector('input').checked)); onChange();
    });
    if (q.type === 'multi') $$(`input[name="q${i}"]`).forEach(x => x.onchange = () => {
      QZ.answers[i] = $$(`input[name="q${i}"]:checked`).map(y => +y.dataset.d); x.closest('.opt').classList.toggle('sel', x.checked); onChange();
    });
    if (q.type === 'number') { const n = $(`[data-num="${i}"]`); n.oninput = () => { QZ.answers[i] = n.value; onChange(); }; n.focus(); }
    if (q.type === 'match') $$('[data-match]').forEach(s => s.onchange = () => { QZ.answers[i][+s.dataset.match] = +s.value; onChange(); });
    if (q.type === 'sql') {
      const ta = $(`[data-sql="${i}"]`);
      if (ta) {
        const run = () => {
          const out = $('[data-sqlout]');
          try { out.innerHTML = sqlTable(runSql(ta.value)); } catch (e) { out.innerHTML = `<div class="notice bad small">SQL-Fehler: ${esc(e.message)}</div>`; }
        };
        ta.oninput = () => { QZ.answers[i] = ta.value; onChange(); };
        ta.onkeydown = e => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
          if (e.key === 'Tab') { e.preventDefault(); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + '  ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = p + 2; QZ.answers[i] = ta.value; }
        };
        const rb = $('[data-run]'); if (rb) rb.onclick = run;
        ta.focus();
      }
    }
  }

  function renderQuizRun() {
    setNav('quiz');
    if (!QZ) return go('#/quiz');
    if (QZ.finished) return go('#/quiz/ergebnis');
    const i = QZ.idx, it = QZ.items[i], q = it.q, n = QZ.items.length;
    const exam = QZ.mode === 'exam';
    const show = !exam && QZ.instant && QZ.checked[i];
    const t = topicById[q.topic];
    const isLast = i === n - 1;
    let nav;
    if (exam) {
      nav = `<button class="btn" id="prev" ${i === 0 ? 'disabled' : ''}>← Zurück</button>
        <button class="btn danger" id="submit">Abgeben</button>
        <button class="btn primary" id="next" ${isLast ? 'disabled' : ''}>Weiter →</button>`;
    } else if (QZ.instant) {
      nav = `<a class="btn ghost" href="#/quiz" id="abort">Abbrechen</a>` + (show
        ? `<button class="btn primary" id="next">${isLast ? 'Ergebnis anzeigen' : 'Weiter →'} <span class="dim small">[Enter]</span></button>`
        : `<button class="btn primary" id="check" ${answered(it, QZ.answers[i]) ? '' : 'disabled'}>Prüfen <span class="dim small">[Enter]</span></button>`);
    } else {
      nav = `<button class="btn" id="prev" ${i === 0 ? 'disabled' : ''}>← Zurück</button>
        <a class="btn ghost" href="#/quiz" id="abort">Abbrechen</a>
        <button class="btn primary" id="next">${isLast ? 'Auswerten' : 'Weiter →'}</button>`;
    }
    app.innerHTML = `<div class="quiz-wrap">
      <div class="row between" style="margin-bottom:8px">
        <div><div class="label">${esc(QZ.title)}</div><span class="muted small">Frage ${i + 1} von ${n}</span></div>
        ${exam ? '<span class="timer" id="timer">--:--</span>' : ''}
      </div>
      <div class="progress" style="margin-bottom:18px"><span style="width:${pct(i + (show ? 1 : 0), n)}%"></span></div>
      ${exam || !QZ.instant ? `<div class="q-grid" style="margin-bottom:18px">${QZ.items.map((x, k) => `<button data-jump="${k}" class="${k === i ? 'cur' : ''} ${answered(x, QZ.answers[k]) ? 'answered' : ''}">${k + 1}</button>`).join('')}</div>` : ''}
      <div class="card">
        <div class="q-head"><span class="badge l${q.level}">${LEVELS[q.level]}</span><span class="badge">${TYPES[q.type]}</span>
          <span class="dim small">${areaName(t.area)} · ${esc(t.title)}</span>${exam ? `<span class="spacer"></span><span class="dim small">${q.level} P.</span>` : ''}</div>
        <div id="qbody">${qBody(it, i, QZ.answers[i], show, show)}</div>
      </div>
      <div class="q-nav">${nav}</div>
    </div>`;
    if (exam) tick();
    const refreshState = () => {
      const c = $('#check'); if (c) c.disabled = !answered(it, QZ.answers[i]);
      const gb = $(`[data-jump="${i}"]`); if (gb) gb.classList.toggle('answered', answered(it, QZ.answers[i]));
    };
    if (!show) bindQuestionInputs(it, i, refreshState);
    const on = (sel, fn) => { const el = $(sel); if (el) el.onclick = fn; };
    on('#prev', () => { QZ.idx--; renderQuizRun(); });
    on('#next', () => { if (isLast) { if (!exam) finishQuiz(); } else { QZ.idx++; renderQuizRun(); } });
    on('#check', () => {
      if (!answered(it, QZ.answers[i])) return;
      QZ.res[i] = grade(it, QZ.answers[i]); QZ.checked[i] = true;
      recordQ(q.id, QZ.res[i].ok); QZ.recorded[i] = true; save();
      renderQuizRun();
    });
    on('#submit', () => {
      const open = QZ.items.filter((x, k) => !answered(x, QZ.answers[k])).length;
      if (confirm(open ? `${open} Frage(n) sind noch unbeantwortet. Trotzdem abgeben?` : 'Prüfung abgeben und auswerten?')) finishQuiz();
    });
    on('#abort', e => { e.preventDefault(); if (confirm('Quiz abbrechen? Bereits geprüfte Antworten bleiben in der Statistik.')) { clearInterval(timerId); QZ = null; go('#/quiz'); } });
    $$('[data-jump]').forEach(b => b.onclick = () => { QZ.idx = +b.dataset.jump; renderQuizRun(); });
  }

  function renderQuizResult() {
    setNav('quiz');
    if (!QZ || !QZ.finished) return go('#/quiz');
    const exam = QZ.mode === 'exam';
    const tot = QZ.items.reduce((s, it) => s + it.q.level, 0);
    const got = QZ.items.reduce((s, it, i) => s + (QZ.res[i].ok ? it.q.level : 0), 0);
    const okN = QZ.res.filter(r => r.ok).length, n = QZ.items.length;
    const p = pct(exam ? got : okN, exam ? tot : n);
    const wrong = QZ.items.filter((_, i) => !QZ.res[i].ok).map(it => it.q);
    app.innerHTML = `<div class="quiz-wrap">
      <div class="card result-hero">
        <div class="label">${esc(QZ.title)} · Auswertung</div>
        <div class="big">${p} %</div>
        <p class="muted">${okN} von ${n} Fragen richtig${exam ? ` · ${got} von ${tot} Punkten` : ''}</p>
        <p><span class="badge accent">${igrade(p)}</span> <span class="dim small">(IHK-Notenschlüssel, nur zur Orientierung)</span></p>
        <div class="row" style="justify-content:center;margin-top:14px">
          <button class="btn primary" id="retryWrong" ${wrong.length ? '' : 'disabled'}>Falsche wiederholen (${wrong.length})</button>
          <a class="btn" href="#/quiz">Neues Quiz</a><a class="btn ghost" href="#/">Übersicht</a>
        </div>
      </div>
      <div class="q-grid" style="margin:18px 0">${QZ.items.map((_, k) => `<button data-goto="${k}" class="${QZ.res[k].ok ? 'r-ok' : 'r-bad'}">${k + 1}</button>`).join('')}</div>
      ${QZ.items.map((it, k) => {
        const t = topicById[it.q.topic];
        return `<details class="card review-item" id="rv${k}" ${QZ.res[k].ok ? '' : 'open'}>
          <summary><span class="badge ${QZ.res[k].ok ? 'l1' : 'l3'}">${QZ.res[k].ok ? '✓' : '✗'} ${k + 1}</span><span class="badge l${it.q.level}">${LEVELS[it.q.level]}</span>
          <span class="small muted" style="flex:1">${esc(strip(it.q.q).slice(0, 100))}${strip(it.q.q).length > 100 ? ' …' : ''}</span><span class="dim small">${esc(t.title)}</span></summary>
          <div style="margin-top:14px">${qBody(it, k, QZ.answers[k], true, true)}</div>
        </details>`;
      }).join('')}
    </div>`;
    $('#retryWrong').onclick = () => startQuiz(shuffle(wrong), { title: 'Wiederholung', mode: 'practice' });
    $$('[data-goto]').forEach(b => b.onclick = () => { const d = document.getElementById('rv' + b.dataset.goto); d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  function renderWeak() {
    setNav('schwachstellen');
    const hardCards = cards.filter(c => S.cards[c.id] && S.cards[c.id].last === 'hard');
    const midCards = cards.filter(c => S.cards[c.id] && S.cards[c.id].last === 'mid');
    const wrongQ = questions.filter(q => S.q[q.id] && S.q[q.id].last === false);
    const tstats = topics.map(t => {
      const qs = (qByTopic[t.id] || []).filter(q => S.q[q.id]);
      const ok = qs.reduce((s, q) => s + S.q[q.id].ok, 0), n = qs.reduce((s, q) => s + S.q[q.id].n, 0);
      return { t, n, rate: n ? ok / n : null };
    }).filter(x => x.n).sort((a, b) => a.rate - b.rate).slice(0, 8);
    app.innerHTML = `
      <div class="page-head"><div class="label">Ehrlich bleiben</div><h1>Schwachstellen</h1>
      <p class="muted">Alles, was zuletzt als „schwer“ bewertet oder falsch beantwortet wurde.</p></div>
      <div class="grid cols-2">
        <div class="card">
          <div class="row between"><h3>Schwere Karteikarten (${hardCards.length})</h3><button class="btn small primary" id="lh" ${hardCards.length ? '' : 'disabled'}>Lernen</button></div>
          ${hardCards.length ? `<ul class="weak-list small">${hardCards.slice(0, 40).map(c => `<li><b>${c.front}</b> <a class="dim" href="#/thema/${c.topic}/karten">· ${esc(topicById[c.topic].title)}</a></li>`).join('')}</ul>` : '<p class="muted small">Keine. Stark!</p>'}
          ${midCards.length ? `<div class="row between" style="margin-top:12px"><span class="muted small">Dazu ${midCards.length} Karten mit „mittel“</span><button class="btn small" id="lm">Schwer + mittel lernen</button></div>` : ''}
        </div>
        <div class="card">
          <div class="row between"><h3>Zuletzt falsche Fragen (${wrongQ.length})</h3><button class="btn small primary" id="qw" ${wrongQ.length ? '' : 'disabled'}>Üben</button></div>
          ${wrongQ.length ? `<ul class="weak-list small">${wrongQ.slice(0, 40).map(q => `<li><span class="badge l${q.level}">${LEVELS[q.level]}</span> ${esc(strip(q.q).slice(0, 90))}${strip(q.q).length > 90 ? ' …' : ''} <a class="dim" href="#/thema/${q.topic}/lernen">· ${esc(topicById[q.topic].title)}</a></li>`).join('')}</ul>` : '<p class="muted small">Keine falschen Antworten gespeichert.</p>'}
        </div>
      </div>
      <h3 style="margin-top:28px">Themen mit der niedrigsten Trefferquote</h3>
      ${tstats.length ? `<div class="stack">${tstats.map(x => `<div class="row"><a href="#/thema/${x.t.id}/lernen" style="min-width:260px">${esc(x.t.title)}</a><div class="progress" style="flex:1;min-width:120px"><span style="width:${Math.round(x.rate * 100)}%"></span></div><span class="small muted" style="width:120px;text-align:right">${Math.round(x.rate * 100)} % · ${x.n} Versuche</span></div>`).join('')}</div>` : '<p class="muted small">Noch keine Quizdaten vorhanden.</p>'}`;
    const on = (sel, fn) => { const el = $(sel); if (el) el.onclick = fn; };
    on('#lh', () => startCards(hardCards, 'Schwere Karten'));
    on('#lm', () => startCards(hardCards.concat(midCards), 'Schwer + mittel'));
    on('#qw', () => startQuiz(shuffle(wrongQ), { title: 'Schwachstellen', mode: 'practice' }));
  }

  // ---------- Tastatur ----------
  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    const h = location.hash;
    if (h.startsWith('#/karten/lauf') && FC && FC.pos < FC.queue.length) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); $('#fc').click(); }
      if (FC.flipped && ['1', '2', '3'].includes(e.key)) rateCard({ 1: 'hard', 2: 'mid', 3: 'easy' }[e.key]);
    }
    if (h.startsWith('#/quiz/lauf') && QZ && QZ.mode === 'practice' && QZ.instant && e.key === 'Enter' && tag !== 'textarea' && tag !== 'button' && tag !== 'select') {
      const b = $('#check') || $('#next'); if (b && !b.disabled) { e.preventDefault(); b.click(); }
    }
  });

  // ---------- Router ----------
  function render() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const [a, b, c] = parts;
    window.scrollTo(0, 0);
    if (!a) return renderHome();
    if (a === 'thema') return renderTopic(b, c);
    if (a === 'glossar') return renderGlossary();
    if (a === 'karten') return b === 'lauf' ? renderCardSession() : renderCardSetup();
    if (a === 'quiz') return b === 'lauf' ? renderQuizRun() : b === 'ergebnis' ? renderQuizResult() : renderQuizSetup();
    if (a === 'schwachstellen') return renderWeak();
    renderHome();
  }
  window.addEventListener('hashchange', render);
  if (!topics.length) { app.innerHTML = '<div class="notice bad">Keine Lerninhalte gefunden (data/*.js).</div>'; return; }
  render();
})();
