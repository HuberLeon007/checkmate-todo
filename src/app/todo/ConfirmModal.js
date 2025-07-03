"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../auth-context";
import { usePathname } from "next/navigation";

export default function ConfirmModal({ title, message, modalType = "simple", requiredWord, onConfirm, onCancel }) {
  const [confirmText, setConfirmText] = useState("");
  const requireText = modalType === "requireText";
  const isConfirmEnabled = requireText ? confirmText === requiredWord : true;

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isConfirmEnabled) {
      handleConfirm();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 relative" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
        <div className="mb-4 text-gray-700 whitespace-pre-line">{message}</div>
        {requireText && requiredWord && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Tippe <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">{requiredWord}</span> zur Bestätigung:</p>
            <input
              type="text"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
              placeholder={`Tippe ${requiredWord}...`}
              autoFocus
            />
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Abbrechen</button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition ${!isConfirmEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isConfirmEnabled}
          >
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppleNavbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  let rightLinks = null;
  if (!user) {
    if (pathname.startsWith("/login")) {
      rightLinks = (
        <Link href="/register" className="text-gray-700 hover:text-black font-medium transition">Register</Link>
      );
    } else if (pathname.startsWith("/register")) {
      rightLinks = (
        <Link href="/login" className="text-gray-700 hover:text-black font-medium transition">Login</Link>
      );
    }
  } else {
    rightLinks = (
      <button onClick={logout} className="text-gray-700 hover:text-black font-medium transition">Logout</button>
    );
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm fixed top-0 left-0 z-40">
      <div />
      <div className="flex items-center gap-6">{rightLinks}</div>
    </nav>
  );
}
