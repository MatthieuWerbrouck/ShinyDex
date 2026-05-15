import { useState } from 'react'
import { GENERATIONS, getIdsForGens } from '../utils/pokemonData'

export default function CreateProjectModal({ onCreate, onClose }) {
  const [name, setName] = useState('')
  const [mode, setMode] = useState('gen')
  const [selectedGens, setSelectedGens] = useState([])
  const [customQuery, setCustomQuery] = useState('')
  const [customPokemon, setCustomPokemon] = useState([])
  const [searchResult, setSearchResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  function toggleGen(genId) {
    setSelectedGens(prev =>
      prev.includes(genId) ? prev.filter(g => g !== genId) : [...prev, genId]
    )
  }

  async function searchPokemon() {
    const q = customQuery.trim().toLowerCase()
    if (!q) return
    setSearching(true)
    setSearchError('')
    setSearchResult(null)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSearchResult({ id: data.id, name: data.name })
    } catch {
      setSearchError('Introuvable. Essaie un nom anglais ou un numéro.')
    } finally {
      setSearching(false)
    }
  }

  function addCustomPokemon() {
    if (!searchResult || customPokemon.find(p => p.id === searchResult.id)) return
    setCustomPokemon(prev => [...prev, searchResult])
    setSearchResult(null)
    setCustomQuery('')
  }

  function handleCreate() {
    if (!name.trim()) return
    const ids = mode === 'gen' ? getIdsForGens(selectedGens) : customPokemon.map(p => p.id)
    if (ids.length === 0) return
    onCreate({ name: name.trim(), targetPokemon: ids })
    onClose()
  }

  const canCreate =
    name.trim() &&
    ((mode === 'gen' && selectedGens.length > 0) || (mode === 'custom' && customPokemon.length > 0))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-xl font-semibold mb-5">Nouveau projet</h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Nom du projet</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex : Pokédex Gen 1 complet"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-2">Objectif</label>
            <div className="flex gap-2 mb-4">
              {['gen', 'custom'].map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    mode === m
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {m === 'gen' ? 'Par génération' : 'Liste personnalisée'}
                </button>
              ))}
            </div>

            {mode === 'gen' && (
              <div className="grid grid-cols-3 gap-2">
                {GENERATIONS.map(gen => (
                  <button
                    key={gen.id}
                    onClick={() => toggleGen(gen.id)}
                    className={`py-2 px-3 rounded-lg text-sm border transition-colors text-left ${
                      selectedGens.includes(gen.id)
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Gen {gen.id}
                    <span className="block text-xs opacity-60">{gen.range[1] - gen.range[0] + 1} Pok.</span>
                  </button>
                ))}
              </div>
            )}

            {mode === 'custom' && (
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    value={customQuery}
                    onChange={e => setCustomQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && searchPokemon()}
                    placeholder="Nom (anglais) ou numéro…"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <button
                    onClick={searchPokemon}
                    disabled={searching}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {searching ? '…' : 'OK'}
                  </button>
                </div>
                {searchError && <p className="text-red-500 text-xs mb-2">{searchError}</p>}
                {searchResult && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-2">
                    <span className="capitalize text-sm flex-1">#{searchResult.id} {searchResult.name}</span>
                    <button
                      onClick={addCustomPokemon}
                      className="text-xs text-indigo-600 font-medium hover:text-indigo-800"
                    >
                      + Ajouter
                    </button>
                  </div>
                )}
                {customPokemon.length > 0 && (
                  <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
                    {customPokemon.map(p => (
                      <span
                        key={p.id}
                        className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full capitalize"
                      >
                        {p.name}
                        <button onClick={() => setCustomPokemon(prev => prev.filter(x => x.id !== p.id))} className="hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end p-6 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
            Annuler
          </button>
          <button
            onClick={handleCreate}
            disabled={!canCreate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  )
}
