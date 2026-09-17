#!/usr/bin/env node
/* Bake a translation into a page's [data-verse] slots.
 *
 * The pages fetch their scripture at runtime, so what sits in the markup is only
 * the fallback: what a reader without JavaScript gets, and what stands in when
 * bolls.life can't be reached. That fallback ships as the King James, which is
 * public domain. If you would rather it were the NIV — as the estate now ships —
 * run this from a machine that can reach the Worker and bolls.life and it will
 * rewrite every slot in place. NIV is read from YouVersion through the Worker.
 *
 *   node tools/bake-verses.mjs salvation/index.html            # dry run, NIV
 *   node tools/bake-verses.mjs salvation/index.html --write
 *   node tools/bake-verses.mjs salvation/index.html --version NASB --write
 *
 * It only ever replaces the contents of an element that already carries
 * data-verse, and it leaves the reference, the markup and the prose alone. Check
 * the diff before committing: the whole point of baking is that the text is
 * right when nothing else is available to correct it.
 */

import fs from 'node:fs';

const args = process.argv.slice(2);
const vFlag = args.indexOf('--version');
/* Read the version only when the flag is actually there: indexOf returns -1 when
   it is not, and args[-1 + 1] is the filename. */
const version = (vFlag > -1 ? args[vFlag + 1] || 'NIV' : 'NIV').toUpperCase();
const file = args.filter((a, i) => !a.startsWith('--') && !(vFlag > -1 && i === vFlag + 1))[0];
const write = args.includes('--write');

if (!file) {
  console.error('usage: node tools/bake-verses.mjs <file.html> [--version NIV] [--write]');
  process.exit(2);
}

/* bolls indexes books 1-66 in canonical order; the page's reference strings name
   them the way the copy does, so the table has to accept both spellings. */
const BOOKS = [
  ['Genesis', 'Gen'], ['Exodus', 'Ex', 'Exod'], ['Leviticus', 'Lev'], ['Numbers', 'Num'],
  ['Deuteronomy', 'Deut'], ['Joshua', 'Josh'], ['Judges', 'Judg'], ['Ruth'],
  ['1 Samuel', '1 Sam'], ['2 Samuel', '2 Sam'], ['1 Kings', '1 Kgs'], ['2 Kings', '2 Kgs'],
  ['1 Chronicles', '1 Chr'], ['2 Chronicles', '2 Chr'], ['Ezra'], ['Nehemiah', 'Neh'],
  ['Esther', 'Esth'], ['Job'], ['Psalms', 'Psalm', 'Ps'], ['Proverbs', 'Prov'],
  ['Ecclesiastes', 'Eccl'], ['Song of Songs', 'Song'], ['Isaiah', 'Isa'],
  ['Jeremiah', 'Jer'], ['Lamentations', 'Lam'], ['Ezekiel', 'Ezek'], ['Daniel', 'Dan'],
  ['Hosea', 'Hos'], ['Joel'], ['Amos'], ['Obadiah', 'Obad'], ['Jonah'], ['Micah', 'Mic'],
  ['Nahum', 'Nah'], ['Habakkuk', 'Hab'], ['Zephaniah', 'Zeph'], ['Haggai', 'Hag'],
  ['Zechariah', 'Zech'], ['Malachi', 'Mal'], ['Matthew', 'Matt'], ['Mark'], ['Luke'],
  ['John'], ['Acts'], ['Romans', 'Rom'], ['1 Corinthians', '1 Cor'], ['2 Corinthians', '2 Cor'],
  ['Galatians', 'Gal'], ['Ephesians', 'Eph'], ['Philippians', 'Phil'], ['Colossians', 'Col'],
  ['1 Thessalonians', '1 Thess'], ['2 Thessalonians', '2 Thess'], ['1 Timothy', '1 Tim'],
  ['2 Timothy', '2 Tim'], ['Titus'], ['Philemon', 'Philem'], ['Hebrews', 'Heb'],
  ['James', 'Jas'], ['1 Peter', '1 Pet'], ['2 Peter', '2 Pet'], ['1 John'], ['2 John'],
  ['3 John'], ['Jude'], ['Revelation', 'Rev']
];
const BY_NAME = new Map();
BOOKS.forEach((names, i) => names.forEach((n) => BY_NAME.set(n.toLowerCase(), i + 1)));

/* Obadiah, Philemon, 2-3 John and Jude have one chapter apiece. */
const ONE_CHAPTER = new Set([31, 57, 63, 64, 65]);

function parseRef(ref) {
  const m = String(ref).trim().match(/^((?:[123]\s)?[A-Za-z][A-Za-z ]*?)\.?\s+(\d+)(?::(\d+)(?:[-–](\d+))?)?$/);
  if (!m) return null;
  const id = BY_NAME.get(m[1].trim().toLowerCase());
  if (!id) return null;
  const first = Number(m[2]);
  if (ONE_CHAPTER.has(id) && !m[3]) return { id, chapter: 1, from: first, to: first };
  const from = m[3] ? Number(m[3]) : null;
  return { id, chapter: first, from, to: m[4] ? Number(m[4]) : from };
}

