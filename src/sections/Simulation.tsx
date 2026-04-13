import { motion } from 'motion/react';
import { Crosshair } from 'lucide-react';

export default function Simulation({ shaderProps, setShaderProps }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative">
      
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1E0CC08_1px,transparent_1px),linear-gradient(to_bottom,#E1E0CC08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Center Crosshair */}
        
        {/* Center Reticles */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16 border border-[#E1E0CC]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 -ml-32 -mt-32 border border-[#E1E0CC]/5 rounded-full" />

        {/* Top Left Location */}
        <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3">
          <Crosshair className="w-4 h-4 text-[#E1E0CC]/50" />
          <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
            <span className="text-[#E1E0CC]/40">Mode //</span> Manual Override
          </div>
        </div>
      </div>

      <div className="absolute bottom-[25px] left-4 md:left-12 right-4 md:right-12 flex justify-center pointer-events-auto">
        
        {/* Unified Controls Panel */}
        <div className="w-full max-w-6xl bg-black/[0.45] backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-[4px] shadow-2xl flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          
          <div className="flex-shrink-0 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-8 w-full lg:w-auto">
            <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50">Input Parameters</div>
            <h3 className="text-lg font-light text-[#E1E0CC] whitespace-nowrap">Simulation Controls</h3>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <ControlSlider 
              label="Viewing Angle (Tilt)" 
              value={shaderProps.tilt} 
              min={-0.8} max={0.8} step={0.01} 
              onChange={(v: number) => setShaderProps((p: any) => ({ ...p, tilt: v }))} 
            />
            <ControlSlider 
              label="Time Dilation (Rotation Speed)" 
              value={shaderProps.rotationSpeed} 
              min={0.0} max={2.0} step={0.05} 
              onChange={(v: number) => setShaderProps((p: any) => ({ ...p, rotationSpeed: v }))} 
            />
            <ControlSlider 
              label="Zoom (Scale)" 
              value={shaderProps.bhScale} 
              min={0.5} max={3.0} step={0.1} 
              onChange={(v: number) => setShaderProps((p: any) => ({ ...p, bhScale: v }))} 
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function ControlSlider({ label, value, min, max, step, onChange }: any) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-2">
        <label className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/80">{label}</label>
        <span className="font-tomorrow text-xs font-mono text-[#E1E0CC]">{value.toFixed(2)}</span>
      </div>
      <div className="relative h-1 bg-white/10 rounded-full">
        <input 
          type="range" min={min} max={max} step={step} value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute top-0 left-0 h-full bg-[#E1E0CC] rounded-full pointer-events-none"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        {/* Custom Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E1E0CC] rounded-full shadow-[0_0_10px_#E1E0CC] pointer-events-none"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
}
