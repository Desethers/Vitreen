#!/bin/bash
API="3406b232-833e-4a75-a25a-afd1a53e41b2:PczbFc4joged5wBSPoJkv8xohdeC4aOP"
OUT="/Users/raphael/Travail/Web/Vitreen/galerie-studio/output"
mkdir -p "$OUT"

declare -a NAMES=("blanc-ivoire" "ocre-or" "noir-charbon" "vert-foret" "bleu-nuit")
declare -a URLS=(
  "https://gen.krea.ai/images/93d43e10-559c-492a-a325-7a97bf39ed3a.png"
  "https://gen.krea.ai/images/e5e188a6-b965-4bad-9961-9eb1d0c9ce0d.png"
  "https://gen.krea.ai/images/e496737c-7e58-4c29-adaf-d1cad679d0cb.png"
  "https://gen.krea.ai/images/071435b7-1d0f-419b-8203-e79eb517d195.png"
  "https://gen.krea.ai/images/d2c12507-2e2f-4e8d-89ac-153e9ea6e7d9.png"
)

for i in 0 1 2 3 4; do
  NAME="${NAMES[$i]}"
  URL="${URLS[$i]}"
  echo "🖼  $NAME"

  JOB_ID=$(curl -s -X POST "https://api.krea.ai/generate/enhance/topaz/standard-enhance" \
    -H "Authorization: Bearer $API" \
    -H "Content-Type: application/json" \
    -d "{\"image_url\":\"$URL\",\"width\":2160,\"height\":3840,\"model\":\"Standard V2\"}" \
    | python3 -c "import sys,json; print(json.load(sys.stdin).get('job_id','ERR'))")

  echo "  job: $JOB_ID"

  for attempt in $(seq 1 30); do
    sleep 5
    RESP=$(curl -s "https://api.krea.ai/jobs/$JOB_ID" -H "Authorization: Bearer $API")
    STATUS=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))")
    echo "  [$attempt] $STATUS"

    if [ "$STATUS" = "completed" ]; then
      RESULT_URL=$(echo "$RESP" | python3 -c "import sys,json; j=json.load(sys.stdin); print(j.get('result',{}).get('urls',[''])[0])")
      curl -s -o "$OUT/${NAME}-4K.jpg" "$RESULT_URL"
      SIZE=$(du -k "$OUT/${NAME}-4K.jpg" | cut -f1)
      echo "  ✅ ${NAME}-4K.jpg (${SIZE}KB)"
      break
    elif [ "$STATUS" = "failed" ]; then
      curl -s -o "$OUT/${NAME}-flux.png" "$URL"
      echo "  ⚠️  fallback → ${NAME}-flux.png"
      break
    fi
  done
done

echo ""
echo "✨ Terminé — output/"
ls -lh "$OUT"
