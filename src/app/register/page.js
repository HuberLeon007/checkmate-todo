"use client";

import React, { useState } from "react";
import Link from "next/link";
import PasswordRequirements from "./PasswordRequirements";
import { useAuth } from "../auth-context";

function allRequirementsMet(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!allRequirementsMet(password)) {
      setError("Password does not meet all requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate user registration and save to localStorage (NoSQL-like)
    let users = JSON.parse(localStorage.getItem("checkmate-users") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("User already exists.");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("checkmate-users", JSON.stringify(users));
    // Create empty user data
    let userData = JSON.parse(localStorage.getItem("checkmate-userdata") || "{}");
    userData[email] = { tasks: [] };
    localStorage.setItem("checkmate-userdata", JSON.stringify(userData));
    setSuccess("Registration successful! You can now log in.");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl p-10 w-full max-w-md border border-gray-200 animate-pop-in">
        <h1 className="text-3xl font-semibold text-center mb-8 text-black tracking-tight">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black font-medium mb-2">E-Mail</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-black placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordRequirements password={password} />
          </div>
          <div>
            <label className="block text-black font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-black placeholder:text-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className={`w-full py-3 font-semibold transition ${allRequirementsMet(password) ? "bg-black text-white hover:bg-gray-900" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
            disabled={!allRequirementsMet(password)}
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
}
