"use client"; // CRITICAL: We need this to use the router hook!
import { useRouter } from 'next/navigation';

export default function Hackathons() {
  const router = useRouter(); // Initialize the router

  return (
    <main className="min-h-screen bg-[#FFFDF6] text-black p-8 md:p-16 selection:bg-yellow-300">
      
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase border-4 border-black p-6 bg-yellow-300 inline-block shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter">
            / PROJECTS
          </h1>
          
          {/* CRITICAL FIX: Changed from <Link> to a <button> that triggers router.back() */}
          <button 
            onClick={() => router.back()} 
            className="text-xl font-bold border-4 border-black px-6 py-3 hover:bg-black hover:text-yellow-300 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            &lt; RETURN_HOME
          </button>
        </div>

        {/* TIMELINE GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="bg-black text-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(255,255,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] transition-all">
            <span className="bg-yellow-300 text-black font-black px-3 py-1 text-sm tracking-widest uppercase mb-4 inline-block">Latest Build</span>
            <h2 className="text-3xl font-black uppercase mb-2">Hackathon Project Name</h2>
            <p className="font-mono text-gray-400 mb-6">[ Replace with Event Name / Date ]</p>
            <p className="text-lg leading-relaxed mb-6">
              Developed a full-stack prototype utilizing computer vision to solve [Problem Statement]. Handled repository architecture, presentation deck design, and core machine learning integration within a 48-hour timeframe.
            </p>
            <a href="#" className="inline-block border-2 border-yellow-300 px-6 py-2 font-bold hover:bg-yellow-300 hover:text-black transition-colors">View Repository //</a>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all">
            <span className="bg-gray-200 text-black font-black px-3 py-1 text-sm tracking-widest uppercase mb-4 inline-block">Previous Build</span>
            <h2 className="text-3xl font-black uppercase mb-2">Hackathon Project Name</h2>
            <p className="font-mono text-gray-600 mb-6">[ Replace with Event Name / Date ]</p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Engineered a highly optimized mobile application prioritizing minimalist UI/UX while delivering robust backend performance.
            </p>
            <a href="#" className="inline-block border-2 border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition-colors">View Repository //</a>
          </div>

        </div>
      </div>
    </main>
  );
}