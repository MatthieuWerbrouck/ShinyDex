import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../utils/time'

export default function ProjectCard({ project }) {
  const total = project.targetPokemon.length
  const caught = project.caughtPokemon.length
  const pct = total > 0 ? Math.round((caught / total) * 100) : 0
  const lastActivity =
    project.caughtPokemon.length > 0
      ? Math.max(...project.caughtPokemon.map(c => c.caughtAt))
      : project.createdAt

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{project.name}</h3>
        <span className="text-sm font-mono text-gray-500 shrink-0 ml-2">{caught}/{total}</span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-3">
        <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1">
          {project.members.map(m => (
            <span key={m.id} className="bg-gray-100 rounded-full px-2 py-0.5 text-gray-500">
              {m.name}
            </span>
          ))}
        </div>
        <span>{formatRelativeTime(lastActivity)}</span>
      </div>
    </Link>
  )
}
