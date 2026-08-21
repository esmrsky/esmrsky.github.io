#!/usr/bin/env python3
"""Generate the Russian half of esmrsky.github.io from the English sources.

Every page keeps its English markup as the single source of truth. Russian
lives in `data-ru` / `data-ru-<attr>` attributes on that same markup, exactly
as the old in-page toggle read it. This script bakes those attributes into a
static Russian page so Russian gets real URLs instead of a localStorage flag:

    index.html          ->  ru/index.html            (/  ->  /ru/)
    ecclesia/index.html ->  ecclesia/ru/index.html   (/ecclesia/ -> /ecclesia/ru/)

What it does to each page, in order:

1.  Applies every `data-ru` to that element's inner HTML and every
    `data-ru-<attr>` to that attribute, then drops the `data-ru*` attributes.
    Nesting follows the browser: when a `data-ru` element contains another,
    the outer one wins, because replacing the outer innerHTML would have
    detached the inner node anyway.
2.  Drops the EN/RU toggle button and both halves of the old i18n script,
    leaving a two-line stub that tells a page's own JS which language it is
    rendering into (`ecclesia` repaints scripture chips, `the-word` collapses
    its translation switcher, `everything-mid` relabels its theme button).
3.  Sets `<html lang="ru" data-lang="ru">`. `lang` is the real signal;
    `data-lang` stays because several pages hang CSS off it.
4.  Rewrites internal links so Russian stays in Russian: `/` -> `/ru/`,
    `/foo/` -> `/foo/ru/`, but only where a Russian page actually exists.
    A link whose Russian target is spelled out by hand (`data-ru-href`) is
    left alone — the author owns it.
5.  Rewrites *relative* asset paths to `../`, since the page moved down one
    directory. This covers `href`/`src`/`srcset`/... attributes and `url()`
    inside `<style>` blocks and `style=""` attributes. Deliberately not
    `<base href>`: that would send every in-page `#anchor` to the base URL.
6.  Adds the `<link rel="alternate" hreflang>` pair to both sides.
7.  On the homepage only, drops every project card whose Russian page does
    not exist yet, repacks the grid so the survivors leave no holes, folds
    the "Other projects" drawer into the main grid once few enough cards are
    left, and removes any filter button nothing matches any more. Which
    cards survive is derived from the pages being generated, so it can never
    go stale.

The English sources are edited in place only to carry that hreflang pair.

Usage:
    python3 tools/build-ru.py            # every page that has [data-ru]
    python3 tools/build-ru.py ecclesia   # just one site
    python3 tools/build-ru.py --check    # regenerate into memory, report drift
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://esmrsky.github.io"

# Redirect stubs: they bounce before paint, so a Russian copy would be a URL
# nobody can ever see. They follow whatever language the reader picked
# elsewhere, which for a <meta refresh> means nothing at all.
SKIP = {
    "the-return/index.html",
    "the-return.html",
    "index-old-return-backup.html",
    # judgment is NOT translated. Its five data-ru attributes are runtime
    # data for its own verse picker (`.ruvb[data-ru]` holds the Russian
    # scripture reference to fetch) — a name collision with this generator,
    # not translation units. Generating from them produces an English page
    # at /ru/ AND strips the attributes the picker needs. When judgment is
    # actually translated, rename its runtime attribute first.
    "judgment/index.html",
}

VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
RAWTEXT = {"script", "style", "textarea", "title"}

# Attributes whose value is a URL and therefore has to move with the page.
URL_ATTRS = {"href", "src", "srcset", "poster", "action", "data", "xlink:href"}

# Written next to every `data-ru`: a short hash of the English the translation
# was made from. `--check` only proves the output matches the attributes; it
# cannot see that the English underneath has since been reworded, which leaves
# the Russian page confidently saying something the English no longer says.
# This is what makes that visible.
FP_ATTR = "data-ru-src"

ALT_START = "<!-- lang-alt:start -->"
ALT_END = "<!-- lang-alt:end -->"

RU_STUB = (
    "<script>\n"
    "/* Static Russian page. The old EN/RU toggle is gone; this only tells a\n"
    "   page's own JS which language it is rendering into. */\n"
    "window.esmrskyLang = 'ru';\n"
    "document.dispatchEvent(new CustomEvent('esmrsky:lang', "
    "{ detail: { lang: 'ru' } }));\n"
    "</script>"
)


# --------------------------------------------------------------------------
# A very small HTML scanner.
#
# Everything here works on source offsets and splices strings, so anything the
# script does not understand survives byte for byte. A real parser would
# reserialize the whole document and quietly reformat 30 hand-written pages.
# --------------------------------------------------------------------------

class Tag:
    __slots__ = ("name", "start", "end", "is_end", "self_closing", "attrs")

    def __init__(self, name, start, end, is_end, self_closing, attrs):
        self.name = name
        self.start = start          # index of '<'
        self.end = end              # index just past '>'
        self.is_end = is_end
        self.self_closing = self_closing
        self.attrs = attrs          # list of Attr

    def attr(self, name):
        for a in self.attrs:
            if a.name == name:
                return a
        return None


class Attr:
    __slots__ = ("name", "start", "end", "vstart", "vend")

    def __init__(self, name, start, end, vstart, vend):
        self.name = name
        self.start = start          # index of the attribute name
        self.end = end              # index just past the value (or name)
        self.vstart = vstart        # index of the value, -1 if valueless
        self.vend = vend

    def value(self, src):
        return "" if self.vstart < 0 else src[self.vstart:self.vend]


WS = " \t\r\n\f"


def parse_tags(src: str) -> list[Tag]:
    tags: list[Tag] = []
    n = len(src)
    i = 0
    while True:
        j = src.find("<", i)
        if j < 0:
            break
        if src.startswith("<!--", j):
            k = src.find("-->", j + 4)
            i = k + 3 if k >= 0 else n
            continue
        if src.startswith("<!", j) or src.startswith("<?", j):
            k = src.find(">", j)
            i = k + 1 if k >= 0 else n
            continue

        p = j + 1
        is_end = False
        if p < n and src[p] == "/":
            is_end = True
            p += 1
        if p >= n or not src[p].isalpha():
            i = j + 1
            continue
        k = p
        while k < n and (src[k].isalnum() or src[k] in ":-_"):
            k += 1
        name = src[p:k].lower()

        attrs: list[Attr] = []
        self_closing = False
        p = k
        while p < n:
            while p < n and src[p] in WS:
                p += 1
            if p >= n or src[p] == ">":
                break
            if src[p] == "/" and p + 1 < n and src[p + 1] == ">":
                self_closing = True
                break
            a_start = p
            while p < n and src[p] not in WS and src[p] not in "=/>":
                p += 1
            a_name = src[a_start:p].lower()
            if not a_name:                      # a stray '/' or '='
                p += 1
                continue
            vstart = vend = -1
            q = p
            while q < n and src[q] in WS:
                q += 1
            if q < n and src[q] == "=":
                q += 1
                while q < n and src[q] in WS:
                    q += 1
                if q < n and src[q] in "\"'":
                    quote = src[q]
                    e = src.find(quote, q + 1)
                    if e < 0:
                        e = n
                    vstart, vend = q + 1, e
                    p = e + 1
                else:
                    e = q
                    while e < n and src[e] not in WS and src[e] != ">":
                        e += 1
                    vstart, vend = q, e
                    p = e
            attrs.append(Attr(a_name, a_start, p, vstart, vend))

        if p < n and src[p] == "/":
            p += 1
        end = p + 1 if p < n and src[p] == ">" else p
        tags.append(Tag(name, j, end, is_end, self_closing, attrs))

        # Inside <script>/<style>/<title>/<textarea> a '<' is just a character.
        if not is_end and not self_closing and name in RAWTEXT:
            m = re.compile(r"</\s*" + name + r"\s*>", re.I).search(src, end)
            i = m.start() if m else n
        else:
            i = end
    return tags


def element_spans(src: str, tags: list[Tag]):
    """Map each start tag to (content_start, content_end) and svg-ness."""
    inner: dict[int, tuple[int, int]] = {}
    in_svg: dict[int, bool] = {}
    stack: list[int] = []
    svg_depth = 0
    for idx, t in enumerate(tags):
        if t.is_end:
            for s in range(len(stack) - 1, -1, -1):
                if tags[stack[s]].name == t.name:
                    for popped in stack[s:]:
                        inner.setdefault(popped, (tags[popped].end, t.start))
                        if tags[popped].name == "svg":
                            svg_depth -= 1
                    del stack[s:]
                    break
            continue
        in_svg[idx] = svg_depth > 0 or t.name == "svg"
        if t.name in VOID or t.self_closing:
            inner[idx] = (t.end, t.end)
            continue
        if t.name == "svg":
            svg_depth += 1
        stack.append(idx)
    for idx in stack:                            # unclosed — shouldn't happen
        inner.setdefault(idx, (tags[idx].end, tags[idx].end))
    return inner, in_svg


def splice(src: str, edits: list[tuple[int, int, str]]) -> str:
    """Apply (start, end, replacement) edits to src. Edits must not overlap."""
    out = []
    at = 0
    for start, end, text in sorted(edits):
        if start < at:
            raise AssertionError(f"overlapping edit at {start} (cursor {at})")
        out.append(src[at:start])
        out.append(text)
        at = end
    out.append(src[at:])
    return "".join(out)


def drop_attrs(src: str, attrs: list[Attr]) -> list[tuple[int, int, str]]:
    """Delete attributes, taking the whitespace around them with them.

    Runs of adjacent attributes are merged first, so `a="1" data-ru-x="2"
    data-ru="3">` loses both without the two deletions fighting over the
    space between them."""
    spans = []
    for a in sorted(attrs, key=lambda a: a.start):
        end = a.end
        while end < len(src) and src[end] in WS:
            end += 1
        if spans and spans[-1][1] >= a.start:
            spans[-1][1] = max(spans[-1][1], end)
        else:
            spans.append([a.start, end])
    out = []
    for start, end in spans:
        if end < len(src) and src[end] in ">/":
            while start > 0 and src[start - 1] in WS:
                start -= 1
        out.append((start, end, ""))
    return out


# --------------------------------------------------------------------------
# data-ru -> markup
# --------------------------------------------------------------------------

def as_html(attr_value: str) -> str:
    """A data-ru value is an HTML fragment that was escaped to fit in an
    attribute, so only the quote escaping has to come back out. Everything
    else (`&amp;version=SYNO` in a Bible Gateway link, `&nbsp;`) is markup
    that must stay escaped."""
    return attr_value.replace("&quot;", '"')


def as_text(attr_value: str) -> str:
    """Inside <svg> the old script assigned textContent, not innerHTML, so a
    label is plain text and any markup character has to be escaped."""
    v = attr_value.replace("&quot;", '"')
    return v.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def apply_translation(src: str) -> str:
    tags = parse_tags(src)
    inner, in_svg = element_spans(src, tags)
    edits: list[tuple[int, int, str]] = []
    covered_until = -1

    for idx, t in enumerate(tags):
        if t.is_end:
            continue
        ru_attrs = [a for a in t.attrs
                    if a.name == "data-ru" or a.name.startswith("data-ru-")]
        if not ru_attrs:
            continue
        # Inside a region the outer data-ru already replaced? Then this
        # element does not exist in the Russian document.
        if t.start < covered_until:
            continue

        # `data-ru-href` survives this pass: the URL rewriter reads it as
        # "the author chose this link themselves, leave it alone" and drops
        # it once it is done.
        edits.extend(drop_attrs(src, [a for a in ru_attrs
                                      if a.name != "data-ru-href"]))
        for a in ru_attrs:
            if a.name == "data-ru":
                cs, ce = inner[idx]
                value = a.value(src)
                edits.append(
                    (cs, ce, as_text(value) if in_svg.get(idx) else as_html(value))
                )
                covered_until = max(covered_until, ce)
            elif a.name == FP_ATTR:
                continue  # a fingerprint of the English, not a translation
            else:
                target = a.name[len("data-ru-"):]
                existing = t.attr(target)
                if existing is not None and existing.vstart >= 0:
                    edits.append((existing.vstart, existing.vend, a.value(src)))
                elif existing is not None:
                    edits.append((existing.end, existing.end,
                                  '="' + a.value(src) + '"'))
                else:
                    edits.append((t.attrs[-1].end, t.attrs[-1].end,
                                  ' ' + target + '="' + a.value(src) + '"'))

    # An attribute edit and its own drop_attr never overlap (different attrs),
    # but a value rewrite on attribute X and the deletion of data-ru-X can be
    # adjacent; sorting handles that, overlap would raise.
    return splice(src, edits)


# --------------------------------------------------------------------------
# Fingerprinting the English
# --------------------------------------------------------------------------

def fingerprint(text: str) -> str:
    """Short hash of the English a translation was made from.

    Whitespace is collapsed first, so reindenting the markup is not mistaken
    for a content change. Anything else — a reworded sentence, a changed tag,
    an added link — is."""
    return hashlib.sha256(" ".join(text.split()).encode("utf-8")).hexdigest()[:10]


def translated_elements(src: str):
    """(tag, data-ru attr, fingerprint attr or None, English source) for every
    element carrying a `data-ru`.

    Skips elements nested inside a region an outer `data-ru` already replaces,
    exactly as apply_translation does — those do not exist in the Russian
    document, so their English is not a thing anyone translated."""
    tags = parse_tags(src)
    inner, _ = element_spans(src, tags)
    covered_until = -1
    for idx, t in enumerate(tags):
        if t.is_end:
            continue
        ru = t.attr("data-ru")
        if ru is None or t.start < covered_until:
            continue
        cs, ce = inner[idx]
        covered_until = max(covered_until, ce)
        yield t, ru, t.attr(FP_ATTR), src[cs:ce]


def stale_report(src: str):
    """(stale, unfingerprinted) — translations whose English has moved, and
    translations carrying no fingerprint to check against."""
    stale, missing = [], []
    for t, ru, fp, english in translated_elements(src):
        want = fingerprint(english)
        if fp is None:
            missing.append(english)
        elif fp.value(src) != want:
            stale.append((english, fp.value(src), want))
    return stale, missing


def write_fingerprints(src: str) -> str:
    """Record the current English against every translation.

    Only ever run when the two are known to agree — it asserts nothing, so
    running it over a page whose English has drifted silently blesses the
    stale Russian."""
    edits: list[tuple[int, int, str]] = []
    for t, ru, fp, english in translated_elements(src):
        want = fingerprint(english)
        if fp is None:
            edits.append((ru.end, ru.end, ' %s="%s"' % (FP_ATTR, want)))
        elif fp.value(src) != want:
            edits.append((fp.vstart, fp.vend, want))
    return splice(src, edits)


# --------------------------------------------------------------------------
# Toggle + script removal
# --------------------------------------------------------------------------

def strip_toggle_and_scripts(src: str) -> str:
    tags = parse_tags(src)
    inner, _ = element_spans(src, tags)
    edits = []
    replaced_foot = False

    # Walk backwards so the last i18n script is the one that carries the stub.
    script_spans = []
    for idx, t in enumerate(tags):
        if t.is_end:
            continue
        if t.name == "script":
            cs, ce = inner[idx]
            if "esmrsky-lang" in src[cs:ce]:
                script_spans.append((t.start, ce + len("</script>")))
        elif t.attr("id") is not None and t.attr("id").value(src) == "langToggle":
            cs, ce = inner[idx]
            end = ce + len(t.name) + 3 if not t.self_closing else t.end
            edits.append((t.start, end, ""))

    for i, (s, e) in enumerate(script_spans):
        last = i == len(script_spans) - 1
        edits.append((s, e, RU_STUB) if last else (s, eat_blank(src, e), ""))
        replaced_foot = replaced_foot or last

    edits = [(s, eat_blank(src, e), t) if t == "" else (s, e, t)
             for s, e, t in edits]
    src = splice(src, edits)
    if not replaced_foot:                       # page had no i18n script
        src = src.replace("</body>", RU_STUB + "\n</body>", 1)
    return src


def eat_blank(src: str, end: int) -> int:
    """Swallow the newline a removed block would otherwise leave behind."""
    i = end
    while i < len(src) and src[i] in " \t":
        i += 1
    return i + 1 if i < len(src) and src[i] == "\n" else end


def set_html_lang(src: str) -> str:
    def repl(m):
        tag = m.group(0)
        tag = re.sub(r'\slang="[^"]*"', ' lang="ru"', tag)
        if 'lang="ru"' not in tag:
            tag = tag[:-1].rstrip() + ' lang="ru">'
        if 'data-lang=' in tag:
            tag = re.sub(r'\sdata-lang="[^"]*"', ' data-lang="ru"', tag)
        else:
            tag = tag[:-1].rstrip() + ' data-lang="ru">'
        return tag
    return re.sub(r"<html\b[^>]*>", repl, src, count=1)


# --------------------------------------------------------------------------
# URL rewriting
# --------------------------------------------------------------------------

SCHEME = re.compile(r"^[a-zA-Z][a-zA-Z0-9+.\-]*:")


def is_relative(value: str) -> bool:
    v = value.strip()
    if not v or v.startswith(("/", "#", "?")) or v.startswith("//"):
        return False
    return not SCHEME.match(v)


def ru_url(value: str, ru_dirs: set[str]) -> str:
    """`/foo/` -> `/foo/ru/` where a Russian page exists; `/` -> `/ru/`.

    A link to a site that has no Russian page yet is left pointing at the
    English one — better a language switch than a 404."""
    m = re.match(r"([^#?]*)(.*)", value, re.S)
    path, tail = m.group(1), m.group(2)
    if path == "/":
        return "/ru/" + tail if "" in ru_dirs else value
    m = re.fullmatch(r"/([^/]+)/", path)
    if m and m.group(1) in ru_dirs:
        return "/" + m.group(1) + "/ru/" + tail
    return value


def rewrite_urls(src: str, ru_dirs: set[str], sibling_pages: set[str]) -> str:
    tags = parse_tags(src)
    inner, _ = element_spans(src, tags)
    edits = []

    for idx, t in enumerate(tags):
        if t.is_end:
            continue

        if t.name == "style":
            cs, ce = inner[idx]
            block = src[cs:ce]
            fixed = rewrite_css_urls(block)
            if fixed != block:
                edits.append((cs, ce, fixed))
            continue

        owns_href = t.attr("data-ru-href") is not None
        if owns_href:
            edits.extend(drop_attrs(src, [t.attr("data-ru-href")]))
        for a in t.attrs:
            if a.vstart < 0:
                continue
            value = a.value(src)
            if a.name == "style":
                fixed = rewrite_css_urls(value)
                if fixed != value:
                    edits.append((a.vstart, a.vend, fixed))
                continue
            if a.name not in URL_ATTRS:
                continue
            if a.name == "href" and owns_href:
                continue                        # the author spelled it out
            if a.name == "href" and t.name == "link":
                rel = t.attr("rel")
                if rel is not None and "alternate" in rel.value(src):
                    continue                    # hreflang pair is absolute
            if a.name == "srcset":
                fixed = rewrite_srcset(value, sibling_pages)
            elif value.startswith("/"):
                fixed = ru_url(value, ru_dirs)
            elif is_relative(value):
                fixed = descend(value, sibling_pages)
            else:
                continue
            if fixed != value:
                edits.append((a.vstart, a.vend, fixed))

    return splice(src, edits)


def descend(value: str, sibling_pages: set[str]) -> str:
    """A relative path one directory deeper. A link to a page that also has a
    Russian copy stays as it is — both copies sit side by side in `ru/`."""
    base = value.split("#")[0].split("?")[0]
    if base in sibling_pages:
        return value
    return "../" + value


def rewrite_srcset(value: str, sibling_pages: set[str]) -> str:
    out = []
    for part in value.split(","):
        stripped = part.strip()
        if not stripped:
            continue
        url, _, descriptor = stripped.partition(" ")
        if is_relative(url):
            url = descend(url, sibling_pages)
        out.append((url + " " + descriptor).strip())
    return ", ".join(out)


CSS_URL = re.compile(r"url\(\s*(\"|'|)([^\"')]*)\1\s*\)")


def rewrite_css_urls(block: str) -> str:
    def repl(m):
        quote, value = m.group(1), m.group(2)
        if not is_relative(value):
            return m.group(0)
        return "url(" + quote + "../" + value + quote + ")"
    return CSS_URL.sub(repl, block)


# --------------------------------------------------------------------------
# The Russian homepage grid
#
# The hub lists every project. Most of them have no Russian page yet, and a
# Russian grid full of cards that open in English is worse than a shorter
# grid — so the Russian homepage lists only what is actually translated.
#
# Which cards those are is worked out here, at build time, from the set of
# pages the generator is emitting. A hand-kept list would be stale the first
# time a page landed.
#
# Dropping cards leaves holes: the grid is four columns of mixed 2x2 / 2x1 /
# 1x1 / 3x1 tiles, packed by CSS grid's own sparse auto-placement. So after
# filtering, the placement is simulated, and any card sitting immediately
# left of a hole is widened to swallow it.
# --------------------------------------------------------------------------

GRID_COLS = 4

# Below this many surviving cards the "Other projects" drawer is not worth a
# disclosure control — everything fits in one grid.
DRAWER_MIN = 12

CARD_RE = re.compile(r'<a href="([^"]*)" class="bento-card([^"]*)"[^>]*>')
SPAN_RE = re.compile(r"\bspan-(\d+)-(\d+)\b")


class Card:
    __slots__ = ("href", "start", "end", "w", "h", "tags", "cls_span")

    def __init__(self, href, start, end, w, h, tags, cls_span):
        self.href = href
        self.start = start          # includes the leading <!-- label --> comment
        self.end = end              # just past </a>
        self.w = w
        self.h = h
        self.tags = tags
        self.cls_span = cls_span    # the span-N-M substring, or "" for 1x1


def _card_start(src: str, at: int) -> int:
    """Extend a card's span backwards over the comment that labels it."""
    i = at
    while i > 0 and src[i - 1] in " \t":
        i -= 1
    if i > 0 and src[i - 1] == "\n":
        line_end = i - 1
        j = src.rfind("\n", 0, line_end)
        line = src[j + 1:line_end].strip()
        if line.startswith("<!--") and line.endswith("-->"):
            return j + 1
    return at


