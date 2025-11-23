"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Anchor, 
  MoreVertical, 
  MapPin, 
  Ship, 
  TrendingUp, 
  Zap, 
  Users, 
  Plus, 
  Calendar, 
  FileCheck, 
  Filter,
  Check,
  UploadCloud, 
  LucideIcon,
  Save,
  Shield,
  Mail,
  Compass,
  Loader2,
  File,
  ScanLine,
  ThumbsUp,
  ThumbsDown,
  Video,
  Send,
  Edit, 
  Trash2, 
  PauseCircle, 
  PlayCircle,
  ArrowLeft,
  ClipboardList,
  Eye,
  CalendarCheck // Added for Interview
} from 'lucide-react';

// --- Data Constants ---

const JOB_MATCHES = [
  { id: 1, role: "Chief Officer", vessel: "LNG Carrier", company: "Maersk Line", salary: "$12,500/mo", matchScore: 98, location: "Rotterdam, NL", urgent: true },
  { id: 2, role: "2nd Officer", vessel: "Oil Tanker", company: "Euronav", salary: "$8,200/mo", matchScore: 92, location: "Singapore" },
  { id: 3, role: "Chief Officer", vessel: "Container Ship", company: "CMA CGM", salary: "$11,800/mo", matchScore: 88, location: "Hamburg, DE" }
];

const INITIAL_DOCUMENTS = [
  { id: 1, name: "STCW Basic Safety", expiry: "2024-12-15", status: 'expiring', daysLeft: 22 },
  { id: 2, name: "Medical Certificate", expiry: "2025-06-20", status: 'valid', daysLeft: 210 },
  { id: 3, name: "US Visa (C1/D)", expiry: "2023-11-01", status: 'expired', daysLeft: -20 },
  { id: 4, name: "COC Management", expiry: "2026-01-10", status: 'valid', daysLeft: 400 },
];

const INITIAL_ACTIVE_JOBS = [
  { id: 1, title: "Master / Captain", vesselType: "LNG Carrier", applicants: 12, postedDate: "2 days ago", status: 'active', location: "Worldwide", salary: "$14,500" },
  { id: 2, title: "Chief Engineer", vesselType: "Oil Tanker", applicants: 8, postedDate: "5 days ago", status: 'active', location: "Middle East", salary: "$13,800" },
  { id: 3, title: "2nd Officer", vesselType: "Container Ship", applicants: 24, postedDate: "1 week ago", status: 'paused', location: "Asia - Europe", salary: "$5,200" },
];

const RECENT_APPLICANTS = [
  { 
    id: 101, 
    name: "Capt. James Hook", 
    rank: "Master", 
    experience: "15 Years", 
    nationality: "UK", 
    status: 'new', 
    matchScore: 98, 
    appliedFor: "Master / LNG",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Experienced Master Mariner with extensive LNG command experience. Clean safety record for 15 years.",
    documents: ["COC Master Unlimited", "GMDSS", "Adv. Gas Tanker", "Medical"]
  },
  { 
    id: 102, 
    name: "Elena Fisher", 
    rank: "Chief Officer", 
    experience: "8 Years", 
    nationality: "Ukraine", 
    status: 'shortlisted', 
    matchScore: 92, 
    appliedFor: "Master / LNG",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Chief Officer looking for promotion. Strong background in VLCC and LNG operations.",
    documents: ["COC Chief Mate", "Medical", "US Visa"]
  },
  { id: 103, name: "Kenji Sato", rank: "2nd Engineer", experience: "5 Years", nationality: "Japan", status: 'reviewing', matchScore: 88, appliedFor: "Chief Engineer", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 104, name: "Maria Silva", rank: "3rd Officer", experience: "3 Years", nationality: "Brazil", status: 'new', matchScore: 75, appliedFor: "2nd Officer", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 105, name: "Lars Jensen", rank: "Master", experience: "20 Years", nationality: "Denmark", status: 'rejected', matchScore: 65, appliedFor: "Master / LNG", avatar: "https://i.pravatar.cc/150?img=12" },
];

const INITIAL_SCHEDULE = [
  { id: 1, time: "09:30 AM", name: "Capt. James Hook", type: "Video Call", role: "Master / LNG" }, 
  { id: 2, time: "11:00 AM", name: "Maria Silva", type: "Phone Screening", role: "2nd Officer" }, 
  { id: 3, time: "02:15 PM", name: "Internal Team", type: "Hiring Sync", role: "Internal" }
];

const ALL_JOBS = [
  ...JOB_MATCHES,
  { id: 4, role: "Master", vessel: "Bulk Carrier", company: "Oldendorff", salary: "$11,000/mo", matchScore: 85, location: "Dubai, UAE" },
  { id: 5, role: "3rd Engineer", vessel: "Cruise Ship", company: "Royal Caribbean", salary: "$6,500/mo", matchScore: 78, location: "Miami, USA" },
  { id: 6, role: "Electro-Technical Officer", vessel: "LNG Carrier", company: "Nakilat", salary: "$9,800/mo", matchScore: 95, location: "Qatar", urgent: true },
  { id: 7, role: "Bosun", vessel: "Container Ship", company: "MSC", salary: "$4,200/mo", matchScore: 60, location: "Antwerp, BE" },
];

const MESSAGES_MOCK = [
  { 
    id: 1, 
    sender: "Maersk Recruitment", 
    role: "Employer",
    avatar: "M",
    lastMessage: "We have reviewed your application for the LNG Carrier position.", 
    time: "10:30 AM", 
    unread: 2,
    online: true,
    history: [
      { sender: "them", text: "Hello Captain, thank you for applying.", time: "10:28 AM" },
      { sender: "me", text: "Good morning. I am available for immediate joining.", time: "10:29 AM" },
      { sender: "them", text: "We have reviewed your application for the LNG Carrier position.", time: "10:30 AM" }
    ]
  },
  { 
    id: 2, 
    sender: "Elena Fisher", 
    role: "Candidate",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Is the US Visa mandatory for this route?", 
    time: "Yesterday", 
    unread: 0,
    online: false,
    history: [
      { sender: "them", text: "Hi, I saw the job posting for Chief Officer.", time: "Yesterday" },
      { sender: "them", text: "Is the US Visa mandatory for this route?", time: "Yesterday" }
    ]
  },
  { 
    id: 3, 
    sender: "Euronav HR", 
    role: "Employer",
    avatar: "E",
    lastMessage: "Please upload your updated medical certificate.", 
    time: "2 days ago", 
    unread: 0,
    online: true,
    history: [
       { sender: "them", text: "Please upload your updated medical certificate.", time: "2 days ago" }
    ]
  }
];

// --- Shared Components ---

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  id: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

