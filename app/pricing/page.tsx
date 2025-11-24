"use client";

import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Compass, 
  ArrowRight, 
  Ship, 
  Anchor, 
  Briefcase 
} from 'lucide-react';
// Removed next/link to fix build error

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: "Seafarer",
      role: "For Professionals",
      price: 0,
      period: "forever",
      description: "Build your digital profile, verify documents, and apply to global jobs.",
      features: [
        " unlimited Job Applications",
        "Digital Document Wallet",
        "Basic AI Verification",
        "Profile PDF Export",
        "Job Alerts"
      ],
      notIncluded: [
        "Priority Support",
        "See Who Viewed Profile",
        "Verified Badge"
      ],
      cta: "Join for Free",
      highlight: false,
      icon: Anchor,
      delay: "delay-0" // No delay
    },
    {
      name: "Recruiter",
      role: "For Crewing Agents",
      price: isAnnual ? 299 : 349,
      period: "/ month",
      description: "Post jobs, search the talent pool, and manage applications efficiently.",
      features: [
        "10 Active Job Postings",
        "Unlimited Candidate Search",
        "AI Match Scoring",
        "Document Verification API",
        "Interview Scheduler",
        "Email & SMS Notifications"
      ],
      notIncluded: [
        "API Access",
        "Custom Branding"
      ],
      cta: "Start 14-Day Trial",
      highlight: false, // Removed Most Popular highlight
      icon: Briefcase,
      delay: "delay-150" // Medium delay
    },
    {
      name: "Enterprise",
      role: "For Shipping Lines",
      price: "Custom",
      period: "",
      description: "Full fleet management, API integration, and dedicated compliance support.",
      features: [
        "Unlimited Job Postings",
        "Full Fleet Compliance Dashboard",
        "Crewing ERP Integration (API)",
        "Dedicated Account Manager",
        "Custom Onboarding",
        "SLA Support"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      highlight: false,
      icon: Ship,
      delay: "delay-300" // Long delay
    }
  ];

  const faqs = [
    { q: "Is the platform really free for Seafarers?", a: "Yes! Seafarers will never be charged to create a profile, upload documents, or apply for jobs. We believe career opportunities should be accessible to all." },
    { q: "How does the AI Verification work?", a: "Our system scans uploaded documents (STCW, CDC, Medicals) using OCR technology to validate expiry dates and cross-reference them with issuing authority formats. Verified documents get a green checkmark." },
    { q: "Can I switch plans later?", a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard settings." },
    { q: "Do you offer discounts for annual billing?", a: "Yes, our annual plans come with a ~20% discount compared to monthly billing, as shown in the toggle above." }
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] font-sans selection:bg-[#64ffda] selection:text-[#0a192f] overflow-hidden">
      {/* Custom CSS for float animation since we can't edit tailwind.config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(-50%); }
          50% { transform: translateY(-20px) translateX(-50%); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
      `}} />

      {/* Navbar (Simplified) */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center relative z-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <Compass className="text-[#64ffda] w-8 h-8 transition-transform duration-700 group-hover:rotate-180" />
            <span className="font-bold text-xl tracking-tight text-white">Nautical<span className="text-[#64ffda]">Sync</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
             <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
             <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
             <a href="/auth" className="px-5 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-all font-medium">Login</a>
        </div>
      </nav>

      {/* Header */}
      <div className="relative pt-12 pb-20 px-6 lg:px-8 text-center z-10">
         {/* Animated Background Blob */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#64ffda]/10 blur-[120px] -z-10 rounded-full animate-float-slow pointer-events-none"></div>
         
         <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">Simple, Transparent Pricing</h1>
         <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Choose the plan that fits your fleet size. Whether you're an individual seafarer or a global shipping line, we have you covered.
         </p>

         {/* Toggle */}
         <div className="flex items-center justify-center gap-4 mb-16 animate-in fade-in zoom-in-95 duration-700 delay-300">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 bg-[#112240] border border-[#233554] rounded-full relative p-1 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#64ffda]/50"
            >
                <div className={`w-5 h-5 bg-[#64ffda] rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Yearly <span className="text-[#64ffda] text-xs ml-1 animate-pulse">(Save 20%)</span>
            </span>
         </div>

         {/* Pricing Cards - Added staggered entry animation */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
                <div 
                    key={idx} 
                    className={`relative bg-[#112240]/40 backdrop-blur-sm border rounded-2xl p-8 flex flex-col text-left transition-all duration-300 hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-8 duration-700 ${plan.delay} ${
                        plan.highlight 
                        ? 'border-[#64ffda] shadow-[0_0_30px_rgba(100,255,218,0.15)] z-10 md:scale-105' 
                        : 'border-[#233554] hover:border-[#64ffda]/50 hover:shadow-[0_0_20px_rgba(100,255,218,0.05)]'
                    }`}
                >
                    {plan.highlight && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#64ffda] text-[#0a192f] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-[0_0_10px_#64ffda] animate-pulse">
                            Most Popular
                        </div>
                    )}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                             <div className={`p-2 rounded-lg ${plan.highlight ? 'bg-[#64ffda]/20 text-[#64ffda]' : 'bg-[#0a192f] text-gray-400 group-hover:text-[#64ffda]'} transition-colors animate-pulse-slow`}>
                                <plan.icon size={24} />
                             </div>
                             <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        </div>
                        <p className="text-sm text-[#64ffda] font-medium mb-4">{plan.role}</p>
                        <div className="flex items-baseline gap-1">
                            {typeof plan.price === 'number' ? (
                                <>
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </>
                            ) : (
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-400 mt-4 leading-relaxed min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="flex-1 space-y-4 mb-8">
                        {plan.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-gray-300 group/item">
                                <Check size={16} className="text-[#64ffda] shrink-0 mt-0.5 transition-transform group-hover/item:scale-125" />
                                <span>{feat}</span>
                            </div>
                        ))}
                        {plan.notIncluded.map((feat, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-gray-600 opacity-70">
                                <X size={16} className="shrink-0 mt-0.5" />
                                <span>{feat}</span>
                            </div>
                        ))}
                    </div>

                    <button className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group/btn ${
                        plan.highlight 
                        ? 'bg-[#64ffda] text-[#0a192f] hover:bg-[#58e6c5] shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:shadow-[0_0_20px_rgba(100,255,218,0.5)]' 
                        : 'bg-[#0a192f] text-white border border-[#233554] hover:border-[#64ffda] hover:shadow-[0_0_10px_rgba(100,255,218,0.1)]'
                    }`}>
                        {plan.cta} <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            ))}
         </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 bg-[#0a192f] border-t border-[#233554] relative z-10">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                      <div 
                        key={idx} 
                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'border-[#64ffda] bg-[#112240]/40 shadow-[0_0_15px_rgba(100,255,218,0.1)]' : 'border-[#233554] bg-[#112240]/20 hover:border-[#64ffda]/50'}`}
                      >
                          <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                          >
                              <span className={`font-medium text-lg transition-colors ${openFaq === idx ? 'text-[#64ffda]' : 'text-white'}`}>{faq.q}</span>
                              <div className={`transition-transform duration-300 text-[#64ffda] ${openFaq === idx ? 'rotate-180' : 'rotate-90'}`}>
                                  <ArrowRight size={20} />
                              </div>
                          </button>
                          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-[#233554]/50">
                                  {faq.a}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 px-6 text-center relative overflow-hidden z-10">
           <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-[#0a192f] to-[#0a192f] -z-10"></div>
           {/* Subtle animated background elements for CTA */}
           <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#64ffda]/5 rounded-full blur-[100px] -translate-y-1/2 animate-pulse-slow pointer-events-none"></div>
           <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] animate-pulse-slow delay-700 pointer-events-none"></div>

           <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to modernize your crew?</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">Join thousands of maritime professionals and companies already using NauticalSync.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/auth" className="px-8 py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:shadow-[0_0_30px_rgba(100,255,218,0.5)] hover:-translate-y-1">
                        Get Started Now
                    </a>
                    <a href="/contact" className="px-8 py-4 border border-[#233554] text-white font-bold rounded-lg hover:border-[#64ffda] hover:bg-[#64ffda]/5 transition-all hover:-translate-y-1">
                        Contact Sales
                    </a>
                </div>
           </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#233554] bg-[#020c1b] pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0 group cursor-pointer">
              <Compass className="text-[#64ffda] w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
              <span className="font-bold text-lg text-white">
                Nautical<span className="text-[#64ffda]">Sync</span>
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; 2024 NauticalSync Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}