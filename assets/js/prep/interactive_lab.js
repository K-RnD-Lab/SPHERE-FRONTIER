const IL_STORAGE = 'master-prep-interactive-prep-v1';
const IL_BASE = 'assets/data/interactive_prep';

let ilIndex = null;
let ilTitles = {};
let ilRenderGen = 0;
let ilTopicRaw = null;
let ilTopicRawId = '';

function ilLoc(v) {
  return PrepLocale?.prepLoc(v) ?? (typeof v === 'string' ? v : v?.ua || '');
}

function ilT(key, ...args) {
  return SiteI18n?.t(key, ...args) ?? key;
}

function ilProgress() {
  try { return JSON.parse(localStorage.getItem(IL_STORAGE) || '{}'); } catch { return {}; }
}
function ilSave(p) {
  try { localStorage.setItem(IL_STORAGE, JSON.stringify(p)); } catch { /* */ }
}

function ilCountry(id) {
  return ilIndex?.countries?.find((c) => c.id === id) || null;
}

function ilIsCountryId(id) {
  return Boolean(ilCountry(id));
}

function ilFindTopicCountry(topicId) {
  for (const c of ilIndex?.countries || []) {
    for (const tr of c.tracks || []) {
      if (tr.topics.some((t) => t.id === topicId)) return c.id;
    }
  }
  return 'ua';
}

function ilRoute() {
  const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return { view: 'countries' };
  if (parts.length === 1) {
    if (ilIsCountryId(parts[0])) return { view: 'map', countryId: parts[0] };
    return { view: 'topic', countryId: ilFindTopicCountry(parts[0]), topicId: parts[0], levelId: 'L1' };
  }
  if (parts.length === 2) {
    if (ilIsCountryId(parts[0])) {
      return { view: 'topic', countryId: parts[0], topicId: parts[1], levelId: 'L1' };
    }
    return { view: 'topic', countryId: ilFindTopicCountry(parts[0]), topicId: parts[0], levelId: parts[1] || 'L1' };
  }
  if (ilIsCountryId(parts[0])) {
    return { view: 'topic', countryId: parts[0], topicId: parts[1], levelId: parts[2] || 'L1' };
  }
  return { view: 'topic', countryId: ilFindTopicCountry(parts[0]), topicId: parts[0], levelId: parts[2] || 'L1' };
}

async function ilFetch(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(path);
  return res.json();
}

function ilTopicTitle(id) {
  return ilLoc(ilTitles[id] || id);
}

async function ilLoadTopic(topicId) {
  if (ilTopicRawId !== topicId || !ilTopicRaw) {
    ilTopicRaw = await ilFetch(`${IL_BASE}/topics/${topicId}.json`);
    ilTopicRawId = topicId;
  }
  return PrepLocale.localizeTopic(ilTopicRaw);
}

function topicCardHtml(t) {
  const prog = ilProgress()[t.id] || {};
  const done = ['L1', 'L2', 'L3'].filter((l) => prog[l]).length;
  const title = ilTopicTitle(t.id);
  return `
    <button type="button" class="pl-topic-btn" data-topic="${t.id}">
      <strong>${t.emoji} ${PrepLevelsEngine.escapeHtml(title)}</strong><br>
      <span class="pl-topic-meta">${ilT('levelsProgress', done)}</span>
    </button>`;
}

function renderCountries(root) {
  const cards = (ilIndex.countries || []).map((c) => `
    <button type="button" class="pl-country-btn ${c.ready ? '' : 'stub'}" data-country="${c.id}" ${c.ready ? '' : 'disabled'}>
      <span class="pl-country-emoji">${c.emoji}</span>
      <strong>${PrepLevelsEngine.escapeHtml(ilLoc(c.label))}</strong>
      <span class="pl-country-sub">${PrepLevelsEngine.escapeHtml(ilLoc(c.subtitle || ''))}</span>
    </button>`).join('');

  root.innerHTML = `
    <p class="pl-note" data-i18n="introNote" data-i18n-html="1">${ilT('introNote')}</p>
    <section class="pl-card">
      <h2 data-i18n="countriesTitle">${ilT('countriesTitle')}</h2>
      <div class="pl-country-grid">${cards}</div>
    </section>`;

  root.querySelectorAll('[data-country]').forEach((btn) => {
    btn.addEventListener('click', () => { location.hash = `#/${btn.dataset.country}`; });
  });
}

