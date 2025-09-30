import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge.jsx'
import { Button, Avatar, Modal, Skeleton } from '../components/ui.jsx'
import { useToast } from '../components/ToastProvider.jsx'
import { API_BASE, fetchJson, fileUrl } from '../lib/api.js'

function UsersListPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(()=>{
    let isActive = true
    async function load(){
      setLoading(true); setError('')
      try {
        const params = new URLSearchParams({ page: String(page), limit: '10' })
        const res = await fetchJson(`${API_BASE}/users/users?${params.toString()}`)
        const body = res?.data || res
        const users = body?.users || []
        const tp = body?.totalPages || 1
        if (isActive) { setList(users); setTotalPages(tp) }
      } catch(err){ setError(err.message) }
      finally { if (isActive) setLoading(false) }
    }
    load()
    return ()=>{ isActive = false }
  }, [page])

  const filtered = useMemo(()=>{
    if (!query) return list
    const q = query.toLowerCase()
    return list.filter(u=>
      [u.firstName, u.lastName, u.email, u.mobileNumber, u.location].some(v=>String(v||'').toLowerCase().includes(q))
    )
  }, [list, query])

  async function handleDelete(id){
    if (!confirm('Delete this user?')) return
    try {
      await fetchJson(`${API_BASE}/users/${id}`, { method: 'DELETE' })
      setList(prev=>prev.filter(u=>u._id!==id))
      toast.push('User deleted')
    } catch(err){ toast.push(err.message, 'error') }
  }

  function handleExport(){
    const headers = ['ID','FullName','Email','Gender','Status','Location','Mobile']
    const rows = filtered.map(u=>[
      u._id,
      `${u.firstName||''} ${u.lastName||''}`.trim(),
      u.email||'',
      u.gender||'',
      u.activeStatus||'',
      u.location||'',
      u.mobileNumber||''
    ])
    const csv = [headers, ...rows].map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search users..." className="border rounded pl-9 pr-3 py-2 w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B04C4C]" />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </div>
          <Button onClick={()=>setQuery(query)}>Search</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>navigate('/users/add')}>+ Add User</Button>
          <Button variant="outline" onClick={handleExport}>Export To Csv</Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">FullName</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Gender</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="px-3 py-6" colSpan={7}>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(7)].map((_,i)=>(<Skeleton key={i} className="h-6" />))}
                </div>
              </td></tr>
            )}
            {error && !loading && (
              <tr><td className="px-3 py-6 text-red-600" colSpan={7}>{error}</td></tr>
            )}
            {!loading && !error && filtered.map((u,idx)=> (
              <tr key={u._id} className="border-t">
                <td className="px-3 py-2">{idx+1+(page-1)*10}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={`${u.firstName||''} ${u.lastName||''}`} src={fileUrl(u.profile)} />
                    <span>{`${u.firstName||''} ${u.lastName||''}`}</span>
                  </div>
                </td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.gender}</td>
                <td className="px-3 py-2"><StatusBadge value={u.activeStatus}/></td>
                <td className="px-3 py-2">{u.location||'-'}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Button variant="subtle" onClick={()=>navigate(`/users/${u._id}`)}>View</Button>
                    <Button variant="outline" onClick={()=>navigate(`/users/${u._id}/edit`)}>Edit</Button>
                    <Button variant="danger" onClick={()=>handleDelete(u._id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="px-2">{page} / {totalPages}</span>
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}

export default UsersListPage


