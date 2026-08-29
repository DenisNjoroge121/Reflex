import React from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog'

// Helper to style the status badge dynamically
const getStatusStyle = (status) => {
  const s = status?.toLowerCase() || ''
  if (s.includes('deliver')) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (s.includes('transit') || s.includes('pick')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (s.includes('pending')) return 'bg-amber-50 text-amber-700 border-amber-200'
  if (s.includes('cancel')) return 'bg-red-50 text-red-700 border-red-200'
  return 'bg-slate-100 text-slate-600 border-slate-200'
}

export default function DeliveryItem({ delivery }) {
  const statusStyle = getStatusStyle(delivery.status)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left group p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                  {delivery.customerName}
                </h4>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
                  {delivery.status || 'Unknown'}
                </span>
              </div>
              <p className="text-sm text-slate-500 truncate">{delivery.phone}</p>
              <p className="text-xs text-slate-400 truncate mt-1">{delivery.address}</p>
            </div>
            
            {/* Chevron Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {delivery.customerName}
              </DialogTitle>
              <p className="text-sm text-slate-500">Delivery Details</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Status & Location Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Status</p>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold border ${statusStyle}`}>
                {delivery.status || 'Unknown'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Current Location</p>
              <p className="text-sm font-medium text-slate-900 truncate">{delivery.location || 'Not tracked'}</p>
            </div>
          </div>

          {/* Contact & Address Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-slate-900">{delivery.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Delivery Address</p>
                <p className="text-sm font-medium text-slate-900">{delivery.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16.5 9.4 7.55 4.24" />
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Item Description</p>
                <p className="text-sm font-medium text-slate-900 leading-relaxed">{delivery.itemDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions (Optional, but good for UX) */}
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
          <DialogClose asChild>
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>   
  )
}