'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Download, Search, CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { parseCSV } from '@/lib/assessment/csvParser';
import { calculateBulkScores, StudentWithScores } from '@/lib/assessment/bulkScoreCalculator';
import { generateBulkReports } from '@/lib/assessment/bulkReportGenerator';

export default function BulkUploadPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentWithScores[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError('');
    try {
      const content = await file.text();
      const result = parseCSV(content);
      if (!result.success || !result.data) {
        setError(result.error || 'Failed to parse CSV file');
        setIsUploading(false);
        return;
      }
      const studentsWithScores = calculateBulkScores(result.data);
      setStudents(studentsWithScores);
      setSelectedStudents(new Set());
    } catch (err) {
      setError(`Error reading file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const schools = useMemo(() => Array.from(new Set(students.map(s => s.school))).sort(), [students]);

  const dates = useMemo(() => {
    const uniqueDates = Array.from(new Set(students.map(s => {
      try { return new Date(s.timestamp).toLocaleDateString('en-CA'); } catch { return ''; }
    }))).filter(d => d);
    return uniqueDates.sort().reverse();
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase()) || student.mobile.includes(searchTerm);
      const matchesSchool = !filterSchool || student.school === filterSchool;
      const matchesDate = !filterDate || (() => { try { return new Date(student.timestamp).toLocaleDateString('en-CA') === filterDate; } catch { return false; } })();
      return matchesSearch && matchesSchool && matchesDate;
    });
  }, [students, searchTerm, filterSchool, filterDate]);

  const toggleStudent = (index: number) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(index)) { newSelected.delete(index); } else { newSelected.add(index); }
    setSelectedStudents(newSelected);
  };

  const toggleAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      const allIndices = filteredStudents.map((s) => students.indexOf(s));
      setSelectedStudents(new Set(allIndices));
    }
  };

  const handleGenerateReports = async () => {
    if (selectedStudents.size === 0) { alert('Please select at least one student'); return; }
    setIsGenerating(true);
    setProgress({ current: 0, total: selectedStudents.size });
    try {
      const selectedStudentData = Array.from(selectedStudents).map(index => students[index]).filter(Boolean);
      const zipBlob = await generateBulkReports(selectedStudentData, (current, total) => setProgress({ current, total }));
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `EI_Reports_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSelectedStudents(new Set());
    } catch (err) {
      alert(`Failed to generate reports: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => router.push('/assessment/admin')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Bulk Report Upload</h1>
              </div>
              <p className="text-slate-600 ml-14">Upload CSV file to generate PDF reports for multiple students</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">{isUploading ? 'Processing...' : 'Click to upload CSV file'}</p>
                <p className="text-sm text-slate-400">Google Forms export format expected</p>
                <input type="file" accept=".csv" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
              </div>
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {students.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700">Successfully loaded {students.length} student{students.length !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>

        {/* Filters and Actions */}
        {students.length > 0 && (
          <>
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="Search by name, email, or mobile" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <select value={filterSchool} onChange={(e) => setFilterSchool(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Schools</option>
                  {schools.map(school => <option key={school} value={school}>{school}</option>)}
                </select>
                <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Dates</option>
                  {dates.map(date => <option key={date} value={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</option>)}
                </select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">{selectedStudents.size} of {filteredStudents.length} selected</div>
                <div className="flex gap-3">
                  <button onClick={toggleAll} className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    {selectedStudents.size === filteredStudents.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button onClick={handleGenerateReports} disabled={selectedStudents.size === 0 || isGenerating}
                    className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    {isGenerating ? (<><Loader2 className="w-5 h-5 animate-spin" /> Generating {progress.current}/{progress.total}</>) : (<><Download className="w-5 h-5" /> Generate Reports</>)}
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0} onChange={toggleAll} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" /></th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">School</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredStudents.map((student) => {
                      const index = students.indexOf(student);
                      const isSelected = selectedStudents.has(index);
                      return (
                        <tr key={index} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}>
                          <td className="px-4 py-3"><input type="checkbox" checked={isSelected} onChange={() => toggleStudent(index)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" /></td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{student.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{student.email}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{student.school}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{new Date(student.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-slate-900">{student.totalScore}/250</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.overallLevel === 'Excellent' ? 'bg-green-100 text-green-800' :
                              student.overallLevel === 'Commendable Performance' ? 'bg-blue-100 text-blue-800' :
                              student.overallLevel === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                              student.overallLevel === 'Satisfactory' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>{student.overallLevel}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredStudents.length === 0 && (
                <div className="text-center py-12 text-slate-500">No students found matching your filters</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
