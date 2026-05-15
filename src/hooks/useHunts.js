import { useState, useEffect } from 'react'

const KEY = 'shinydex_hunts'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

export function useHunts() {
  const [hunts, setHunts] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(hunts))
  }, [hunts])

  const startHunt = (data) =>
    setHunts(prev => [...prev, { id: crypto.randomUUID(), count: 0, startedAt: Date.now(), ...data }])

  const increment = (id) =>
    setHunts(prev => prev.map(h => h.id === id ? { ...h, count: h.count + 1 } : h))

  const decrement = (id) =>
    setHunts(prev => prev.map(h => h.id === id ? { ...h, count: Math.max(0, h.count - 1) } : h))

  const catchShiny = (id) =>
    setHunts(prev => prev.filter(h => h.id !== id))

  const abandon = (id) =>
    setHunts(prev => prev.filter(h => h.id !== id))

  return { hunts, startHunt, increment, decrement, catchShiny, abandon }
}