function renderMap(root, countryId) {
  const country = ilCountry(countryId);
  if (!country) {
    root.innerHTML = `<p class="pl-card"><button type="button" class="ghost" id="il-home">${ilT('backCountries')}</button></p>`;
    root.querySelector('#il-home')?.addEventListener('click', () => { location.hash = '#/'; });
    return;
  }

  const external = (country.external || []).map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener">${PrepLevelsEngine.escapeHtml(ilLoc(l.label))}</a>`
  ).join('');

  const body = (country.tracks || []).map((tr) => {
    const grid = (tr.topics || []).map(topicCardHtml).join('');
    const trackSub = tr.subtitle ? `<p class="pl-stub-hint">${PrepLevelsEngine.escapeHtml(ilLoc(tr.subtitle))}</p>` : '';
    return `
      <section class="pl-track">
        <h3>${PrepLevelsEngine.escapeHtml(ilLoc(tr.label))}</h3>
        ${trackSub}
        <div class="pl-topic-grid">${grid}</div>
      </section>`;
  }).join('');

  root.innerHTML = `
    <nav class="pl-breadcrumb">
      <button type="button" class="ghost" id="il-back-country">${ilT('backCountries')}</button>
      <span>${country.emoji} ${PrepLevelsEngine.escapeHtml(ilLoc(country.label))}</span>
    </nav>
    ${external ? `<p class="pl-external"><span class="pl-ext-label">${ilT('officialDemo')}</span>${external}</p>` : ''}
    <section class="pl-card">
      <h2 data-i18n="topicsTitle">${ilT('topicsTitle')}</h2>
      <p class="pl-map-sub">${PrepLevelsEngine.escapeHtml(ilLoc(country.subtitle || ''))}</p>
      ${body}
    </section>`;

  root.querySelector('#il-back-country').addEventListener('click', () => { location.hash = '#/'; });
  root.querySelectorAll('[data-topic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      location.hash = `#/${countryId}/${btn.dataset.topic}/L1`;
    });
  });
}

function updateLevelTabs(tabsEl, levels, levelId, prog) {
  tabsEl.querySelectorAll('.pl-level-tab').forEach((tab, i) => {
    const level = levels[i];
    tab.classList.toggle('active', level.id === levelId);
    tab.classList.toggle('done', Boolean(prog[level.id]));
    tab.classList.toggle('needs-l1', level.id !== 'L1' && !prog.L1);
  });
}

function ilGoLevel(countryId, topicId, levelId) {
  const nextHash = `#/${countryId}/${topicId}/${levelId}`;
  if (location.hash === nextHash) render();
  else location.hash = nextHash;
}

function mountLevelBody(bodyEl, topic, topicId, levelId, countryId, gen) {
  const prog = ilProgress()[topicId] || {};
  const level = topic.levels.find((l) => l.id === levelId) || topic.levels[0];
  bodyEl.innerHTML = '';
  PrepLevelsEngine.renderLevel(bodyEl, level, (lid) => {
    if (gen !== ilRenderGen) return;
    const all = ilProgress();
    all[topicId] = { ...(all[topicId] || {}), [lid]: true };
    ilSave(all);
    const tabsEl = document.getElementById('il-tabs');
    if (tabsEl) updateLevelTabs(tabsEl, topic.levels, levelId, all[topicId]);
    if (lid === 'L1') mountLevelBody(bodyEl, topic, topicId, levelId, countryId, gen);
  }, {
    l1Incomplete: level.id !== 'L1' && !prog.L1,
    theoryComplete: level.id === 'L1' && Boolean(prog.L1),
    onGoTheory: () => ilGoLevel(countryId, topicId, 'L1'),
  });
}

