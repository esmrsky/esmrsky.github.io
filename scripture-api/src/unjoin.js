/* YouVersion removes its footnote markers without keeping the space that stood beside
   them, so one word runs into the next: "eternal life inChrist Jesus", "to be sinfor us",
   "the <span class="nd">Lord</span>from your mouth". Its plain text carries the same joins,
   so every reader of the NIV and TPT saw them.

   The repair works on the HTML, where the joins can be seen:
   - a letter straight after a closing </span> is a new word. The small-caps Lord and TPT's
     italic supplied words are the spans this happens after (34 in the NIV and 10 in the TPT
     across every chapter the estate cites, and not one glued form a real word);
   - a lowercase letter straight into a capital never happens in these texts;
   - nor does a letter and a stop or comma running into the next letter;
   - joins where both halves are lowercase can't be told from real words by rule, so each
     one found is listed.
   Plain text is then the repaired HTML flattened, which reproduced YouVersion's own plain
   text exactly on 24 varied passages in both versions. Found by sweeping the 426 NIV and 347
   TPT chapters the estate cites against a dictionary on September 18, 2026. */

const JOINS = [
  ['andthis', 'and this'], ['believethat', 'believe that'], ['contemplatethe', 'contemplate the'],
  ['landthan', 'land than'], ['naturea', 'nature a'], ['sideof', 'side of'], ['sinfor', 'sin for'],
  ['theirwrath', 'their wrath'], ['Godmay', 'God may']
];
const JOIN_PATTERNS = JOINS.map(([joined, split]) => [new RegExp(`\\b${joined}\\b`, 'g'), split]);

export function unjoinText(text) {
  let t = String(text)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([a-z][.,;:!?])([A-Za-z])/g, '$1 $2');
  for (const [pattern, split] of JOIN_PATTERNS) t = t.replace(pattern, split);
  return t;
}

export function unjoinHtml(html) {
  return String(html)
    .replace(/([A-Za-z])<\/span>(?=[A-Za-z])/g, '$1</span> ')
    .split(/(<[^>]*>)/)
    .map(part => (part.startsWith('<') ? part : unjoinText(part)))
    .join('');
}

const ENTITIES = { '&nbsp;': ' ', '&quot;': '"', '&#39;': "'", '&#039;': "'", '&#x27;': "'", '&lt;': '<', '&gt;': '>', '&amp;': '&' };

/* YouVersion's own plain text: blocks joined by a space, verse labels and tags gone. */
export function flatten(html) {
  return String(html)
    .replace(/<span class="yv-vlbl">[\s\S]*?<\/span>/g, '')
    .replace(/<\/div>\s*<div\b[^>]*>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:nbsp|quot|#0?39|#x27|lt|gt|amp);/g, (e) => ENTITIES[e] ?? e)
    .replace(/[ \t\n]+/g, ' ')
    .trim();
}