const SidebarItem = ({ icon: Icon, label, id, isActive, onClick }: SidebarItemProps) => (
  <button 
    type="button"
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      isActive 
        ? 'bg-[#112240] text-[#64ffda] border-r-2 border-[#64ffda]' 
        : 'text-gray-400 hover:bg-[#112240] hover:text-white'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-[#64ffda]' : 'group-hover:text-white'} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, subtext, icon: Icon, trend, color = "#64ffda" }: StatCardProps) => (
  <div className="bg-[#112240]/50 backdrop-blur-md border border-[#233554] p-6 rounded-xl hover:border-[#64ffda]/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#0a192f] rounded-lg transition-colors group-hover:bg-[#112240]" style={{ color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/10 text-green-400 flex items-center gap-1">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      {subtext && <span className="text-xs text-gray-500">{subtext}</span>}
    </div>
  </div>
);

// --- Toast Component ---
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-[#64ffda] text-[#0a192f] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 font-bold animate-in slide-in-from-bottom-5 z-50">
      <CheckCircle2 size={20} />
      {message}
    </div>
  );
};

// --- Notification Dropdown ---
const NotificationDropdown = ({ type, onClose }: { type: 'seafarer' | 'agent', onClose: () => void }) => {
    const notifications = type === 'seafarer' ? [
        { id: 1, text: "Your application for Chief Officer was viewed", time: "2 hours ago", icon: Eye, color: "text-blue-400" },
        { id: 2, text: "STCW Basic Safety expires in 22 days", time: "5 hours ago", icon: AlertTriangle, color: "text-yellow-400" },
        { id: 3, text: "New job match: LNG Carrier - Maersk", time: "1 day ago", icon: Briefcase, color: "text-[#64ffda]" }
    ] : [
        { id: 1, text: "New application: Capt. James Hook", time: "10 mins ago", icon: User, color: "text-[#64ffda]" },
        { id: 2, text: "Interview scheduled with Elena Fisher", time: "1 hour ago", icon: Video, color: "text-purple-400" },
        { id: 3, text: "Compliance report generated", time: "Yesterday", icon: FileText, color: "text-green-400" }
    ];

    return (
        <div className="absolute right-0 mt-2 w-80 bg-[#112240] border border-[#233554] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-[#233554] flex justify-between items-center">
                <h3 className="font-bold text-white">Notifications</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-[#233554]/50 hover:bg-[#0a192f]/50 cursor-pointer transition-colors flex gap-3">
                        <div className={`mt-1 ${n.color}`}><n.icon size={16} /></div>
                        <div>
                            <p className="text-sm text-gray-200 leading-snug">{n.text}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 bg-[#0a192f] text-center">
                <button className="text-xs text-[#64ffda] hover:underline">Mark all as read</button>
            </div>
        </div>
    );
};

// --- New View Components ---

const MyApplicationsView = ({ applications }: { applications: any[] }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">My Applications</h2>
      <button className="px-4 py-2 bg-[#112240] border border-[#233554] rounded-lg text-sm text-gray-300 hover:text-white hover:border-[#64ffda] flex items-center gap-2">
        <Filter size={16} /> Filter Status
      </button>
    </div>

    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a192f]/50 text-gray-300 font-medium">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Vessel</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#233554]">
            {applications.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    You haven't applied to any jobs yet. Visit the Job Board to start!
                 </td>
               </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#112240]/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{app.role}</td>
                  <td className="px-6 py-4">{app.company}</td>
                  <td className="px-6 py-4">{app.vessel}</td>
                  <td className="px-6 py-4">{app.dateApplied || 'Just now'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                      app.status === 'Under Review' ? 'bg-blue-500/10 text-blue-400' : 
                      app.status === 'Shortlisted' ? 'bg-[#64ffda]/10 text-[#64ffda]' : 
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {app.status === 'Shortlisted' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#64ffda] hover:underline text-xs">View Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const JobDetailView = ({ 
  job, 
  onBack, 
  applicants, 
  onStatusUpdate,
  onViewProfile
}: { 
  job: any, 
  onBack: () => void, 
  applicants: any[], 
  onStatusUpdate: (id: number, status: string) => void,
  onViewProfile: (applicant: any) => void
}) => {
  
  const jobApplicants = applicants.filter(c => c.appliedFor.includes(job.title.split('/')[0].trim()));

  const stats = {
    new: jobApplicants.filter(a => a.status === 'new').length,
    shortlisted: jobApplicants.filter(a => a.status === 'shortlisted').length,
    interview: jobApplicants.filter(a => a.status === 'reviewing').length,
    hired: jobApplicants.filter(a => a.status === 'hired').length,
  };

  return (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 text-sm">
          <ArrowLeft size={16} /> Back to Jobs
        </button>
        <h2 className="text-3xl font-bold text-white">{job.title}</h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Ship size={14} /> {job.vesselType}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
          <span className="flex items-center gap-1 text-[#64ffda]"><Zap size={14} /> {job.status.toUpperCase()}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-[#112240] border border-[#233554] rounded-lg text-gray-300 hover:text-white flex items-center gap-2">
            <Edit size={16} /> Edit Job
        </button>
        <button className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-lg font-bold hover:bg-[#58e6c5] flex items-center gap-2">
            <Plus size={16} /> Add Candidate
        </button>
      </div>
    </div>

    {/* Pipeline Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[#112240]/40 border border-[#233554] p-4 rounded-xl">
        <div className="text-sm text-gray-400 mb-1">New Applicants</div>
        <div className="text-2xl font-bold text-white">{stats.new}</div>
        <div className="w-full bg-[#0a192f] h-1 mt-2 rounded"><div className="bg-blue-500 h-1 w-full rounded"></div></div>
      </div>
      <div className="bg-[#112240]/40 border border-[#233554] p-4 rounded-xl">
        <div className="text-sm text-gray-400 mb-1">Shortlisted</div>
        <div className="text-2xl font-bold text-white">{stats.shortlisted}</div>
        <div className="w-full bg-[#0a192f] h-1 mt-2 rounded"><div className="bg-[#64ffda] h-1 w-[40%] rounded"></div></div>
      </div>
      <div className="bg-[#112240]/40 border border-[#233554] p-4 rounded-xl">
        <div className="text-sm text-gray-400 mb-1">Interviewing</div>
        <div className="text-2xl font-bold text-white">{stats.interview}</div>
        <div className="w-full bg-[#0a192f] h-1 mt-2 rounded"><div className="bg-purple-500 h-1 w-[20%] rounded"></div></div>
      </div>
      <div className="bg-[#112240]/40 border border-[#233554] p-4 rounded-xl">
        <div className="text-sm text-gray-400 mb-1">Hired</div>
        <div className="text-2xl font-bold text-white">{stats.hired}</div>
        <div className="w-full bg-[#0a192f] h-1 mt-2 rounded"></div>
      </div>
    </div>

    {/* Candidates Table */}
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#233554]">
        <h3 className="font-bold text-white">Candidates for this Role</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a192f]/50 text-gray-300 font-medium">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Nationality</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Match</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#233554]">
            {jobApplicants.map(applicant => (
              <tr key={applicant.id} className="hover:bg-[#112240]/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{applicant.name}</td>
                <td className="px-6 py-4">{applicant.nationality}</td>
                <td className="px-6 py-4">{applicant.experience}</td>
                <td className="px-6 py-4"><span className="text-[#64ffda] font-bold">{applicant.matchScore}%</span></td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                        applicant.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 
                        applicant.status === 'shortlisted' ? 'bg-[#64ffda]/10 text-[#64ffda]' : 
                        applicant.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                        'bg-yellow-500/10 text-yellow-400'
                    }`}>
                        {applicant.status.toUpperCase()}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                     <button onClick={() => onViewProfile(applicant)} className="p-1.5 hover:bg-[#233554] rounded text-white" title="View Profile"><Eye size={16} /></button>
                     <button onClick={() => onStatusUpdate(applicant.id, 'shortlisted')} className="p-1.5 hover:bg-[#233554] rounded text-[#64ffda]" title="Shortlist"><Check size={16} /></button>
                     <button onClick={() => onStatusUpdate(applicant.id, 'rejected')} className="p-1.5 hover:bg-[#233554] rounded text-red-400" title="Reject"><X size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)};

const EmployerJobsView = ({ 
    setShowJobWizard, 
    onManageJob, 
    jobs, 
    toggleJobStatus, 
    deleteJob 
}: { 
    setShowJobWizard: (v: boolean) => void, 
    onManageJob: (job: any) => void,
    jobs: any[],
    toggleJobStatus: (id: number) => void,
    deleteJob: (id: number) => void
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Job Management</h2>
      <button onClick={() => setShowJobWizard(true)} className="flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-colors shadow-[0_0_15px_rgba(100,255,218,0.3)]">
        <Plus size={18} /> Post New Job
      </button>
    </div>

    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a192f]/50 text-gray-300 font-medium">
            <tr>
              <th className="px-6 py-4">Job Title / Rank</th>
              <th className="px-6 py-4">Vessel Type</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Applicants</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#233554]">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[#112240]/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                <td className="px-6 py-4">{job.vesselType}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4 text-[#64ffda]">{job.salary}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Users size={14} /> {job.applicants}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                    job.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {job.status === 'active' ? <CheckCircle2 size={12} /> : <PauseCircle size={12} />}
                    {job.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onManageJob(job)}
                        className="px-3 py-1.5 bg-[#233554] text-white text-xs rounded hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors"
                    >
                        Manage
                    </button>
                    
                    <button 
                        title={job.status === 'active' ? 'Pause' : 'Activate'} 
                        onClick={() => toggleJobStatus(job.id)}
                        className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-white"
                    >
                        {job.status === 'active' ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                    </button>
                    
                    <button 
                        title="Delete" 
                        onClick={() => deleteJob(job.id)}
                        className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-red-400"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const EmployerCandidatesView = ({ onCandidateClick, applicants }: { onCandidateClick: (c: any) => void, applicants: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCandidates = applicants.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Global Talent Pool</h2>
        <p className="text-gray-400 text-sm">Search and filter verified seafarers for your crew.</p>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by rank, name..." 
                className="w-full bg-[#112240] border border-[#233554] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-[#64ffda] outline-none"
            />
        </div>
        <button className="px-4 py-2 bg-[#112240] border border-[#233554] rounded-lg text-sm text-gray-300 hover:text-white hover:border-[#64ffda] flex items-center gap-2">
          <Filter size={16} /> Filters
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} onClick={() => onCandidateClick(candidate)} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6 hover:border-[#64ffda]/50 transition-all cursor-pointer group">
          <div className="flex items-start gap-4 mb-4">
             <div className="w-16 h-16 rounded-full bg-[#233554] overflow-hidden border-2 border-[#64ffda] flex-shrink-0">
                {candidate.avatar ? (
                <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold">{candidate.name.charAt(0)}</div>
                )}
            </div>
            <div>
                <h3 className="font-bold text-white group-hover:text-[#64ffda] transition-colors">{candidate.name}</h3>
                <p className="text-sm text-[#64ffda] font-medium">{candidate.rank}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin size={10} /> {candidate.nationality}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Experience</span>
                <span className="text-gray-300">{candidate.experience}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Availability</span>
                <span className="text-green-400">Immediate</span>
             </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
             <span className="px-2 py-1 bg-[#0a192f] border border-[#233554] rounded text-[10px] text-gray-300">STCW</span>
             <span className="px-2 py-1 bg-[#0a192f] border border-[#233554] rounded text-[10px] text-gray-300">US Visa</span>
             <span className="px-2 py-1 bg-[#0a192f] border border-[#233554] rounded text-[10px] text-gray-300">Medical</span>
          </div>

          <button className="w-full py-2 bg-[#233554] text-[#64ffda] rounded border border-transparent hover:border-[#64ffda] transition-all text-sm font-bold">
            View Profile
          </button>
        </div>
      ))}
    </div>
  </div>
)};

const MessagesView = () => {
  const [activeChat, setActiveChat] = useState(MESSAGES_MOCK[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Mock sending message
    const updatedChat = {
        ...activeChat,
        history: [...activeChat.history, { sender: "me", text: newMessage, time: "Just now" }]
    };
    setActiveChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Chat List */}
      <div className="w-1/3 bg-[#112240]/40 border border-[#233554] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#233554]">
            <h2 className="text-lg font-bold text-white">Messages</h2>
            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    className="w-full bg-[#0a192f] border border-[#233554] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-[#64ffda] outline-none"
                />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {MESSAGES_MOCK.map(chat => (
                <div 
                    key={chat.id} 
                    onClick={() => setActiveChat(chat)}
                    className={`p-4 border-b border-[#233554] cursor-pointer transition-colors ${
                        activeChat.id === chat.id ? 'bg-[#0a192f]/80 border-l-2 border-l-[#64ffda]' : 'hover:bg-[#112240]/60'
                    }`}
                >
                    <div className="flex gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold overflow-hidden">
                                {chat.avatar.startsWith('http') ? <img src={chat.avatar} className="w-full h-full object-cover" /> : chat.avatar}
                            </div>
                            {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a192f]"></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white text-sm truncate">{chat.sender}</h4>
                                <span className="text-[10px] text-gray-500">{chat.time}</span>
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-1">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                            <div className="flex flex-col justify-center">
                                <span className="w-5 h-5 bg-[#64ffda] text-[#0a192f] text-[10px] font-bold rounded-full flex items-center justify-center">{chat.unread}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-[#112240]/40 border border-[#233554] rounded-xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#233554] flex justify-between items-center bg-[#0a192f]/50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold overflow-hidden">
                    {activeChat.avatar.startsWith('http') ? <img src={activeChat.avatar} className="w-full h-full object-cover" /> : activeChat.avatar}
                </div>
                <div>
                    <h3 className="font-bold text-white">{activeChat.sender}</h3>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${activeChat.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="text-xs text-gray-400">{activeChat.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 hover:bg-[#233554] rounded-full text-gray-400 hover:text-white"><Video size={20} /></button>
                <button className="p-2 hover:bg-[#233554] rounded-full text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0a192f]/30">
            {activeChat.history.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'me' 
                            ? 'bg-[#64ffda] text-[#0a192f] rounded-br-none' 
                            : 'bg-[#112240] text-white border border-[#233554] rounded-bl-none'
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-[#0a192f]/70' : 'text-gray-500'}`}>{msg.time}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#233554] bg-[#0a192f]/50">
            <form onSubmit={handleSend} className="flex gap-3">
                <button type="button" className="p-2 text-gray-400 hover:text-white hover:bg-[#233554] rounded-full">
                    <Plus size={20} />
                </button>
                <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..." 
                    className="flex-1 bg-[#0a192f] border border-[#233554] rounded-full px-4 py-2 text-sm text-white focus:border-[#64ffda] outline-none"
                />
                <button type="submit" className="p-2 bg-[#64ffda] text-[#0a192f] rounded-full hover:bg-[#58e6c5] transition-colors">
                    <Send size={20} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

const SeafarerProfileView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
    
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-[#0a192f] border-4 border-[#233554] overflow-hidden relative group cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <User className="text-white" />
            </div>
          </div>
          <button className="text-[#64ffda] text-sm hover:underline">Change Photo</button>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Name</label>
              <input type="text" defaultValue="John Smith" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Rank / Title</label>
              <input type="text" defaultValue="Captain / Master" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nationality</label>
              <input type="text" defaultValue="United Kingdom" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input type="email" defaultValue="john.smith@example.com" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Bio</label>
            <textarea rows={4} defaultValue="Experienced Master Mariner with over 15 years of sea service on LNG carriers and Oil Tankers. Committed to safety and efficiency." className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none resize-none"></textarea>
          </div>

          <div className="pt-4 border-t border-[#233554] flex justify-end">
            <button onClick={() => showToast('Profile updated successfully!')} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded-lg font-bold hover:bg-[#58e6c5] transition-colors">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EmployerProfileView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">Company Profile</h2>
    
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Company Name</label>
            <input type="text" defaultValue="Maersk Line" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Headquarters</label>
            <input type="text" defaultValue="Copenhagen, Denmark" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Website</label>
            <input type="text" defaultValue="https://www.maersk.com" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Contact Email</label>
            <input type="email" defaultValue="recruitment@maersk.com" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Company Overview</label>
          <textarea rows={4} defaultValue="A global leader in container shipping and ports. We are dedicated to connecting and simplifying our customers' supply chains." className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none resize-none"></textarea>
        </div>

        <div className="pt-4 border-t border-[#233554] flex justify-end">
          <button onClick={() => showToast('Company profile saved!')} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded-lg font-bold hover:bg-[#58e6c5] transition-colors">
            <Save size={18} /> Save Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SettingsView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
    
    <div className="space-y-4">
      {/* Notifications */}
      <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Bell size={20} className="text-[#64ffda]" /> Notifications</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium">Email Alerts</div>
              <div className="text-xs text-gray-400">Receive emails about new job matches</div>
            </div>
            <div className="w-12 h-6 bg-[#64ffda] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-[#0a192f] rounded-full"></div></div>
          </div>
          <div className="w-full h-px bg-[#233554]"></div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium">SMS Notifications</div>
              <div className="text-xs text-gray-400">Get text messages for interview requests</div>
            </div>
            <div className="w-12 h-6 bg-[#233554] rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div></div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield size={20} className="text-[#64ffda]" /> Security</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium">Change Password</div>
              <div className="text-xs text-gray-400">Last changed 3 months ago</div>
            </div>
            <button onClick={() => showToast('Password update link sent!')} className="px-4 py-2 border border-[#233554] text-white rounded hover:bg-[#233554] transition-colors text-sm">Update</button>
          </div>
          <div className="w-full h-px bg-[#233554]"></div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium">Two-Factor Authentication</div>
              <div className="text-xs text-gray-400">Add an extra layer of security</div>
            </div>
            <button onClick={() => showToast('2FA setup initiated')} className="px-4 py-2 border border-[#233554] text-[#64ffda] rounded hover:bg-[#233554] transition-colors text-sm">Enable</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JobBoardView = ({ onApply }: { onApply: (job: any) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Global Job Market</h2>
        <p className="text-gray-400 text-sm">Showing jobs matching your <span className="text-[#64ffda]">Chief Officer</span> profile</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#112240] border border-[#233554] rounded-lg text-sm text-gray-300 hover:text-white hover:border-[#64ffda] flex items-center gap-2">
          <Filter size={16} /> Filters
        </button>
        <button className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-lg text-sm font-bold hover:bg-[#58e6c5] flex items-center gap-2">
          <CheckCircle2 size={16} /> Verified Only
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ALL_JOBS.map((job) => (
        <div key={job.id} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6 hover:border-[#64ffda]/50 transition-all duration-300 flex flex-col group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-[#0a192f] rounded-lg flex items-center justify-center border border-[#233554] text-white font-bold">
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            {job.urgent && <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20">URGENT</span>}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors">{job.role}</h3>
          <p className="text-sm text-gray-400 mb-4">{job.company} • {job.vessel}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2 py-1 bg-[#233554] text-gray-300 text-xs rounded flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
            <span className="px-2 py-1 bg-[#233554] text-gray-300 text-xs rounded flex items-center gap-1"><Clock size={10} /> 4 Months</span>
          </div>
          
          <div className="mt-auto pt-4 border-t border-[#233554] flex justify-between items-center">
            <div>
              <span className="block text-xs text-gray-500">Salary</span>
              <span className="font-bold text-[#64ffda]">{job.salary}</span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-xs text-gray-500 mb-1">Match</span>
               <span className="text-sm font-bold text-white flex items-center gap-1"><Zap size={12} className="text-[#64ffda]" fill="currentColor"/> {job.matchScore}%</span>
            </div>
          </div>
          
          <button 
            onClick={() => onApply(job)}
            className="w-full mt-4 py-2 bg-[#0a192f] border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda] hover:text-[#0a192f] font-bold text-sm transition-colors"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

const DocumentsView = ({ documents, onUpload }: { documents: any[], onUpload: () => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Digital Wallet</h2>
      <button onClick={onUpload} className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-lg text-sm font-bold hover:bg-[#58e6c5] flex items-center gap-2">
        <UploadCloud size={18} /> Upload Document
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload Zone */}
      <div onClick={onUpload} className="lg:col-span-3 bg-[#112240]/30 border-2 border-dashed border-[#233554] rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-[#64ffda]/50 transition-colors cursor-pointer group">
        <div className="w-16 h-16 bg-[#0a192f] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} className="text-[#64ffda]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Drag & Drop Certificates Here</h3>
        <p className="text-gray-400 text-sm max-w-sm">Support for PDF, JPG, PNG. Max file size 10MB. Our AI will automatically detect document type and expiry dates.</p>
      </div>

      {/* Document Cards */}
      {documents.map((doc) => (
        <div key={doc.id} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-5 flex items-start gap-4 group hover:border-[#64ffda]/30 transition-all">
          <div className="w-12 h-12 bg-[#0a192f] rounded flex items-center justify-center text-gray-400 border border-[#233554]">
            <FileText size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-white truncate pr-2">{doc.name}</h4>
              <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Expires: {doc.expiry}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${doc.status === 'valid' ? 'bg-green-500/10 text-green-400' : doc.status === 'expiring' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                {doc.status}
              </span>
              {doc.daysLeft < 30 && doc.daysLeft > 0 && <span className="text-[10px] text-yellow-400 flex items-center gap-1"><Clock size={10} /> {doc.daysLeft} days left</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Seafarer Overview (Existing) ---
const SeafarerOverview = ({ onJobClick, documents }: { onJobClick: (tab: string) => void, documents: any[] }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={CheckCircle2} title="Verification Status" value="Verified" trend="Level 1" subtext="All systems go" />
      <StatCard icon={Ship} title="Sea Time" value="1,240" subtext="Days total" trend="+120 days" />
      <StatCard icon={Briefcase} title="Profile Views" value="84" subtext="Last 7 days" trend="+12%" />
      <StatCard icon={FileText} title="Documents" value={documents.length.toString()} subtext="2 expiring soon" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div><h2 className="text-lg font-bold text-white">Smart Job Matches</h2><p className="text-sm text-gray-400">Based on your rank & verified certificates</p></div>
            <button onClick={() => onJobClick('jobs')} className="text-[#64ffda] text-sm font-medium hover:underline flex items-center gap-1">View All <ChevronRight size={16} /></button>
          </div>
          <div className="space-y-4">
            {JOB_MATCHES.map((job) => (
              <div key={job.id} className="bg-[#0a192f]/50 border border-[#233554] hover:border-[#64ffda]/50 p-4 rounded-lg transition-all duration-200 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/0 via-[#64ffda]/5 to-[#64ffda]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#112240] rounded flex items-center justify-center text-white font-bold border border-[#233554]">{job.company.substring(0, 2).toUpperCase()}</div>
                    <div>
                      <div className="flex items-center gap-2"><h3 className="font-bold text-white group-hover:text-[#64ffda] transition-colors">{job.role}</h3>{job.urgent && <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wide">Urgent</span>}</div>
                      <p className="text-sm text-gray-400 flex items-center gap-2 mt-1"><Ship size={12} /> {job.vessel} <span className="w-1 h-1 bg-gray-600 rounded-full"></span><MapPin size={12} /> {job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <div className="text-right"><div className="font-bold text-[#64ffda]">{job.salary}</div><div className="text-xs text-gray-500">per month</div></div>
                      <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-[#64ffda]/10 text-[#64ffda] rounded border border-[#64ffda]/20"><Zap size={12} fill="currentColor" /> {job.matchScore}% Match</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-bold text-white">Document Health</h2><div className="w-8 h-8 rounded-full bg-[#112240] flex items-center justify-center border border-[#233554] hover:border-[#64ffda] cursor-pointer"><Settings size={14} className="text-gray-400" /></div></div>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0a192f]/50 border border-[#233554] hover:border-gray-600 transition-colors">
                <div className={`p-2 rounded-lg ${doc.status === 'valid' ? 'bg-green-500/10 text-green-400' : doc.status === 'expiring' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>{doc.status === 'valid' ? <CheckCircle2 size={18} /> : doc.status === 'expiring' ? <Clock size={18} /> : <AlertTriangle size={18} />}</div>
                <div className="flex-1 min-w-0"><h4 className="text-sm font-medium text-white truncate">{doc.name}</h4><p className={`text-xs ${doc.status === 'valid' ? 'text-gray-500' : doc.status === 'expiring' ? 'text-yellow-400 font-medium' : 'text-red-400 font-medium'}`}>{doc.daysLeft > 0 ? `Expires in ${doc.daysLeft} days` : 'Expired'}</p></div>
              </div>
            ))}
          </div>
          <button type="button" className="w-full mt-4 py-3 border border-dashed border-[#233554] text-gray-400 text-sm font-medium rounded-lg hover:border-[#64ffda] hover:text-[#64ffda] transition-all flex items-center justify-center gap-2"><FileText size={16} /> Upload New Certificate</button>
        </div>
      </div>
    </div>
  </div>
);

// --- Employer Overview (Existing) ---
const EmployerOverview = ({ setShowJobWizard, onCandidateClick, jobs }: { setShowJobWizard: (v: boolean) => void, onCandidateClick: (candidate: any) => void, jobs: any[] }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={Briefcase} title="Active Vacancies" value={jobs.filter(j => j.status === 'active').length.toString()} trend="+2 this week" />
      <StatCard icon={Users} title="Total Applicants" value="1,204" trend="+18% vs last mo" color="#58e6c5" />
      <StatCard icon={MessageSquare} title="Interviews Scheduled" value="8" subtext="3 today" color="#a78bfa" />
      <StatCard icon={Clock} title="Avg. Time to Hire" value="14 Days" subtext="Top 5% industry" color="#f472b6" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#233554] flex justify-between items-center"><h2 className="text-lg font-bold text-white">Newest Candidates</h2><button type="button" className="text-[#64ffda] text-sm hover:underline flex items-center gap-1">View All <ChevronRight size={16} /></button></div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#0a192f]/50 text-gray-300 font-medium"><tr><th className="px-6 py-4">Candidate Name</th><th className="px-6 py-4">Rank</th><th className="px-6 py-4">Applied For</th><th className="px-6 py-4">Match</th><th className="px-6 py-4">Status</th><th className="px-6 py-4"></th></tr></thead>
                  <tbody className="divide-y divide-[#233554]">
                      {RECENT_APPLICANTS.map((applicant) => (
                          <tr key={applicant.id} onClick={() => onCandidateClick(applicant)} className="hover:bg-[#112240]/50 transition-colors group cursor-pointer">
                              <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold">{applicant.name.charAt(0)}</div><div><div className="font-medium text-white">{applicant.name}</div><div className="text-xs flex items-center gap-1"><MapPin size={10} /> {applicant.nationality}</div></div></div></td>
                              <td className="px-6 py-4 text-white">{applicant.rank}</td>
                              <td className="px-6 py-4">{applicant.appliedFor}</td>
                              <td className="px-6 py-4"><div className="flex items-center gap-1 font-bold text-[#64ffda]">{applicant.matchScore}%</div></td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${applicant.status === 'new' ? 'bg-blue-500/10 text-blue-400' : applicant.status === 'shortlisted' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{applicant.status.toUpperCase()}</span></td>
                              <td className="px-6 py-4 text-right"><button type="button" className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-white"><MoreVertical size={16} /></button></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6"><h2 className="text-lg font-bold text-white">Your Active Postings</h2><div className="flex gap-2"><button type="button" className="p-2 bg-[#0a192f] rounded border border-[#233554] text-gray-400 hover:text-white"><Filter size={16} /></button></div></div>
          <div className="space-y-3">
              {jobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-[#0a192f]/30 border border-[#233554] rounded-lg hover:border-[#64ffda]/30 transition-all">
                      <div className="flex items-center gap-4">
                          <div className="p-3 bg-[#112240] rounded text-[#64ffda]"><Ship size={20} /></div>
                          <div><h3 className="font-bold text-white">{job.title}</h3><p className="text-sm text-gray-400 flex items-center gap-2">{job.vesselType} <span className="w-1 h-1 bg-gray-600 rounded-full"></span> Posted {job.postedDate}</p></div>
                      </div>
                      <div className="flex items-center gap-6"><div className="text-right"><div className="text-2xl font-bold text-white">{job.applicants}</div><div className="text-xs text-gray-500">Applicants</div></div><button type="button" className="px-3 py-1.5 text-xs font-medium bg-[#233554] text-[#64ffda] rounded hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors">Manage</button></div>
                  </div>
              ))}
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Today&apos;s Schedule</h2>
          <div className="space-y-4">
              {SCHEDULE_EVENTS.map((event, i) => (
                  <div key={i} className="flex gap-4 relative">
                      <div className="flex flex-col items-center"><div className="w-2 h-2 bg-[#64ffda] rounded-full mt-1.5"></div>{i !== 2 && <div className="w-px h-full bg-[#233554] my-1"></div>}</div>
                      <div className="pb-4"><div className="text-sm font-bold text-white">{event.time}</div><div className="text-sm text-gray-300">{event.name}</div><div className="text-xs text-gray-500 mt-1 bg-[#0a192f] px-2 py-0.5 rounded inline-block">{event.type}</div></div>
                  </div>
              ))}
          </div>
          <button type="button" className="w-full mt-2 py-2 text-sm text-[#64ffda] border border-dashed border-[#233554] rounded hover:bg-[#233554] transition-colors">View Calendar</button>
        </div>
        <div className="bg-gradient-to-br from-[#112240] to-[#0a192f] border border-[#233554] rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span className="text-xs font-mono text-[#64ffda] tracking-widest">AI VERIFICATION ACTIVE</span></div>
              <h3 className="text-lg font-bold text-white mb-2">35 Documents Verified</h3>
              <p className="text-xs text-gray-400 mb-4">The automated system has processed 35 new certificates in the last hour with 99.9% accuracy.</p>
              <div className="w-full bg-[#0a192f] h-1.5 rounded-full overflow-hidden"><div className="bg-[#64ffda] w-3/4 h-full rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div></div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#64ffda]/5 rounded-full blur-xl -mr-5 -mb-5 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Seafarer Dashboard Component ---

function SeafarerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applications, setApplications] = useState<any[]>([]); // Track applications
  
  // Document Upload State
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'scanning' | 'verified'>('idle');
  
  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApply = (job: any) => {
    setSelectedJob(job);
  };

  const submitApplication = () => {
    setIsApplying(true);
    setTimeout(() => {
      const newApp = {
        id: Date.now(),
        role: selectedJob.role,
        company: selectedJob.company,
        vessel: selectedJob.vessel,
        status: 'Under Review',
        dateApplied: 'Just now'
      };
      setApplications([newApp, ...applications]);
      setIsApplying(false);
      setApplicationSuccess(true);
      showToast('Application Submitted Successfully!');
    }, 2000);
  };

  const closeApplicationModal = () => {
    setSelectedJob(null);
    setApplicationSuccess(false);
  };

  // Document Upload Logic
  const startUpload = () => {
    setUploadState('scanning');
    setTimeout(() => {
      setUploadState('verified');
      // Mock adding new document
      setTimeout(() => {
        const newDoc = {
          id: documents.length + 1,
          name: "Yellow Fever Vaccination",
          expiry: "2033-05-20",
          status: 'valid',
          daysLeft: 3200
        };
        // @ts-ignore - Simple mock adding
        setDocuments([...documents, newDoc]);
        setTimeout(() => {
            setShowUploadModal(false);
            setUploadState('idle');
            showToast('Document Verified & Added');
        }, 1500);
      }, 1000);
    }, 2500); // 2.5s simulated scan time
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <SeafarerOverview onJobClick={setActiveTab} documents={documents} />;
      case 'jobs': return <JobBoardView onApply={handleApply} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setShowUploadModal(true)} />;
      case 'applications': return <MyApplicationsView applications={applications} />; // Added Applications View
      case 'profile': return <SeafarerProfileView showToast={showToast} />;
      case 'settings': return <SettingsView showToast={showToast} />;
      case 'messages': return <MessagesView />; // Added messages view
      default: return <SeafarerOverview onJobClick={setActiveTab} documents={documents} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] font-sans flex overflow-hidden relative">
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#112240] border border-[#233554] rounded-2xl w-full max-w-md shadow-2xl p-8 relative overflow-hidden">
                <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                
                {uploadState === 'idle' && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-[#0a192f] rounded-full flex items-center justify-center mx-auto">
                            <FileText size={32} className="text-[#64ffda]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Upload Certificate</h2>
                            <p className="text-gray-400 text-sm">Select a file to scan and verify.</p>
                        </div>
                        <div className="border-2 border-dashed border-[#233554] rounded-xl p-8 hover:border-[#64ffda] transition-colors cursor-pointer" onClick={startUpload}>
                            <UploadCloud size={40} className="text-gray-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-300">Click to browse</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                    </div>
                )}

                {uploadState === 'scanning' && (
                    <div className="text-center space-y-6 py-8">
                        <div className="relative w-20 h-20 mx-auto">
                            <div className="absolute inset-0 border-4 border-[#233554] rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-[#64ffda] rounded-full animate-spin"></div>
                            <ScanLine size={32} className="absolute inset-0 m-auto text-[#64ffda] animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">AI Verification in Progress</h2>
                            <p className="text-gray-400 text-sm">Extracting data and checking validity...</p>
                        </div>
                    </div>
                )}

                {uploadState === 'verified' && (
                    <div className="text-center space-y-6 py-4 animate-in zoom-in-90">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={40} className="text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Verification Successful!</h2>
                            <p className="text-gray-400 text-sm">Document added to your wallet.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#112240] border border-[#233554] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {applicationSuccess ? (
              <div className="p-12 flex flex-col items-center text-center animate-in zoom-in-50 duration-300">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Application Sent!</h2>
                <p className="text-gray-400 mb-8">
                  Your profile and verified documents have been securely transmitted to <span className="text-[#64ffda]">{selectedJob.company}</span>.
                </p>
                <button 
                  onClick={closeApplicationModal}
                  className="px-8 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-colors"
                >
                  Return to Job Board
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[#233554] flex justify-between items-center bg-[#0a192f]/50">
                  <div>
                    <h2 className="text-xl font-bold text-white">Apply for {selectedJob.role}</h2>
                    <p className="text-sm text-gray-400">{selectedJob.company} • {selectedJob.vessel}</p>
                  </div>
                  <button onClick={closeApplicationModal} className="text-gray-400 hover:text-white bg-[#112240] p-2 rounded-full hover:bg-[#233554]">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                  <div className="flex gap-4 p-4 bg-[#0a192f] rounded-lg border border-[#233554]">
                    <div className="w-12 h-12 bg-[#112240] rounded flex items-center justify-center text-[#64ffda]">
                      <Ship size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Job Summary</h4>
                      <div className="flex gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {selectedJob.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> 4 Months +/- 1</span>
                        <span className="flex items-center gap-1 text-[#64ffda]"><Zap size={12} /> {selectedJob.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-white">Required Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-[#112240]/50 rounded border border-green-500/30 text-sm">
                        <CheckCircle2 size={16} className="text-green-400" /> <span>STCW Basic Safety</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#112240]/50 rounded border border-green-500/30 text-sm">
                        <CheckCircle2 size={16} className="text-green-400" /> <span>Medical Certificate</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#112240]/50 rounded border border-green-500/30 text-sm">
                        <CheckCircle2 size={16} className="text-green-400" /> <span>COC Management</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#112240]/50 rounded border border-[#233554] text-gray-400 text-sm">
                        <AlertTriangle size={16} className="text-yellow-500" /> <span>Yellow Fever (Missing)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cover Note (Optional)</label>
                    <textarea 
                      rows={3} 
                      placeholder="Briefly introduce yourself..." 
                      className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="p-6 border-t border-[#233554] bg-[#0a192f]/50 flex justify-end gap-3">
                  <button onClick={closeApplicationModal} className="px-6 py-2.5 text-gray-300 hover:text-white font-medium">Cancel</button>
                  <button 
                    onClick={submitApplication}
                    disabled={isApplying}
                    className="px-8 py-2.5 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isApplying ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Submit Application <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <aside className="hidden lg:flex flex-col w-64 bg-[#0a192f] border-r border-[#233554] h-screen fixed left-0 top-0 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <Compass className="text-[#64ffda] w-8 h-8 relative z-10 transition-transform duration-700 group-hover:rotate-180" />
            <div className="absolute inset-0 bg-[#64ffda] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Nautical<span className="text-[#64ffda]">Sync</span></span>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 uppercase tracking-wider">Menu</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" id="dashboard" isActive={activeTab === 'dashboard'} onClick={setActiveTab} />
          <SidebarItem icon={ClipboardList} label="My Applications" id="applications" isActive={activeTab === 'applications'} onClick={setActiveTab} />
          <SidebarItem icon={FileText} label="Documents" id="documents" isActive={activeTab === 'documents'} onClick={setActiveTab} />
          <SidebarItem icon={Briefcase} label="Job Board" id="jobs" isActive={activeTab === 'jobs'} onClick={setActiveTab} />
          <SidebarItem icon={MessageSquare} label="Messages" id="messages" isActive={activeTab === 'messages'} onClick={setActiveTab} />
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 mt-8 uppercase tracking-wider">Account</div>
          <SidebarItem icon={User} label="My Profile" id="profile" isActive={activeTab === 'profile'} onClick={setActiveTab} />
          <SidebarItem icon={Settings} label="Settings" id="settings" isActive={activeTab === 'settings'} onClick={setActiveTab} />
        </div>
        <div className="p-4 border-t border-[#233554]">
          <button type="button" className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors mt-2" onClick={() => window.location.href = '/auth'}>
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 relative">
        <header className="sticky top-0 z-10 bg-[#0a192f]/90 backdrop-blur-md border-b border-[#233554] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-300 hover:text-white"><Menu size={24} /></button>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">
                {activeTab === 'dashboard' && 'Welcome back, Captain!'}
                {activeTab === 'jobs' && 'Find Your Next Voyage'}
                {activeTab === 'documents' && 'Document Wallet'}
                {activeTab === 'profile' && 'My Profile'}
                {activeTab === 'settings' && 'Settings'}
                {activeTab === 'messages' && 'Communications'}
                {activeTab === 'applications' && 'Application Status'}
              </h1>
              <p className="text-xs text-gray-400">
                {activeTab === 'dashboard' && 'Last synced: Today, 09:41 UTC'}
                {activeTab === 'jobs' && '1,240 active vacancies matching your rank'}
                {activeTab === 'documents' && `${documents.length} documents in wallet`}
                {activeTab === 'profile' && 'Manage your personal information'}
                {activeTab === 'settings' && 'Manage your account preferences'}
                {activeTab === 'messages' && 'Your active conversations'}
                {activeTab === 'applications' && 'Track your job applications'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Notification Bell with Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => {
                    const dropdown = document.getElementById('notification-dropdown');
                    if (dropdown) dropdown.classList.toggle('hidden');
                  }}
                  type="button" 
                  className="relative p-2 text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a192f]"></span>
                </button>
                <div id="notification-dropdown" className="hidden">
                   <NotificationDropdown type="seafarer" onClose={() => document.getElementById('notification-dropdown')?.classList.add('hidden')} />
                </div>
             </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#64ffda] to-blue-500 p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-[#0a192f] overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-[#0a192f] border-r border-[#233554] animate-in slide-in-from-left">
            <div className="p-6 flex justify-between items-center"><span className="font-bold text-xl text-white">Menu</span><button type="button" onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button></div>
            <div className="px-4 space-y-2">
               <SidebarItem icon={LayoutDashboard} label="Dashboard" id="dashboard" isActive={activeTab === 'dashboard'} onClick={setActiveTab} />
               <SidebarItem icon={ClipboardList} label="My Applications" id="applications" isActive={activeTab === 'applications'} onClick={setActiveTab} />
               <SidebarItem icon={FileText} label="Documents" id="documents" isActive={activeTab === 'documents'} onClick={setActiveTab} />
               <SidebarItem icon={Briefcase} label="Job Board" id="jobs" isActive={activeTab === 'jobs'} onClick={setActiveTab} />
               <SidebarItem icon={MessageSquare} label="Messages" id="messages" isActive={activeTab === 'messages'} onClick={setActiveTab} />
               <div className="text-xs font-semibold text-gray-500 px-4 mb-2 mt-8 uppercase tracking-wider">Account</div>
               <SidebarItem icon={User} label="My Profile" id="profile" isActive={activeTab === 'profile'} onClick={setActiveTab} />
               <SidebarItem icon={Settings} label="Settings" id="settings" isActive={activeTab === 'settings'} onClick={setActiveTab} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Employer Dashboard Component ---

function EmployerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobWizard, setShowJobWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // State for Live Data
  const [jobs, setJobs] = useState(INITIAL_ACTIVE_JOBS);
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);

   // Toast State
   const [toastMessage, setToastMessage] = useState<string | null>(null);

   const showToast = (msg: string) => {
       setToastMessage(msg);
       setTimeout(() => setToastMessage(null), 3000);
   };

  // Mock function to close modal
  const closeWizard = () => {
    setShowJobWizard(false);
    setWizardStep(1);
  };

  const handleManageJob = (job: any) => {
      setSelectedJob(job);
  };

  const toggleJobStatus = (id: number) => {
      setJobs(jobs.map(job => 
          job.id === id ? { ...job, status: job.status === 'active' ? 'paused' : 'active' } : job
      ));
  };

  const deleteJob = (id: number) => {
      if(confirm('Are you sure you want to delete this job posting?')) {
          setJobs(jobs.filter(job => job.id !== id));
      }
  };

  const handlePublishJob = () => {
      // Add a mock new job to the state
      const newJob = { 
          id: jobs.length + 1, 
          title: "New Job Vacancy", 
          vesselType: "LNG Carrier", 
          applicants: 0, 
          postedDate: "Just now", 
          status: 'active', 
          location: "Worldwide", 
          salary: "$TBD" 
      };
      // @ts-ignore
      setJobs([newJob, ...jobs]);
      showToast('Job Posted Successfully!'); 
      closeWizard();
  };

  const updateApplicantStatus = (id: number, newStatus: string) => {
      setApplicants(applicants.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
      ));
      // If updating from modal, close modal or refresh view
      if(selectedCandidate && selectedCandidate.id === id) {
          setSelectedCandidate({ ...selectedCandidate, status: newStatus });
      }
      showToast(`Candidate status updated to ${newStatus}`);
  };

  const renderContent = () => {
    // If managing a job, show job detail view
    if (selectedJob) {
        return (
            <JobDetailView 
                job={selectedJob} 
                onBack={() => setSelectedJob(null)} 
                applicants={applicants}
                onStatusUpdate={updateApplicantStatus}
                onViewProfile={setSelectedCandidate}
            />
        );
    }

    switch (activeTab) {
      case 'overview': return <EmployerOverview setShowJobWizard={setShowJobWizard} onCandidateClick={setSelectedCandidate} jobs={jobs} />;
      case 'jobs': return <EmployerJobsView setShowJobWizard={setShowJobWizard} onManageJob={handleManageJob} jobs={jobs} toggleJobStatus={toggleJobStatus} deleteJob={deleteJob} />;
      case 'candidates': return <EmployerCandidatesView onCandidateClick={setSelectedCandidate} applicants={applicants} />; // Pass applicants for search
      case 'company': return <EmployerProfileView showToast={showToast} />;
      case 'compliance': return <SettingsView showToast={showToast} />; 
      case 'interviews': return <MessagesView />; 
      default: return <EmployerOverview setShowJobWizard={setShowJobWizard} onCandidateClick={setSelectedCandidate} jobs={jobs} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] font-sans flex overflow-hidden relative">
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#112240] h-full border-l border-[#233554] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-[#233554] flex justify-between items-start bg-[#0a192f]">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-[#233554] overflow-hidden border-2 border-[#64ffda]">
                  {selectedCandidate.avatar ? (
                    <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold">{selectedCandidate.name.charAt(0)}</div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCandidate.name}</h2>
                  <div className="flex items-center gap-2 text-[#64ffda] mt-1">
                    <Anchor size={16} /> {selectedCandidate.rank}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {selectedCandidate.nationality}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {selectedCandidate.experience} Exp</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                        selectedCandidate.status === 'shortlisted' ? 'border-green-500 text-green-400' : 
                        selectedCandidate.status === 'rejected' ? 'border-red-500 text-red-400' : 'border-blue-500 text-blue-400'
                    }`}>
                        {selectedCandidate.status}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-white p-2"><X size={24} /></button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              
              {/* Match Score */}
              <div className="bg-[#0a192f] rounded-xl p-6 border border-[#233554] flex items-center justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">AI Match Score</h3>
                  <p className="text-xs text-gray-500">Based on requirements for {selectedCandidate.appliedFor}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-[#64ffda]">{selectedCandidate.matchScore}%</div>
                  <div className="h-10 w-10 rounded-full border-4 border-[#64ffda] border-t-transparent animate-spin-slow"></div>
                </div>
              </div>

              {/* Verified Documents */}
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-[#64ffda]" /> Verified Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedCandidate.documents || ["STCW", "Medical", "Passport"]).map((doc: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#0a192f]/50 rounded border border-green-500/30">
                      <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                      <span className="text-sm text-gray-300">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio/Notes */}
              <div>
                <h3 className="text-white font-bold mb-3">Candidate Summary</h3>
                <p className="text-gray-400 leading-relaxed bg-[#0a192f]/30 p-4 rounded-lg border border-[#233554]">
                  {selectedCandidate.bio || "Candidate has a strong track record with no major incidents in the last 5 years. Previous employers verify verified sea time."}
                </p>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#233554] bg-[#0a192f] flex justify-between gap-4">
              <button 
                onClick={() => updateApplicantStatus(selectedCandidate.id, 'rejected')}
                className="flex-1 py-3 border border-red-500/50 text-red-400 font-bold rounded-lg hover:bg-red-500/10 flex items-center justify-center gap-2"
              >
                <ThumbsDown size={18} /> Reject
              </button>
              <button className="flex-1 py-3 bg-[#112240] text-white font-bold rounded-lg hover:bg-[#233554] flex items-center justify-center gap-2">
                <Video size={18} /> Interview
              </button>
              <button 
                onClick={() => updateApplicantStatus(selectedCandidate.id, 'shortlisted')}
                className="flex-1 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] flex items-center justify-center gap-2"
              >
                <ThumbsUp size={18} /> Shortlist
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Job Creation Wizard Overlay */}
      {showJobWizard && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#112240] h-full border-l border-[#233554] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Wizard Header */}
            <div className="p-6 border-b border-[#233554] flex justify-between items-center bg-[#0a192f]">
              <div>
                <h2 className="text-xl font-bold text-white">Create Job Vacancy</h2>
                <p className="text-xs text-gray-400 mt-1">Step {wizardStep} of 3</p>
              </div>
              <button onClick={closeWizard} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            {/* Wizard Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {wizardStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right">
                  <h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Vessel & Role Details</h3>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Job Title / Rank</label>
                    <input type="text" placeholder="e.g. Master, Chief Engineer" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Vessel Type</label>
                    <select className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none">
                      <option>LNG Carrier</option>
                      <option>Oil Tanker</option>
                      <option>Container Ship</option>
                      <option>Bulk Carrier</option>
                      <option>AHTS</option>
                      <option>PSV</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Vessel Name (Optional)</label>
                    <input type="text" placeholder="e.g. Maersk Alabama" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" />
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right">
                  <h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Contract Terms</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Salary (USD)</label>
                      <input type="number" placeholder="12000" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Per</label>
                      <select className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none">
                        <option>Month</option>
                        <option>Day</option>
                        <option>Contract</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Contract Duration</label>
                    <input type="text" placeholder="e.g. 4 months +/- 1" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Joining Date</label>
                    <input type="date" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" />
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right">
                  <h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Review & Publish</h3>
                  <div className="bg-[#0a192f] p-4 rounded border border-[#233554] space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rank:</span>
                      <span className="text-white font-medium">Master</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Vessel:</span>
                      <span className="text-white font-medium">LNG Carrier</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Salary:</span>
                      <span className="text-[#64ffda] font-bold">$14,500 / mo</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded flex items-start gap-3">
                    <Users className="text-blue-400 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-blue-400">AI Match Prediction</h4>
                      <p className="text-xs text-gray-300 mt-1">We found <strong className="text-white">42</strong> verified candidates matching these criteria in the database.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Wizard Footer */}
            <div className="p-6 border-t border-[#233554] bg-[#0a192f] flex justify-between">
              {wizardStep > 1 ? (
                <button onClick={() => setWizardStep(wizardStep - 1)} className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : (
                <div></div>
              )}
              
              {wizardStep < 3 ? (
                <button onClick={() => setWizardStep(wizardStep + 1)} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded font-bold hover:bg-[#58e6c5]">
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handlePublishJob} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded font-bold hover:bg-[#58e6c5]">
                  <Check size={16} /> Publish Job
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a192f] border-r border-[#233554] h-screen fixed left-0 top-0 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <Compass className="text-[#64ffda] w-8 h-8 relative z-10 transition-transform duration-700 group-hover:rotate-180" />
            <div className="absolute inset-0 bg-[#64ffda] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Nautical<span className="text-[#64ffda]">HR</span></span>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 uppercase tracking-wider">Recruitment</div>
          <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" isActive={activeTab === 'overview'} onClick={(id) => setActiveTab(id)} />
          <SidebarItem icon={Briefcase} label="My Jobs" id="jobs" isActive={activeTab === 'jobs'} onClick={(id) => setActiveTab(id)} />
          <SidebarItem icon={Users} label="Candidates" id="candidates" isActive={activeTab === 'candidates'} onClick={(id) => setActiveTab(id)} />
          <SidebarItem icon={MessageSquare} label="Interviews" id="interviews" isActive={activeTab === 'interviews'} onClick={(id) => setActiveTab(id)} />
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 mt-8 uppercase tracking-wider">Organization</div>
          <SidebarItem icon={Settings} label="Company Profile" id="company" isActive={activeTab === 'company'} onClick={(id) => setActiveTab(id)} />
          <SidebarItem icon={FileCheck} label="Compliance" id="compliance" isActive={activeTab === 'compliance'} onClick={(id) => setActiveTab(id)} />
        </div>
        <div className="p-4 border-t border-[#233554]">
          <div className="bg-[#112240]/50 rounded-xl p-4 mb-2 border border-[#233554]">
            <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-full bg-[#64ffda] flex items-center justify-center text-[#0a192f] font-bold">M</div><div className="overflow-hidden"><h4 className="text-sm font-bold text-white truncate">Maersk Line</h4><p className="text-[10px] text-gray-400 truncate">Enterprise Plan</p></div></div>
          </div>
          <button type="button" className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors" onClick={() => window.location.href = '/auth'}>
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 relative">
        <header className="sticky top-0 z-10 bg-[#0a192f]/90 backdrop-blur-md border-b border-[#233554] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-300 hover:text-white"><Menu size={24} /></button>
            <div className="hidden sm:block"><h1 className="text-xl font-bold text-white">Hiring Overview</h1><p className="text-xs text-gray-400">Updates since yesterday</p></div>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell with Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => {
                    const dropdown = document.getElementById('emp-notification-dropdown');
                    if (dropdown) dropdown.classList.toggle('hidden');
                  }}
                  type="button" 
                  className="relative p-2 text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a192f]"></span>
                </button>
                <div id="emp-notification-dropdown" className="hidden">
                   <NotificationDropdown type="agent" onClose={() => document.getElementById('emp-notification-dropdown')?.classList.add('hidden')} />
                </div>
             </div>
            <button type="button" className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-colors shadow-[0_0_15px_rgba(100,255,218,0.3)]" onClick={() => setShowJobWizard(true)}><Plus size={18} /> Post New Job</button>
            <div className="h-8 w-px bg-[#233554] mx-2"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#64ffda] to-blue-500 p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-[#0a192f] overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {renderContent()}
        </div>
      </main>
      
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-[#0a192f] border-r border-[#233554] animate-in slide-in-from-left">
            <div className="p-6 flex justify-between items-center"><span className="font-bold text-xl text-white">Menu</span><button type="button" onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button></div>
            <div className="px-4 space-y-2">
               <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" isActive={activeTab === 'overview'} onClick={(id) => setActiveTab(id)} />
               <SidebarItem icon={Briefcase} label="My Jobs" id="jobs" isActive={activeTab === 'jobs'} onClick={(id) => setActiveTab(id)} />
               <SidebarItem icon={Users} label="Candidates" id="candidates" isActive={activeTab === 'candidates'} onClick={(id) => setActiveTab(id)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Page Logic ---

export default function DashboardPage() {
  const [role, setRole] = useState<'seafarer' | 'agent' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fix: Wrap state updates in setTimeout to avoid synchronous setState warning during mount
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'agent') {
        setRole('agent');
      } else {
        setRole('seafarer');
      }
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="text-[#64ffda] animate-pulse font-mono text-xl">Loading Bridge...</div>
      </div>
    );
  }

  return (
    <>
      {role === 'agent' ? <EmployerDashboard /> : <SeafarerDashboard />}
    </>
  );
}