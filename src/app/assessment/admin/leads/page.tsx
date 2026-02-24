"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllLeads, updateLeadStatus, deleteLead, bulkDeleteLeads, LeadSubmission } from "@/lib/assessment/supabase";
import { Download, RefreshCw, Eye, Phone, Mail, MapPin, Calendar, TrendingUp, Users, Target, Trash2, ArrowLeft } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/assessment/adminAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/assessment/admin");
      return;
    }
    loadLeads();
  }, [router]);

  const loadLeads = async () => {
    setLoading(true);
    const result = await getAllLeads();
    if (result.success && result.data) {
      setLeads(result.data);
    } else {
      console.error("Failed to load leads:", result.error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    const result = await updateLeadStatus(leadId, newStatus);
    if (result.success) {
      loadLeads();
    } else {
      alert("Failed to update status: " + result.error);
    }
  };

  const handleDelete = async (leadId: string, leadName: string) => {
    setDeleteConfirm({ id: leadId, name: leadName });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const result = await deleteLead(deleteConfirm.id);
    if (result.success) {
      loadLeads();
      setDeleteConfirm(null);
    } else {
      alert("Failed to delete lead: " + result.error);
    }
  };

  const handleBulkDelete = () => {
    if (selectedLeads.size === 0) {
      alert("Please select leads to delete");
      return;
    }
    setBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = async () => {
    const leadIds = Array.from(selectedLeads);
    if (leadIds.length === 0) {
      alert("No leads selected");
      return;
    }
    const result = await bulkDeleteLeads(leadIds);
    if (result.success) {
      setSelectedLeads(new Set());
      loadLeads();
      setBulkDeleteConfirm(false);
    } else {
      alert("Failed to bulk delete leads: " + result.error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "interested" && lead.interested_in_counseling) ||
      (filter === "quick" && lead.assessment_type === "quick") ||
      (filter === "full" && lead.assessment_type === "full") ||
      lead.status === filter;

    const matchesSearch =
      searchTerm === "" ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  const isAllSelected = filteredLeads.length > 0 && selectedLeads.size === filteredLeads.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLeads(new Set());
    } else {
      const allIds = new Set(filteredLeads.map(lead => lead.id).filter((id): id is string => id !== undefined));
      setSelectedLeads(allIds);
    }
  };

  const toggleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const exportToCSV = () => {
    const leadsToExport = selectedLeads.size > 0
      ? filteredLeads.filter(lead => lead.id && selectedLeads.has(lead.id))
      : filteredLeads;

    if (leadsToExport.length === 0) return;

    const headers = [
      "Date", "Name", "Email", "WhatsApp", "School", "Class/Degree", "Age Group",
      "City", "State", "How Heard", "Interested in Counseling", "Assessment Type",
      "Total Score", "Overall Level", "Self Awareness", "Managing Emotions",
      "Motivating Oneself", "Empathy", "Social Skill", "Status", "Device",
    ];

    const rows = leadsToExport.map((lead) => [
      new Date(lead.created_at || "").toLocaleDateString(),
      lead.name, lead.email, lead.whatsapp, lead.school || "", lead.class_or_degree || "",
      lead.age_group || "", lead.city || "", lead.state || "", lead.how_heard || "",
      lead.interested_in_counseling ? "Yes" : "No", lead.assessment_type, lead.total_score,
      lead.overall_level, lead.self_awareness_score, lead.managing_emotions_score,
      lead.motivating_oneself_score, lead.empathy_score, lead.social_skill_score,
      lead.status || "new", lead.device_type || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const stats = {
    total: leads.length,
    today: leads.filter((l) => new Date(l.created_at || "").toDateString() === new Date().toDateString()).length,
    interested: leads.filter((l) => l.interested_in_counseling).length,
    quick: leads.filter((l) => l.assessment_type === "quick").length,
    full: leads.filter((l) => l.assessment_type === "full").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => router.push("/assessment/admin")} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Lead Management Dashboard</h1>
              </div>
              <p className="text-slate-600 ml-14">North Star Academy - Emotional Assessment</p>
            </div>
            <div className="flex gap-3">
              <button onClick={loadLeads} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50">
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              {selectedLeads.size > 0 && (
                <button onClick={handleBulkDelete} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
                  <Trash2 className="w-5 h-5" /> Delete Selected ({selectedLeads.size})
                </button>
              )}
              <button onClick={exportToCSV} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                <Download className="w-5 h-5" /> Export CSV {selectedLeads.size > 0 && `(${selectedLeads.size})`}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-600 text-sm">Total Leads</p><p className="text-3xl font-bold text-slate-900">{stats.total}</p></div>
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-600 text-sm">Today</p><p className="text-3xl font-bold text-slate-900">{stats.today}</p></div>
              <Calendar className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-600 text-sm">Interested</p><p className="text-3xl font-bold text-slate-900">{stats.interested}</p></div>
              <Target className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-600 text-sm">Quick Tests</p><p className="text-3xl font-bold text-slate-900">{stats.quick}</p></div>
              <TrendingUp className="w-10 h-10 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-600 text-sm">Full Tests</p><p className="text-3xl font-bold text-slate-900">{stats.full}</p></div>
              <Eye className="w-10 h-10 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Search by name, email, or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none cursor-pointer">
              <option value="all">All Leads</option>
              <option value="interested">Interested in Counseling</option>
              <option value="quick">Quick Assessment</option>
              <option value="full">Full Assessment</option>
              <option value="new">Status: New</option>
              <option value="contacted">Status: Contacted</option>
              <option value="qualified">Status: Qualified</option>
              <option value="converted">Status: Converted</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer" />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Assessment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-500">Loading leads...</td></tr>
                ) : filteredLeads.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-500">No leads found</td></tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" checked={lead.id ? selectedLeads.has(lead.id) : false} onChange={() => lead.id && toggleSelectLead(lead.id)} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{new Date(lead.created_at || "").toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="flex items-center gap-1 text-slate-600"><Mail className="w-3 h-3" />{lead.email}</div>
                        <div className="flex items-center gap-1 text-slate-600"><Phone className="w-3 h-3" />{lead.whatsapp}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div>{lead.school || "N/A"}</div>
                        <div>{lead.class_or_degree || "N/A"}</div>
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.city}, {lead.state}</div>
                        {lead.how_heard && <div className="text-xs mt-1">Source: {lead.how_heard}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lead.assessment_type === "quick" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>
                          {lead.assessment_type === "quick" ? "Quick (10Q)" : "Full (50Q)"}
                        </span>
                        {lead.interested_in_counseling && (
                          <div className="mt-2"><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Interested</span></div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <div className="font-bold">{lead.total_score}/250</div>
                        <div className="text-xs text-slate-600">{lead.overall_level}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select value={lead.status || "new"} onChange={(e) => lead.id && handleStatusUpdate(lead.id, e.target.value)}
                          className="text-sm px-3 py-1 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:outline-none cursor-pointer">
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => lead.id && handleDelete(lead.id, lead.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete lead permanently">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-slate-600 text-sm mt-6">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full"><Trash2 className="w-8 h-8 text-red-600" /></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Delete Lead?</h2>
            <p className="text-slate-600 text-center mb-4">Are you sure you want to permanently delete this lead?</p>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Lead Name:</p>
              <p className="font-semibold text-slate-900">{deleteConfirm.name}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-800 text-center">This action cannot be undone!</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full"><Trash2 className="w-8 h-8 text-red-600" /></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Delete Leads?</h2>
            <p className="text-slate-600 text-center mb-4">Are you sure you want to permanently delete all selected leads?</p>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Number of leads to delete:</p>
              <p className="text-3xl font-bold text-red-600 text-center">{selectedLeads.size}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-800 text-center font-semibold">This action cannot be undone!</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setBulkDeleteConfirm(false)} className="flex-1 px-4 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
              <button onClick={confirmBulkDelete} className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Delete All ({selectedLeads.size})</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
