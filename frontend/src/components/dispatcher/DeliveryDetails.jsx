const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Assigned: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  'Picked Up': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  'Out for Delivery': 'bg-purple-50 text-purple-700 ring-purple-600/20',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
}

function StatusBadge({ status }) {
  const style =
    statusStyles[status] ||
    'bg-slate-50 text-slate-700 ring-slate-600/20'

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      {status || 'Unknown'}
    </span>
  )
}

function formatDate(date) {
  if (!date) return '—'

  return new Date(date).toLocaleString()
}

function DetailItem({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="mt-2 text-sm text-slate-700">
        {children || '—'}
      </div>
    </div>
  )
}

export default function DeliveryDetails({
  delivery,
  onClose,
}) {
  if (!delivery) return null

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Delivery Details
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Delivery ID: {delivery._id || '—'}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Close
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <DetailItem label="Customer">
          <p className="font-medium text-slate-900">
            {delivery.customer?.customer_name ||
              'Unknown customer'}
          </p>

          <p className="mt-1">
            {delivery.phone ||
              delivery.customer?.customer_phone ||
              'No phone'}
          </p>

          <p className="mt-1">
            {delivery.customer?.customer_address || 'No address'}
          </p>
        </DetailItem>

        <DetailItem label="Status">
          <StatusBadge status={delivery.status} />
        </DetailItem>

        <DetailItem label="Pickup Location">
          {delivery.pickup_location}
        </DetailItem>

        <DetailItem label="Drop-off Address">
          {delivery.dropoff_address}
        </DetailItem>

        <DetailItem label="Instructions">
          {delivery.instructions || 'No instructions provided.'}
        </DetailItem>

        <DetailItem label="Created">
          {formatDate(delivery.createdAt)}
        </DetailItem>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h4 className="font-semibold text-slate-900">
          Rider Assignment
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Rider assignment and reassignment will be connected
          to the specified assignment API when that backend
          functionality is available.
        </p>

        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-700">
            Assignment controls
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Available riders and assignment actions will appear
            here.
          </p>
        </div>
      </div>
    </div>
  )
}
