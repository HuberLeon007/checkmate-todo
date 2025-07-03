"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let users = JSON.parse(localStorage.getItem("checkmate-users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      login({ email });
      router.push("/todo");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl p-10 w-full max-w-md border border-gray-200 animate-pop-in">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 tracking-tight">Sign in to Checkmate</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">E-Mail</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          No account yet?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
        </div>
      </div>
    </div>
  );
}
