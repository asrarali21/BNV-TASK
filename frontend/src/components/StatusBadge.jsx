function StatusBadge({ value }) {
  const isActive = String(value).toLowerCase() === 'active'
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${isActive? 'bg-green-100 text-green-700 border border-green-200':'bg-gray-100 text-gray-600 border border-gray-200'}`}>{isActive? 'Active':'Inactive'}</span>
  )
}

export default StatusBadge


