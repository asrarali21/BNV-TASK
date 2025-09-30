import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge.jsx'
import { Avatar } from '../components/ui.jsx'
import { API_BASE, fetchJson, fileUrl } from '../lib/api.js'

function UserDetailsPage(){
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  useEffect(()=>{
    fetchJson(`${API_BASE}/users/${id}`).then(res=>{
      setUser(res?.data || res)
    }).catch(e=>setError(e.message))
  }, [id])
  if (error) return <div className="text-red-600">{error}</div>
  if (!user) return <div>Loading...</div>
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={`${user.firstName} ${user.lastName}`} src={fileUrl(user.profile)} />
        <div>
          <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><span className="font-medium">Mobile:</span> {user.mobileNumber}</div>
        <div><span className="font-medium">Gender:</span> {user.gender}</div>
        <div><span className="font-medium">Status:</span> <StatusBadge value={user.activeStatus}/></div>
        <div><span className="font-medium">Location:</span> {user.location||'-'}</div>
      </div>
    </div>
  )
}

export default UserDetailsPage


