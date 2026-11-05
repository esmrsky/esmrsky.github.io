// Shared nav + footer, injected on every page.
// data-page on <body> marks the active link.

(function () {
  const pages = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "skills.html", label: "Skills Map", id: "skills" },
    { href: "glossary.html", label: "Glossary", id: "glossary" },
    { href: "landscape.html", label: "AI Landscape", id: "landscape" },
    { href: "timeline.html", label: "Timeline", id: "timeline" }
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
  document.body.prepend(nav);

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `Built as a living guide — all content lives in <code>data/*.js</code>.
    Ask Claude Code to update it when the landscape shifts.`;
  document.body.append(footer);
})();
