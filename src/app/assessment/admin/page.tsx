"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Users, Key, ArrowRight, LogOut, Upload, Home } from "lucide-react";
import { setAdminAuthenticated, isAdminAuthenticated, verifyAdminPassword, clearAdminAuthentication } from "@/lib/assessment/adminAuth";

export default function AdminLanding() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (verifyAdminPassword(password)) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    clearAdminAuthentication();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4 pt-24 md:pt-28">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-700 rounded-full">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Enter password to access admin features
          </p>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none transition-colors"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
            >
              Access Admin Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12">
      <div className="max-w-5xl w-full text-center relative">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Admin Portal
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Manage assessments, tokens, leads, and bulk operations
          </p>
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            onClick={() => router.push("/assessment/admin/tokens")}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-slate-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-cyan-600 rounded-2xl">
                <Key className="w-8 h-8 text-white" />
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Token Management</h2>
            <p className="text-slate-600 mb-4">
              Generate access tokens for full assessments with custom features and expiry dates
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full flex-shrink-0 mt-1.5"></div><span className="text-left">Create new tokens</span></li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full flex-shrink-0 mt-1.5"></div><span className="text-left">Set expiry dates &amp; usage limits</span></li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full flex-shrink-0 mt-1.5"></div><span className="text-left">Configure feature access</span></li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full flex-shrink-0 mt-1.5"></div><span className="text-left">Track token usage</span></li>
            </ul>
          </div>

          <div
            onClick={() => router.push("/assessment/admin/leads")}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-slate-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-emerald-600 rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Lead Management</h2>
            <p className="text-slate-600 mb-4">
              View and manage all assessment leads with filtering and export options
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>View all leads</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>Filter by status &amp; assessment type</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>Export to CSV</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>Bulk operations</li>
            </ul>
          </div>

          <div
            onClick={() => router.push("/assessment/admin/bulk-upload")}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-slate-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-orange-600 rounded-2xl">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Bulk Reports</h2>
            <p className="text-slate-600 mb-4">
              Upload CSV to generate PDF reports for multiple students at once
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>Upload Google Forms CSV</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>Preview scores &amp; filter students</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>Select specific students</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>Download reports as ZIP</li>
            </ul>
          </div>
        </div>

        {/* Go to Home Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/assessment")}
            className="px-8 py-4 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            <Home className="w-5 h-5" />
            <span>Go to Assessment Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
