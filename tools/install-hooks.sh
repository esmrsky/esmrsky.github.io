#!/bin/sh
# Installs tools/baseline-check.py as the pre-commit hook of the hub and of every
# standalone repo beside it, so a page cannot be committed with the tap flash,
# snapping accordions or a new `transition: all`. Safe to re-run; a repo that
# already has a different pre-commit hook is left alone and named.
#   sh hub/esmrsky.github.io/tools/install-hooks.sh
HUB="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="$HUB/tools/baseline-check.py"
for repo in "$HUB" "$HUB"/../../live-linked/*/ "$HUB"/../../live-unlinked/*/; do
  repo="${repo%/}"
  [ -d "$repo/.git" ] || continue
  hook="$repo/.git/hooks/pre-commit"
  if [ -f "$hook" ] && ! grep -q baseline-check "$hook"; then echo "left alone (has its own hook): $repo"; continue; fi
  printf '#!/bin/sh\n# estate baseline: tap highlight, eased accordions, no new transition:all\n# source: %s\nexec python3 "%s"\n' "$CHECK" "$CHECK" > "$hook"
  chmod +x "$hook"
  echo "installed: $(basename "$repo")"
done
