#!/usr/bin/env python3
"""Estate baseline, checked at commit time.

Runs as the pre-commit hook of the hub and of every standalone repo (see
tools/install-hooks.sh). It looks at each English page being committed and
refuses the commit when the page brings back one of the problems the user
has had to find by hand more than once:

  tap      no -webkit-tap-highlight-color: phones flash a gray-blue square over
           every tapped control. Fix: the polish pack (copy it from any page
           that has <style id="polish-pack">).
  wrap     no text-wrap at all: headings break unevenly and paragraphs and
           labels leave one word alone on the last line. Fix: the polish pack.
  snap     <details> on the page and nothing that eases them, so accordions
           jump open. Fix: <script src="/assets/ease-details.js" defer></script>
  all      transition: all, or a transition with only a duration (which also
           means all): it animates layout and colors by accident and has frozen
           the homepage before. Fix: name the properties.

and warns (does not block) about em-dashes in the page's own words, which the
user has banned (quotations are skipped), and about a polish pack older than
October 30, 2026, which only reached h1-h3, p, li, dd and figcaption, so labels,
summaries and buttons wrapped raggedly.

  python3 tools/baseline-check.py            # the staged pages (what the hook runs)
  python3 tools/baseline-check.py --all      # every English page in this repo
  python3 tools/baseline-check.py path ...   # these files

To commit anyway, deliberately: git commit --no-verify. The live measurements
behind these rules (and more) are ~/.claude/checks/estate-baseline.mjs.
"""
import os, re, subprocess, sys

ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip() or "."
EASED = ("ease-details.js", "shutting", ".animate(", "grid-template-rows", "details-content", "transition:height", "transition: height")
TIMING = re.compile(r"^(?:-?[\d.]+m?s|ease(?:-in)?(?:-out)?|linear|step-start|step-end|cubic-bezier\(.*\)|steps\(.*\)|var\(.*\)|calc\(.*\))$")


def is_page(rel):
    rel = rel.replace("\\", "/")
    if not rel.endswith(".html") or "/ru/" in rel or rel.startswith("ru/"):
        return False
    return rel == "index.html" or rel.endswith("/index.html") or rel.count("/") == 0


def local_assets(html, base):
    """Inline text plus every same-repo stylesheet and script the page loads."""
    text = [html]
    for ref in re.findall(r'(?:href|src)="([^"#?]+\.(?:css|js))(?:[?#][^"]*)?"', html):
        if ref.startswith(("http", "//")):
            continue
        p = os.path.join(ROOT, ref.lstrip("/")) if ref.startswith("/") else os.path.join(base, ref)
        if os.path.isfile(p):
            with open(p, encoding="utf-8", errors="replace") as fh:
                text.append(fh.read())
    return "\n".join(text)


def sheets(html, base):
    out = []
    for ref in re.findall(r'href="([^"#?]+\.css)(?:[?#][^"]*)?"', html):
        if ref.startswith(("http", "//")):
            continue
        p = os.path.join(ROOT, ref.lstrip("/")) if ref.startswith("/") else os.path.join(base, ref)
        if os.path.isfile(p):
            with open(p, encoding="utf-8", errors="replace") as fh:
                out.append(fh.read())
    return out


def shadowed(path):
    """A hub folder that a standalone repo of the same name serves over: dead code."""
    rel = os.path.relpath(path, ROOT).split(os.sep)
    return len(rel) > 1 and os.path.isdir(os.path.join(ROOT, "..", "..", "live-linked", rel[0]))


def transitions_all(css):
    bad = []
    css = re.sub(r"/\*.*?\*/", " ", css, flags=re.S)
    for sel, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        for val in re.findall(r"(?<![\w-])transition\s*:\s*([^;}]+)", body):
            for part in re.split(r",(?![^(]*\))", val):
                toks = re.findall(r"[\w.-]+\([^)]*\)|[^\s]+", part.strip())
                if not toks or toks[0] in ("none", "initial", "inherit", "unset"):
                    continue
                if "all" in toks or all(TIMING.match(t) for t in toks):
                    bad.append(re.split(r"<style[^>]*>", sel)[-1].strip().split("\n")[-1][:60])
                    break
    return bad


