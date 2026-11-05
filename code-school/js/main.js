// Shared nav + footer, injected on every page.
// data-page on <body> marks the active link.
// On the Russian pages (<html data-lang="ru">) the labels switch to Russian.
// Relative links resolve inside /ru/ there, so they stay in the Russian set.

(function () {
  const IS_RU = document.documentElement.getAttribute("data-lang") === "ru";

  const pages = [
    { href: "index.html", label: IS_RU ? "Главная" : "Home", id: "home" },
    { href: "skills.html", label: IS_RU ? "Карта навыков" : "Skills Map", id: "skills" },
    { href: "glossary.html", label: IS_RU ? "Глоссарий" : "Glossary", id: "glossary" },
    { href: "landscape.html", label: IS_RU ? "Ландшафт ИИ" : "AI Landscape", id: "landscape" },
    { href: "timeline.html", label: IS_RU ? "Хронология" : "Timeline", id: "timeline" }
  ];

  const current = document.body.dataset.page;

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-logo" href="index.html">⌘ Code School</a>
      <div class="nav-links">
        ${pages
          .map(
            (p) =>
              `<a href="${p.href}" class="${p.id === current ? "active" : ""}">${p.label}</a>`
          )
          .join("")}
      </div>
    </div>`;

  // The EN · RU switch is authored in each page's own <template id="lang-switch">
  // (so each page points at its own EN and RU URLs) and moved into the nav here.
  const tpl = document.getElementById("lang-switch");
  if (tpl) nav.querySelector(".nav-inner").append(tpl.content.cloneNode(true));

  document.body.prepend(nav);

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = IS_RU
    ? `Это живой гид: весь контент лежит в <code>data/*.js</code>.
    Попроси Claude Code обновить его, когда ландшафт изменится.<br />
    <a class="home" href="/ru/">← Все проекты</a>`
    : `Built as a living guide — all content lives in <code>data/*.js</code>.
    Ask Claude Code to update it when the landscape shifts.<br />
    <a class="home" href="https://esmrsky.github.io/">← All projects</a>`;
  document.body.append(footer);
})();