def find_cards(src: str, lo: int, hi: int) -> list[Card]:
    cards = []
    for m in CARD_RE.finditer(src, lo, hi):
        end = src.index("</a>", m.end()) + len("</a>")
        cls = m.group(2)
        sm = SPAN_RE.search(cls)
        w, h = (int(sm.group(1)), int(sm.group(2))) if sm else (1, 1)
        tm = re.search(r'data-tags="([^"]*)"', src[m.start():m.end()])
        tags = tm.group(1).split() if tm else []
        cards.append(Card(m.group(1), _card_start(src, m.start()), end,
                          w, h, tags, sm.group(0) if sm else ""))
    return cards


def place(boxes: list[tuple[int, int]]) -> tuple[list[tuple[int, int]], int]:
    """CSS grid's sparse auto-placement: a cursor that never moves backwards.

    Returns each box's (row, col) and the number of rows used."""
    occupied: set[tuple[int, int]] = set()
    pos = []
    cur_r, cur_c = 0, 0
    for w, h in boxes:
        w = min(w, GRID_COLS)
        r, c = cur_r, cur_c
        while True:
            if c + w > GRID_COLS:
                r, c = r + 1, 0
                continue
            if any((r + dr, c + dc) in occupied
                   for dr in range(h) for dc in range(w)):
                c += 1
                continue
            break
        for dr in range(h):
            for dc in range(w):
                occupied.add((r + dr, c + dc))
        pos.append((r, c))
        cur_r, cur_c = r, c + w
    rows = 1 + max((r + h - 1 for (r, _), (_, h) in zip(pos, boxes)), default=-1)
    return pos, rows


