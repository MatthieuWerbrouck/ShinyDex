import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/collection', label: 'Collection' },
  { to: '/projects', label: 'Projets' },
  { to: '/hunt', label: 'Chasse' },
  { to: '/methods', label: 'Méthodes' },
  { to: '/profile', label: 'Profil' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-3 flex gap-6">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'font-semibold text-indigo-600' : 'text-gray-600 hover:text-gray-900'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
