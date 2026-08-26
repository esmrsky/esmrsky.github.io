#!/usr/bin/env python3
"""
Regenerate /faith/new/ from /faith/.

The eight-directions preview is the real Faith site with a theme layer over it,
not a second copy of the writing. This script takes ../index.html and
../miracles.html verbatim and adds exactly four things:

  1. asset paths pointed one level up (styles.css, site.js, scripture.js)
  2. the direction typefaces, themes.css and figures.css after the site's own
     stylesheet, and the three figures at their anchors in the prose
  3. a first-paint script that sets data-dir before CSS loads (no flash)
  4. the direction switcher, as one more control in the nav beside the theme toggle

Run it after any edit to the real Faith pages:  python3 build.py
"""

import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent

DIR_FONTS = (
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Anton'
    '&family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900'
    '&family=Bricolage+Grotesque:opsz,wght@12..96,400..800'
    '&family=Chivo:ital,wght@0,400..900;1,400..700'
    '&family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700'
    '&family=IBM+Plex+Mono:wght@400;500;600'
    '&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400'
    '&family=Instrument+Serif:ital@0;1'
    '&family=Literata:ital,opsz,wght@0,7..72,300..600;1,7..72,300..500'
    '&family=Manrope:wght@400;500;600;800'
    '&family=Martian+Mono:wght@300;400;600'
    '&family=Schibsted+Grotesk:ital,wght@0,400..800;1,400..700'
    '&family=Space+Grotesk:wght@400;500;700'
    '&family=Space+Mono:ital,wght@0,400;0,700;1,400'
    '&family=Spectral:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600'
    '&display=swap" rel="stylesheet">'
)

# Runs before the stylesheets, same as the site's own theme script, so the page
# never paints in one direction and then jumps to another.
FIRST_PAINT = """<script>
/* first paint: honor a stored direction, and resolve light/dark into data-mode,
   before CSS loads — so the page never opens in one direction and jumps to another.
   Runs after the site's own theme script, so data-theme is already set. */
(function () {
  try {
    var m = location.search.match(/[?&]dir=([a-z]+)/);
    var d = m ? m[1] : localStorage.getItem('faith-dir');
    if (d && d !== 'original') document.documentElement.dataset.dir = d;
    /* Field and Blueprint were drawn dark: open them that way unless the
       reader has already picked a theme, and do it here rather than in
       switcher.js so the page never paints light and then flips. */
    if ((d === 'field' || d === 'blueprint') && !localStorage.getItem('faith-theme')) {
      document.documentElement.dataset.theme = 'dark';
    }
  } catch (e) {}
  try {
    var t = document.documentElement.dataset.theme;
    var dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.mode = dark ? 'dark' : 'light';
  } catch (e) {}
})();
</script>"""

SWITCHER = """<button class="dirsw" id="dirsw" type="button" title="Design direction">
        <span class="dirsw-sw" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>"""

SWITCHER_SCRIPT = '<script src="switcher.js" defer></script>'
SWITCHER_ANCHOR = '      <button class="theme-toggle" id="theme-toggle"'



# Each figure goes immediately before/after a line of the argument it draws.
# The anchors are prose, so a rewrite of that sentence in /faith/ will make the
# build fail loudly here rather than silently dropping a figure.
FIGURE_ANCHORS = {
    "index.html": [
        ("emitter", "That is the founding physics of Scripture:</p>", "after"),
        ("mirror", '    <div class="mirror reveal">', "before"),
        ("circuit", '    <div class="steps">', "before"),
    ],
    "miracles.html": [],
}


def figures() -> dict:
    raw = (HERE / "figures.html").read_text(encoding="utf-8")
    out = {}
    for key in ("emitter", "mirror", "circuit"):
        a = raw.index(f"<!--FIG:{key}-->") + len(f"<!--FIG:{key}-->")
        b = raw.index(f"<!--/FIG:{key}-->")
        out[key] = raw[a:b].strip("\n")
    return out


def build(name: str) -> None:
    src = SRC / name
    html = src.read_text(encoding="utf-8")

    # 1. assets live one level up
    html = html.replace('href="styles.css"', 'href="../styles.css"')
    html = html.replace('src="site.js"', 'src="../site.js"')
    html = html.replace('src="scripture.js"', 'src="../scripture.js"')

    # 2 + 3. the theme layer, its typefaces, and the first-paint script
    html = html.replace(
        '<link rel="stylesheet" href="../styles.css">',
        DIR_FONTS + '\n<link rel="stylesheet" href="../styles.css">'
        '\n<link rel="stylesheet" href="figures.css">\n<link rel="stylesheet" href="themes.css">',
        1,
    )
    html = html.replace(
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        FIRST_PAINT + '\n<link rel="preconnect" href="https://fonts.googleapis.com">',
        1,
    )

    # a preview duplicate must not compete with the real page in search
    html = re.sub(
        r'(<link rel="canonical"[^>]*>)',
        r'<meta name="robots" content="noindex,follow">\n\1',
        html,
        count=1,
    )

    # 4. the figures
    figs = figures()
    for key, anchor, where in FIGURE_ANCHORS[name]:
        if html.count(anchor) != 1:
            sys.exit(f"{name}: anchor for figure '{key}' matched {html.count(anchor)} times, expected 1")
        block = figs[key]
        html = html.replace(anchor, f"{anchor}\n\n{block}\n" if where == "after" else f"{block}\n\n{anchor}", 1)

    # 5. the switcher — one more control in the nav, next to the theme toggle
    if html.count(SWITCHER_ANCHOR) != 1:
        sys.exit(f"{name}: nav anchor for the switcher matched {html.count(SWITCHER_ANCHOR)} times, expected 1")
    html = html.replace(SWITCHER_ANCHOR, SWITCHER + "\n" + SWITCHER_ANCHOR, 1)
    html = html.replace("</body>", SWITCHER_SCRIPT + "\n</body>", 1)

    (HERE / name).write_text(html, encoding="utf-8")
    print(f"wrote {name}  ({len(html):,} bytes)")


if __name__ == "__main__":
    for page in ("index.html", "miracles.html"):
        if not (SRC / page).exists():
            sys.exit(f"missing source: {SRC / page}")
        build(page)