def owner_rows(pos, boxes, row: int) -> list[int]:
    """Indices of the cards that reach into `row`."""
    return [i for i, ((r, _), (_, h)) in enumerate(zip(pos, boxes))
            if r <= row < r + h]


def rebalance(cards: list[Card], allowed: set[tuple[int, int]]) -> None:
    """Widen cards into the holes their dropped neighbours left behind.

    `allowed` is the set of (w, h) the page's own stylesheet has a rule for,
    so this never invents a span class that would not lay out."""
    for _ in range(40):
        boxes = [(c.w, c.h) for c in cards]
        pos, rows = place(boxes)
        occupied = set()
        owner = {}
        for i, ((r, c), (w, h)) in enumerate(zip(pos, boxes)):
            for dr in range(h):
                for dc in range(min(w, GRID_COLS)):
                    occupied.add((r + dr, c + dc))
                    owner[(r + dr, c + dc)] = i

        hole = next(((r, c) for r in range(rows) for c in range(GRID_COLS)
                     if (r, c) not in occupied), None)
        if hole is None:
            return
        hr, hc = hole
        run = 0
        while hc + run < GRID_COLS and (hr, hc + run) not in occupied:
            run += 1

        # First move: the card that ends where the hole begins grows into it.
        left = owner.get((hr, hc - 1)) if hc else None
        if left is not None:
            card = cards[left]
            for extra in range(run, 0, -1):
                if (card.w + extra, card.h) in allowed:
                    card.w += extra
                    break
            else:
                left = None
        if left is not None:
            continue

        # Second move: a hole in the last row usually means one tall card is
        # hanging into a row nothing else reaches. Shortening it removes the
        # row instead of leaving a gap under it — the only other lever, since
        # widening is capped by the span classes the page actually defines.
        if hr != rows - 1:
            return
        shrunk = False
        for i in sorted(owner_rows(pos, boxes, hr), reverse=True):
            card = cards[i]
            if card.h > 1 and (card.w, card.h - 1) in allowed:
                card.h -= 1
                shrunk = True
                break
        if not shrunk:
            return


