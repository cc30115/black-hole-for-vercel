import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, FileSearch, ShieldAlert, CheckCircle2 } from 'lucide-react';

const myths = [
  { myth: "Black holes suck everything in like a cosmic vacuum cleaner.", fact: "Black holes have gravity just like any other object. If you replaced our Sun with a black hole of the exact same mass, Earth would continue orbiting exactly as it does now.", stat: "Vacuum Force: 0" },
  { myth: "Black holes are actual holes in space.", fact: "They are not empty holes, but rather a huge amount of matter packed into a very small area, creating a massive gravitational pull.", stat: "Density: Infinite" },
  { myth: "You can use a black hole to travel to another dimension or time.", fact: "While science fiction loves this idea (wormholes), current physics suggests that anything falling into a black hole is crushed to infinite density at the singularity.", stat: "Survival Prob: 0%" },
  { myth: "Black holes will eventually consume the entire universe.", fact: "The universe is expanding faster than black holes can consume matter. Most black holes only consume material that gets too close to their event horizon.", stat: "Expansion > Pull" }
];

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pointer-events-none relative flex items-center justify-end px-6 md:px-12">
      
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1E0CC08_1px,transparent_1px),linear-gradient(to_bottom,#E1E0CC08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Center Crosshair */}
        
        {/* Center Reticles */}
        <div className="absolute top-1/2 left-[30%] w-32 h-32 -ml-16 -mt-16 border border-[#E1E0CC]/10 rounded-full" />
        <div className="absolute top-1/2 left-[30%] w-64 h-64 -ml-32 -mt-32 border border-[#E1E0CC]/5 rounded-full" />

        {/* Top Left Location */}
        <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3">
          <FileSearch className="w-4 h-4 text-[#E1E0CC]/50" />
          <div className="font-tomorrow text-xs md:text-sm tracking-widest text-[#E1E0CC]/80 uppercase">
            <span className="text-[#E1E0CC]/40">Archive //</span> Misconceptions
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-[4px] shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="w-8 h-8 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
            <FileSearch className="w-4 h-4 text-[#E1E0CC]" />
          </div>
          <div>
            <div className="font-tomorrow text-[10px] uppercase tracking-widest text-[#E1E0CC]/50">Data Analysis</div>
            <h3 className="text-lg font-light text-[#E1E0CC]">Fact Check Protocol</h3>
          </div>
        </div>
        
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0"
            >
              <div className="mb-6 p-4 border border-red-500/20 bg-red-500/5 rounded-[4px]">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span className="font-tomorrow text-[10px] font-bold uppercase tracking-widest text-red-400">Anomalous Report</span>
                </div>
                <p className="text-base text-[#E1E0CC]/90">"{myths[activeIndex].myth}"</p>
              </div>
              
              <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-[4px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="font-tomorrow text-[10px] font-bold uppercase tracking-widest text-green-400">Verified Data</span>
                  </div>
                  <span className="font-tomorrow text-[10px] font-mono text-green-400/70">{myths[activeIndex].stat}</span>
                </div>
                <p className="text-sm text-[#E1E0CC]/70 leading-relaxed">{myths[activeIndex].fact}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <button 
            onClick={() => setActiveIndex(i => (i > 0 ? i - 1 : myths.length - 1))}
            className="p-2 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-[4px] transition-all text-[#E1E0CC]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {myths.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-[#E1E0CC] shadow-[0_0_8px_#E1E0CC]' : 'bg-white/20'}`} />
            ))}
          </div>
          <button 
            onClick={() => setActiveIndex(i => (i < myths.length - 1 ? i + 1 : 0))}
            className="p-2 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-[4px] transition-all text-[#E1E0CC]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
