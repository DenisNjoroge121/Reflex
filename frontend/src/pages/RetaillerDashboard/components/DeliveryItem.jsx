import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditDelivery from "./EditDeliveryItem"; 
import API from "@/services/api";

const getStatusStyle = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("deliver")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s.includes("transit") || s.includes("pick")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (s.includes("pending")) return "bg-amber-50 text-amber-700 border-amber-200";
  if (s.includes("cancel")) return "bg-red-50 text-red-700 border-red-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
};

export default function DeliveryItem({ setDeliveries, delivery }) {
  const statusStyle = getStatusStyle(delivery.status);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

const deleteDelivery = async (deliveryId) => {
  setIsDeleting(deliveryId);

  try {
    // await API.delete(`/api/deliveries/${deliveryId}`);

    setDeliveries((prev) =>
      prev.filter((d) => d.id !== deliveryId)
    );
  } catch (error) {
    console.error("Error deleting delivery:", error);
  } finally {
    setIsDeleting(null);
  }
};

  return (
    <>
      {/* 1. View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogTrigger asChild>
          <button className="w-full text-left group p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {delivery.customer_name || "Unknown Customer"}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
                    {delivery.status || "Unknown"}
                  </span>
                </div>
                <p className="text-sm text-slate-500 truncate">{delivery.customer_phone}</p>
                <p className="text-xs text-slate-400 truncate mt-1">{delivery.customer_address}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <DialogTitle className="text-xl font-bold text-slate-900">{delivery.customer_name || "Unknown Customer"}</DialogTitle>
                <p className="text-sm text-slate-500">Delivery Details</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold border ${statusStyle}`}>
                  {delivery.status || "Unknown"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Current Location</p>
                <p className="text-sm font-medium text-slate-900 truncate">{delivery.customer_location || "Not tracked"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <DetailRow 
                icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
                label="Phone"
                value={delivery.customer_phone}
              />
              <DetailRow 
                icon={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
                label="Delivery Address"
                value={delivery.customer_address || "No address provided"}
              />
              <DetailRow 
                icon={<><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></>}
                label="Item Description"
                value={delivery.item_description || "No description provided"}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsViewOpen(false); 
                setIsEditOpen(true);  
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit delivery
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors"
             onClick={() => deleteDelivery(delivery.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              {isDeleting === delivery.id ? "Deleting..." : "Delete"}
            </button>

          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Edit Dialog */}
      <EditDelivery 
        open={isEditOpen} 
        onOpenChange={(isOpen) => {
          setIsEditOpen(isOpen);
          // ✨ THE FIX: When the edit dialog closes, automatically reopen the view dialog
          if (!isOpen) {
            setIsViewOpen(true);
          }
        }} 
        setDeliveries={setDeliveries} 
        delivery={delivery} 
      />
    </>
  );
}

// Helper component
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-slate-900 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}