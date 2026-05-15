import { useState } from 'react'
import { HUNT_METHODS, GAMES } from '../utils/huntData'

export default function StartHuntModal({ onStart, onClose }) {
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [method, setMethod] = useState('')
  const [game, setGame] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function searchPokemon() {
    const q = query.trim().toLowerCase()
    if (!q) return
    setLoading(true)
    setError('')
    setPokemon(null)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPokemon({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_shiny ?? data.sprites.front_default,
      })
    } catch {
      setError('Pokémon introuvable. Essaie un nom anglais ou un numéro.')
    } finally {
      setLoading(false)
    }
  }

  function handleStart() {
    if (!pokemon || !method || !game) return
    onStart({
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      pokemonSprite: pokemon.sprite,
      method,
      game,
      projectId: null,
      projectName: null,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-5">Nouvelle chasse</h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Pokémon</label>
            <div className="flex gap-2">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchPokemon()}
                placeholder="Nom (en anglais) ou numéro..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={searchPokemon}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? '…' : 'OK'}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {pokemon && (
              <div className="flex items-center gap-3 mt-2 p-2 bg-gray-50 rounded-lg">
                <img src={pokemon.sprite} alt={pokemon.name} className="w-12 h-12 object-contain" />
                <span className="capitalize font-medium text-sm">
                  #{pokemon.id} {pokemon.name}
                </span>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Méthode</label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Choisir une méthode…</option>
              {HUNT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Jeu</label>
            <select
              value={game}
              onChange={e => setGame(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Choisir un jeu…</option>
              {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-2 justify-end px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
          >
            Annuler
          </button>
          <button
            onClick={handleStart}
            disabled={!pokemon || !method || !game}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40"
          >
            Démarrer
          </button>
        </div>
      </div>
    </div>
  )
}
