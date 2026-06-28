"use client"; // CRITICAL: We need this to use the router hook!
import { useRouter } from 'next/navigation';

export default function TechStack() {
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

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* AI / ML VISION SECTION */}
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">Machine Learning & CV</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>YOLOv8</span><span>90%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[90%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>MediaPipe</span><span>85%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[85%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>EasyOCR</span><span>80%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[80%]"></div></div>
              </div>
            </div>
          </div>

          {/* DEVELOPMENT SECTION */}
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">Software Dev</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>Python</span><span>95%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[95%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>Mobile App Dev</span><span>85%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[85%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-bold font-mono mb-2"><span>Full-Stack (Next.js)</span><span>75%</span></div>
                <div className="w-full h-6 border-2 border-black bg-gray-200"><div className="h-full bg-black w-[75%]"></div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}