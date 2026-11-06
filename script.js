/**
 * Спортивний клуб APEX — Ядро клієнтської логіки v3.1 (build 197) RS3
 * Автор і розробник: Максим Ковалишин, © 2026. Усі права захищено.
 */
(function () {
  "use strict";

  const APP_VERSION = "v3.1 (build 197) RS3";
  const THEME_KEY = "apex-ui-theme";
  const FONT_KEY = "apex-font-scale";
  const PLAN_KEY = "apex-saved-topics-v21";

  const THEMES_META = [
    { id: "obsidian", name: "Вулкан", sub: "Obsidian Ember", bg: "#080b12", card: "#151c2e", accent: "#ff5e3a", icon: "flame" },
    { id: "daylight", name: "Кварц", sub: "Arctic Daylight", bg: "#f3f6fb", card: "#ffffff", accent: "#2563eb", icon: "sun" },
    { id: "biolab", name: "Біолаб", sub: "Emerald Pulse", bg: "#051116", card: "#0f2631", accent: "#10b981", icon: "activity" },
    { id: "amethyst", name: "Імпульс", sub: "Royal Amethyst", bg: "#0a0715", card: "#1b1535", accent: "#8b5cf6", icon: "sparkles" },
    { id: "titan", name: "Титан", sub: "Gold Titanium", bg: "#0b0c0f", card: "#1b1e26", accent: "#f59e0b", icon: "award" },
    { id: "cyber", name: "Крига", sub: "Sapphire Cyber", bg: "#040b16", card: "#0e1f38", accent: "#38bdf8", icon: "snowflake" },
    { id: "crimson", name: "Рубін", sub: "Crimson Nitro • RS3", bg: "#0c0609", card: "#211019", accent: "#f43f5e", icon: "crimson" },
    { id: "nordic", name: "Срібло", sub: "Nordic Light • RS3", bg: "#f2f7f6", card: "#ffffff", accent: "#0d9488", icon: "leaf" }
  ];

  const VALID_THEMES = THEMES_META.map(function (t) { return t.id; });

  /* --------------------------------------------------------------------------
     1. Розширена векторна система піктограм та іконок SVG (RS3 Vector Engine)
     -------------------------------------------------------------------------- */
  const ICONS = {
    apex: '<path d="M12 2.6L21.2 20.4H16.8L12 10.9L7.2 20.4H2.8L12 2.6Z" fill="currentColor" stroke="none"/><path d="M3.5 16.4H8.6L10.1 13.5L12.1 18.5L13.9 15L15.2 16.4H20.5" stroke="currentColor" stroke-width="1.9" fill="none"/><circle cx="12" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>',
    home: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".8" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".8" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".8" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".8" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.43-.18-.83-.44-1.12-.29-.29-.44-.65-.44-1.12a1.64 1.64 0 0 1 1.67-1.67h1.99c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    snowflake: '<line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
    crimson: '<polygon points="12 2 21 9 17 21 7 21 3 9 12 2"/><polyline points="3 9 12 14 21 9"/><line x1="12" y1="14" x2="12" y2="21"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    dumbbell: '<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
    barbell: '<line x1="2" y1="12" x2="22" y2="12"/><rect x="4" y="6" width="3" height="12" rx="1"/><rect x="17" y="6" width="3" height="12" rx="1"/><line x1="2" y1="9" x2="2" y2="15"/><line x1="22" y1="9" x2="22" y2="15"/>',
    disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/>',
    radar: '<polygon points="12 2 21 8.5 17.5 19.5 6.5 19.5 3 8.5 12 2"/><polygon points="12 7 16.5 10.2 14.8 15.8 9.2 15.8 7.5 10.2 12 7"/><line x1="12" y1="2" x2="12" y2="12"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><circle cx="12" cy="14" r="1.5"/>',
    brain: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/>',
    wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    watch: '<circle cx="12" cy="12" r="6"/><polyline points="12 10 12 12 13.5 13.5"/><path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"/><path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"/>',
    waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    footprints: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>',
    bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>',
    medal: '<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><circle cx="12" cy="17" r="5"/>',
    dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m7 18 2.5 2.5"/>',
    flask: '<path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/><line x1="10" y1="11" x2="10" y2="13"/><line x1="14" y1="11" x2="14" y2="13"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    wand: '<path d="m15 4-1 1 6 6 1-1a2.83 2.83 0 1 0-4-4Z"/><path d="m13 6-9 9a2.83 2.83 0 1 0 4 4l9-9"/><path d="m6 3 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    timer: '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',
    soundOff: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>'
  };

  function svgIcon(name, extraClass) {
    const body = ICONS[name] || ICONS.sparkles;
    return (
      '<svg class="ico' +
      (extraClass ? " " + extraClass : "") +
      '" viewBox="0 0 24 24" aria-hidden="true">' +
      body +
      "</svg>"
    );
  }

  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      const name = el.getAttribute("data-icon");
      el.innerHTML = svgIcon(name);
    });
  }

  /* --------------------------------------------------------------------------
     2. Toast-сповіщення RS3
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message, iconName) {
    let toast = document.getElementById("rs2-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "rs2-toast";
      toast.className = "rs2-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.innerHTML = svgIcon(iconName || "check") + "<span>" + message + "</span>";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2900);
  }

  /* --------------------------------------------------------------------------
     3. Керування 8 колірними темами, theme-color метатегом і масштабом шрифту
     -------------------------------------------------------------------------- */
  function applyTheme(themeName, persist, notify) {
    const chosen = VALID_THEMES.includes(themeName) ? themeName : "obsidian";
    document.documentElement.setAttribute("data-theme", chosen);

    const found = THEMES_META.find(function (t) { return t.id === chosen; });
    if (found) {
      const metaColor = document.querySelector('meta[name="theme-color"]');
      if (metaColor) metaColor.setAttribute("content", found.bg);
    }

    document.querySelectorAll("[data-set-theme]").forEach(function (btn) {
      const isMatch = btn.getAttribute("data-set-theme") === chosen;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
    });

    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, chosen);
      } catch (err) {}
    }

    if (notify && found) {
      showToast("Активовано тему «" + found.name + "» (" + found.sub + ")", found.icon);
    }
  }

  function applyFontScale(scale, persist) {
    const valid = ["normal", "lg", "xl"].includes(scale) ? scale : "normal";
    if (valid === "normal") {
      document.documentElement.removeAttribute("data-font-scale");
    } else {
      document.documentElement.setAttribute("data-font-scale", valid);
    }
    document.querySelectorAll("[data-set-font]").forEach(function (btn) {
      const active = btn.getAttribute("data-set-font") === valid;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (persist) {
      try {
        localStorage.setItem(FONT_KEY, valid);
      } catch (err) {}
    }
  }

  function initAppearance() {
    let savedTheme = "obsidian";
    let savedFont = "normal";
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (VALID_THEMES.includes(t)) savedTheme = t;
      const f = localStorage.getItem(FONT_KEY);
      if (f) savedFont = f;
    } catch (err) {}

    applyTheme(savedTheme, false, false);
    applyFontScale(savedFont, false);

    document.addEventListener("click", function (e) {
      const themeBtn = e.target.closest("[data-set-theme]");
      if (themeBtn) {
        applyTheme(themeBtn.getAttribute("data-set-theme"), true, true);
      }
      const fontBtn = e.target.closest("[data-set-font]");
      if (fontBtn) {
        applyFontScale(fontBtn.getAttribute("data-set-font"), true);
        showToast("Масштаб типографіки оновлено", "sliders");
      }
      const printBtn = e.target.closest("[data-print-page]");
      if (printBtn) {
        window.print();
      }
      const shareBtn = e.target.closest("[data-share-page]");
      if (shareBtn) {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            showToast("Посилання на матеріал скопійовано у буфер обміну", "share");
          });
        } else {
          showToast("Адреса сторінки готова до поширення", "share");
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Адаптивне мобільне меню
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primary-navigation");
    if (!toggle || !nav) return;

    function setMenuState(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = svgIcon(open ? "close" : "menu");
      toggle.setAttribute(
        "aria-label",
        open ? "Закрити меню навігації" : "Відкрити меню навігації"
      );
    }

    toggle.innerHTML = svgIcon("menu");

    toggle.addEventListener("click", function () {
      setMenuState(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenuState(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setMenuState(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. Фільтрація категорій (розклад та 12 тренувальних тем)
     -------------------------------------------------------------------------- */
  function updateTableCounterBadge(table) {
    if (!table || !table.tBodies[0]) return;
    const card = table.closest(".table-card");
    if (!card) return;
    const badge = card.querySelector(".table-count-pill");
    if (!badge) return;
    const allRows = Array.from(table.tBodies[0].rows).filter(function (r) {
      return !r.classList.contains("empty-search-row");
    });
    const visible = allRows.filter(function (r) { return !r.hidden; });
    badge.innerHTML = svgIcon("grid") + "<span>" + visible.length + " / " + allRows.length + "</span>";
  }

  function initCategoryFilters() {
    document.querySelectorAll("[data-filter-bar]").forEach(function (bar) {
      const targetSelector = bar.getAttribute("data-filter-bar");
      const items = document.querySelectorAll(targetSelector);
      const buttons = bar.querySelectorAll("[data-filter]");

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const category = btn.getAttribute("data-filter");
          buttons.forEach(function (b) {
            const active = b === btn;
            b.classList.toggle("active", active);
            b.setAttribute("aria-pressed", active ? "true" : "false");
          });
          items.forEach(function (item) {
            const tags = (item.getAttribute("data-category") || "").split(/\s+/);
            const match = category === "all" || tags.includes(category);
            item.hidden = !match;
          });
          if (items[0] && items[0].closest(".modern-table")) {
            updateTableCounterBadge(items[0].closest(".modern-table"));
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Модернізовані таблиці RS3: Живий лічильник + Копіювання + CSV + Щільність
     -------------------------------------------------------------------------- */
  function cleanCellText(cell) {
    return cell.textContent
      .replace(/[↕↑↓]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function copyTableToClipboard(table) {
    const rows = Array.from(table.querySelectorAll("thead tr, tbody tr")).filter(function (r) {
      return !r.hidden && !r.classList.contains("empty-search-row");
    });
    const text = rows
      .map(function (row) {
        return Array.from(row.cells).map(cleanCellText).join("\t");
      })
      .join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Таблицю скопійовано у буфер обміну (для Excel / Docs)", "copy");
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(ta);
      showToast("Таблицю скопійовано у буфер обміну", "copy");
    }
  }

  function exportTableToCSV(table, filename) {
    const rows = Array.from(table.querySelectorAll("thead tr, tbody tr")).filter(function (r) {
      return !r.hidden && !r.classList.contains("empty-search-row");
    });

    const csvLines = rows.map(function (row) {
      return Array.from(row.cells)
        .map(function (cell) {
          return '"' + cleanCellText(cell).replace(/"/g, '""') + '"';
        })
        .join(";");
    });

    const blob = new Blob(["\uFEFF" + csvLines.join("\r\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "apex-table-rs3.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Таблицю експортовано у файл CSV", "download");
  }

  function initModernTables() {
    /* Сортування, клік-фіксація рядків та авто-кнопки RS3 у кожному тулбарі */
    document.querySelectorAll(".table-card").forEach(function (card, idx) {
      const table = card.querySelector(".modern-table");
      if (!table) return;

      const toolbar = card.querySelector(".table-toolbar");
      if (toolbar) {
        let controls = toolbar.querySelector(".table-controls");
        if (!controls) {
          controls = document.createElement("div");
          controls.className = "table-controls";
          toolbar.appendChild(controls);
        }

        const countBadge = document.createElement("span");
        countBadge.className = "table-count-pill";
        countBadge.title = "Кількість відображених рядків із загальної кількості";
        controls.insertBefore(countBadge, controls.firstChild);

        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "table-tool-btn";
        copyBtn.innerHTML = svgIcon("copy") + "<span>Копія</span>";
        copyBtn.title = "Скопіювати дані таблиці у буфер обміну";
        copyBtn.addEventListener("click", function () {
          copyTableToClipboard(table);
        });

        const densityBtn = document.createElement("button");
        densityBtn.type = "button";
        densityBtn.className = "table-tool-btn";
        densityBtn.innerHTML = svgIcon("sliders") + "<span>Щільність</span>";
        densityBtn.title = "Перемкнути компактний або стандартний вигляд таблиці";
        densityBtn.addEventListener("click", function () {
          const compact = table.classList.toggle("compact");
          showToast(compact ? "Увімкнено компактний режим таблиці" : "Увімкнено стандартний режим таблиці", "sliders");
        });

        const csvBtn = document.createElement("button");
        csvBtn.type = "button";
        csvBtn.className = "table-tool-btn";
        csvBtn.innerHTML = svgIcon("download") + "<span>CSV</span>";
        csvBtn.title = "Завантажити таблицю у форматі CSV для Excel";
        csvBtn.addEventListener("click", function () {
          exportTableToCSV(table, (table.id || "apex-data-" + (idx + 1)) + ".csv");
        });

        controls.appendChild(copyBtn);
        controls.appendChild(densityBtn);
        controls.appendChild(csvBtn);
        updateTableCounterBadge(table);
      }

      if (table.tBodies[0]) {
        table.tBodies[0].addEventListener("click", function (e) {
          const row = e.target.closest("tr");
          if (!row || row.classList.contains("empty-search-row")) return;
          row.classList.toggle("row-pinned");
        });
      }

      const headers = table.querySelectorAll("thead th[data-sort]");
      const tbody = table.tBodies[0];
      if (!headers.length || !tbody) return;

      headers.forEach(function (th) {
        th.tabIndex = 0;
        if (!th.querySelector(".sort-indicator")) {
          const icon = document.createElement("span");
          icon.className = "sort-indicator";
          icon.setAttribute("aria-hidden", "true");
          icon.textContent = "↕";
          th.appendChild(icon);
        }

        function triggerSort() {
          const type = th.getAttribute("data-sort");
          const currentDir = th.getAttribute("aria-sort");
          const nextDir = currentDir === "ascending" ? "descending" : "ascending";

          headers.forEach(function (other) {
            other.removeAttribute("aria-sort");
            const ind = other.querySelector(".sort-indicator");
            if (ind) ind.textContent = "↕";
          });

          th.setAttribute("aria-sort", nextDir);
          const indicator = th.querySelector(".sort-indicator");
          if (indicator) indicator.textContent = nextDir === "ascending" ? "↑" : "↓";

          const actualIndex = Array.prototype.indexOf.call(th.parentNode.children, th);
          const rows = Array.from(tbody.rows).filter(function (r) {
            return !r.classList.contains("empty-search-row");
          });

          rows.sort(function (rowA, rowB) {
            const cellA = rowA.cells[actualIndex];
            const cellB = rowB.cells[actualIndex];
            const rawA = cellA ? (cellA.getAttribute("data-value") || cellA.textContent.trim()) : "";
            const rawB = cellB ? (cellB.getAttribute("data-value") || cellB.textContent.trim()) : "";

            let cmp = 0;
            if (type === "num") {
              const numA = parseFloat(rawA.replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
              const numB = parseFloat(rawB.replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
              cmp = numA - numB;
            } else {
              cmp = rawA.localeCompare(rawB, "uk", { sensitivity: "base" });
            }
            return nextDir === "ascending" ? cmp : -cmp;
          });

          rows.forEach(function (r) { tbody.appendChild(r); });
        }

        th.addEventListener("click", triggerSort);
        th.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerSort();
          }
        });
      });
    });

    /* Живий пошук у таблицях */
    document.querySelectorAll("[data-table-search]").forEach(function (input) {
      const selector = input.getAttribute("data-table-search");
      const table = document.querySelector(selector);
      if (!table || !table.tBodies[0]) return;
      const tbody = table.tBodies[0];

      input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();
        let visibleCount = 0;

        Array.from(tbody.rows).forEach(function (row) {
          if (row.classList.contains("empty-search-row")) return;
          const matched = !query || row.textContent.toLowerCase().includes(query);
          row.hidden = !matched;
          if (matched) visibleCount += 1;
        });

        let emptyRow = tbody.querySelector(".empty-search-row");
        if (visibleCount === 0) {
          if (!emptyRow) {
            emptyRow = document.createElement("tr");
            emptyRow.className = "empty-search-row";
            const td = document.createElement("td");
            td.colSpan = table.tHead ? table.tHead.rows[0].cells.length : 6;
            td.style.textAlign = "center";
            td.style.padding = "1.35rem";
            td.textContent = "За введеним запитом збігів не знайдено. Змініть критерій пошуку.";
            emptyRow.appendChild(td);
            tbody.appendChild(emptyRow);
          }
          emptyRow.hidden = false;
        } else if (emptyRow) {
          emptyRow.hidden = true;
        }
        updateTableCounterBadge(table);
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Потрійна обчислювальна лабораторія на article.html (ЧСС + 1ПМ + КБЖВ)
     -------------------------------------------------------------------------- */
  function initPerformanceCalculators() {
    const ageInput = document.getElementById("hr-age");
    const restInput = document.getElementById("hr-rest");
    const hrMaxOut = document.getElementById("hr-max-val");
    const hrZonesList = document.getElementById("hr-zones-output");

    if (ageInput && restInput && hrMaxOut && hrZonesList) {
      function updateHeartZones() {
        const age = Math.min(90, Math.max(14, parseInt(ageInput.value, 10) || 20));
        const rest = Math.min(110, Math.max(38, parseInt(restInput.value, 10) || 58));
        const hrMax = Math.round(208 - 0.7 * age);
        const hrr = Math.max(40, hrMax - rest);

        hrMaxOut.textContent = hrMax + " уд/хв (резерв: " + hrr + " уд/хв)";
        const zones = [
          { name: "Z1 • Регенерація (50–60%)", min: 0.5, max: 0.6, cls: "badge-z1" },
          { name: "Z2 • Аеробна база (60–70%)", min: 0.6, max: 0.7, cls: "badge-z2" },
          { name: "Z3 • Темпова (70–80%)", min: 0.7, max: 0.8, cls: "badge-z3" },
          { name: "Z4 • Поріг ПАНО (80–90%)", min: 0.8, max: 0.9, cls: "badge-z4" },
          { name: "Z5 • VO2max пік (90–100%)", min: 0.9, max: 1.0, cls: "badge-z5" }
        ];
        hrZonesList.innerHTML = zones
          .map(function (z) {
            const low = Math.round(rest + hrr * z.min);
            const high = Math.round(rest + hrr * z.max);
            return '<li><span>' + z.name + '</span><span class="badge ' + z.cls + '">' + low + "–" + high + " уд/хв</span></li>";
          })
          .join("");
      }
      ageInput.addEventListener("input", updateHeartZones);
      restInput.addEventListener("input", updateHeartZones);
      updateHeartZones();
    }

    const weightInput = document.getElementById("rm-weight");
    const repsInput = document.getElementById("rm-reps");
    const rmMaxOut = document.getElementById("rm-max-val");
    const rmZonesOut = document.getElementById("rm-zones-output");

    if (weightInput && repsInput && rmMaxOut && rmZonesOut) {
      function updateOneRepMax() {
        const w = Math.min(450, Math.max(10, parseFloat(weightInput.value) || 80));
        const r = Math.min(20, Math.max(1, parseInt(repsInput.value, 10) || 6));
        const oneRm = r === 1 ? w : w * (1 + r / 30);
        const rounded = Math.round(oneRm * 2) / 2;
        rmMaxOut.textContent = rounded.toFixed(1) + " кг (за Еплі)";

        const brackets = [
          { label: "Сила (87% • 3–4 повт.)", pct: 0.87, cls: "badge-z5" },
          { label: "Пауербілдинг (78% • 6–8 повт.)", pct: 0.78, cls: "badge-z4" },
          { label: "Гіпертрофія (70% • 10–12 повт.)", pct: 0.7, cls: "badge-z2" },
          { label: "Швидкість / Deload (60%)", pct: 0.6, cls: "badge-z1" }
        ];
        rmZonesOut.innerHTML = brackets
          .map(function (b) {
            const val = (Math.round(oneRm * b.pct * 2) / 2).toFixed(1);
            return '<li><span>' + b.label + '</span><span class="badge ' + b.cls + '">' + val + " кг</span></li>";
          })
          .join("");
      }
      weightInput.addEventListener("input", updateOneRepMax);
      repsInput.addEventListener("input", updateOneRepMax);
      updateOneRepMax();
    }

    const macroMass = document.getElementById("macro-mass");
    const macroHeight = document.getElementById("macro-height");
    const macroAge = document.getElementById("macro-age");
    const macroActivity = document.getElementById("macro-activity");
    const macroGoal = document.getElementById("macro-goal");
    const macroList = document.getElementById("macro-output");

    if (macroMass && macroHeight && macroAge && macroActivity && macroGoal && macroList) {
      function updateMacros() {
        const m = Math.min(180, Math.max(40, parseFloat(macroMass.value) || 75));
        const h = Math.min(220, Math.max(140, parseFloat(macroHeight.value) || 178));
        const a = Math.min(85, Math.max(14, parseInt(macroAge.value, 10) || 20));
        const act = parseFloat(macroActivity.value) || 1.55;
        const goalMod = parseFloat(macroGoal.value) || 1.0;

        const bmr = 10 * m + 6.25 * h - 5 * a + 5;
        const targetKcal = Math.round(bmr * act * goalMod);
        const protein = Math.round(m * (goalMod < 1 ? 2.1 : 1.9));
        const fat = Math.round(m * 0.95);
        const carbs = Math.max(80, Math.round((targetKcal - protein * 4 - fat * 9) / 4));
        const water = (m * 0.035 + (act >= 1.55 ? 0.5 : 0.2)).toFixed(1);

        macroList.innerHTML = [
          '<li><span>Цільова добова калорійність</span><span class="badge badge-accent">' + targetKcal + " ккал/день</span></li>",
          '<li><span>Білки (будівельний пул MPS)</span><span class="badge badge-z4">' + protein + " г (" + protein * 4 + " ккал)</span></li>",
          '<li><span>Жири (гормональний баланс)</span><span class="badge badge-z3">' + fat + " г (" + fat * 9 + " ккал)</span></li>",
          '<li><span>Вуглеводи (енергія глікогену)</span><span class="badge badge-z2">' + carbs + " г (" + carbs * 4 + " ккал)</span></li>",
          '<li><span>Рекомендована гідратація</span><span class="badge badge-z1">' + water + " л води/добу</span></li>"
        ].join("");
      }

      [macroMass, macroHeight, macroAge, macroActivity, macroGoal].forEach(function (el) {
        el.addEventListener("input", updateMacros);
        el.addEventListener("change", updateMacros);
      });
      updateMacros();
    }
  }

  /* --------------------------------------------------------------------------
     8. НОВІ СИМУЛЯТОРИ RS3 (v3.1 build 197):
        А) Інтерактивний 5-осьовий радар атлетичного профілю (index.html)
        Б) Візуальний конструктор дисків штанги (biomechanics.html)
        В) Калькулятор швидкості VBT та готовності ЦНС (biomechanics.html)
     -------------------------------------------------------------------------- */
  function initAthleticRadar() {
    const widget = document.getElementById("apex-radar-widget");
    if (!widget) return;

    const poly = document.getElementById("radar-data-poly");
    const verticesGroup = document.getElementById("radar-vertices");
    const scoreOut = document.getElementById("radar-overall-score");
    const splitOut = document.getElementById("radar-split-output");

    const sliders = [
      document.getElementById("rad-strength"),
      document.getElementById("rad-power"),
      document.getElementById("rad-endurance"),
      document.getElementById("rad-mobility"),
      document.getElementById("rad-recovery")
    ];
    if (sliders.some(function (s) { return !s; })) return;

    const presets = {
      powerbuilder: { vals: [94, 86, 58, 70, 78], title: "Силовий атлет & Пауербілдинг", split: "Пн: Важка база (Тема 01) • Ср: Олімпійський ривок/поштовх (Тема 07) • Пт: Верх + Калістеніка (Тема 09) • Сб: Гідрорегенерація (Тема 06)." },
      hybrid: { vals: [82, 84, 88, 74, 80], title: "Гібридний атлет HYROX", split: "Пн: Силова база (Тема 01) • Вт: Zone 2 + Wattbike (Тема 12) • Чт: Гібридний крос-тренінг (Тема 10) • Сб: Плавання 25 м (Тема 08)." },
      triathlon: { vals: [58, 68, 96, 80, 88], title: "Аква, Велопотужність & Марафон", split: "Вт/Пт: Плавання 25 м (Тема 08) • Ср: Велоергометрія FTP Wattbike (Тема 12) • Чт: Мобільність (Тема 04) • Нд: Кардіо Zone 2 (Тема 03)." },
      explosive: { vals: [84, 96, 76, 82, 76], title: "Швидкість VBT, Спринт & Бокс", split: "Пн: Швидкісна пліометрика й спринт (Тема 11) • Ср: Важка атлетика VBT (Тема 07) • Пт: Технічний бокс (Тема 05) • Сб: Контрастні купелі (Тема 06)." },
      longevity: { vals: [66, 62, 82, 96, 95], title: "Здорова спина, Постава & Longevity", split: "Вт/Чт: Кінезіотерапія та постава (Тема 04) • Пт: Спортивне плавання 25 м (Тема 08) • Нд: Термальна регенерація HRV (Тема 06)." }
    };

    const CX = 150;
    const CY = 150;
    const MAX_R = 104;

    function polarPoint(index, pct) {
      const angle = (-90 + index * 72) * (Math.PI / 180);
      const r = (Math.max(15, Math.min(100, pct)) / 100) * MAX_R;
      return [
        (CX + r * Math.cos(angle)).toFixed(1),
        (CY + r * Math.sin(angle)).toFixed(1)
      ];
    }

    function renderRadar(activePresetKey) {
      const values = sliders.map(function (s) {
        const v = parseInt(s.value, 10) || 70;
        const badge = document.getElementById(s.id + "-val");
        if (badge) badge.textContent = v + "%";
        return v;
      });

      const pts = values.map(function (v, idx) { return polarPoint(idx, v); });
      poly.setAttribute("points", pts.map(function (p) { return p.join(","); }).join(" "));
      verticesGroup.innerHTML = pts
        .map(function (p) {
          return '<circle class="radar-vertex" cx="' + p[0] + '" cy="' + p[1] + '" r="5"></circle>';
        })
        .join("");

      const avg = Math.round(values.reduce(function (a, b) { return a + b; }, 0) / values.length);
      if (scoreOut) scoreOut.textContent = avg + " / 100";

      if (splitOut) {
        if (activePresetKey && presets[activePresetKey]) {
          splitOut.innerHTML =
            "<strong>" + svgIcon("wand") + " Рекомендований мікроцикл («" + presets[activePresetKey].title + "»):</strong><br>" +
            presets[activePresetKey].split;
        } else {
          const maxIdx = values.indexOf(Math.max.apply(null, values));
          const tips = [
            "Домінує силовий вектор: поєднайте Тему 01 (Пауербілдинг), Тему 07 (Важка атлетика) та контроль швидкості штанги у Статті VBT.",
            "Домінує вибухова потужність: оберіть Тему 11 (Спринт і пліометрика), Тему 07 (Ривок і поштовх) та інтервали боксу (Тема 05).",
            "Домінує кардіовитривалість: комбінуйте Тему 03 (Zone 2), Тему 08 (Плавання 25 м) та Тему 12 (FTP Wattbike).",
            "Домінує кінезіо-мобільність: зробіть ядром тижня Тему 04 (Кінезіотерапія), Тему 09 (Гімнастичні кільця) та плавання.",
            "Фокус на суперкомпенсації: додайте 2 сесії Теми 06 (Гідро- та термотерапія) й дихальний протокол 4-4-4-4."
          ];
          splitOut.innerHTML = "<strong>" + svgIcon("compass") + " Індивідуальний висновок RS3:</strong> " + tips[maxIdx];
        }
      }
    }

    sliders.forEach(function (s) {
      s.addEventListener("input", function () {
        widget.querySelectorAll("[data-radar-preset]").forEach(function (b) { b.classList.remove("active"); });
        renderRadar(null);
      });
    });

    widget.querySelectorAll("[data-radar-preset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-radar-preset");
        const p = presets[key];
        if (!p) return;
        widget.querySelectorAll("[data-radar-preset]").forEach(function (b) { b.classList.toggle("active", b === btn); });
        p.vals.forEach(function (val, i) { sliders[i].value = String(val); });
        renderRadar(key);
        showToast("Застосовано профіль: " + p.title, "radar");
      });
    });

    renderRadar("hybrid");
  }

  function initPlateLoader() {
    const widget = document.getElementById("plate-loader-widget");
    if (!widget) return;

    const targetInput = document.getElementById("plate-target-weight");
    const barSelect = document.getElementById("plate-bar-weight");
    const collarSelect = document.getElementById("plate-collar-weight");
    const stackEl = document.getElementById("barbell-plates-stack");
    const collarEl = document.getElementById("barbell-collar-visual");
    const summaryEl = document.getElementById("plate-summary-list");
    const actualOut = document.getElementById("plate-actual-total");

    const PLATES = [
      { kg: 25, cls: "plate-25", name: "25 кг (Червоний IWF)" },
      { kg: 20, cls: "plate-20", name: "20 кг (Синій IWF)" },
      { kg: 15, cls: "plate-15", name: "15 кг (Жовтий IWF)" },
      { kg: 10, cls: "plate-10", name: "10 кг (Зелений IWF)" },
      { kg: 5, cls: "plate-5", name: "5 кг (Білий)" },
      { kg: 2.5, cls: "plate-2_5", name: "2.5 кг (Чорний хром)" },
      { kg: 1.25, cls: "plate-1_25", name: "1.25 кг (Фракційний)" }
    ];

    function renderBarbell() {
      const barKg = parseFloat(barSelect.value) || 20;
      const collarKg = parseFloat(collarSelect.value) || 0;
      const rawTarget = Math.min(340, Math.max(barKg + collarKg, parseFloat(targetInput.value) || 100));
      let perSide = (rawTarget - barKg - collarKg) / 2;

      const chosen = [];
      const counts = [];

      PLATES.forEach(function (p) {
        const cnt = Math.floor((perSide + 0.001) / p.kg);
        if (cnt > 0) {
          for (let i = 0; i < cnt; i += 1) chosen.push(p);
          counts.push({ name: p.name, count: cnt });
          perSide -= cnt * p.kg;
        }
      });

      const loadedSide = chosen.reduce(function (acc, p) { return acc + p.kg; }, 0);
      const actualTotal = barKg + collarKg + loadedSide * 2;
      if (actualOut) {
        actualOut.textContent = actualTotal.toFixed(1) + " кг (по " + loadedSide.toFixed(2) + " кг на кожну втулку)";
      }

      if (collarEl) collarEl.hidden = collarKg <= 0;

      stackEl.innerHTML = chosen.length
        ? chosen
            .map(function (p) {
              return '<div class="plate-disc ' + p.cls + '" title="' + p.name + '">' + p.kg + "</div>";
            })
            .join("")
        : '<span style="font-size:0.84rem;color:var(--text-muted);padding-inline:0.75rem;">Порожній гриф без дисків</span>';

      summaryEl.innerHTML = counts.length
        ? counts
            .map(function (c) {
              return '<li><span>' + c.name + ' (на 1 бік)</span><span class="badge badge-accent">× ' + c.count + " шт.</span></li>";
            })
            .join("")
        : '<li><span>Комплектація штанги</span><span class="badge badge-z1">Лише гриф ' + barKg + " кг</span></li>";
    }

    [targetInput, barSelect, collarSelect].forEach(function (el) {
      el.addEventListener("input", renderBarbell);
      el.addEventListener("change", renderBarbell);
    });

    widget.querySelectorAll("[data-plate-preset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        targetInput.value = btn.getAttribute("data-plate-preset");
        renderBarbell();
      });
    });

    renderBarbell();
  }

  function initReadinessVbtLab() {
    const widget = document.getElementById("vbt-readiness-widget");
    if (!widget) return;

    const speedInput = document.getElementById("vbt-speed");
    const sleepInput = document.getElementById("vbt-sleep");
    const hrvSelect = document.getElementById("vbt-hrv");
    const domsSelect = document.getElementById("vbt-doms");
    const speedLabel = document.getElementById("vbt-speed-label");
    const sleepLabel = document.getElementById("vbt-sleep-label");
    const listOut = document.getElementById("vbt-lab-output");

    function evaluateVbt() {
      const v = parseFloat(speedInput.value) || 0.58;
      const sleep = parseFloat(sleepInput.value) || 7.5;
      const hrvMod = parseInt(hrvSelect.value, 10) || 0;
      const domsMod = parseInt(domsSelect.value, 10) || 0;

      if (speedLabel) speedLabel.textContent = v.toFixed(2) + " м/с";
      if (sleepLabel) sleepLabel.textContent = sleep.toFixed(1) + " год";

      const sleepScore = Math.min(45, Math.max(10, Math.round((sleep / 8.2) * 45)));
      const readiness = Math.min(100, Math.max(18, 42 + sleepScore + hrvMod + domsMod));

      let zoneName = "";
      let estPct = 0;
      let zoneBadge = "badge-z2";
      if (v >= 1.0) {
        zoneName = "Швидкісна сила / Пліометрика";
        estPct = Math.round(48 - (v - 1.0) * 40);
        zoneBadge = "badge-z1";
      } else if (v >= 0.75) {
        zoneName = "Силова швидкість (Вибухова потужність)";
        estPct = Math.round(68 - ((v - 0.75) / 0.25) * 18);
        zoneBadge = "badge-z2";
      } else if (v >= 0.45) {
        zoneName = "Прискорювальна сила (Гіпертрофія)";
        estPct = Math.round(84 - ((v - 0.45) / 0.3) * 16);
        zoneBadge = "badge-z3";
      } else {
        zoneName = "Максимальна сила (Важка база)";
        estPct = Math.min(99, Math.round(98 - ((v - 0.18) / 0.27) * 14));
        zoneBadge = "badge-z5";
      }

      let advice = "Оптимальний тонус ЦНС: виконуйте планову робочу вагу (100% плану).";
      let readyBadge = "badge-z2";
      if (readiness >= 85) {
        advice = "Пікова суперкомпенсація ЦНС: дозволено прогресію +2.5%…+5% на штанзі!";
        readyBadge = "badge-accent";
      } else if (readiness < 55) {
        advice = "Втома ЦНС: знизьте робочу вагу на −10% та зупиняйте підхід за RIR 3.";
        readyBadge = "badge-z5";
      } else if (readiness < 70) {
        advice = "Помірне відновлення: скоригуйте робочу вагу на −5% (технічний акцент).";
        readyBadge = "badge-z3";
      }

      listOut.innerHTML = [
        '<li><span>Індекс готовності ЦНС (Readiness RS3)</span><span class="badge ' + readyBadge + '">' + readiness + " / 100 балів</span></li>",
        '<li><span>Активна швидкісна зона VBT</span><span class="badge ' + zoneBadge + '">' + zoneName + "</span></li>",
        '<li><span>Орієнтовна відносна інтенсивність</span><span class="badge badge-z4">≈ ' + estPct + "% від 1ПМ</span></li>",
        '<li><span>Рекомендація авторегуляції:</span><span style="font-weight:700;color:var(--text-primary);text-align:right;">' + advice + "</span></li>"
      ].join("");
    }

    [speedInput, sleepInput, hrvSelect, domsSelect].forEach(function (el) {
      el.addEventListener("input", evaluateVbt);
      el.addEventListener("change", evaluateVbt);
    });
    evaluateVbt();
  }

  /* --------------------------------------------------------------------------
     9. Інтерактивний хронометр RS3 (Tabata + EMOM + Дихання 4-4-4-4 з Web Audio)
     -------------------------------------------------------------------------- */
  function initIntervalTimer() {
    const widget = document.getElementById("apex-timer-widget");
    if (!widget) return;

    const digitsEl = document.getElementById("timer-digits");
    const phaseEl = document.getElementById("timer-phase");
    const ringEl = document.getElementById("timer-ring-progress");
    const startBtn = document.getElementById("timer-start-btn");
    const resetBtn = document.getElementById("timer-reset-btn");
    const soundBtn = document.getElementById("timer-sound-btn");
    const presetBtns = widget.querySelectorAll("[data-timer-preset]");

    const CIRCUMFERENCE = 408;
    const BREATH_PHASES = ["ВДИХ НОСОМ", "ЗАТРИМКА", "ПОВІЛЬНИЙ ВИДИХ", "ПАУЗА СПОКОЮ"];
    let mode = "rest";
    let totalSec = 90;
    let leftSec = 90;
    let running = false;
    let soundOn = true;
    let intervalId = null;
    let currentRound = 1;
    let isWorkPhase = true;
    let breathStep = 0;

    function playBeep(freq, duration) {
      if (!soundOn) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq || 740;
        gain.gain.value = 0.08;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setTimeout(function () {
          osc.stop();
          ctx.close();
        }, duration || 160);
      } catch (e) {}
    }

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    function renderTimer() {
      digitsEl.textContent = formatTime(leftSec);
      const ratio = totalSec > 0 ? leftSec / totalSec : 0;
      ringEl.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - ratio));
      if (mode === "tabata") {
        phaseEl.textContent = (isWorkPhase ? "РАУНД " : "ПАУЗА ") + currentRound + "/8";
      } else if (mode === "emom") {
        phaseEl.textContent = "EMOM ХВИЛИНА " + currentRound + "/5";
      } else if (mode === "breath") {
        phaseEl.textContent = BREATH_PHASES[breathStep] + " • " + currentRound + "/4";
      }
    }

    function stopInterval() {
      running = false;
      clearInterval(intervalId);
      startBtn.innerHTML = svgIcon("play") + "<span>Старт</span>";
    }

    function tick() {
      if (leftSec > 1) {
        leftSec -= 1;
        if (leftSec <= 3 && mode !== "breath") playBeep(560, 90);
        renderTimer();
      } else {
        playBeep(mode === "breath" ? 528 : 880, 220);
        if (mode === "tabata") {
          if (isWorkPhase) {
            isWorkPhase = false;
            totalSec = 10;
            leftSec = 10;
          } else if (currentRound < 8) {
            currentRound += 1;
            isWorkPhase = true;
            totalSec = 20;
            leftSec = 20;
          } else {
            leftSec = 0;
            phaseEl.textContent = "TABATA ВИКОНАНО!";
            stopInterval();
            showToast("Протокол Tabata (8 раундів) успішно завершено!", "award");
          }
          renderTimer();
        } else if (mode === "emom") {
          if (currentRound < 5) {
            currentRound += 1;
            totalSec = 60;
            leftSec = 60;
            renderTimer();
          } else {
            leftSec = 0;
            phaseEl.textContent = "EMOM ЗАВЕРШЕНО!";
            renderTimer();
            stopInterval();
            showToast("5-хвилинний блок EMOM успішно виконано!", "zap");
          }
        } else if (mode === "breath") {
          if (breathStep < 3) {
            breathStep += 1;
            totalSec = 4;
            leftSec = 4;
            renderTimer();
          } else if (currentRound < 4) {
            currentRound += 1;
            breathStep = 0;
            totalSec = 4;
            leftSec = 4;
            renderTimer();
          } else {
            leftSec = 0;
            phaseEl.textContent = "ЦНС ВІДНОВЛЕНО";
            renderTimer();
            stopInterval();
            showToast("Дихальний цикл 4-4-4-4 завершено — пульс стабілізовано", "wind");
          }
        } else {
          leftSec = 0;
          phaseEl.textContent = "ДО ПІДХОДУ!";
          renderTimer();
          stopInterval();
          showToast("Час відпочинку вичерпано — час наступного підходу!", "zap");
        }
      }
    }

    function applyPresetValue(val) {
      stopInterval();
      currentRound = 1;
      isWorkPhase = true;
      breathStep = 0;

      if (val === "tabata") {
        mode = "tabata";
        totalSec = 20;
        leftSec = 20;
        phaseEl.textContent = "РАУНД 1/8";
      } else if (val === "emom") {
        mode = "emom";
        totalSec = 60;
        leftSec = 60;
        phaseEl.textContent = "EMOM ХВИЛИНА 1/5";
      } else if (val === "breath") {
        mode = "breath";
        totalSec = 4;
        leftSec = 4;
        phaseEl.textContent = "ВДИХ НОСОМ • 1/4";
      } else {
        mode = "rest";
        totalSec = parseInt(val, 10) || 90;
        leftSec = totalSec;
        phaseEl.textContent = "ПАУЗА " + totalSec + " С";
      }
      renderTimer();
    }

    presetBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        presetBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        applyPresetValue(btn.getAttribute("data-timer-preset"));
      });
    });

    startBtn.addEventListener("click", function () {
      if (running) {
        stopInterval();
      } else {
        if (leftSec === 0) applyPresetValue(mode === "rest" ? String(totalSec) : mode);
        running = true;
        startBtn.innerHTML = svgIcon("pause") + "<span>Пауза</span>";
        playBeep(660, 100);
        intervalId = setInterval(tick, 1000);
      }
    });

    resetBtn.addEventListener("click", function () {
      applyPresetValue(mode === "rest" ? String(totalSec) : mode);
    });

    if (soundBtn) {
      soundBtn.addEventListener("click", function () {
        soundOn = !soundOn;
        soundBtn.classList.toggle("active", soundOn);
        soundBtn.innerHTML = svgIcon(soundOn ? "volume" : "soundOff") + "<span>" + (soundOn ? "Звук увімк." : "Без звуку") + "</span>";
        showToast(soundOn ? "Звуковий сигнал таймера увімкнено" : "Звуковий сигнал таймера вимкнено", soundOn ? "volume" : "soundOff");
      });
    }

    renderTimer();
  }

  /* --------------------------------------------------------------------------
     10. Система закладок «Мій план тренувань RS3» із завантаженням картки .txt
     -------------------------------------------------------------------------- */
  function getSavedTopics() {
    try {
      return JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveTopicsList(arr) {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  function syncBookmarksUI() {
    const saved = getSavedTopics();
    document.querySelectorAll(".plan-count-badge").forEach(function (b) {
      b.textContent = String(saved.length);
    });

    document.querySelectorAll("[data-bookmark-topic]").forEach(function (btn) {
      const id = btn.getAttribute("data-bookmark-topic");
      const exists = saved.some(function (item) { return item.id === id; });
      btn.classList.toggle("saved", exists);
      btn.innerHTML = svgIcon(exists ? "check" : "bookmark") + "<span>" + (exists ? "У плані" : "У план") + "</span>";
    });
  }

  function initBookmarks() {
    syncBookmarksUI();

    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-bookmark-topic]");
      if (!btn) return;
      const id = btn.getAttribute("data-bookmark-topic");
      const title = btn.getAttribute("data-topic-title") || id;
      const saved = getSavedTopics();
      const idx = saved.findIndex(function (item) { return item.id === id; });

      if (idx >= 0) {
        saved.splice(idx, 1);
        showToast("Вилучено з вашого плану: " + title, "bookmark");
      } else {
        saved.push({ id: id, title: title });
        showToast("Додано у ваш план: " + title, "check");
      }
      saveTopicsList(saved);
      syncBookmarksUI();
    });
  }

  /* --------------------------------------------------------------------------
     11. Модальні вікна RS3:
         - Командна палітра Ctrl+K (усі 12 тем, 3 статті, симулятори)
         - Студія 8 візуальних тем та читабельності
         - Мій план тренувань (з експортом .txt)
         - Інтерактивний Паспорт платформи v3.1 (build 197) RS3
         - Lightbox повноекранного огляду фото та SVG-діаграм
     -------------------------------------------------------------------------- */
  function createBackdrop(id) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      el.className = "rs2-backdrop";
      el.addEventListener("click", function (e) {
        if (e.target === el) el.classList.remove("open");
      });
      document.body.appendChild(el);
    }
    return el;
  }

  function closeAllModals() {
    document.querySelectorAll(".rs2-backdrop.open").forEach(function (m) {
      m.classList.remove("open");
    });
  }

  function openThemeStudio() {
    const backdrop = createBackdrop("rs2-theme-studio");
    const currentTheme = document.documentElement.getAttribute("data-theme") || "obsidian";
    const currentFont = document.documentElement.getAttribute("data-font-scale") || "normal";

    const cardsHtml = THEMES_META.map(function (t) {
      const isActive = t.id === currentTheme;
      return (
        '<button type="button" class="theme-preview-card' +
        (isActive ? " active" : "") +
        '" data-set-theme="' +
        t.id +
        '">' +
        '<div class="theme-mockup" style="background:' +
        t.bg +
        ';">' +
        '<div class="theme-mockup-bar">' +
        '<div class="theme-mockup-dots"><i style="background:' +
        t.accent +
        '"></i><i style="background:' +
        t.card +
        '"></i></div>' +
        '<div class="theme-mockup-pill" style="background:' +
        t.accent +
        '"></div>' +
        "</div>" +
        '<div class="theme-mockup-lines" style="background:' +
        t.card +
        ';padding:8px;border-radius:7px;">' +
        '<span style="width:78%;background:' +
        t.accent +
        ';margin-top:0;"></span>' +
        '<span style="width:54%;background:rgba(148,163,184,0.45);"></span>' +
        "</div>" +
        "</div>" +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:0.35rem;">' +
        '<strong style="font-size:0.86rem;">' +
        svgIcon(t.icon) +
        " " +
        t.name +
        "</strong>" +
        '<span style="font-size:0.68rem;color:var(--text-muted);">' +
        t.sub +
        "</span>" +
        "</div>" +
        "</button>"
      );
    }).join("");

    backdrop.innerHTML =
      '<div class="rs2-modal" role="dialog" aria-modal="true" aria-label="Студія 8 колірних тем та типографіки RS3">' +
      '<div class="rs2-modal-header">' +
      '<div class="rs2-modal-title">' +
      svgIcon("palette") +
      "<span>Студія візуальних тем оформлення RS3 (8 схем)</span></div>" +
      '<button type="button" class="icon-action-btn" data-close-modal>' +
      svgIcon("close") +
      "</button></div>" +
      '<p style="font-size:0.9rem;margin-bottom:1rem;">Оберіть одну з восьми адаптивних тем (6 темних + 2 світлі студійні схеми, включно з новинками <strong>«Рубін»</strong> та <strong>«Срібло»</strong> у релізі v3.1 RS3):</p>' +
      '<div class="themes-showcase-grid">' +
      cardsHtml +
      "</div>" +
      '<div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border-subtle);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.8rem;">' +
      '<strong style="font-size:0.88rem;">Масштаб тексту статей і таблиць:</strong>' +
      '<div style="display:flex;flex-wrap:wrap;gap:0.45rem;">' +
      '<button type="button" class="filter-btn' + (currentFont === "normal" ? " active" : "") + '" data-set-font="normal">100% Стандарт</button>' +
      '<button type="button" class="filter-btn' + (currentFont === "lg" ? " active" : "") + '" data-set-font="lg">108% Комфорт</button>' +
      '<button type="button" class="filter-btn' + (currentFont === "xl" ? " active" : "") + '" data-set-font="xl">115% Великий</button>' +
      "</div></div></div>";

    backdrop.classList.add("open");
    backdrop.onclick = function (e) {
      if (e.target === backdrop || e.target.closest("[data-close-modal]")) {
        backdrop.classList.remove("open");
      } else if (e.target.closest("[data-set-theme]") || e.target.closest("[data-set-font]")) {
        setTimeout(openThemeStudio, 35);
      }
    };
  }

  function openCommandPalette() {
    const backdrop = createBackdrop("rs2-cmd-palette");
    const commands = [
      { label: "Головна сторінка та 5-осьовий радар профілю RS3", tag: "Головна", href: "index.html", icon: "home" },
      { label: "Радар атлетичного профілю та конструктор мікроциклу", tag: "Фішка RS3", href: "index.html#radar-section", icon: "radar" },
      { label: "Каталог усіх 12 тренувальних тем із зображеннями", tag: "12 тем", href: "topics.html", icon: "layers" },
      { label: "Хронометр Tabata, EMOM та дихання 4-4-4-4 ЦНС", tag: "Інструмент RS3", href: "topics.html#apex-timer-section", icon: "timer" },
      { label: "Стаття №1: Періодизація навантажень, приклади й 3 калькулятори", tag: "Стаття №1", href: "article.html", icon: "table" },
      { label: "Стаття №2: Біоархітектура атлета, біоритми й 5 ілюстрацій", tag: "Стаття №2", href: "journal.html", icon: "book" },
      { label: "НОВА Стаття №3: Цифрова біомеханіка VBT та телеметрія штанги", tag: "NEW RS3 Стаття", href: "biomechanics.html", icon: "gauge" },
      { label: "Візуальний конструктор дисків на олімпійську штангу IWF", tag: "Симулятор RS3", href: "biomechanics.html#sec-plate-loader", icon: "barbell" },
      { label: "Діагностика готовності ЦНС та калькулятор швидкості VBT", tag: "Лабораторія RS3", href: "biomechanics.html#sec-vbt-lab", icon: "brain" },
      { label: "Тема 11: Спринт, вибухова пліометрика та легка атлетика", tag: "Нова тема v3.1", href: "topics.html#sprint", icon: "footprints" },
      { label: "Тема 12: Велоергометрія потужності FTP Wattbike & Тріатлон", tag: "Нова тема v3.1", href: "topics.html#cycling", icon: "bike" },
      { label: "Про клуб, тренерська рада та онлайн-запис на 12 напрямів", tag: "Про клуб", href: "about.html#booking", icon: "calendar" }
    ];

    backdrop.innerHTML =
      '<div class="rs2-modal" role="dialog" aria-modal="true" aria-label="Швидкий пошук по сайту RS3">' +
      '<div class="rs2-modal-header">' +
      '<div class="rs2-modal-title">' +
      svgIcon("search") +
      "<span>Командний навігатор APEX " + APP_VERSION + "</span></div>" +
      '<button type="button" class="icon-action-btn" data-close-modal>' +
      svgIcon("close") +
      "</button></div>" +
      '<input type="search" id="rs2-cmd-input" class="form-control" placeholder="Пошук серед 3 статей, 12 тем, симуляторів штанги, VBT або таблиць..." aria-label="Пошук розділу сайту">' +
      '<ul class="cmd-list" id="rs2-cmd-results"></ul>' +
      "</div>";

    const input = backdrop.querySelector("#rs2-cmd-input");
    const list = backdrop.querySelector("#rs2-cmd-results");

    function renderCmd(q) {
      const term = (q || "").trim().toLowerCase();
      const filtered = commands.filter(function (c) {
        return !term || c.label.toLowerCase().includes(term) || c.tag.toLowerCase().includes(term);
      });
      list.innerHTML = filtered.length
        ? filtered
            .map(function (c) {
              return (
                '<li class="cmd-item"><a href="' +
                c.href +
                '"><span>' +
                svgIcon(c.icon) +
                " " +
                c.label +
                '</span><span class="badge badge-accent">' +
                c.tag +
                "</span></a></li>"
              );
            })
            .join("")
        : '<li style="padding:1rem;text-align:center;color:var(--text-muted);">Збігів не знайдено.</li>';
    }

    renderCmd("");
    input.addEventListener("input", function () { renderCmd(input.value); });
    backdrop.querySelector("[data-close-modal]").addEventListener("click", closeAllModals);
    backdrop.classList.add("open");
    setTimeout(function () { input.focus(); }, 40);
  }

  function downloadSavedPlanTxt(saved) {
    const lines = [
      "==========================================================",
      "ПЕРСОНАЛЬНИЙ ПЛАН ТРЕНУВАНЬ — СПОРТИВНИЙ КЛУБ «APEX»",
      "Платформа: " + APP_VERSION + " | Автор: Максим Ковалишин",
      "Дата формування: " + new Date().toLocaleDateString("uk-UA"),
      "==========================================================",
      "",
      "Обрані тренувальні теми (" + saved.length + "):"
    ];
    saved.forEach(function (item, i) {
      lines.push((i + 1) + ". " + item.title + " -> https://maxspartan27.github.io/topics.html#" + item.id);
    });
    lines.push("", "Порада методиста: чергуйте силові дні з плаванням/Zone 2 та контролюйте швидкість штанги VBT.");

    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "apex-personal-plan-rs3.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Персональну картку тренувань збережено у файл .txt", "download");
  }

  function openSavedPlanModal() {
    const backdrop = createBackdrop("rs2-plan-modal");
    const saved = getSavedTopics();
    const listHtml = saved.length
      ? '<ul class="cmd-list">' +
        saved
          .map(function (item) {
            return (
              '<li class="cmd-item"><a href="topics.html#' +
              item.id +
              '"><span>' +
              svgIcon("check") +
              " " +
              item.title +
              '</span><span class="badge badge-z2">Відкрити →</span></a></li>'
            );
          })
          .join("") +
        "</ul>"
      : '<p style="margin:0.8rem 0;">Ви ще не додали жодної теми. Перейдіть у розділ <a href="topics.html">«12 тренувальних тем»</a> та натисніть кнопку <strong>«У план»</strong> на бажаних програмах.</p>';

    backdrop.innerHTML =
      '<div class="rs2-modal" role="dialog" aria-modal="true" aria-label="Мій план тренувань RS3">' +
      '<div class="rs2-modal-header">' +
      '<div class="rs2-modal-title">' +
      svgIcon("bookmark") +
      "<span>Мій персональний план тренувань (" +
      saved.length +
      ")</span></div>" +
      '<button type="button" class="icon-action-btn" data-close-modal>' +
      svgIcon("close") +
      "</button></div>" +
      listHtml +
      (saved.length
        ? '<div style="margin-top:1rem;display:flex;flex-wrap:wrap;justify-content:space-between;gap:0.6rem;">' +
          '<button type="button" class="btn btn-primary btn-sm" id="export-saved-plan">' + svgIcon("download") + "<span>Завантажити картку .txt</span></button>" +
          '<button type="button" class="btn btn-outline btn-sm" id="clear-saved-plan">' + svgIcon("reset") + "<span>Очистити список</span></button>" +
          "</div>"
        : "") +
      "</div>";

    backdrop.querySelector("[data-close-modal]").addEventListener("click", closeAllModals);
    const expBtn = backdrop.querySelector("#export-saved-plan");
    if (expBtn) expBtn.addEventListener("click", function () { downloadSavedPlanTxt(saved); });
    const clearBtn = backdrop.querySelector("#clear-saved-plan");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        saveTopicsList([]);
        syncBookmarksUI();
        openSavedPlanModal();
        showToast("Список обраних тем очищено", "reset");
      });
    }
    backdrop.classList.add("open");
  }

  function openBuildPassport() {
    const backdrop = createBackdrop("rs2-build-modal");
    backdrop.innerHTML =
      '<div class="rs2-modal" role="dialog" aria-modal="true" aria-label="Технічний паспорт збірки v3.1 (build 197) RS3">' +
      '<div class="rs2-modal-header">' +
      '<div class="rs2-modal-title">' +
      svgIcon("cpu") +
      "<span>APEX Web Engine • " +
      APP_VERSION +
      "</span></div>" +
      '<button type="button" class="icon-action-btn" data-close-modal>' +
      svgIcon("close") +
      "</button></div>" +
      '<p style="font-size:0.92rem;">Флагманське оновлення вебплатформи спортивного клубу <strong>«APEX»</strong> покоління <strong>RS3</strong> (Варіант №5 практичної роботи №16):</p>' +
      '<ul style="font-size:0.88rem;color:var(--text-secondary);padding-left:1.25rem;line-height:1.65;">' +
      "<li><strong>Повний пакет іконок вебсайту (App Icons + PWA):</strong> багатошарова векторна емблема <code>favicon.svg</code>, мультирозмірна <code>favicon.ico</code> (16/32/48px), <code>apple-touch-icon.png</code>, <code>icon-192.png</code>, <code>icon-512.png</code> та маніфест <code>site.webmanifest</code>.</li>" +
      "<li><strong>62 векторні SVG-піктограми RS3:</strong> оновлено та створено спеціалізовані спортивні піктограми (олімпійська штанга, калібрований диск, радар, спідометр VBT, нейробіомеханіка, дихання, аква-хвилі, велопотужність, телеметрія).</li>" +
      "<li><strong>Нова 3-тя науково-практична стаття (<code>biomechanics.html</code>):</strong> трекінг швидкості штанги (VBT), інфографіка важелів, візуальний конструктор дисків IWF на штанзі та симулятор готовності ЦНС.</li>" +
      "<li><strong>12 тренувальних тем + 8 колірних схем:</strong> додано Спринт/Пліометрику й Велоергометрію FTP Wattbike, а також нові теми оформлення <em>«Рубін»</em> та <em>«Срібло»</em>.</li>" +
      "<li><strong>Інтерактивні фішки RS3:</strong> 5-осьовий SVG-радар профілю атлета на головній, дихальний тренажер 4-4-4-4 та EMOM у таймері, копіювання таблиць у буфер обміну та вивантаження плану у <code>.txt</code>.</li>" +
      "</ul>" +
      '<div class="footer-legal" style="margin-top:1rem;padding:0.95rem 1.1rem;">' +
      '<p class="copyright-primary" style="font-size:0.85rem;"><strong>© 2026 Автор і розробник: Максим Ковалишин. Видання ' +
      APP_VERSION +
      ". Усі права захищено.</strong></p>" +
      "</div></div>";

    backdrop.querySelector("[data-close-modal]").addEventListener("click", closeAllModals);
    backdrop.classList.add("open");
  }

  function initModalsAndLightbox() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-studio]")) openThemeStudio();
      if (e.target.closest("[data-open-palette]")) openCommandPalette();
      if (e.target.closest("[data-open-plan]")) openSavedPlanModal();
      if (e.target.closest("[data-open-build]")) openBuildPassport();

      const img = e.target.closest(".topic-media img, .editorial-figure img");
      if (img && !e.target.closest("button, a")) {
        const backdrop = createBackdrop("rs2-lightbox");
        const caption =
          (img.closest("figure") && img.closest("figure").querySelector("figcaption")?.textContent) ||
          img.getAttribute("alt") ||
          "";
        backdrop.innerHTML =
          '<div class="lightbox-box">' +
          '<img src="' +
          img.getAttribute("src") +
          '" alt="' +
          (img.getAttribute("alt") || "") +
          '">' +
          '<div class="lightbox-caption">' +
          caption +
          "</div>" +
          '<button type="button" class="btn btn-outline btn-sm" style="margin-top:0.85rem;" data-close-modal>' +
          svgIcon("close") +
          "<span>Закрити перегляд (Esc)</span></button>" +
          "</div>";
        backdrop.querySelector("[data-close-modal]").addEventListener("click", closeAllModals);
        backdrop.classList.add("open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
      } else if (e.key === "Escape") {
        closeAllModals();
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. Прогрес читання, Scroll-Spy змісту, лічильники та форма запису
     -------------------------------------------------------------------------- */
  function initScrollAndCounters() {
    const progressBar = document.querySelector(".reading-progress");
    const backBtn = document.querySelector(".back-to-top");
    if (backBtn) backBtn.innerHTML = svgIcon("arrowUp");

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressBar && docHeight > 0) {
        progressBar.style.width = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)).toFixed(2) + "%";
      }
      if (backBtn) backBtn.classList.toggle("visible", scrollTop > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const tocLinks = document.querySelectorAll(".toc-link[href^='#']");
    if (tocLinks.length && "IntersectionObserver" in window) {
      const sections = Array.from(tocLinks)
        .map(function (l) { return document.getElementById(l.getAttribute("href").slice(1)); })
        .filter(Boolean);

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const activeId = "#" + entry.target.id;
              tocLinks.forEach(function (link) {
                link.classList.toggle("active", link.getAttribute("href") === activeId);
              });
            }
          });
        },
        { rootMargin: "-18% 0px -68% 0px", threshold: 0.05 }
      );
      sections.forEach(function (s) { observer.observe(s); });
    }

    const counters = document.querySelectorAll("[data-counter]");
    if (counters.length && "IntersectionObserver" in window) {
      const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.getAttribute("data-counter")) || 0;
            const suffix = el.getAttribute("data-suffix") || "";
            obs.unobserve(el);
            if (prefersReduced) {
              el.textContent = target.toLocaleString("uk-UA") + suffix;
              return;
            }
            const start = performance.now();
            (function step(now) {
              const p = Math.min(1, (now - start) / 1100);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased).toLocaleString("uk-UA") + suffix;
              if (p < 1) requestAnimationFrame(step);
            })(start);
          });
        },
        { threshold: 0.35 }
      );
      counters.forEach(function (c) { io.observe(c); });
    }
  }

  function initBookingForm() {
    const form = document.getElementById("booking-form");
    const statusBox = document.getElementById("booking-status");
    if (!form || !statusBox) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (form.elements["athleteName"]?.value || "").trim();
      const goal = form.elements["trainingGoal"]?.value || "";
      const slot = form.elements["preferredSlot"]?.value || "";

      if (name.length < 2) {
        statusBox.className = "form-status error";
        statusBox.hidden = false;
        statusBox.textContent = "Введіть, будь ласка, ваше ім’я (мінімум 2 символи) для реєстрації гостьового пропуску.";
        return;
      }

      statusBox.className = "form-status success";
      statusBox.hidden = false;
      statusBox.textContent =
        "Вітаємо, " +
        name +
        "! Заявку на тему «" +
        goal +
        "» (" +
        slot +
        ") підтверджено у системі APEX " +
        APP_VERSION +
        ".";
      showToast("Гостьовий пропуск для " + name + " успішно сформовано!", "shield");
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    hydrateIcons(document);
    initAppearance();
    initMobileMenu();
    initCategoryFilters();
    initModernTables();
    initPerformanceCalculators();
    initAthleticRadar();
    initPlateLoader();
    initReadinessVbtLab();
    initIntervalTimer();
    initBookmarks();
    initModalsAndLightbox();
    initScrollAndCounters();
    initBookingForm();
  });
})();
