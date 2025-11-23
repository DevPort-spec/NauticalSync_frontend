"use client"

import { useAppStore } from "../lib/store"
import { ContactForm } from "@/components/forms/ContactForm" 

export default function Home() {
  const count = useAppStore((state) => state.submissionCount)

  return (
    // Added 'relative' and 'overflow-hidden' to contain the background effects
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 overflow-hidden">
      
      {/* --- VISUAL EFFECT: Purple Glow Blob --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      
      {/* --- VISUAL EFFECT: Blue Glow Blob (Bottom Right) --- */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* z-10 ensures the text sits ON TOP of the glow */}
      <div className="z-10 space-y-8 flex flex-col items-center w-full max-w-md">
        
        <div className="text-white text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter">Get in touch</h1>
            <p className="text-slate-400">
                Messages sent: <span className="text-purple-400 font-bold text-xl">{count}</span>
            </p>
        </div>

        <ContactForm />
      </div>
    </main>
  )
}