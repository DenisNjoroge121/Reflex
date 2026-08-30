import DeliveryStatusBadge from './DeliveryStatusBadge'

export default function RiderDeliveryCard({
  delivery,
  onViewDetails,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Delivery
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {delivery._id}
          </p>
        </div>

        <DeliveryStatusBadge status={delivery.status} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Pickup
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {delivery.pickup_location || '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Drop-off
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {delivery.dropoff_address || '—'}
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => onViewDetails(delivery)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          View details
        </button>
      </div>
    </article>
  )
}
