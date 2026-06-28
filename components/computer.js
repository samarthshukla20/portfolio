import React from 'react'
import { useGLTF, Html } from '@react-three/drei' 
import Link from 'next/link'

export default function ComputerModel(props) {
  const { nodes, materials } = useGLTF('/models/computer.glb')
  
  return (
    <group {...props} dispose={null}>
      {/* Keyboard and Base Group */}
      <group position={[-1.258, 0.195, 2.2]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.computer_details} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.computer_keyboard} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.computer_main_body} />
      </group>
      
      {/* Cables Group */}
      <group position={[0.542, -0.111, -4.23]}>
        <mesh geometry={nodes.Object_14.geometry} material={materials.cable} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.connector} />
      </group>
      
      {/* MONITOR GROUP */}
      <group position={[0, 0.368, -2.43]}>
        <mesh geometry={nodes.Object_17.geometry} material={materials.monitor_black} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.monitor_white} />
        
        {/* TARGET SCREEN MESH */}
        <mesh geometry={nodes.Object_19.geometry} material={materials.monitor_screen}>
          
          <Html
            transform
            distanceFactor={1.85}    
            position={[0, 1.8, 0.12]}  
            rotation={[0, 0, 0]}     
          >
            <div className="w-[800px] h-[600px] bg-[#FFFDF6] text-black overflow-hidden border-[12px] border-black relative pointer-events-auto">
              
              <div id="screen-content" className="w-full p-8 pt-12 absolute top-0 left-0">
                
                {/* ABOUT ME BLOCK */}
                <div className="w-full bg-black text-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(255,255,0,1)] mb-12">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-yellow-300">
                    // About_Me.exe
                  </h2>
                  <p className="text-lg font-mono leading-relaxed">
                    I am a Full-Stack developer and AI/ML engineer specializing in computer vision and high-performance applications. 
                    Currently building highly accurate crop disease detection models and minimalist mobile experiences.
                  </p>
                </div>

                <h2 className="text-3xl font-black uppercase tracking-tight bg-black text-white inline-block px-6 py-2 border-4 border-black mb-6">
                  System_Directories //
                </h2>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  
                  <Link href="/projects" className="group flex items-center justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
                    <span className="font-black text-xl tracking-tight uppercase group-hover:text-yellow-300">/ Projects</span>
                    <span className="font-mono text-sm font-bold text-gray-500 group-hover:text-white">[DIR]</span>
                  </Link>

                  <Link href="/tech" className="group flex items-center justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
                    <span className="font-black text-xl tracking-tight uppercase group-hover:text-yellow-300">/ Tech_Stack</span>
                    <span className="font-mono text-sm font-bold text-gray-500 group-hover:text-white">[DIR]</span>
                  </Link>

                  <Link href="/hackathons" className="group flex items-center justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
                    <span className="font-black text-xl tracking-tight uppercase group-hover:text-yellow-300">/ Hackathons</span>
                    <span className="font-mono text-sm font-bold text-gray-500 group-hover:text-white">[DIR]</span>
                  </Link>

                  <Link href="/network" className="group flex items-center justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-all duration-200">
                    <span className="font-black text-xl tracking-tight uppercase group-hover:text-yellow-300">network.sh</span>
                    <span className="font-mono text-sm font-bold text-gray-500 group-hover:text-white">[EXE]</span>
                  </Link>

                </div>
              </div>
            </div>
          </Html>

        </mesh>
        
        <mesh geometry={nodes.Object_21.geometry} material={materials.monitor_white} position={[1.265, -0.148, 2.24]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      
      {/* Peripherals */}
      <mesh geometry={nodes.Object_8.geometry} material={materials.peripherals} position={[3.182, 0.071, -2.601]} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.peripherals} position={[4.297, 0.478, 1.302]} rotation={[0, 0.602, 0]} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.peripherals} position={[-4.423, 1.212, -1.111]} />
      <mesh geometry={nodes.Object_23.geometry} material={materials.monitor_plug} position={[0.003, 2.252, -2.083]} />
    </group>
  )
}

useGLTF.preload('/models/computer.glb')