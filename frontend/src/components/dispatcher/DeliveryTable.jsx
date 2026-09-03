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

export default function DeliveryTable({
  deliveries,
  onViewDetails,
}) {
  if (deliveries.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="font-medium text-slate-700">
          No delivery requests found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          There are no deliveries matching the selected status.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Customer
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pickup
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Drop-off
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {deliveries.map((delivery) => (
            <tr
              key={delivery._id}
              className="transition hover:bg-slate-50"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <p className="font-medium text-slate-900">
                  {delivery.customer?.customer_name ||
                    'Unknown customer'}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {delivery.phone ||
                    delivery.customer?.customer_phone ||
                    'No phone'}
                </p>
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {delivery.pickup_location || '—'}
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {delivery.dropoff_address || '—'}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <StatusBadge status={delivery.status} />
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onViewDetails(delivery)}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
