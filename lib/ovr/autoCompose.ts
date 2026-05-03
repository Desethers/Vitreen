import type { Block, BlockType, ImageItem, TextPool } from './buildTypes'
import { makeBlock } from './buildTypes'

// ─── Image-only recipes (used when textPool is empty) ────────────────────────

const IMAGE_RECIPES_BY_COUNT: Record<number, BlockType[][]> = {
  1: [['full']],
  2: [['pair'], ['full', 'full']],
  3: [['trio'], ['full', 'pair']],
  4: [['pair', 'pair'], ['full', 'trio']],
  5: [['full', 'pair', 'pair'], ['pair', 'trio']],
  6: [['trio', 'pair', 'full'], ['pair', 'pair', 'pair'], ['full', 'pair', 'trio']],
  7: [['full', 'pair', 'pair', 'pair'], ['trio', 'pair', 'pair'], ['pair', 'trio', 'pair']],
  8: [['trio', 'pair', 'trio'], ['full', 'pair', 'trio', 'pair'], ['pair', 'pair', 'pair', 'pair']],
}

function imageOnlyRecipe(count: number, seed: number): BlockType[] {
  if (count === 0) return []
  if (count <= 8) {
    const bucket = IMAGE_RECIPES_BY_COUNT[count] ?? [['full']]
    return bucket[seed % bucket.length]
  }
  // Long sequences: groups of 3-2-1 with seed-driven variety
  const out: BlockType[] = []
  let remaining = count
  let i = seed
  while (remaining > 0) {
    if (remaining >= 3 && (i % 4 === 0 || remaining >= 6)) { out.push('trio'); remaining -= 3 }
    else if (remaining >= 2 && i % 3 !== 2) { out.push('pair'); remaining -= 2 }
    else { out.push('full'); remaining -= 1 }
    i++
  }
  return out
}

// ─── Group images into "chapters" so quotes can sit between them ─────────────

function chunkImagesIntoChapters(count: number, chapters: number, seed: number): number[] {
  // Returns array of image counts per chapter, each ≥ 1, summing to count
  if (chapters <= 0) return [count]
  if (chapters >= count) return Array.from({ length: count }, () => 1)
  const base = Math.floor(count / chapters)
  const extras = count - base * chapters
  const sizes = Array.from({ length: chapters }, (_, i) => base + (i < extras ? 1 : 0))
  // Light shuffle by seed for variety
  if (seed % 2 === 1 && sizes.length > 1) sizes.reverse()
  return sizes
}

function recipeForChapter(count: number, seed: number): BlockType[] {
  return imageOnlyRecipe(count, seed)
}

// ─── Main composer ───────────────────────────────────────────────────────────

export function autoCompose(
  images: ImageItem[],
  textPool: TextPool = { intro: '', quotes: [], closing: '' },
  seed = 0,
): Block[] {
  if (images.length === 0 && !textPool.intro && textPool.quotes.length === 0 && !textPool.closing) {
    return []
  }

  // Images-only path — assign image IDs in recipe order (was () => null → empty preview slots)
  const hasAnyText = !!textPool.intro || textPool.quotes.length > 0 || !!textPool.closing
  if (!hasAnyText) {
    const nextId = makeImgIdResolver(images)
    return imageOnlyRecipe(images.length, seed).map(buildBlockOfType(images, nextId))
  }

  // Text + images path: split images into chapters separated by quotes
  const quoteCount = textPool.quotes.length
  const chapterCount = Math.max(1, quoteCount + 1)
  const introUsesFirstImage = !!(textPool.intro && images.length > 0)
  const imagesForChapters = introUsesFirstImage ? images.length - 1 : images.length
  const chapterSizes = chunkImagesIntoChapters(imagesForChapters, chapterCount, seed)

  const result: Block[] = []
  let imgCursor = introUsesFirstImage ? 1 : 0

  // Intro block — show first artwork under the intro copy (was empty slot → gray hero)
  if (textPool.intro) {
    const intro = makeBlock('quotefull')
    intro.quoteText = textPool.intro
    intro.quoteAuthor = ''
    if (introUsesFirstImage) intro.slots = [{ imageId: images[0].id }]
    result.push(intro)
  }

  // Walk chapters: chapter images, then quote (except last)
  for (let c = 0; c < chapterCount; c++) {
    const size = chapterSizes[c] ?? 0
    const chapterImages = images.slice(imgCursor, imgCursor + size)
    imgCursor += size

    const chapterBlocks = recipeForChapter(chapterImages.length, seed + c).map(
      buildBlockOfType(chapterImages, makeImgIdResolver(chapterImages)),
    )
    result.push(...chapterBlocks)

    // Quote between chapters (not after last chapter)
    if (c < quoteCount) {
      const q = textPool.quotes[c]
      const isText = q.kind === 'text'
      // Alternate quote vs side: side gives variety when chapter has follow-up images
      const useSide = (seed + c) % 3 === 0 && imgCursor < images.length
      if (useSide) {
        const sideBlock = makeBlock('side')
        sideBlock.quoteText = q.text
        sideBlock.quoteAuthor = isText ? '' : q.author
        sideBlock.sideTextType = 'quote'
        sideBlock.textStyle = isText ? 'text' : 'quote'
        // pull next image into the side slot
        if (imgCursor < images.length) {
          sideBlock.slots = [{ imageId: images[imgCursor].id }]
          imgCursor++
        }
        result.push(sideBlock)
      } else {
        const quoteBlock = makeBlock('quote')
        quoteBlock.quoteText = q.text
        quoteBlock.quoteAuthor = isText ? '' : q.author
        quoteBlock.textStyle = isText ? 'text' : 'quote'
        result.push(quoteBlock)
      }
    }
  }

  // Drain any leftover images (when chapters didn't consume all)
  while (imgCursor < images.length) {
    const remaining = images.length - imgCursor
    const types = imageOnlyRecipe(remaining, seed + 17)
    const tail = images.slice(imgCursor)
    let tailCursor = 0
    types.forEach(t => {
      const b = makeBlock(t)
      b.slots = b.slots.map(() => {
        const id = tail[tailCursor]?.id ?? null
        tailCursor++
        return { imageId: id }
      })
      result.push(b)
    })
    imgCursor = images.length
  }

  // Closing block
  if (textPool.closing) {
    const closing = makeBlock('quote')
    closing.quoteText = textPool.closing
    closing.quoteAuthor = ''
    result.push(closing)
  }

  return result
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeImgIdResolver(pool: ImageItem[]) {
  let i = 0
  return () => {
    const id = pool[i]?.id ?? null
    i++
    return id
  }
}

function buildBlockOfType(_allImages: ImageItem[], nextImageId: () => string | null) {
  return (type: BlockType): Block => {
    const block = makeBlock(type)
    block.slots = block.slots.map(() => ({ imageId: nextImageId() }))
    return block
  }
}
