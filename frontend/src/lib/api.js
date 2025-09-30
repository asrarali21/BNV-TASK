export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api/v1'

export async function fetchJson(url, options) {
  const res = await fetch(url, options)
  const data = await res.json().catch(()=>({}))
  if (!res.ok || data?.success === false) {
    const message = data?.message || `Request failed: ${res.status}`
    throw new Error(message)
  }
  return data
}

export function fileUrl(path){
  if (!path) return ''
  // If backend stores like 'uploads/filename.jpg', expose via server origin
  const configuredBase = (import.meta.env.VITE_API_ORIGIN) || (import.meta.env.VITE_API_BASE)
  const origin = configuredBase ? new URL(configuredBase).origin : window.location.origin
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return origin + path
  return `${origin}/${path}`
}


