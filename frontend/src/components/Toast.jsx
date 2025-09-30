import { useEffect } from 'react'

function Toast({ message, type='success', onClose }) {
  useEffect(()=>{
    const t = setTimeout(()=>onClose?.(), 2500)
    return ()=>clearTimeout(t)
  }, [onClose])
  const color = type==='error' ? 'bg-red-600' : 'bg-emerald-600'
  return (
    <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow ${color}`}>{message}</div>
  )
}

export default Toast


