#!/bin/bash
API="3406b232-833e-4a75-a25a-afd1a53e41b2:PczbFc4joged5wBSPoJkv8xohdeC4aOP"
OUT="/Users/raphael/Travail/Web/Vitreen/galerie-studio/output"
SOURCE_URL="https://app-uploads.krea.ai/6a4b67d3-3135-4b33-ad00-2c214bb8b5be/1774863586204-Monochrome4.png"
mkdir -p "$OUT"

# Paramètres
declare -a NAMES=("bleu-nuit" "vert-foret" "noir-charbon" "rouge-brique" "blanc-ivoire")
declare -a PROMPTS=(
  "Change only the color of the unframed canvas to deep midnight blue. The canvas has no frame, no border, no molding — exactly like the reference image. Keep the same frameless canvas, same gallery, same composition."
  "Change only the color of the unframed canvas to dark forest green. The canvas has no frame, no border, no molding — exactly like the reference image. Keep the same frameless canvas, same gallery, same composition."
  "Change only the color of the unframed canvas to deep charcoal black. The canvas has no frame, no border, no molding — exactly like the reference image. Keep the same frameless canvas, same gallery, same composition."
  "Change only the color of the unframed canvas to deep brick red. The canvas has no frame, no border, no molding — exactly like the reference image. Keep the same frameless canvas, same gallery, same composition."
  "Change only the color of the unframed canvas to warm sand beige. The canvas has no frame, no border, no molding — exactly like the reference image. Keep the same frameless canvas, same gallery, same composition."
)
declare -a SEEDS=(100 200 300 400 500)

for i in 0 1 2 3 4; do
  NAME="${NAMES[$i]}"
  PROMPT="${PROMPTS[$i]}"
  SEED="${SEEDS[$i]}"

  echo "🎨 Génération : $NAME (seed=$SEED)"

  BODY=$(python3 -c "import json; print(json.dumps({
    'prompt': '''${PROMPT}''',
    'imageUrl': '${SOURCE_URL}',
    'strength': 0.85,
    'width': 1365,
    'height': 2048,
    'seed': ${SEED},
    'guidance_scale_flux': 12,
    'steps': 30
  }))")

  JOB=$(curl -s -X POST "https://api.krea.ai/generate/image/bfl/flux-1-kontext-dev" \
    -H "Authorization: Bearer $API" \
    -H "Content-Type: application/json" \
    -d "$BODY")

  JOB_ID=$(echo "$JOB" | python3 -c "import sys,json; j=json.load(sys.stdin); print(j.get('job_id', j))")
  echo "  job: $JOB_ID"

  for attempt in $(seq 1 40); do
    sleep 4
    RESP=$(curl -s "https://api.krea.ai/jobs/$JOB_ID" -H "Authorization: Bearer $API")
    STATUS=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))")

    if [ "$STATUS" = "completed" ]; then
      FLUX_URL=$(echo "$RESP" | python3 -c "import sys,json; j=json.load(sys.stdin); print(j.get('result',{}).get('urls',[''])[0])")
      echo "  ✅ Flux OK → Topaz 4K..."

      # Topaz upscale
      TOPAZ_JOB=$(curl -s -X POST "https://api.krea.ai/generate/enhance/topaz/standard-enhance" \
        -H "Authorization: Bearer $API" \
        -H "Content-Type: application/json" \
        -d "{\"image_url\":\"$FLUX_URL\",\"width\":2160,\"height\":3840,\"model\":\"Standard V2\"}")

      TOPAZ_ID=$(echo "$TOPAZ_JOB" | python3 -c "import sys,json; print(json.load(sys.stdin).get('job_id','ERR'))")

      for t in $(seq 1 20); do
        sleep 5
        TRESULT=$(curl -s "https://api.krea.ai/jobs/$TOPAZ_ID" -H "Authorization: Bearer $API")
        TSTATUS=$(echo "$TRESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))")
        if [ "$TSTATUS" = "completed" ]; then
          FINAL_URL=$(echo "$TRESULT" | python3 -c "import sys,json; j=json.load(sys.stdin); print(j.get('result',{}).get('urls',[''])[0])")
          curl -s -o "$OUT/${NAME}-4K.jpg" "$FINAL_URL"
          echo "  💾 ${NAME}-4K.jpg ($(du -k "$OUT/${NAME}-4K.jpg" | cut -f1)KB)"
          break
        elif [ "$TSTATUS" = "failed" ]; then
          curl -s -o "$OUT/${NAME}-flux.png" "$FLUX_URL"
          echo "  ⚠️  Topaz failed → ${NAME}-flux.png"
          break
        fi
      done
      break
    elif [ "$STATUS" = "failed" ]; then
      echo "  ❌ Flux failed: $RESP"
      break
    fi
  done
done

echo ""
echo "✨ Terminé — output/"
ls -lh "$OUT"
