const statusStyles = {
  Assigned: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  'Picked Up': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  'Out for Delivery': 'bg-purple-50 text-purple-700 ring-purple-600/20',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
}

export default function DeliveryStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] ||
        'bg-slate-50 text-slate-700 ring-slate-600/20'
      }`}
    >
      {status || 'Unknown'}
    </span>
  )
}
