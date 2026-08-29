import React from 'react'

export default function LoginForm({ switchToRegister }) {
  
     return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Reflex Delivery
          </h2>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            Login
          </h3>
        </div>

        {/* Form */}
        <form className="space-y-5">         

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input 
              type="email" 
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              placeholder="you@example.com" 
            />
            <p className="mt-1 text-xs text-red-500">error message</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              placeholder="••••••••" 
            />
            <p className="mt-1 text-xs text-red-500">error message</p>
          </div>

         

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-2"
          >
            Login
          </button>
           <p className="mt-4 text-sm text-slate-500 text-center">
              Don't have an account? 
              <button 
                type="button" 
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                onClick={switchToRegister}
              >
                Register
              </button>
            </p>
          
        </form>
      </div>
    </div>
  )
  
}
