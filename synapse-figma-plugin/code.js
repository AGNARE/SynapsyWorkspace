// Плагин Synapse: собирает дизайн-систему.
//
// Что делает:
//   1. Коллекцию переменных «Synapse» с двумя режимами — Light (как в 19 экранах)
//      и Dark (новая Aurora). Цвета и радиусы.
//   2. Наборы компонентов, привязанные к переменным: Button, Input, Badge,
//      Chip, Checkbox, Toggle, Avatar, Card, Row и Icon.
//   3. Набор иконок — 28 штук.
//
// Благодаря привязке к переменным значение меняется в одном месте и расходится
// по всем компонентам, инстансам и обеим темам.

const PAGE_NAME = "Design System";
const COLLECTION = "Synapse";

// ---------------------------------------------------------------- значения
// Светлая — та, что в согласованных 19 экранах. Тёмная — направление Aurora.
const TOKENS = {
  bg:          { Light: "#F4F6F8", Dark: "#070B14" },
  surface:     { Light: "#FFFFFF", Dark: "#101728" },
  surfaceSoft: { Light: "#F8FAFC", Dark: "#16203A" },
  raised:      { Light: "#FFFFFF", Dark: "#1B2540" },
  border:      { Light: "#E2E8F0", Dark: "#26314F" },
  borderSoft:  { Light: "#F1F5F9", Dark: "#1A2338" },
  text:        { Light: "#172033", Dark: "#EDF1FF" },
  textMuted:   { Light: "#64748B", Dark: "#9AA4C0" },
  textFaint:   { Light: "#94A3B8", Dark: "#626C88" },
  brand:       { Light: "#6366F1", Dark: "#7C5CFF" },
  action:      { Light: "#4F46E5", Dark: "#7C5CFF" },
  actionHover: { Light: "#4338CA", Dark: "#8F73FF" },
  actionBg:    { Light: "#EEF2FF", Dark: "#212C4C" },
  accentLine:  { Light: "#C7D2FE", Dark: "#3B4A7A" },
  success:     { Light: "#15803D", Dark: "#2BD9A0" },
  successBg:   { Light: "#ECFDF3", Dark: "#0F2E28" },
  warn:        { Light: "#B45309", Dark: "#FFB020" },
  warnBg:      { Light: "#FFF7ED", Dark: "#33260F" },
  danger:      { Light: "#B91C1C", Dark: "#FF5C7A" },
  dangerBg:    { Light: "#FEF2F2", Dark: "#341826" },
  info:        { Light: "#0369A1", Dark: "#5CB8FF" },
  infoBg:      { Light: "#EFF6FF", Dark: "#122438" },
  neutral:     { Light: "#475569", Dark: "#8C96B4" },
  neutralBg:   { Light: "#F1F5F9", Dark: "#1B2540" },
  onAction:    { Light: "#FFFFFF", Dark: "#FFFFFF" },
};

const NUMBERS = {
  "radius/control": { Light: 8, Dark: 12 },
  "radius/card":    { Light: 12, Dark: 20 },
  "radius/pill":    { Light: 999, Dark: 999 },
};

// ---------------------------------------------------------------- иконки
// 24×24, обводка. Стрелки, действия, объекты, статусы.
const ICONS = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 18l-6-6 6-6",
  "arrow-up-right": "M7 17L17 7M8 7h9v9",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 6l6 6-6 6",
  "chevron-up": "M6 15l6-6 6 6",
  "search": "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",
  "plus": "M12 5v14M5 12h14",
  "minus": "M5 12h14",
  "check": "M5 13l4 4L19 7",
  "close": "M6 6l12 12M18 6L6 18",
  "more": "M6 12h.01M12 12h.01M18 12h.01",
  "folder": "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z",
  "file": "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z",
  "calendar": "M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  "user": "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6",
  "users": "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2 20c0-2.8 3.1-5 7-5s7 2.2 7 5M17 5.2a3.5 3.5 0 0 1 0 6.6M19 15.5c1.8.7 3 1.9 3 3.5",
  "bell": "M18 15V10a6 6 0 1 0-12 0v5l-1.5 3h15L18 15zM10 21h4",
  "settings": "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4",
  "filter": "M3 5h18l-7 8v6l-4 2v-8L3 5z",
  "link": "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  "star": "M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z",
  "clock": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2",
  "alert": "M12 9v4M12 17h.01M10.3 3.9L2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  "info": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 16v-5M12 8h.01",
  "trash": "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6",
  "edit": "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z",
  "eye": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  "lock": "M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1M9 11V8a3 3 0 0 1 6 0v3",
  "home": "M3 10.5L12 3l9 7.5M5 10v10h14V10",
  "grid": "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  "list": "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01",
  "board": "M4 5h4v11H4zM10 5h4v7h-4zM16 5h4v15h-4z",
  "sparkle": "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  "graph": "M7.7 6.6l8.6 10.8M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  "git": "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 3v6M12 15v6",
  "gantt": "M4 4v16M4 6h8M4 12h12M4 18h6",
};

