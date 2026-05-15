import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'

export default function Projects() {
  const { projects, createProject } = useProjects()
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes projets</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          + Nouveau projet
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-4xl mb-3">🗂️</p>
          <p className="text-lg font-medium text-gray-500">Aucun projet</p>
          <p className="text-sm mt-1">Crée un projet pour organiser tes chasses en équipe</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {showCreate && (
        <CreateProjectModal onCreate={createProject} onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}
