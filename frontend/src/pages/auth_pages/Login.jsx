import React from "react";
import LoginForm from "./LoginForm";
import { useState } from "react";
import API from "../../services/api";

import { useNavigate } from "react-router-dom";
export default function Login({ switchToRegister }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setMessageType("");

    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const values = {
      
      email: email.trim(),
      password: password.trim(),
      
    };

    const allEmpty = Object.values(values).every((v) => !v);

    if (allEmpty) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    const newErrors = {};

  
    if (!values.email) newErrors.email = "Email is required";
   
    if (!values.password) newErrors.password = "Password required";
  

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

   
    if (!emailRegex.test(values.email)) newErrors.email = "Invalid email";

  

    if (!passwordRegex.test(values.password))
      newErrors.password = "Weak password";
  

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
       
        email: values.email,
        
        password: values.password,
      };

      const res = await API.post("/auth/login", payload);

      setMessage(res.data.success || "Login successful. Redirecting...");
      setMessageType("success");

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm
       switchToRegister={switchToRegister}
       loading={loading}
       email={email}
       setEmail={setEmail}
       onSubmit={handleLogin}
       password={password}
       setPassword={setPassword}
       message={message}
       setMessage={setMessage}
       messageType={messageType}
       errors={errors}
       setErrors={setErrors}      
      />
    </div>
  );
}
