"use client"; // CRITICAL: We need this to use the router hook!
import { useRouter } from 'next/navigation';

export default function Network() {
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

        {/* BIG LINKS */}
        <div className="flex flex-col gap-6 w-full">
          
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="group flex items-center justify-between bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
            <span className="font-black text-3xl md:text-5xl tracking-tight uppercase group-hover:text-yellow-300">GITHUB</span>
            <span className="font-mono text-xl font-bold text-gray-500 group-hover:text-white">-{'>'}</span>
          </a>

          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="group flex items-center justify-between bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
            <span className="font-black text-3xl md:text-5xl tracking-tight uppercase group-hover:text-yellow-300">LINKEDIN</span>
            <span className="font-mono text-xl font-bold text-gray-500 group-hover:text-white">-{'>'}</span>
          </a>

          <a href="mailto:your.email@vitbhopal.ac.in" className="group flex items-center justify-between bg-yellow-300 border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all duration-200 mt-8">
            <div className="flex flex-col">
               <span className="font-black text-3xl md:text-5xl tracking-tight uppercase group-hover:text-yellow-300">PING ME</span>
               <span className="font-mono text-sm md:text-base font-bold mt-2 group-hover:text-white">samarth.shukla@...</span>
            </div>
            <span className="font-mono text-xl font-bold group-hover:text-white">@</span>
          </a>

        </div>
      </div>
    </main>
  );
}