import { useState } from "react";
import API from "../../services/api";

import { getFirstName, getLastName } from "@/utils/auth";
import DeliveryItem from "./components/DeliveryItem";

import React from "react";
import { useEffect } from "react";
import AddDelivery from "./components/AddDelivery";

import { startWebsocket, stopWebSocket } from "@/services/websocket";

export default function RetailerDashboard() {
  const firstName = "Samuel"; // getFirstName();
  const lastName = "Kima"; // getLastName();

  const [deliveries, setDeliveries] = useState([]);

  const [allDeliveriesCount, setAllDeliveriesCount] = useState(null);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

const [showConfirmLogout, setShowConfirmLogout] = useState(false);

const [connected, setConnected] = useState(false)

  const loadDeliveries = async () => {
    setLoadingDeliveries(true);
    try {
      //   const res = await API.get("/deliveries");
      const allDeliveries =
        //   res.data?.deliveries ||
        [
          {
            id: 1,
            customer_name: "John Doe",
            customer_phone: "0712345678",
            customer_address: "123 Main St, Cityville",
            item_description: "Electronics",
            status: "Pending",
            customer_location: "Nairobi",
          },
          {
            id: 2,
            customer_name: "Jane Smith",
            customer_phone: "0798765432",
            customer_address: "456 Elm St, Townsville",
            item_description: "Clothing",
            status: "In Transit",
            customer_location: "Mombasa",
          },
          {
            id: 3,
            customer_name: "Alice Johnson",
            customer_phone: "0709876543",
            customer_address: "789 Oak St, Villageville",
            item_description: "Books",
            status: "Delivered",
            customer_location: "Kisumu",
          },
        ];
      setDeliveries(allDeliveries);
      setAllDeliveriesCount(allDeliveries.length);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to get deliveries";
      setMessage(message);
      setMessageType("error");
    } finally {
      setLoadingDeliveries(false);
    }
  };

  useEffect(() => {
    loadDeliveries();

    startWebsocket(
    (message) => {
      if (message.event === "deliveries"){
        setDeliveries((prev) => [
          message.data, ...prev
        ])
      }
    },
    () => {
      setConnected(true)
    },
    
    () => {
      setConnected(false)
    }
    );
    

    return () => {
      stopWebSocket()
    }
  }, []);

  useEffect(
    () => {
      if (!message) return;

      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

      return () => clearTimeout(timer);
    },
    [message]
    
  );

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logout", Date.now());
    setShowConfirmLogout(false);
    window.location.href = "/";
  };

  useEffect(() =>{
    // Listen for logout event from other tabs
    const handleStorage = (event) => {
      if (event.key === "logout") {
        setShowConfirmLogout(false);
        window.location.href = "/";
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);


  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Reflex
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">Retailer Portal</p>
              {connected
                    ? "🟢"
                    : "🔴"
                }
            </div>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {firstName.charAt(0).toUpperCase()}
                {lastName.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-medium text-slate-900 leading-tight">{`${firstName} ${lastName}`}</p>
                <p className="text-xs text-slate-500">Retailer</p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm 
              font-medium text-slate-700 bg-white border border-slate-200 
              rounded-lg hover:bg-slate-50 hover:border-slate-400 transition"
              onClick={() => setShowConfirmLogout(true)}
           >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>

            {showConfirmLogout && (
  <ConfirmLogoutModal
    setShowConfirmLogout={setShowConfirmLogout}
    logOut={logOut}
  />
)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Retailer Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage and track all your deliveries in one place.
            </p>
          </div>

        
            <AddDelivery setDeliveries={setDeliveries} />
         
        </div>

        {/* Deliveries Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Your Deliveries
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {deliveries.length} total
            </span>
          </div>

                   {/* Deliveries Container */}
          <div className="p-6">
            {loadingDeliveries ? (
              // Skeleton Loader
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl animate-pulse"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-1/3 bg-slate-200 rounded-md"></div>
                        <div className="h-4 w-1/4 bg-slate-200 rounded-md"></div>
                        <div className="h-3 w-2/3 bg-slate-200 rounded-md"></div>
                      </div>
                      <div className="h-6 w-16 bg-slate-200 rounded-full mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : deliveries.length > 0 ? (
              // Actual Deliveries
              <div className="flex flex-col gap-3">
                {deliveries.map((delivery) => (
                  <DeliveryItem key={delivery.id} 
                  delivery={delivery}
                   setDeliveries={setDeliveries} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                    <path d="M15 18H9" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                    <circle cx="17" cy="18" r="2" />
                    <circle cx="7" cy="18" r="2" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-slate-900">
                  No deliveries yet
                </h4>
                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Click the "Add delivery" button above to create your first
                  delivery.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}


function ConfirmLogoutModal({ setShowConfirmLogout, logOut }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Icon & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Confirm Logout
          </h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Are you sure you want to log out of your account? You will need to sign in again to access your dashboard.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            onClick={() => setShowConfirmLogout(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-sm shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => {
              setShowConfirmLogout(false);
              logOut();
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Yes, Log Out
          </button>
        </div>
        
      </div>
    </div>
  );
}