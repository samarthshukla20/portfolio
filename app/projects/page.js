"use client"; // CRITICAL: We need this to use the router hook!
import { useRouter } from 'next/navigation';

export default function Projects() {
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

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* FARMSHIELD */}
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black uppercase mb-4">FarmShield</h2>
            <div className="flex gap-2 mb-6">
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold">YOLOv8</span>
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold">Python</span>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed">
              Machine learning platform dedicated to crop disease detection via high-accuracy leaf scanning. Built to assist in agricultural diagnostics.
            </p>
            <a href="#" className="inline-block bg-yellow-300 border-4 border-black px-8 py-4 font-black uppercase text-xl hover:bg-black hover:text-yellow-300 transition-colors shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              View Source [GitHub]
            </a>
          </div>

          {/* ALPR ENGINE */}
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black uppercase mb-4">ALPR Engine</h2>
            <div className="flex gap-2 mb-6">
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold">EasyOCR</span>
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold">Computer Vision</span>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed">
              Automatic License Plate Recognition system built and optimized for fast, accurate inference using modern CV libraries.
            </p>
            <a href="#" className="inline-block bg-yellow-300 border-4 border-black px-8 py-4 font-black uppercase text-xl hover:bg-black hover:text-yellow-300 transition-colors shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              View Source [GitHub]
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}