def allowed_spans(src: str) -> set[tuple[int, int]]:
    spans = {(1, 1)}
    for m in re.finditer(r"\.bento-card\.span-(\d+)-(\d+)\b", src):
        spans.add((int(m.group(1)), int(m.group(2))))
    return spans


def apply_span(src_block: str, card: Card) -> str:
    """Rewrite a card's span class to its rebalanced width."""
    want = "" if (card.w, card.h) == (1, 1) else "span-%d-%d" % (card.w, card.h)
    if want == card.cls_span:
        return src_block
    if card.cls_span:
        if want:
            return src_block.replace(card.cls_span, want, 1)
        return re.sub(r"\s*\b" + re.escape(card.cls_span) + r"\b", "",
                      src_block, count=1)
    return src_block.replace('class="bento-card', 'class="bento-card ' + want, 1)


def filter_ru_grid(src: str, ru_dirs: set[str]) -> str:
    """Keep only the cards whose Russian page exists, then repack the grid."""
    main_open = src.find('<main class="bento-grid">')
    if main_open < 0:
        return src
    main_lo = main_open + len('<main class="bento-grid">')
    main_hi = src.index("</main>", main_lo)

    sec_lo = src.find('<section class="other-projects"')
    if sec_lo >= 0:
        drawer_lo = src.index('id="otherGrid"', sec_lo)
        drawer_lo = src.index(">", drawer_lo) + 1
        sec_hi = src.index("</section>", drawer_lo) + len("</section>")
        drawer_hi = src.rindex("</div>", drawer_lo, sec_hi)
    else:
        drawer_lo = drawer_hi = sec_hi = -1

    def translated(card: Card) -> bool:
        m = re.fullmatch(r"/([^/]+)/", card.href)
        return bool(m) and m.group(1) in ru_dirs

    main_cards = find_cards(src, main_lo, main_hi)
    drawer_cards = find_cards(src, drawer_lo, drawer_hi) if sec_lo >= 0 else []
    keep_main = [c for c in main_cards if translated(c)]
    keep_drawer = [c for c in drawer_cards if translated(c)]

    collapse = sec_lo >= 0 and len(keep_main) + len(keep_drawer) < DRAWER_MIN
    if collapse:
        keep_main += keep_drawer
        keep_drawer = []

    allowed = allowed_spans(src)
    rebalance(keep_main, allowed)

    # Rebuild the two grids from the cards that survived. Working on source
    # slices keeps every card byte-for-byte what the English page had, minus
    # its span class.
    main_html = "\n".join(apply_span(src[c.start:c.end], c) for c in keep_main)
    edits = [(main_lo, main_hi, "\n" + main_html + "\n  " if main_html else "\n  ")]

    if sec_lo >= 0:
        if not keep_drawer:
            # Take the blank line that separated it from the grid with it.
            lo = sec_lo
            while lo > 0 and src[lo - 1] in " \t":
                lo -= 1
            edits.append((lo, eat_blank(src, sec_hi), ""))
        else:
            rebalance(keep_drawer, allowed)
            drawer_html = "\n".join(
                apply_span(src[c.start:c.end], c) for c in keep_drawer)
            edits.append((drawer_lo, drawer_hi, "\n" + drawer_html + "\n    "))
            cm = re.search(r'(<span class="other-count">)(\d+)(</span>)',
                           src[sec_lo:drawer_lo])
            if cm:
                edits.append((sec_lo + cm.start(2), sec_lo + cm.end(2),
                              str(len(keep_drawer))))

    src = splice(src, sorted(edits))

    # A filter button with nothing left to filter is a dead control.
    live = {t for c in keep_main + keep_drawer for t in c.tags}
    def drop_button(m):
        val = m.group(1)
        return "" if val != "all" and val not in live else m.group(0)
    src = re.sub(r'[ \t]*<button class="filter-btn[^"]*" data-filter="([^"]*)"'
                 r'[^>]*>.*?</button>\n', drop_button, src)
    return src


