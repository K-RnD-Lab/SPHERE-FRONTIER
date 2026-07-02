/* Resolve bilingual fields in prep topic JSON */
(function initPrepLocale(global) {
  function lang() {
    return global.SiteI18n?.getLang?.() || 'ua';
  }

  function prepLoc(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    const l = lang();
    return v[l] || v.ua || v.en || '';
  }

  function localizeLevel(level) {
    const l = lang();
    const copy = { ...level };
    copy.title = prepLoc(level.title);
    copy.instruction = prepLoc(level.instruction);

    if (level.type === 'theory') {
      copy.diagram = prepLoc(level.diagram);
      copy.bullets = (level.bullets || []).map(prepLoc);
      if (level.pairs?.length) {
        copy.pairs = level.pairs.map((p) => {
          if (Array.isArray(p)) return [prepLoc(p[0]), prepLoc(p[1])];
          return p;
        });
      }
    }

    if (level.type === 'fill_blanks') {
      const enPack = level._l2_en || level._en;
      if (l === 'en' && enPack?.template) {
        copy.template = enPack.template;
        copy.answers = enPack.answers || level.answers;
        copy.wordBank = enPack.wordBank || level.wordBank;
        copy.hints = (enPack.hints || level.hints || []).map((h) =>
          typeof h === 'string' ? h : prepLoc(h)
        );
      } else {
        copy.template = prepLoc(level.template);
        copy.answers = level.answers;
        copy.wordBank = level.wordBank;
        copy.hints = (level.hints || []).map((h) =>
          typeof h === 'string' ? h : prepLoc(h)
        );
      }
    }

    if (level.type === 'match_pairs') {
      copy.pairs = (level.pairs || []).map((p) => ({
        left: prepLoc(p.left),
        right: prepLoc(p.right),
      }));
    }

    if (level.type === 'drag_order') {
      copy.items = level.items;
    }

    return copy;
  }

  function localizeTopic(topic) {
    if (!topic) return topic;
    return {
      ...topic,
      title: prepLoc(topic.title),
      subtitle: prepLoc(topic.subtitle),
      levels: (topic.levels || []).map(localizeLevel),
    };
  }

  global.PrepLocale = { prepLoc, localizeTopic, localizeLevel };
})(window);
