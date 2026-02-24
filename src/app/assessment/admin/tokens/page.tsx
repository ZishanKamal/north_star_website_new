"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Key, Plus, Copy, Check, Trash2, XCircle, Calendar, Users as UsersIcon, Download, Award, ArrowLeft, RefreshCw,
} from "lucide-react";
import { getAllTokens, createToken, deactivateToken, deleteToken, TokenData } from "@/lib/assessment/supabase";
import { isAdminAuthenticated } from "@/lib/assessment/adminAuth";

export default function TokenManagement() {
  const router = useRouter();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [deactivateConfirm, setDeactivateConfirm] = useState<{ id: string; code: string; label: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; code: string; label: string } | null>(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/assessment/admin");
      return;
    }
    loadTokens();
  }, [router]);

  const [newToken, setNewToken] = useState({
    label: "",
    description: "",
    durationType: "hours" as "hours" | "days",
    duration: 24,
    usageLimit: "",
    pdfDownload: true,
    certificateDownload: false,
  });

  const loadTokens = async () => {
    setLoading(true);
    const result = await getAllTokens();
    if (result.success) {
      setTokens(result.tokens);
    }
    setLoading(false);
  };

  const handleCreateToken = async () => {
    if (!newToken.duration || newToken.duration <= 0) {
      alert("Please set a valid duration");
      return;
    }
    setLoading(true);
    const now = new Date();
    const expiryDate = new Date(now);
    if (newToken.durationType === "hours") {
      expiryDate.setHours(expiryDate.getHours() + newToken.duration);
    } else {
      expiryDate.setDate(expiryDate.getDate() + newToken.duration);
    }
    const result = await createToken({
      label: newToken.label || undefined,
      description: newToken.description || undefined,
      expiryDate: expiryDate.toISOString(),
      usageLimit: newToken.usageLimit ? parseInt(newToken.usageLimit) : undefined,
      features: {
        pdfDownload: newToken.pdfDownload,
        certificateDownload: newToken.certificateDownload,
      },
    });
    if (result.success) {
      setShowCreateModal(false);
      setNewToken({ label: "", description: "", durationType: "hours", duration: 24, usageLimit: "", pdfDownload: true, certificateDownload: false });
      loadTokens();
    } else {
      alert("Failed to create token: " + result.error);
    }
    setLoading(false);
  };

  const handleCopyToken = (tokenCode: string) => {
    navigator.clipboard.writeText(tokenCode);
    setCopiedToken(tokenCode);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const confirmDeactivate = async () => {
    if (!deactivateConfirm) return;
    const result = await deactivateToken(deactivateConfirm.id);
    if (result.success) { loadTokens(); setDeactivateConfirm(null); }
    else { alert("Failed to deactivate token: " + result.error); }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const result = await deleteToken(deleteConfirm.id);
    if (result.success) { loadTokens(); setDeleteConfirm(null); }
    else { alert("Failed to delete token: " + result.error); }
  };

  const isTokenExpired = (expiryDate: string) => new Date(expiryDate) < new Date();
  const isTokenLimitReached = (token: TokenData) => token.usage_limit && token.usage_count && token.usage_count >= token.usage_limit;

  const getTokenStatus = (token: TokenData) => {
    if (!token.is_active) return { text: "Deactivated", color: "bg-slate-500" };
    if (isTokenExpired(token.expiry_date)) return { text: "Expired", color: "bg-red-500" };
    if (isTokenLimitReached(token)) return { text: "Limit Reached", color: "bg-orange-500" };
    return { text: "Active", color: "bg-green-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => router.push("/assessment/admin")} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Token Management</h1>
              </div>
              <p className="text-slate-600 ml-14">Generate and manage access tokens for full assessments</p>
            </div>
            <div className="flex gap-3">
              <button onClick={loadTokens} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50">
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                <Plus className="w-5 h-5" /> Generate Token
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-500 text-sm">Total Tokens</p><p className="text-3xl font-bold text-slate-900">{tokens.length}</p></div>
              <Key className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-500 text-sm">Active</p><p className="text-3xl font-bold text-green-600">{tokens.filter(t => t.is_active && !isTokenExpired(t.expiry_date)).length}</p></div>
              <Check className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-500 text-sm">Expired</p><p className="text-3xl font-bold text-red-600">{tokens.filter(t => isTokenExpired(t.expiry_date)).length}</p></div>
              <Calendar className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-500 text-sm">Total Usage</p><p className="text-3xl font-bold text-purple-600">{tokens.reduce((sum, t) => sum + (t.usage_count || 0), 0)}</p></div>
              <UsersIcon className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tokens Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Token Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Label / Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">Loading tokens...</td></tr>
                ) : tokens.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">No tokens found. Generate your first token!</td></tr>
                ) : (
                  tokens.map((token) => {
                    const status = getTokenStatus(token);
                    return (
                      <tr key={token.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-slate-100 rounded text-sm font-mono text-blue-700">{token.token_code}</code>
                            <button onClick={() => handleCopyToken(token.token_code)} className="p-1 hover:bg-slate-200 rounded transition-colors" title="Copy token">
                              {copiedToken === token.token_code ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{token.label || "Untitled Token"}</p>
                          {token.description && <p className="text-sm text-slate-500">{token.description}</p>}
                          <p className="text-xs text-slate-400 mt-1">Created: {new Date(token.created_at || "").toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {token.features?.pdfDownload && <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs" title="PDF Download"><Download className="w-3 h-3" /></span>}
                            {token.features?.certificateDownload && <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs" title="Certificate"><Award className="w-3 h-3" /></span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-900">{token.usage_count || 0}{token.usage_limit && <span className="text-slate-500"> / {token.usage_limit}</span>}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className={`text-sm ${isTokenExpired(token.expiry_date) ? "text-red-600 font-semibold" : "text-slate-900"}`}>
                            {new Date(token.expiry_date).toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 ${status.color} text-white rounded-full text-xs font-semibold`}>{status.text}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {token.is_active && (
                              <button onClick={() => setDeactivateConfirm({ id: token.id || '', code: token.token_code, label: token.label || 'Untitled Token' })} className="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Deactivate">
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => setDeleteConfirm({ id: token.id || '', code: token.token_code, label: token.label || 'Untitled Token' })} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Token Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Generate New Token</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Label (Optional)</label>
                  <input type="text" value={newToken.label} onChange={(e) => setNewToken({ ...newToken, label: e.target.value })} placeholder="e.g., Workshop Batch March 2025" className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description (Optional)</label>
                  <textarea value={newToken.description} onChange={(e) => setNewToken({ ...newToken, description: e.target.value })} placeholder="Add notes about this token..." rows={3} className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Token Validity *</label>
                  <div className="flex gap-2 mb-4">
                    <button type="button" onClick={() => setNewToken({ ...newToken, durationType: "hours", duration: 24 })} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${newToken.durationType === "hours" ? "bg-blue-700 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Hours</button>
                    <button type="button" onClick={() => setNewToken({ ...newToken, durationType: "days", duration: 7 })} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${newToken.durationType === "days" ? "bg-blue-700 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Days</button>
                  </div>
                  {newToken.durationType === "hours" ? (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[2, 4, 6, 8, 12, 24, 48, 72].map((hours) => (
                        <button key={hours} type="button" onClick={() => setNewToken({ ...newToken, duration: hours })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${newToken.duration === hours ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-blue-100"}`}>{hours}h</button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[1, 3, 7, 14, 30, 60, 90, 180].map((days) => (
                        <button key={days} type="button" onClick={() => setNewToken({ ...newToken, duration: days })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${newToken.duration === days ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-blue-100"}`}>{days}d</button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input type="number" value={newToken.duration} onChange={(e) => setNewToken({ ...newToken, duration: parseInt(e.target.value) || 1 })} min="1" className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none" />
                    <span className="text-slate-600 font-medium">{newToken.durationType === "hours" ? "Hours" : "Days"}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Token will expire: {new Date(Date.now() + newToken.duration * (newToken.durationType === "hours" ? 3600000 : 86400000)).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Usage Limit (Optional)</label>
                  <input type="number" value={newToken.usageLimit} onChange={(e) => setNewToken({ ...newToken, usageLimit: e.target.value })} placeholder="Leave empty for unlimited" min="1" className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Enabled Features</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input type="checkbox" checked={newToken.pdfDownload} onChange={(e) => setNewToken({ ...newToken, pdfDownload: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" />
                      <div className="flex items-center gap-2 flex-1">
                        <Download className="w-5 h-5 text-blue-600" />
                        <div><p className="font-medium text-slate-900">PDF Download</p><p className="text-xs text-slate-500">Allow users to download their assessment report as PDF</p></div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input type="checkbox" checked={newToken.certificateDownload} onChange={(e) => setNewToken({ ...newToken, certificateDownload: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" />
                      <div className="flex items-center gap-2 flex-1">
                        <Award className="w-5 h-5 text-green-600" />
                        <div><p className="font-medium text-slate-900">Certificate Download</p><p className="text-xs text-slate-500">Allow users to download a completion certificate</p></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors">Cancel</button>
                <button onClick={handleCreateToken} disabled={loading || !newToken.duration || newToken.duration <= 0} className="flex-1 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50">{loading ? "Generating..." : "Generate Token"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      {deactivateConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-6"><div className="p-4 bg-orange-100 rounded-full"><XCircle className="w-12 h-12 text-orange-600" /></div></div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Deactivate Token?</h2>
            <p className="text-slate-600 text-center mb-4">Are you sure you want to deactivate this token?</p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-500 mb-1">Token Code:</p>
              <code className="text-sm font-mono text-blue-700 font-semibold">{deactivateConfirm.code}</code>
              {deactivateConfirm.label && (<><p className="text-sm text-slate-500 mt-2 mb-1">Label:</p><p className="text-sm font-medium text-slate-900">{deactivateConfirm.label}</p></>)}
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-orange-700">This token will no longer work for assessments.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeactivateConfirm(null)} className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors">Cancel</button>
              <button onClick={confirmDeactivate} className="flex-1 px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors">Deactivate</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Token Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-6"><div className="p-4 bg-red-100 rounded-full"><Trash2 className="w-12 h-12 text-red-600" /></div></div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Delete Token?</h2>
            <p className="text-slate-600 text-center mb-4">Are you sure you want to permanently delete this token?</p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-500 mb-1">Token Code:</p>
              <code className="text-sm font-mono text-blue-700 font-semibold">{deleteConfirm.code}</code>
              {deleteConfirm.label && (<><p className="text-sm text-slate-500 mt-2 mb-1">Label:</p><p className="text-sm font-medium text-slate-900">{deleteConfirm.label}</p></>)}
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-700 font-semibold">This action cannot be undone!</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
