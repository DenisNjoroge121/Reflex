import React from "react";
import { useState } from "react";
import RegisterForm from "./RegForm";
import API from "../../services/api";

import { useNavigate } from "react-router-dom";

export default function Register({ switchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Retailer");
  const [storeName, setStoreName] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setMessageType("");

    const nameRegex = /^[A-Za-z]+$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(07|01)\d{8}$/;
    const values = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      confirmPassword,
      role,
    };

    const allEmpty = Object.values(values).every((v) => !v);

    if (allEmpty) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    const newErrors = {};

    if (!values.firstName) newErrors.firstName = "First name required";
    if (!values.lastName) newErrors.lastName = "Last name required";
    if (!values.email) newErrors.email = "Email is required";
    if (!values.phone) newErrors.phone = "Phone number is required";
    if (!values.password) newErrors.password = "Password required";
    if (!values.confirmPassword)
      newErrors.confirmPassword = "Password required";
    if (role === "Retailer" && !storeName.trim())
      newErrors.storeName = "Store name is required";
    if (role === "Retailer" && !storeLocation.trim())
      newErrors.storeLocation = "Store location is required";
    if (role === "Dispatcher" && !department.trim())
      newErrors.department = "Department is required";
    if (role === "Rider" && !vehicleType.trim())
      newErrors.vehicleType = "Vehicle type is required";
    if (role === "Rider" && !licensePlate.trim())
      newErrors.licensePlate = "License plate is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    if (!nameRegex.test(values.firstName))
      newErrors.firstName = "Only letters allowed";
    if (!nameRegex.test(values.lastName))
      newErrors.lastName = "Only letters allowed";
    if (!emailRegex.test(values.email)) newErrors.email = "Invalid email";

    if (values.phone.startsWith("254")) newErrors.phone = "use 07XXXXXX";
    else if (!phoneRegex.test(values.phone))
      newErrors.phone = "Invalid phone number";

    if (values.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (values.password !== values.confirmPassword)
      newErrors.confirmPassword = "Password don'r match";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: `254${values.phone.slice(1)}`,
        password: values.password,
        role,
      };

      if (role === "Retailer") {
        payload.store_name = storeName.trim();
        payload.store_location = storeLocation.trim();
      }

      if (role === "Dispatcher") {
        payload.department = department.trim();
      }

      if (role === "Rider") {
        payload.vehicle_type = vehicleType.trim();
        payload.license_plate = licensePlate.trim();
      }

     

      const res = await API.post("/api/auth/register", payload);

      setMessage(res.data.success || "Signup successfull. Redirecting...");
      setMessageType("success");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <RegisterForm
      switchToLogin={switchToLogin}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      role={role}
      setRole={setRole}
      storeName={storeName}
      setStoreName={setStoreName}
      storeLocation={storeLocation}
      setStoreLocation={setStoreLocation}
      department={department}
      setDepartment={setDepartment}
      vehicleType={vehicleType}
      setVehicleType={setVehicleType}
      licensePlate={licensePlate}
      setLicensePlate={setLicensePlate}
      loading={loading}
      setLoading={setLoading}
      errors={errors}
      setErrors={setErrors}
      message={message}
      setMessage={setMessage}
      messageType={messageType}
      setMessageType={setMessageType}
      onSubmit={handleSignUp}
    />
  );
}
