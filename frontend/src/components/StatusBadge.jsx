function StatusBadge({ value }) {
  const isActive = String(value).toLowerCase() === 'active'
  return (
    <span className={`px-2 py-1 text-xs rounded ${isActive? 'bg-green-100 text-green-700':'bg-gray-200 text-gray-700'}`}>{isActive? 'Active':'Inactive'}</span>
  )
}

export default StatusBadge


