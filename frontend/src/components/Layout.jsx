import { NavLink } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 text-gray-900">
      <header className="bg-[#4e8ef5] text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
           </div>
          <nav className="flex gap-3">
            <NavLink to="/users" className={({isActive})=>`px-4 py-2 rounded-lg transition-all ${isActive? 'bg-white text-[#4e8ef5] shadow-md':'hover:bg-white/20 hover:backdrop-blur-sm'}`}>Users</NavLink>
            <NavLink to="/users/add" className={({isActive})=>`px-4 py-2 rounded-lg transition-all ${isActive? 'bg-white text-[#4e8ef5] shadow-md':'hover:bg-white/20 hover:backdrop-blur-sm'}`}>Add User</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200/50 p-8">
          {children}
        </div>
      </main>
      <footer className="py-6" />
    </div>
  )
}

export default Layout


