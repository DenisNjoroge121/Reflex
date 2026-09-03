import { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'
import RiderDeliveryCard from '../../components/rider/RiderDeliveryCard'
import RiderDeliveryDetails from '../../components/rider/RiderDeliveryDetails'

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}

export default function RiderDashboard() {
  const [deliveries, setDeliveries] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDeliveries = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await API.get('/api/riders/deliveries')

      setDeliveries(response.data?.deliveries || [])
    } catch (err) {
      console.error('Failed to load rider deliveries:', err)

      setError(
        err.response?.data?.message ||
          'Unable to load your deliveries.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const summary = useMemo(
    () => ({
      assigned: deliveries.filter(
        (delivery) => delivery.status === 'Assigned',
      ).length,

      pickedUp: deliveries.filter(
        (delivery) => delivery.status === 'Picked Up',
      ).length,

      outForDelivery: deliveries.filter(
        (delivery) => delivery.status === 'Out for Delivery',
      ).length,

      delivered: deliveries.filter(
        (delivery) => delivery.status === 'Delivered',
      ).length,
    }),
    [deliveries],
  )

  const handleStatusUpdated = (updatedDelivery) => {
    setDeliveries((currentDeliveries) =>
      currentDeliveries.map((delivery) =>
        delivery._id === updatedDelivery._id
          ? updatedDelivery
          : delivery,
      ),
    )

    setSelectedDelivery(updatedDelivery)
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Rider Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          View your assigned deliveries and update delivery progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Assigned"
          value={summary.assigned}
        />

        <SummaryCard
          label="Picked Up"
          value={summary.pickedUp}
        />

        <SummaryCard
          label="Out for Delivery"
          value={summary.outForDelivery}
        />

        <SummaryCard
          label="Delivered"
          value={summary.delivered}
        />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            My Deliveries
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Deliveries assigned to your rider account will appear here.
          </p>
        </div>

        {loading && (
          <div className="p-10 text-center">
            <p className="font-medium text-slate-700">
              Loading deliveries...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Fetching your delivery assignments.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="p-10 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchDeliveries}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && deliveries.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-medium text-slate-700">
              No assigned deliveries
            </p>

            <p className="mt-1 text-sm text-slate-500">
              New deliveries assigned to you will appear here.
            </p>
          </div>
        )}

        {!loading && !error && deliveries.length > 0 && (
          <div className="grid gap-4 p-6">
            {deliveries.map((delivery) => (
              <RiderDeliveryCard
                key={delivery._id}
                delivery={delivery}
                onViewDetails={setSelectedDelivery}
              />
            ))}
          </div>
        )}
      </div>

      <RiderDeliveryDetails
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </section>
  )
}
