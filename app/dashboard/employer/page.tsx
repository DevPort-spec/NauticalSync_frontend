"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, Users, MessageSquare, Settings, LogOut, Menu, X, 
  Plus, Bell, Search, Filter, CheckCircle2, MoreVertical, MapPin, Clock, Anchor, 
  Shield, ThumbsUp, ThumbsDown, Video, ChevronLeft, ChevronRight, Check, PauseCircle, PlayCircle, Trash2, FileCheck, Send, Compass
} from 'lucide-react';
// Import path stays lowercase 'dashboard' as requested previously
import { SidebarItem, StatCard, Toast } from '@/components/dashboard-ui';

// --- Data Constants (Employer Specific) ---

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

const MESSAGES_MOCK = [
    { 
      id: 1, 
      sender: "Capt. James Hook", 
      role: "Candidate",
      avatar: "J",
      lastMessage: "Thank you for the update.", 
      time: "10:30 AM", 
      unread: 1,
      online: true,
      history: [
        { sender: "me", text: "Hello Captain, thank you for applying.", time: "10:28 AM" },
        { sender: "them", text: "Thank you for the update.", time: "10:30 AM" }
      ]
    }
  ];

// --- Sub-Components (Views) ---

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
    const notifications = [
        { id: 1, text: "New application: Capt. James Hook", time: "10 mins ago", icon: Users, color: "text-[#64ffda]" },
        { id: 2, text: "Interview scheduled with Elena Fisher", time: "1 hour ago", icon: Video, color: "text-purple-400" },
    ];
    return (
        <div className="absolute right-0 mt-2 w-80 bg-[#112240] border border-[#233554] rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-[#233554] flex justify-between items-center"><h3 className="font-bold text-white">Notifications</h3><button onClick={onClose}><X size={16} className="text-gray-400"/></button></div>
            <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-[#233554]/50 flex gap-3 hover:bg-[#0a192f] cursor-pointer"><div className={n.color}><n.icon size={16}/></div><div><p className="text-sm text-gray-200">{n.text}</p><p className="text-xs text-gray-500">{n.time}</p></div></div>
                ))}
            </div>
        </div>
    );
};

const JobDetailView = ({ job, onBack, applicants, onStatusUpdate, onViewProfile }: { job: any, onBack: () => void, applicants: any[], onStatusUpdate: (id: number, status: string) => void, onViewProfile: (applicant: any) => void }) => {
  const jobApplicants = applicants.filter(c => c.appliedFor.includes(job.title.split('/')[0].trim()));
  return (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-start">
      <div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 text-sm"><ChevronLeft size={16} /> Back to Jobs</button>
        <h2 className="text-3xl font-bold text-white">{job.title}</h2>
      </div>
    </div>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-[#233554]"><h3 className="font-bold text-white">Candidates for this Role</h3></div>
      <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a192f]/50 text-gray-300 font-medium"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr></thead>
          <tbody className="divide-y divide-[#233554]">
            {jobApplicants.map(applicant => (
              <tr key={applicant.id} className="hover:bg-[#112240]/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{applicant.name}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${applicant.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>{applicant.status.toUpperCase()}</span></td>
                <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => onViewProfile(applicant)} className="p-1.5 hover:bg-[#233554] rounded text-white" title="View Profile"><Users size={16} /></button><button onClick={() => onStatusUpdate(applicant.id, 'shortlisted')} className="p-1.5 hover:bg-[#233554] rounded text-[#64ffda]" title="Shortlist"><Check size={16} /></button></div></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  </div>
)};

const EmployerJobsView = ({ setShowJobWizard, onManageJob, jobs, toggleJobStatus, deleteJob }: { setShowJobWizard: (v: boolean) => void, onManageJob: (job: any) => void, jobs: any[], toggleJobStatus: (id: number) => void, deleteJob: (id: number) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Job Management</h2>
      <button onClick={() => setShowJobWizard(true)} className="flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5]"><Plus size={18} /> Post New Job</button>
    </div>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a192f]/50 text-gray-300 font-medium"><tr><th className="px-6 py-4">Job Title</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr></thead>
          <tbody className="divide-y divide-[#233554]">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[#112240]/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${job.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{job.status === 'active' ? <CheckCircle2 size={12} /> : <PauseCircle size={12} />}{job.status.toUpperCase()}</span></td>
                <td className="px-6 py-4"><div className="flex items-center gap-2"><button onClick={() => onManageJob(job)} className="px-3 py-1.5 bg-[#233554] text-white text-xs rounded hover:bg-[#64ffda] hover:text-[#0a192f]">Manage</button><button onClick={() => toggleJobStatus(job.id)} className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-white">{job.status === 'active' ? <PauseCircle size={16} /> : <PlayCircle size={16} />}</button><button onClick={() => deleteJob(job.id)} className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-red-400"><Trash2 size={16} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  </div>
);

const EmployerCandidatesView = ({ onCandidateClick, applicants }: { onCandidateClick: (c: any) => void, applicants: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCandidates = applicants.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div><h2 className="text-2xl font-bold text-white">Global Talent Pool</h2></div>
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full bg-[#112240] border border-[#233554] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-[#64ffda] outline-none" /></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} onClick={() => onCandidateClick(candidate)} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6 hover:border-[#64ffda]/50 transition-all cursor-pointer group">
          <div className="flex items-start gap-4 mb-4">
             <div className="w-16 h-16 rounded-full bg-[#233554] overflow-hidden border-2 border-[#64ffda] flex-shrink-0"><img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" /></div>
             <div><h3 className="font-bold text-white group-hover:text-[#64ffda] transition-colors">{candidate.name}</h3><p className="text-sm text-[#64ffda] font-medium">{candidate.rank}</p></div>
          </div>
          <button className="w-full py-2 bg-[#233554] text-[#64ffda] rounded border border-transparent hover:border-[#64ffda] transition-all text-sm font-bold">View Profile</button>
        </div>
      ))}
    </div>
  </div>
)};

const EmployerProfileView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">Company Profile</h2>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-8">
       <div className="space-y-2"><label className="text-sm text-gray-400">Company Name</label><input type="text" defaultValue="Maersk Line" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" /></div>
       <div className="pt-4 flex justify-end"><button onClick={() => showToast('Company profile saved!')} className="px-6 py-2 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5]">Save Profile</button></div>
    </div>
  </div>
);

