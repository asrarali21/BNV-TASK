import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE, fetchJson } from '../lib/api.js'
import { Button, Skeleton } from '../components/ui.jsx'
import { useToast } from '../components/ToastProvider.jsx'

function UserFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', mobileNumber:'', gender:'', activeStatus:'active', location:'', profile:null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

  useEffect(()=>{
    if (!isEdit) return
    let on = true
    fetchJson(`${API_BASE}/users/${id}`).then(res=>{
      const u = res?.data || res
      if (on && u) setForm(f=>({ ...f, ...u, profile:null }))
    }).catch(e=>setError(e.message))
    return ()=>{ on=false }
  }, [id, isEdit])

  function updateField(name, value){ setForm(prev=>({ ...prev, [name]: value })) }

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true); setError('')
    try {
      if (isEdit) {
        const payload = { ...form }; delete payload.profile
        await fetchJson(`${API_BASE}/users/${id}`, { method:'PUT', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
        toast.push('User updated')
      } else {
        const fd = new FormData()
        Object.entries(form).forEach(([k,v])=>{ if (v!==null && v!==undefined) fd.append(k, v) })
        await fetchJson(`${API_BASE}/users/add`, { method:'POST', body: fd })
        toast.push('User added')
      }
      navigate('/users')
    } catch(err){ setError(err.message); toast.push(err.message, 'error') }
    finally { setLoading(false) }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold mb-4">{isEdit? 'Edit':'Register'} Your Details</h2>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First name</label>
          <input className="w-full border rounded px-3 py-2" value={form.firstName} onChange={e=>updateField('firstName', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Last name</label>
          <input className="w-full border rounded px-3 py-2" value={form.lastName} onChange={e=>updateField('lastName', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email address</label>
          <input type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={e=>updateField('email', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Mobile</label>
          <input className="w-full border rounded px-3 py-2" value={form.mobileNumber} onChange={e=>updateField('mobileNumber', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Select Your Gender</label>
          <div className="flex gap-4 py-2">
            {['M','F'].map(g=> (
              <label key={g} className="flex items-center gap-2">
                <input type="radio" name="gender" value={g} checked={form.gender===g} onChange={e=>updateField('gender', e.target.value)} required />
                <span>{g==='M'?'Male':'Female'}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Select Your Status</label>
          <select className="w-full border rounded px-3 py-2" value={form.activeStatus} onChange={e=>updateField('activeStatus', e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {!isEdit && (
          <div>
            <label className="block text-sm mb-1">Select Your Profile</label>
            <input type="file" accept="image/*" className="w-full" onChange={e=>updateField('profile', e.target.files?.[0]||null)} required />
          </div>
        )}
        <div>
          <label className="block text-sm mb-1">Enter Your Location</label>
          <input className="w-full border rounded px-3 py-2" value={form.location} onChange={e=>updateField('location', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Button disabled={loading} className="w-full">{loading? 'Submitting...':'Submit'}</Button>
        </div>
      </form>
    </div>
  )
}

export default UserFormPage


