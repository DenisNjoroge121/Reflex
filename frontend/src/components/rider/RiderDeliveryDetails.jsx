import DeliveryStatusBadge from './DeliveryStatusBadge'

export default function RiderDeliveryDetails({
  delivery,
  onClose,
}) {
  if (!delivery) {
    return null
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Delivery Details
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {delivery._id}
          </h3>
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <div className="mt-2">
            <DeliveryStatusBadge status={delivery.status} />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Phone
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {delivery.phone ||
              delivery.customer?.customer_phone ||
              '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pickup Location
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {delivery.pickup_location || '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Drop-off Address
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {delivery.dropoff_address || '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Customer
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {delivery.customer?.customer_name || '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Instructions
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {delivery.instructions || 'No instructions provided.'}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h4 className="font-semibold text-slate-900">
          Delivery Progress
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Status update controls will be connected when the backend
          status endpoint is available.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {['Assigned', 'Picked Up', 'Out for Delivery', 'Delivered'].map(
            (status) => (
              <span
                key={status}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  delivery.status === status
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                {status}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h4 className="font-semibold text-slate-900">
          Proof of Delivery
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Proof of Delivery submission will be connected when the
          backend POD endpoint is available.
        </p>
      </div>
    </section>
  )
}
