import { useState } from 'react'
import DispatcherDashboard from './pages/DispatcherDashboard/DispatcherDashboard'
import RiderDashboard from './pages/RiderDashboard/RiderDashboard'

function App() {
  const [role, setRole] = useState('dispatcher')

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reflex</h1>
            <p className="text-sm text-slate-500">Delivery Management System</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRole('dispatcher')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                role === 'dispatcher'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dispatcher
            </button>

            <button
              type="button"
              onClick={() => setRole('rider')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                role === 'rider'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Rider
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {role === 'dispatcher' ? (
          <DispatcherDashboard />
        ) : (
          <RiderDashboard />
        )}
      </main>
    </div>
  )
}

export default App
