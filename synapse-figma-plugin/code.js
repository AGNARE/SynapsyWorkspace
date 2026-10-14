// Плагин Synapse: собирает библиотеку компонентов из токенов дизайн-системы.
// Запускается один раз, создаёт страницу «Компоненты» и наборы вариантов.

const TOKENS = {
  appBg: "#F4F6F8", surface: "#FFFFFF", soft: "#F8FAFC", border: "#E2E8F0",
  lineSoft: "#F1F5F9", text: "#172033", muted: "#64748B", faint: "#94A3B8",
  brand: "#6366F1", action: "#4F46E5", accentBg: "#EEF2FF", accentBorder: "#C7D2FE",
  success: "#15803D", successBg: "#ECFDF3",
  warn: "#B45309", warnBg: "#FFF7ED",
  danger: "#B91C1C", dangerBg: "#FEF2F2",
  info: "#0369A1", infoBg: "#EFF6FF",
  neutral: "#475569", neutralBg: "#F1F5F9",
};

function hex(h) {
  const s = h.replace("#", "");
  return { r: parseInt(s.slice(0, 2), 16) / 255, g: parseInt(s.slice(2, 4), 16) / 255, b: parseInt(s.slice(4, 6), 16) / 255 };
}
const solid = (h, o) => { const f = { type: "SOLID", color: hex(h) }; if (o !== undefined) f.opacity = o; return f; };

function txt(chars, size, weight, color) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: weight };
  t.characters = chars;
  t.fontSize = size;
  t.fills = [solid(color)];
  return t;
}

// каркас компонента: авто-раскладка по центру, фиксированный размер
function comp(name, w, h, fill, stroke, strokeW, radius) {
  const c = figma.createComponent();
  c.name = name;
  c.resize(w, h);
  c.layoutMode = "HORIZONTAL";
  c.primaryAxisSizingMode = "FIXED";
  c.counterAxisSizingMode = "FIXED";
  c.primaryAxisAlignItems = "CENTER";
  c.counterAxisAlignItems = "CENTER";
  c.cornerRadius = radius === undefined ? 8 : radius;
  c.fills = fill ? [solid(fill)] : [];
  if (stroke) { c.strokes = [solid(stroke)]; c.strokeWeight = strokeW || 1; }
  return c;
}

function label(text, x, y) {
  const t = txt(text, 24, "Bold", TOKENS.text);
  t.x = x; t.y = y;
  return t;
}

const FONTS = ["Regular", "Medium", "Semi Bold", "Bold"];

