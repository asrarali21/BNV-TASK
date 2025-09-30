export function Button({ variant='primary', className='', ...props }){
  const base = 'px-3 py-2 rounded shadow transition'
  const variants = {
    primary: 'bg-[#7E2E2E] hover:brightness-110 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 hover:brightness-110 text-white',
    subtle: 'bg-black/10 hover:bg-black/20',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}

export function Avatar({ name, src }){
  const initials = String(name||'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()
  if (src) {
    return <img src={src} alt={name} className="w-8 h-8 rounded-full object-cover" />
  }
  return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white grid place-items-center text-xs font-semibold">{initials}</div>
}

export function Modal({ open, title, children, actions, onClose }){
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-4 py-3 border-b font-semibold">{title}</div>
        <div className="p-4">{children}</div>
        <div className="px-4 py-3 border-t flex justify-end gap-2">{actions}</div>
      </div>
    </div>
  )
}

export function Skeleton({ className='' }){
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}