async function renderTopic(root, countryId, topicId, levelId) {
  const gen = ++ilRenderGen;
  const country = ilCountry(countryId);

  let topic;
  try {
    topic = await ilLoadTopic(topicId);
  } catch {
    if (gen !== ilRenderGen) return;
    root.innerHTML = `
      <nav class="pl-breadcrumb">
        <button type="button" class="ghost" id="il-back-map">${ilT('backTopics')}</button>
      </nav>
      <p class="pl-card">${ilT('jsonMissing')}</p>`;
    root.querySelector('#il-back-map')?.addEventListener('click', () => { location.hash = `#/${countryId}`; });
    return;
  }
  if (gen !== ilRenderGen) return;

  const prog = ilProgress()[topicId] || {};
  const resolvedLevel = topic.levels.find((l) => l.id === levelId)?.id || topic.levels[0].id;

  const existing = root.querySelector('[data-il-topic-shell]');
  if (existing && existing.dataset.topicId === topicId) {
    root.querySelector('h2').textContent = topic.title;
    root.querySelector('.pl-map-sub').textContent = topic.subtitle || '';
    updateLevelTabs(root.querySelector('#il-tabs'), topic.levels, resolvedLevel, prog);
    mountLevelBody(root.querySelector('#il-body'), topic, topicId, resolvedLevel, countryId, gen);
    return;
  }

  root.innerHTML = `
    <nav class="pl-breadcrumb">
      <button type="button" class="ghost" id="il-back-map">← ${country ? PrepLevelsEngine.escapeHtml(ilLoc(country.label)) : ilT('backTopics')}</button>
    </nav>
    <section class="pl-card" data-il-topic-shell data-topic-id="${PrepLevelsEngine.escapeHtml(topicId)}">
      <h2>${PrepLevelsEngine.escapeHtml(topic.title)}</h2>
      <p class="pl-map-sub">${PrepLevelsEngine.escapeHtml(topic.subtitle || '')}</p>
      <div class="pl-level-tabs" id="il-tabs"></div>
      <div id="il-body"></div>
    </section>`;

  root.querySelector('#il-back-map').addEventListener('click', () => { location.hash = `#/${countryId}`; });

  const tabs = root.querySelector('#il-tabs');
  topic.levels.forEach((level, i) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `pl-level-tab ${level.id === resolvedLevel ? 'active' : ''} ${prog[level.id] ? 'done' : ''} ${level.id !== 'L1' && !prog.L1 ? 'needs-l1' : ''}`;
    tab.textContent = ilT('levelN', i + 1);
    tab.title = level.id === 'L1' ? ilT('levelTheory') : '';
    tab.addEventListener('click', () => {
      if (level.id !== resolvedLevel) ilGoLevel(countryId, topicId, level.id);
    });
    tabs.appendChild(tab);
  });

  mountLevelBody(root.querySelector('#il-body'), topic, topicId, resolvedLevel, countryId, gen);
}

async function render() {
  const root = document.getElementById('il-app');
  if (!ilIndex || !root) return;
  const route = ilRoute();

  if (route.view === 'countries') {
    ilTopicRaw = null;
    ilTopicRawId = '';
    renderCountries(root);
    SiteI18n?.apply(root);
    return;
  }
  if (route.view === 'map') {
    ilTopicRaw = null;
    ilTopicRawId = '';
    renderMap(root, route.countryId);
    SiteI18n?.apply(root);
    return;
  }
  await renderTopic(root, route.countryId, route.topicId, route.levelId);
}

async function boot() {
  try {
    [ilIndex, ilTitles] = await Promise.all([
      ilFetch(`${IL_BASE}/index.json`),
      ilFetch(`${IL_BASE}/_titles.json`),
    ]);
  } catch (e) {
    document.getElementById('il-app').innerHTML = `<p class="pl-card">Error: ${PrepLevelsEngine?.escapeHtml?.(e.message) || e.message}</p>`;
    return;
  }
  window.addEventListener('hashchange', render);
  window.addEventListener('site:langchange', () => {
    if (ilTopicRawId) ilTopicRaw = ilTopicRaw;
    render();
  });
  if (!location.hash || location.hash === '#') location.hash = '#/';
  await render();
}

boot();
