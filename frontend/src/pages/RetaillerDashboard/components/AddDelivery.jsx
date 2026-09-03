import React, { useEffect, useState } from "react";
import API from "../../../services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function AddDelivery({ setDeliveries }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setMessageType("");

    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const phoneRegex = /^(07|01)\d{8}$/;

    const values = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      pickupLocation: pickupLocation.trim(),
      dropoffAddress: dropoffAddress.trim(),
      itemDescription: itemDescription.trim(),
    };

    const newErrors = {};

    // Required fields
    if (!values.customerName) {
      newErrors.customerName = "Customer name is required";
    }

    if (!values.customerPhone) {
      newErrors.customerPhone = "Phone number is required";
    }

    if (!values.customerAddress) {
      newErrors.customerAddress = "Customer address is required";
    }

    if (!values.pickupLocation) {
      newErrors.pickupLocation = "Pickup location is required";
    }

    if (!values.dropoffAddress) {
      newErrors.dropoffAddress = "Drop-off address is required";
    }

    if (!values.itemDescription) {
      newErrors.itemDescription = "Item description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage("Please fill in all required fields");
      setMessageType("error");
      return;
    }

    // Validate name
    if (!nameRegex.test(values.customerName)) {
      newErrors.customerName = "Only letters and spaces are allowed";
    }

    // Validate phone
    if (!phoneRegex.test(values.customerPhone)) {
      newErrors.customerPhone = "Use 07XXXXXXXX or 01XXXXXXXX";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage("Please correct the errors");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       * These field names match deliveryController.js
       */
      const payload = {
        customer_name: values.customerName,
        customer_phone: `254${values.customerPhone.slice(1)}`,
        customer_address: values.customerAddress,
        pickup_location: values.pickupLocation,
        dropoff_address: values.dropoffAddress,

        // Delivery model has a separate phone field.
        // We keep the customer's phone here too.
        phone: `254${values.customerPhone.slice(1)}`,

        // Store the item description as instructions for now.
        instructions: "",item_description: values.itemDescription,
      };

      // Actually save the delivery to MongoDB
      const res = await API.post("/deliveries", payload);

      if (!res.data?.success) {
        throw new Error(
          res.data?.message || "Failed to create delivery"
        );
      }

      /*
       * The backend returns the newly-created delivery.
       *
       * Add it to the retailer dashboard using the actual
       * MongoDB object rather than creating a fake frontend object.
       */
      const createdDelivery = res.data.delivery;

      /*
       * The backend's createDelivery response doesn't populate
       * the customer yet, so fetch the complete delivery.
       */
      const detailsRes = await API.get(
        `/deliveries/${createdDelivery._id}`
      );

      const completeDelivery =
        detailsRes.data?.delivery || createdDelivery;

      setDeliveries((prev) => [
        completeDelivery,
        ...prev,
      ]);

      setMessage("Delivery saved successfully!");
      setMessageType("success");

      // Clear form
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setPickupLocation("");
      setDropoffAddress("");
      setItemDescription("");

    } catch (error) {
      console.error("Create delivery error:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to save delivery"
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
        setErrors({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>

          Add delivery
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Add delivery information
          </DialogTitle>

          <p className="text-sm text-slate-500 mt-1">
            Fill in the details below to create a new delivery.
          </p>
        </DialogHeader>

        {message && (
          <div
            className={`mt-4 px-4 py-2 flex items-center justify-center w-full rounded-lg text-sm ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          className="space-y-4 mt-2"
          onSubmit={handleSave}
        >
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Customer name
            </label>

            <input
              type="text"
              placeholder="Moses Juma"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);

                if (errors.customerName) {
                  setErrors((p) => ({
                    ...p,
                    customerName: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.customerName}
            </p>
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Customer phone
            </label>

            <input
              type="tel"
              placeholder="0745123456"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);

                if (errors.customerPhone) {
                  setErrors((p) => ({
                    ...p,
                    customerPhone: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.customerPhone}
            </p>
          </div>

          {/* Customer Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Customer address
            </label>

            <input
              type="text"
              placeholder="House No., Building, Town"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={customerAddress}
              onChange={(e) => {
                setCustomerAddress(e.target.value);

                if (errors.customerAddress) {
                  setErrors((p) => ({
                    ...p,
                    customerAddress: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.customerAddress}
            </p>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Pickup location
            </label>

            <input
              type="text"
              placeholder="Kenyatta University"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);

                if (errors.pickupLocation) {
                  setErrors((p) => ({
                    ...p,
                    pickupLocation: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.pickupLocation}
            </p>
          </div>

          {/* Drop-off Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Drop-off address
            </label>

            <input
              type="text"
              placeholder="Nairobi CBD"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={dropoffAddress}
              onChange={(e) => {
                setDropoffAddress(e.target.value);

                if (errors.dropoffAddress) {
                  setErrors((p) => ({
                    ...p,
                    dropoffAddress: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.dropoffAddress}
            </p>
          </div>

          {/* Item Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Item description
            </label>

            <textarea
              rows={3}
              placeholder="Laptop, electronics, documents, etc."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              value={itemDescription}
              onChange={(e) => {
                setItemDescription(e.target.value);

                if (errors.itemDescription) {
                  setErrors((p) => ({
                    ...p,
                    itemDescription: "",
                  }));
                }
              }}
            />

            <p className="mt-1 text-xs text-red-500">
              {errors.itemDescription}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}