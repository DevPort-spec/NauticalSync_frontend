"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Anchor, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileCheck, 
  Crosshair, 
  Send, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  Search
} from 'lucide-react';

export default function Home() {
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for navbar scroll effect
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for animations
  const statsRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Add elements to revealRefs array
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Navigation helper to bypass router issues
  const navigateToAuth = () => {
    window.location.href = '/auth';
  };

  // --- 1. Handle Scroll Effects (Navbar & Reveal) ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) {
        // Initialize state
        el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-8');
        observer.observe(el);
      }
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // --- 2. Handle Counter Animation ---
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('.counter');
    let started = false;

    const startCounters = () => {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);

        let current = 0;
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target + suffix;
          }
        };
        updateCounter();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounters();
            started = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#0a192f] text-[#e6f1ff] overflow-x-hidden selection:bg-[#64ffda] selection:text-[#0a192f]">
      
      {/* --- Navbar --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#0a192f]/95 shadow-lg border-[#233554]' 
            : 'bg-[#0a192f]/90 backdrop-blur-md border-[#233554]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <Compass className="text-[#64ffda] w-8 h-8 relative z-10 transition-transform duration-700 group-hover:rotate-180" />
                <div className="absolute inset-0 bg-[#64ffda] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Nautical<span className="text-[#64ffda]">Sync</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-[#64ffda] transition-colors text-sm font-medium hover:-translate-y-[1px] transform duration-200">For Seafarers</a>
              <a href="#solutions" className="text-gray-300 hover:text-[#64ffda] transition-colors text-sm font-medium hover:-translate-y-[1px] transform duration-200">For Employers</a>
              <a href="#contact" className="text-gray-300 hover:text-[#64ffda] transition-colors text-sm font-medium hover:-translate-y-[1px] transform duration-200">Contact</a>
              
              <div className="flex items-center space-x-4 ml-4">
                <button 
                  onClick={navigateToAuth}
                  className="text-white hover:text-[#64ffda] font-medium text-sm transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={navigateToAuth}
                  className="px-5 py-2.5 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-all text-sm font-medium shadow-[0_0_10px_rgba(100,255,218,0.1)] hover:shadow-[0_0_15px_rgba(100,255,218,0.2)]"
                >
                  Join Now
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#112240] border-b border-[#233554] absolute w-full shadow-2xl animate-in slide-in-from-top-5">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#233554]">For Seafarers</a>
              <a href="#solutions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#233554]">For Employers</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#233554]">Contact</a>
              <div className="mt-4 pt-4 border-t border-[#233554] flex flex-col gap-3">
                <button 
                  onClick={navigateToAuth} 
                  className="block text-center text-gray-300 hover:text-white font-medium w-full"
                >
                  Sign In
                </button>
                <button 
                  onClick={navigateToAuth}
                  className="block text-center px-4 py-3 bg-[#64ffda] text-[#0a192f] rounded font-bold hover:bg-[#58e6c5] transition-colors w-full"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.9)), url('https://images.unsplash.com/photo-1505051508004-cb7497e2bfcd?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/50 via-[#0a192f]/70 to-[#0a192f] z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={addToRefs} className="text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112240]/80 border border-[#64ffda]/30 text-[#64ffda] text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#64ffda] shadow-[0_0_10px_#64ffda]"></span>
              New: Automated Document Verification
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-lg">
              The Trusted Job Marketplace for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-[#58e6c5] to-[#64ffda]">
                Modern Seafarers
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed shadow-black drop-shadow-md">
              Stop searching, start sailing. Verify your certificates once and instantly match with global shipping lines looking for your exact rank and experience.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                onClick={navigateToAuth}
                className="w-full sm:w-auto px-8 py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded hover:bg-[#58e6c5] transition-all hover:scale-105 shadow-[0_0_20px_rgba(100,255,218,0.4)] flex items-center justify-center gap-2 group"
              >
                Find a Job
                <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={navigateToAuth}
                className="w-full sm:w-auto px-8 py-4 border border-gray-500 text-gray-300 font-medium rounded hover:border-[#64ffda] hover:text-[#64ffda] transition-colors bg-[#0a192f]/60 backdrop-blur-sm hover:bg-[#112240] flex justify-center items-center"
              >
                For Crewing Agents
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-20 pt-8 border-t border-[#233554]/50 grid grid-cols-2 md:grid-cols-4 gap-8 backdrop-blur-sm rounded-lg">
              <div className="group">
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors counter" data-target="100" data-suffix="+">0</div>
                <div className="text-sm text-gray-400">Open Vacancies</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors counter" data-target="11" data-suffix="">0</div>
                <div className="text-sm text-gray-400">Hiring Partners</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors counter" data-target="50" data-suffix="+">0</div>
                <div className="text-sm text-gray-400">Verified Profiles</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors counter" data-target="100" data-suffix="%">0</div>
                <div className="text-sm text-gray-400">Compliance Check</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Wave Separator 1 --- */}
      <div className="w-full overflow-hidden leading-[0] transform rotate-180 bg-[#0a192f] relative -mt-1 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-[#0a192f]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="opacity-50"></path>
        </svg>
      </div>

      {/* --- Feature Grid --- */}
      <section id="features" className="py-24 bg-[#0a192f] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Hired Faster</h2>
            <div className="w-20 h-1 bg-[#64ffda] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We bridge the gap between qualified seafarers and the companies that need them, ensuring every document is valid before you apply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div ref={addToRefs} className="bg-[#112240]/70 backdrop-blur-md border border-[#64ffda]/10 p-8 rounded-xl relative group overflow-hidden hover:-translate-y-2 hover:border-[#64ffda]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                <FileCheck size={100} className="text-[#64ffda]" />
              </div>
              <div className="w-14 h-14 bg-[#112240] rounded-lg flex items-center justify-center border border-[#233554] mb-6 group-hover:border-[#64ffda] transition-colors shadow-lg">
                <ShieldCheck className="text-[#64ffda] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Verification</h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your STCW certificates, medicals, and CDC once. Our AI verifies their authenticity against maritime databases, giving you a &quot;Verified&quot; badge that employers trust.
              </p>
            </div>

            {/* Feature 2 */}
            <div ref={addToRefs} className="bg-[#112240]/70 backdrop-blur-md border border-[#64ffda]/10 p-8 rounded-xl relative group overflow-hidden hover:-translate-y-2 hover:border-[#64ffda]/30 transition-all duration-300 delay-100">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                <Globe size={100} className="text-[#64ffda]" />
              </div>
              <div className="w-14 h-14 bg-[#112240] rounded-lg flex items-center justify-center border border-[#233554] mb-6 group-hover:border-[#64ffda] transition-colors shadow-lg">
                <Crosshair className="text-[#64ffda] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Job Matching</h3>
              <p className="text-gray-400 leading-relaxed">
                Our algorithm matches your specific rank, vessel experience (Tanker, Bulker, Container), and visa status to open positions.
              </p>
            </div>

            {/* Feature 3 */}
            <div ref={addToRefs} className="bg-[#112240]/70 backdrop-blur-md border border-[#64ffda]/10 p-8 rounded-xl relative group overflow-hidden hover:-translate-y-2 hover:border-[#64ffda]/30 transition-all duration-300 delay-200">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                <Send size={100} className="text-[#64ffda]" />
              </div>
              <div className="w-14 h-14 bg-[#112240] rounded-lg flex items-center justify-center border border-[#233554] mb-6 group-hover:border-[#64ffda] transition-colors shadow-lg">
                <Zap className="text-[#64ffda] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Applications</h3>
              <p className="text-gray-400 leading-relaxed">
                Apply to multiple crewing agencies with a single, verified profile. No more repetitive data entry or lost emails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Wave Separator 2 --- */}
      <div className="w-full overflow-hidden leading-[0] bg-[#112240] relative z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-[#0a192f]">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="opacity-100"></path>
        </svg>
      </div>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-[#112240] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#64ffda]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div ref={addToRefs}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bridge to Shore <br />
                <span className="text-[#64ffda]">Communication</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Are you a crewing manager looking for verified talent? Or a seafarer needing help with your profile? Contact us.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#233554]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0a192f]/50 flex items-center justify-center text-[#64ffda] flex-shrink-0 border border-[#64ffda]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Headquarters</h4>
                    <p className="text-gray-400 text-sm">Port of Rotterdam, Building 42<br />3011 WN, Netherlands</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#233554]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0a192f]/50 flex items-center justify-center text-[#64ffda] flex-shrink-0 border border-[#64ffda]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-400 text-sm">support@nauticalsync.com<br />jobs@nauticalsync.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#233554]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0a192f]/50 flex items-center justify-center text-[#64ffda] flex-shrink-0 border border-[#64ffda]/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Support Line</h4>
                    <p className="text-gray-400 text-sm">+31 10 123 4567<br />Mon-Fri 09:00 - 18:00 UTC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={addToRefs} className="bg-[#112240]/40 backdrop-blur-md border border-[#64ffda]/5 p-8 rounded-2xl shadow-2xl delay-200">
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent to the bridge!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg bg-[#020c1b]/50 border border-[#233554] text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none focus:ring-1 focus:ring-[#64ffda] transition-all" 
                      placeholder="Captain Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg bg-[#020c1b]/50 border border-[#233554] text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none focus:ring-1 focus:ring-[#64ffda] transition-all" 
                      placeholder="captain@vessel.com" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">I am a...</label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg bg-[#020c1b]/50 border border-[#233554] text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none focus:ring-1 focus:ring-[#64ffda] transition-all cursor-pointer"
                  >
                    <option>Seafarer looking for work</option>
                    <option>Crewing Manager hiring</option>
                    <option>Maritime Academy</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2 mb-8">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg bg-[#020c1b]/50 border border-[#233554] text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none focus:ring-1 focus:ring-[#64ffda] transition-all resize-none" 
                    placeholder="Describe your inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-all shadow-lg shadow-[#64ffda]/20 hover:shadow-[#64ffda]/40 transform hover:-translate-y-1"
                >
                  Send Transmission
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-[#233554] bg-[#020c1b] pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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