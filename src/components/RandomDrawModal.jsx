import { useState } from 'react'
import { spriteUrl } from '../utils/pokemonData'

export default function RandomDrawModal({ project, activeHuntIds, pokemonNames, onLaunchHunt, onClose }) {
  const [drawn, setDrawn] = useState(null)

  const caughtIds = new Set(project.caughtPokemon.map(c => c.pokemonId))
  const excluded = project.settings?.excludeActiveHunts ? new Set(activeHuntIds) : new Set()
  const pool = project.targetPokemon.filter(id => !caughtIds.has(id) && !excluded.has(id))

  function draw() {
    if (pool.length === 0) return
    setDrawn(pool[Math.floor(Math.random() * pool.length)])
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-1">Tirage aléatoire</h2>
        <p className="text-sm text-gray-500 mb-6">{pool.length} Pokémon disponibles</p>

        {drawn ? (
          <div className="mb-6">
            <img
              src={spriteUrl(drawn)}
              alt={pokemonNames?.[drawn]}
              className="w-24 h-24 object-contain mx-auto"
            />
            <p className="capitalize font-semibold text-lg mt-1">
              {pokemonNames?.[drawn] ?? `#${drawn}`}
            </p>
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-gray-300">
            ?
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={draw}
            disabled={pool.length === 0}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-40"
          >
            {drawn ? 'Retirer' : 'Tirer'}
          </button>
          {drawn && (
            <button
              onClick={() => {
                onLaunchHunt(drawn, pokemonNames?.[drawn] ?? `#${drawn}`)
                onClose()
              }}
              className="w-full py-2.5 bg-yellow-400 text-yellow-900 rounded-lg font-medium hover:bg-yellow-500"
            >
              Chasser ce Pokémon
            </button>
          )}
          <button onClick={onClose} className="w-full py-2 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
