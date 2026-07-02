/* Prep Levels Engine — fill blanks, drag, match, theory (Gemini-style levels) */
(function initPrepLevelsEngine(global) {
  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function mountTheory(root, level) {
    const wrap = document.createElement('div');
    wrap.className = 'pl-theory';
    if (level.diagram) {
      const pre = document.createElement('pre');
      pre.className = 'pl-diagram';
      pre.textContent = level.diagram;
      wrap.appendChild(pre);
    }
    if (level.bullets?.length) {
      const ul = document.createElement('ul');
      level.bullets.forEach((b) => {
        const li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
    }
    if (level.pairs?.length) {
      level.pairs.forEach(([a, b]) => {
        const row = document.createElement('p');
        row.className = 'pl-pair';
        row.innerHTML = `<strong>${escapeHtml(a)}</strong> ↔ ${escapeHtml(b)}`;
        wrap.appendChild(row);
      });
    }
    root.appendChild(wrap);
  }

  function mountFillBlanks(root, level, onComplete) {
    const answers = level.answers || [];
    const filled = answers.map(() => '');
    let slot = 0;
    const bank = shuffle([...(level.wordBank || answers)]);

    const templateEl = document.createElement('div');
    templateEl.className = 'pl-blank-template';
    const feedback = document.createElement('p');
    feedback.className = 'pl-feedback';

    function renderTemplate() {
      const parts = level.template.split('____');
      templateEl.innerHTML = parts.map((part, i) => {
        const blank = i < answers.length
          ? `<span class="pl-slot ${filled[i] ? 'filled' : 'empty'}" data-i="${i}">${escapeHtml(filled[i] || '____')}</span>`
          : '';
        return `${escapeHtml(part)}${blank}`;
      }).join('');
    }

    const bankEl = document.createElement('div');
    bankEl.className = 'pl-word-bank';
    bank.forEach((word) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'pl-chip';
      chip.textContent = word;
      chip.addEventListener('click', () => {
        if (slot >= answers.length) return;
        filled[slot] = word;
        slot += 1;
        renderTemplate();
      });
      bankEl.appendChild(chip);
    });

    const actions = document.createElement('div');
    actions.className = 'pl-actions';
    const check = document.createElement('button');
    check.type = 'button';
    check.textContent = 'Перевірити';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'ghost';
    reset.textContent = 'Скинути';
    const hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'ghost';
    hint.textContent = 'Підказка';
    let hintsUsed = 0;
    const hints = level.hints || [];

    check.addEventListener('click', () => {
      const ok = answers.every((a, i) => filled[i] === a);
      feedback.textContent = ok
        ? '✅ Збірка правильна!'
        : `❌ Перевір порядок. Очікується: ${answers.join(', ')}`;
      if (ok && onComplete) onComplete(level.id);
    });
    reset.addEventListener('click', () => {
      filled.fill('');
      slot = 0;
      renderTemplate();
      feedback.textContent = '';
    });
    hint.addEventListener('click', () => {
      if (hints[hintsUsed]) {
        feedback.textContent = `💡 ${hints[hintsUsed]}`;
        hintsUsed += 1;
      }
    });

    actions.append(check, reset, hint);
    renderTemplate();
    root.append(templateEl, bankEl, actions, feedback);
  }

  function mountDragOrder(root, level, onComplete) {
    const order = shuffle(level.items);
    const list = document.createElement('div');
    list.className = 'pl-drag-list';
    order.forEach((text) => {
      const item = document.createElement('div');
      item.className = 'pl-drag-item';
      item.draggable = true;
      item.textContent = text;
      item.dataset.value = text;
      item.addEventListener('dragstart', () => item.classList.add('dragging'));
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      item.addEventListener('dragover', (e) => e.preventDefault());
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragging = list.querySelector('.dragging');
        if (!dragging || dragging === item) return;
        const nodes = [...list.children];
        if (nodes.indexOf(dragging) < nodes.indexOf(item)) item.after(dragging);
        else item.before(dragging);
      });
      list.appendChild(item);
    });
    const feedback = document.createElement('p');
    feedback.className = 'pl-feedback';
    const check = document.createElement('button');
    check.type = 'button';
    check.textContent = 'Перевірити порядок';
    check.addEventListener('click', () => {
      const current = [...list.children].map((n) => n.dataset.value);
      const ok = current.every((v, i) => v === level.items[i]);
      feedback.textContent = ok ? '✅ Порядок вірний!' : '❌ Ще не так — подумай про логіку кроків.';
      if (ok && onComplete) onComplete(level.id);
    });
    root.append(list, check, feedback);
  }

  function mountMatch(root, level, onComplete) {
    const leftItems = level.pairs.map((p) => p.left);
    const rightItems = shuffle(level.pairs.map((p) => p.right));
    let selected = null;
    let matched = 0;
    const feedback = document.createElement('p');
    feedback.className = 'pl-feedback';
    const grid = document.createElement('div');
    grid.className = 'pl-match-grid';
    const leftCol = document.createElement('div');
    const rightCol = document.createElement('div');

    leftItems.forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pl-match-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        leftCol.querySelectorAll('.pl-match-btn').forEach((b) => b.classList.remove('sel'));
        btn.classList.add('sel');
        selected = text;
      });
      leftCol.appendChild(btn);
    });

    rightItems.forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pl-match-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        if (!selected) return;
        const pair = level.pairs.find((p) => p.left === selected && p.right === text);
        if (pair) {
          btn.classList.add('done');
          leftCol.querySelector('.sel')?.classList.add('done');
          selected = null;
          matched += 1;
          if (matched === level.pairs.length) {
            feedback.textContent = '✅ Усі пари зібрано!';
            if (onComplete) onComplete(level.id);
          }
        } else {
          feedback.textContent = '❌ Не та пара.';
          selected = null;
          leftCol.querySelectorAll('.pl-match-btn').forEach((b) => b.classList.remove('sel'));
        }
      });
      rightCol.appendChild(btn);
    });

    grid.append(leftCol, rightCol);
    root.append(grid, feedback);
  }

  function renderLevel(container, level, onComplete) {
    const head = document.createElement('div');
    head.className = 'pl-level-head';
    head.innerHTML = `<h3>${escapeHtml(level.title)}</h3><p>${escapeHtml(level.instruction || '')}</p>`;
    const body = document.createElement('div');
    container.append(head, body);

    switch (level.type) {
      case 'theory': {
        mountTheory(body, level);
        if (onComplete) {
          const doneBtn = document.createElement('button');
          doneBtn.type = 'button';
          doneBtn.className = 'pl-theory-done';
          doneBtn.textContent = 'Прочитала — далі ✓';
          doneBtn.addEventListener('click', () => {
            doneBtn.disabled = true;
            onComplete(level.id);
          });
          body.appendChild(doneBtn);
        }
        break;
      }
      case 'fill_blanks':
        mountFillBlanks(body, level, onComplete);
        break;
      case 'drag_order':
        mountDragOrder(body, level, onComplete);
        break;
      case 'match_pairs':
        mountMatch(body, level, onComplete);
        break;
      default:
        body.textContent = 'Невідомий тип рівня.';
    }
  }

  global.PrepLevelsEngine = { renderLevel, escapeHtml };
})(window);
