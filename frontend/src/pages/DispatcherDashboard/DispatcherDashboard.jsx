import { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'
import DeliveryFilters from '../../components/dispatcher/DeliveryFilters'
import DeliveryTable from '../../components/dispatcher/DeliveryTable'
import DeliveryDetails from '../../components/dispatcher/DeliveryDetails'
import AvailableRiders from '../../components/dispatcher/AvailableRiders'

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}

export default function DispatcherDashboard() {
  const [deliveries, setDeliveries] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await API.get('/api/deliveries')

        setDeliveries(response.data?.deliveries || [])
      } catch (err) {
        console.error('Failed to load deliveries:', err)

        setError(
          err.response?.data?.message ||
            'Unable to load delivery requests.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDeliveries()
  }, [])

  const summary = useMemo(
    () => ({
      pending: deliveries.filter(
        (delivery) => delivery.status === 'Pending',
      ).length,

      assigned: deliveries.filter(
        (delivery) => delivery.status === 'Assigned',
      ).length,

      inProgress: deliveries.filter(
        (delivery) =>
          delivery.status === 'Picked Up' ||
          delivery.status === 'Out for Delivery',
      ).length,

      delivered: deliveries.filter(
        (delivery) => delivery.status === 'Delivered',
      ).length,
    }),
    [deliveries],
  )

  const filteredDeliveries = useMemo(() => {
    if (selectedStatus === 'all') {
      return deliveries
    }

    return deliveries.filter(
      (delivery) => delivery.status === selectedStatus,
    )
  }, [deliveries, selectedStatus])

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Dispatcher Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Monitor deliveries, manage riders, and coordinate delivery progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Pending"
          value={summary.pending}
        />

        <SummaryCard
          label="Assigned"
          value={summary.assigned}
        />

        <SummaryCard
          label="In Progress"
          value={summary.inProgress}
        />

        <SummaryCard
          label="Delivered"
          value={summary.delivered}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Delivery Requests
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View and monitor incoming delivery requests.
              </p>
            </div>

            <DeliveryFilters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>
        </div>

        {loading && (
          <div className="p-10 text-center">
            <p className="font-medium text-slate-700">
              Loading deliveries...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Fetching delivery requests from the backend.
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

        {!loading && !error && (
          <DeliveryTable
            deliveries={filteredDeliveries}
            onViewDetails={setSelectedDelivery}
          />
        )}
      </div>

      <DeliveryDetails
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />

    <AvailableRiders />
    </section>
  )
}
