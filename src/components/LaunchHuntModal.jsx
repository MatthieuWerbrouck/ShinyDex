import { useState } from 'react'
import { HUNT_METHODS, GAMES } from '../utils/huntData'
import { shinySpriteUrl } from '../utils/pokemonData'

export default function LaunchHuntModal({ pokemonId, pokemonName, projectId, projectName, onStart, onClose }) {
  const [method, setMethod] = useState('')
  const [game, setGame] = useState('')

  function handleStart() {
    if (!method || !game) return
    onStart({
      pokemonId,
      pokemonName,
      pokemonSprite: shinySpriteUrl(pokemonId),
      method,
      game,
      projectId,
      projectName,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <img src={shinySpriteUrl(pokemonId)} alt={pokemonName} className="w-14 h-14 object-contain" />
            <div>
              <h2 className="text-lg font-semibold capitalize">{pokemonName}</h2>
              {projectName && <p className="text-xs text-indigo-600">{projectName}</p>}
            </div>
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
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
            Annuler
          </button>
          <button
            onClick={handleStart}
            disabled={!method || !game}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40"
          >
            Démarrer la chasse
          </button>
        </div>
      </div>
    </div>
  )
}
