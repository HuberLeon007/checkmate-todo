"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let users = JSON.parse(localStorage.getItem("checkmate-users") || "[]");
    const user = users.find((u) => u.email === email);
    if (!user) {
      setError("No account found with this email.");
      return;
    }
    // Generate code and send via API
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setLoading(true);
    try {
      const res = await fetch("/api/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, user: user.name || email.split("@")[0] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      setResetCode(code);
      setSuccess("Reset code sent! Please check your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCode = (e) => {
    e.preventDefault();
    setError("");
    if (inputCode !== resetCode) {
      setError("Invalid code.");
      return;
    }
    setStep(3);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("checkmate-users") || "[]");
    users = users.map((u) => u.email === email ? { ...u, password: newPassword } : u);
    localStorage.setItem("checkmate-users", JSON.stringify(users));
    setSuccess("Password reset successful! You can now log in.");
    setStep(4);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-gray-700/90 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-200 animate-pop-in">
        <h1 className="text-3xl font-semibold text-center mb-8 text-black tracking-tight">Forgot Password</h1>
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-medium mb-2">E-Mail</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Next"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleCode} className="space-y-6">
            <div>
              <label className="block text-black font-medium mb-2">Enter the code sent to your email</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black placeholder:text-gray-500"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                required
                autoFocus
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              Verify Code
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-black font-medium mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black placeholder:text-gray-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              Reset Password
            </button>
          </form>
        )}
        {step === 4 && (
          <div className="text-center">
            <div className="text-green-600 text-lg mb-4">{success}</div>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition mt-4"
            >
              Back to Login
            </button>
          </div>
        )}
        {step < 4 && (
          <div className="mt-6 text-center text-gray-600">
            <Link href="/login" className="text-blue-600 hover:underline font-medium">Back to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
