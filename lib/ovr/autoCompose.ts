import type { Block, BlockType, ImageItem } from './buildTypes'
import { makeBlock } from './buildTypes'

type Recipe = BlockType[]

const RECIPES_BY_COUNT: Record<number, Recipe[]> = {
  1: [['full']],
  2: [['pair'], ['full', 'full']],
  3: [['quote', 'trio'], ['full', 'pair'], ['side', 'pair']],
  4: [['quote', 'pair', 'pair'], ['full', 'trio'], ['side', 'trio']],
  5: [['quote', 'full', 'pair', 'pair'], ['side', 'pair', 'pair'], ['full', 'pair', 'pair']],
  6: [['quote', 'trio', 'pair', 'full'], ['side', 'pair', 'trio'], ['full', 'pair', 'side', 'pair']],
  7: [['quote', 'full', 'pair', 'pair', 'pair'], ['side', 'pair', 'trio', 'pair'], ['full', 'pair', 'side', 'trio']],
  8: [['quote', 'trio', 'side', 'pair', 'pair'], ['full', 'pair', 'side', 'trio', 'pair'], ['side', 'pair', 'trio', 'pair', 'full']],
}

function pickRecipe(count: number, seed: number): Recipe {
  const bucket = RECIPES_BY_COUNT[Math.min(count, 8)] ?? RECIPES_BY_COUNT[8]
  if (!bucket) return ['full']
  return bucket[seed % bucket.length]
}

function recipeForCount(count: number, seed: number): Recipe {
  if (count <= 8) return pickRecipe(count, seed)
  const recipe: BlockType[] = ['quote']
  let remaining = count
  let i = seed
  while (remaining > 0) {
    if (remaining >= 3 && i % 3 === 0) { recipe.push('trio'); remaining -= 3 }
    else if (remaining >= 2 && i % 3 === 1) { recipe.push('pair'); remaining -= 2 }
    else if (remaining >= 1 && i % 5 === 2) { recipe.push('side'); remaining -= 1 }
    else { recipe.push('full'); remaining -= 1 }
    i++
  }
  return recipe
}

const QUOTES: { text: string; author: string }[] = [
  { text: 'A work of art is a corner of nature seen through a temperament.', author: 'Émile Zola' },
  { text: 'Painting is poetry that is seen rather than felt.', author: 'Leonardo da Vinci' },
  { text: 'Every artist dips his brush in his own soul.', author: 'Henry Ward Beecher' },
  { text: 'Art enables us to find ourselves and lose ourselves at the same time.', author: 'Thomas Merton' },
  { text: 'The work of art must seize upon you, wrap you up in itself, carry you away.', author: 'Auguste Renoir' },
]

export function autoCompose(images: ImageItem[], seed = 0): Block[] {
  if (images.length === 0) return []

  const recipe = recipeForCount(images.length, seed)
  const quote = QUOTES[seed % QUOTES.length]

  let cursor = 0
  let quoteFilled = false

  return recipe.map(type => {
    const block = makeBlock(type)
    block.slots = block.slots.map(() => {
      const id = images[cursor]?.id ?? null
      cursor++
      return { imageId: id }
    })
    if ((type === 'quote' || type === 'side' || type === 'quotefull') && !quoteFilled) {
      block.quoteText = quote.text
      block.quoteAuthor = quote.author
      if (type === 'side') block.sideTextType = 'quote'
      quoteFilled = true
    }
    return block
  })
}
