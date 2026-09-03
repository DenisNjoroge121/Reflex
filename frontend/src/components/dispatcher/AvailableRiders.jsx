import { useEffect, useState } from 'react'
import API from '../../services/api'

function RiderCard({ rider }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Rider
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {rider._id}
          </p>
        </div>

        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          Available
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Vehicle
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {rider.vehicle_type || '—'}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            License Plate
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {rider.license_plate || '—'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AvailableRiders({ refreshKey = 0 }) {
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await API.get('/riders/available')

        setRiders(response.data?.riders || [])
      } catch (err) {
        console.error('Failed to load available riders:', err)

        setError(
          err.response?.data?.message ||
            'Unable to load available riders.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRiders()
  }, [refreshKey])

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Available Riders
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          View riders currently available for delivery assignments.
        </p>
      </div>

      {loading && (
        <div className="p-10 text-center">
          <p className="font-medium text-slate-700">
            Loading riders...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Fetching available riders from the backend.
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="p-10 text-center">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            The backend may still be under development.
          </p>
        </div>
      )}

      {!loading && !error && riders.length === 0 && (
        <div className="p-10 text-center">
          <p className="font-medium text-slate-700">
            No available riders
          </p>

          <p className="mt-1 text-sm text-slate-500">
            There are currently no riders available for assignment.
          </p>
        </div>
      )}

      {!loading && !error && riders.length > 0 && (
        <div className="grid gap-4 p-6 md:grid-cols-2">
          {riders.map((rider) => (
            <RiderCard key={rider._id} rider={rider} />
          ))}
        </div>
      )}
    </section>
  )
}
