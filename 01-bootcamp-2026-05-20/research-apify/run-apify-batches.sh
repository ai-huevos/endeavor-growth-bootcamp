#!/usr/bin/env bash
# Apify batch orchestrator
# Runs 4 batches of 5 companies each, 2h apart, total ~6-8h
# Use: nohup bash run-apify-batches.sh > apify.log 2>&1 &

set -uo pipefail

ROOT="/Users/naboo/Documents/Viral Framework/viral-framework"
ATTENDEES="/Users/naboo/Documents/Endeavor/research/attendees-top30.json"
OUTPUT_BASE="/Users/naboo/Documents/Endeavor/research"
SCRIPT="$ROOT/scripts/run_apify.py"

# 4 batches of 5, last has 3
BATCH_SIZE=5
SLEEP_BETWEEN=7200  # 2 hours

# Load attendees count
TOTAL=$(python3 -c "import json; print(len(json.load(open('$ATTENDEES'))))")
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting Apify orchestrator. Total attendees: $TOTAL"

cd "$ROOT"

BATCH_NUM=0
INDEX=0
while [ $INDEX -lt $TOTAL ]; do
  BATCH_NUM=$((BATCH_NUM + 1))
  BATCH_END=$((INDEX + BATCH_SIZE))
  if [ $BATCH_END -gt $TOTAL ]; then BATCH_END=$TOTAL; fi

  echo ""
  echo "========================================================================"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] BATCH $BATCH_NUM (attendees $((INDEX+1))-$BATCH_END of $TOTAL)"
  echo "========================================================================"

  for ((i=INDEX; i<BATCH_END; i++)); do
    # Extract attendee data as JSON
    VARS=$(python3 -c "
import json
data = json.load(open('$ATTENDEES'))[$i]
out = {
  'company': data['name'],
  'website': data['website'],
  'country_code': data['country_code'],
  'country_name': data['country_name']
}
print(json.dumps(out, ensure_ascii=False))
")
    SLUG=$(python3 -c "import json; print(json.load(open('$ATTENDEES'))[$i]['slug'])")
    OUTDIR="$OUTPUT_BASE/$SLUG"

    echo ""
    echo "[$(date '+%H:%M:%S')] -> Running: $SLUG"
    echo "    vars: $VARS"
    echo "    out:  $OUTDIR"

    mkdir -p "$OUTDIR"
    python3 "$SCRIPT" --batch --vars "$VARS" --output-dir "$OUTDIR" 2>&1 | sed 's/^/    /'

    EXIT=$?
    if [ $EXIT -eq 0 ]; then
      echo "[$(date '+%H:%M:%S')] -> DONE: $SLUG"
    else
      echo "[$(date '+%H:%M:%S')] -> ERROR ($EXIT): $SLUG"
    fi
  done

  INDEX=$BATCH_END

  if [ $INDEX -lt $TOTAL ]; then
    echo ""
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Batch $BATCH_NUM complete. Sleeping ${SLEEP_BETWEEN}s ($(($SLEEP_BETWEEN/60))min) before next batch..."
    sleep $SLEEP_BETWEEN
  fi
done

echo ""
echo "========================================================================"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ALL BATCHES COMPLETE. Generating INDEX.md"
echo "========================================================================"

# Build research/INDEX.md
python3 << 'PYEOF'
import json, os, glob
from pathlib import Path

attendees = json.load(open('/Users/naboo/Documents/Endeavor/research/attendees-top30.json'))
out_lines = ['# Apify Research INDEX', '', f'Generado: $(date)', '', '| # | Empresa | Slug | Website | Raw outputs |', '|---|---------|------|---------|-------------|']
for i, a in enumerate(attendees, 1):
    outdir = Path('/Users/naboo/Documents/Endeavor/research') / a['slug']
    raw = outdir / 'raw'
    files = list(raw.glob('*.json')) if raw.exists() else []
    files_str = ', '.join(sorted(f.stem for f in files)) if files else '(none)'
    out_lines.append(f'| {i} | {a["name"]} | `{a["slug"]}` | {a["website"]} | {files_str} |')

Path('/Users/naboo/Documents/Endeavor/research/INDEX.md').write_text('\n'.join(out_lines), encoding='utf-8')
print('INDEX.md generated.')
PYEOF

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE."
