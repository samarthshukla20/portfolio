"use client";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function DosLoader() {
  const { active, progress } = useProgress();
  const [hidden, setHidden] = useState(false);
  
  // We use a simulated progress state to guarantee the bar always animates smoothly
  const [fakeProgress, setFakeProgress] = useState(0);

  useEffect(() => {
    // Keep our fake progress synced with real progress if it's downloading normally
    if (progress > fakeProgress) {
      setFakeProgress(progress);
    }

    // THE FIX: When Three.js says it's no longer "active" (meaning loading is finished or it loaded instantly from cache)
    if (!active) {
      setFakeProgress(100); // Force the UI to 100%
      
      // Wait a little over 1 second so the user can actually see the "SYSTEM READY" message before it disappears
      const timeout = setTimeout(() => setHidden(true), 1200); 
      return () => clearTimeout(timeout);
    }
  }, [active, progress, fakeProgress]);

  if (hidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-black text-green-500 font-mono transition-opacity duration-500 ${
        fakeProgress === 100 && !active ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-2xl p-8 border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-black">
        <h2 className="text-2xl font-black mb-6 uppercase tracking-widest border-b-2 border-green-500 pb-2">
          Loading_Assets // Boot Sequence
        </h2>
        
        <div className="space-y-2 text-sm md:text-base">
          <p>Mounting Virtual Drive............. [OK]</p>
          <p>Loading WebGL Context.............. [OK]</p>
          <p className="animate-pulse">Fetching 3D Models................. {Math.round(fakeProgress)}%</p>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-full h-6 border-2 border-green-500 mt-6 p-1">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-out" 
            style={{ width: `${fakeProgress}%` }}
          ></div>
        </div>

        {fakeProgress === 100 && (
          <p className="mt-6 text-yellow-300 font-bold animate-pulse">
            SYSTEM READY. INITIALIZING INTERFACE...
          </p>
        )}
      </div>
    </div>
  );
}