def prose_dashes(html):
    s = re.sub(r"<!--.*?-->|<(script|style|blockquote|q|cite)\b[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    s = re.sub(r'\s(?:data-[\w-]+|title|alt|aria-label|content)="[^"]*"', " ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    # a passage in quotation marks is someone else's words
    s = re.sub(r"“[^”]{0,600}”", " ", s)
    return s.count("—")


STAGED = False


def added_css(path):
    """The CSS rules this commit adds to a page: the staged diff's + lines, whole rules only."""
    diff = subprocess.run(["git", "diff", "--cached", "-U0", "--", path], capture_output=True, text=True, cwd=ROOT).stdout
    return "\n".join(l[1:] for l in diff.splitlines() if l.startswith("+") and not l.startswith("+++"))


def check(path):
    rel = os.path.relpath(path, ROOT)
    with open(path, encoding="utf-8", errors="replace") as fh:
        html = fh.read()
    if 'http-equiv="refresh"' in html or len(html) < 400 or shadowed(path):
        return [], []
    blob = local_assets(html, os.path.dirname(path))
    css = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", html, re.S) + sheets(html, os.path.dirname(path)))
    hard, soft = [], []
    if "tap-highlight-color" not in blob:
        hard.append("tap   no -webkit-tap-highlight-color (add the polish pack)")
    if not re.search(r"text-wrap(?:-style)?\s*:\s*(?:pretty|balance)", blob):
        hard.append("wrap  no text-wrap balance or pretty (add the polish pack)")
    elif "body{text-wrap-style:pretty}" not in blob:
        soft.append("pack  polish pack older than Oct 30, 2026 (copy the current one from received/index.html)")
    if re.search(r"<details\b", blob) and not any(m in blob for m in EASED):
        hard.append('snap  <details> with nothing easing them (add <script src="/assets/ease-details.js" defer></script>)')
    bad = sorted(set(transitions_all(css)))
    if bad:
        # a ratchet: new `transition: all` blocks the commit, old ones only warn,
        # so an unrelated edit to an old page is never held up by its history
        new = sorted(set(transitions_all(added_css(path)))) if STAGED else []
        line = " | ".join(bad[:4]) + (" …" if len(bad) > 4 else "")
        if new:
            hard.append("all   transition: all added on " + " | ".join(new[:4]))
        else:
            soft.append("all   transition: all (already here) on " + line)
    n = prose_dashes(html)
    if n:
        soft.append(f"dash  {n} em-dash(es) in the page's own words")
    return hard, soft


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--all" in sys.argv:
        files = []
        for d, dirs, fs in os.walk(ROOT):
            dirs[:] = [x for x in dirs if not x.startswith(".") and x not in ("ru", "node_modules", "directions", "audit-out")]
            files += [os.path.join(d, f) for f in fs if is_page(os.path.relpath(os.path.join(d, f), ROOT))]
    elif args:
        files = [os.path.abspath(a) for a in args]
    else:
        global STAGED
        STAGED = True
        out = subprocess.run(["git", "diff", "--cached", "--name-only", "--diff-filter=ACM"], capture_output=True, text=True, cwd=ROOT).stdout
        files = [os.path.join(ROOT, f) for f in out.split() if is_page(f)]
    failed = 0
    for f in sorted(files):
        hard, soft = check(f)
        if hard or soft:
            print(("✗ " if hard else "· ") + os.path.relpath(f, ROOT))
            for h in hard:
                print("    " + h)
            for s in soft:
                print("    " + s)
        failed += bool(hard)
    if failed:
        print(f"\nbaseline: {failed} page(s) would bring back a known problem. Fix them, or commit with --no-verify on purpose.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
