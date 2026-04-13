import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Database, Activity, MapPin } from 'lucide-react';

export default function Comparison({ setShaderProps }: any) {
  const [type, setType] = useState('stellar');

  useEffect(() => {
    if (type === 'stellar') {
      setShaderProps((p: any) => ({ ...p, bhScale: 0.8, rotationSpeed: 0.8, diskIntensity: 1.5 }));
    } else {
      setShaderProps((p: any) => ({ ...p, bhScale: 2.2, rotationSpeed: 0.1, diskIntensity: 0.8 }));
    }
  }, [type]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative">
      
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1E0CC08_1px,transparent_1px),linear-gradient(to_bottom,#E1E0CC08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Center Crosshair */}
        
        {/* Center Reticles */}
        <div className="absolute top-1/2 left-[70%] w-32 h-32 -ml-16 -mt-16 border border-[#E1E0CC]/10 rounded-full" />
        <div className="absolute top-1/2 left-[70%] w-64 h-64 -ml-32 -mt-32 border border-[#E1E0CC]/5 rounded-full" />

        {/* Top Left Location */}
        <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-[#E1E0CC]/50" />
          <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
            <span className="text-[#E1E0CC]/40">Database //</span> Classification
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute left-6 md:left-12 top-1/3 w-80 md:w-96 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-[4px] shadow-2xl mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
              <Database className="w-4 h-4 text-[#E1E0CC]" />
            </div>
            <div>
              <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50">Target Selection</div>
              <h3 className="text-lg font-light text-[#E1E0CC]">Scale Analysis</h3>
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setType('stellar')}
              className={`font-tomorrow flex-1 py-2 text-xs uppercase tracking-widest rounded-[4px] border transition-all flex items-center justify-center gap-2 ${type === 'stellar' ? 'bg-white/20 border-white/50 text-[#E1E0CC]' : 'border-white/10 text-primary/50 hover:bg-white/5'}`}
            >
              <Target className="w-3 h-3" /> Stellar
            </button>
            <button 
              onClick={() => setType('supermassive')}
              className={`font-tomorrow flex-1 py-2 text-xs uppercase tracking-widest rounded-[4px] border transition-all flex items-center justify-center gap-2 ${type === 'supermassive' ? 'bg-white/20 border-white/50 text-[#E1E0CC]' : 'border-white/10 text-primary/50 hover:bg-white/5'}`}
            >
              <Target className="w-3 h-3" /> Supermassive
            </button>
          </div>

          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {type === 'stellar' ? (
                <motion.div key="stellar" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <h3 className="text-xl text-[#E1E0CC] mb-2 font-light">Stellar-Mass Black Hole</h3>
                  <p className="text-[#E1E0CC]/70 text-sm mb-6 leading-relaxed">Formed by the gravitational collapse of a massive star at the end of its life. Highly active and dense.</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <TelemetryItem label="Mass" value="5 - 100 M☉" />
                    <TelemetryItem label="Radius" value="15 - 300 km" />
                    <TelemetryItem label="Location" value="Galactic Arms" />
                    <TelemetryItem label="Tidal Force" value="Extreme" />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="supermassive" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <h3 className="text-xl text-[#E1E0CC] mb-2 font-light">Supermassive Black Hole</h3>
                  <p className="text-[#E1E0CC]/70 text-sm mb-6 leading-relaxed">Found at the center of almost all large galaxies, including our Milky Way (Sagittarius A*). The anchors of galaxies.</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <TelemetryItem label="Mass" value="10^6 - 10^9 M☉" />
                    <TelemetryItem label="Radius" value="0.001 - 400 AU" />
                    <TelemetryItem label="Location" value="Galactic Center" />
                    <TelemetryItem label="Tidal Force" value="Moderate" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TelemetryItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="font-tomorrow text-[10px] text-[#E1E0CC]/40 tracking-widest uppercase mb-1">{label}</div>
      <div className="font-tomorrow text-sm font-mono text-[#E1E0CC]">{value}</div>
    </div>
  );
}
