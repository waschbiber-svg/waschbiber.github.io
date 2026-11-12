(() => {
  'use strict';
  const app = document.getElementById('app');
  const V = '../vendor/';

  // ---------- Helfer ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root = app) => root.querySelector(sel);
  const $$ = (sel, root = app) => [...root.querySelectorAll(sel)];
  const fmtSize = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1).replace('.', ',') + ' KB' : (b / 1048576).toFixed(2).replace('.', ',') + ' MB';
  const baseName = n => n.replace(/\.[^.]+$/, '');
  const extOf = n => (n.match(/\.([^.]+)$/) || [, ''])[1].toLowerCase();
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const scripts = {};
  function loadScript(src) {
    if (!scripts[src]) scripts[src] = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = () => rej(new Error('Bibliothek konnte nicht geladen werden: ' + src));
      document.head.appendChild(s);
    });
    return scripts[src];
  }
  const libPdf = () => loadScript(V + 'pdf-lib.min.js').then(() => window.PDFLib);
  const libPdfjs = () => loadScript(V + 'pdfjs/pdf.min.js').then(() => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = V + 'pdfjs/pdf.worker.min.js';
    return window.pdfjsLib;
  });
  const libZip = () => loadScript(V + 'jszip.min.js').then(() => window.JSZip);
  const libHeic = () => loadScript(V + 'heic2any.min.js').then(() => window.heic2any);

  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  }
  async function zipDownload(outs, zipName) {
    const JSZip = await libZip();
    const z = new JSZip(), used = new Set();
    outs.forEach(o => {
      let n = o.name, k = 1;
      while (used.has(n)) n = baseName(o.name) + ` (${k++}).` + extOf(o.name);
      used.add(n); z.file(n, o.blob);
    });
    download(await z.generateAsync({ type: 'blob' }), zipName);
  }

  // Ergebnisliste mit Einzel-Downloads + ZIP
  function showResults(box, outs, zipName, note = '') {
    if (!outs.length) { box.innerHTML = ''; return; }
    box.innerHTML = `<div class="notice ok small">${outs.length === 1 ? 'Fertig!' : `${outs.length} Dateien fertig.`} ${note}</div>` +
      outs.map((o, i) => `<div class="file-item"><span class="name">${esc(o.name)}</span><span class="size">${fmtSize(o.blob.size)}</span><button class="btn small" data-dl="${i}">Herunterladen</button></div>`).join('') +
      (outs.length > 1 ? `<div><button class="btn primary" data-zip>Alle als ZIP herunterladen</button></div>` : '');
    $$('[data-dl]', box).forEach(b => b.onclick = () => download(outs[+b.dataset.dl].blob, outs[+b.dataset.dl].name));
    const zb = $('[data-zip]', box); if (zb) zb.onclick = () => zipDownload(outs, zipName);
    if (outs.length === 1) download(outs[0].blob, outs[0].name);
  }

  // Drag-&-Drop-Sortierung
  function dragSort(container, selector, onMove) {
    let from = null;
    container.addEventListener('dragstart', e => {
      const el = e.target.closest(selector); if (!el) return;
      from = +el.dataset.idx; el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(from));
    });
    container.addEventListener('dragend', () => { $$(selector, container).forEach(x => x.classList.remove('dragging', 'drop-target')); from = null; });
    container.addEventListener('dragover', e => {
      const el = e.target.closest(selector); if (from === null || !el) return;
      e.preventDefault();
      $$(selector, container).forEach(x => x.classList.toggle('drop-target', x === el));
    });
    container.addEventListener('drop', e => {
      const el = e.target.closest(selector); if (from === null || !el) return;
      e.preventDefault(); const to = +el.dataset.idx;
      if (to !== from) onMove(from, to);
    });
  }
  const move = (arr, from, to) => { const [x] = arr.splice(from, 1); arr.splice(to, 0, x); };

  // Dropzone
  function dropzone(el, { accept, multiple = true, label, onFiles }) {
    el.innerHTML = `<div class="dropzone" tabindex="0"><div style="font-size:1.6rem;margin-bottom:6px">⇪</div>
      <b>${label}</b><br><span class="small">hierher ziehen oder klicken · ${multiple ? 'mehrere Dateien möglich' : 'eine Datei'}</span>
      <input type="file" ${multiple ? 'multiple' : ''} accept="${accept}" hidden></div>`;
    const dz = $('.dropzone', el), inp = $('input', el);
    dz.onclick = () => inp.click();
    dz.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } };
    inp.onchange = () => { if (inp.files.length) onFiles([...inp.files]); inp.value = ''; };
    dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); };
    dz.ondragleave = () => dz.classList.remove('over');
    dz.ondrop = e => { e.preventDefault(); dz.classList.remove('over'); const f = [...e.dataTransfer.files]; if (f.length) onFiles(multiple ? f : f.slice(0, 1)); };
  }

  // Sortierbare Dateiliste
  function fileList(el, files, { thumbs = false, onChange } = {}) {
    const draw = () => {
      el.innerHTML = files.map((f, i) => `<div class="file-item" draggable="true" data-idx="${i}">
        <span class="dim" style="cursor:grab">⋮⋮</span>
        ${thumbs ? `<img class="thumb" data-thumb="${i}" alt="">` : ''}
        <span class="name" title="${esc(f.name)}">${i + 1}. ${esc(f.name)}</span><span class="size">${fmtSize(f.size)}</span>
        <button class="btn small ghost" data-up="${i}" title="nach oben" ${i ? '' : 'disabled'}>↑</button>
        <button class="btn small ghost" data-down="${i}" title="nach unten" ${i < files.length - 1 ? '' : 'disabled'}>↓</button>
        <button class="btn small ghost" data-rm="${i}" title="entfernen">✕</button></div>`).join('');
      $$('[data-up]', el).forEach(b => b.onclick = () => { move(files, +b.dataset.up, +b.dataset.up - 1); draw(); });
      $$('[data-down]', el).forEach(b => b.onclick = () => { move(files, +b.dataset.down, +b.dataset.down + 1); draw(); });
      $$('[data-rm]', el).forEach(b => b.onclick = () => { files.splice(+b.dataset.rm, 1); draw(); });
      if (thumbs) $$('[data-thumb]', el).forEach(img => {
        const f = files[+img.dataset.thumb];
        if (isHeic(f) || !f.type.startsWith('image/')) { img.replaceWith(Object.assign(document.createElement('span'), { className: 'thumb', style: 'display:grid;place-items:center;font-size:.7rem;color:#a89cbf', textContent: extOf(f.name).toUpperCase() })); return; }
        if (!f._url) f._url = URL.createObjectURL(f);
        img.src = f._url;
      });
      onChange && onChange();
    };
    dragSort(el, '.file-item', (a, b) => { move(files, a, b); draw(); });
    draw();
    return draw;
  }

  function advanced(inner) {
    return `<div class="adv"><label class="switch"><input type="checkbox" data-adv><span class="track"></span><span>Erweiterte Optionen</span></label>
      <div class="adv-body hidden">${inner}</div></div>`;
  }
  function bindAdvanced(root = app) {
    $$('[data-adv]', root).forEach(x => x.onchange = () => x.closest('.adv').querySelector('.adv-body').classList.toggle('hidden', !x.checked));
  }
  function seg(name, opts, val) {
    return `<div class="seg" data-seg="${name}">` + opts.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === val ? 'on' : ''}">${l}</button>`).join('') + '</div>';
  }
  function bindSeg(onChange) {
    $$('[data-seg]').forEach(s => s.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', s).forEach(x => x.classList.toggle('on', x === b)); onChange && onChange(s.dataset.seg, b.dataset.v);
    }));
  }
  const segVal = n => $(`[data-seg="${n}"] button.on`).dataset.v;
  const val = id => $('#' + id).value;

  // ---------- Bilder ----------
  const isHeic = f => /\.(heic|heif)$/i.test(f.name) || /heic|heif/i.test(f.type);
  async function decodeImage(file) {
    let blob = file;
    if (isHeic(file)) {
      const heic2any = await libHeic();
      try {
        const r = await heic2any({ blob: file, toType: 'image/png' });
        blob = Array.isArray(r) ? r[0] : r;
      } catch (e) { throw new Error('HEIC/HEIF konnte nicht gelesen werden (' + (e.message || e) + ')'); }
    }
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      if (!img.naturalWidth) throw new Error();
      return img;
    } catch { throw new Error('Format wird von diesem Browser nicht unterstützt'); }
    finally { setTimeout(() => URL.revokeObjectURL(url), 5000); }
  }
  function drawToCanvas(img, { maxDim = 0, scale = 1, bg = null } = {}) {
    let w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
    w *= scale; h *= scale;
    if (maxDim && Math.max(w, h) > maxDim) { const f = maxDim / Math.max(w, h); w *= f; h *= f; }
    w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); }
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    return c;
  }
  const canvasBlob = (c, type, q) => new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('Kodierung fehlgeschlagen')), type, q));
  const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

  // ---------- Werkzeuge ----------
  const ICON = {
    img2pdf: '<path d="M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="9.5" cy="10" r="1.5"/><path d="m20 17-4.5-4.5L8 20"/>',
    merge: '<path d="M8 3v5a4 4 0 0 0 4 4 4 4 0 0 1 4 4v5"/><path d="M16 3v5a4 4 0 0 1-4 4"/><path d="m5 6 3-3 3 3M13 6l3-3 3 3"/>',
    pages: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M18 14.5l3 3-3 3"/>',
    split: '<path d="M6 3h12M6 21h12"/><path d="M12 7v10M8 11l4-4 4 4M8 13l4 4 4-4" opacity=".0"/><path d="M3 12h4M17 12h4M10 12h4" stroke-dasharray="2 2"/><rect x="6" y="5" width="12" height="5" rx="1"/><rect x="6" y="14" width="12" height="5" rx="1"/>',
    pdf2img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    compress: '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M13 9l3 3-3 3"/>',
    media: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'
  };
  const TOOLS = [
    { id: 'bilder-zu-pdf', group: 'PDF', icon: 'img2pdf', title: 'Bilder → PDF', desc: 'JPG, PNG, WebP und HEIC zu einer PDF zusammenfassen, Reihenfolge frei wählbar.', render: toolImg2Pdf },
    { id: 'pdf-zusammenfuegen', group: 'PDF', icon: 'merge', title: 'PDFs zusammenfügen', desc: 'Mehrere PDFs in der gewünschten Reihenfolge zu einer Datei vereinen.', render: toolMerge },
    { id: 'pdf-seiten', group: 'PDF', icon: 'pages', title: 'Seiten bearbeiten', desc: 'Seiten per Drag & Drop sortieren, drehen und löschen.', render: toolPages },
    { id: 'pdf-aufteilen', group: 'PDF', icon: 'split', title: 'PDF aufteilen', desc: 'In Einzelseiten oder Bereiche aufteilen oder ausgewählte Seiten extrahieren.', render: toolSplit },
    { id: 'pdf-zu-bildern', group: 'PDF', icon: 'pdf2img', title: 'PDF → Bilder', desc: 'Seiten als PNG, JPG oder WebP exportieren.', render: toolPdf2Img },
    { id: 'pdf-verkleinern', group: 'PDF', icon: 'compress', title: 'PDF verkleinern', desc: 'Dateigröße verlustfrei oder stärker verlustbehaftet reduzieren.', render: toolCompress },
    { id: 'bildkonverter', group: 'Bild', icon: 'image', title: 'Bildkonverter', desc: 'HEIC/HEIF, JPG, PNG, WebP, GIF, BMP und AVIF in JPG, PNG oder WebP umwandeln, auch mehrere auf einmal.', render: toolImage },
    { id: 'medien', group: 'Audio & Video', icon: 'media', title: 'Audio- & Videokonverter', desc: 'Formate wie MP4, WebM, MOV, MP3, M4A, WAV, OGG und FLAC umwandeln, auch Video zu Audio oder GIF.', render: toolMedia }
  ];

  function shell(t, inner) {
    app.innerHTML = `<a class="back-link" href="#/">← Alle Werkzeuge</a>
      <div class="page-head"><div class="label">${t.group}</div><h1>${t.title}</h1><p class="muted">${t.desc}</p></div>
      <div class="card stack">${inner}</div>`;
  }

  function renderHome() {
    const groups = [...new Set(TOOLS.map(t => t.group))];
    app.innerHTML = `<div class="page-head"><div class="label">Akte 02</div><h1>Konverter</h1>
      <p class="muted">Alle Dateien werden <b>lokal in deinem Browser</b> verarbeitet. Es wird nichts hochgeladen.</p></div>
      ${groups.map(g => `<section class="tool-section"><div class="label" style="margin-bottom:12px">${g}</div><div class="grid cols-2">
        ${TOOLS.filter(t => t.group === g).map(t => `<a class="card tool-card" href="#/${t.id}"><div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[t.icon]}</svg></div>
          <div><h3>${t.title}</h3><p>${t.desc}</p></div></a>`).join('')}
      </div></section>`).join('')}`;
  }

  // ===== Bilder → PDF =====
  function toolImg2Pdf(t) {
    const files = [];
    shell(t, `<div id="dz"></div><div class="file-list" id="fl"></div>
      ${advanced(`
        <label>Seitengröße<select id="size"><option value="a4">A4</option><option value="letter">US Letter</option><option value="fit">Wie Bildgröße</option></select></label>
        <label>Ausrichtung<select id="orient"><option value="auto">Automatisch (je Bild)</option><option value="p">Hochformat</option><option value="l">Querformat</option></select></label>
        <label>Seitenrand<select id="margin"><option value="0">Kein Rand</option><option value="10">10 mm</option><option value="20">20 mm</option></select></label>
        <label>Bildqualität (JPEG) <input type="range" id="q" min="0.4" max="1" step="0.05" value="0.9"></label>
        <label>Max. Bildauflösung<select id="maxd"><option value="0">Original</option><option value="3000">3000 px</option><option value="2000">2000 px</option><option value="1400">1400 px</option></select></label>`)}
      <div class="row"><button class="btn primary" id="run" disabled>PDF erstellen</button><span class="spacer"></span><button class="btn small ghost" id="clear">Liste leeren</button></div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    bindAdvanced();
    const redraw = fileList($('#fl'), files, { thumbs: true, onChange: () => { $('#run').disabled = !files.length; } });
    dropzone($('#dz'), { accept: 'image/*,.heic,.heif', label: 'Bilder auswählen', onFiles: f => { files.push(...f); redraw(); } });
    $('#clear').onclick = () => { files.length = 0; redraw(); $('#res').innerHTML = ''; };
    $('#run').onclick = async () => {
      const btn = $('#run'); btn.disabled = true; const st = $('#st');
      try {
        const { PDFDocument } = await libPdf();
        const doc = await PDFDocument.create();
        const size = val('size'), orient = val('orient'), margin = +val('margin') * 72 / 25.4, q = +val('q'), maxd = +val('maxd');
        for (let i = 0; i < files.length; i++) {
          st.textContent = `Verarbeite Bild ${i + 1} von ${files.length} …`;
          const img = await decodeImage(files[i]);
          const png = /png/i.test(files[i].type) || extOf(files[i].name) === 'png';
          const c = drawToCanvas(img, { maxDim: maxd, bg: png ? null : '#ffffff' });
          const bytes = new Uint8Array(await (await canvasBlob(c, png ? 'image/png' : 'image/jpeg', q)).arrayBuffer());
          const emb = png ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
          let pw, ph;
          if (size === 'fit') { pw = c.width * 0.75 + 2 * margin; ph = c.height * 0.75 + 2 * margin; }
          else {
            [pw, ph] = size === 'a4' ? [595.28, 841.89] : [612, 792];
            const land = orient === 'l' || (orient === 'auto' && c.width > c.height);
            if (land) [pw, ph] = [ph, pw];
          }
          const page = doc.addPage([pw, ph]);
          const aw = pw - 2 * margin, ah = ph - 2 * margin;
          const f = Math.min(aw / c.width, ah / c.height);
          const w = c.width * f, h = c.height * f;
          page.drawImage(emb, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
          await sleep(0);
        }
        st.textContent = 'Speichere PDF …';
        const out = await doc.save();
        st.textContent = '';
        showResults($('#res'), [{ name: (files.length === 1 ? baseName(files[0].name) : 'bilder') + '.pdf', blob: new Blob([out], { type: 'application/pdf' }) }], 'bilder.zip');
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
      btn.disabled = !files.length;
    };
  }

  async function loadPdfLib(file) {
    const { PDFDocument } = await libPdf();
    const bytes = new Uint8Array(await file.arrayBuffer());
    try { return { bytes, doc: await PDFDocument.load(bytes, { ignoreEncryption: true }) }; }
    catch (e) { throw new Error(`${file.name} konnte nicht gelesen werden (${e.message})`); }
  }

  // ===== Zusammenfügen =====
  function toolMerge(t) {
    const files = [];
    shell(t, `<div id="dz"></div><div class="file-list" id="fl"></div>
      <p class="dim small">Reihenfolge per Drag &amp; Drop oder mit den Pfeilen festlegen.</p>
      <div class="row"><button class="btn primary" id="run" disabled>Zusammenfügen</button><span class="spacer"></span><button class="btn small ghost" id="clear">Liste leeren</button></div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    const redraw = fileList($('#fl'), files, { onChange: () => { $('#run').disabled = files.length < 2; } });
    dropzone($('#dz'), { accept: 'application/pdf,.pdf', label: 'PDF-Dateien auswählen', onFiles: f => { files.push(...f); redraw(); } });
    $('#clear').onclick = () => { files.length = 0; redraw(); };
    $('#run').onclick = async () => {
      const st = $('#st'); $('#run').disabled = true;
      try {
        const { PDFDocument } = await libPdf();
        const out = await PDFDocument.create();
        for (let i = 0; i < files.length; i++) {
          st.textContent = `Füge ${files[i].name} hinzu …`;
          const { doc } = await loadPdfLib(files[i]);
          (await out.copyPages(doc, doc.getPageIndices())).forEach(p => out.addPage(p));
        }
        st.textContent = '';
        showResults($('#res'), [{ name: 'zusammengefuegt.pdf', blob: new Blob([await out.save()], { type: 'application/pdf' }) }], 'pdf.zip', `${out.getPageCount()} Seiten.`);
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
      $('#run').disabled = files.length < 2;
    };
  }

  // ===== Seiten bearbeiten =====
  function toolPages(t) {
    const srcs = []; // {name, bytes, pdfjs}
    let pages = []; // {s, i, rot, del, id}
    let uid = 0;
    shell(t, `<div id="dz"></div>
      <div class="row hidden" id="bar">
        <button class="btn small" id="rotAll">↻ Alle drehen</button>
        <button class="btn small" id="rev">⇅ Reihenfolge umkehren</button>
        <button class="btn small" id="undel">Löschungen zurücknehmen</button>
        <span class="spacer"></span><span class="muted small" id="info"></span>
      </div>
      <div class="pages" id="pages"></div>
      <p class="dim small">Ziehe Seiten mit der Maus an ihre neue Position oder nutze ◀ ▶. ↻ dreht um 90°, ✕ markiert eine Seite zum Löschen. Weitere PDFs werden hinten angehängt.</p>
      <div class="row"><button class="btn primary" id="run" disabled>PDF speichern</button></div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    const grid = $('#pages');
    const thumbs = {}; // id -> canvas
    const draw = () => {
      $('#bar').classList.toggle('hidden', !pages.length);
      $('#run').disabled = !pages.some(p => !p.del);
      $('#info').textContent = `${pages.filter(p => !p.del).length} von ${pages.length} Seiten`;
      grid.innerHTML = pages.map((p, k) => `<div class="page-thumb ${p.del ? 'deleted' : ''}" draggable="true" data-idx="${k}">
        <div class="cv" data-cv="${p.id}"></div>
        <div class="bar"><button data-l="${k}" title="nach vorne">◀</button><span>${k + 1}${srcs.length > 1 ? `<span class="dim">·${String.fromCharCode(65 + p.s)}</span>` : ''}</span>
        <span><button data-r="${k}" title="drehen">↻</button> <button data-d="${k}" title="löschen">${p.del ? '↺' : '✕'}</button></span><button data-n="${k}" title="nach hinten">▶</button></div></div>`).join('');
      $$('[data-cv]', grid).forEach(el => {
        const p = pages.find(x => x.id === +el.dataset.cv);
        const c = thumbs[p.id];
        if (c) { c.style.transform = `rotate(${p.rot}deg)` + (p.rot % 180 ? ' scale(.72)' : ''); el.appendChild(c); }
        else el.innerHTML = '<span class="dim small">…</span>';
      });
      $$('[data-l]', grid).forEach(b => b.onclick = () => { const k = +b.dataset.l; if (k > 0) { move(pages, k, k - 1); draw(); } });
      $$('[data-n]', grid).forEach(b => b.onclick = () => { const k = +b.dataset.n; if (k < pages.length - 1) { move(pages, k, k + 1); draw(); } });
      $$('[data-r]', grid).forEach(b => b.onclick = () => { const p = pages[+b.dataset.r]; p.rot = (p.rot + 90) % 360; draw(); });
      $$('[data-d]', grid).forEach(b => b.onclick = () => { const p = pages[+b.dataset.d]; p.del = !p.del; draw(); });
    };
    dragSort(grid, '.page-thumb', (a, b) => { move(pages, a, b); draw(); });
    async function addFiles(fs) {
      const st = $('#st');
      try {
        const pdfjs = await libPdfjs();
        for (const f of fs) {
          st.textContent = `Lade ${f.name} …`;
          const bytes = new Uint8Array(await f.arrayBuffer());
          const pj = await pdfjs.getDocument({ data: bytes.slice() }).promise;
          const s = srcs.length; srcs.push({ name: f.name, bytes, pj });
          const added = [];
          for (let i = 0; i < pj.numPages; i++) { const p = { s, i, rot: 0, del: false, id: uid++ }; pages.push(p); added.push(p); }
          draw();
          for (const p of added) {
            const page = await pj.getPage(p.i + 1);
            const vp0 = page.getViewport({ scale: 1 });
            const vp = page.getViewport({ scale: 260 / Math.max(vp0.width, vp0.height) });
            const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
            await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
            thumbs[p.id] = c;
            const el = grid.querySelector(`[data-cv="${p.id}"]`);
            if (el) { el.innerHTML = ''; c.style.transform = `rotate(${p.rot}deg)` + (p.rot % 180 ? ' scale(.72)' : ''); el.appendChild(c); }
          }
        }
        st.textContent = '';
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
    }
    dropzone($('#dz'), { accept: 'application/pdf,.pdf', label: 'PDF auswählen', onFiles: addFiles });
    $('#rotAll').onclick = () => { pages.forEach(p => (p.rot = (p.rot + 90) % 360)); draw(); };
    $('#rev').onclick = () => { pages.reverse(); draw(); };
    $('#undel').onclick = () => { pages.forEach(p => (p.del = false)); draw(); };
    $('#run').onclick = async () => {
      const st = $('#st');
      try {
        st.textContent = 'Erstelle PDF …';
        const { PDFDocument, degrees } = await libPdf();
        const out = await PDFDocument.create();
        const docs = [];
        for (const s of srcs) docs.push(await PDFDocument.load(s.bytes, { ignoreEncryption: true }));
        for (const p of pages.filter(x => !x.del)) {
          const [cp] = await out.copyPages(docs[p.s], [p.i]);
          cp.setRotation(degrees((cp.getRotation().angle + p.rot) % 360));
          out.addPage(cp);
        }
        st.textContent = '';
        showResults($('#res'), [{ name: baseName(srcs[0].name) + '_bearbeitet.pdf', blob: new Blob([await out.save()], { type: 'application/pdf' }) }], 'pdf.zip');
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
    };
  }

  // Seitenbereiche "1-3, 5, 8-" → [[0,1,2],[4],[7..n-1]]
  function parseRanges(str, n) {
    const groups = [];
    for (const part of str.split(/[;,]/).map(s => s.trim()).filter(Boolean)) {
      const m = part.match(/^(\d*)\s*-\s*(\d*)$/) || part.match(/^(\d+)$/);
      if (!m) throw new Error(`Ungültiger Bereich: „${part}“`);
      let a, b;
      if (m.length === 2) a = b = +m[1];
      else { a = m[1] ? +m[1] : 1; b = m[2] ? +m[2] : n; }
      if (a < 1 || b > n || a > b) throw new Error(`Bereich „${part}“ liegt außerhalb von 1–${n}`);
      groups.push(Array.from({ length: b - a + 1 }, (_, k) => a - 1 + k));
    }
    if (!groups.length) throw new Error('Bitte Seiten angeben.');
    return groups;
  }

  // ===== Aufteilen =====
  function toolSplit(t) {
    let file = null, n = 0;
    shell(t, `<div id="dz"></div><div id="info" class="muted small"></div>
      <div id="opts" class="stack hidden">
        <div>${seg('mode', [['each', 'Jede Seite einzeln'], ['ranges', 'Nach Bereichen'], ['extract', 'Seiten extrahieren'], ['chunk', 'Alle N Seiten']], 'each')}</div>
        <div id="o-ranges" class="hidden"><input type="text" id="ranges" placeholder="z. B. 1-3, 4-6, 7-" style="width:100%"><p class="dim small">Jeder Bereich wird eine eigene PDF.</p></div>
        <div id="o-extract" class="hidden"><input type="text" id="extract" placeholder="z. B. 1, 3, 5-7" style="width:100%"><p class="dim small">Alle angegebenen Seiten kommen in eine neue PDF.</p></div>
        <div id="o-chunk" class="hidden row"><span>Alle</span><input type="number" id="chunk" value="2" min="1" style="width:90px"><span>Seiten eine neue Datei</span></div>
        <div><button class="btn primary" id="run">Aufteilen</button></div>
      </div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    bindSeg((_, v) => ['ranges', 'extract', 'chunk'].forEach(k => $('#o-' + k).classList.toggle('hidden', k !== v)));
    dropzone($('#dz'), {
      accept: 'application/pdf,.pdf', multiple: false, label: 'PDF auswählen', onFiles: async ([f]) => {
        try { const { doc } = await loadPdfLib(f); file = f; n = doc.getPageCount(); $('#info').textContent = `${f.name} · ${n} Seiten`; $('#opts').classList.remove('hidden'); $('#res').innerHTML = ''; }
        catch (e) { $('#st').innerHTML = `<span style="color:var(--bad)">${esc(e.message)}</span>`; }
      }
    });
    $('#run').onclick = async () => {
      const st = $('#st');
      try {
        const mode = segVal('mode');
        let groups;
        if (mode === 'each') groups = Array.from({ length: n }, (_, i) => [i]);
        else if (mode === 'ranges') groups = parseRanges(val('ranges'), n);
        else if (mode === 'extract') groups = [parseRanges(val('extract'), n).flat()];
        else { const c = Math.max(1, +val('chunk') || 1); groups = []; for (let i = 0; i < n; i += c) groups.push(Array.from({ length: Math.min(c, n - i) }, (_, k) => i + k)); }
        const { PDFDocument } = await libPdf();
        const { doc } = await loadPdfLib(file);
        const outs = [];
        for (let g = 0; g < groups.length; g++) {
          st.textContent = `Erzeuge Datei ${g + 1} von ${groups.length} …`;
          const o = await PDFDocument.create();
          (await o.copyPages(doc, groups[g])).forEach(p => o.addPage(p));
          const pg = groups[g], label = pg.length === 1 ? `S${pg[0] + 1}` : mode === 'extract' ? 'auszug' : `S${pg[0] + 1}-${pg[pg.length - 1] + 1}`;
          outs.push({ name: `${baseName(file.name)}_${label}.pdf`, blob: new Blob([await o.save()], { type: 'application/pdf' }) });
          await sleep(0);
        }
        st.textContent = '';
        showResults($('#res'), outs, baseName(file.name) + '_aufgeteilt.zip');
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
    };
  }

  async function renderPage(pj, i, dpi, bg = '#ffffff') {
    const page = await pj.getPage(i + 1);
    const vp = page.getViewport({ scale: dpi / 72 });
    const c = document.createElement('canvas'); c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
    const ctx = c.getContext('2d'); ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    page.cleanup();
    return { c, wPt: vp.width * 72 / dpi, hPt: vp.height * 72 / dpi };
  }

  // ===== PDF → Bilder =====
  function toolPdf2Img(t) {
    let file = null, pj = null;
    shell(t, `<div id="dz"></div><div id="info" class="muted small"></div>
      <div id="opts" class="stack hidden">
        <div class="row"><span class="muted">Format</span>${seg('fmt', [['png', 'PNG'], ['jpg', 'JPG'], ['webp', 'WebP']], 'png')}</div>
        <div class="row"><span class="muted">Auflösung</span>${seg('dpi', [['72', '72 dpi'], ['150', '150 dpi'], ['200', '200 dpi'], ['300', '300 dpi']], '150')}</div>
        ${advanced(`<label>Nur diese Seiten (leer = alle)<input type="text" id="sel" placeholder="z. B. 1-3, 5"></label>
          <label>JPG/WebP-Qualität <input type="range" id="q" min="0.4" max="1" step="0.05" value="0.9"></label>`)}
        <div><button class="btn primary" id="run">Bilder erzeugen</button></div>
      </div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    bindSeg(); bindAdvanced();
    dropzone($('#dz'), {
      accept: 'application/pdf,.pdf', multiple: false, label: 'PDF auswählen', onFiles: async ([f]) => {
        try {
          const pdfjs = await libPdfjs();
          pj = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise; file = f;
          $('#info').textContent = `${f.name} · ${pj.numPages} Seiten`; $('#opts').classList.remove('hidden'); $('#res').innerHTML = '';
        } catch (e) { $('#st').innerHTML = `<span style="color:var(--bad)">PDF konnte nicht gelesen werden: ${esc(e.message)}</span>`; }
      }
    });
    $('#run').onclick = async () => {
      const st = $('#st'); $('#run').disabled = true;
      try {
        const fmt = segVal('fmt'), dpi = +segVal('dpi'), q = +val('q');
        const idx = val('sel').trim() ? [...new Set(parseRanges(val('sel'), pj.numPages).flat())] : Array.from({ length: pj.numPages }, (_, i) => i);
        const outs = [];
        for (let k = 0; k < idx.length; k++) {
          st.textContent = `Rendere Seite ${idx[k] + 1} (${k + 1}/${idx.length}) …`;
          const { c } = await renderPage(pj, idx[k], dpi);
          const blob = await canvasBlob(c, MIME[fmt], q);
          c.width = c.height = 0;
          outs.push({ name: `${baseName(file.name)}_S${String(idx[k] + 1).padStart(String(pj.numPages).length, '0')}.${fmt}`, blob });
        }
        st.textContent = '';
        showResults($('#res'), outs, baseName(file.name) + '_bilder.zip', fmt === 'webp' && outs[0].blob.type !== 'image/webp' ? 'Hinweis: Dein Browser kann kein WebP erzeugen, deshalb wurde PNG verwendet.' : '');
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
      $('#run').disabled = false;
    };
  }

  // ===== PDF verkleinern =====
  function toolCompress(t) {
    let file = null;
    shell(t, `<div id="dz"></div><div id="info" class="muted small"></div>
      <div id="opts" class="stack hidden">
        <div>${seg('lvl', [['lossless', 'Leicht · verlustfrei'], ['mid', 'Mittel · 150 dpi'], ['strong', 'Stark · 100 dpi']], 'mid')}</div>
        <div class="notice small" id="hint"></div>
        ${advanced(`<label>Auflösung (dpi) <input type="number" id="dpi" min="50" max="300" value="150"></label>
          <label>JPEG-Qualität <input type="range" id="q" min="0.3" max="0.95" step="0.05" value="0.75"></label>`)}
        <div><button class="btn primary" id="run">Verkleinern</button></div>
      </div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    bindAdvanced();
    const hints = {
      lossless: 'Die PDF-Struktur wird neu geschrieben, Inhalt und Qualität bleiben unverändert. Das bringt meist nur wenig, bei manchen Dateien gar nichts.',
      mid: 'Jede Seite wird als Bild mit 150 dpi neu aufgebaut. Das spart meist viel Platz, besonders bei Scans und Fotos. <b>Text ist danach nicht mehr markier- oder durchsuchbar.</b>',
      strong: 'Jede Seite wird als Bild mit 100 dpi und stärkerer Kompression neu aufgebaut. Die Datei wird maximal klein, die Qualität sinkt sichtbar. <b>Text ist danach nicht mehr markier- oder durchsuchbar.</b>'
    };
    const setLvl = v => { $('#hint').innerHTML = hints[v]; if (v === 'mid') { $('#dpi').value = 150; $('#q').value = 0.75; } if (v === 'strong') { $('#dpi').value = 100; $('#q').value = 0.55; } };
    bindSeg((_, v) => setLvl(v)); setLvl('mid');
    dropzone($('#dz'), { accept: 'application/pdf,.pdf', multiple: false, label: 'PDF auswählen', onFiles: ([f]) => { file = f; $('#info').textContent = `${f.name} · ${fmtSize(f.size)}`; $('#opts').classList.remove('hidden'); $('#res').innerHTML = ''; } });
    $('#run').onclick = async () => {
      const st = $('#st'); $('#run').disabled = true;
      try {
        const lvl = segVal('lvl');
        let out;
        if (lvl === 'lossless') {
          st.textContent = 'Optimiere Struktur …';
          const { doc } = await loadPdfLib(file);
          out = await doc.save({ useObjectStreams: true });
        } else {
          const pdfjs = await libPdfjs(); const { PDFDocument } = await libPdf();
          const pj = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
          const doc = await PDFDocument.create();
          const dpi = Math.min(300, Math.max(50, +val('dpi') || 150)), q = +val('q');
          for (let i = 0; i < pj.numPages; i++) {
            st.textContent = `Seite ${i + 1} von ${pj.numPages} …`;
            const { c, wPt, hPt } = await renderPage(pj, i, dpi);
            const jpg = await doc.embedJpg(new Uint8Array(await (await canvasBlob(c, 'image/jpeg', q)).arrayBuffer()));
            c.width = c.height = 0;
            doc.addPage([wPt, hPt]).drawImage(jpg, { x: 0, y: 0, width: wPt, height: hPt });
          }
          out = await doc.save();
        }
        st.textContent = '';
        const diff = Math.round((1 - out.length / file.size) * 100);
        const note = diff > 0 ? `${fmtSize(file.size)} → ${fmtSize(out.length)} (−${diff} %)` : `Keine Verkleinerung möglich (${fmtSize(file.size)} → ${fmtSize(out.length)}). Behalte besser das Original oder probiere eine stärkere Stufe.`;
        const outs = [{ name: baseName(file.name) + '_klein.pdf', blob: new Blob([out], { type: 'application/pdf' }) }];
        if (diff > 0) showResults($('#res'), outs, 'pdf.zip', note);
        else { $('#res').innerHTML = `<div class="notice warn small">${note}</div><div class="file-item"><span class="name">${esc(outs[0].name)}</span><button class="btn small" id="dlAny">Trotzdem herunterladen</button></div>`; $('#dlAny').onclick = () => download(outs[0].blob, outs[0].name); }
      } catch (e) { st.innerHTML = `<span style="color:var(--bad)">Fehler: ${esc(e.message)}</span>`; }
      $('#run').disabled = false;
    };
  }

  // ===== Bildkonverter =====
  function toolImage(t) {
    const files = [];
    shell(t, `<div id="dz"></div><div class="file-list" id="fl"></div>
      <div class="row"><span class="muted">Zielformat</span>${seg('fmt', [['png', 'PNG'], ['jpg', 'JPG'], ['webp', 'WebP']], 'png')}</div>
      ${advanced(`<label>Qualität (JPG/WebP) <input type="range" id="q" min="0.4" max="1" step="0.05" value="0.92"></label>
        <label>Größe ändern<select id="resize"><option value="0">Original</option><option value="p75">75 %</option><option value="p50">50 %</option><option value="p25">25 %</option><option value="m3840">max. 3840 px</option><option value="m1920">max. 1920 px</option><option value="m1280">max. 1280 px</option><option value="m800">max. 800 px</option></select></label>
        <label>Hintergrund für Transparenz (bei JPG)<input type="color" id="bg" value="#ffffff" style="height:36px;width:100%;padding:2px"></label>`)}
      <p class="dim small">Hinweis: Metadaten wie EXIF und GPS werden beim Konvertieren entfernt. Bei animierten GIFs wird das erste Bild verwendet.</p>
      <div class="row"><button class="btn primary" id="run" disabled>Konvertieren</button><span class="spacer"></span><button class="btn small ghost" id="clear">Liste leeren</button></div>
      <div class="status" id="st"></div><div class="results" id="res"></div>`);
    bindSeg(); bindAdvanced();
    const redraw = fileList($('#fl'), files, { thumbs: true, onChange: () => { $('#run').disabled = !files.length; } });
    dropzone($('#dz'), { accept: 'image/*,.heic,.heif,.avif', label: 'Bilder auswählen', onFiles: f => { files.push(...f); redraw(); } });
    $('#clear').onclick = () => { files.length = 0; redraw(); $('#res').innerHTML = ''; };
    $('#run').onclick = async () => {
      const st = $('#st'); $('#run').disabled = true;
      const fmt = segVal('fmt'), q = +val('q'), rs = val('resize'), bg = val('bg');
      const outs = [], errs = [];
      for (let i = 0; i < files.length; i++) {
        st.textContent = `Konvertiere ${i + 1} von ${files.length}: ${files[i].name} …`;
        try {
          const img = await decodeImage(files[i]);
          const opt = { bg: fmt === 'jpg' ? bg : null };
          if (rs[0] === 'p') opt.scale = +rs.slice(1) / 100;
          if (rs[0] === 'm') opt.maxDim = +rs.slice(1);
          const c = drawToCanvas(img, opt);
          const blob = await canvasBlob(c, MIME[fmt], q);
          const realExt = blob.type === 'image/jpeg' ? 'jpg' : blob.type.split('/')[1];
          if (realExt !== fmt) errs.push(`${files[i].name}: Dein Browser kann kein ${fmt.toUpperCase()} erzeugen, deshalb wurde ${realExt.toUpperCase()} verwendet.`);
          outs.push({ name: `${baseName(files[i].name)}.${realExt}`, blob });
        } catch (e) { errs.push(`${files[i].name}: ${e.message}`); }
        await sleep(0);
      }
      st.innerHTML = errs.length ? `<div class="notice warn small">${errs.map(esc).join('<br>')}</div>` : '';
      showResults($('#res'), outs, `bilder_${fmt}.zip`);
      $('#run').disabled = !files.length;
    };
  }

  // ===== Audio & Video (ffmpeg.wasm) =====
  let ff = null, ffLoading = null, ffLog = [];
  async function getFFmpeg(onStatus) {
    if (ff) return ff;
    if (!ffLoading) ffLoading = (async () => {
      onStatus && onStatus('Lade Konverter-Engine (ca. 32 MB, wird danach vom Browser zwischengespeichert) …');
      const { FFmpeg } = await import(new URL('../vendor/ffmpeg/index.js', location.href).href);
      const inst = new FFmpeg();
      inst.on('log', ({ message }) => { ffLog.push(message); if (ffLog.length > 60) ffLog.shift(); });
      const base = new URL('../vendor/ffmpeg-core/', location.href).href;
      await inst.load({ coreURL: base + 'ffmpeg-core.js', wasmURL: base + 'ffmpeg-core.wasm' });
      ff = inst; return inst;
    })().catch(e => { ffLoading = null; throw e; });
    return ffLoading;
  }
  const VIDEO_EXT = ['mp4', 'm4v', 'mov', 'mkv', 'webm', 'avi', 'wmv', 'flv', 'mpeg', 'mpg', '3gp', 'ts', 'mts', 'ogv'];
  const AUDIO_EXT = ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'oga', 'opus', 'flac', 'wma', 'aiff', 'aif', 'amr', 'weba'];
  const isVideo = f => f.type.startsWith('video/') || VIDEO_EXT.includes(extOf(f.name));
  const isAudio = f => !isVideo(f) && (f.type.startsWith('audio/') || AUDIO_EXT.includes(extOf(f.name)));
  const OUT = {
    mp4: { kind: 'video', label: 'MP4 (H.264)' }, webm: { kind: 'video', label: 'WebM (VP8)' }, mov: { kind: 'video', label: 'MOV (H.264)' }, gif: { kind: 'video', label: 'GIF (animiert)' },
    mp3: { kind: 'audio', label: 'MP3' }, m4a: { kind: 'audio', label: 'M4A (AAC)' }, wav: { kind: 'audio', label: 'WAV' }, ogg: { kind: 'audio', label: 'OGG (Vorbis)' }, opus: { kind: 'audio', label: 'Opus' }, flac: { kind: 'audio', label: 'FLAC' }
  };
  function parseTime(s) {
    s = (s || '').trim(); if (!s) return null;
    const p = s.replace(',', '.').split(':').map(Number);
    if (p.some(x => !Number.isFinite(x) || x < 0)) throw new Error(`Ungültige Zeitangabe „${s}“`);
    return p.reduce((a, x) => a * 60 + x, 0);
  }
  function ffArgs(fmt, o) {
    const crf = { high: 20, mid: 24, low: 30 }[o.quality];
    const vf = o.height ? `scale=-2:min(${o.height}\\,ih)` : 'scale=trunc(iw/2)*2:trunc(ih/2)*2';
    const ab = o.abr + 'k';
    switch (fmt) {
      case 'mp4': case 'mov': return ['-vf', vf, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', ab, ...(fmt === 'mp4' ? ['-movflags', '+faststart'] : [])];
      case 'webm': return ['-vf', vf, '-c:v', 'libvpx', '-crf', String({ high: 8, mid: 16, low: 30 }[o.quality]), '-b:v', { high: '6M', mid: '3M', low: '1M' }[o.quality], '-deadline', 'good', '-cpu-used', '4', '-c:a', 'libvorbis', '-b:a', ab];
      case 'gif': return ['-vf', `fps=${o.gifFps},scale=${o.gifW}:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse`, '-loop', '0', '-an'];
      case 'mp3': return ['-vn', '-c:a', 'libmp3lame', '-b:a', ab];
      case 'm4a': return ['-vn', '-c:a', 'aac', '-b:a', ab];
      case 'wav': return ['-vn', '-c:a', 'pcm_s16le'];
      case 'ogg': return ['-vn', '-c:a', 'libvorbis', '-b:a', ab];
      case 'opus': return ['-vn', '-c:a', 'libopus', '-b:a', (Math.min(+o.abr, 256)) + 'k'];
      case 'flac': return ['-vn', '-c:a', 'flac'];
    }
  }
  function toolMedia(t) {
    const files = [];
    let busy = false;
    shell(t, `<div id="dz"></div><div class="file-list" id="fl"></div>
      <div class="row"><span class="muted">Zielformat</span><select id="fmt"></select><span class="dim small" id="fmtHint"></span></div>
      ${advanced(`<label>Videoauflösung<select id="height"><option value="">Original</option><option value="1080">max. 1080p</option><option value="720">max. 720p</option><option value="480">max. 480p</option></select></label>
        <label>Videoqualität<select id="quality"><option value="high">Hoch (große Datei)</option><option value="mid" selected>Mittel</option><option value="low">Klein (geringere Qualität)</option></select></label>
        <label>Audio-Bitrate<select id="abr"><option value="128">128 kbit/s</option><option value="192" selected>192 kbit/s</option><option value="256">256 kbit/s</option><option value="320">320 kbit/s</option></select></label>
        <label>Start (optional, z. B. 0:30)<input type="text" id="tstart" placeholder="mm:ss"></label>
        <label>Ende (optional, z. B. 1:45)<input type="text" id="tend" placeholder="mm:ss"></label>
        <label>GIF: Bilder pro Sekunde<select id="gifFps"><option>8</option><option selected>12</option><option>15</option><option>20</option></select></label>
        <label>GIF: Breite<select id="gifW"><option>320</option><option selected>480</option><option>640</option><option>800</option></select></label>`)}
      <div class="notice small">Die Umwandlung läuft per WebAssembly direkt im Browser. Das ist langsamer als ein Desktop-Programm. Ein Video von wenigen Minuten kann einige Minuten dauern, und sehr große Dateien (deutlich über 1 GB) können am Arbeitsspeicher scheitern. Audio-Extraktion geht dagegen schnell.</div>
      <div class="row"><button class="btn primary" id="run" disabled>Konvertieren</button><button class="btn danger hidden" id="cancel">Abbrechen</button><span class="spacer"></span><button class="btn small ghost" id="clear">Liste leeren</button></div>
      <div class="status" id="st"></div><div class="progress hidden" id="pg"><span style="width:0%"></span></div><div class="results" id="res"></div>`);
    bindAdvanced();
    const fillFormats = () => {
      const anyVideo = files.some(isVideo);
      const cur = $('#fmt').value;
      const opts = Object.entries(OUT).filter(([, v]) => anyVideo || v.kind === 'audio');
      $('#fmt').innerHTML = (anyVideo ? `<optgroup label="Video">${opts.filter(([, v]) => v.kind === 'video').map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</optgroup>` : '') +
        `<optgroup label="${anyVideo ? 'Nur Audio (Tonspur extrahieren)' : 'Audio'}">${opts.filter(([, v]) => v.kind === 'audio').map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</optgroup>`;
      if (opts.some(([k]) => k === cur)) $('#fmt').value = cur;
      const mixed = anyVideo && files.some(isAudio);
      $('#fmtHint').textContent = mixed ? 'Audiodateien werden bei Videoformaten übersprungen.' : '';
    };
    const redraw = fileList($('#fl'), files, { onChange: () => { $('#run').disabled = busy || !files.length; fillFormats(); } });
    dropzone($('#dz'), {
      accept: 'audio/*,video/*,' + [...VIDEO_EXT, ...AUDIO_EXT].map(e => '.' + e).join(','), label: 'Audio- oder Videodateien auswählen',
      onFiles: f => {
        const ok = f.filter(x => isVideo(x) || isAudio(x));
        if (ok.length < f.length) $('#st').innerHTML = `<span style="color:var(--warn)">${f.length - ok.length} Datei(en) ignoriert (kein Audio/Video).</span>`;
        files.push(...ok); redraw();
      }
    });
    $('#fmt').onchange = fillFormats;
    $('#clear').onclick = () => { if (!busy) { files.length = 0; redraw(); $('#res').innerHTML = ''; } };
    let cancelled = false;
    $('#cancel').onclick = () => {
      cancelled = true;
      if (ff) { try { ff.terminate(); } catch { /* */ } ff = null; ffLoading = null; }
    };
    $('#run').onclick = async () => {
      const st = $('#st'), pg = $('#pg'), bar = $('#pg span');
      busy = true; cancelled = false; $('#run').disabled = true; $('#cancel').classList.remove('hidden'); pg.classList.remove('hidden');
      const fmt = $('#fmt').value;
      const o = { height: +val('height') || 0, quality: val('quality'), abr: val('abr'), gifFps: val('gifFps'), gifW: val('gifW') };
      const outs = [], errs = [];
      try {
        const start = parseTime(val('tstart')), end = parseTime(val('tend'));
        if (start !== null && end !== null && end <= start) throw new Error('Das Ende muss nach dem Start liegen.');
        const inst = await getFFmpeg(m => (st.textContent = m));
        let cur = 0;
        const onProg = ({ progress }) => { if (progress >= 0 && progress <= 1) bar.style.width = Math.round(progress * 100) + '%'; };
        inst.on('progress', onProg);
        for (const f of files) {
          if (cancelled) break;
          cur++;
          if (OUT[fmt].kind === 'video' && !isVideo(f)) { errs.push(`${f.name}: übersprungen (Audiodatei kann nicht in ein Videoformat umgewandelt werden)`); continue; }
          st.textContent = `Konvertiere ${cur}/${files.length}: ${f.name} …`;
          bar.style.width = '0%';
          const inName = 'in_' + cur + '.' + (extOf(f.name) || 'bin'), outName = 'out_' + cur + '.' + fmt;
          try {
            await inst.writeFile(inName, new Uint8Array(await f.arrayBuffer()));
            const args = [];
            if (start !== null) args.push('-ss', String(start));
            args.push('-i', inName);
            if (end !== null) args.push('-t', String(end - (start || 0)));
            args.push(...ffArgs(fmt, o), '-y', outName);
            ffLog = [];
            const code = await inst.exec(args);
            if (code !== 0) throw new Error(ffLog.slice(-4).join(' | ') || 'Exit-Code ' + code);
            const data = await inst.readFile(outName);
            outs.push({ name: `${baseName(f.name)}.${fmt}`, blob: new Blob([data], { type: (OUT[fmt].kind === 'video' ? (fmt === 'gif' ? 'image/gif' : 'video/') : 'audio/') + (fmt === 'gif' ? '' : fmt === 'm4a' ? 'mp4' : fmt === 'mov' ? 'quicktime' : fmt) }) });
          } catch (e) {
            if (cancelled) break;
            errs.push(`${f.name}: ${e.message || e}`);
          } finally {
            if (ff) { try { await inst.deleteFile(inName); } catch { /* */ } try { await inst.deleteFile(outName); } catch { /* */ } }
          }
        }
        if (ff) inst.off('progress', onProg);
        st.innerHTML = cancelled ? '<span style="color:var(--warn)">Abgebrochen.</span>' : '';
      } catch (e) {
        st.innerHTML = cancelled ? '<span style="color:var(--warn)">Abgebrochen.</span>' : `<span style="color:var(--bad)">Fehler: ${esc(e.message || e)}</span>`;
      }
      if (errs.length) st.innerHTML += `<div class="notice warn small" style="margin-top:8px">${errs.map(esc).join('<br>')}</div>`;
      showResults($('#res'), outs, `konvertiert_${fmt}.zip`);
      busy = false; $('#run').disabled = !files.length; $('#cancel').classList.add('hidden'); pg.classList.add('hidden');
    };
  }

  // ---------- Router ----------
  function render() {
    const id = location.hash.replace(/^#\/?/, '');
    window.scrollTo(0, 0);
    const t = TOOLS.find(x => x.id === id);
    document.title = (t ? t.title + ' · ' : '') + 'Konverter · F.A.B.I.';
    if (t) t.render(t); else renderHome();
  }
  window.addEventListener('hashchange', render);
  render();
})();