# --------------------------------------------------------------------------
# hreflang
# --------------------------------------------------------------------------

def alt_block(en_url: str, ru_url_: str) -> str:
    return (
        ALT_START + "\n"
        f'<link rel="alternate" hreflang="en" href="{SITE}{en_url}">\n'
        f'<link rel="alternate" hreflang="ru" href="{SITE}{ru_url_}">\n'
        f'<link rel="alternate" hreflang="x-default" href="{SITE}{en_url}">\n'
        + ALT_END
    )


def set_canonical(src: str, url: str) -> str:
    """A generated page is its own canonical, not a copy of the English one."""
    def repl(m):
        return re.sub(r'href="[^"]*"', f'href="{SITE}{url}"', m.group(0))
    return re.sub(r'<link\b[^>]*\brel="canonical"[^>]*>', repl, src, count=1)


def set_alt_block(src: str, block: str) -> str:
    if ALT_START in src:
        return re.sub(re.escape(ALT_START) + r".*?" + re.escape(ALT_END),
                      lambda _: block, src, flags=re.S)
    m = re.search(r'<meta name="viewport"[^>]*>', src)
    if m:
        return src[:m.end()] + "\n" + block + src[m.end():]
    m = re.search(r"<head[^>]*>", src)
    return src[:m.end()] + "\n" + block + src[m.end():]


