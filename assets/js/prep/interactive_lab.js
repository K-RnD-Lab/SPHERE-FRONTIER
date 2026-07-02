const IL_STORAGE = 'master-prep-interactive-prep-v1';
const IL_BASE = 'assets/data/interactive_prep';
const IL_SHOW_STUBS_KEY = 'master-prep-show-stubs';

let ilIndex = null;
let ilRenderGen = 0;
let ilTopicCache = null;
let ilTopicCacheId = '';

function ilT(key, ...args) {
  return SiteI18n?.t(key, ...args) ?? key;
}

function ilProgress() {
  try { return JSON.parse(localStorage.getItem(IL_STORAGE) || '{}'); } catch { return {}; }
}
function ilSave(p) {
  try { localStorage.setItem(IL_STORAGE, JSON.stringify(p)); } catch { /* */ }
}
function ilShowStubs() {
  return localStorage.getItem(IL_SHOW_STUBS_KEY) === '1';
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
    return {
      view: 'topic',
      countryId: ilFindTopicCountry(parts[0]),
      topicId: parts[0],
      levelId: parts[1] || 'L1',
    };
  }
  if (ilIsCountryId(parts[0])) {
    return { view: 'topic', countryId: parts[0], topicId: parts[1], levelId: parts[2] || 'L1' };
  }
  return {
    view: 'topic',
    countryId: ilFindTopicCountry(parts[0]),
    topicId: parts[0],
    levelId: parts[2] || 'L1',
  };
}

async function ilFetch(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(path);
  return res.json();
}

async function ilLoadTopic(topicId) {
  if (ilTopicCacheId === topicId && ilTopicCache) return ilTopicCache;
  ilTopicCache = await ilFetch(`${IL_BASE}/topics/${topicId}.json`);
  ilTopicCacheId = topicId;
  return ilTopicCache;
}

function topicCardHtml(t) {
  const prog = ilProgress()[t.id] || {};
  const done = ['L1', 'L2', 'L3'].filter((l) => prog[l]).length;
  if (t.stub) {
    return `
      <button type="button" class="pl-topic-btn stub" disabled>
        <strong>${t.emoji} ${PrepLevelsEngine.escapeHtml(t.title)}</strong><br>
        <span class="pl-topic-meta">${ilT('inDev')}</span>
      </button>`;
  }
  return `
    <button type="button" class="pl-topic-btn" data-topic="${t.id}">
      <strong>${t.emoji} ${PrepLevelsEngine.escapeHtml(t.title)}</strong><br>
      <span class="pl-topic-meta">${ilT('levelsProgress', done)}</span>
    </button>`;
}

function renderCountries(root) {
  const cards = (ilIndex.countries || []).map((c) => `
    <button type="button" class="pl-country-btn ${c.ready ? '' : 'stub'}" data-country="${c.id}" ${c.ready ? '' : 'disabled'}>
      <span class="pl-country-emoji">${c.emoji}</span>
      <strong>${PrepLevelsEngine.escapeHtml(c.label)}</strong>
      <span class="pl-country-sub">${PrepLevelsEngine.escapeHtml(c.subtitle || '')}</span>
      ${c.ready ? '' : `<span class="pl-topic-meta">${ilT('soon')}</span>`}
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
    root.innerHTML = `<p class="pl-card">${ilT('backCountries')} <button type="button" class="ghost" id="il-home">${ilT('backCountries')}</button></p>`;
    root.querySelector('#il-home')?.addEventListener('click', () => { location.hash = '#/'; });
    return;
  }

  const showStubs = ilShowStubs();
  const external = (country.external || []).map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener">${PrepLevelsEngine.escapeHtml(l.label)}</a>`
  ).join('');

  const body = (country.tracks || []).map((tr) => {
    const ready = tr.topics.filter((t) => !t.stub);
    const stubs = tr.topics.filter((t) => t.stub);
    const grid = ready.map(topicCardHtml).join('');
    const stubGrid = showStubs && stubs.length
      ? `<div class="pl-topic-grid pl-stub-grid">${stubs.map(topicCardHtml).join('')}</div>`
      : '';
    const stubNote = !showStubs && stubs.length
      ? `<p class="pl-stub-hint">+${stubs.length} ${ilT('inDev')}</p>`
      : '';
    return `
      <section class="pl-track">
        <h3>${PrepLevelsEngine.escapeHtml(tr.label)}</h3>
        <div class="pl-topic-grid">${grid || `<p class="pl-stub-hint">${ilT('soon')}</p>`}</div>
        ${stubNote}
        ${stubGrid}
      </section>`;
  }).join('');

  root.innerHTML = `
    <nav class="pl-breadcrumb">
      <button type="button" class="ghost" id="il-back-country">${ilT('backCountries')}</button>
      <span>${country.emoji} ${PrepLevelsEngine.escapeHtml(country.label)}</span>
    </nav>
    ${external ? `<p class="pl-external"><span class="pl-ext-label">${ilT('officialDemo')}</span>${external}</p>` : ''}
    <section class="pl-card">
      <div class="pl-map-head">
        <div>
          <h2 data-i18n="topicsTitle">${ilT('topicsTitle')}</h2>
          <p class="pl-map-sub">${PrepLevelsEngine.escapeHtml(country.subtitle || '')}</p>
        </div>
        <label class="pl-stub-toggle">
          <input type="checkbox" id="il-stub-toggle" ${showStubs ? 'checked' : ''}>
          <span data-i18n="showFuture">${ilT('showFuture')}</span>
        </label>
      </div>
      ${body}
    </section>`;

  root.querySelector('#il-back-country').addEventListener('click', () => { location.hash = '#/'; });
  root.querySelector('#il-stub-toggle')?.addEventListener('change', (e) => {
    localStorage.setItem(IL_SHOW_STUBS_KEY, e.target.checked ? '1' : '0');
    renderMap(root, countryId);
  });
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
  if (location.hash === nextHash) {
    render();
  } else {
    location.hash = nextHash;
  }
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
    updateLevelTabs(root.querySelector('#il-tabs'), topic.levels, resolvedLevel, prog);
    mountLevelBody(root.querySelector('#il-body'), topic, topicId, resolvedLevel, countryId, gen);
    return;
  }

  root.innerHTML = `
    <nav class="pl-breadcrumb">
      <button type="button" class="ghost" id="il-back-map">← ${country ? PrepLevelsEngine.escapeHtml(country.label) : ilT('backTopics')}</button>
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
    tab.dataset.levelId = level.id;
    tab.addEventListener('click', () => {
      if (level.id === resolvedLevel) return;
      ilGoLevel(countryId, topicId, level.id);
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
    ilTopicCache = null;
    ilTopicCacheId = '';
    renderCountries(root);
    return;
  }
  if (route.view === 'map') {
    ilTopicCache = null;
    ilTopicCacheId = '';
    renderMap(root, route.countryId);
    return;
  }
  await renderTopic(root, route.countryId, route.topicId, route.levelId);
}

async function boot() {
  try {
    ilIndex = await ilFetch(`${IL_BASE}/index.json`);
  } catch (e) {
    document.getElementById('il-app').innerHTML = `<p class="pl-card">Помилка: ${PrepLevelsEngine?.escapeHtml?.(e.message) || e.message}</p>`;
    return;
  }
  const hero = document.querySelector('.hero');
  if (hero) SiteI18n.mountLangSelect(hero, { onChange: () => render() });
  SiteI18n.apply(document);
  window.addEventListener('hashchange', render);
  if (!location.hash || location.hash === '#') location.hash = '#/';
  await render();
}

boot();
