/**
 * Génère 5 variations de couleur d'une peinture — Krea API
 *
 * Pipeline :
 *   1. Upload de l'image source → Krea Assets
 *   2. Flux Kontext (img2img)   → variation colorée, portrait
 *   3. Topaz Upscaler           → 4K (2160 × 3840 px)
 *   4. Téléchargement local     → ./output/
 *
 * Usage :
 *   KREA_API_KEY=xxx npx tsx scripts/generate-variations.ts <chemin-image>
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Config ────────────────────────────────────────────────────────────────────
const API_BASE = 'https://api.krea.ai'
const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 300_000 // 5 min max par job

// Portrait haute résolution (dans la limite de 2368px de Flux Kontext)
const GEN_WIDTH  = 1365
const GEN_HEIGHT = 2048

// Cible 4K portrait après Topaz
const OUT_WIDTH  = 2160
const OUT_HEIGHT = 3840

// ─── 5 variations de couleur ────────────────────────────────────────────────
const VARIATIONS = [
  {
    name: '1-bleu-nuit',
    prompt: 'Change the color of the large canvas painting on the wall to a deep midnight blue (#1a237e). Keep every other element exactly the same: white gallery walls, polished concrete floor, ceiling spotlights, same composition. Only the paint color on the canvas changes.',
  },
  {
    name: '2-vert-foret',
    prompt: 'Change the color of the large canvas painting on the wall to a dark forest green (#1b5e20). Keep every other element exactly the same: white gallery walls, polished concrete floor, ceiling spotlights, same composition. Only the paint color on the canvas changes.',
  },
  {
    name: '3-noir-charbon',
    prompt: 'Change the color of the large canvas painting on the wall to matte charcoal black (#212121). Keep every other element exactly the same: white gallery walls, polished concrete floor, ceiling spotlights, same composition. Only the paint color on the canvas changes.',
  },
  {
    name: '4-ocre-or',
    prompt: 'Change the color of the large canvas painting on the wall to warm ochre gold (#f57f17). Keep every other element exactly the same: white gallery walls, polished concrete floor, ceiling spotlights, same composition. Only the paint color on the canvas changes.',
  },
  {
    name: '5-blanc-ivoire',
    prompt: 'Change the color of the large canvas painting on the wall to pure ivory white (#fafafa). Keep every other element exactly the same: white gallery walls, polished concrete floor, ceiling spotlights, same composition. Only the paint color on the canvas changes.',
  },
]

// ─── Helpers HTTP ──────────────────────────────────────────────────────────────
function authHeader(apiKey: string) {
  return { Authorization: `Bearer ${apiKey}` }
}

async function kreaPost(apiKey: string, path: string, body: unknown): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { ...authHeader(apiKey), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`POST ${path} → ${res.status}: ${err}`)
  }
  return res.json()
}

async function kreaGet(apiKey: string, path: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: authHeader(apiKey),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GET ${path} → ${res.status}: ${err}`)
  }
  return res.json()
}

// ─── Upload image source ───────────────────────────────────────────────────────
async function uploadAsset(apiKey: string, filePath: string): Promise<string> {
  console.log('  📤 Upload de l\'image source...')
  const fileBuffer = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase().replace('.', '')
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`

  const formData = new FormData()
  formData.append('file', new Blob([fileBuffer], { type: mimeType }), path.basename(filePath))

  const res = await fetch(`${API_BASE}/assets`, {
    method: 'POST',
    headers: authHeader(apiKey),
    body: formData,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Upload asset → ${res.status}: ${err}`)
  }
  const data = await res.json()
  console.log(`  ✅ Asset uploadé : ${data.image_url}`)
  return data.image_url as string
}

// ─── Polling job ────────────────────────────────────────────────────────────────
async function pollJob(apiKey: string, jobId: string, label: string): Promise<string> {
  const start = Date.now()
  let dots = 0
  while (true) {
    if (Date.now() - start > POLL_TIMEOUT_MS) {
      throw new Error(`Timeout job ${jobId} (${label})`)
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
    const job = await kreaGet(apiKey, `/jobs/${jobId}`)
    process.stdout.write(`\r     ⏳ ${label} [${job.status}]${'.'.repeat(++dots % 4)}   `)

    if (job.status === 'completed') {
      process.stdout.write('\n')
      const url = job.result?.urls?.[0]
      if (!url) throw new Error(`Job ${jobId} terminé sans URL de résultat`)
      return url as string
    }
    if (job.status === 'failed' || job.status === 'cancelled') {
      throw new Error(`Job ${jobId} (${label}) : ${job.status}`)
    }
  }
}

// ─── Étape 1 : Flux Kontext img2img ──────────────────────────────────────────
async function generateVariation(
  apiKey: string,
  sourceUrl: string,
  variation: (typeof VARIATIONS)[0]
): Promise<string> {
  const job = await kreaPost(apiKey, '/generate/image/bfl/flux-1-kontext-dev', {
    prompt: variation.prompt,
    imageUrl: sourceUrl,
    strength: 0.75,          // assez fort pour changer la couleur, conserve la scène
    width: GEN_WIDTH,
    height: GEN_HEIGHT,
    seed: 42,
  })
  return pollJob(apiKey, job.job_id, 'Flux Kontext')
}

// ─── Étape 2 : Topaz → 4K ────────────────────────────────────────────────────
async function upscaleTo4K(apiKey: string, imageUrl: string): Promise<string> {
  const job = await kreaPost(apiKey, '/generate/enhance/topaz/standard-enhance', {
    image_url: imageUrl,
    width: OUT_WIDTH,
    height: OUT_HEIGHT,
    model: 'Standard V2',
  })
  return pollJob(apiKey, job.job_id, 'Topaz 4K')
}

// ─── Téléchargement ───────────────────────────────────────────────────────────
async function downloadImage(url: string, outPath: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buffer)
  console.log(`  💾 Sauvegardé → ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`)
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const imagePath = process.argv[2]
  if (!imagePath) {
    console.error('Usage : npx tsx scripts/generate-variations.ts <chemin-vers-image>')
    process.exit(1)
  }

  const apiKey = process.env.KREA_API_KEY
  if (!apiKey) {
    console.error('❌  Variable manquante : KREA_API_KEY')
    console.error('   Ajoutez dans .env.local : KREA_API_KEY=votre_clé')
    process.exit(1)
  }

  if (!fs.existsSync(path.resolve(imagePath))) {
    console.error(`❌  Image introuvable : ${imagePath}`)
    process.exit(1)
  }

  const outputDir = path.resolve('./output')
  fs.mkdirSync(outputDir, { recursive: true })

  console.log('🎨  Vitreen — Générateur de variations (Krea API)')
  console.log(`   Modèle génération : Flux Kontext (img2img, ${GEN_WIDTH}×${GEN_HEIGHT})`)
  console.log(`   Upscale           : Topaz Standard V2 → 4K (${OUT_WIDTH}×${OUT_HEIGHT})`)
  console.log(`   Source            : ${imagePath}\n`)

  // Upload une seule fois
  const sourceUrl = await uploadAsset(apiKey, imagePath)

  const results: string[] = []

  for (const variation of VARIATIONS) {
    console.log(`\n🖌  Variation : ${variation.name}`)
    try {
      // Génération
      const varUrl = await generateVariation(apiKey, sourceUrl, variation)
      console.log(`  ✅ Variation générée`)

      // Upscale 4K
      const finalUrl = await upscaleTo4K(apiKey, varUrl)
      console.log(`  ✅ Upscalé en 4K`)

      // Sauvegarde
      const outPath = path.join(outputDir, `${variation.name}.jpg`)
      await downloadImage(finalUrl, outPath)
      results.push(outPath)
    } catch (err: any) {
      console.error(`  ❌  Erreur : ${err.message}`)
    }
  }

  console.log(`\n✨  Terminé — ${results.length}/5 images dans ./output/`)
  results.forEach((f) => console.log('  -', path.basename(f)))
}

main().catch((err) => {
  console.error('Erreur fatale :', err)
  process.exit(1)
})