const FONTS = ["Regular", "Medium", "Semi Bold", "Bold"];

// ---------------------------------------------------------------- хелперы
function hex(h) {
  const s = h.replace("#", "");
  return { r: parseInt(s.slice(0, 2), 16) / 255,
           g: parseInt(s.slice(2, 4), 16) / 255,
           b: parseInt(s.slice(4, 6), 16) / 255 };
}
const solid = (h) => ({ type: "SOLID", color: hex(h) });

const report = { variables: 0, modes: [], components: 0, sets: [], icons: 0, failed: [] };
const VARS = {};
const MODE = {};

function txt(chars, size, weight, colorVar) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: weight };
  t.characters = chars;
  t.fontSize = size;
  t.fills = [paint(colorVar)];
  return t;
}

/** Заливка или обводка, привязанная к переменной цвета. */
function paint(varName) {
  const v = VARS[varName];
  const p = solid("#000000");
  if (!v) return p;
  try { return figma.variables.setBoundVariableForPaint(p, "color", v); }
  catch (e) { return p; }
}

function bindRadius(node, varName) {
  const v = VARS[varName];
  if (!v) return;
  try { node.setBoundVariable("cornerRadius", v); } catch (e) { /* необязательно */ }
}

function comp(name, w, h, fillVar, radiusVar, strokeVar) {
  const c = figma.createComponent();
  c.name = name;
  c.resize(w, h);
  c.layoutMode = "HORIZONTAL";
  c.primaryAxisSizingMode = "FIXED";
  c.counterAxisSizingMode = "FIXED";
  c.primaryAxisAlignItems = "CENTER";
  c.counterAxisAlignItems = "CENTER";
  c.fills = fillVar ? [paint(fillVar)] : [];
  if (radiusVar) bindRadius(c, radiusVar);
  if (strokeVar) { c.strokes = [paint(strokeVar)]; c.strokeWeight = 1; }
  return c;
}

function label(text, x, y, name) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: "Bold" };
  t.characters = text;
  t.fontSize = 24;
  t.fills = [solid("#172033")];
  t.x = x;
  t.y = y;
  t.name = name || "подпись";
  return t;
}

