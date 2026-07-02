/* Shared UI i18n — mt_lang: ua | en (trainer-compatible) */
(function initSiteI18n(global) {
  const STR = {
    ua: {
      langLabel: 'Мова інтерфейсу',
      qLangLabel: 'Мова питань',
      qLangEnOnly: 'English (іспит SET)',
      qLangUkEn: 'Українська / English',
      qLangUkSoon: 'Банк українською — незабаро; поки English',
      levelN: (n) => `Рівень ${n}`,
      levelTheory: 'Теорія',
      backToTheory: '← Повернутись до теорії (рівень 1)',
      l1Incomplete: 'Рівень 1 ще не позначено як прочитаний — спочатку натисни «Прочитала».',
      theoryDone: 'Прочитала — далі ✓',
      theoryRead: '✓ Теорію пройдено',
      theoryReread: 'Перечитати',
      check: 'Перевірити',
      checkOrder: 'Перевірити порядок',
      reset: 'Скинути',
      hint: 'Підказка',
      okBlank: '✅ Збірка правильна!',
      okOrder: '✅ Порядок вірний!',
      okMatch: '✅ Усі пари зібрано!',
      wrongPair: '❌ Не та пара.',
      wrongOrder: '❌ Ще не так — подумай про логіку кроків.',
      wrongBlank: 'Очікується',
      countriesTitle: 'Де готуєшся?',
      topicsTitle: 'Теми',
      backCountries: '← Країни',
      backTopics: '← Теми',
      showFuture: 'Показати майбутні',
      levelsProgress: (d) => `${d}/3 рівнів`,
      inDev: 'у розробці',
      soon: 'незабаром',
      introNote: 'Спочатку обери <strong>країну / контекст іспиту</strong>. Потім — тему з трьома рівнями. Тести з варіантами — у <a href="trainer.html">Trainer</a>.',
      officialDemo: 'Офіційні демо:',
      jsonMissing: 'JSON для цієї теми ще не додано.',
      unknownLevel: 'Невідомий тип рівня.',
      prepTitle: 'Інтерактивна підготовка',
      prepLede: 'Спочатку країна й іспит — потім теми з трьома рівнями. MCQ — у Trainer.',
      guideTitle: 'Посібник MASTER PREP v25',
      guideLede: 'Веб-доповнення до PDF. Повний текст — у PDF; тут — оновлення та лінки на інтерактив.',
      trainerLink: '← Trainer (MCQ)',
      guideLink: '📘 Посібник v25',
      interactiveLink: '🧩 Інтерактив',
      analyticsLink: 'Analytics',
      labLink: 'R&D Lab'
    },
    en: {
      langLabel: 'Interface language',
      qLangLabel: 'Question language',
      qLangEnOnly: 'English (SET exam)',
      qLangUkEn: 'Ukrainian / English',
      qLangUkSoon: 'Ukrainian bank coming soon; using English for now',
      levelN: (n) => `Level ${n}`,
      levelTheory: 'Theory',
      backToTheory: '← Back to theory (level 1)',
      l1Incomplete: 'Level 1 not marked as read — tap “Done reading” first.',
      theoryDone: 'Done reading — next ✓',
      theoryRead: '✓ Theory completed',
      theoryReread: 'Read again',
      check: 'Check',
      checkOrder: 'Check order',
      reset: 'Reset',
      hint: 'Hint',
      okBlank: '✅ Correct!',
      okOrder: '✅ Correct order!',
      okMatch: '✅ All pairs matched!',
      wrongPair: '❌ Not a match.',
      wrongOrder: '❌ Not yet — think about the steps.',
      wrongBlank: 'Expected',
      countriesTitle: 'Where are you preparing?',
      topicsTitle: 'Topics',
      backCountries: '← Countries',
      backTopics: '← Topics',
      showFuture: 'Show upcoming',
      levelsProgress: (d) => `${d}/3 levels`,
      inDev: 'in development',
      soon: 'coming soon',
      introNote: 'Pick <strong>country / exam context</strong> first, then a topic with three levels. Multiple-choice tests are in <a href="trainer.html">Trainer</a>.',
      officialDemo: 'Official demos:',
      jsonMissing: 'JSON for this topic is not added yet.',
      unknownLevel: 'Unknown level type.',
      prepTitle: 'Interactive prep',
      prepLede: 'Country and exam first — then topics with three levels. MCQ in Trainer.',
      guideTitle: 'MASTER PREP Exam Guide v25',
      guideLede: 'Web supplement to the PDF. Full text in PDF; updates and interactive links here.',
      trainerLink: '← Trainer (MCQ)',
      guideLink: '📘 Guide v25',
      interactiveLink: '🧩 Interactive',
      analyticsLink: 'Analytics',
      labLink: 'R&D Lab'
    }
  };

  function norm(lang) {
    return lang === 'en' ? 'en' : 'ua';
  }

  function getLang() {
    return norm(localStorage.getItem('mt_lang') || 'ua');
  }

  function setLang(lang) {
    const l = norm(lang);
    localStorage.setItem('mt_lang', l);
    document.documentElement.lang = l === 'en' ? 'en' : 'uk';
    return l;
  }

  function t(key, ...args) {
    const pack = STR[getLang()] || STR.ua;
    const val = pack[key];
    if (typeof val === 'function') return val(...args);
    return val ?? STR.ua[key] ?? key;
  }

  function apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      const v = t(k);
      if (v && v !== k) {
        if (el.dataset.i18nHtml === '1') el.innerHTML = v;
        else el.textContent = v;
      }
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const v = t(el.dataset.i18nPlaceholder);
      if (v) el.placeholder = v;
    });
  }

  function mountLangSelect(container, { onChange } = {}) {
    if (!container || container.querySelector('.site-lang-select')) return;
    const wrap = document.createElement('label');
    wrap.className = 'site-lang-select';
    wrap.style.cssText = 'font-size:13px;color:var(--muted);display:flex;align-items:center;gap:8px;margin:8px 0';
    const span = document.createElement('span');
    span.dataset.i18n = 'langLabel';
    span.textContent = t('langLabel');
    const sel = document.createElement('select');
    sel.innerHTML = '<option value="ua">Українська</option><option value="en">English</option>';
    sel.value = getLang();
    sel.addEventListener('change', () => {
      setLang(sel.value);
      span.textContent = t('langLabel');
      apply(container.closest('main') || document);
      if (onChange) onChange(getLang());
    });
    wrap.append(span, sel);
    container.prepend(wrap);
  }

  setLang(getLang());

  global.SiteI18n = { t, getLang, setLang, apply, mountLangSelect, STR };
})(window);
