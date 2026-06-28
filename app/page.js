"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DosLoader from "../components/loader";

import ComputerModel from "../components/computer"; 

gsap.registerPlugin(ScrollTrigger);

// --- NEW: THE ANTIGRAVITY PARTICLE BACKGROUND ---
function InteractiveParticles() {
  const pointsRef = useRef();
  const { mouse, camera } = useThree();

  // We reduce the count to 1500 to keep the CPU physics math running at a buttery 60fps
  const count = 1500; 
  
  // We need 3 arrays: Current Position, Original Home Grid, and Velocity
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread them across the viewport
      const x = (Math.random() - 0.5) * 20; 
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5 - 2; 
      
      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
      
      // Everyone starts completely still
      vel[i * 3] = vel[i * 3 + 1] = vel[i * 3 + 2] = 0;
    }
    return [pos, orig, vel];
  }, [count]);

  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    // 1. Calculate where the 2D mouse is hovering in the 3D space
    vec.set(mouse.x, mouse.y, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = -camera.position.z / vec.z;
    const mousePos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

    // Get direct access to the GPU array for maximum performance
    const currentPositions = pointsRef.current.geometry.attributes.position.array;

    // 2. The Physics Loop
    for (let i = 0; i < count; i++) {
      const idx3 = i * 3;
      
      const px = currentPositions[idx3];
      const py = currentPositions[idx3 + 1];
      
      const dx = px - mousePos.x;
      const dy = py - mousePos.y;
      const distSq = dx * dx + dy * dy;
      
      // --- FORCE 1: REPULSION (The Antigravity Hover) ---
      // If the mouse gets within a radius of 3 units, violently push the particle away
      if (distSq < 3) { 
        const force = (3 - distSq) * 0.02; 
        velocities[idx3] += dx * force;
        velocities[idx3 + 1] += dy * force;
      }
      
      // --- FORCE 2: THE SPRING TENSION ---
      // Constantly pull the particle back to its original home position
      const origX = originalPositions[idx3];
      const origY = originalPositions[idx3 + 1];
      
      velocities[idx3] += (origX - px) * 0.05; 
      velocities[idx3 + 1] += (origY - py) * 0.05;

      // --- FORCE 3: FRICTION ---
      // Slow the velocity down so they don't bounce infinitely
      velocities[idx3] *= 0.85;
      velocities[idx3 + 1] *= 0.85;
      
      // Apply the final calculated velocities to the actual position
      currentPositions[idx3] += velocities[idx3];
      currentPositions[idx3 + 1] += velocities[idx3 + 1];
      
      
      
      // If a particle floats past the top of the screen, reset it to the bottom
      if (originalPositions[idx3 + 1] > 10) {
        originalPositions[idx3 + 1] = -10;
        currentPositions[idx3 + 1] = -10;
      }
    }
    
    // Flag the GPU that the math is done and it needs to redraw the screen
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      {/* Slightly larger points to look like physical floating debris */}
      <pointsMaterial 
        size={0.06} 
        color="#000000" 
        transparent 
        opacity={0.8} 
        sizeAttenuation 
      />
    </points>
  );
}

// --- THE CHOREOGRAPHY ---
function SceneController({ children }) {
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    const proxy = {
      x: 3.5, y: -1.0, z: 0,         
      rotX: 0.1, rotY: -0.5, rotZ: 0, 
      scale: 0.5                     
    };

    modelRef.current.position.set(proxy.x, proxy.y, proxy.z);
    modelRef.current.rotation.set(proxy.rotX, proxy.rotY, proxy.rotZ);
    modelRef.current.scale.set(proxy.scale, proxy.scale, proxy.scale);

    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#project-section", 
            start: "top bottom", 
            end: "bottom bottom", 
            scrub: 1, 
          }
        });

        // STEP 1: The Dive (Calibrated for your new HTML coordinates)
        tl.to(proxy, { 
          x: 0.1,       
          y: -1.65,      // Pulled further down to account for your y: 1.8 HTML shift
          z: 4.8,       // Backed off slightly to fit your larger distanceFactor
          rotX: 0,      
          rotY: 0, 
          rotZ: 0,
          scale: 0.7,   // Slightly increased base scale
          duration: 1,  
          onUpdate: () => {
            if(modelRef.current) {
              modelRef.current.position.set(proxy.x, proxy.y, proxy.z);
              modelRef.current.rotation.set(proxy.rotX, proxy.rotY, proxy.rotZ);
              modelRef.current.scale.set(proxy.scale, proxy.scale, proxy.scale);
            }
          }
        }, 0)
        .to("#hero-section", { opacity: 0, y: -50, duration: 1 }, 0)
        
        // STEP 2: The Inner Scroll
        .to("#screen-content", { 
          y: -500, 
          duration: 2, 
          ease: "power1.inOut" 
        }, 1); 
        
        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
     // Intentionally left blank so GSAP has absolute control
  });

  return (
    <group ref={modelRef}>
      <group>{children}</group>
    </group>
  );
}

export default function Portfolio() {
  return (
    <main className="relative bg-[#FFFDF6] text-black overflow-x-hidden selection:bg-yellow-300">

      {/* THE NEW BOOT LOADER */}
      <DosLoader />
      
      {/* 3D CANVAS LAYER */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          
          <Suspense fallback={null}>
            <InteractiveParticles />
            
            <SceneController>
              <ComputerModel />
            </SceneController>
          </Suspense>
        </Canvas>
      </div>

      {/* 2D NEO-BRUTALIST CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto p-6 md:p-12 pointer-events-none">
         
         <section id="hero-section" className="min-h-screen pt-20 md:pt-32 flex flex-col items-start">
            <h1 className="text-6xl md:text-8xl font-black uppercase border-4 border-black p-6 bg-yellow-300 inline-block shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter leading-none pointer-events-auto">
              SAMARTH <br /> SHUKLA.
            </h1>
            <div className="mt-8 flex flex-col md:flex-row gap-4 pointer-events-auto">
              <p className="text-lg font-mono bg-white p-4 border-2 border-black inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ↳ B.Tech CS (AI & ML) @ VIT Bhopal
              </p>
            </div>
         </section>

         {/* GHOST SCROLL TRACK */}
         <section id="project-section" className="h-[300vh] w-full">
         </section>

      </div>
    </main>
  );
}