const MessagesView = () => {
    const [activeChat, setActiveChat] = useState(MESSAGES_MOCK[0]);
    const [newMessage, setNewMessage] = useState("");
  
    const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim()) return;
      const updatedChat = {
          ...activeChat,
          history: [...activeChat.history, { sender: "me", text: newMessage, time: "Just now" }]
      };
      setActiveChat(updatedChat);
      setNewMessage("");
    };
  
    return (
      <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-1/3 bg-[#112240]/40 border border-[#233554] rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#233554]"><h2 className="text-lg font-bold text-white">Messages</h2></div>
          <div className="flex-1 overflow-y-auto">
              {MESSAGES_MOCK.map(chat => (
                  <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-b border-[#233554] cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-[#0a192f]/80 border-l-2 border-l-[#64ffda]' : 'hover:bg-[#112240]/60'}`}>
                      <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold">{chat.avatar}</div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-sm truncate">{chat.sender}</h4>
                              <p className="text-xs text-gray-400 truncate mt-1">{chat.lastMessage}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
        <div className="flex-1 bg-[#112240]/40 border border-[#233554] rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0a192f]/30">
              {activeChat.history.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === 'me' ? 'bg-[#64ffda] text-[#0a192f] rounded-br-none' : 'bg-[#112240] text-white border border-[#233554] rounded-bl-none'}`}>
                          <p className="text-sm">{msg.text}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div className="p-4 border-t border-[#233554] bg-[#0a192f]/50">
              <form onSubmit={handleSend} className="flex gap-3">
                  <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1 bg-[#0a192f] border border-[#233554] rounded-full px-4 py-2 text-sm text-white focus:border-[#64ffda] outline-none" />
                  <button type="submit" className="p-2 bg-[#64ffda] text-[#0a192f] rounded-full hover:bg-[#58e6c5] transition-colors"><Send size={20} /></button>
              </form>
          </div>
        </div>
      </div>
    );
  };

const SettingsView = ({ showToast }: { showToast: (msg: string) => void }) => (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield size={20} className="text-[#64ffda]" /> Security</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div><div className="text-white font-medium">Change Password</div></div>
            <button onClick={() => showToast('Password update link sent!')} className="px-4 py-2 border border-[#233554] text-white rounded hover:bg-[#233554] transition-colors text-sm">Update</button>
          </div>
        </div>
      </div>
    </div>
);

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
                  <thead className="bg-[#0a192f]/50 text-gray-300 font-medium"><tr><th className="px-6 py-4">Candidate Name</th><th className="px-6 py-4">Rank</th><th className="px-6 py-4">Status</th><th className="px-6 py-4"></th></tr></thead>
                  <tbody className="divide-y divide-[#233554]">
                      {RECENT_APPLICANTS.map((applicant) => (
                          <tr key={applicant.id} onClick={() => onCandidateClick(applicant)} className="hover:bg-[#112240]/50 transition-colors group cursor-pointer">
                              <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold">{applicant.name.charAt(0)}</div><div><div className="font-medium text-white">{applicant.name}</div></div></div></td>
                              <td className="px-6 py-4 text-white">{applicant.rank}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${applicant.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>{applicant.status.toUpperCase()}</span></td>
                              <td className="px-6 py-4 text-right"><button type="button" className="p-2 hover:bg-[#233554] rounded text-gray-400 hover:text-white"><MoreVertical size={16} /></button></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Today&apos;s Schedule</h2>
          <div className="space-y-4">
              {INITIAL_SCHEDULE.map((event, i) => (
                  <div key={i} className="flex gap-4 relative">
                      <div className="flex flex-col items-center"><div className="w-2 h-2 bg-[#64ffda] rounded-full mt-1.5"></div>{i !== 2 && <div className="w-px h-full bg-[#233554] my-1"></div>}</div>
                      <div className="pb-4"><div className="text-sm font-bold text-white">{event.time}</div><div className="text-sm text-gray-300">{event.name}</div><div className="text-xs text-gray-500 mt-1 bg-[#0a192f] px-2 py-0.5 rounded inline-block">{event.type}</div></div>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Employer Page ---

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobWizard, setShowJobWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  const [jobs, setJobs] = useState(INITIAL_ACTIVE_JOBS);
  const [applicants, setApplicants] = useState(RECENT_APPLICANTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };

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
      if(selectedCandidate && selectedCandidate.id === id) {
          setSelectedCandidate({ ...selectedCandidate, status: newStatus });
      }
      showToast(`Candidate status updated to ${newStatus}`);
  };

  const renderContent = () => {
    if (selectedJob) {
        return <JobDetailView job={selectedJob} onBack={() => setSelectedJob(null)} applicants={applicants} onStatusUpdate={updateApplicantStatus} onViewProfile={setSelectedCandidate} />;
    }

    switch (activeTab) {
      case 'overview': return <EmployerOverview setShowJobWizard={setShowJobWizard} onCandidateClick={setSelectedCandidate} jobs={jobs} />;
      case 'jobs': return <EmployerJobsView setShowJobWizard={setShowJobWizard} onManageJob={handleManageJob} jobs={jobs} toggleJobStatus={toggleJobStatus} deleteJob={deleteJob} />;
      case 'candidates': return <EmployerCandidatesView onCandidateClick={setSelectedCandidate} applicants={applicants} />;
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
            <div className="p-6 border-b border-[#233554] flex justify-between items-start bg-[#0a192f]">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-[#233554] overflow-hidden border-2 border-[#64ffda]"><img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-full h-full object-cover" /></div>
                <div><h2 className="text-2xl font-bold text-white">{selectedCandidate.name}</h2><p className="text-[#64ffda]">{selectedCandidate.rank}</p></div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-white p-2"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="bg-[#0a192f] rounded-xl p-6 border border-[#233554] flex items-center justify-between"><div><h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">AI Match Score</h3><p className="text-xs text-gray-500">Based on requirements</p></div><div className="text-4xl font-bold text-[#64ffda]">{selectedCandidate.matchScore}%</div></div>
              <div><h3 className="text-white font-bold mb-4 flex items-center gap-2"><Shield size={20} className="text-[#64ffda]" /> Verified Credentials</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{(selectedCandidate.documents || ["STCW", "Medical", "Passport"]).map((doc: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-[#0a192f]/50 rounded border border-green-500/30"><CheckCircle2 size={18} className="text-green-400 shrink-0" /><span className="text-sm text-gray-300">{doc}</span></div>))}</div></div>
            </div>
            <div className="p-6 border-t border-[#233554] bg-[#0a192f] flex justify-between gap-4">
              <button onClick={() => updateApplicantStatus(selectedCandidate.id, 'rejected')} className="flex-1 py-3 border border-red-500/50 text-red-400 font-bold rounded-lg hover:bg-red-500/10 flex items-center justify-center gap-2"><ThumbsDown size={18} /> Reject</button>
              <button onClick={() => updateApplicantStatus(selectedCandidate.id, 'shortlisted')} className="flex-1 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] flex items-center justify-center gap-2"><ThumbsUp size={18} /> Shortlist</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Creation Wizard Overlay */}
      {showJobWizard && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#112240] h-full border-l border-[#233554] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#233554] flex justify-between items-center bg-[#0a192f]"><div><h2 className="text-xl font-bold text-white">Create Job Vacancy</h2><p className="text-xs text-gray-400 mt-1">Step {wizardStep} of 3</p></div><button onClick={closeWizard} className="text-gray-400 hover:text-white"><X size={24} /></button></div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wizardStep === 1 && (<div className="space-y-4 animate-in slide-in-from-right"><h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Vessel & Role Details</h3><div className="space-y-2"><label className="text-sm text-gray-300">Job Title / Rank</label><input type="text" placeholder="e.g. Master" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" /></div></div>)}
              {wizardStep === 2 && (<div className="space-y-4 animate-in slide-in-from-right"><h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Contract Terms</h3><div className="space-y-2"><label className="text-sm text-gray-300">Salary</label><input type="number" placeholder="12000" className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-white focus:border-[#64ffda] outline-none" /></div></div>)}
              {wizardStep === 3 && (<div className="space-y-4 animate-in slide-in-from-right"><h3 className="text-[#64ffda] font-semibold text-sm uppercase tracking-wide mb-4">Review & Publish</h3><div className="bg-[#0a192f] p-4 rounded border border-[#233554] space-y-3"><div className="flex justify-between text-sm"><span className="text-gray-400">Rank:</span><span className="text-white font-medium">Master</span></div></div></div>)}
            </div>
            <div className="p-6 border-t border-[#233554] bg-[#0a192f] flex justify-between">
              {wizardStep > 1 ? (<button onClick={() => setWizardStep(wizardStep - 1)} className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2"><ChevronLeft size={16} /> Back</button>) : (<div></div>)}
              {wizardStep < 3 ? (<button onClick={() => setWizardStep(wizardStep + 1)} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded font-bold hover:bg-[#58e6c5]">Next <ChevronRight size={16} /></button>) : (<button onClick={handlePublishJob} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded font-bold hover:bg-[#58e6c5]"><Check size={16} /> Publish Job</button>)}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`flex-col w-64 bg-[#0a192f] border-r border-[#233554] h-screen fixed left-0 top-0 z-20 ${isSidebarOpen ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-6 flex items-center gap-3">
          <Compass className="text-[#64ffda] w-8 h-8" />
          <span className="font-bold text-xl text-white">Nautical<span className="text-[#64ffda]">HR</span></span>
          {isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400"><X /></button>}
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 uppercase tracking-wider">Recruitment</div>
          <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
          <SidebarItem icon={Briefcase} label="My Jobs" id="jobs" isActive={activeTab === 'jobs'} onClick={setActiveTab} />
          <SidebarItem icon={Users} label="Candidates" id="candidates" isActive={activeTab === 'candidates'} onClick={setActiveTab} />
          <SidebarItem icon={MessageSquare} label="Interviews" id="interviews" isActive={activeTab === 'interviews'} onClick={setActiveTab} />
          <div className="text-xs font-semibold text-gray-500 px-4 mb-2 mt-8 uppercase tracking-wider">Organization</div>
          <SidebarItem icon={Settings} label="Company Profile" id="company" isActive={activeTab === 'company'} onClick={setActiveTab} />
          <SidebarItem icon={FileCheck} label="Compliance" id="compliance" isActive={activeTab === 'compliance'} onClick={setActiveTab} />
        </div>
        <div className="p-4 border-t border-[#233554]">
           <button onClick={() => window.location.href='/auth'} className="flex items-center gap-3 text-gray-400 hover:text-red-400"><LogOut size={18}/> Log Out</button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 relative">
        <header className="sticky top-0 z-10 bg-[#0a192f]/90 backdrop-blur-md border-b border-[#233554] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-300"><Menu size={24} /></button>
            <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
            <button onClick={() => setShowJobWizard(true)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg"><Plus size={18} /> Post New Job</button>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <button onClick={() => {
                   const el = document.getElementById('emp-notif-drop');
                   if(el) el.classList.toggle('hidden');
                }} className="relative p-2 text-gray-300 hover:text-[#64ffda]"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
                <div id="emp-notif-drop" className="hidden"><NotificationDropdown onClose={() => document.getElementById('emp-notif-drop')?.classList.add('hidden')} /></div>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden"><img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover"/></div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}