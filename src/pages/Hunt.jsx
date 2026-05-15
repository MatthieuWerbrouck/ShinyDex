import { useState } from 'react'
import { useHunts } from '../hooks/useHunts'
import HuntCard from '../components/HuntCard'
import StartHuntModal from '../components/StartHuntModal'

export default function Hunt() {
  const { hunts, startHunt, increment, decrement, catchShiny, abandon } = useHunts()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chasses actives</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          + Nouvelle chasse
        </button>
      </div>

      {hunts.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-4xl mb-3">✨</p>
          <p className="text-lg font-medium text-gray-500">Aucune chasse active</p>
          <p className="text-sm mt-1">Lance une chasse depuis un projet ou via le bouton ci-dessus</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hunts.map(hunt => (
            <HuntCard
              key={hunt.id}
              hunt={hunt}
              onIncrement={increment}
              onDecrement={decrement}
              onCatch={catchShiny}
              onAbandon={abandon}
            />
          ))}
        </div>
      )}

      {showModal && (
        <StartHuntModal
          onStart={startHunt}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
