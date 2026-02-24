"use client";

import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/assessment/store";
import { classOrDegreeOptions, ageGroupOptions, indianStates } from "@/lib/assessment/config";

export default function StudentInfoForm() {
  const { setScreen, setStudentInfo } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    school: "",
    classOrDegree: "",
    ageGroup: "",
    city: "",
    state: "",
    howHeard: "",
    interestedInCounseling: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { setError("Student name is required"); return; }
    if (!formData.email.trim()) { setError("Email is required"); return; }
    if (!formData.whatsapp.trim()) { setError("WhatsApp number is required"); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setError("Please enter a valid email address"); return; }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.whatsapp.replace(/\D/g, ''))) { setError("Please enter a valid 10-digit WhatsApp number"); return; }

    setStudentInfo(formData);
    setScreen("instructions");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none transition-colors";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-700 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2">
            Student Information
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Please provide your details to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>Name of the Student <span className="text-red-500">*</span></label>
              <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} placeholder="Enter your full name" required />
            </div>

            <div>
              <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
              <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} placeholder="your.email@example.com" required />
            </div>

            <div>
              <label className={labelClass}>WhatsApp Number <span className="text-red-500">*</span></label>
              <input type="tel" value={formData.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} className={inputClass} placeholder="10-digit mobile number" maxLength={10} required />
              <p className="text-xs text-slate-500 mt-1">We&apos;ll send your assessment report to this number</p>
            </div>

            <div>
              <label className={labelClass}>School/College</label>
              <input type="text" value={formData.school} onChange={(e) => handleChange("school", e.target.value)} className={inputClass} placeholder="Enter your school/college name" />
            </div>

            <div>
              <label className={labelClass}>Class/Degree</label>
              <select value={formData.classOrDegree} onChange={(e) => handleChange("classOrDegree", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="">Select class/degree</option>
                {classOrDegreeOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Age Group (years)</label>
              <select value={formData.ageGroup} onChange={(e) => handleChange("ageGroup", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="">Select age group</option>
                {ageGroupOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
              </select>
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input type="text" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className={inputClass} placeholder="e.g., Ranchi" />
            </div>

            <div>
              <label className={labelClass}>State</label>
              <select value={formData.state} onChange={(e) => handleChange("state", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="">Select state</option>
                {indianStates.map((state) => (<option key={state} value={state}>{state}</option>))}
              </select>
            </div>

            <div>
              <label className={labelClass}>How did you hear about us?</label>
              <select value={formData.howHeard} onChange={(e) => handleChange("howHeard", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="">Select an option</option>
                <option value="Social Media">Social Media (Facebook/Instagram/LinkedIn)</option>
                <option value="Friend Referral">Friend or Family Referral</option>
                <option value="School">School/College</option>
                <option value="Google Search">Google Search</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <input type="checkbox" id="interestedInCounseling" checked={formData.interestedInCounseling} onChange={(e) => handleChange("interestedInCounseling", e.target.checked)} className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label htmlFor="interestedInCounseling" className="text-sm text-slate-700 cursor-pointer">
                <span className="font-semibold">I&apos;m interested in personalized counseling</span><br />
                <span className="text-xs text-slate-600">Get expert guidance to improve your emotional intelligence</span>
              </label>
            </div>

            <div className="text-xs text-slate-500 text-center">
              By continuing, you agree to receive your assessment results and occasional updates from North Star Academy. 
              We respect your privacy and won&apos;t share your data with third parties.
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-700 rounded-lg shadow-xl hover:bg-blue-800 transition-all duration-300"
            >
              Continue to Instructions
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-sm text-slate-500 mt-4">
              <span className="text-red-500">*</span> Required field
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
