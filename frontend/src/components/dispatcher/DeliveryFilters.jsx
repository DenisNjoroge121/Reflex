const STATUSES = [
    'Pending',
    'Assigned',
    'Picked Up',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
]

export default function DeliveryFilters({
    selectedStatus,
    onStatusChange,
}) {
    return (
        <select
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            aria-label="Filter deliveries by status"
        >
            <option value="all">All statuses</option>

            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    )
}