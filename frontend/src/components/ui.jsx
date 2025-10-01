export function Button({ variant='primary', className='', ...props }){
  const base = 'px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium'
  const variants = {
    primary: 'bg-[#4e8ef5] hover:bg-[#3d7ce8] text-white shadow-blue-200',
    outline: 'border border-[#4e8ef5] hover:bg-blue-50 text-[#4e8ef5] hover:border-[#3d7ce8]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-200',
    subtle: 'bg-blue-100 hover:bg-blue-200 text-[#4e8ef5]',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}

export function Avatar({ name, src }){
  const initials = String(name||'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()
  if (src) {
    return <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
  }
  return <div className="w-10 h-10 rounded-full bg-[#4e8ef5] text-white grid place-items-center text-sm font-bold border-2 border-white shadow-md">{initials}</div>
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


