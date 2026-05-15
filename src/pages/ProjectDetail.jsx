import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useHunts } from '../hooks/useHunts'
import { usePokemonList } from '../hooks/usePokemonList'
import PokemonGrid from '../components/PokemonGrid'
import LaunchHuntModal from '../components/LaunchHuntModal'
import RandomDrawModal from '../components/RandomDrawModal'
import { shinySpriteUrl } from '../utils/pokemonData'
import { formatRelativeTime } from '../utils/time'

const TABS = ['Pokémon', 'Activité', 'Membres']

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useProjects()
  const { startHunt } = useHunts()
  const pokemonNames = usePokemonList()

  const [tab, setTab] = useState('Pokémon')
  const [huntTarget, setHuntTarget] = useState(null)
  const [showRandom, setShowRandom] = useState(false)

  const { hunts } = useHunts()
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <div className="text-center py-24 text-gray-400">
      <p>Projet introuvable.</p>
      <button onClick={() => navigate('/projects')} className="text-indigo-600 text-sm mt-2 hover:underline">
        ← Retour aux projets
      </button>
    </div>
  )

  const total = project.targetPokemon.length
  const caught = project.caughtPokemon.length
  const pct = total > 0 ? Math.round((caught / total) * 100) : 0
  const activeHuntIds = hunts.filter(h => h.projectId === project.id).map(h => h.pokemonId)
  const activity = [...project.caughtPokemon].sort((a, b) => b.caughtAt - a.caughtAt)

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="text-sm text-gray-400 hover:text-gray-600 mb-3 block"
      >
        ← Projets
      </button>

      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{caught}/{total} Pokémon · {pct}%</p>
        </div>
        <button
          onClick={() => setShowRandom(true)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 shrink-0"
        >
          🎲 Tirage
        </button>
      </div>

      <div className="h-2 bg-gray-100 rounded-full mb-5">
        <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Pokémon' && (
        <PokemonGrid
          targetPokemon={project.targetPokemon}
          caughtPokemon={project.caughtPokemon}
          pokemonNames={pokemonNames}
          onPokemonClick={(pokemonId, pokemonName) => setHuntTarget({ id: pokemonId, name: pokemonName })}
        />
      )}

      {tab === 'Activité' && (
        <div className="flex flex-col gap-2">
          {activity.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Aucune activité pour l'instant</p>
          ) : activity.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <img src={shinySpriteUrl(c.pokemonId)} alt={c.pokemonName} className="w-10 h-10 object-contain" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium capitalize">{c.pokemonName}</p>
                <p className="text-xs text-gray-500">{c.method} · {c.game} · {c.count} rencontres</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-500">{c.caughtBy}</p>
                <p className="text-xs text-gray-400">{formatRelativeTime(c.caughtAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Membres' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {project.members.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm">
                  {m.name[0]}
                </div>
                <span className="text-sm font-medium">{m.name}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Code d'invitation</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 font-mono text-sm">
                {project.inviteCode}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(project.inviteCode)}
                className="px-3 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
              >
                Copier
              </button>
            </div>
          </div>
        </div>
      )}

      {huntTarget && (
        <LaunchHuntModal
          pokemonId={huntTarget.id}
          pokemonName={huntTarget.name}
          projectId={project.id}
          projectName={project.name}
          onStart={(data) => {
            startHunt(data)
            navigate('/hunt')
          }}
          onClose={() => setHuntTarget(null)}
        />
      )}

      {showRandom && (
        <RandomDrawModal
          project={project}
          activeHuntIds={activeHuntIds}
          pokemonNames={pokemonNames}
          onLaunchHunt={(pokemonId, pokemonName) => setHuntTarget({ id: pokemonId, name: pokemonName })}
          onClose={() => setShowRandom(false)}
        />
      )}
    </div>
  )
}
