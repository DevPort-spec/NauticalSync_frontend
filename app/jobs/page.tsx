"use client";

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Filter, 
  Ship, 
  DollarSign, 
  ChevronRight, 
  Compass,
  Briefcase,
  Lock,
  Anchor
} from 'lucide-react';

// --- Mock Data ---
const PUBLIC_JOBS = [
  { id: 1, role: "Master / Captain", vessel: "LNG Carrier", location: "Worldwide", duration: "4 Months", salary: "$14,500", company: "Maersk Line", posted: "2d ago", urgent: true },
  { id: 2, role: "Chief Engineer", vessel: "Oil Tanker", location: "Middle East", duration: "3 Months", salary: "$13,800", company: "Euronav", posted: "5d ago", urgent: false },
  { id: 3, role: "2nd Officer", vessel: "Container Ship", location: "Asia - Europe", duration: "6 Months", salary: "$5,200", company: "CMA CGM", posted: "1w ago", urgent: false },
  { id: 4, role: "Electro-Technical Officer", vessel: "LNG Carrier", location: "Qatar", duration: "4 Months", salary: "$9,800", company: "Nakilat", posted: "1d ago", urgent: true },
  { id: 5, role: "3rd Engineer", vessel: "Cruise Ship", location: "Caribbean", duration: "5 Months", salary: "$6,500", company: "Royal Caribbean", posted: "3d ago", urgent: false },
  { id: 6, role: "Bosun", vessel: "Bulk Carrier", location: "Pacific", duration: "9 Months", salary: "$4,200", company: "Oldendorff", posted: "2w ago", urgent: false },
  { id: 7, role: "Chief Cook", vessel: "Container Ship", location: "Rotterdam", duration: "6 Months", salary: "$3,800", company: "MSC", posted: "3d ago", urgent: false },
  { id: 8, role: "Able Seaman", vessel: "Offshore Supply", location: "North Sea", duration: "2 Months", salary: "$4,500", company: "Tidewater", posted: "1d ago", urgent: true },
];

export default function PublicJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs = PUBLIC_JOBS.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.vessel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || job.vessel.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] font-sans selection:bg-[#64ffda] selection:text-[#0a192f]">
      
      {/* Navbar */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center border-b border-[#233554] bg-[#0a192f]/90 backdrop-blur-md sticky top-0 z-50">
        <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <Compass className="text-[#64ffda] w-8 h-8 transition-transform duration-700 group-hover:rotate-180" />
            <span className="font-bold text-xl tracking-tight text-white">Nautical<span className="text-[#64ffda]">Sync</span></span>
        </a>
        <div className="flex items-center gap-6">
             <a href="/auth" className="text-gray-400 hover:text-white font-medium text-sm hidden sm:block">Log In</a>
             <a href="/auth" className="px-5 py-2 bg-[#64ffda] text-[#0a192f] rounded hover:bg-[#58e6c5] transition-all font-bold text-sm">
                Sign Up
             </a>
        </div>
      </nav>

      {/* Search Hero */}
      <div className="relative py-20 px-6 text-center border-b border-[#233554]">
         <div className="absolute top-0 left-0 w-full h-full bg-[#112240]/30 -z-10"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#64ffda]/5 blur-[100px] rounded-full pointer-events-none"></div>
         
         <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Find Your Next Contract</h1>
         <p className="text-gray-400 mb-10 max-w-xl mx-auto">Browse thousands of verified vacancies from top tier shipping lines.</p>
         
         <div className="max-w-3xl mx-auto bg-[#112240] border border-[#233554] p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-2xl">
             <div className="flex-1 relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search by Rank (e.g. Master, Fitter)..." 
                    className="w-full bg-transparent h-12 pl-12 pr-4 text-white focus:outline-none placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
             </div>
             <div className="w-px bg-[#233554] hidden md:block"></div>
             <div className="flex-1 relative">
                 <Ship className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                 <select 
                    className="w-full bg-transparent h-12 pl-12 pr-4 text-white focus:outline-none appearance-none cursor-pointer"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                 >
                     <option value="All" className="bg-[#112240]">All Vessel Types</option>
                     <option value="LNG" className="bg-[#112240]">LNG / LPG</option>
                     <option value="Tanker" className="bg-[#112240]">Oil Tanker</option>
                     <option value="Container" className="bg-[#112240]">Container Ship</option>
                     <option value="Offshore" className="bg-[#112240]">Offshore / Supply</option>
                 </select>
                 <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" size={16} />
             </div>
             <button className="bg-[#64ffda] text-[#0a192f] font-bold px-8 py-3 rounded-lg hover:bg-[#58e6c5] transition-colors">
                 Search
             </button>
         </div>
      </div>

      {/* Job List */}
      <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Latest Vacancies <span className="text-gray-500 text-sm font-normal ml-2">{filteredJobs.length} jobs found</span></h2>
              <div className="flex gap-2">
                   {['All', 'LNG', 'Tanker', 'Container'].map(type => (
                       <button 
                        key={type}
                        onClick={() => setSelectedType(type === 'All' ? 'All' : type)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedType === type || (selectedType === 'All' && type === 'All')
                            ? 'bg-[#64ffda]/10 border-[#64ffda] text-[#64ffda]' 
                            : 'border-[#233554] text-gray-400 hover:text-white hover:border-gray-500'
                        }`}
                       >
                           {type}
                       </button>
                   ))}
              </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-[#112240]/40 border border-[#233554] hover:border-[#64ffda]/50 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all group">
                      
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-[#0a192f] border border-[#233554] flex items-center justify-center flex-shrink-0 group-hover:border-[#64ffda]/30 transition-colors">
                          <Anchor className="text-[#64ffda]" size={24} />
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                              <h3 className="text-lg font-bold text-white group-hover:text-[#64ffda] transition-colors">{job.role}</h3>
                              {job.urgent && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">Urgent</span>}
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#233554] text-gray-300">{job.posted}</span>
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                              <span className="font-medium text-white">{job.company}</span> • {job.vessel}
                          </p>
                      </div>

                      {/* Meta Data */}
                      <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-[#64ffda]" />
                              <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Clock size={16} className="text-[#64ffda]" />
                              <span>{job.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-[#64ffda]" />
                              {/* Blurred Salary for non-logged in users */}
                              <span className="filter blur-[4px] select-none opacity-70">$12,000</span>
                          </div>
                      </div>

                      {/* Action */}
                      <div>
                          <a href="/auth" className="px-6 py-2.5 border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda] hover:text-[#0a192f] transition-all flex items-center gap-2 whitespace-nowrap">
                              <Lock size={14} /> Sign in to Apply
                          </a>
                      </div>
                  </div>
              ))}

              {/* Upsell Card at bottom */}
              <div className="bg-gradient-to-r from-[#112240] to-[#0a192f] border border-[#233554] border-dashed rounded-xl p-8 text-center">
                  <div className="inline-flex p-3 rounded-full bg-[#64ffda]/10 text-[#64ffda] mb-4">
                      <Briefcase size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">450+ More Jobs Available</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">Create a free profile to view all salary details, unlock hidden vacancies, and apply with one click.</p>
                  <a href="/auth" className="inline-block px-8 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-colors">
                      Create Free Profile
                  </a>
              </div>
          </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#233554] bg-[#020c1b] pt-16 pb-8">
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