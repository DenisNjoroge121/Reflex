import React from "react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegForm({
  switchToLogin,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  role,
  setRole,
  storeName,
  setStoreName,
  storeLocation,
  setStoreLocation,
  department,
  setDepartment,
  vehicleType,
  setVehicleType,
  licensePlate,
  setLicensePlate,
  loading,

  errors,
  setErrors,
  message,
  setMessage,
  messageType,

  onSubmit,
}) {
  const [showPass, setShowPass] = useState(false);
  const [showPassC, setShowPassC] = useState(false);

  // time ot for message to disappear
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Reflex Delivery
          </h2>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Register</h3>
          {/* error message here */}
          {message && (
            <p
              className={`mt-4 text-sm ${messageType === "error" ? "text-red-500" : "text-green-500"} text-center`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={onSubmit}
          onClick={() => setMessage("")}
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName)
                    setErrors((p) => ({ ...p, firstName: "" }));
                }}
              />
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName)
                    setErrors((p) => ({ ...p, lastName: "" }));
                }}
              />
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            </div>
          </div>

          {/* phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="0712345678"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
              }}
            />
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Account role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Retailer">Retailer</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Rider">Rider</option>
            </select>
          </div>

          {role === "Retailer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Store name</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
                <p className="mt-1 text-xs text-red-500">{errors.storeName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Store location</label>
                <input type="text" value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
                <p className="mt-1 text-xs text-red-500">{errors.storeLocation}</p>
              </div>
            </>
          )}

          {role === "Dispatcher" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
              <p className="mt-1 text-xs text-red-500">{errors.department}</p>
            </div>
          )}

          {role === "Rider" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle type</label>
                <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
                <p className="mt-1 text-xs text-red-500">{errors.vehicleType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">License plate</label>
                <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
                <p className="mt-1 text-xs text-red-500">{errors.licensePlate}</p>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: "" }));
              }}
            />
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                minLength="6"
                autoComplete="new-password"
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((p) => ({ ...p, password: "" }));
                  }
                }}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassC ? "text" : "password"}
                minLength="6"
                autoComplete="new-password"
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((p) => ({ ...p, confirmPassword: "" }));
                  }
                }}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
                onClick={() => setShowPassC(!showPassC)}
              >
                {showPassC ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-2"
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <p className="mt-4 text-sm text-slate-500 text-center">
            Already have an account?
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              onClick={switchToLogin}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