# --------------------------------------------------------------------------
# Driver
# --------------------------------------------------------------------------

def discover() -> list[str]:
    pages = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames
                       if d not in {".git", "ru", "tools", "node_modules"}]
        for name in sorted(filenames):
            if not name.endswith(".html"):
                continue
            rel = os.path.relpath(os.path.join(dirpath, name), ROOT)
            if rel in SKIP:
                continue
            with open(os.path.join(dirpath, name), encoding="utf-8") as fh:
                if "data-ru" in fh.read():
                    pages.append(rel)
    return sorted(pages)


def urls_for(rel: str) -> tuple[str, str, str]:
    """(en_url, ru_url, output path) for a source page."""
    d, name = os.path.split(rel)
    if name == "index.html":
        en = "/" + (d + "/" if d else "")
        ru = "/" + (d + "/" if d else "") + "ru/"
    else:
        en = "/" + rel
        ru = "/" + (d + "/" if d else "") + "ru/" + name
    out = os.path.join(d, "ru", name) if d else os.path.join("ru", name)
    return en, ru, out


def build(pages: list[str], check: bool, known: list[str] | None = None) -> int:
    # Link rewriting must know about every page that has a Russian copy, not
    # just the ones being rebuilt — otherwise `build-ru.py ecclesia` would
    # emit different links than a full rebuild.
    ru_dirs = set()
    by_dir: dict[str, set[str]] = {}
    for rel in (known if known is not None else pages):
        d, name = os.path.split(rel)
        ru_dirs.add(d)
        by_dir.setdefault(d, set()).add(name)

    changed = 0
    stale_total = [0]
    unfingerprinted = [0]
    for rel in pages:
        d, name = os.path.split(rel)
        en_url, ru_url_, out = urls_for(rel)
        path = os.path.join(ROOT, rel)
        with open(path, encoding="utf-8") as fh:
            src = fh.read()

        patched = set_alt_block(src, alt_block(en_url, ru_url_))
        if patched != src and not check:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(patched)
        if patched != src:
            changed += 1
            print(f"  en  {rel}")

        stale, missing = stale_report(patched)
        for english, had, want in stale:
            print(f"  !!  {rel}: English changed under a translation "
                  f"({had} -> {want}); the Russian below is stale\n"
                  f"      EN now: {' '.join(english.split())[:150]}",
                  file=sys.stderr)
        if stale:
            stale_total[0] += len(stale)
        if missing:
            unfingerprinted[0] += len(missing)

        doc = apply_translation(patched)
        if rel == "index.html":
            # Before the URLs are rewritten: the filter reads each card's
            # English href to decide whether a Russian page exists for it.
            doc = filter_ru_grid(doc, ru_dirs)
        doc = strip_toggle_and_scripts(doc)
        doc = set_html_lang(doc)
        doc = rewrite_urls(doc, ru_dirs, by_dir.get(d, set()))
        doc = set_canonical(doc, ru_url_)

        out_path = os.path.join(ROOT, out)
        old = None
        if os.path.exists(out_path):
            with open(out_path, encoding="utf-8") as fh:
                old = fh.read()
        if old != doc:
            changed += 1
            print(f"  ru  {out}")
            if not check:
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "w", encoding="utf-8") as fh:
                    fh.write(doc)
        leftover = re.search(r'\sdata-ru(-[a-z-]+)?=', doc)
        if leftover:
            print(f"  !!  {out}: {leftover.group(0).strip()} survived into "
                  f"the output", file=sys.stderr)
    if unfingerprinted[0]:
        print(f"  ..  {unfingerprinted[0]} translation(s) carry no {FP_ATTR}; "
              f"run --fingerprint to record the English they were made from",
              file=sys.stderr)
    if stale_total[0]:
        print(f"  !!  {stale_total[0]} translation(s) are stale — the English "
              f"moved after they were written", file=sys.stderr)
    return changed, stale_total[0]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("sites", nargs="*",
                    help="site directory or source path; default: all")
    ap.add_argument("--check", action="store_true",
                    help="report what would change without writing")
    ap.add_argument("--stale", action="store_true",
                    help="only report translations whose English has changed "
                         "since they were written; exit 1 if any have")
    ap.add_argument("--fingerprint", action="store_true",
                    help="record the current English against every translation. "
                         "Only run when the two are known to agree — it blesses "
                         "whatever is there.")
    args = ap.parse_args()

    known = discover()
    pages = known
    if args.sites:
        wanted = {s.strip("/") for s in args.sites}
        pages = [p for p in known
                 if p in wanted or os.path.dirname(p) in wanted
                 or (not os.path.dirname(p) and "" in wanted)]
        if not pages:
            print("nothing matched", file=sys.stderr)
            return 1

    if args.fingerprint:
        touched = 0
        for rel in pages:
            path = os.path.join(ROOT, rel)
            with open(path, encoding="utf-8") as fh:
                src = fh.read()
            out = write_fingerprints(src)
            if out != src:
                with open(path, "w", encoding="utf-8") as fh:
                    fh.write(out)
                touched += 1
                print(f"  fp  {rel}")
        print(f"{len(pages)} page(s), {touched} file(s) fingerprinted")
        return 0

    if args.stale:
        total = 0
        for rel in pages:
            with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
                src = fh.read()
            stale, missing = stale_report(src)
            for english, had, want in stale:
                total += 1
                print(f"  !!  {rel}: {had} -> {want}")
                print(f"      EN now: {' '.join(english.split())[:150]}")
            if missing:
                print(f"  ..  {rel}: {len(missing)} translation(s) "
                      f"carry no {FP_ATTR}")
        print(f"{len(pages)} page(s), {total} stale translation(s)")
        return 1 if total else 0

    changed, stale_total = build(pages, args.check, known)
    print(f"{len(pages)} page(s), {changed} file(s) "
          f"{'would change' if args.check else 'written'}")
    return 1 if stale_total else 0


if __name__ == "__main__":
    sys.exit(main())
