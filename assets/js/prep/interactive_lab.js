const IL_STORAGE = 'master-prep-interactive-prep-v1';
const IL_BASE = 'assets/data/interactive_prep';

let ilIndex = null;

function ilProgress() {
  try { return JSON.parse(localStorage.getItem(IL_STORAGE) || '{}'); } catch { return {}; }
}
function ilSave(p) {
  try { localStorage.setItem(IL_STORAGE, JSON.stringify(p)); } catch { /* */ }
}

function ilRoute() {
  const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return { view: 'map' };
  return { view: 'topic', topicId: parts[0], levelId: parts[1] || 'L1' };
}

async function ilFetch(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(path);
  return res.json();
}

function ilAllTopics() {
  if (ilIndex.tracks?.length) {
    return ilIndex.tracks.flatMap((tr) => tr.topics.map((t) => ({ ...t, trackLabel: tr.label })));
  }
  return ilIndex.topics || [];
}

function topicCardHtml(t) {
  const prog = ilProgress()[t.id] || {};
  const done = ['L1', 'L2', 'L3'].filter((l) => prog[l]).length;
  return `
    <button type="button" class="pl-topic-btn ${t.stub ? 'stub' : ''}" data-topic="${t.id}" ${t.stub ? 'disabled' : ''}>
      <strong>${t.emoji} ${PrepLevelsEngine.escapeHtml(t.title)}</strong><br>
      <span style="font-size:13px;color:var(--muted)">${t.stub ? 'скоро' : `${done}/3`}</span>
    </button>`;
}

function renderMap(root) {
  const external = (ilIndex.external || []).map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener">${PrepLevelsEngine.escapeHtml(l.label)}</a>`
  ).join('');

  let body = '';
  if (ilIndex.tracks?.length) {
    body = ilIndex.tracks.map((tr) => `
      <section class="pl-track">
        <h3>${PrepLevelsEngine.escapeHtml(tr.label)}</h3>
        <div class="pl-topic-grid">${tr.topics.map(topicCardHtml).join('')}</div>
      </section>`).join('');
  } else {
    body = `<div class="pl-topic-grid">${ilAllTopics().map(topicCardHtml).join('')}</div>`;
  }

  root.innerHTML = `
    <p class="pl-note">MCQ і симуляції — у <a href="trainer.html">Trainer</a>. Тут рівні 1→2→3: схема, заглушки, drag/match. JSON оновлюється на роки вперед без переписування коду.</p>
    ${external ? `<p class="pl-external"><span style="color:var(--muted);margin-right:6px">Зовнішні банки:</span>${external}</p>` : ''}
    <section class="pl-card">
      <h2>${PrepLevelsEngine.escapeHtml(ilIndex.title || 'Теми')}</h2>
      <p style="color:var(--muted);margin-top:0">${PrepLevelsEngine.escapeHtml(ilIndex.subtitle || '')}</p>
      ${body}
    </section>`;

  root.querySelectorAll('[data-topic]').forEach((btn) => {
    btn.addEventListener('click', () => { location.hash = `#/${btn.dataset.topic}/L1`; });
  });
}

async function renderTopic(root, topicId, levelId) {
  let topic;
  try {
    topic = await ilFetch(`${IL_BASE}/topics/${topicId}.json`);
  } catch {
    root.innerHTML = '<p class="pl-card">Тема ще в доробці — додамо JSON у assets/data/interactive_prep/topics/.</p>';
    return;
  }
  const prog = ilProgress()[topicId] || {};
  root.innerHTML = `
    <section class="pl-card">
      <button type="button" class="ghost" id="il-back">← Мапа</button>
      <h2>${PrepLevelsEngine.escapeHtml(topic.title)}</h2>
      <p style="color:var(--muted)">${PrepLevelsEngine.escapeHtml(topic.subtitle || '')}</p>
      <div class="pl-level-tabs" id="il-tabs"></div>
      <div id="il-body"></div>
    </section>`;
  root.querySelector('#il-back').addEventListener('click', () => { location.hash = '#/'; });

  const tabs = root.querySelector('#il-tabs');
  const body = root.querySelector('#il-body');
  topic.levels.forEach((level, i) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `pl-level-tab ${level.id === levelId ? 'active' : ''} ${prog[level.id] ? 'done' : ''}`;
    tab.textContent = `Рівень ${i + 1}`;
    tab.addEventListener('click', () => { location.hash = `#/${topicId}/${level.id}`; });
    tabs.appendChild(tab);
  });

  const level = topic.levels.find((l) => l.id === levelId) || topic.levels[0];
  body.innerHTML = '';
  PrepLevelsEngine.renderLevel(body, level, (lid) => {
    const all = ilProgress();
    all[topicId] = { ...(all[topicId] || {}), [lid]: true };
    ilSave(all);
    renderTopic(root, topicId, levelId);
  });
}

async function render() {
  const root = document.getElementById('il-app');
  if (!ilIndex) return;
  const route = ilRoute();
  if (route.view === 'map') renderMap(root);
  else await renderTopic(root, route.topicId, route.levelId);
}

async function boot() {
  try {
    ilIndex = await ilFetch(`${IL_BASE}/index.json`);
  } catch (e) {
    document.getElementById('il-app').innerHTML = `<p class="pl-card">Помилка завантаження: ${PrepLevelsEngine?.escapeHtml?.(e.message) || e.message}</p>`;
    return;
  }
  window.addEventListener('hashchange', render);
  await render();
}

boot();
