import { useState, useEffect } from 'react'

const CACHE_KEY = 'shinydex_pokemon_names'

export function usePokemonList() {
  const [names, setNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY)) ?? null }
    catch { return null }
  })

  useEffect(() => {
    if (names) return
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .then(r => r.json())
      .then(data => {
        const map = {}
        data.results.forEach(({ name, url }) => {
          const id = parseInt(url.split('/').filter(Boolean).pop())
          map[id] = name
        })
        localStorage.setItem(CACHE_KEY, JSON.stringify(map))
        setNames(map)
      })
      .catch(() => {})
  }, [names])

  return names
}
