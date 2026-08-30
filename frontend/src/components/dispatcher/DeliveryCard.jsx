const statusStyles = {
    Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    Assigned: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    'Picked Up': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    'Out for Delivery': 'bg-purple-50 text-purple-700 ring-purple-600/20',
    Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    Cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
}

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] ||
                'bg-slate-50 text-slate-700 ring-slate-600/20'
                }`}
        >
            {status || 'Unknown'}
        </span>
    )
}

export default function DeliveryCard({
    delivery,
    onViewDetails,
}) {
    const customerName =
        delivery.customer?.customer_name || 'Unknown customer'

    const customerPhone =
        delivery.phone ||
        delivery.customer?.customer_phone ||
        'No phone'

    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        Customer
                    </p>

                    <h4 className="mt-1 text-lg font-semibold text-slate-900">
                        {customerName}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                        {customerPhone}
                    </p>
                </div>

                <StatusBadge status={delivery.status} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Pickup
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                        {delivery.pickup_location || '—'}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Drop-off
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                        {delivery.dropoff_address || '—'}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                    ID: {delivery._id || '—'}
                </p>

                <button
                    type="button"
                    onClick={() => onViewDetails(delivery)}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                    View details
                </button>
            </div>
        </article>
    )
}