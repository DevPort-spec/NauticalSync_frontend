"use client";

import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Briefcase, 
  Anchor,
  Linkedin,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'seafarer' | 'agent'>('seafarer');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle switching modes with a slight delay for animation smoothness
  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Authenticating as ${role}... Redirecting to Dashboard.`);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] font-sans flex overflow-hidden selection:bg-[#64ffda] selection:text-[#0a192f]">
      
      {/* --- Left Side: Immersive Visuals (Hidden on mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#112240] flex-col justify-between p-12 group">
        
        {/* Parallax Background Effect */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center transition-transform duration-[10s] ease-in-out group-hover:scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f]/95 via-[#112240]/90 to-[#0a192f]/80"></div>
        
        {/* Animated Particles/Stars */}
        <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#64ffda] rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 animate-in slide-in-from-left-10 duration-1000 fade-in">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
                <Compass className="text-[#64ffda] w-10 h-10 animate-spin-slow" />
                <div className="absolute inset-0 bg-[#64ffda] blur-lg opacity-40 rounded-full"></div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Nautical<span className="text-[#64ffda]">Sync</span>
            </span>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-white drop-shadow-lg transition-all duration-500 min-h-[120px]">
              {role === 'seafarer' ? (
                <span className="animate-in fade-in slide-in-from-bottom-4 duration-500 block">
                  Navigate your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-teal-200">Career</span>
                </span>
              ) : (
                <span className="animate-in fade-in slide-in-from-bottom-4 duration-500 block">
                  Find the Perfect <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-teal-200">Crew</span>
                </span>
              )}
            </h2>
            
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              {role === 'seafarer' 
                ? "Join 1000+ seafarers verifying documents and finding jobs instantly."
                : "Access a verified pool of talent. Streamline compliance and hiring in one platform."}
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-4">
                {[
                    role === 'seafarer' ? 'One-click Verification' : 'Instant Compliance Checks',
                    role === 'seafarer' ? 'Global Job Matches' : 'Automated Crew Selection',
                    'Secure & Encrypted Data'
                ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-[#64ffda]/10 flex items-center justify-center text-[#64ffda]">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        {feature}
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Dynamic Holographic Visual */}
        <div className="relative z-10 flex justify-center items-center flex-1 mt-12">
          <div className="relative w-80 h-80 group-hover:scale-105 transition-transform duration-700">
            {/* Spinning Rings */}
            <div className="absolute inset-0 border border-[#64ffda]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-dashed border-[#64ffda]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-12 border border-[#64ffda]/10 rounded-full animate-pulse"></div>
            
            {/* Center Glowing Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 bg-[#0a192f]/80 backdrop-blur-xl rounded-full border border-[#64ffda]/30 flex items-center justify-center shadow-[0_0_50px_rgba(100,255,218,0.15)] z-20">
                    {role === 'seafarer' ? (
                        <Anchor size={64} className="text-[#64ffda] drop-shadow-[0_0_15px_rgba(100,255,218,0.5)] transition-all duration-500 scale-100 rotate-0" />
                    ) : (
                        <Briefcase size={64} className="text-[#64ffda] drop-shadow-[0_0_15px_rgba(100,255,218,0.5)] transition-all duration-500 scale-100 rotate-0" />
                    )}
                </div>
            </div>

            {/* Floating Cards Effect */}
            <div className="absolute top-10 right-0 bg-[#112240]/90 backdrop-blur border border-[#64ffda]/20 p-3 rounded-lg shadow-xl animate-float z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#64ffda]/20 flex items-center justify-center">
                        <User size={16} className="text-[#64ffda]" />
                    </div>
                    <div>
                        <div className="h-2 w-16 bg-gray-600 rounded mb-1"></div>
                        <div className="h-1.5 w-10 bg-[#64ffda] rounded"></div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-10 left-0 bg-[#112240]/90 backdrop-blur border border-[#64ffda]/20 p-3 rounded-lg shadow-xl animate-float delay-1000 z-30">
                 <div className="flex items-center gap-2 text-xs text-[#64ffda] font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#64ffda] animate-pulse"></span>
                    Verified
                 </div>
            </div>

          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-500 font-mono tracking-widest">
          SYSTEM STATUS: ONLINE // v2.4.0
        </div>
      </div>

      {/* --- Right Side: Interactive Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-[#0a192f]">
        
        {/* Subtle Background Grid/Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#64ffda]/5 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          
          {/* Header Area */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {isLogin ? "Welcome Back" : "Start Your Journey"}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin 
                ? "Enter your credentials to access the bridge." 
                : "Create your profile to join the maritime network."}
            </p>
          </div>

          {/* Liquid Role Toggle Switch */}
          <div className={`transition-all duration-500 ease-out overflow-hidden ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-[#112240] p-1.5 rounded-xl flex relative border border-[#233554]">
              {/* Sliding Background Pill */}
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#0a192f] rounded-lg shadow-sm border border-[#64ffda]/20 transition-all duration-300 ease-in-out z-0`}
                style={{ left: role === 'seafarer' ? '6px' : 'calc(50%)' }}
              />
              
              <button 
                type="button"
                onClick={() => setRole('seafarer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                  role === 'seafarer' ? 'text-[#64ffda]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Anchor size={16} className={role === 'seafarer' ? "animate-bounce-subtle" : ""} /> 
                Seafarer
              </button>
              <button 
                type="button"
                onClick={() => setRole('agent')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                  role === 'agent' ? 'text-[#64ffda]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Briefcase size={16} className={role === 'agent' ? "animate-bounce-subtle" : ""} /> 
                Agent
              </button>
            </div>
          </div>

          {/* Form with Staggered Entry Animation */}
          <form 
            onSubmit={handleSubmit} 
            className={`space-y-5 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
          >
            {/* Full Name Input (Only Signup) */}
            <div className={`space-y-2 transition-all duration-300 origin-top ${!isLogin ? 'h-auto opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-4 overflow-hidden'}`}>
                <label className="text-xs font-semibold text-gray-400 ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#64ffda] transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Captain John Smith"
                    className="w-full bg-[#112240]/50 border border-[#233554] rounded-lg py-3.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda] focus:bg-[#112240] transition-all duration-300 shadow-sm"
                  />
                </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#64ffda] transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-[#112240]/50 border border-[#233554] rounded-lg py-3.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda] focus:bg-[#112240] transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs text-[#64ffda] hover:underline transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#64ffda] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[#112240]/50 border border-[#233554] rounded-lg py-3.5 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda] focus:bg-[#112240] transition-all duration-300 shadow-sm"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#64ffda] text-[#0a192f] font-bold py-3.5 rounded-lg hover:bg-[#58e6c5] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(100,255,218,0.1)] hover:shadow-[0_0_25px_rgba(100,255,218,0.3)] hover:-translate-y-1 active:translate-y-0"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#233554]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="px-4 bg-[#0a192f] text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-[#233554] rounded-lg hover:bg-[#112240] hover:border-[#64ffda]/30 transition-all duration-300 text-white group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-[#233554] rounded-lg hover:bg-[#112240] hover:border-[#64ffda]/30 transition-all duration-300 text-white group">
              <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" fill="currentColor" />
              <span className="text-sm font-medium">LinkedIn</span>
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <div className="text-center text-sm">
            <span className="text-gray-400">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
            <button 
              onClick={toggleMode}
              className="text-[#64ffda] font-bold hover:underline hover:text-[#58e6c5] transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}