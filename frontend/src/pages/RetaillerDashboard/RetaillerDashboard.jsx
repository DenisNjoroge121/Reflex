import { useState } from 'react';
import API from '../../services/api';

import { getFirstName, getLastName } from '@/utils/auth';

import React from 'react'
import { useEffect } from 'react';
import AddDelivery from './components/AddDelivery';

export default function RetailerDashboard() {
    const firstName = "Samuel"// getFirstName();
    const lastName = "Kima" // getLastName();

    const [deliveries, setDeliveries] = useState([])

    const [allDeliveriesCount, setAllDeliveriesCount]= useState(null)
    const [loadingDeliveries, setLoadingDeliveries]= useState(false)
    const [message, setMessage]= useState("")
    const [messageType, setMessageType]=useState("")

    const loadDeliveries = async () => {
        setLoadingDeliveries(true)
         try {
            const res = await API.get('/deliveries')
            const allDeliveries = res.data?.deliveries || [];
            setDeliveries(allDeliveries)
            setAllDeliveriesCount(allDeliveries.length);            
         } catch (error) {
            const message = error.response?.data?.message || "Failed to get deliveries";
            setMessage(message)
            setMessageType("error")            
         }
    }

    useEffect(() => {
        loadDeliveries()
    })

    useEffect(() => {
        if (!message) return

        const timer = setTimeout(() => {
            setMessage("")
            setMessageType("")
        }, 3000)

        return () => clearTimeout(timer)
    }, [message], [messageType])

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.setItem("logout", Date.now())
        window.location.href = '/'
    }
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
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Reflex</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Retailer Portal</p>
            </div>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-medium text-slate-900 leading-tight">{`${firstName} ${lastName}`}</p>
                <p className="text-xs text-slate-500">Retailer</p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition"
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

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
          
            <AddDelivery setDeliveries={setDeliveries}/>
          </button>
        </div>

        {/* Deliveries Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Your Deliveries
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {allDeliveriesCount} total
            </span>
          </div>

          {/* Deliveries Container */}
          <div className="p-6">
            {/* Deliveries will go here */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-slate-400"
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
              <h4 className="text-sm font-semibold text-slate-900">No deliveries yet</h4>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Click the "Add delivery" button above to create your first delivery.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}