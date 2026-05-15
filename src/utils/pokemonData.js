export const GENERATIONS = [
  { id: 1, name: 'Génération I', range: [1, 151] },
  { id: 2, name: 'Génération II', range: [152, 251] },
  { id: 3, name: 'Génération III', range: [252, 386] },
  { id: 4, name: 'Génération IV', range: [387, 493] },
  { id: 5, name: 'Génération V', range: [494, 649] },
  { id: 6, name: 'Génération VI', range: [650, 721] },
  { id: 7, name: 'Génération VII', range: [722, 809] },
  { id: 8, name: 'Génération VIII', range: [810, 905] },
  { id: 9, name: 'Génération IX', range: [906, 1025] },
]

export function getIdsForGens(genIds) {
  return genIds.flatMap(genId => {
    const gen = GENERATIONS.find(g => g.id === genId)
    if (!gen) return []
    const [start, end] = gen.range
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
}

export const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const shinySpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
