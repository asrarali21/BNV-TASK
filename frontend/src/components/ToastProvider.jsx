import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext({ push: () => {} })

export function useToast(){
  return useContext(ToastContext)
}

function ToastItem({ id, type, message, onClose }){
  const color = type==='error' ? 'bg-red-600' : 'bg-emerald-600'
  return (
    <div className={`text-white px-4 py-2 rounded shadow ${color}`}>{message}</div>
  )
}

function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  const push = useCallback((message, type='success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500)
  }, [])

  const value = useMemo(()=>({ push }), [push])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(t => <ToastItem key={t.id} {...t} />)}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider


