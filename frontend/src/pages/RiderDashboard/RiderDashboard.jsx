export default function RiderDashboard() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Rider Dashboard
        </h2>
        <p className="mt-2 text-slate-500">
          View assigned deliveries and update delivery progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Assigned</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Picked Up</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Out for Delivery</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Delivered</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          My Deliveries
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Your assigned deliveries will appear here.
        </p>

        <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-10 text-center">
          <p className="font-medium text-slate-700">
            No assigned deliveries
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Assigned deliveries will be loaded from the backend.
          </p>
        </div>
      </div>
    </section>
  )
}