(async () => {
  const created = [];
  // прогресс, чтобы было видно, что плагин жив
  const done = (name, count) => { created.push([name, count]); figma.notify(name + " готов", { timeout: 900 }); };
  figma.notify("Собираю компоненты…", { timeout: 1500 });

  for (const s of FONTS) await figma.loadFontAsync({ family: "Inter", style: s });

  // отдельная страница под библиотеку
  let page = figma.root.children.find(p => p.name === "Компоненты");
  if (!page) page = figma.createPage();
  page.name = "Компоненты";
  figma.currentPage = page;

  // ---------- 1. Кнопки ----------
  const buttonKinds = {
    Primary:   { bg: TOKENS.action,  fg: "#FFFFFF" },
    Secondary: { bg: TOKENS.surface, fg: TOKENS.text, stroke: TOKENS.border },
    Icon:      { bg: TOKENS.soft,    fg: TOKENS.muted, stroke: TOKENS.border },
    Danger:    { bg: TOKENS.danger,  fg: "#FFFFFF" },
  };
  const buttonHover = { Primary: "#4338CA", Secondary: TOKENS.soft, Icon: TOKENS.lineSoft, Danger: "#991B1B" };
  const buttonWidths = { Primary: 140, Secondary: 140, Icon: 36, Danger: 140 };
  const buttons = [];
  for (const kind of Object.keys(buttonKinds)) {
    for (const state of ["Default", "Hover", "Focus", "Disabled"]) {
      const k = buttonKinds[kind];
      let bg = k.bg, fg = k.fg, stroke = k.stroke, sw = 1;
      if (state === "Hover") bg = buttonHover[kind];
      if (state === "Focus") { stroke = TOKENS.brand; sw = 2; }
      if (state === "Disabled") { bg = TOKENS.lineSoft; fg = TOKENS.faint; stroke = null; }
      const w = kind === "Icon" ? 36 : 140;
      const c = comp(`Kind=${kind}, State=${state}`, w, 36, bg, stroke, sw);
      if (kind === "Icon") {
        const plus = txt("+", 16, "Semi Bold", fg);
        c.appendChild(plus);
      } else {
        c.paddingLeft = 16; c.paddingRight = 16;
        c.appendChild(txt("Кнопка", 13, "Semi Bold", fg));
      }
      buttons.push(c);
    }
  }
  const buttonSet = figma.combineAsVariants(buttons, page);
  buttonSet.name = "Button";
  done("Button", buttons.length);

  // ---------- 2. Поля ввода ----------
  const inputStates = {
    Default:  { bg: TOKENS.surface, stroke: TOKENS.border, sw: 1, fg: TOKENS.faint },
    Focus:    { bg: TOKENS.surface, stroke: TOKENS.brand,  sw: 2, fg: TOKENS.text },
    Error:    { bg: TOKENS.surface, stroke: TOKENS.danger, sw: 2, fg: TOKENS.danger },
    Disabled: { bg: TOKENS.soft,    stroke: TOKENS.border, sw: 1, fg: TOKENS.faint },
  };
  const inputs = [];
  for (const kind of ["Text", "Select"]) {
    for (const state of Object.keys(inputStates)) {
      const s = inputStates[state];
      const c = comp(`Kind=${kind}, State=${state}`, 240, 36, s.bg, s.stroke, s.sw);
      c.primaryAxisAlignItems = "MIN";
      c.paddingLeft = 12; c.paddingRight = 12;
      c.appendChild(txt(kind === "Select" ? "Значение" : "Поле ввода", 13, "Medium", s.fg));
      inputs.push(c);
    }
  }
  const inputSet = figma.combineAsVariants(inputs, page);
  inputSet.name = "Input";
  done("Input", inputs.length);

  // ---------- 3. Статусы ----------
  const statuses = [
    ["К выполнению", TOKENS.neutral, TOKENS.neutralBg],
    ["В работе", TOKENS.warn, TOKENS.warnBg],
    ["На проверке", TOKENS.action, TOKENS.accentBg],
    ["Заблокировано", TOKENS.danger, TOKENS.dangerBg],
    ["Готово", TOKENS.success, TOKENS.successBg],
    ["Архив", TOKENS.muted, TOKENS.lineSoft],
  ];
  const badges = statuses.map(([name, fg, bg]) => {
    const c = comp(`Status=${name}`, 132, 22, bg, null, 1, 999);
    c.appendChild(txt(name, 11, "Semi Bold", fg));
    return c;
  });
  const badgeSet = figma.combineAsVariants(badges, page);
  badgeSet.name = "Badge / Status";
  done("Badge / Status", badges.length);

  const priorities = [
    ["Высокий", TOKENS.danger, TOKENS.dangerBg],
    ["Средний", TOKENS.warn, TOKENS.warnBg],
    ["Низкий", TOKENS.neutral, TOKENS.neutralBg],
  ];
  const prio = priorities.map(([name, fg, bg]) => {
    const c = comp(`Priority=${name}`, 104, 22, bg, null, 1, 999);
    c.appendChild(txt(name, 11, "Semi Bold", fg));
    return c;
  });
  const prioSet = figma.combineAsVariants(prio, page);
  prioSet.name = "Badge / Priority";
  done("Badge / Priority", prio.length);

  // ---------- 4. Чипы ----------
  const chips = [["Default", TOKENS.surface, TOKENS.border, TOKENS.neutral], ["Active", TOKENS.accentBg, TOKENS.accentBorder, TOKENS.action]]
    .map(([state, bg, stroke, fg]) => {
      const c = comp(`State=${state}`, 96, 32, bg, stroke, 1);
      c.appendChild(txt("Чип", 12, state === "Active" ? "Semi Bold" : "Medium", fg));
      return c;
    });
  const chipSet = figma.combineAsVariants(chips, page);
  chipSet.name = "Chip";
  done("Chip", chips.length);

  // ---------- 5. Флажок и переключатель ----------
  const checks = [["Off", false], ["On", true]].map(([state, on]) => {
    const c = comp(`State=${state}`, 18, 18, on ? TOKENS.action : TOKENS.surface, on ? null : TOKENS.border, 1, 4);
    if (on) c.appendChild(txt("✓", 11, "Bold", "#FFFFFF"));
    return c;
  });
  const checkSet = figma.combineAsVariants(checks, page);
  checkSet.name = "Checkbox";
  done("Checkbox", checks.length);

  const toggles = [["Off", false], ["On", true]].map(([state, on]) => {
    const c = comp(`State=${state}`, 36, 20, on ? TOKENS.action : TOKENS.border, null, 1, 10);
    const knob = figma.createEllipse();
    knob.resize(16, 16);
    knob.fills = [solid(TOKENS.surface)];
    c.appendChild(knob);
    c.primaryAxisAlignItems = on ? "MAX" : "MIN";
    c.paddingLeft = on ? 0 : 2;
    c.paddingRight = on ? 2 : 0;
    return c;
  });
  const toggleSet = figma.combineAsVariants(toggles, page);
  toggleSet.name = "Toggle";
  done("Toggle", toggles.length);

  // ---------- 6. Аватар ----------
  const avatars = [16, 24, 32, 40].map(size => {
    const c = comp(`Size=${size}`, size, size, TOKENS.brand, null, 1, 999);
    c.appendChild(txt("А", Math.max(10, Math.round(size * 0.4)), "Bold", "#FFFFFF"));
    return c;
  });
  const avatarSet = figma.combineAsVariants(avatars, page);
  avatarSet.name = "Avatar";
  done("Avatar", avatars.length);

  // ---------- 7. Карточки ----------
  const cards = [];
  {
    const c = comp("Kind=Plain", 320, 120, TOKENS.surface, TOKENS.border, 1, 12);
    c.layoutMode = "VERTICAL";
    c.primaryAxisAlignItems = "MIN";
    c.counterAxisAlignItems = "MIN";
    c.paddingLeft = 20; c.paddingRight = 20; c.paddingTop = 20; c.paddingBottom = 20;
    c.itemSpacing = 8;
    c.appendChild(txt("Заголовок карточки", 15, "Bold", TOKENS.text));
    c.appendChild(txt("Пояснение в одну строку", 12, "Medium", TOKENS.muted));
    cards.push(c);
  }
  {
    const c = comp("Kind=KPI", 273, 88, TOKENS.surface, TOKENS.border, 1, 12);
    c.layoutMode = "VERTICAL";
    c.primaryAxisAlignItems = "MIN";
    c.counterAxisAlignItems = "MIN";
    c.paddingLeft = 20; c.paddingRight = 20; c.paddingTop = 16; c.paddingBottom = 16;
    c.itemSpacing = 4;
    c.appendChild(txt("Просрочено", 12, "Medium", TOKENS.muted));
    c.appendChild(txt("4", 28, "Bold", TOKENS.text));
    cards.push(c);
  }
  const cardSet = figma.combineAsVariants(cards, page);
  cardSet.name = "Card";
  done("Card", cards.length);

  // ---------- 8. Строка списка ----------
  const rows = [["Default", TOKENS.surface], ["Hover", TOKENS.soft], ["Selected", TOKENS.accentBg]].map(([state, bg]) => {
    const c = comp(`State=${state}`, 560, 48, bg, null, 1, 0);
    c.primaryAxisAlignItems = "MIN";
    c.paddingLeft = 20; c.paddingRight = 20;
    c.itemSpacing = 16;
    c.appendChild(txt("TASK-142", 12, "Semi Bold", TOKENS.action));
    c.appendChild(txt("Реализовать JWT-аутентификацию", 13, "Semi Bold", TOKENS.text));
    rows.push(c);
    return c;
  });
  const rowSet = figma.combineAsVariants(rows, page);
  rowSet.name = "Row / Task";
  done("Row / Task", rows.length);

  // ---------- раскладка: простой вертикальный столбец, без наложений ----------
  const sets = [buttonSet, inputSet, badgeSet, prioSet, chipSet, checkSet, toggleSet, avatarSet, cardSet, rowSet];
  let y = 0;
  for (const s of sets) {
    s.x = 0;
    s.y = y + 60;
    const l = label(s.name, 0, y);
    page.appendChild(l);
    y = s.y + s.height + 160;
  }

  // ---------- переменные цвета (если API доступен) ----------
  let varsInfo = "недоступны";
  try {
    const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Synapse");
    const coll = existing || figma.variables.createVariableCollection("Synapse");
    const mode = coll.modes[0].modeId;
    let n = 0;
    for (const [key, value] of Object.entries(TOKENS)) {
      const name = "Цвет/" + key;
      const found = figma.variables.getLocalVariables().find(v => v.name === name);
      const v = found || figma.variables.createVariable(name, coll, "COLOR");
      v.setValueForMode(mode, hex(value));
      n++;
    }
    varsInfo = n + " переменных";
  } catch (e) {
    varsInfo = "пропущены: " + e.message;
  }

  figma.currentPage.selection = [buttonSet];
  figma.viewport.scrollAndZoomIntoView(sets);

  const lines = created.map(([name, count]) => `${name} — ${count}`).join(", ");
  figma.closePlugin(`Готово. Компонентов: ${created.reduce((s, c) => s + c[1], 0)}. Наборы: ${lines}. Переменные: ${varsInfo}`);
})().catch(err => {
  // если что-то упало — показываем понятный текст, а не молчаливое зависание
  figma.notify("Ошибка сборки: " + err.message, { error: true, timeout: 8000 });
  figma.closePlugin("Остановлено: " + err.message);
});
