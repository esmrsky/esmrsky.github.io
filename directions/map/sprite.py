"""Inline the Lucide icons this page names into one hidden <svg> sprite.

Run after changing an icon name in index.html:
  npm pack lucide-static@0.460.0 && tar xzf lucide-static-0.460.0.tgz
  python3 sprite.py path/to/package/icons
Lucide is ISC-licensed; the license line is kept in the sprite.
"""
import re, sys, pathlib
icons = pathlib.Path(sys.argv[1])
page = pathlib.Path(__file__).with_name('index.html')
s = page.read_text()
body = s.split('<!--/sprite-->', 1)[1]
names = set(re.findall(r"#i-([a-z0-9-]+)", body)) | set(re.findall(r"': \['([a-z0-9-]+)', '", body)) \
    | set(re.findall(r"icon: '([a-z0-9-]+)'", body)) | set(re.findall(r"icon\('([a-z0-9-]+)'\)", body))
out = []
for n in sorted(names):
    svg = (icons / f'{n}.svg').read_text()
    inner = re.search(r'>\s*(.*?)\s*</svg>', svg.split('<svg', 1)[1], re.S).group(1)
    out.append(f'<symbol id="i-{n}" viewBox="0 0 24 24">' + re.sub(r'\s*\n\s*', '', inner) + '</symbol>')
sprite = ('<!--sprite--><svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">'
          '<!-- Lucide icons, ISC license, lucide.dev -->' + ''.join(out) + '</svg><!--/sprite-->')
s = re.sub(r'<!--sprite-->.*?<!--/sprite-->', lambda m: sprite, s, count=1, flags=re.S)
page.write_text(s)
print(len(names), 'icons')
