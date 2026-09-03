import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth_pages/Auth'
import RoleDashboard from './pages/RoleDashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoutes>
              <main className="min-h-screen bg-slate-100">
                <div className="mx-auto max-w-7xl px-6 py-8">
                  <RoleDashboard />
                </div>
              </main>
            </ProtectedRoutes>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
