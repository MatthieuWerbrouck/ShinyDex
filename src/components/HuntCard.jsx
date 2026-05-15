import { useElapsedTime } from '../hooks/useElapsedTime'

export default function HuntCard({ hunt, onIncrement, onDecrement, onCatch, onAbandon }) {
  const timer = useElapsedTime(hunt.startedAt)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img src={hunt.pokemonSprite} alt={hunt.pokemonName} className="w-16 h-16 object-contain" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold capitalize text-gray-900 truncate">{hunt.pokemonName}</h3>
          <p className="text-xs text-gray-500 truncate">{hunt.method} · {hunt.game}</p>
          {hunt.projectName && (
            <p className="text-xs text-indigo-600 truncate">{hunt.projectName}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-mono font-bold text-gray-900">{hunt.count}</div>
          <div className="text-xs text-gray-400">rencontres</div>
        </div>
      </div>

      <div className="text-center font-mono text-sm text-gray-400 bg-gray-50 rounded-lg py-1">
        {timer}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDecrement(hunt.id)}
          className="w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-lg font-bold"
        >
          −
        </button>
        <button
          onClick={() => onIncrement(hunt.id)}
          className="flex-1 h-10 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 text-lg"
        >
          +1
        </button>
        <button
          onClick={() => onCatch(hunt.id)}
          className="px-3 h-10 rounded-lg bg-yellow-400 text-yellow-900 font-semibold text-sm hover:bg-yellow-500 shrink-0"
        >
          ✨ Shiny !
        </button>
      </div>

      <button
        onClick={() => window.confirm('Abandonner cette chasse ?') && onAbandon(hunt.id)}
        className="text-xs text-gray-300 hover:text-red-400 transition-colors text-center"
      >
        Abandonner
      </button>
    </div>
  )
}
