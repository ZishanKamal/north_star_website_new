"use client";

import { motion } from "framer-motion";
import { Trophy, Download, Brain, Heart, Target, Users, MessageCircle, Home, CheckCircle, Award } from "lucide-react";
import { useAppStore } from "@/lib/assessment/store";
import { calculateScores, getRecommendations } from "@/lib/assessment/utils";
import { getLevelColor } from "@/lib/assessment/config";
import { generatePDF } from "@/lib/assessment/pdfGenerator";
import { generateCertificate } from "@/lib/assessment/certificateGenerator";
import { categoryGroups, categoryIntroText, getScoreFeedback } from "@/lib/assessment/config";
import SpiderChart from "@/components/assessment/SpiderChart";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveLeadToDatabase, LeadSubmission } from "@/lib/assessment/supabase";

export default function Results() {
  const { answers, resetTest, studentInfo, isQuickAssessment, assessmentToken } = useAppStore();
  const router = useRouter();
  const { totalScore, results, overallLevel } = calculateScores(answers, isQuickAssessment);
  const recommendations = getRecommendations(results);
  const chartRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  const [chartImage, setChartImage] = useState<string>('');
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const hasSubmittedLead = useRef(false);

  const features = assessmentToken?.features || {
    pdfDownload: isQuickAssessment,
    certificateDownload: false,
  };

  const maxScore = 250;
  const overallPercentage = (totalScore / maxScore) * 100;

  // Save lead to database on component mount
  useEffect(() => {
    if (hasSubmittedLead.current) return;

    const saveLead = async () => {
      hasSubmittedLead.current = true;

      const leadData: LeadSubmission = {
        name: studentInfo.name,
        email: studentInfo.email || '',
        whatsapp: studentInfo.whatsapp || '',
        school: studentInfo.school,
        class_or_degree: studentInfo.classOrDegree,
        age_group: studentInfo.ageGroup,
        city: studentInfo.city,
        state: studentInfo.state,
        how_heard: studentInfo.howHeard,
        interested_in_counseling: studentInfo.interestedInCounseling,
        assessment_type: isQuickAssessment ? 'quick' : 'full',
        total_score: totalScore,
        max_score: maxScore,
        overall_percentage: overallPercentage,
        overall_level: overallLevel,
        self_awareness_score: results.find(r => r.category === 'Self-Awareness')?.score || 0,
        managing_emotions_score: results.find(r => r.category === 'Managing Emotions')?.score || 0,
        motivating_oneself_score: results.find(r => r.category === 'Motivating Oneself')?.score || 0,
        empathy_score: results.find(r => r.category === 'Empathy')?.score || 0,
        social_skill_score: results.find(r => r.category === 'Social Skill')?.score || 0,
        device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        status: 'new',
      };

      const result = await saveLeadToDatabase(leadData);
      if (result.success) {
        console.log('Lead saved to database');
      } else {
        console.error('Failed to save lead:', result.error);
        hasSubmittedLead.current = false;
      }
    };

    saveLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Capture chart as image when component mounts
  // Uses a fixed-size off-screen container so the chart renders identically on mobile and desktop
  useEffect(() => {
    const captureChart = async () => {
      if (chartRef.current) {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));

          const svgElement = chartRef.current.querySelector('svg');
          if (!svgElement) return;

          // Clone the SVG and set fixed dimensions to avoid viewport-dependent sizing
          const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
          const fixedWidth = 800;
          const fixedHeight = 400;
          clonedSvg.setAttribute('width', String(fixedWidth));
          clonedSvg.setAttribute('height', String(fixedHeight));
          if (!clonedSvg.getAttribute('viewBox')) {
            const origWidth = svgElement.getAttribute('width') || svgElement.getBoundingClientRect().width;
            const origHeight = svgElement.getAttribute('height') || svgElement.getBoundingClientRect().height;
            clonedSvg.setAttribute('viewBox', `0 0 ${origWidth} ${origHeight}`);
          }

          const svgData = new XMLSerializer().serializeToString(clonedSvg);

          const scale = 3;
          const canvas = document.createElement('canvas');
          canvas.width = fixedWidth * scale;
          canvas.height = fixedHeight * scale;
          const ctx = canvas.getContext('2d');

          if (!ctx) return;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);

          const img = new Image();

          const loadPromise = new Promise<void>((resolve, reject) => {
            img.onload = () => {
              try {
                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);
                URL.revokeObjectURL(url);
                const imageData = canvas.toDataURL('image/png');
                setChartImage(imageData);
                resolve();
              } catch (err) {
                reject(err);
              }
            };
            img.onerror = (error) => {
              URL.revokeObjectURL(url);
              reject(error);
            };
          });

          const timeoutPromise = new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error('Chart capture timeout')), 5000)
          );

          img.src = url;
          await Promise.race([loadPromise, timeoutPromise]);
        } catch (error) {
          console.error('Failed to capture chart:', error);
        }
      }
    };

    captureChart();
  }, []);

  const iconMap: Record<string, any> = {
    Brain,
    Heart,
    Target,
    Users,
    MessageCircle,
  };

  const categoryIdMap: Record<string, string> = {
    "Self-Awareness": "selfAwareness",
    "Managing Emotions": "managingEmotions",
    "Motivating Oneself": "motivatingOneself",
    "Empathy": "empathy",
    "Social Skill": "socialSkill",
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const testDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const pdfPromise = generatePDF({
        testDate,
        totalScore,
        maxScore: 250,
        overallLevel,
        results,
        recommendations,
        studentInfo,
        chartImageData: chartImage,
        isQuickAssessment,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('PDF generation timeout')), 30000)
      );

      await Promise.race([pdfPromise, timeoutPromise]);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadCertificate = async () => {
    setIsGeneratingCertificate(true);
    try {
      const completionDate = new Date().toISOString();

      await generateCertificate({
        studentInfo,
        totalScore,
        maxScore: 250,
        overallLevel,
        completionDate,
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Category Definitions Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-12 border border-slate-100"
        >
          <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
            This assessment evaluates 5 different areas. The first 3 are related to <span className="font-bold">intrapersonal</span> intelligence (understanding yourself) and the last 2 are related to <span className="font-bold">interpersonal</span> intelligence (understanding others).
          </p>

          {/* Understanding Yourself Section */}
          <div className="mb-8">
            <div className="bg-blue-700 text-white px-6 py-3 rounded-t-2xl">
              <h3 className="text-xl font-bold">Understanding Yourself</h3>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-b-2xl p-6 space-y-6">
              {categoryGroups["Understanding Yourself"].map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <div key={category.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {category.name}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        {category.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Understanding Others Section */}
          <div className="mb-0">
            <div className="bg-blue-700 text-white px-6 py-3 rounded-t-2xl">
              <h3 className="text-xl font-bold">Understanding Others</h3>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-b-2xl p-6 space-y-6">
              {categoryGroups["Understanding Others"].map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <div key={category.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {category.name}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        {category.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center p-3 bg-amber-500 rounded-full mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your ESA Results
          </h1>
          <p className="text-xl text-slate-600">
            Overall Emotional State Level: <span className={`font-bold ${getLevelColor(overallLevel)}`}>
              {overallLevel}
            </span>
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-700 rounded-3xl p-8 text-white mb-12 text-center"
        >
          <div className="text-6xl md:text-8xl font-bold mb-2">{totalScore}</div>
          <div className="text-2xl md:text-3xl">out of 250 points</div>
          <div className="mt-4 text-lg">{overallPercentage.toFixed(1)}% Overall Score</div>
        </motion.div>

        {/* Spider Chart */}
        <motion.div
          ref={chartRef}
          data-chart-ref="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-slate-100"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Your Emotional Profile
          </h2>
          <SpiderChart data={results} />
        </motion.div>

        {/* Category Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {results.map((result, index) => {
            const categoryId = categoryIdMap[result.category];
            const feedback = getScoreFeedback(categoryId, result.score);

            return (
              <motion.div
                key={result.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {result.category}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {result.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-blue-700">{result.score}/50</span>
                  <span className={`font-semibold ${getLevelColor(result.level)}`}>
                    {result.level}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                </div>

                {feedback && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Score Analysis:
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feedback}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Personalized Recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-8 border border-slate-100"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Personalized Recommendations
          </h2>
          <div className="space-y-6">
            {Object.entries(recommendations).map(([category, tips]) => (
              <div key={category} className="border-l-4 border-blue-700 pl-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-slate-600">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          {features.pdfDownload && (
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </>
              )}
            </button>
          )}
          {features.certificateDownload && (
            <button
              onClick={handleDownloadCertificate}
              disabled={isGeneratingCertificate}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingCertificate ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Certificate...
                </>
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  Download Certificate
                </>
              )}
            </button>
          )}
          <button
            onClick={() => setShowEndConfirmation(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Exit
          </button>
        </div>

        {/* End Test Confirmation Modal */}
        {showEndConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-emerald-600 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Assessment Complete!
                </h2>
                <p className="text-lg text-slate-600 mb-2">
                  Thank you for completing the Emotional Intelligence Assessment.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                  Your responses have been saved. You can return to the home page.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={() => setShowEndConfirmation(false)}
                    className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors"
                  >
                    Stay on Results
                  </button>
                  <button
                    onClick={() => { resetTest(); router.push("/"); }}
                    className="flex-1 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Go to Home
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
