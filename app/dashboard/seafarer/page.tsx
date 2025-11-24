"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, Briefcase, MessageSquare, User, Bell, Settings, LogOut, Menu, X, 
  Search, CheckCircle2, AlertTriangle, Clock, ChevronRight, MapPin, Ship, Zap, UploadCloud, 
  Save, Shield, Compass, Loader2, Send, Filter, Eye, ClipboardList, Video, MoreVertical, Plus
} from 'lucide-react';
import { SidebarItem, StatCard, Toast } from '@/components/dashboard-ui';

// --- Data Constants (Seafarer Specific) ---

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
  }
];

// --- Sub-Components (Views) ---

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
    const notifications = [
        { id: 1, text: "Your application for Chief Officer was viewed", time: "2 hours ago", icon: Eye, color: "text-blue-400" },
        { id: 2, text: "STCW Basic Safety expires in 22 days", time: "5 hours ago", icon: AlertTriangle, color: "text-yellow-400" },
        { id: 3, text: "New job match: LNG Carrier - Maersk", time: "1 day ago", icon: Briefcase, color: "text-[#64ffda]" }
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
        </div>
    );
};

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
               <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">You haven't applied to any jobs yet. Visit the Job Board to start!</td></tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#112240]/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{app.role}</td>
                  <td className="px-6 py-4">{app.company}</td>
                  <td className="px-6 py-4">{app.vessel}</td>
                  <td className="px-6 py-4">{app.dateApplied || 'Just now'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${app.status === 'Under Review' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      <Clock size={12} /> {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><button className="text-[#64ffda] hover:underline text-xs">View Details</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
      <div onClick={onUpload} className="lg:col-span-3 bg-[#112240]/30 border-2 border-dashed border-[#233554] rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-[#64ffda]/50 transition-colors cursor-pointer group">
        <div className="w-16 h-16 bg-[#0a192f] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} className="text-[#64ffda]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Drag & Drop Certificates Here</h3>
        <p className="text-gray-400 text-sm max-w-sm">Support for PDF, JPG, PNG. Max file size 10MB.</p>
      </div>
      {documents.map((doc) => (
        <div key={doc.id} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-5 flex items-start gap-4 group hover:border-[#64ffda]/30 transition-all">
          <div className="w-12 h-12 bg-[#0a192f] rounded flex items-center justify-center text-gray-400 border border-[#233554]"><FileText size={24} /></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white truncate pr-2">{doc.name}</h4>
            <p className="text-xs text-gray-400 mt-1">Expires: {doc.expiry}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${doc.status === 'valid' ? 'bg-green-500/10 text-green-400' : doc.status === 'expiring' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>{doc.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SeafarerOverview = ({ onJobClick, documents }: { onJobClick: (tab: string) => void, documents: any[] }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={CheckCircle2} title="Verification Status" value="Verified" trend="Level 1" subtext="All systems go" />
      <StatCard icon={Ship} title="Sea Time" value="1,240" subtext="Days total" trend="+120 days" />
      <StatCard icon={Briefcase} title="Profile Views" value="84" subtext="Last 7 days" trend="+12%" />
      <StatCard icon={FileText} title="Documents" value={documents.length.toString()} subtext="2 expiring soon" />
    </div>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
            <div><h2 className="text-lg font-bold text-white">Smart Job Matches</h2><p className="text-sm text-gray-400">Based on your rank & verified certificates</p></div>
            <button onClick={() => onJobClick('jobs')} className="text-[#64ffda] text-sm font-medium hover:underline flex items-center gap-1">View All <ChevronRight size={16} /></button>
        </div>
        <div className="space-y-4">
        {JOB_MATCHES.map((job) => (
            <div key={job.id} className="bg-[#0a192f]/50 border border-[#233554] hover:border-[#64ffda]/50 p-4 rounded-lg transition-all duration-200 group cursor-pointer relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#112240] rounded flex items-center justify-center text-white font-bold border border-[#233554]">{job.company.substring(0, 2).toUpperCase()}</div>
                        <div>
                            <div className="flex items-center gap-2"><h3 className="font-bold text-white group-hover:text-[#64ffda] transition-colors">{job.role}</h3>{job.urgent && <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wide">Urgent</span>}</div>
                            <p className="text-sm text-gray-400 flex items-center gap-2 mt-1"><Ship size={12} /> {job.vessel} <span className="w-1 h-1 bg-gray-600 rounded-full"></span><MapPin size={12} /> {job.location}</p>
                        </div>
                    </div>
                    <div className="text-right"><div className="font-bold text-[#64ffda]">{job.salary}</div><div className="text-xs text-gray-500">per month</div></div>
                </div>
            </div>
        ))}
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
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ALL_JOBS.map((job) => (
        <div key={job.id} className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6 hover:border-[#64ffda]/50 transition-all duration-300 flex flex-col group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-[#0a192f] rounded-lg flex items-center justify-center border border-[#233554] text-white font-bold">{job.company.substring(0, 2).toUpperCase()}</div>
            {job.urgent && <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20">URGENT</span>}
          </div>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#64ffda] transition-colors">{job.role}</h3>
          <p className="text-sm text-gray-400 mb-4">{job.company} • {job.vessel}</p>
          <div className="mt-auto pt-4 border-t border-[#233554] flex justify-between items-center">
            <div><span className="block text-xs text-gray-500">Salary</span><span className="font-bold text-[#64ffda]">{job.salary}</span></div>
            <div className="flex flex-col items-end"><span className="text-xs text-gray-500 mb-1">Match</span><span className="text-sm font-bold text-white flex items-center gap-1"><Zap size={12} className="text-[#64ffda]" fill="currentColor"/> {job.matchScore}%</span></div>
          </div>
          <button onClick={() => onApply(job)} className="w-full mt-4 py-2 bg-[#0a192f] border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda] hover:text-[#0a192f] font-bold text-sm transition-colors">Apply Now</button>
        </div>
      ))}
    </div>
  </div>
);

const SeafarerProfileView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-[#0a192f] border-4 border-[#233554] overflow-hidden relative group cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="text-[#64ffda] text-sm hover:underline">Change Photo</button>
        </div>
        <div className="flex-1 w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm text-gray-400">Full Name</label><input type="text" defaultValue="John Smith" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" /></div>
            <div className="space-y-2"><label className="text-sm text-gray-400">Rank / Title</label><input type="text" defaultValue="Captain / Master" className="w-full bg-[#0a192f] border border-[#233554] rounded-lg p-3 text-white focus:border-[#64ffda] outline-none" /></div>
          </div>
          <div className="pt-4 border-t border-[#233554] flex justify-end">
            <button onClick={() => showToast('Profile updated successfully!')} className="flex items-center gap-2 bg-[#64ffda] text-[#0a192f] px-6 py-2 rounded-lg font-bold hover:bg-[#58e6c5] transition-colors"><Save size={18} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
    <div className="bg-[#112240]/40 border border-[#233554] rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield size={20} className="text-[#64ffda]" /> Security</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div><div className="text-white font-medium">Change Password</div><div className="text-xs text-gray-400">Last changed 3 months ago</div></div>
          <button onClick={() => showToast('Password update link sent!')} className="px-4 py-2 border border-[#233554] text-white rounded hover:bg-[#233554] transition-colors text-sm">Update</button>
        </div>
      </div>
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

// --- Main Seafarer Page ---

export default function SeafarerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applications, setApplications] = useState<any[]>([]); 
  
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
        // @ts-ignore 
        setDocuments([...documents, newDoc]);
        setTimeout(() => {
            setShowUploadModal(false);
            setUploadState('idle');
            showToast('Document Verified & Added');
        }, 1500);
      }, 1000);
    }, 2500); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <SeafarerOverview onJobClick={setActiveTab} documents={documents} />;
      case 'jobs': return <JobBoardView onApply={handleApply} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setShowUploadModal(true)} />;
      case 'applications': return <MyApplicationsView applications={applications} />; 
      case 'profile': return <SeafarerProfileView showToast={showToast} />;
      case 'settings': return <SettingsView showToast={showToast} />;
      case 'messages': return <MessagesView />; 
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
                        <div className="w-16 h-16 bg-[#0a192f] rounded-full flex items-center justify-center mx-auto"><FileText size={32} className="text-[#64ffda]" /></div>
                        <div><h2 className="text-xl font-bold text-white mb-2">Upload Certificate</h2><p className="text-gray-400 text-sm">Select a file to scan and verify.</p></div>
                        <div className="border-2 border-dashed border-[#233554] rounded-xl p-8 hover:border-[#64ffda] transition-colors cursor-pointer" onClick={startUpload}>
                            <UploadCloud size={40} className="text-gray-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-300">Click to browse</p>
                        </div>
                    </div>
                )}
                {uploadState === 'scanning' && (
                    <div className="text-center space-y-6 py-8">
                        <h2 className="text-xl font-bold text-white mb-2">AI Verification in Progress</h2>
                        <Loader2 className="animate-spin mx-auto text-[#64ffda]" size={40} />
                    </div>
                )}
                {uploadState === 'verified' && (
                     <div className="text-center space-y-6 py-4 animate-in zoom-in-90">
                        <CheckCircle2 size={40} className="text-green-400 mx-auto" />
                        <h2 className="text-xl font-bold text-white mb-2">Verification Successful!</h2>
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
                <CheckCircle2 size={40} className="text-green-400 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Application Sent!</h2>
                <button onClick={closeApplicationModal} className="mt-8 px-8 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-colors">Return to Job Board</button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[#233554] flex justify-between items-center bg-[#0a192f]/50">
                  <div><h2 className="text-xl font-bold text-white">Apply for {selectedJob.role}</h2></div>
                  <button onClick={closeApplicationModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-6 border-t border-[#233554] bg-[#0a192f]/50 flex justify-end gap-3">
                  <button onClick={submitApplication} disabled={isApplying} className="px-8 py-2.5 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#58e6c5] transition-all flex items-center gap-2">
                    {isApplying ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Submit Application</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`flex-col w-64 bg-[#0a192f] border-r border-[#233554] h-screen fixed left-0 top-0 z-20 ${isSidebarOpen ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-6 flex items-center gap-3">
          <Compass className="text-[#64ffda] w-8 h-8" />
          <span className="font-bold text-xl text-white">Nautical<span className="text-[#64ffda]">Sync</span></span>
          {isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400"><X /></button>}
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
           <button onClick={() => window.location.href='/auth'} className="flex items-center gap-3 text-gray-400 hover:text-red-400"><LogOut size={18}/> Log Out</button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 relative">
        <header className="sticky top-0 z-10 bg-[#0a192f]/90 backdrop-blur-md border-b border-[#233554] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-300"><Menu size={24} /></button>
            <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <button onClick={() => {
                    const el = document.getElementById('notif-drop');
                    if(el) el.classList.toggle('hidden');
                }} className="relative p-2 text-gray-300 hover:text-[#64ffda]"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
                <div id="notif-drop" className="hidden"><NotificationDropdown onClose={() => document.getElementById('notif-drop')?.classList.add('hidden')} /></div>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden"><img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover"/></div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}