import { useState, useEffect } from 'react'

const KEY = 'shinydex_projects'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

function generateCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function useProjects() {
  const [projects, setProjects] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(projects))
  }, [projects])

  const createProject = ({ name, targetPokemon }) => {
    const project = {
      id: crypto.randomUUID(),
      name,
      targetPokemon,
      caughtPokemon: [],
      members: [{ id: 'me', name: 'Moi' }],
      inviteCode: generateCode(),
      createdAt: Date.now(),
      settings: { excludeActiveHunts: false },
    }
    setProjects(prev => [...prev, project])
    return project
  }

  const markCaught = (projectId, catchData) =>
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? { ...p, caughtPokemon: [...p.caughtPokemon, { ...catchData, caughtAt: Date.now() }] }
        : p
    ))

  const deleteProject = (id) =>
    setProjects(prev => prev.filter(p => p.id !== id))

  const updateSettings = (projectId, settings) =>
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, settings: { ...p.settings, ...settings } } : p
    ))

  return { projects, createProject, markCaught, deleteProject, updateSettings }
}