// ---------------------------------------------------------------- запуск
(async () => {
  if (!figma.variables || !figma.variables.createVariableCollection) {
    figma.closePlugin("В этой версии Figma нет переменных — плагин не сможет собрать систему.");
    return;
  }
  for (const s of FONTS) await figma.loadFontAsync({ family: "Inter", style: s });

  let page = figma.root.children.find(p => p.name === PAGE_NAME);
  if (!page) page = figma.createPage();
  page.name = PAGE_NAME;
  figma.currentPage = page;

  // ---- переменные
  const collections = figma.variables.getLocalVariableCollections();
  let coll = collections.find(c => c.name === COLLECTION);
  if (!coll) coll = figma.variables.createVariableCollection(COLLECTION);

  const first = coll.modes[0].modeId;
  try { coll.renameMode(first, "Light"); } catch (e) { /* уже переименован */ }
  MODE.Light = first;
  const dark = coll.modes.find(m => m.name === "Dark");
  MODE.Dark = dark ? dark.modeId : coll.addMode("Dark");
  report.modes = ["Light", "Dark"];

  const existing = figma.variables.getLocalVariables();
  function makeVar(name, type, values) {
    let v = existing.find(x => x.name === name && x.variableCollectionId === coll.id);
    if (!v) {
      try { v = figma.variables.createVariable(name, coll, type); }
      catch (e) { v = figma.variables.createVariable(name, coll.id, type); }
      report.variables++;
    }
    for (const mode of Object.keys(values)) {
      v.setValueForMode(MODE[mode], type === "COLOR" ? hex(values[mode]) : values[mode]);
    }
    VARS[name] = v;
    return v;
  }
  for (const [name, modes] of Object.entries(TOKENS)) makeVar("color/" + name, "COLOR", modes);
  for (const [name, modes] of Object.entries(NUMBERS)) makeVar(name, "FLOAT", modes);

  // ---- чистим прежние наборы с нашими именами, чтобы не плодить дубли
  const OUR_SETS = ["Button", "Input", "Badge / Status", "Badge / Priority", "Chip",
                    "Checkbox", "Toggle", "Avatar", "Card", "Row / Task", "Icon"];
  for (const ch of [...page.children]) {
    if (ch.type === "COMPONENT_SET" && OUR_SETS.includes(ch.name)) ch.remove();
    else if (ch.type === "TEXT" && ch.name.indexOf("подпись-") === 0) ch.remove();
  }

  // ---- кнопки
  const KINDS = {
    Primary:   { fill: "color/action",   fg: "color/onAction",  stroke: null,           w: 148 },
    Secondary: { fill: "color/surface",  fg: "color/text",      stroke: "color/border", w: 148 },
    Ghost:     { fill: null,             fg: "color/textMuted", stroke: null,           w: 148 },
    Danger:    { fill: "color/danger",   fg: "color/onAction",  stroke: null,           w: 148 },
    Icon:      { fill: "color/surface",  fg: "color/textMuted", stroke: "color/border", w: 36 },
  };
  const buttons = [];
  for (const kind of Object.keys(KINDS)) {
    const k = KINDS[kind];
    for (const state of ["Default", "Hover", "Focus", "Disabled"]) {
      let fill = k.fill;
      if (state === "Disabled") fill = "color/neutralBg";
      else if (state === "Hover" && k.fill === "color/action") fill = "color/actionHover";
      const stroke = state === "Focus" ? "color/brand" : (state === "Disabled" ? null : k.stroke);
      const fg = state === "Disabled" ? "color/textFaint" : k.fg;
      const c = comp(`Kind=${kind}, State=${state}`, kind === "Icon" ? 36 : 148, 36, fill, "radius/control", stroke);
      if (kind === "Icon") {
        c.appendChild(txt("+", 16, "Semi Bold", fg));
      } else {
        c.paddingLeft = 16;
        c.paddingRight = 16;
        c.appendChild(txt("Кнопка", 13, "Semi Bold", fg));
      }
      buttons.push(c);
    }
  }
  const setButton = figma.combineAsVariants(buttons, page);
  setButton.name = "Button";
  report.sets.push(["Button", buttons.length]);

  // ---- поля
  const inputs = [];
  for (const kind of ["Text", "Select"]) {
    for (const state of ["Default", "Focus", "Error", "Disabled"]) {
      const fill = state === "Disabled" ? "color/surfaceSoft" : "color/surface";
      const stroke = state === "Focus" ? "color/brand" : state === "Error" ? "color/danger" : "color/border";
      const fg = state === "Error" ? "color/danger" : "color/textFaint";
      const c = comp(`Kind=${kind}, State=${state}`, 248, 40, fill, "radius/control", stroke);
      c.primaryAxisAlignItems = "MIN";
      c.paddingLeft = 12;
      c.paddingRight = 12;
      c.appendChild(txt(kind === "Select" ? "Значение" : "Поле ввода", 13, "Medium", fg));
      inputs.push(c);
    }
  }
  const setInput = figma.combineAsVariants(inputs, page);
  setInput.name = "Input";
  report.sets.push(["Input", inputs.length]);

  // ---- бейджи
  const STATUS = [["К выполнению", "color/neutral", "color/neutralBg"],
                  ["В работе", "color/warn", "color/warnBg"],
                  ["На проверке", "color/info", "color/infoBg"],
                  ["Заблокировано", "color/danger", "color/dangerBg"],
                  ["Готово", "color/success", "color/successBg"],
                  ["Архив", "color/textMuted", "color/borderSoft"]];
  const badges = STATUS.map(pair => {
    const c = comp(`Status=${pair[0]}`, 136, 24, pair[2], "radius/pill", null);
    c.appendChild(txt(pair[0], 11, "Semi Bold", pair[1]));
    return c;
  });
  const setBadge = figma.combineAsVariants(badges, page);
  setBadge.name = "Badge / Status";
  report.sets.push(["Badge / Status", badges.length]);

  const PRIO = [["Высокий", "color/danger", "color/dangerBg"],
                ["Средний", "color/warn", "color/warnBg"],
                ["Низкий", "color/neutral", "color/neutralBg"]];
  const prios = PRIO.map(pair => {
    const c = comp(`Priority=${pair[0]}`, 104, 24, pair[2], "radius/pill", null);
    c.appendChild(txt(pair[0], 11, "Semi Bold", pair[1]));
    return c;
  });
  const setPrio = figma.combineAsVariants(prios, page);
  setPrio.name = "Badge / Priority";
  report.sets.push(["Badge / Priority", prios.length]);

  // ---- чипы
  const chips = [["Default", "color/surface", "color/textMuted", "color/border"],
                 ["Active", "color/actionBg", "color/action", "color/accentLine"]]
    .map(row => {
      const c = comp(`State=${row[0]}`, 96, 32, row[1], "radius/control", row[3]);
      c.appendChild(txt("Чип", 12, row[0] === "Active" ? "Semi Bold" : "Medium", row[2]));
      return c;
    });
  const setChip = figma.combineAsVariants(chips, page);
  setChip.name = "Chip";
  report.sets.push(["Chip", chips.length]);

  // ---- флажок и переключатель
  const checks = [["Off", false], ["On", true]].map(pair => {
    const on = pair[1];
    const c = comp(`State=${pair[0]}`, 20, 20, on ? "color/action" : "color/surface",
                   "radius/control", on ? null : "color/border");
    if (on) c.appendChild(txt("✓", 12, "Bold", "color/onAction"));
    return c;
  });
  const setCheck = figma.combineAsVariants(checks, page);
  setCheck.name = "Checkbox";
  report.sets.push(["Checkbox", checks.length]);

  const toggles = [["Off", false], ["On", true]].map(pair => {
    const on = pair[1];
    const c = comp(`State=${pair[0]}`, 40, 22, on ? "color/action" : "color/border", "radius/pill", null);
    const knob = figma.createEllipse();
    knob.resize(18, 18);
    knob.fills = [paint("color/surface")];
    c.appendChild(knob);
    c.primaryAxisAlignItems = on ? "MAX" : "MIN";
    c.paddingLeft = on ? 0 : 2;
    c.paddingRight = on ? 2 : 0;
    return c;
  });
  const setToggle = figma.combineAsVariants(toggles, page);
  setToggle.name = "Toggle";
  report.sets.push(["Toggle", toggles.length]);

  // ---- аватары
  const avatars = [16, 24, 32, 40].map(size => {
    const c = comp(`Size=${size}`, size, size, "color/action", "radius/pill", null);
    c.appendChild(txt("А", Math.max(9, Math.round(size * 0.42)), "Bold", "color/onAction"));
    return c;
  });
  const setAvatar = figma.combineAsVariants(avatars, page);
  setAvatar.name = "Avatar";
  report.sets.push(["Avatar", avatars.length]);

  // ---- карточки
  const cards = [];
  {
    const c = comp("Kind=Plain", 320, 120, "color/surface", "radius/card", "color/border");
    c.layoutMode = "VERTICAL";
    c.primaryAxisAlignItems = "MIN";
    c.counterAxisAlignItems = "MIN";
    c.paddingLeft = 20; c.paddingRight = 20; c.paddingTop = 20; c.paddingBottom = 20;
    c.itemSpacing = 8;
    c.appendChild(txt("Заголовок карточки", 15, "Bold", "color/text"));
    c.appendChild(txt("Пояснение в одну строку", 12, "Medium", "color/textMuted"));
    cards.push(c);
  }
  {
    const c = comp("Kind=KPI", 273, 96, "color/surface", "radius/card", "color/border");
    c.layoutMode = "VERTICAL";
    c.primaryAxisAlignItems = "MIN";
    c.counterAxisAlignItems = "MIN";
    c.paddingLeft = 20; c.paddingRight = 20; c.paddingTop = 16; c.paddingBottom = 16;
    c.itemSpacing = 4;
    c.appendChild(txt("Просрочено", 12, "Medium", "color/textMuted"));
    c.appendChild(txt("4", 28, "Bold", "color/text"));
    cards.push(c);
  }
  const setCard = figma.combineAsVariants(cards, page);
  setCard.name = "Card";
  report.sets.push(["Card", cards.length]);

  // ---- строка таблицы
  const rows = [["Default", "color/surface"], ["Hover", "color/surfaceSoft"], ["Selected", "color/actionBg"]]
    .map(pair => {
      const c = comp(`State=${pair[0]}`, 720, 48, pair[1], null, null);
      c.primaryAxisAlignItems = "MIN";
      c.paddingLeft = 20;
      c.paddingRight = 20;
      c.itemSpacing = 16;
      c.appendChild(txt("TASK-142", 12, "Semi Bold", "color/action"));
      c.appendChild(txt("Реализовать JWT-аутентификацию", 13, "Semi Bold", "color/text"));
      return c;
    });
  const setRow = figma.combineAsVariants(rows, page);
  setRow.name = "Row / Task";
  report.sets.push(["Row / Task", rows.length]);

  // ---- иконки
  const icons = [];
  for (const name of Object.keys(ICONS)) {
    try {
      const c = figma.createComponent();
      c.name = `Name=${name}`;
      c.resize(24, 24);
      c.fills = [];
      const v = figma.createVector();
      v.vectorPaths = [{ windingRule: "NONZERO", data: ICONS[name] }];
      v.fills = [];
      v.strokes = [paint("color/textMuted")];
      v.strokeWeight = 1.6;
      v.strokeCap = "ROUND";
      v.strokeJoin = "ROUND";
      c.appendChild(v);
      v.x = Math.round((24 - v.width) / 2);
      v.y = Math.round((24 - v.height) / 2);
      icons.push(c);
      report.icons++;
    } catch (e) {
      report.failed.push(name);
    }
  }
  if (icons.length) {
    const setIcon = figma.combineAsVariants(icons, page);
    setIcon.name = "Icon";
    report.sets.push(["Icon", icons.length]);
  }

  // ---- раскладка наборов в столбец
  const all = [setButton, setInput, setBadge, setPrio, setChip, setCheck, setToggle,
               setAvatar, setCard, setRow]
    .concat(page.children.filter(c => c.type === "COMPONENT_SET" && c.name === "Icon"));
  let y = 0;
  for (const s of all) {
    s.x = 0;
    s.y = y + 60;
    page.appendChild(label(s.name, 0, y, "подпись-" + s.name));
    y = s.y + s.height + 140;
  }
  report.components = report.sets.reduce((sum, pair) => sum + pair[1], 0);

  figma.viewport.scrollAndZoomIntoView(all);
  const lines = report.sets.map(pair => `${pair[0]} ${pair[1]}`).join(", ");
  figma.closePlugin(
    `Готово. Переменных ${report.variables}, режимы ${report.modes.join(" / ")}. ` +
    `Компонентов ${report.components}: ${lines}.` +
    (report.failed.length ? ` Иконки не вышли: ${report.failed.join(", ")}` : "")
  );
})().catch(err => {
  // Показываем, до чего успело дойти: так понятно, где именно споткнулись
  const done = report.sets.map(pair => `${pair[0]} ${pair[1]}`).join(", ") || "ничего";
  figma.notify("Ошибка сборки: " + err.message + ". Успело собраться: " + done,
               { error: true, timeout: 12000 });
  figma.closePlugin("Остановлено: " + err.message);
});
