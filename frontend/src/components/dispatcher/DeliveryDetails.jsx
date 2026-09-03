import { useEffect, useState } from 'react'
import API from '../../services/api'

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
  onAssigned,
}) {
  const [riders, setRiders] = useState([])
  const [selectedRiderId, setSelectedRiderId] = useState('')
  const [loadingRiders, setLoadingRiders] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [assignmentError, setAssignmentError] = useState('')
  const deliveryId = delivery?._id
  const canAssign = delivery?.status === 'Pending'

  useEffect(() => {
    if (!canAssign) return

    const fetchRiders = async () => {
      try {
        setLoadingRiders(true)
        setAssignmentError('')
        const response = await API.get('/api/riders/available')
        setRiders(response.data?.riders || [])
      } catch (err) {
        setAssignmentError(
          err.response?.data?.message || 'Unable to load available riders.',
        )
      } finally {
        setLoadingRiders(false)
      }
    }

    fetchRiders()
  }, [canAssign, deliveryId])

  if (!delivery) return null

  const handleAssign = async () => {
    if (!selectedRiderId) {
      setAssignmentError('Choose a rider before assigning this delivery.')
      return
    }

    try {
      setAssigning(true)
      setAssignmentError('')
      const response = await API.patch(`/api/deliveries/${delivery._id}/assign`, {
        rider_id: selectedRiderId,
      })
      const updatedDelivery = response.data?.delivery

      if (updatedDelivery) onAssigned?.(updatedDelivery)
    } catch (err) {
      setAssignmentError(
        err.response?.data?.message || 'Unable to assign this delivery.',
      )
    } finally {
      setAssigning(false)
    }
  }

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
          {delivery.status === 'Pending'
            ? 'Choose an available rider to assign this delivery.'
            : 'This delivery has already been assigned or completed.'}
        </p>

        {assignmentError && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {assignmentError}
          </p>
        )}

        {delivery.status === 'Pending' && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedRiderId}
              onChange={(event) => setSelectedRiderId(event.target.value)}
              disabled={loadingRiders || assigning}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              aria-label="Select a rider"
            >
              <option value="">
                {loadingRiders ? 'Loading available riders…' : 'Select a rider'}
              </option>
              {riders.map((rider) => (
                <option key={rider._id} value={rider._id}>
                  {rider.user?.full_name || rider._id} — {rider.vehicle_type || 'vehicle'}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAssign}
              disabled={loadingRiders || assigning || riders.length === 0}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {assigning ? 'Assigning…' : 'Assign rider'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
