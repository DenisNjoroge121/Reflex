import { useState } from 'react'
import API from '../../services/api'
import DeliveryStatusBadge from './DeliveryStatusBadge'

const STATUS_FLOW = [
  'Assigned',
  'Picked Up',
  'Out for Delivery',
  'Delivered',
]

export default function RiderDeliveryDetails({
  delivery,
  onClose,
  onStatusUpdated,
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!delivery) {
    return null
  }

  const handleStatusUpdate = async (status) => {
    if (delivery.status === status) {
      return
    }

    try {
      setUpdatingStatus(true)
      setError('')
      setSuccess('')

      const response = await API.patch(
        `/api/riders/deliveries/${delivery._id}/status`,
        {
          status,
        },
      )

      const updatedDelivery =
        response.data?.delivery || response.data?.updatedDelivery

      if (updatedDelivery) {
        onStatusUpdated?.(updatedDelivery)
      }

      setSuccess(`Delivery status updated to "${status}".`)
    } catch (err) {
      console.error('Failed to update delivery status:', err)

      setError(
        err.response?.data?.message ||
          'Unable to update delivery status.',
      )
    } finally {
      setUpdatingStatus(false)
    }
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Delivery Details
          </p>

          <h3 className="mt-1 break-all text-lg font-semibold text-slate-900">
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

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

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
          Update the delivery status as you complete each stage.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_FLOW.map((status) => {
            const isCurrent = delivery.status === status
            const isDisabled =
              updatingStatus ||
              delivery.status === 'Delivered' ||
              delivery.status === 'Cancelled'

            return (
              <button
                key={status}
                type="button"
                disabled={isDisabled}
                onClick={() => handleStatusUpdate(status)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  isCurrent
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                } ${
                  isDisabled
                    ? 'cursor-not-allowed opacity-60'
                    : ''
                }`}
              >
                {updatingStatus && isCurrent
                  ? 'Updating...'
                  : status}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h4 className="font-semibold text-slate-900">
          Proof of Delivery
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Proof of Delivery submission can be connected here when
          the POD endpoint is implemented.
        </p>
      </div>
    </section>
  )
}