/* NIV comes from YouVersion through the estate's Worker (the current NIV; bolls.life's NIV
   is the 1984 edition). Its HTML marks every verse, so a chapter splits into the same
   [{verse, text}] list bolls returns. Every other version still comes from bolls. */
const USFM = 'GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV'.split(' ');
async function youVersionChapter(id, ch) {
  const r = await fetch(`https://esmrsky-scripture-api.esmrsky.workers.dev/passage?version=111&passage=${USFM[id - 1]}.${ch}&format=html`,
    { headers: { Origin: 'https://esmrsky.github.io', Accept: 'application/json' } });
  const b = await r.json().catch(() => ({}));
  if (!r.ok || !b.content) throw new Error(`${r.status} for NIV ${USFM[id - 1]}.${ch}`);
  const parts = b.content.replace(/<span class="yv-vlbl">[\s\S]*?<\/span>/g, '').split(/<span class="yv-v" v="(\d+)[^"]*"><\/span>/);
  const verses = [];
  for (let i = 1; i < parts.length; i += 2) {
    const text = parts[i + 1].replace(/<\/div>\s*<div\b[^>]*>/g, '<br>').replace(/<\/?(?:div|span)\b[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;/g, "'").replace(/&amp;/g, '&')
      .replace(/^(?:\s*<br>)+|(?:<br>\s*)+$/g, '').trim();
    if (text) verses.push({ verse: Number(parts[i]), text });
  }
  return verses;
}

const chapters = new Map();
async function chapter(id, ch) {
  const key = `${version}/${id}/${ch}`;
  if (!chapters.has(key)) {
    chapters.set(key, version === 'NIV' ? youVersionChapter(id, ch) : fetch(`https://bolls.life/get-text/${version}/${id}/${ch}/`)
      .then((r) => { if (!r.ok) throw new Error(`${r.status} for ${key}`); return r.json(); }));
  }
  return chapters.get(key);
}

const escHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

/* bolls returns small HTML fragments: footnotes and Strong's numbers go, <br>
   becomes a space (the baked copy is one run of prose), italics survive. */
function clean(text) {
  /* sentinels no scripture text contains and no escape touches */
  const I = '@@BAKEI@@', J = '@@BAKE/I@@';
  const marked = String(text)
    .replace(/<s>[\s\S]*?<\/s>/gi, '')
    .replace(/<sup>[\s\S]*?<\/sup>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?(?:i|em)\b[^>]*>/gi, (m) => (m[1] === '/' ? J : I))
    .replace(/<[^>]*>/g, '');
  return escHtml(marked).split(J).join('</i>').split(I).join('<i>').replace(/\s{2,}/g, ' ').trim();
}

async function textFor(ref) {
  const p = parseRef(ref);
  if (!p) throw new Error(`unparsed reference: ${ref}`);
  const verses = await chapter(p.id, p.chapter);
  const picked = p.from === null
    ? verses.slice(0, 3)
    : verses.filter((v) => v.verse >= p.from && v.verse <= (p.to ?? p.from));
  if (!picked.length) throw new Error(`no verses for ${ref}`);
  return picked.map((v) => clean(v.text)).join(' ');
}

const html = fs.readFileSync(file, 'utf8');
/* Matches an element that carries data-verse and has no element children — the
   inline quotations. The set-piece blocks keep their text in a .vtext child, so
   they are handled by the second pass. */
const SLOT = /(<(\w+)\b[^>]*\bdata-verse="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g;

const refs = [...html.matchAll(SLOT)].map((m) => m[3]);
console.log(`${file}: ${refs.length} slots, ${new Set(refs).size} distinct references, baking ${version}`);

const cache = new Map();
for (const ref of new Set(refs)) {
  try { cache.set(ref, await textFor(ref)); }
  catch (e) { console.error(`  ! ${ref}: ${e.message}`); }
}

let changed = 0, skipped = 0;
const out = html.replace(SLOT, (whole, open, tag, ref, body, close) => {
  const text = cache.get(ref);
  if (!text) { skipped++; return whole; }
  /* The set pieces wrap their text; rewrite the wrapper's contents, not the figure's. */
  if (/<\w/.test(body)) {
    const inner = body.replace(/(<[^>]*class="[^"]*\bvtext\b[^"]*"[^>]*>)([\s\S]*?)(<\/\w+>)/,
      (w, o, t, c) => o + text + c);
    if (inner === body) { skipped++; return whole; }
    changed++;
    return open + inner + close;
  }
  if (body.trim() === text) { skipped++; return whole; }
  changed++;
  return open + text + close;
});

console.log(`  ${changed} rewritten, ${skipped} left alone`);
if (write) { fs.writeFileSync(file, out); console.log(`  written to ${file}`); }
else console.log('  dry run — pass --write to apply, then read the diff');
