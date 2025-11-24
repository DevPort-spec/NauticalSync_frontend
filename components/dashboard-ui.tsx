"use client";

import React, { useEffect } from 'react';
import { LucideIcon, TrendingUp, CheckCircle2 } from 'lucide-react';

// --- Shared Interfaces ---
export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  id: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

// --- Shared Components ---

export const SidebarItem = ({ icon: Icon, label, id, isActive, onClick }: SidebarItemProps) => (
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

export const StatCard = ({ title, value, subtext, icon: Icon, trend, color = "#64ffda" }: StatCardProps) => (
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

export const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
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