import { NavLink } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900">
      <header className="bg-gradient-to-r from-[#7E2E2E] to-[#B04C4C] text-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
          </div>
          <nav className="flex gap-2">
            <NavLink to="/users" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-white text-[#7E2E2E]':'hover:bg-white/10'}`}>Users</NavLink>
            <NavLink to="/users/add" className={({isActive})=>`px-3 py-1 rounded ${isActive? 'bg-white text-[#7E2E2E]':'bg-black/10 hover:bg-black/20'}`}>Add User</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl p-6">
          {children}
        </div>
      </main>
      <footer className="py-6" />
    </div>
  )
}

export default Layout


